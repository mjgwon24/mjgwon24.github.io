'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { postsData, Post } from '@/constants/posts';
import { ArrowLeft, Calendar, Clock, Share2, BookmarkPlus, ChevronLeft, ChevronRight, Link2 } from 'lucide-react';

export default function PostDetail() {
    const params = useParams();
    const { slug } = params;

    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState<string>('');
    const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

    useEffect(() => {
        const currentPost = postsData.find(p => p.slug === slug);

        if (currentPost) {
            setPost(currentPost);

            // 연관 포스트 찾기 - 같은 카테고리의 다른 포스트
            const related = postsData
                .filter(p => p.category === currentPost.category && p.id !== currentPost.id)
                .slice(0, 3);
            setRelatedPosts(related);

            // 스크롤 이벤트 리스너 설정 (메뉴 활성화용)
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
                <Link
                    href="/posts"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all"
                >
                    <ArrowLeft size={16} />
                    <span>포스팅 목록으로 돌아가기</span>
                </Link>
            </div>
        );
    }

    // 카테고리에 따른 색상 설정
    const categoryColor =
        post.category === 'development' ? 'text-green-400 border-green-400' :
            post.category === 'cs' ? 'text-purple-400 border-purple-400' :
                'text-yellow-400 border-yellow-400';

    // const categoryBg =
    //     post.category === 'development' ? 'from-green-500/5 to-green-500/0' :
    //         post.category === 'cs' ? 'from-purple-500/5 to-purple-500/0' :
    //             'from-yellow-500/5 to-yellow-500/0';

    return (
        <div className="relative min-h-screen pt-28 pb-20">
            {/* 배경 그라디언트 */}
            <div
                className="fixed inset-0 z-[-1]"
                style={{
                    background: "radial-gradient(131.64% 50.74% at 97.42% 14.64%, rgba(73, 149, 236, 0.30) 0%, rgba(41, 85, 134, 0.00) 70%)"
                }}
            />

            <div className="container mx-auto px-4 py-6">
                {/* 뒤로 가기 링크 */}
                <Link
                    href="/posts"
                    className="inline-flex items-center gap-2 mb-8 text-gray-300 hover:text-blue-500 transition-colors"
                >
                    <ArrowLeft size={16} />
                    <span>포스팅 목록으로 돌아가기</span>
                </Link>

                <div className="flex flex-col justify-center lg:flex-row-reverse lg:mr-20 gap-12">
                    {/* 메인 컨텐츠 영역 */}
                    <div className="flex-grow max-w-3xl">
                        {/* 카테고리 배지 */}
                        <div className={`inline-flex px-3 py-1 rounded-full border ${categoryColor} text-sm mb-4`}>
                            {post.category === 'development' ? '개발 포스팅' :
                                post.category === 'cs' ? 'CS 지식' : '알고리즘'}
                        </div>

                        {/* 제목 및 설명 */}
                        <h1 className="text-3xl md:text-4xl weight-700 mb-4">{post.title}</h1>
                        <p className="text-gray-300 text-lg mb-6">{post.description}</p>

                        {/* 메타 정보 */}
                        <div className="flex flex-wrap items-center gap-5 mb-8 text-gray-400 text-sm">
                            <div className="flex items-center gap-1.5">
                                <Calendar size={16} />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock size={16} />
                                <span>{post.readingTime}</span>
                            </div>
                        </div>

                        {/* 썸네일 이미지 */}
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

                        {/* 태그 목록 */}
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

                        {/* 본문 영역 - 실제 구현에서는 마크다운 렌더러 사용 */}
                        <div className="mb-10">
                            <div className="prose prose-invert prose-blue max-w-none">
                                <h2 id="introduction">소개</h2>
                                <p>
                                    이 포스트에서는 {post.title}에 대해 자세히 알아보겠습니다.
                                    이 내용은 예시로 작성된 것이며, 실제 구현에서는 마크다운 콘텐츠를 렌더링하게 됩니다.
                                </p>

                                <h2 id="main-content">주요 내용</h2>
                                <p>
                                    여기에 실제 포스트의 내용이 들어갑니다. 마크다운 형식으로 작성된 콘텐츠를
                                    적절한 스타일링과 함께 보여줄 수 있습니다.
                                </p>

                                <h3 id="sub-topic">세부 주제</h3>
                                <p>
                                    세부 주제에 대한 상세 설명이 이어집니다. 코드 블록, 이미지, 표 등 다양한
                                    마크다운 요소를 포함할 수 있습니다.
                                </p>

                                <pre><code>{`function example() {
  console.log("Hello World!");
  return true;
}`}</code></pre>

                                <h2 id="conclusion">결론</h2>
                                <p>
                                    이 포스트에서 다룬 내용을 요약하고 결론을 제시합니다.
                                    추가적인 학습을 위한 자료나 링크를 제공할 수도 있습니다.
                                </p>
                            </div>
                        </div>

                        {/* 공유 및 저장 버튼 */}
                        <div className="flex justify-between items-center mb-12 border-t border-gray-800/50 pt-6">
                            <div className="flex gap-2">
                                <button className="p-2 rounded-full bg-black-05p hover:bg-black-10p transition-colors">
                                    <Share2 size={20} className="text-gray-400" />
                                </button>
                                <button className="p-2 rounded-full bg-black-05p hover:bg-black-10p transition-colors">
                                    <BookmarkPlus size={20} className="text-gray-400" />
                                </button>
                                <button className="p-2 rounded-full bg-black-05p hover:bg-black-10p transition-colors">
                                    <Link2 size={20} className="text-gray-400" />
                                </button>
                            </div>
                        </div>

                        {/* 이전/다음 포스트 네비게이션 */}
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
                                    <h4 className="font-medium group-hover:text-blue-400 transition-colors line-clamp-2">
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
                                    <h4 className="font-medium group-hover:text-blue-400 transition-colors line-clamp-2">
                                        {next.title}
                                    </h4>
                                </Link>
                            )}
                        </div>

                        {/* 관련 포스트 */}
                        {relatedPosts.length > 0 && (
                            <div className="mb-12">
                                <h3 className="text-xl weight-600 mb-6">관련 포스트</h3>
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
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-grow">
                                                <h4 className="text-sm weight-500 line-clamp-2 group-hover:text-blue-400 transition-colors">
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

                    {/* 사이드바 - 목차 */}
                    <div className="lg:w-64 lg:flex-shrink-0">
                        <div className="sticky top-28">
                            <div className="bg-black-05p border border-gray-800/50 rounded-xl p-5">
                                <h3 className="text-lg weight-600 mb-4">목차</h3>
                                <div className="space-y-3">
                                    <a
                                        href="#introduction"
                                        className={`block pl-2 border-l-2 ${activeSection === 'introduction' ? 'text-blue-400 border-blue-400' : 'border-gray-700 text-gray-300 hover:text-blue-400'} transition-colors`}
                                    >
                                        소개
                                    </a>
                                    <a
                                        href="#main-content"
                                        className={`block pl-2 border-l-2 ${activeSection === 'main-content' ? 'text-blue-400 border-blue-400' : 'border-gray-700 text-gray-300 hover:text-blue-400'} transition-colors`}
                                    >
                                        주요 내용
                                    </a>
                                    <a
                                        href="#sub-topic"
                                        className={`block pl-5 border-l-2 ${activeSection === 'sub-topic' ? 'text-blue-400 border-blue-400' : 'border-gray-700 text-gray-300 hover:text-blue-400'} transition-colors text-sm`}
                                    >
                                        세부 주제
                                    </a>
                                    <a
                                        href="#conclusion"
                                        className={`block pl-2 border-l-2 ${activeSection === 'conclusion' ? 'text-blue-400 border-blue-400' : 'border-gray-700 text-gray-300 hover:text-blue-400'} transition-colors`}
                                    >
                                        결론
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 스켈레톤 UI 컴포넌트
const PostDetailSkeleton = () => {
    return (
        <div className="relative min-h-screen pt-28 pb-20">
            <div className="container mx-auto px-4 py-6">
                <div className="h-5 w-40 bg-gray-700/30 rounded mb-8" />

                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-grow max-w-3xl animate-pulse">
                        {/* 카테고리 배지 스켈레톤 */}
                        <div className="h-6 w-24 bg-gray-700/30 rounded-full mb-4" />

                        {/* 제목 및 설명 스켈레톤 */}
                        <div className="h-10 bg-gray-700/30 rounded mb-2 w-3/4" />
                        <div className="h-8 bg-gray-700/30 rounded mb-4 w-1/2" />
                        <div className="h-5 bg-gray-700/30 rounded mb-6 w-full" />

                        {/* 메타 정보 스켈레톤 */}
                        <div className="flex gap-4 mb-8">
                            <div className="h-5 w-24 bg-gray-700/30 rounded" />
                            <div className="h-5 w-20 bg-gray-700/30 rounded" />
                        </div>

                        {/* 썸네일 이미지 스켈레톤 */}
                        <div className="h-[300px] md:h-[400px] bg-gray-700/30 rounded-xl mb-8" />

                        {/* 태그 목록 스켈레톤 */}
                        <div className="flex gap-2 mb-8">
                            <div className="h-6 w-16 bg-gray-700/30 rounded" />
                            <div className="h-6 w-20 bg-gray-700/30 rounded" />
                            <div className="h-6 w-24 bg-gray-700/30 rounded" />
                        </div>

                        {/* 본문 영역 스켈레톤 */}
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

                    {/* 사이드바 스켈레톤 */}
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