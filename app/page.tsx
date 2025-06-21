'use client';

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { projectsData, linkCardsData } from "@/constants/home";
import SectionTitle from "@/components/section/SectionTitle";
import LinkCard from "@/components/home/LinkCard";
import ProjectCard from "@/components/project/ProjectCard";
import ProjectCardSkeleton from "@/components/project/ProjectCardSkeleton";
import Link from "next/link";
import Slider from "@/components/home/Slider";

const STACK_IMAGES = [
  {
    src: '/portfolio/stack-snapshot/thumb/thumb12.gif',
    alt: '스택네컷 서비스 현장',
    width: 320,
    height: 250,
  },
  {
    src: '/portfolio/stack-snapshot/thumb/thumb13.jpg',
    alt: '스택네컷 서비스 현장2',
    width: 340,
    height: 250,
  },
  {
    src: '/portfolio/stack-snapshot/thumb/thumb1.png',
    alt: '스택네컷',
    width: 360,
    height: 250,
  }
];

const FIS_AWARD_IMAGES = [
    {
        src: '/fisa/award/fisa1.png',
        alt: '우리FIS 최종 프로젝트 시상식 현장 1',
        width: 340,
        height: 250,
    },
    {
        src: '/fisa/award/fisa2.png',
        alt: '우리FIS 최종 프로젝트 시상식 현장 2',
        width: 300,
        height: 250,
    },
    {
        src: '/fisa/award/fisa3.png',
        alt: '우리FIS 최종 프로젝트 시상식 현장 3',
        width: 300,
        height: 250,
    },
    {
        src: '/fisa/award/fisa4.png',
        alt: '우리FIS 최종 프로젝트 시상식 현장 4',
        width: 300,
        height: 250,
    }
];


/**
 * 브라우저 창 높이 추적 및 창 크기 변경 시 업데이트된 높이 반환 훅
 */
function useWindowHeight() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(window.innerHeight);

    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return height;
}

/**
 * 섹션 가시성 추적 훅
 * @param refs 섹션 참조 객체들
 */
function useSectionVisibility(refs: Record<string, React.RefObject<HTMLDivElement>>) {
  const [visible, setVisible] = useState<Record<string, boolean>>(
      Object.fromEntries(Object.keys(refs).map(key => [key, false]))
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            Object.entries(refs).forEach(([key, ref]) => {
              if (entry.target === ref.current) {
                setVisible(prev => ({ ...prev, [key]: entry.isIntersecting }));
              }
            });
          });
        },
        { threshold: 0.1, rootMargin: '-40px' }
    );

    Object.values(refs).forEach(ref => ref.current && observer.observe(ref.current));
    return () => observer.disconnect();
  }, [refs]);

  return visible;
}

/**
 * 소개 섹션 컴포넌트
 * @param visible 섹션 가시성 여부
 * @param refObj 섹션 참조 객체
 * @constructor
 */
function IntroSection({ visible, refObj }: { visible: boolean; refObj: React.RefObject<HTMLDivElement> }) {
  return (
      <div
          ref={refObj}
          className={`flex flex-col mb-3 sm:mb-44 gap-6 items-center transition-all duration-1000 
      ${visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <Image
            className="rounded-full w-[90px] sm:w-[120px]"
            src="/profile/profile-circle.png"
            alt="Profile picture"
            width={120}
            height={120}
            priority
        />
        <h1 className="text-white text-2xl sm:text-4xl weight-700 text-center leading-snug select-none">
          개발을 사랑하는 개발자,<br />
          <span className="text-blue-500">권민지</span>입니다.
        </h1>
      </div>
  );
}

/**
 * IT 개발 동아리 섹션 컴포넌트
 * @param visible 섹션 가시성 여부
 * @param refObj 섹션 참조 객체
 * @param onImageLoad 이미지 로드 핸들러
 */
function ClubSection({ visible, refObj, onImageLoad }: { visible: boolean; refObj: React.RefObject<HTMLDivElement>; onImageLoad: () => void }) {
  return (
      <div
          ref={refObj}
          className={`flex flex-col gap-5 items-center transition-all duration-1000 w-full ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
      >
        <SectionTitle emoji="2023," title="IT 개발 동아리 설립"
                      subtitle="함께하는 개발을 위한 첫 걸음" />
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full">
          <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden shadow-lg shadow-blue-900/20 transition-transform duration-300">
            <Image
                src="/developer/developer-act1.webp"
                alt="개발 동아리 활동 사진 1"
                fill
                sizes="(max-width: 640px) 320px, 640px"
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-500 w-full"
                onLoad={onImageLoad}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-4 w-full max-w-2xl mx-auto">
        <span className="text-blue-200 weight-500 text-base whitespace-nowrap" style={{ textShadow: '0px 0px 4px rgba(255, 255, 255, 0.60)' }}>
          누적 활동 인원 총 86명
        </span>
          <span className="text-blue-200 weight-500 text-base whitespace-nowrap" style={{ textShadow: '0px 0px 4px rgba(255, 255, 255, 0.60)' }}>
          팀 프로젝트 8개 도출
        </span>
          <span className="text-blue-200 weight-500 text-base whitespace-nowrap" style={{ textShadow: '0px 0px 4px rgba(255, 255, 255, 0.60)' }}>
          교내 해커톤 개최
        </span>
        </div>
      </div>
  );
}

/**
 * 스택네컷 섹션 컴포넌트
 * @param visible 섹션 가시성 여부
 * @param refObj 섹션 참조 객체
 */
function StackNcutSection({ visible, refObj }: { visible: boolean; refObj: React.RefObject<HTMLDivElement> }) {
  return (
      <div
          ref={refObj}
          className={`flex flex-col gap-5 items-center transition-all duration-1000 w-full mt-12 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
      >
        <SectionTitle emoji="2024," title="스택네컷" subtitle="이벤트 행사를 위한 사진 촬영 서비스 출시" />
        <Slider images={STACK_IMAGES} fixedHeight={200} boxMaxWidth={760} />
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-4 w-full max-w-2xl mx-auto">
            <span className="text-blue-200 weight-500 text-base whitespace-nowrap" style={{ textShadow: '0px 0px 4px rgba(255, 255, 255, 0.60)' }}>
              누적 사용자 200명 이상
            </span>
              <span className="text-blue-200 weight-500 text-base whitespace-nowrap" style={{ textShadow: '0px 0px 4px rgba(255, 255, 255, 0.60)' }}>
              생성된 이미지 1,000장 이상
            </span>
        </div>
        <Link href="/portfolio/stack-snapshot" target="_blank" rel="noopener noreferrer" className="mt-4">
            <button className="cursor-pointer flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-blue-200 py-2 px-5 rounded-lg transition-all duration-300 border border-blue-400/30 hover:border-blue-400/50 shadow-sm hover:shadow-md">
                <span>프로젝트 상세 보기</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
          </button>
        </Link>
      </div>
  );
}

/**
 * 2025 우리FIS 최종 프로젝트 최우수상 섹션 컴포넌트
 * @param visible 섹션 가시성 여부
 * @param refObj 섹션 참조 객체
 */
function FISAwardSection({ visible, refObj }: { visible: boolean; refObj: React.RefObject<HTMLDivElement> }) {
    return (
        <div
            ref={refObj}
            className={`flex flex-col gap-5 items-center transition-all duration-1000 w-full mt-12 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
        >
            <SectionTitle
                emoji="2025,"
                title="우리FISA 최종 프로젝트 최우수상"
                subtitle="소비 데이터 기반 동적 금리 대출 서비스 구현"
            />

            <Slider images={FIS_AWARD_IMAGES} fixedHeight={220} boxMaxWidth={760} />
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-4 w-full max-w-2xl mx-auto">
                <span className="text-blue-200 weight-500 text-base whitespace-nowrap"
                      style={{ textShadow: '0px 0px 4px rgba(255, 255, 255, 0.60)' }}>
                기술 세미나 1등 수상
                </span>
                <span className="text-blue-200 weight-500 text-base whitespace-nowrap"
                      style={{ textShadow: '0px 0px 4px rgba(255, 255, 255, 0.60)' }}>
                최종 프로젝트 1등 수상
                </span>
                <span className="text-blue-200 weight-500 text-base whitespace-nowrap"
                      style={{ textShadow: '0px 0px 4px rgba(255, 255, 255, 0.60)' }}>
                우리FISA 우수 수료
                </span>
            </div>

            <div className="mt-4">
                <Link
                    href="/portfolio/flexrate"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button className="cursor-pointer flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-blue-200 py-2 px-5 rounded-lg transition-all duration-300 border border-blue-400/30 hover:border-blue-400/50 shadow-sm hover:shadow-md">
                        <span>프로젝트 상세 보기</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </button>
                </Link>
            </div>
        </div>
    );
}



/**
 * 포트폴리오 섹션 컴포넌트
 * @param visible 섹션 가시성 여부
 * @param refObj 섹션 참조 객체
 * @param loading 로딩 상태
 * @param imagesLoaded 이미지 로드 상태
 * @param handleImageLoad 이미지 로드 핸들러
 */
function PortfolioSection({
                            visible,
                            refObj,
                            loading,
                            imagesLoaded,
                            handleImageLoad,
                          }: {
  visible: boolean;
  refObj: React.RefObject<HTMLDivElement>;
  loading: boolean;
  imagesLoaded: Record<number, boolean>;
  handleImageLoad: (index: number) => void;
}) {
  return (
      <div
          ref={refObj}
          className={`flex flex-col gap-5 items-center transition-all duration-1000 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
      >
        <SectionTitle emoji="" title="포트폴리오" subtitle="진행한 프로젝트들을 소개합니다." showMoreLink="/portfolio" />
        <div className="flex flex-col gap-6">
          {[0, 2, 4].map(startIndex => (
              <div key={startIndex} className="flex flex-col sm:flex-row gap-6 items-center">
                {loading ? (
                    <>
                      <ProjectCardSkeleton />
                      <ProjectCardSkeleton />
                    </>
                ) : (
                    projectsData.slice(startIndex, startIndex + 2).map((project, index) => (
                        <div key={index} className="relative">
                          {!imagesLoaded[startIndex + index] && (
                              <div className="absolute inset-0 z-10">
                                <ProjectCardSkeleton />
                              </div>
                          )}
                          <div className={`transition-opacity duration-300 ${imagesLoaded[startIndex + index] ? 'opacity-100' : 'opacity-0'}`}>
                            <ProjectCard
                                key={index}
                                {...project}
                                onImageLoad={() => handleImageLoad(startIndex + index)}
                            />
                          </div>
                        </div>
                    ))
                )}
              </div>
          ))}
        </div>
        {projectsData.length > 6 && (
            <div className="mt-8 flex justify-center">
              <Link href="/portfolio">
                  <button className="cursor-pointer flex items-center gap-1 bg-gray-800 hover:bg-gray-700 text-blue-200 py-2 pl-5 pr-3.5 rounded-lg transition-all duration-300 border border-blue-400/30 hover:border-blue-400/50 shadow-sm hover:shadow-md">
                      <span className="text-xs sm:text-sm weight-500">
                          +{projectsData.length - 6}개의 프로젝트 더보기
                      </span>
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                  </button>
              </Link>
            </div>
        )}
      </div>
  );
}

/**
 * 링크 카드 섹션 컴포넌트
 * @param visible 섹션 가시성 여부
 * @param refObj 섹션 참조 객체
 */
function LinksSection({ visible, refObj }: { visible: boolean; refObj: React.RefObject<HTMLDivElement> }) {
  return (
      <div
          ref={refObj}
          className={`flex flex-col gap-5 items-center transition-all duration-1000 mt-28 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
      >
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-white text-2xl sm:text-3xl weight-700 pl-2 select-none">더 알고싶으신가요?</h2>
        </div>
        <div className="flex flex-col gap-8 sm:gap-0 sm:flex-row justify-between sm:w-[680px]">
          {linkCardsData.map((card, index) => (
              <LinkCard key={index} {...card} />
          ))}
        </div>
      </div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

  const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      intro: useRef<HTMLDivElement>(null!),
      techStack: useRef<HTMLDivElement>(null!),
      stackNcut: useRef<HTMLDivElement>(null!),
      fisAward: useRef<HTMLDivElement>(null!),
      portfolio: useRef<HTMLDivElement>(null!),
      links: useRef<HTMLDivElement>(null!),
  };

  const visibleSection = useSectionVisibility(refs);
  const height = useWindowHeight();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => ({ ...prev, [index]: true }));
  };

  return (
      <div className="relative min-h-screen w-full">
        <div
            className="absolute inset-0 z-0"
            style={{
              background: "radial-gradient(131.64% 30.74% at 97.42% 0%, rgba(73, 149, 236, 0.30) 0%, rgba(41, 85, 134, 0.00) 70%)"
            }}
        />
        <div
            className="relative justify-center z-10 grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
            style={{ paddingTop: `${height / 4}px` }}
        >
          <main className="flex flex-col row-start-2 items-center" style={{ gap: `${height / 4}px` }}>
            <IntroSection visible={visibleSection.intro} refObj={refs.intro} />
            <ClubSection visible={visibleSection.techStack} refObj={refs.techStack} onImageLoad={() => {}} />
            <StackNcutSection visible={visibleSection.stackNcut} refObj={refs.stackNcut} />
            <FISAwardSection visible={visibleSection.fisAward} refObj={refs.fisAward} />
            <PortfolioSection
                visible={visibleSection.portfolio}
                refObj={refs.portfolio}
                loading={loading}
                imagesLoaded={imagesLoaded}
                handleImageLoad={handleImageLoad}
            />
            <LinksSection visible={visibleSection.links} refObj={refs.links} />
          </main>
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
