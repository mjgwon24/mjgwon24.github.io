'use client';

import Image from "next/image";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function Home() {
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
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
            style={{
              paddingTop: `${height / 4}px`,
            }}
        >
          <main className="flex flex-col row-start-2 items-center"
                style={{
                  gap: `${height / 4}px`,
                }}>
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
                    className="text-white text-[14px] sm:text-[16px] py-1.5 px-8 rounded-lg weight-600 text-center mt-2
                    bg-gradient-to-r from-[#4A96EC] to-[#237BE6] bg-white hover:from-[#237BE6] hover:to-[#1A5CAB]"
                >
                    전체보기
                </Link>
              </div>

              <div className="flex flex-col gap-6 ">
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <div className="flex flex-col w-60 sm:w-80 rounded-lg bg-black-10p">
                    <Image
                        src="/portfolio/secubox.png"
                        alt="Secubox project"
                        width={320}
                        height={250}
                        className="w-full h-[140px] sm:h-[190px] object-cover object-center rounded-t-lg"
                    />

                    <div className="flex flex-col justify-between sm:h-[250px] sm:h-[240px] p-4">
                      <div className="flex flex-col sm:gap-1 gap-0 pb-4 sm:pb-0">
                        <div
                            className="flex flex-col-reverse sm:flex-row justify-start items-start sm:justify-between sm:items-center gap-1 sm:gap-0">
                          <p className="text-sm sm:text-[16px] weight-600">보안 교육 시뮬레이션 개발</p>
                          <div className="border border-blue-500 border-solid rounded-sm px-1.5 py-0.5">
                            <p className="text-xs weight-400 text-blue-500">25.02~25.03</p>
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-400 weight-400">정보보안 SW 웹/앱 개발 공모전</span>
                        <span className="text-xs sm:text-sm weight-400 sm:p-0 pt-1">차세대 산업 보안 시뮬레이터 웹 플랫폼, SECUBOX입니다. 드래그 앤 드롭을 통해 쉽게 커스텀 네트워크 환경을 구성할 수 있으며, 공격 및 방어 시뮬레이션을 실행해 직접 보안 테스트를 진행할 수 있습니다.</span>
                      </div>

                      <div className="flex flex-col sm:gap-1.5 gap-1 flex-wrap">
                        <div className="flex flex-row sm:gap-1.5 gap-1">
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400 text-blue-500">Back</span>
                          </div>
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400 text-blue-500">Front</span>
                          </div>
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400 text-blue-500">Design</span>
                          </div>
                        </div>

                        <div className="flex flex-row sm:gap-1.5 gap-1 flex-wrap">
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400">WEB</span>
                          </div>
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400">Security</span>
                          </div>
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400">Education</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col w-60 sm:w-80 rounded-lg bg-black-10p">
                    <Image
                        src="/portfolio/semi-erp.png"
                        alt="semi erp project"
                        width={320}
                        height={190}
                        className="w-full h-[140px] sm:h-[190px] object-cover object-center rounded-t-lg"
                    />

                    <div className="flex flex-col justify-between sm:h-[250px] sm:h-[240px] p-4">
                      <div className="flex flex-col sm:gap-1 gap-0 pb-4 sm:pb-0">
                        <div
                            className="flex flex-col-reverse sm:flex-row justify-start items-start sm:justify-between sm:items-center gap-1 sm:gap-0">
                          <p className="text-sm sm:text-[16px] weight-600">동아리 행정관리 ERP 개발</p>
                          <div className="border border-blue-500 border-solid rounded-sm px-1.5 py-0.5">
                            <p className="text-xs weight-400 text-blue-500">25.01~25.03</p>
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-400 weight-400">동국대학교</span>
                        <span className="text-xs sm:text-sm weight-400 sm:p-0 pt-1">동국대학교 동아리 행정 전반을 관리해주는 SEMI ERP 서비스입니다. 각 동아리별 인원 관리 및 예산 관리, 일정 관리를 할 수 있습니다.</span>
                      </div>

                      <div className="flex flex-col sm:gap-1.5 gap-1">
                        <div className="flex flex-row sm:gap-1.5 gap-1 flex-wrap">
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400 text-blue-500">Back</span>
                          </div>
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400 text-blue-500">Front</span>
                          </div>
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400 text-blue-500">Planning</span>
                          </div>
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400 text-blue-500">Design</span>
                          </div>
                        </div>

                        <div className="flex flex-row sm:gap-1.5 gap-1 flex-wrap">
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400">WEB</span>
                          </div>
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400">ERP</span>
                          </div>
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400">Admin Page</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <div className="flex flex-col w-60 sm:w-80 rounded-lg bg-black-10p">
                    <Image
                        src="/portfolio/softcat.png"
                        alt="softcat project"
                        width={320}
                        height={250}
                        className="w-full h-[140px] sm:h-[190px] object-cover object-center rounded-t-lg"
                    />

                    <div className="flex flex-col justify-between sm:h-[250px] sm:h-[240px] p-4">
                      <div className="flex flex-col sm:gap-1 gap-0 pb-4 sm:pb-0">
                        <div
                            className="flex flex-col-reverse sm:flex-row justify-start items-start sm:justify-between sm:items-center gap-1 sm:gap-0">
                          <p className="text-sm sm:text-[16px] weight-600">맞춤형 솔루션 판매 서비스 개발</p>
                          <div className="border border-blue-500 border-solid rounded-sm px-1.5 py-0.5">
                            <p className="text-xs weight-400 text-blue-500">24.06~24.11</p>
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-400 weight-400">소프트캣 (Softcat)</span>
                        <span className="text-xs sm:text-sm weight-400 sm:p-0 pt-1">맞춤형 소프트웨어를 신청하거나 자동화 소프트웨어를 구독할 수 있는 서비스입니다. 원하는 구독 개월수 별로 구매하여 해당 소프트웨어를 사용할 수 있고, 관리자 페이지도 제공합니다.</span>
                      </div>

                      <div className="flex flex-col sm:gap-1.5 gap-1 flex-wrap">
                        <div className="flex flex-row sm:gap-1.5 gap-1">
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400 text-blue-500">Back</span>
                          </div>
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400 text-blue-500">Front</span>
                          </div>
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400 text-blue-500">CI/CD</span>
                          </div>
                        </div>

                        <div className="flex flex-row sm:gap-1.5 gap-1 flex-wrap">
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400">WEB</span>
                          </div>
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400">Commerce</span>
                          </div>
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400">Admin Page</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col w-60 sm:w-80 rounded-lg bg-black-10p">
                    <Image
                        src="/portfolio/gyeongju-night.png"
                        alt="gyeongju night project"
                        width={320}
                        height={190}
                        className="w-full h-[140px] sm:h-[190px] object-cover object-center rounded-t-lg"
                    />

                    <div className="flex flex-col justify-between sm:h-[250px] sm:h-[240px] p-4">
                      <div className="flex flex-col sm:gap-1 gap-0 pb-4 sm:pb-0">
                        <div
                            className="flex flex-col-reverse sm:flex-row justify-start items-start sm:justify-between sm:items-center gap-1 sm:gap-0">
                          <p className="text-sm sm:text-[16px] weight-600">숙소 예약 서비스 개발</p>
                          <div className="border border-blue-500 border-solid rounded-sm px-1.5 py-0.5">
                            <p className="text-xs weight-400 text-blue-500">24.11~24.12</p>
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-400 weight-400">2024 경주 지역문제 해결 해커톤</span>
                        <span className="text-xs sm:text-sm weight-400 sm:p-0 pt-1">2024 경주 해커톤 최우수상 수상! 경주만의 독특한 매력을 활용하여, 한옥·캠핑장 예약, 신선 지역 재료 직배송, 태그 이벤트 등을 녹여낸 숙박업소 예약 서비스입니다.</span>
                      </div>

                      <div className="flex flex-col sm:gap-1.5 gap-1">
                        <div className="flex flex-row sm:gap-1.5 gap-1 flex-wrap">
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400 text-blue-500">Back</span>
                          </div>
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400 text-blue-500">Front</span>
                          </div>
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400 text-blue-500">Planning</span>
                          </div>
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400 text-blue-500">Design</span>
                          </div>
                        </div>

                        <div className="flex flex-row sm:gap-1.5 gap-1 flex-wrap">
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400">WEB</span>
                          </div>
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400">Commerce</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <div className="flex flex-col w-60 sm:w-80 rounded-lg bg-black-10p">
                    <Image
                        src="/portfolio/stack-four-cut.png"
                        alt="stack four cut project"
                        width={320}
                        height={250}
                        className="w-full h-[140px] sm:h-[190px] object-cover object-center rounded-t-lg"
                    />

                    <div className="flex flex-col justify-between sm:h-[250px] sm:h-[240px] p-4">
                      <div className="flex flex-col sm:gap-1 gap-0 pb-4 sm:pb-0">
                        <div
                            className="flex flex-col-reverse sm:flex-row justify-start items-start sm:justify-between sm:items-center gap-1 sm:gap-0">
                          <p className="text-sm sm:text-[16px] weight-600">네컷사진 촬영 서비스 개발</p>
                          <div className="border border-blue-500 border-solid rounded-sm px-1.5 py-0.5">
                            <p className="text-xs weight-400 text-blue-500">24.07~24.10</p>
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-400 weight-400">IT동아리 DEVELOPER</span>
                        <span className="text-xs sm:text-sm weight-400 sm:p-0 pt-1">사진을 찍어 네컷 사진으로 병합해주는 추억 남기기 서비스입니다. 경주시와 협업하여 “2024 경주 지역문제 해결 해커톤”에서 실제로 서비스를 사용하였고, 많은 행사 참가자들의 추억을 만들어주었습니다.</span>
                      </div>

                      <div className="flex flex-col sm:gap-1.5 gap-1 flex-wrap">
                        <div className="flex flex-row sm:gap-1.5 gap-1">
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400 text-blue-500">Back</span>
                          </div>
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400 text-blue-500">Front</span>
                          </div>
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400 text-blue-500">Planning</span>
                          </div>
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400 text-blue-500">Design</span>
                          </div>
                        </div>

                        <div className="flex flex-row sm:gap-1.5 gap-1 flex-wrap">
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400">WEB</span>
                          </div>
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400">Entertainment</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col w-60 sm:w-80 rounded-lg bg-black-10p">
                    <Image
                        src="/portfolio/developer.png"
                        alt="developer project"
                        width={320}
                        height={190}
                        className="w-full h-[140px] sm:h-[190px] object-cover object-center rounded-t-lg"
                    />

                    <div className="flex flex-col justify-between sm:h-[250px] sm:h-[240px] p-4">
                      <div className="flex flex-col sm:gap-1 gap-0 pb-4 sm:pb-0">
                        <div
                            className="flex flex-col-reverse sm:flex-row justify-start items-start sm:justify-between sm:items-center gap-1 sm:gap-0">
                          <p className="text-sm sm:text-[16px] weight-600">개발동아리 사이트 개발</p>
                          <div className="border border-blue-500 border-solid rounded-sm px-1.5 py-0.5">
                            <p className="text-xs weight-400 text-blue-500">24.07~24.12</p>
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-400 weight-400">IT동아리 DEVELOPER</span>
                        <span className="text-xs sm:text-sm weight-400 sm:p-0 pt-1">동국대학교 개발 동아리 DEVELOPER의 공식 사이트입니다. 동아리 성과, 활동 내용, 부원 현황 등의 동아리 관련 정보를 제공해줍니다.</span>
                      </div>

                      <div className="flex flex-col sm:gap-1.5 gap-1">
                        <div className="flex flex-row sm:gap-1.5 gap-1 flex-wrap">
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400 text-blue-500">Front</span>
                          </div>
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400 text-blue-500">Planning</span>
                          </div>
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400 text-blue-500">Design</span>
                          </div>
                        </div>

                        <div className="flex flex-row sm:gap-1.5 gap-1 flex-wrap">
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400">WEB</span>
                          </div>
                          <div className="pb-0.5 px-2 bg-black-10p rounded-sm">
                            <span className="text-xs sm:text-sm weight-400">Community</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>


            <div className="flex flex-col gap-4 sm:gap-10 items-center">
              <div className="flex flex-col items-center mb-6">
                <h2 className="text-2xl sm:text-3xl weight-700 pr-1 select-none">
                  💡 더 알고싶으신가요?
                </h2>
              </div>

              <div className="flex flex-col gap-8 sm:gap-0 sm:flex-row justify-between sm:w-[680px]">
                <div className="flex flex-col items-center gap-3 sm:gap-6 sm:w-[190px]">
                  <div className="flex flex-col items-center gap-1">
                    <p className="weight-600 sm:text-xl">소개 페이지</p>
                    <p className="text-xs sm:text-sm text-center weight-400">더 자세한 소개, 경력 사항을<br/>
                      확인하실 수 있어요!</p>
                  </div>
                  <div className="cursor-pointer flex flex-row gap-1 items-center border border-blue-400 border-solid rounded-md pl-6 pr-4 sm:pr-4.5 py-1.5
                    bg-[linear-gradient(90deg,rgba(74,150,236,0.10)_4.14%,rgba(35,123,230,0.10)_97.19%)]
                    hover:bg-[linear-gradient(90deg,rgba(74,150,236,0.20)_4.14%,rgba(35,123,230,0.50)_97.19%)]">
                    <p className="text-xs sm:text-sm text-center weight-600 text-blue-400 select-none">보러가기</p>
                    <svg className="w-3 sm:w-4 h-3 sm:h-4 text-blue-400" fill="none" stroke="currentColor"
                         strokeWidth="3"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h14"></path>
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 sm:gap-6 sm:w-[190px]">
                  <div className="flex flex-col items-center gap-1">
                    <p className="weight-600 sm:text-xl">기술 포스팅</p>
                    <p className="text-xs sm:text-sm text-center weight-400">사용했던 기술, 활동 회고와 관련된<br/>
                      포스팅을 확인하실 수 있어요!</p>
                  </div>
                  <div className="cursor-pointer flex flex-row gap-1 items-center border border-blue-400 border-solid rounded-md pl-6 pr-4 sm:pr-4.5 py-1.5
                    bg-[linear-gradient(90deg,rgba(74,150,236,0.10)_4.14%,rgba(35,123,230,0.10)_97.19%)]
                    hover:bg-[linear-gradient(90deg,rgba(74,150,236,0.20)_4.14%,rgba(35,123,230,0.50)_97.19%)]">
                    <p className="text-xs sm:text-sm text-center weight-600 text-blue-400">보러가기</p>
                    <svg className="w-3 sm:w-4 h-3 sm:h-4 text-blue-400" fill="none" stroke="currentColor"
                         strokeWidth="3"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h14"></path>
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 sm:gap-6 sm:w-[190px]">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex flex-row items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 18 18" fill="none">
                        <path
                            d="M8.99996 0.27002C6.86291 0.270108 4.79561 1.02646 3.16797 2.40375C1.54033 3.78104 0.458572 5.68939 0.116244 7.78733C-0.226085 9.88528 0.193359 12.0359 1.29952 13.8544C2.40569 15.6729 4.12639 17.0407 6.15375 17.7129C6.60375 17.7912 6.77249 17.5227 6.77249 17.2877C6.77249 17.0751 6.76124 16.3703 6.76124 15.6206C4.49999 16.0346 3.915 15.0724 3.735 14.5689C3.53527 14.0793 3.21865 13.6453 2.8125 13.3046C2.49751 13.1368 2.04751 12.7228 2.80125 12.7117C3.08905 12.7427 3.36509 12.8423 3.60597 13.002C3.84684 13.1617 4.04546 13.3768 4.185 13.6291C4.30809 13.849 4.47361 14.0426 4.67206 14.1988C4.87052 14.355 5.09802 14.4707 5.34152 14.5393C5.58502 14.6079 5.83973 14.628 6.09107 14.5986C6.34241 14.5691 6.58543 14.4906 6.80621 14.3675C6.84517 13.9125 7.04908 13.487 7.37997 13.1704C5.37749 12.9466 3.285 12.1746 3.285 8.75093C3.27235 7.86135 3.60242 7.00067 4.2075 6.3454C3.93235 5.57225 3.96454 4.72377 4.29749 3.97344C4.29749 3.97344 5.05121 3.73847 6.77248 4.8909C8.24512 4.48809 9.7998 4.48809 11.2724 4.8909C12.9937 3.72729 13.7474 3.97344 13.7474 3.97344C14.0804 4.72376 14.1126 5.57226 13.8374 6.3454C14.4443 6.99955 14.7747 7.86098 14.7599 8.75093C14.7599 12.1858 12.6562 12.9466 10.6537 13.1704C10.8685 13.3869 11.0339 13.6468 11.1387 13.9326C11.2435 14.2183 11.2853 14.5231 11.2612 14.8263C11.2612 16.0235 11.2499 16.9856 11.2499 17.2878C11.2499 17.5227 11.4187 17.8024 11.8687 17.7129C13.8925 17.0352 15.6082 15.6643 16.7097 13.8448C17.8111 12.0254 18.2266 9.87587 17.8819 7.77995C17.5372 5.68404 16.4548 3.77817 14.8278 2.40256C13.2009 1.02694 11.1354 0.271125 8.99996 0.27002Z"
                            fill="white"/>
                      </svg>
                      <p className="weight-600 sm:text-xl">Github</p>
                    </div>
                    <p className="text-xs sm:text-sm text-center weight-400">프로젝트 진행 과정, 관련 코드들을<br/>
                      직접 볼 수 있어요!</p>
                  </div>
                  <div className="cursor-pointer flex flex-row gap-1 items-center border border-blue-400 border-solid rounded-md pl-6 pr-4 sm:pr-4.5 py-1.5
                    bg-[linear-gradient(90deg,rgba(74,150,236,0.10)_4.14%,rgba(35,123,230,0.10)_97.19%)]
                    hover:bg-[linear-gradient(90deg,rgba(74,150,236,0.20)_4.14%,rgba(35,123,230,0.50)_97.19%)]">
                    <p className="text-xs sm:text-sm text-center weight-600 text-blue-400">깃허브</p>
                    <svg className="w-3 sm:w-4 h-3 sm:h-4 text-blue-400" fill="none" stroke="currentColor"
                         strokeWidth="3"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h14"></path>
                    </svg>
                  </div>
                </div>

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
