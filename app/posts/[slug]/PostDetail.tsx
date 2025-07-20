'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { postsData, Post } from '@/constants/posts';
import { ArrowLeft, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import components from "@/components/MarkdownComponents";
import ReactMarkdown from "react-markdown";
import PostActionButtons from "@/components/utils/PostActionButtons";

type TocItem = {
    text: string;
    level: number;
    id: string;
};

export default function PostDetail({ slug }: { slug: string }) {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState<string>('');
    const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
    const [toc, setToc] = useState<TocItem[]>([]);

    useEffect(() => {
        const currentPost = postsData.find(p => p.slug === slug);

        if (currentPost) {
            setPost(currentPost);
            setToc(extractMarkdownHeadings(currentPost.content, 2));

            const related = postsData
                .filter(p => p.category === currentPost.category && p.id !== currentPost.id)
                .slice(0, 3);
            setRelatedPosts(related);

            const handleScroll = () => {
                const headings = document.querySelectorAll('h2, h3');
                const scrollPosition = window.scrollY + 100;

                for (let i = headings.length - 1; i >= 0; i--) {
                    const heading = headings[i] as HTMLElement;
                    if (heading.offsetTop <= scrollPosition) {
                        setActiveSection(heading.id);
                        break;
                    }
                }
            };

            window.addEventListener('scroll', handleScroll);
            setLoading(false);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        } else {
            setLoading(false);
        }
    }, [slug]);

    const getPostNavigation = () => {
        if (!post) return { prev: null, next: null };

        const currentIndex = postsData.findIndex(p => p.slug === slug);
        const prev = currentIndex > 0 ? postsData[currentIndex - 1] : null;
        const next = currentIndex < postsData.length - 1 ? postsData[currentIndex + 1] : null;

        return { prev, next };
    };

    const { prev, next } = getPostNavigation();

    if (loading) {
        return <PostDetailSkeleton />;
    }

    if (!post) {
        return (
            <div className="min-h-screen pt-28 pb-20 flex flex-col items-center justify-center">
                <div className="text-2xl weight-600 mb-4">포스트를 찾을 수 없습니다</div>
                <Link href="/posts"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all">
                    <ArrowLeft size={16} />
                    <span>포스팅 목록으로 돌아가기</span>
                </Link>
            </div>
        );
    }

    const categoryColor =
        post.category === 'backend' ? 'text-green-400 border-green-400' :
            post.category === 'cs' ? 'text-purple-400 border-purple-400' :
                'text-yellow-400 border-yellow-400';

    function extractMarkdownHeadings(markdown: string, maxDepth = 2) {
        const headings: { text: string; level: number; id: string }[] = [];
        const lines = markdown.split('\n');
        let inCodeBlock = false;
        const idSet = new Set<string>();

        for (const line of lines) {
            if (line.trim().startsWith('```')) {
                inCodeBlock = !inCodeBlock;
                continue;
            }
            if (inCodeBlock) continue;

            const match = line.match(/^(#{1,6})\s+(.+)/);
            if (match) {
                const level = match[1].length;
                if (level > maxDepth) continue;
                const text = match[2].trim();
                let id = text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-');

                while (idSet.has(id)) {
                    id += '-duplicate';
                }
                idSet.add(id);

                headings.push({ text, level, id });
            }
        }

        return headings;
    }

    function PostTOC({ toc, activeSection }: { toc: TocItem[]; activeSection: string }) {
        const SCROLL_OFFSET = 80;

        const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
            e.preventDefault();
            const target = document.getElementById(id);
            if (target) {
                const y = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
                window.scrollTo({ top: y, behavior: 'smooth' });
                window.history.replaceState(null, '', `#${id}`);
            }
        };

        return (
            <div className="bg-black-05p border border-gray-800/50 rounded-xl p-5">
                <h3 className="text-white text-lg font-semibold mb-4">목차</h3>
                <nav>
                    <ul className="space-y-2">
                        {toc.map(item => (
                            <li key={item.id} className={item.level === 2 ? 'pl-4' : ''}>
                                <a
                                    href={`#${item.id}`}
                                    onClick={e => handleTocClick(e, item.id)}
                                    className={`block border-l-2 pl-2 text-sm transition-colors
                                    ${activeSection === item.id
                                        ? 'text-blue-400 border-blue-400'
                                        : 'border-gray-700 text-gray-300 hover:text-blue-400'}`}
                                >
                                    {item.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        );
    }

    function createHeadingId(text: React.ReactNode): string {
        // children이 배열이거나 React element일 수도 있으므로 string 변환 필요
        const raw = typeof text === 'string' ? text : React.Children.toArray(text).join('');
        return raw
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
    }

    const markdownComponents = {
        ...components,
        h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
            const id = createHeadingId(props.children);
            return <h1 id={id} className="text-xl weight-700 my-2" {...props} />;
        },
        h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
            const id = createHeadingId(props.children);
            return <h2 id={id} className="text-lg weight-600 my-2" {...props} />;
        },
        h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
            const id = createHeadingId(props.children);
            return <h3 id={id} className="weight-600 my-2" {...props} />;
        },
    };

    return (
        <div className="relative min-h-screen pt-20 lg:pt-28 pb-20">
            <div
                className="fixed inset-0 z-[-1]"
                style={{
                    background: "radial-gradient(131.64% 50.74% at 97.42% 14.64%, rgba(73, 149, 236, 0.30) 0%, rgba(41, 85, 134, 0.00) 70%)"
                }}
            />

            <div className="container mx-auto px-4 py-6">
                <Link href="/posts" className="inline-flex items-center gap-2 mb-8 text-gray-300 hover:text-blue-500 transition-colors">
                    <ArrowLeft size={16} />
                    <span>포스팅 목록으로 돌아가기</span>
                </Link>

                <div className="flex flex-col justify-center lg:flex-row-reverse lg:mr-20 gap-12">
                    <div className="flex-grow max-w-3xl">
                        <div className={`inline-flex px-3 py-1 rounded-lg border ${categoryColor} text-sm mb-4`}>
                            {post.category === 'backend' ? '백엔드' :
                                post.category === 'cs' ? 'CS 지식' : '알고리즘'}
                        </div>

                        <h1 className="text-white text-3xl md:text-4xl weight-700 mb-4">{post.title}</h1>
                        <p className="text-gray-300 text-lg mb-6">{post.description}</p>

                        <div className="flex flex-row justify-between items-center w-full mb-4">
                            <div className="flex flex-wrap items-center gap-5 text-gray-400 text-sm">
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={16} />
                                    <span>{post.date}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock size={16} />
                                    <span>{post.readingTime}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center border-t border-gray-800/50">
                                <PostActionButtons />
                            </div>
                        </div>


                        {post.thumbnail && (
                            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8 shadow-lg shadow-black/20">
                                <Image
                                    src={post.thumbnail}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2 mb-8">
                            {post.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-black-05p rounded-md text-sm text-gray-300"
                                >
                                #{tag}
                                </span>
                            ))}
                        </div>

                        <div className="block lg:hidden mb-8">
                            <PostTOC toc={toc} activeSection={activeSection} />
                        </div>

                        <div className="mb-10">
                            <div className="text-white prose prose-invert prose-blue max-w-none">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                    components={markdownComponents}
                                >
                                    {post.content}
                                </ReactMarkdown>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-12 border-t border-gray-800/50 pt-6">
                            <PostActionButtons />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
                            {prev && (
                                <Link
                                    href={`/posts/${prev.slug}`}
                                    className="group flex flex-col p-4 rounded-lg bg-black-05p border border-gray-800/50 hover:border-blue-500/30 transition-all"
                                >
                                    <div className="flex items-center gap-1 text-sm text-gray-400 mb-2">
                                        <ChevronLeft size={16} />
                                        <span>이전 포스트</span>
                                    </div>
                                    <h4 className="weight-500 text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                                        {prev.title}
                                    </h4>
                                </Link>
                            )}

                            {next && (
                                <Link
                                    href={`/posts/${next.slug}`}
                                    className="group flex flex-col p-4 rounded-lg bg-black-05p border border-gray-800/50 hover:border-blue-500/30 transition-all sm:text-right"
                                >
                                    <div className="flex items-center justify-end gap-1 text-sm text-gray-400 mb-2">
                                        <span>다음 포스트</span>
                                        <ChevronRight size={16} />
                                    </div>
                                    <h4 className="weight-500 text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                                        {next.title}
                                    </h4>
                                </Link>
                            )}
                        </div>

                        {relatedPosts.length > 0 && (
                            <div className="mb-12">
                                <h3 className="text-white text-xl weight-600 mb-6">관련 포스트</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {relatedPosts.map((relatedPost) => (
                                        <Link
                                            key={relatedPost.id}
                                            href={`/posts/${relatedPost.slug}`}
                                            className="group flex gap-4 p-3 rounded-lg bg-black-05p border border-gray-800/50 hover:border-blue-500/30 transition-all"
                                        >
                                            <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                                {relatedPost.thumbnail ? (
                                                    <Image
                                                        src={relatedPost.thumbnail}
                                                        alt={relatedPost.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-700/30 flex items-center justify-center">
                                                        <span className="text-sm opacity-70">{relatedPost.category.substring(0, 2)}</span>
                                                    </div>                                                )}
                                            </div>
                                            <div className="flex-grow">
                                                <h4 className="text-sm weight-500 line-clamp-2 text-white group-hover:text-blue-400 transition-colors">
                                                    {relatedPost.title}
                                                </h4>
                                                <div className="text-xs text-gray-400 mt-1">
                                                    {relatedPost.readingTime}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:w-64 lg:flex-shrink-0 mb-8 lg:block hidden">
                        <div className="sticky top-28">
                            <PostTOC toc={toc} activeSection={activeSection} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const PostDetailSkeleton = () => {
    return (
        <div className="relative min-h-screen pt-28 pb-20">
            <div className="container mx-auto px-4 py-6">
                <div className="h-5 w-40 bg-gray-700/30 rounded mb-8" />

                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-grow max-w-3xl animate-pulse">
                        <div className="h-6 w-24 bg-gray-700/30 rounded-full mb-4" />

                        <div className="h-10 bg-gray-700/30 rounded mb-2 w-3/4" />
                        <div className="h-8 bg-gray-700/30 rounded mb-4 w-1/2" />
                        <div className="h-5 bg-gray-700/30 rounded mb-6 w-full" />

                        <div className="flex gap-4 mb-8">
                            <div className="h-5 w-24 bg-gray-700/30 rounded" />
                            <div className="h-5 w-20 bg-gray-700/30 rounded" />
                        </div>

                        <div className="h-[300px] md:h-[400px] bg-gray-700/30 rounded-xl mb-8" />

                        <div className="flex gap-2 mb-8">
                            <div className="h-6 w-16 bg-gray-700/30 rounded" />
                            <div className="h-6 w-20 bg-gray-700/30 rounded" />
                            <div className="h-6 w-24 bg-gray-700/30 rounded" />
                        </div>

                        <div className="p-8 rounded-xl bg-black-05p border border-gray-800/50 mb-10">
                            <div className="space-y-4">
                                <div className="h-7 bg-gray-700/30 rounded w-48" />
                                <div className="h-4 bg-gray-700/30 rounded w-full" />
                                <div className="h-4 bg-gray-700/30 rounded w-full" />
                                <div className="h-4 bg-gray-700/30 rounded w-3/4" />

                                <div className="h-7 bg-gray-700/30 rounded w-48 mt-8" />
                                <div className="h-4 bg-gray-700/30 rounded w-full" />
                                <div className="h-4 bg-gray-700/30 rounded w-full" />

                                <div className="h-6 bg-gray-700/30 rounded w-40 mt-8" />
                                <div className="h-4 bg-gray-700/30 rounded w-full" />
                                <div className="h-4 bg-gray-700/30 rounded w-5/6" />

                                <div className="h-20 bg-gray-700/30 rounded w-full" />

                                <div className="h-7 bg-gray-700/30 rounded w-36 mt-8" />
                                <div className="h-4 bg-gray-700/30 rounded w-full" />
                                <div className="h-4 bg-gray-700/30 rounded w-4/5" />
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-64 lg:flex-shrink-0">
                        <div className="bg-black-05p border border-gray-800/50 rounded-xl p-5 animate-pulse">
                            <div className="h-6 bg-gray-700/30 rounded mb-4 w-16" />
                            <div className="space-y-3">
                                <div className="h-5 bg-gray-700/30 rounded w-full" />
                                <div className="h-5 bg-gray-700/30 rounded w-full" />
                                <div className="h-5 bg-gray-700/30 rounded w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};