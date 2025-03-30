'use client';

import React, { useState, useEffect } from 'react';
import { postsData, Post } from '@/constants/posts';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Search, X } from 'lucide-react';

export default function Posts() {
    const [category, setCategory] = useState<'all' | 'development' | 'cs' | 'algorithm'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 카테고리와 검색어에 따라 포스트 필터링
        const filtered = postsData.filter((post) => {
            const matchesCategory = category === 'all' || post.category === category;
            const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

            return matchesCategory && matchesSearch;
        });

        setFilteredPosts(filtered);
        setIsLoading(false);
    }, [category, searchTerm]);

    return (
        <div className="relative min-h-screen pt-28 pb-20">
            <div
                className="fixed inset-0 z-[-1]"
                style={{
                    background: "radial-gradient(131.64% 50.74% at 97.42% 14.64%, rgba(73, 149, 236, 0.30) 0%, rgba(41, 85, 134, 0.00) 70%)"
                }}
            />

            <div className="container mx-auto px-4 py-8 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl md:text-4xl weight-600 sm:weight-700 mb-2">포스팅</h1>
                    <p className="text-gray-400 mb-8 text-lg">개발, CS 지식 및 알고리즘에 관한 다양한 글을 공유합니다</p>

                    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
                        <div className="flex flex-wrap bg-black-05p rounded-lg overflow-hidden border border-gray-800/50 w-full sm:w-auto">
                            <button
                                className={`px-4 py-2 text-sm transition-all cursor-pointer ${
                                    category === 'all'
                                        ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                                        : 'hover:bg-black-10p hover:text-blue-400 text-gray-300'
                                }`}
                                onClick={() => setCategory('all')}
                            >
                                전체
                            </button>
                            <button
                                className={`px-4 py-2 text-sm transition-all cursor-pointer ${
                                    category === 'development'
                                        ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                                        : 'hover:bg-black-10p hover:text-blue-400 text-gray-300'
                                }`}
                                onClick={() => setCategory('development')}
                            >
                                개발 포스팅
                            </button>
                            <button
                                className={`px-4 py-2 text-sm transition-all cursor-pointer ${
                                    category === 'cs'
                                        ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                                        : 'hover:bg-black-10p hover:text-blue-400 text-gray-300'
                                }`}
                                onClick={() => setCategory('cs')}
                            >
                                CS 지식
                            </button>
                            <button
                                className={`px-4 py-2 text-sm transition-all cursor-pointer ${
                                    category === 'algorithm'
                                        ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                                        : 'hover:bg-black-10p hover:text-blue-400 text-gray-300'
                                }`}
                                onClick={() => setCategory('algorithm')}
                            >
                                알고리즘
                            </button>
                        </div>

                        <div className="relative">
                            <div className="flex items-center bg-black-05p rounded-lg border border-gray-800/50 overflow-hidden">
                                <div className="pl-3">
                                    <Search size={18} className="text-gray-400"/>
                                </div>
                                <input
                                    type="text"
                                    placeholder="검색어를 입력하세요"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-transparent px-2 py-2 outline-none text-sm w-full"
                                />
                                {searchTerm && (
                                    <button
                                        className="px-3 hover:text-blue-400"
                                        onClick={() => setSearchTerm('')}
                                        aria-label="검색어 지우기"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 포스트 목록 */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <PostCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : (
                        <>
                            {filteredPosts.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {filteredPosts.map((post) => (
                                        <PostCard key={post.id} post={post} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <p className="text-gray-400 text-lg">검색 결과가 없습니다</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

// 포스트 카드 컴포넌트
// app/posts/page.tsx의 PostCard 컴포넌트 개선

const PostCard = ({ post }: { post: Post }) => {
    // 카테고리별 텍스트, 색상, 아이콘, 그라데이션 결정
    const categoryText =
        post.category === 'development' ? '개발 포스팅' :
            post.category === 'cs' ? 'CS 지식' :
                '알고리즘';

    const categoryColor =
        post.category === 'development' ? 'bg-green-500/10 text-green-400' :
            post.category === 'cs' ? 'bg-purple-500/10 text-purple-400' :
                'bg-yellow-500/10 text-yellow-400';

    // 카테고리에 따른 아이콘 및 그라디언트 색상 설정
    const categoryIcon =
        post.category === 'development' ? '{ }' :
            post.category === 'cs' ? 'CS' :
                '⊃∪'; // 알고리즘 아이콘 (집합 기호)

    const gradientColors =
        post.category === 'development' ? 'from-green-500/20 via-blue-500/20 to-cyan-500/20' :
            post.category === 'cs' ? 'from-purple-500/20 via-blue-500/20 to-indigo-500/20' :
                'from-yellow-500/20 via-orange-500/20 to-red-500/20';

    return (
        <Link href={`/posts/${post.slug}`} className="group">
            <div className="bg-black-05p border border-gray-800/50 hover:border-blue-500/30 rounded-lg overflow-hidden transition-all duration-300 h-full flex flex-col hover:shadow-lg hover:shadow-blue-500/10">
                <div className="relative h-48 overflow-hidden">
                    {post.thumbnail ? (
                        <Image
                            src={post.thumbnail}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors} flex items-center justify-center`}>
                            <div className="relative z-10 text-center">
                                <span className="text-4xl md:text-5xl opacity-80 font-mono">
                                    {categoryIcon}
                                </span>
                                <div className="mt-2 px-3 py-1 rounded bg-black/20 backdrop-blur-sm">
                                    <span className="text-sm opacity-90">{post.tags[0] || categoryText}</span>
                                </div>
                            </div>
                            <div className="absolute top-[10%] right-[10%] w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
                            <div className="absolute bottom-[10%] left-[10%] w-16 h-16 bg-white/5 rounded-full blur-xl"></div>

                            {/* 알고리즘 카테고리일 경우 추가적인 시각 요소 */}
                            {post.category === 'algorithm' && (
                                <>
                                    <div className="absolute top-[30%] left-[20%] w-6 h-6 bg-yellow-500/10 rounded-sm blur-md animate-pulse"></div>
                                    <div className="absolute bottom-[25%] right-[25%] w-8 h-8 bg-orange-500/10 rounded-md blur-md animate-pulse delay-300"></div>
                                </>
                            )}
                        </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                        <span className={`px-2 py-1 rounded text-xs ${categoryColor}`}>
                            {categoryText}
                        </span>
                    </div>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                    <h2 className={`text-xl font-semibold mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors
                                 ${!post.thumbnail ? 'text-lg md:text-xl' : ''}`}>
                        {post.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                        {post.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="bg-black-10p px-2 py-0.5 rounded-md text-xs text-gray-300">
                                {tag}
                            </span>
                        ))}
                        {post.tags.length > 3 && (
                            <span className="text-xs text-gray-500 self-center">+{post.tags.length - 3}</span>
                        )}
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-800/30">
                        <div className="flex items-center text-gray-400 text-xs">
                            <Calendar size={14} className="mr-1" />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center text-gray-400 text-xs">
                            <Clock size={14} className="mr-1" />
                            <span>{post.readingTime}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

// 포스트 카드 스켈레톤 컴포넌트
const PostCardSkeleton = () => {
    return (
        <div className="bg-black-05p border border-gray-800/50 rounded-lg overflow-hidden h-full flex flex-col animate-pulse">
            <div className="h-48 bg-gray-700/30" />
            <div className="p-4 flex flex-col flex-grow">
                <div className="h-6 bg-gray-700/30 rounded mb-2 w-3/4" />
                <div className="h-4 bg-gray-700/30 rounded mb-1 w-full" />
                <div className="h-4 bg-gray-700/30 rounded mb-4 w-2/3" />

                <div className="flex gap-1.5 mb-4">
                    <div className="h-5 bg-gray-700/30 rounded w-16" />
                    <div className="h-5 bg-gray-700/30 rounded w-20" />
                    <div className="h-5 bg-gray-700/30 rounded w-14" />
                </div>

                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-800/30">
                    <div className="h-4 bg-gray-700/30 rounded w-20" />
                    <div className="h-4 bg-gray-700/30 rounded w-16" />
                </div>
            </div>
        </div>
    );
};