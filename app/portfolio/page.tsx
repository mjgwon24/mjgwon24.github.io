'use client';

import React, { useState, useEffect } from 'react';
import { projectsData } from '@/constants/home';
import ProjectCard from '@/components/project/ProjectCard';
import ProjectCardSkeleton from '@/components/project/ProjectCardSkeleton';

export default function Portfolio() {
    const [loading, setLoading] = useState<boolean>(true);
    const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleImageLoad = (index: number) => {
        setImagesLoaded(prev => ({
            ...prev,
            [index]: true
        }));
    };

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

                <div className="w-full max-w-7xl mx-auto flex flex-col items-center sm:min-w-[664px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                        {loading ? (
                            Array(6).fill(0).map((_, index) => (
                                <div key={index} className="w-full max-w-sm">
                                    <ProjectCardSkeleton />
                                </div>
                            ))
                        ) : (
                            projectsData.map((project, index) => (
                                <div key={index} className="w-full max-w-sm relative">
                                    {!imagesLoaded[index] && (
                                        <div className="absolute inset-0 z-10">
                                            <ProjectCardSkeleton />
                                        </div>
                                    )}

                                    <div className={`transition-opacity duration-300 ${imagesLoaded[index] ? 'opacity-100' : 'opacity-0'}`}>
                                        <ProjectCard
                                            {...project}
                                            onImageLoad={() => handleImageLoad(index)}
                                        />
                                    </div>
                                </div>
                            ))
                        )}
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