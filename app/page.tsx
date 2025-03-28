'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { techStackData, projectsData, linkCardsData } from "@/constants/home";
import StackCard from "@/components/project/StackCard";
import SectionTitle from "@/components/section/SectionTitle";
import LinkCard from "@/components/home/LinkCard";
import ProjectCard from "@/components/project/ProjectCard";

export default function Home() {
  const [height, setHeight] = useState<number>(0);

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
            <div className="flex flex-col mb-3 sm:mb-44 gap-6 items-center">
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

            <div className="flex flex-col gap-5 items-center">
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

            <div className="flex flex-col gap-5 items-center">
              <SectionTitle
                  emoji="✨"
                  title="포트폴리오"
                  subtitle="제작한 프로젝트들, 어떤게 있을까요?"
                  showMoreLink="/portfolio"
              />

              <div className="flex flex-col gap-6">
                {[0, 2, 4].map((startIndex) => (
                    <div key={startIndex} className="flex flex-col sm:flex-row gap-6 items-center">
                      {projectsData.slice(startIndex, startIndex + 2).map((project, index) => (
                          <ProjectCard key={index} {...project} />
                      ))}
                    </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:gap-10 items-center">
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