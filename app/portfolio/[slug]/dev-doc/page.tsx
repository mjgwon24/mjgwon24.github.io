'use client';

import React from 'react';
import { projectDevDocs } from '@/constants/dev-doc';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';

const ProjectDetailPage = ({ params }: Props) => {
    const resolvedParams = React.use(params);
    const slug = resolvedParams.slug;
    const projectDoc = projectDevDocs[slug];

    if (!projectDoc) {
        notFound();
    }

    const sections = [
        { id: 'planning', title: '기획' },
        { id: 'requirements', title: '프로젝트 요구사항' },
        { id: 'architecture', title: '아키텍처 및 기술 설계' },
        { id: 'process', title: '서비스 프로세스' },
        { id: 'api', title: 'REST API' },
        { id: 'problemSolving', title: '문제 해결 및 성능 개선' },
        { id: 'results', title: '성과' },
        { id: 'retrospective', title: '회고' }
    ];

    React.useEffect(() => {
        if (window.location.hash) {
            const element = document.getElementById(window.location.hash.substring(1));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            }
        }
    }, []);

    return (
        <div
            className="relative min-h-screen pt-28 py-24 bg-gradient-to-b from-gray-900 to-black"
            style={{ scrollBehavior: 'smooth' }}
        >
            <div className="space-y-24 max-w-3xl mx-auto">

                <div className="relative container mx-auto px-4 flex flex-col items-center">
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
                                            <ReactMarkdown
                                                rehypePlugins={[rehypeRaw, rehypeHighlight]}
                                                components={{
                                                    h1: ({...props}) => <h1 className="text-xl weight-500 my-2" {...props} />,
                                                    h2: ({...props}) => <h2 className="text-lg weight-500 my-2" {...props} />,
                                                    h3: ({...props}) => <h3 className="weight-500 my-2" {...props} />,
                                                    ul: ({...props}) => <ul className="list-disc ml-5 my-2" {...props} />,
                                                    ol: ({...props}) => <ol className="list-decimal ml-5 my-2" {...props} />,
                                                    hr: ({...props}) => <hr className="border-gray-700 my-4" {...props} />,
                                                    code: ({inline, ...props}) => inline
                                                        ? <code className="bg-gray-800 px-1 rounded" {...props} />
                                                        : <code className="block bg-gray-800 p-2 rounded my-2" {...props} />
                                                }}
                                            >
                                                {sectionData.content}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                )}
                            </section>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default ProjectDetailPage;