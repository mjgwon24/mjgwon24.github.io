'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { projectsData } from '@/constants/home';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Contribution {
    role: string;
    contributions: string[];
}

interface Project {
    image: string;
    title: string;
    period: string;
    organization: string;
    description: string;
    detailedDescription?: string;
    roles: string[];
    tags: string[];
    techStacks: string[];
    slug: string;
    links?: {
        github?: string;
        live?: string;
    };
    rolesAndContributions?: Contribution[];
    detailImages?: string[];
    achievements?: {
        title: string;
        description: string;
        date: string;
    }[];
}

export default function ProjectDetail() {
    const params = useParams();
    const { slug } = params;
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [allImages, setAllImages] = useState<string[]>([]);

    useEffect(() => {
        const foundProject = projectsData.find(p => p.slug === slug);
        setProject(foundProject || null);

        if (foundProject) {
            // 대표 이미지를 첫 번째로, 그 다음에 상세 이미지들 추가
            const images = [foundProject.image];
            if (foundProject.detailImages && foundProject.detailImages.length > 0) {
                images.push(...foundProject.detailImages);
            }
            setAllImages(images);
        }

        setLoading(false);
    }, [slug]);

    const openImageModal = (imgSrc: string) => {
        setSelectedImage(imgSrc);
        document.body.style.overflow = 'hidden';
    };

    const closeImageModal = () => {
        setSelectedImage(null);
        document.body.style.overflow = '';
    };

    const nextSlide = () => {
        if (allImages.length <= 1) return;
        setCurrentSlide((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        if (allImages.length <= 1) return;
        setCurrentSlide((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
    };

    // 통합 이미지 슬라이더 렌더링
    const renderIntegratedImageSlider = () => {
        if (!project || allImages.length === 0) return null;

        return (
            <div className="mb-1 sm:mb-5 w-full max-w-3xl mx-auto">
                <div className="relative">
                    <div className="relative h-[250px] sm:h-[450px]">
                        {allImages.map((imgSrc, idx) => (
                            <div
                                key={idx}
                                className={`absolute inset-0 transition-opacity duration-500 cursor-pointer overflow-hidden
                                       ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                onClick={() => openImageModal(imgSrc)}
                            >
                                <Image
                                    src={imgSrc}
                                    alt={`${project.title} ${idx === 0 ? '대표 이미지' : `스크린샷 ${idx}`}`}
                                    fill
                                    className="object-contain"
                                    style={{borderRadius: '0.5rem'}}
                                    priority={idx === 0} // 첫 번째 이미지 우선 로딩
                                />
                            </div>
                        ))}

                        {allImages.length > 1 && (
                            <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
                                {allImages.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentSlide(idx)}
                                        className={`w-2 h-2 rounded-full transition-all
                                              ${idx === currentSlide
                                            ? 'bg-blue-400 w-4'
                                            : 'bg-gray-400 bg-opacity-50'}`}
                                        aria-label={`슬라이드 ${idx + 1} 보기`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {allImages.length > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/10 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 p-2 rounded-full transition-all duration-200"
                                aria-label="이전 이미지"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/10 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 p-2 rounded-full transition-all duration-200"
                                aria-label="다음 이미지"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}
                </div>
            </div>
        );
    };

    const renderOtherProjects = () => {
        const otherProjects = projectsData
            .filter(p => p.slug !== slug)
            .slice(0, 3);

        if (otherProjects.length === 0) return null;

        return (
            <div className="max-w-5xl mx-auto mt-20">
                <h2 className="text-2xl weight-600 sm:weight-700 mb-8 select-none">다른 프로젝트도 둘러보기</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {otherProjects.map((proj) => (
                        <Link
                            key={proj.slug}
                            href={`/portfolio/${proj.slug}`}
                            className="group bg-black-05p rounded-lg overflow-hidden border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={proj.image}
                                    alt={proj.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                        {proj.tags.slice(0, 2).map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded text-xs text-gray-300"
                                            >
                                            {tag}
                                        </span>
                                        ))}
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">{proj.title}</h3>
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-sm text-gray-400 line-clamp-2">{proj.description}</p>
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex gap-1.5">
                                        {proj.roles.slice(0, 2).map((role, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded-md text-xs"
                                            >
                                            {role}
                                        </span>
                                        ))}
                                        {proj.roles.length > 2 && (
                                            <span className="text-xs text-gray-500 self-center">+{proj.roles.length - 2}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    };

    if (loading) {
        return <ProjectDetailSkeleton />;
    }

    if (!project) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen pt-28">
                <h1 className="text-3xl weight-600 sm:weight-700 mb-4">프로젝트를 찾을 수 없습니다</h1>
                <Link
                    href="/portfolio"
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors"
                >
                    <ArrowLeft size={16} />
                    <span>포트폴리오로 돌아가기</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen pt-28 pb-20">
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(131.64% 50.74% at 97.42% 14.64%, rgba(73, 149, 236, 0.30) 0%, rgba(41, 85, 134, 0.00) 70%)"
                }}
            />

            <div className="relative z-10 container mx-auto px-4 py-8">
                <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 mb-6 text-gray-300 hover:text-blue-500 transition-colors"
                >
                    <ArrowLeft size={16} />
                    <span>포트폴리오로 돌아가기</span>
                </Link>

                <div className="flex flex-col gap-0.5 sm:gap-2 sm:mb-5 max-w-3xl mx-auto">
                    <div
                        className="flex flex-col-reverse md:flex-row gap-2 justify-between items-start md:items-center">
                        <h1 className="text-2xl md:text-4xl weight-600 sm:weight-700">{project.title}</h1>
                        <div className="sm:bg-gradient-to-r sm:from-blue-500/10 sm:to-blue-400/5 sm:backdrop-blur-sm sm:border sm:border-blue-500/20 rounded-md sm:px-2 sm:py-0.5">
                            <p className="text-xs sm:text-sm text-gray-300 sm:text-blue-400">{project.period}</p>
                        </div>
                    </div>
                    <p className="sm:text-lg text-gray-400">{project.organization}</p>
                </div>

                {renderIntegratedImageSlider()}

                <div className="max-w-3xl mx-auto">
                    {project.links && (
                        <div className="mb-5">
                            <div className="flex sm:flex-row-reverse flex-wrap gap-2 sm:gap-4">
                                {project.links.github && (
                                    <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 sm:gap-2 sm:px-5 sm:py-2.5 px-3 py-1 rounded-lg border border-gray-700 bg-black-05p hover:bg-black-10p transition-colors duration-200"
                                    >
                                        <Image
                                            src="/icon/github.svg"
                                            width={20}
                                            height={20}
                                            alt="GitHub"
                                            className="opacity-80"
                                        />
                                        <span className="text-gray-200 sm:text-[16px] text-xs">GitHub</span>
                                    </a>
                                )}
                                {project.links.live && (
                                    <a
                                        href={project.links.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors duration-200 sm:text-[16px] text-xs"
                                    >
                                        <span>Live Demo</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="mb-8">
                        <h2 className="text-2xl weight-600 sm:weight-700 mb-4 select-none">프로젝트 개요</h2>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag: string, index: number) => (
                                <span
                                    key={index}
                                    className="bg-black-10p px-3 py-1 rounded-md text-sm select-none"
                                >
                  {tag}
                </span>
                            ))}
                        </div>
                        <p className="text-gray-300">{project.detailedDescription || project.description}</p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl weight-600 sm:weight-700 mb-4 select-none">역할 및 기여</h2>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.roles.map((role: string, index: number) => (
                                <span
                                    key={index}
                                    className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-md text-sm select-none"
                                >
                                    {role}
                                </span>
                            ))}
                        </div>

                        {project.rolesAndContributions && project.rolesAndContributions.length > 0 ? (
                            <div className="space-y-6">
                                {project.rolesAndContributions.map((item, index) => (
                                    <div key={index}
                                         className="bg-black-05p rounded-lg border border-gray-800/50 px-5 pt-3 pb-4">
                                        <h3 className="text-lg font-semibold mb-2 sm:mb-3 pl-1 text-blue-400">{item.role}</h3>
                                        <ul className="list-disc pl-5 text-gray-300 space-y-2">
                                            {item.contributions.map((contribution, cIndex) => (
                                                <li key={cIndex}>{contribution}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <ul className="list-disc pl-5 text-gray-300 space-y-2">
                                <li>프로젝트의 아키텍처 설계 및 핵심 기능 구현</li>
                                <li>팀원들과의 협업을 통한 효율적인 개발 프로세스 구축</li>
                                <li>사용자 피드백을 반영한 지속적인 개선 작업</li>
                            </ul>
                        )}
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl weight-600 sm:weight-700 mb-4 select-none">주요 성과</h2>
                        <div className="space-y-4">
                            {project.achievements ? (
                                project.achievements.map((achievement, index) => (
                                    <div key={index}
                                         className="bg-black-05p rounded-lg border border-gray-800/50 px-5 pt-3 pb-4">
                                        <div
                                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                            <h3 className="text-lg font-semibold text-blue-400">{achievement.title}</h3>
                                            <span className="text-sm text-gray-400">{achievement.date}</span>
                                        </div>
                                        <p className="text-gray-300">{achievement.description}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 italic">등록된 성과가 없습니다.</p>
                            )}
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl weight-600 sm:weight-700 mb-4 select-none">사용 기술</h2>
                        <div className="flex flex-wrap gap-2">
                            {project.techStacks.map((techStack: string, index: number) => (
                                <span
                                    key={index}
                                    className="bg-blue-900/20 text-blue-300 px-3 py-1 rounded-md text-sm select-none"
                                >
                {techStack}
            </span>
                            ))}
                        </div>
                    </div>

                    {renderOtherProjects()}

                    {selectedImage && (
                        <div
                            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
                            onClick={closeImageModal}
                        >
                            <div className="relative max-w-4xl max-h-[90vh] w-full">
                                <button
                                    className="absolute -top-12 right-0 text-white p-2 rounded-full hover:bg-gray-800/50"
                                    onClick={closeImageModal}
                                >
                                    <X size={24}/>
                                </button>
                                <Image
                                    src={selectedImage}
                                    alt="확대된 이미지"
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto object-contain rounded-lg"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        </div>
                    )}
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

const ProjectDetailSkeleton = () => {
    return (
        <div className="relative min-h-screen pt-28 pb-20">
            <div className="container mx-auto px-4 py-8 animate-pulse">
                <div className="h-6 w-40 bg-gray-700/30 rounded mb-6"/>

                <div className="flex flex-col mb-10">
                    <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-6">
                        <div className="h-10 w-64 bg-gray-700/30 rounded"/>
                        <div className="h-8 w-28 bg-gray-700/30 rounded"/>
                    </div>
                    <div className="h-6 w-48 bg-gray-700/30 rounded"/>
                </div>

                <div className="rounded-lg overflow-hidden mb-5 w-full max-w-3xl mx-auto">
                    <div className="relative h-[250px] sm:h-[450px] bg-gray-700/30 rounded-lg">
                        <div className="absolute top-1/2 -translate-y-1/2 left-2">
                            <div className="w-10 h-10 rounded-full bg-gray-700/40"/>
                        </div>
                        <div className="absolute top-1/2 -translate-y-1/2 right-2">
                            <div className="w-10 h-10 rounded-full bg-gray-700/40"/>
                        </div>

                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                            <div className="w-4 h-2 rounded-full bg-gray-700/40"/>
                            <div className="w-2 h-2 rounded-full bg-gray-700/40"/>
                            <div className="w-2 h-2 rounded-full bg-gray-700/40"/>
                        </div>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="mb-5">
                        <div className="h-8 w-48 bg-gray-700/30 rounded mb-4"/>
                        <div className="h-4 w-full bg-gray-700/30 rounded mb-2"/>
                        <div className="h-4 w-full bg-gray-700/30 rounded mb-2"/>
                        <div className="h-4 w-3/4 bg-gray-700/30 rounded"/>
                    </div>

                    <div className="mb-8">
                        <div className="h-8 w-48 bg-gray-700/30 rounded mb-4"/>
                        <div className="flex gap-2 mb-4">
                            <div className="h-8 w-20 bg-gray-700/30 rounded"/>
                            <div className="h-8 w-20 bg-gray-700/30 rounded"/>
                        </div>
                        <div className="h-4 w-full bg-gray-700/30 rounded mb-2"/>
                        <div className="h-4 w-full bg-gray-700/30 rounded mb-2"/>
                        <div className="h-4 w-3/4 bg-gray-700/30 rounded"/>
                    </div>

                    <div className="mb-8">
                        <div className="h-8 w-48 bg-gray-700/30 rounded mb-4"/>
                        <div className="flex gap-2">
                            <div className="h-8 w-16 bg-gray-700/30 rounded"/>
                            <div className="h-8 w-16 bg-gray-700/30 rounded"/>
                            <div className="h-8 w-16 bg-gray-700/30 rounded"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto mt-8">
                <div className="h-8 w-48 bg-gray-700/30 rounded mb-6"/>
                <div className="relative h-[300px] sm:h-[400px] bg-gray-700/30 rounded-lg">
                    <div className="absolute inset-y-0 left-2 flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-700/40"/>
                    </div>
                    <div className="absolute inset-y-0 right-2 flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-700/40"/>
                    </div>

                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                        <div className="w-4 h-2 rounded-full bg-gray-700/40"/>
                        <div className="w-2 h-2 rounded-full bg-gray-700/40"/>
                        <div className="w-2 h-2 rounded-full bg-gray-700/40"/>
                        <div className="w-2 h-2 rounded-full bg-gray-700/40"/>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto mt-20">
                <div className="h-8 w-48 bg-gray-700/30 rounded mb-8"/>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-black-05p border border-gray-800/50 rounded-lg overflow-hidden">
                            <div className="h-48 bg-gray-700/30 relative">
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <div className="flex gap-2 mb-2">
                                        <div className="h-5 w-16 bg-gray-700/40 rounded"/>
                                        <div className="h-5 w-16 bg-gray-700/40 rounded"/>
                                    </div>
                                    <div className="h-6 w-36 bg-gray-700/40 rounded"/>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="h-4 w-full bg-gray-700/30 rounded mb-2"/>
                                <div className="h-4 w-2/3 bg-gray-700/30 rounded mb-4"/>
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-1">
                                        <div className="h-5 w-16 bg-gray-700/40 rounded"/>
                                        <div className="h-5 w-16 bg-gray-700/40 rounded"/>
                                    </div>
                                    <div className="h-4 w-16 bg-gray-700/40 rounded"/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};