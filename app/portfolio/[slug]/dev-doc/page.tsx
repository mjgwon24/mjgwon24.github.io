'use client';

import React, { useState, useEffect } from 'react';
import { projectDevDocs } from '@/constants/dev-doc';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import components from '@/components/MarkdownComponents';
import { IoArrowBack } from 'react-icons/io5';
import { FaArrowUp } from 'react-icons/fa';
import ImageModal from "@/components/modal/ImageModal";

interface RouteParams {
    params: {
        slug: string;
    };
}

const ProjectDetailPage = ({ params }: RouteParams) => {
    const { slug } = React.use(params);
    const projectDoc = projectDevDocs[slug];

    if (!projectDoc) {
        notFound();
    }

    const sectionDefinitions = [
        { id: 'planning', title: '기획' },
        { id: 'requirements', title: '프로젝트 요구사항' },
        { id: 'architecture', title: '아키텍처 및 기술 설계' },
        { id: 'wbs', title: 'WBS' },
        { id: 'process', title: '서비스 프로세스' },
        { id: 'flowchart', title: '시퀀스 다이어그램' },
        { id: 'api', title: 'REST API' },
        { id: 'improvement', title: '최적화 및 트레이드 오프'},
        { id: 'problemSolving', title: '문제 해결' },
        { id: 'results', title: '성과' },
        { id: 'retrospective', title: '회고' }
    ];

    const sections = sectionDefinitions.filter(section =>
        section.id in projectDoc.sections
    );

    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollToTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div
            className="relative min-h-screen pt-28 py-24 bg-gradient-to-b from-gray-900 to-black"
            style={{ scrollBehavior: 'smooth' }}
        >
            <div className="space-y-24 max-w-3xl mx-auto">

                <div className="relative container mx-auto px-4 flex flex-col items-center">
                    <div className="absolute top-4 left-4">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-800/60 text-white transition-all duration-300 cursor-pointer shadow-md"
                            aria-label="뒤로 가기"
                        >
                            <IoArrowBack className="text-xl" />
                        </button>
                    </div>

                    <header className="text-center my-8 sm:my-12">
                        <h1 className="text-3xl sm:text-4xl weight-600 text-white mb-2 sm:mb-4">{projectDoc.projectName} 개발 문서</h1>
                        <p className="text-lg text-gray-300">{projectDoc.subtitle}</p>
                    </header>

                    <div className="w-full mb-6 sm:mb-12">
                        <div className="py-6 px-6 bg-gradient-to-r from-gray-800/40 to-gray-800/20 rounded-xl border border-gray-700/30 shadow-lg">
                            <h3 className="weight-500 text-white mb-4 select-none">목차</h3>
                            <nav className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {sections.map((section, index) => (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const element = document.getElementById(section.id);
                                            if (element) {
                                                window.history.pushState(null, '', `#${section.id}`);
                                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                            }
                                        }}
                                        className="px-3 py-1.5 text-sm sm:text-base text-gray-300 hover:text-blue-400 hover:bg-gray-700/30 rounded-md transition-all duration-200 flex items-center"
                                    >
                                        <span className="mr-2 inline-flex items-center justify-center w-6 h-6 bg-blue-900/40 text-blue-300 rounded-full text-xs weight-500">{index + 1}</span>
                                        {section.title}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {sections.map((section, index) => {
                        const sectionData = projectDoc.sections[section.id as keyof typeof projectDoc.sections];
                        if (!sectionData) {
                            return null;
                        }
                        const [isExpanded, setIsExpanded] = React.useState(true);

                        return (
                            <section key={section.id} id={section.id} className="scroll-mt-32 w-full max-w-3xl mx-auto my-6">
                                <h2
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="text-xl sm:text-2xl weight-600 mb-5 flex items-center space-x-3 select-none cursor-pointer hover:text-blue-300 transition-colors"
                                >
                                    <div className="flex flex-row items-center justify-between w-full">
                                        <div className="flex flex-row items-center gap-2">
                                        <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-900/40 text-blue-300 rounded-full text-sm weight-500">
                                            {index + 1}
                                        </span>
                                            <span className="text-gray-100">{sectionData.title}</span>
                                        </div>

                                        <span className="text-gray-400 ml-2 text-xs pr-2">
                                        {isExpanded ? '▲' : '▼'}
                                    </span>
                                    </div>
                                </h2>

                                {isExpanded && (
                                    <div className="bg-gray-800/30 sm:p-8 p-6 rounded-xl transition-all duration-300">
                                        <div className="text-gray-200 weight-400 prose prose-invert prose-pre:bg-gray-800/50 prose-pre:border prose-pre:border-gray-700 max-w-none">
                                            {sectionData.content && (
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    rehypePlugins={[rehypeRaw]}
                                                    components={{ ...components }}
                                                >
                                                    {sectionData.content}
                                                </ReactMarkdown>
                                            )}

                                            {sectionData.link && (
                                                <div className="flex flex-row justify-center">
                                                    <a
                                                        href={sectionData.link.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-900/60 to-blue-800/40 hover:from-blue-800/60 hover:to-blue-700/40 border border-blue-700/30 rounded-lg text-blue-200 hover:text-blue-100 text-sm transition-all duration-300 shadow-lg hover:shadow-blue-900/20"
                                                    >
                                                        {sectionData.link.text}
                                                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            )}

                                            {sectionData.image && <ImageModal image={sectionData.image} />}
                                        </div>
                                    </div>
                                )}
                            </section>
                        );
                    })}
                </div>

                {showScrollToTop && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-gray-800/80 to-gray-900/80 hover:from-blue-900/60 hover:to-blue-800/60 text-gray-300 hover:text-blue-200 rounded-xl border border-gray-700/30 hover:border-blue-700/50 shadow-lg hover:shadow-blue-900/20 flex items-center justify-center transition-all duration-300 backdrop-blur-sm transform hover:scale-105"
                        aria-label="최상단으로 이동"
                    >
                        <FaArrowUp className="text-lg group-hover:animate-pulse" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProjectDetailPage;