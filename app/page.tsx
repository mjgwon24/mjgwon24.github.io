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

            <div className="flex flex-col gap-4 ">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
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


              <div className="flex flex-col sm:flex-row gap-4 items-center">
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

              <div className="flex flex-col sm:flex-row gap-4 items-center">
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
