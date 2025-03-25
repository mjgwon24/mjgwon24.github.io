'use client';

import Image from "next/image";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function Home() {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHeight(window.innerHeight);
    }
  }, []);



  return (
      <div
          className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
          style={{
            paddingTop: `${height / 4}px`,
            background: "radial-gradient(131.64% 50.74% at 97.42% 14.64%, rgba(73, 149, 236, 0.30) 0%, rgba(41, 85, 134, 0.00) 70%)"
          }}
      >
        <main className="flex flex-col row-start-2 items-center"
              style={{
                gap: `${height * 2 / 5}px`,
              }}>
          <div className="flex flex-col gap-6 items-center">
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
            <div className="flex flex-col gap-2 sm:gap-3 items-center">
              <h2 className="text-2xl sm:text-3xl weight-700 pr-1 select-none">
                🚀 기술 스택
              </h2>

              <p className="sm:text-xl weight-500 pl-3 select-none">이런 기술을 사용해 개발해왔습니다.</p>
            </div>

            <div className="flex flex-col gap-4 items-center">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex flex-col gap-4 w-60 sm:w-72 rounded-lg pt-3 pb-5 px-4 bg-black-10p">
                  <span className="weight-600 text-blue-500 sm:text-lg">Languages</span>

                  <div className="flex flex-row gap-2 flex-wrap text-sm weight-400 sm:weight-500">
                    <div className="flex flex-col gap-2 rounded-md px-3 py-1.5 bg-black-10p">
                      <span>JAVA</span>
                    </div>
                    <div className="flex flex-col gap-2 rounded-md px-3 py-1.5 bg-black-10p">
                      <span>JavaScript</span>
                    </div>
                    <div className="flex flex-col gap-2 rounded-md px-3 py-1.5 bg-black-10p">
                      <span>Thymeleaf</span>
                    </div>
                    <div className="flex flex-col gap-2 rounded-md px-3 py-1.5 bg-black-10p">
                      <span>HTML/CSS</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 w-60 sm:w-72 rounded-lg pt-3 pb-5 px-4 bg-black-10p">
                  <span className="weight-600 text-blue-500 sm:text-lg">Frameworks & Libraries</span>

                  <div className="flex flex-row gap-2 flex-wrap text-sm weight-400 sm:weight-500">
                    <div className="flex flex-col gap-2 rounded-md px-3 py-1.5 bg-black-10p">
                      <span>Spring</span>
                    </div>
                    <div className="flex flex-col gap-2 rounded-md px-3 py-1.5 bg-black-10p">
                      <span>Spring Boot</span>
                    </div>
                    <div className="flex flex-col gap-2 rounded-md px-3 py-1.5 bg-black-10p">
                      <span>React</span>
                    </div>
                    <div className="flex flex-col gap-2 rounded-md px-3 py-1.5 bg-black-10p">
                      <span>MyBatis</span>
                    </div>
                    <div className="flex flex-col gap-2 rounded-md px-3 py-1.5 bg-black-10p">
                      <span>Node.js</span>
                    </div>
                    <div className="flex flex-col gap-2 rounded-md px-3 py-1.5 bg-black-10p">
                      <span>Next.js</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex flex-col gap-4 w-60 sm:w-72 rounded-lg pt-3 pb-5 px-4 bg-black-10p">
                  <span className="weight-600 text-blue-500 sm:text-lg">Infrastructure & Databases</span>

                  <div className="flex flex-row gap-2 flex-wrap text-sm weight-400 sm:weight-500">
                    <div className="flex flex-col gap-2 rounded-md px-3 py-1.5 bg-black-10p">
                      <span>AWS</span>
                    </div>
                    <div className="flex flex-col gap-2 rounded-md px-3 py-1.5 bg-black-10p">
                      <span>Nginx</span>
                    </div>
                    <div className="flex flex-col gap-2 rounded-md px-3 py-1.5 bg-black-10p">
                      <span>Docker</span>
                    </div>
                    <div className="flex flex-col gap-2 rounded-md px-3 py-1.5 bg-black-10p">
                      <span>MySQL</span>
                    </div>
                    <div className="flex flex-col gap-2 rounded-md px-3 py-1.5 bg-black-10p">
                      <span>PostgreSQL</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 w-60 sm:w-72 rounded-lg pt-3 pb-5 px-4 bg-black-10p">
                  <span className="weight-600 text-blue-500 sm:text-lg">Tools & IDEs</span>

                  <div className="flex flex-row gap-2 flex-wrap text-sm weight-400 sm:weight-500">
                    <div className="flex flex-col gap-2 rounded-md px-3 py-1.5 bg-black-10p">
                      <span>Git</span>
                    </div>
                    <div className="flex flex-col gap-2 rounded-md px-3 py-1.5 bg-black-10p">
                      <span>VS Code</span>
                    </div>
                    <div className="flex flex-col gap-2 rounded-md px-3 py-1.5 bg-black-10p">
                      <span>IntelliJ</span>
                    </div>
                    <div className="flex flex-col gap-2 rounded-md px-3 py-1.5 bg-black-10p">
                      <span>WebStorm</span>
                    </div>
                    <div className="flex flex-col gap-2 rounded-md px-3 py-1.5 bg-black-10p">
                      <span>Postman</span>
                    </div>
                    <div className="flex flex-col gap-2 rounded-md px-3 py-1.5 bg-black-10p">
                      <span>FileZilla</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>


          <div className="flex flex-col gap-5 items-center">
            <div className="flex flex-col gap-2 sm:gap-3 items-center mb-6">
              <h2 className="text-2xl sm:text-3xl weight-700 pr-1 select-none">
                ✨ 포트폴리오
              </h2>
              <p className="sm:text-xl weight-500 pl-3 select-none">제작한 프로젝트들, 어떤게 있을까요?</p>
              <Link
                  href="/portfolio"
                  className="text-white text-[14px] sm:text-[16px] py-1.5 px-8 rounded-lg weight-600 text-center mt-2"
                  style={{background: "linear-gradient(90deg, #4A96EC 4.14%, #237BE6 97.19%), #FFF"}}
              >
                전체보기
              </Link>
            </div>

            {/*<div className="flex flex-col gap-4 items-center">*/}
            {/*  <div className="flex flex-col sm:flex-row gap-4 items-center">*/}
            {/*    <div className="flex flex-col gap-4 w-60 sm:w-72 rounded-lg bg-black-10p">*/}






            {/*    </div>*/}

            {/*    <div className="flex flex-col gap-4 w-60 sm:w-72 rounded-lg pt-3 pb-5 px-4 bg-black-10p">*/}






            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>


          <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2 tracking-[-.01em]">
              Get started by editing{" "}
              <code
                  className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                app/page.tsx
              </code>
              .
            </li>
            <li className="tracking-[-.01em]">
              Save and see your changes instantly.
            </li>
          </ol>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
              <Image
                  className="dark:invert"
                  src="/vercel.svg"
                  alt="Vercel logomark"
                  width={20}
                  height={20}
              />
              Deploy now
            </a>
            <a
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
              Read our docs
            </a>
          </div>
        </main>
      </div>
  );
}
