'use client';

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { projectsData, linkCardsData } from "@/constants/home";
import SectionTitle from "@/components/section/SectionTitle";
import LinkCard from "@/components/home/LinkCard";
import ProjectCard from "@/components/project/ProjectCard";
import ProjectCardSkeleton from "@/components/project/ProjectCardSkeleton";
import Link from "next/link";

const images = [
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

export default function Home() {
  const [height, setHeight] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  const [visibleSection, setVisibleSections] = useState<{
    intro: boolean;
    techStack: boolean;
    portfolio: boolean;
    links: boolean;
  }>({
    intro: false,
    techStack: false,
    portfolio: false,
    links: false
  });

  const introRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHeight(window.innerHeight);

      const handleResize = () => {
        setHeight(window.innerHeight);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-40px'
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.target === introRef.current) {
          setVisibleSections(prev => ({ ...prev, intro: entry.isIntersecting }));
        } else if (entry.target === techStackRef.current) {
          setVisibleSections(prev => ({ ...prev, techStack: entry.isIntersecting }));
        } else if (entry.target === portfolioRef.current) {
          setVisibleSections(prev => ({ ...prev, portfolio: entry.isIntersecting }));
        } else if (entry.target === linksRef.current) {
          setVisibleSections(prev => ({ ...prev, links: entry.isIntersecting }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (introRef.current) observer.observe(introRef.current);
    if (techStackRef.current) observer.observe(techStackRef.current);
    if (portfolioRef.current) observer.observe(portfolioRef.current);
    if (linksRef.current) observer.observe(linksRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const imageGap = 16;
  const fadeWidth = 32;
  const fixedHeight = 200; // 원하는 고정 height(px)

  const resizedImages = images.map(img => {
    const aspectRatio = img.width / img.height;
    return {
      ...img,
      displayHeight: fixedHeight,
      displayWidth: Math.round(fixedHeight * aspectRatio)
    };
  });
  const totalTrackWidth = resizedImages.reduce(
      (sum, img, idx) => sum + img.displayWidth + (idx < resizedImages.length - 1 ? imageGap : 0),
      0
  );

  // (1) 반응형 슬라이드 박스 width (90vw, 최소 320px, 최대 1200px 등 제한 가능)
  const [slideBoxWidth, setSlideBoxWidth] = useState(0);

  useEffect(() => {
    function updateWidth() {
      const vw = window.innerWidth;
      // 90vw, min 320, max 1200
      setSlideBoxWidth(Math.max(320, Math.min(vw * 0.9, 1200)));
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // (3) 무한 슬라이드 애니메이션
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let start = Date.now();
    let animationFrameId: number;
    let current = 0;
    function animate() {
      const now = Date.now();
      const elapsed = now - start;
      // 속도 조절 (수치 키우면 빨라짐)
      current = (elapsed * 0.07) % totalTrackWidth;
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${current}px)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    }
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [totalTrackWidth]);

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
          <main
              className="flex flex-col row-start-2 items-center"
              style={{ gap: `${height / 4}px` }}
          >
            <div ref={introRef}
                 className={`flex flex-col mb-3 sm:mb-44 gap-6 items-center transition-all duration-1000 
              ${visibleSection.intro ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
              <Image
                  className="rounded-full w-[90px] sm:w-[120px]"
                  src="/profile/profile-circle.png"
                  alt="Profile picture"
                  width={120}
                  height={120}
                  priority
              />

              <h1 className="text-white text-2xl sm:text-4xl weight-700 text-center leading-snug select-none">
                개발을 사랑하는 개발자,<br/>
                <span className="text-blue-500">권민지</span>입니다.
              </h1>
            </div>

            <div ref={techStackRef}
                 className={`flex flex-col gap-5 items-center transition-all duration-1000 w-full ${
                     visibleSection.techStack ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                 }`}>
              <SectionTitle
                  emoji=""
                  title="IT 개발 동아리 설립"
                  subtitle="함께하는 개발을 위한 첫 걸음"
              />

              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full">
                <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden shadow-lg shadow-blue-900/20 transition-transform duration-300">
                  <Image
                      src="/developer/developer-act1.jpg"
                      alt="개발 동아리 활동 사진 1"
                      fill
                      sizes="(max-width: 640px) 320px, 640px"
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-500 w-full"
                      onLoad={() => handleImageLoad(-1)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-4 w-full max-w-2xl mx-auto">
                <span className="text-blue-200 weight-500 text-base whitespace-nowrap" style={{textShadow: '0px 0px 4px rgba(255, 255, 255, 0.60)'}}>
                  누적 활동 인원 총 86명
                </span>
                <span className="text-blue-200 weight-500 text-base whitespace-nowrap" style={{textShadow: '0px 0px 4px rgba(255, 255, 255, 0.60)'}}>
                  팀 프로젝트 8개 도출
                </span>
                <span className="text-blue-200 weight-500 text-base whitespace-nowrap" style={{textShadow: '0px 0px 4px rgba(255, 255, 255, 0.60)'}}>
                  교내 해커톤 개최
                </span>
              </div>

            </div>

            <div ref={techStackRef}
                 className={`flex flex-col gap-5 items-center transition-all duration-1000 w-full mt-12 ${
                     visibleSection.techStack ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                 }`}>
              <SectionTitle
                  emoji=""
                  title="스택네컷"
                  subtitle="2024, 대학생들을 위한 사진 촬영 서비스 출시"
              />






              <div
                  className="relative overflow-hidden flex items-center rounded-xl shadow-lg border border-gray-700 bg-gray-900 my-6 max-w-[760px]"
                  style={{
                    width: slideBoxWidth,
                    height: Math.max(...images.map(img => img.height)),
                    minWidth: 320,
                    maxWidth: 760,
                    margin: '0 auto',
                  }}
              >
                <div
                    ref={trackRef}
                    className="flex"
                    style={{
                      width: totalTrackWidth * 2,
                    }}
                >
                  {[...images, ...images].map((img, idx, arr) => (
                      <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexShrink: 0,
                            marginRight: idx !== arr.length - 1 ? imageGap : 0,
                          }}
                      >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            width={img.width}
                            height={img.height}
                            style={{ display: 'block', borderRadius: '12px' }}
                            priority={idx === 0}
                        />
                      </div>
                  ))}
                </div>
              </div>





              <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-4 w-full max-w-2xl mx-auto">
                <span className="text-blue-200 weight-500 text-base whitespace-nowrap" style={{textShadow: '0px 0px 4px rgba(255, 255, 255, 0.60)'}}>
                  누적 사용자 200명 이상
                </span>
                <span className="text-blue-200 weight-500 text-base whitespace-nowrap" style={{textShadow: '0px 0px 4px rgba(255, 255, 255, 0.60)'}}>
                  생성된 이미지 1,000장 이상
                </span>
              </div>

              <Link href="http://localhost:3000/portfolio/stack-snapshot" target="_blank" rel="noopener noreferrer" className="mt-4">
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-blue-200 py-2 px-5 rounded-lg transition-all duration-300 border border-blue-400/30 hover:border-blue-400/50 shadow-sm hover:shadow-md">
                  <span>더 알아보기</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
              </Link>
            </div>


            <div ref={portfolioRef}
                 className={`flex flex-col gap-5 items-center transition-all duration-1000 ${
                     visibleSection.portfolio ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                 }`}>
              <SectionTitle
                  emoji=""
                  title="포트폴리오"
                  subtitle="진행한 프로젝트들을 소개합니다."
                  showMoreLink="/portfolio"
              />

              <div className="flex flex-col gap-6">
                {[0, 2, 4].map((startIndex) => (
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
                      <div className="group relative inline-flex items-center gap-0.5 pl-6 pr-4 py-2.5 bg-gray-800/90 hover:bg-gray-700/90 border border-blue-400 hover:border-blue-200 text-blue-200 rounded-full shadow-md hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300 cursor-pointer">
        <span className="text-xs sm:text-sm font-medium">
          +{projectsData.length - 6}개의 프로젝트 더보기
        </span>
                        <svg
                            className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  </div>
              )}
            </div>

            <div ref={linksRef}
                 className={`flex flex-col gap-5 items-center transition-all duration-1000 ${
                     visibleSection.links ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                 }`}>
              <div className="flex flex-col items-center mb-6">
                <h2 className="text-white text-2xl sm:text-3xl weight-700 pl-2 select-none">
                  더 알고싶으신가요?
                </h2>
              </div>

              <div className="flex flex-col gap-8 sm:gap-0 sm:flex-row justify-between sm:w-[680px]">
                {linkCardsData.map((card, index) => (
                    <LinkCard
                        key={index}
                        title={card.title}
                        description={card.description}
                        linkText={card.linkText}
                        icon={card.icon}
                        href={card.href}
                    />
                ))}
              </div>
            </div>
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