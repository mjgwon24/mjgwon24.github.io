"use client";

import Image from "next/image";
import StackCard from "@/components/home/StackCard";
import {aboutCardsData, techStackData} from "@/constants/home";
import LinkCard from "@/components/home/LinkCard";

export default function About() {
    return (
        <div className="relative min-h-screen pt-28 py-24">
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(131.64% 50.74% at 97.42% 14.64%, rgba(73, 149, 236, 0.30) 0%, rgba(41, 85, 134, 0.00) 70%)"
                }}
            />
            <div className="relative z-10 container mx-auto px-8 sm:px-10 md:px-20 lg:px-40 py-12 sm:py-20 flex flex-col items-center">
                <div className="flex flex-col items-center mb-8 lg:mb-16 xl:mb-20 text-center">
                    <h1 className="text-white text-3xl sm:text-4xl weight-600 sm:weight-700 mb-4">
                        About Me
                    </h1>
                </div>

                <div className="w-full flex flex-col xl:flex-row gap-4 lg:gap-9 items-center xl:items-start mb-12 sm:mb-20 text-center">
                    <Image
                        className="w-[120px] sm:w-[160px] lg:w-[240px] rounded-sm"
                        src="/profile/profile-rec.png"
                        alt="Profile picture"
                        width={120}
                        height={120}
                        priority
                    />

                    <p className="text-gray-200 leading-relaxed text-start">
                        <span className="weight-700 text-blue-300 lg:text-lg">사람과 서비스를 이어주는 개발자</span>
                        <br/><br/>
                        2023년부터 개발을 시작해 다양한 서비스와 팀을 만들어왔습니다.<br/><br/>

                        4.5점 만점으로 학과 수석을 여러 차례 기록하며 기본기를 다졌고, 개발동아리를 설립해 멘토링 활동을 하며 집단 전체의 성장을 위해 노력해왔습니다.<br/><br/>

                        사용자가 서비스를 보다 편리하게, 그리고 안전하게 이용할 수 있도록 하는 것을 최우선으로 생각합니다. 이를 위해 쿼리 튜닝 역량과 렌더링 시간 단축 역량, 인증/인가 및 데이터 보안 강화 경험을 활용하여 사용자에게 보다 빠르고 안전한 서비스 경험을 제공하기 위해 노력해왔습니다. 또한, 좋은 서비스는 혼자가 아닌 함께 만들 수 있다고 생각하기에 다양한 직무의 구성원들과 적극적으로 커뮤니케이션하며 협업해왔습니다.<br/><br/>

                        반복되는 일을 자동화하고 비효율적인 프로세스를 개선하는 일을 좋아합니다. 개발 프로세스에서 배포 시간을 단축시키기 위해 기존의 배포 스크립트를 고도화하여 배포 시간을 67% 단축시킨 경험이 있습니다.<br/><br/>

                        궁극적인 저의 목표는 사람들이 원하는, 그리고 편리하게 사용할 수 있는 서비스를 개발하여, 그들의 일상에 긍정적인 영향을 미치는 개발자가 되는 것입니다.<br/>
                    </p>
                </div>

                <div className="w-full flex flex-col mb-12">
                    <h2 className="text-white text-2xl weight-600 mt-4 mb-8 text-center">강점</h2>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10 lg:mb-20">
                        <div className="bg-gray-800/60 border border-blue-400/20 rounded-lg p-6 shadow-lg hover:border-blue-400/40 transition-all duration-300 hover:shadow-blue-900/20">
                            <h3 className="text-lg weight-600 mb-3 text-blue-300">Tech Lead</h3>
                            <p className="text-gray-200 leading-relaxed">
                                • 스크립트 고도화를 통해 단순 반복 작업을 자동화하여 배포 소요 시간 67% 단축<br/>
                                • 쿼리 튜닝을 통해 복합 인덱스, 페이징 적용으로 API 응답 속도 84% 단축<br/>
                                • JMeter 부하 테스트를 통해 비동기/병렬 처리 적용으로 API 응답 속도 66% 단축<br/>
                                • 반복적으로 사용되는 이미지 프레임을 캐싱하여 데이터 전송량 40% 절감<br/>
                                • 이미지 priority 속성, 스켈레톤 적용으로 LCP 66% 단축<br/>
                            </p>
                        </div>

                        <div className="bg-gray-800/60 border border-blue-400/20 rounded-lg p-6 shadow-lg hover:border-blue-400/40 transition-all duration-300 hover:shadow-blue-900/20">
                            <h3 className="text-lg weight-600 mb-3 text-blue-300">People Lead</h3>
                            <p className="text-gray-200 leading-relaxed">
                                • 업무 우선순위 설정<br/>
                                • 팀원의 업무 수행 능력을 바탕으로 적절한 업무 분담<br/>
                                • 원활한 협업을 위해 개발 프로세스 및 기술 공유 문서 작성<br/>
                                • 다양한 직무의 구성원들과 적극적으로 커뮤니케이션<br/>
                            </p>
                        </div>

                        <div className="bg-gray-800/60 border border-blue-400/20 rounded-lg p-6 shadow-lg hover:border-blue-400/40 transition-all duration-300 hover:shadow-blue-900/20">
                            <h3 className="text-lg weight-600 mb-3 text-blue-300">AI Practice</h3>
                            <p className="text-gray-200 leading-relaxed">
                                • 개발 생산성을 높여주기 위한 코파일럿 AI 코드리뷰 도입<br/>
                                • 보다 정확하고 향상된 응답을 위한 일관된 프롬프트 사용<br/>
                                • 할루시네이션 현상 최소화를 위한 결과 교차 검증 및 공식 문서 기반 재확인
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col items-center mb-10 lg:mb-20">
                        <h2 className="text-white text-2xl weight-600 mb-8 text-center">보유 경력 및 활동 <span className="text-sm text-gray-400 font-normal ml-1">최신순</span></h2>

                        <div className="w-full space-y-4">
                            <div className="bg-gray-800/60 border border-blue-400/20 rounded-lg p-6 shadow-lg hover:border-blue-400/40 transition-all duration-300 hover:shadow-blue-900/20">
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-3">
                                    <h3 className="text-lg weight-600 text-blue-300">우리FIS 아카데미 클라우드 서비스 개발 교육 우수 수료</h3>
                                    <span className="text-gray-400 text-sm">2024.12 ~ 2025.06</span>
                                </div>
                                <ul className="text-gray-200 leading-relaxed list-disc pl-5 space-y-1">
                                    <li>최종 프로젝트 1위</li>
                                    <li>프론트 기술세미나 1위</li>
                                </ul>
                            </div>

                            <div className="bg-gray-800/60 border border-blue-400/20 rounded-lg p-6 shadow-lg hover:border-blue-400/40 transition-all duration-300 hover:shadow-blue-900/20">
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-3">
                                    <h3 className="text-lg weight-600 text-blue-100">동국대학교 학과 조교</h3>
                                    <span className="text-gray-400 text-sm">2024.09 ~ 2024.12</span>
                                </div>
                                <ul className="text-gray-200 leading-relaxed list-disc pl-5 space-y-1">
                                    <li>학과 물품 주문, 발주, 결의서 작성과 같은 구매 및 예산 처리</li>
                                    <li>교수님과 수업에 함께 들어가 강의 보조 및 교육 진행</li>
                                </ul>
                            </div>

                            <div className="bg-gray-800/60 border border-blue-400/20 rounded-lg p-6 shadow-lg hover:border-blue-400/40 transition-all duration-300 hover:shadow-blue-900/20">
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-3">
                                    <h3 className="text-lg weight-600 text-blue-300">더존비즈온 ERP 물류개발 부서 현장실습</h3>
                                    <span className="text-gray-400 text-sm">2024.01 ~ 2024.06</span>
                                </div>
                                <ul className="text-gray-200 leading-relaxed list-disc pl-5 space-y-1">
                                    <li>매일 3번, Git, FileZilla, 쉘 스크립트를 통해 프론트엔드 및 백엔드 코드를 개발 서버에 배포</li>
                                    <li>기존의 쉘 스크립트와 수작업이 병행되던 배포 방식을 완전히 자동화하여  배포 소요 시간을 12분에서 4분으로 67% 단축</li>
                                    <li>매주 Spring Boot, JPA, React, 쿼리 튜닝 기술 공유 발표 진행</li>
                                    <li>구매, 영업, 생산, 원가, 외주 총 201개 메뉴에 대해 출력물 표준 템플릿을 직접 개발하고,  개선 사항을 일괄적으로 반영</li>
                                    <li>기존 팀원 및 신규 팀원이 개선된 표준 템플릿 정보를 알 수 있도록 표준 템플릿 가이드 문서 작성</li>
                                </ul>
                            </div>

                            <div className="bg-gray-800/60 border border-blue-400/20 rounded-lg p-6 shadow-lg hover:border-blue-400/40 transition-all duration-300 hover:shadow-blue-900/20">
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-3">
                                    <h3 className="text-lg weight-600 text-blue-300">IT 연합 동아리 DEVELOPER 설립 및 운영</h3>
                                    <span className="text-gray-400 text-sm">2023.06 ~ 2024.12</span>
                                </div>
                                <ul className="text-gray-200 leading-relaxed list-disc pl-5 space-y-1">
                                    <li>개발 지식 멘토링</li>
                                    <li>하위 팀 구성 및 프로젝트 진척사항 관리, 운영</li>
                                </ul>
                            </div>

                            <div className="bg-gray-800/60 border border-blue-400/20 rounded-lg p-6 shadow-lg hover:border-blue-400/40 transition-all duration-300 hover:shadow-blue-900/20">
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-3">
                                    <h3 className="text-lg weight-600 text-blue-100">해법수학 강릉지사 강사</h3>
                                    <span className="text-gray-400 text-sm">2022.01 ~ 2022.05</span>
                                </div>
                                <ul className="text-gray-200 leading-relaxed list-disc pl-5 space-y-1">
                                    <li>초등학생, 중학생을 대상으로 수학 과목 교육 진행</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col items-center mb-10 lg:mb-20">
                        <h2 className="text-white text-2xl weight-600 mb-8 text-center">대외활동 및 수상 이력</h2>

                        <div className="w-full space-y-4">
                            <div className="bg-gray-800/60 border border-blue-400/20 rounded-lg p-6 shadow-lg hover:border-blue-400/40 transition-all duration-300 hover:shadow-blue-900/20">
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full">
                                    <h3 className="text-lg weight-600 text-blue-300">2025 우리FISA 최종 프로젝트 1위</h3>
                                    <p className="text-gray-400 text-sm">우리FIS</p>
                                </div>

                                <p className="text-gray-400 text-sm">2025.06.12</p>
                            </div>

                            <div className="bg-gray-800/60 border border-blue-400/20 rounded-lg p-6 shadow-lg hover:border-blue-400/40 transition-all duration-300 hover:shadow-blue-900/20">
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full">
                                    <h3 className="text-lg weight-600 text-blue-300">2025 우리FISA 기술 세미나 1위</h3>
                                    <p className="text-gray-400 text-sm">우리FIS</p>
                                </div>

                                <p className="text-gray-400 text-sm">2025.02.06</p>
                            </div>

                            <div className="bg-gray-800/60 border border-blue-400/20 rounded-lg p-6 shadow-lg hover:border-blue-400/40 transition-all duration-300 hover:shadow-blue-900/20">
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full">
                                    <h3 className="text-lg weight-600 text-blue-300">2024 경주 지역문제해결 해커톤 최우수상</h3>
                                    <p className="text-gray-400 text-sm">경북ICT융합산업진흥협회</p>
                                </div>

                                <p className="text-gray-400 text-sm">2024.12.01</p>
                            </div>

                            <div className="bg-gray-800/60 border border-blue-400/20 rounded-lg p-6 shadow-lg hover:border-blue-400/40 transition-all duration-300 hover:shadow-blue-900/20">
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full">
                                    <h3 className="text-lg weight-600 text-blue-300">국가우수 이공계 장학생 선발</h3>
                                    <p className="text-gray-400 text-sm">한국장학재단</p>
                                </div>

                                <p className="text-gray-400 text-sm">2023.08.31</p>
                            </div>

                            <div className="bg-gray-800/60 border border-blue-400/20 rounded-lg p-6 shadow-lg hover:border-blue-400/40 transition-all duration-300 hover:shadow-blue-900/20">
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full">
                                    <h3 className="text-lg weight-600 text-blue-300">교내 SW 경진대회 대상</h3>
                                    <p className="text-gray-400 text-sm">동국대학교 전자정보통신공학과</p>
                                </div>

                                <p className="text-gray-400 text-sm">2021.12.16</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col items-center mb-10 lg:mb-20">
                        <h2 className="text-white text-2xl weight-600 mb-4 text-center">보유 자격증</h2>
                        <div className="flex gap-4 justify-center">
                            <div className="text-white bg-gray-800/60 rounded-xl px-6 py-2">
                                정보처리기사
                            </div>
                            <div className="text-white bg-gray-800/60 rounded-xl px-6 py-2">
                                SQLD
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col items-center mb-20 lg:mb-32">
                        <h2 className="text-white text-2xl weight-600 mb-4 text-center">기술 스택</h2>

                        <div className="flex flex-col gap-4 items-center">
                            <div className="flex flex-col sm:flex-row w-full gap-4 items-center">
                                <StackCard title="Backend" items={techStackData.Backend} />
                            </div>

                            <div className="flex flex-col sm:flex-row w-full gap-4 items-center">
                                <StackCard title="Frontend" items={techStackData.Frontend} />
                            </div>

                            <div className="flex flex-col sm:flex-row w-full gap-4 items-center">
                                <StackCard title="Database" items={techStackData.Database} />
                            </div>

                            <div className="flex flex-col sm:flex-row w-full gap-4 items-center">
                                <StackCard title="Data" items={techStackData.Data} />
                            </div>

                            <div className="flex flex-col sm:flex-row w-full gap-4 items-center">
                                <StackCard title="AI Assistants" items={techStackData.aiAssistants} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col items-center">
                        <h2 className="text-white text-2xl weight-600 mb-4 text-center">더 알고 싶으신가요?</h2>

                        <div className="flex flex-col gap-8 sm:gap-0 sm:flex-row justify-between sm:w-[680px]">
                            {aboutCardsData.map((card, index) => (
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

                </div>

            </div>
        </div>
    );
}