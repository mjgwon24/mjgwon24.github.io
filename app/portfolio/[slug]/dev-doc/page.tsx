import React from 'react';
import { projectDevDocs } from '@/constants/dev-doc';
import { notFound } from 'next/navigation';

interface Props {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    return Object.keys(projectDevDocs).map((slug) => ({
        slug,
    }));
}

const ProjectDetailPage = async ({ params }: Props) => {
    const slug = await params.slug;
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

    return (
        <div className="bg-gradient-to-b from-gray-900 to-black">
            <div className="relative z-10 container mx-auto px-4 py-12 sm:py-20 flex flex-col items-center">
                <div className="container mx-auto px-6 py-16">
                    <header className="text-center">
                        <div className="flex flex-col items-center mb-6 sm:mb-12 text-center">
                            <h1 className="text-3xl sm:text-4xl weight-600 sm:weight-700 mb-1 sm:mb-4">
                                {projectDoc.projectName} 개발 문서
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">
                                {projectDoc.subtitle}
                            </p>
                        </div>
                    </header>

                    <nav className="mb-16 p-8 bg-gray-800/50 rounded-2xl backdrop-blur-sm max-w-3xl mx-auto">
                        <h2 className="sm:text-xl font-semibold text-gray-100 mb-6">목차</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                            {sections.map((section, index) => (
                                <li key={section.id} className="flex items-center space-x-2">
                                    <span className="text-blue-400">{index + 1}.</span>
                                    <a href={`#${section.id}`} className="sm:text-[16px] text-sm hover:text-blue-400 transition-colors duration-300 inline-block">
                                        {section.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="space-y-24 max-w-3xl mx-auto">
                        {sections.map((section, index) => {
                            const sectionData = projectDoc.sections[section.id as keyof typeof projectDoc.sections];
                            return (
                                <section key={section.id} id={section.id} className="scroll-mt-28">
                                    <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-blue-400">
                                        {index + 1}. {sectionData.title}
                                    </h2>
                                    <div className="bg-gray-800/30 p-6 rounded-xl">
                                        <p className="text-gray-300">{sectionData.content}</p>
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailPage;