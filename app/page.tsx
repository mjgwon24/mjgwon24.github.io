'use client';

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { techStackData, projectsData, linkCardsData } from "@/constants/home";
import StackCard from "@/components/home/StackCard";
import SectionTitle from "@/components/section/SectionTitle";
import LinkCard from "@/components/home/LinkCard";
import ProjectCard from "@/components/project/ProjectCard";
import ProjectCardSkeleton from "@/components/project/ProjectCardSkeleton";

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

    const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
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

  return (
      <div className="relative min-h-screen">
        <div
            className="absolute inset-0 z-0"
            style={{
              background: "radial-gradient(131.64% 50.74% at 97.42% 14.64%, rgba(73, 149, 236, 0.30) 0%, rgba(41, 85, 134, 0.00) 70%)"
            }}
        />

        <div
            className="relative z-10 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
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
                  className="rounded-full"
                  src="/profile/profile-circle.svg"
                  alt="Profile picture"
                  width={120}
                  height={120}
                  priority
              />

              <h1 className="text-3xl sm:text-4xl weight-700 text-center leading-snug select-none">
                개발을 사랑하는 개발자,<br/>
                <span className="text-blue-500">권민지</span>의 홈에 오신것을 환영합니다.
              </h1>
            </div>

            <div ref={techStackRef}
                 className={`flex flex-col gap-5 items-center transition-all duration-1000 ${
                     visibleSection.techStack ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                 }`}>
              <SectionTitle
                  emoji="🚀"
                  title="기술 스택"
                  subtitle="이런 기술을 사용해 개발해왔습니다."
              />

              <div className="flex flex-col gap-4 items-center">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <StackCard title="Languages" items={techStackData.languages} />
                  <StackCard title="Frameworks & Libraries" items={techStackData.frameworks} />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <StackCard title="Infrastructure & Databases" items={techStackData.infrastructure} />
                  <StackCard title="Tools & IDEs" items={techStackData.tools} />
                </div>
              </div>
            </div>

            <div ref={portfolioRef}
                 className={`flex flex-col gap-5 items-center transition-all duration-1000 ${
                     visibleSection.portfolio ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                 }`}>
              <SectionTitle
                  emoji="✨"
                  title="포트폴리오"
                  subtitle="제작한 프로젝트들, 어떤게 있을까요?"
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
            </div>

            <div ref={linksRef}
                 className={`flex flex-col gap-5 items-center transition-all duration-1000 ${
                     visibleSection.links ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                 }`}>
              <div className="flex flex-col items-center mb-6">
                <h2 className="text-2xl sm:text-3xl weight-700 pr-1 select-none">
                  💡 더 알고싶으신가요?
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