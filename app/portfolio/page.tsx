'use client';

import React from 'react';
import { projectsData } from '@/constants/home';
import ProjectCard from '@/components/project/ProjectCard';

export default function Portfolio() {
    return (
        <div className="relative min-h-screen pt-28 py-24">
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(131.64% 50.74% at 97.42% 14.64%, rgba(73, 149, 236, 0.30) 0%, rgba(41, 85, 134, 0.00) 70%)"
                }}
            />

            <div className="relative z-10 container mx-auto px-4 py-12 sm:py-20 flex flex-col items-center">
                <div className="flex flex-col items-center mb-12 sm:mb-20 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                        ✨ 포트폴리오
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">
                        진행했던 다양한 프로젝트들을 소개합니다!
                    </p>
                </div>

                {/* 프로젝트 그리드 */}
                <div className="w-full max-w-7xl mx-auto flex flex-col items-center sm:min-w-[664px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                        {projectsData.map((project, index) => (
                            <div key={index} className="w-full max-w-sm">
                                <ProjectCard
                                    image={project.image}
                                    title={project.title}
                                    period={project.period}
                                    organization={project.organization}
                                    description={project.description}
                                    roles={project.roles}
                                    tags={project.tags}
                                    slug={project.slug}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div
                className="absolute bottom-0 left-0 right-0 h-60 z-0"
                style={{
                    background: "linear-gradient(180deg, rgba(41, 85, 134, 0.00) 0%, rgba(73, 149, 236, 0.30) 100%)"
                }}
            />
        </div>
    );
}