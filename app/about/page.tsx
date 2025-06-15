import Image from "next/image";

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
                    <h1 className="text-3xl sm:text-4xl weight-600 sm:weight-700 mb-4">
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
                        <span className="weight-700 text-blue-300 lg:text-lg">Step By Step, 포기하지 않는 개발자</span>
                        <br/><br/>
                        4.5점 만점으로 학과 수석을 여러 차례 기록하며 기본기를 다졌고, 조교와 멘토링 활동을 하며 집단 전체의 성장을 위해 노력해왔습니다. 주말에는 동기들과 디스코드로 개발 스터디를 꾸준히 진행하며, 하루 평균 9시간 이상 개발에 몰입하는 생활을 꾸준히 이어가고 있습니다.<br/><br/>
                        높은 책임감이 요구되는 리더 역할도 자주 맡으면서, 협업 과정에서 발생하는 다양한 갈등 상황들을 직접해결해오며 업무 수행 역량을 키워오고 있습니다.<br/><br/>
                        팀에 꼭 필요한 숙련된 개발자로 성장하여, 조직에 의미 있는 기여를 하는 것이 저의 최종 목표입니다.
                    </p>
                </div>

                <div className="w-full flex flex-col mb-12">
                    <h2 className="text-2xl weight-600 mt-4 mb-8 text-center">강점</h2>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10 lg:mb-20">
                        <div className="bg-gray-800/60 border border-blue-400/20 rounded-lg p-6 shadow-lg hover:border-blue-400/40 transition-all duration-300 hover:shadow-blue-900/20">
                            <h3 className="text-lg weight-600 mb-3 text-blue-300">기술 역량</h3>
                            <p className="text-gray-200 leading-relaxed">
                                • 에러 발생 시, 플로우별 철저한 디버깅으로 문제 해결<br/>
                                • 쿼리 최적화, 캐싱을 통한 대용량 데이터 성능 개선<br/>
                                • UI/UX 직접 개선으로 이탈률 감소<br/>
                                • 입력값 검증, 인증/인가 로직 강화, 취약점 진단으로 보안 강화
                            </p>
                        </div>

                        <div className="bg-gray-800/60 border border-blue-400/20 rounded-lg p-6 shadow-lg hover:border-blue-400/40 transition-all duration-300 hover:shadow-blue-900/20">
                            <h3 className="text-lg weight-600 mb-3 text-blue-300">일정 관리 및 커뮤니케이션</h3>
                            <p className="text-gray-200 leading-relaxed">
                                • 분단위 스케줄링<br/>
                                • 업무 우선순위 설정<br/>
                                • 팀원의 업무 수행 능력을 바탕으로 적절한 업무 분담<br/>
                                • 의문점이 생기면 즉시 소통 진행<br/>
                            </p>
                        </div>

                        <div className="bg-gray-800/60 border border-blue-400/20 rounded-lg p-6 shadow-lg hover:border-blue-400/40 transition-all duration-300 hover:shadow-blue-900/20">
                            <h3 className="text-lg weight-600 mb-3 text-blue-300">AI 활용</h3>
                            <p className="text-gray-200 leading-relaxed">
                                • 문서 자동화 및 테스트 시나리오, 코드 도출<br/>
                                • 코파일럿 AI 코드리뷰를 통해 PR 승인 속도를 높여 개발 생산성 향상<br/>
                                • 할루시네이션 현상 최소화를 위한 결과 교차 검증 및 공식 문서 기반 재확인
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col items-center mb-10 lg:mb-20">
                        <h2 className="text-2xl weight-600 mb-8 text-center">보유 경력 및 활동 (최신순)</h2>

                        <div className="w-full space-y-4">
                            <div className="bg-gray-800/60 border border-blue-400/20 rounded-lg p-6 shadow-lg hover:border-blue-400/40 transition-all duration-300 hover:shadow-blue-900/20">
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-3">
                                    <h3 className="text-lg weight-600 text-blue-300">우리FIS 아카데미 우수 수료</h3>
                                    <span className="text-gray-400 text-sm">2025.01 ~ 2025.06</span>
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
                                    <h3 className="text-lg weight-600 text-blue-300">구독형 솔루션 판매 사이트 제작</h3>
                                    <span className="text-gray-400 text-sm">2024.06 ~ 2024.12</span>
                                </div>
                                <ul className="text-gray-200 leading-relaxed list-disc pl-5 space-y-1">
                                    <li>솔루션 소프트웨어 판매 사이트 softcat 1인 개발/배포/서버관리</li>
                                </ul>
                            </div>

                            <div className="bg-gray-800/60 border border-blue-400/20 rounded-lg p-6 shadow-lg hover:border-blue-400/40 transition-all duration-300 hover:shadow-blue-900/20">
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-3">
                                    <h3 className="text-lg weight-600 text-blue-300">더존비즈온 erp 물류개발 부서 현장실습</h3>
                                    <span className="text-gray-400 text-sm">2024.01 ~ 2024.06</span>
                                </div>
                                <ul className="text-gray-200 leading-relaxed list-disc pl-5 space-y-1">
                                    <li>구매, 영업, 생산, 원가, 외주를 포함하는 총 201개의 메뉴에 대한 출력물 표준 템플릿 개발 및 적용</li>
                                    <li>매일 하루 3번 Git, FileZilla, 쉘 스크립트를 통해 개발 코드 AWS EC2에 배포</li>
                                    <li>코드 검토 및 빌드 테스트 진행</li>
                                    <li>매주 &#39;ERP개발부서 개발 역량 강화를 위한 지식 공유&#39; 발표 진행 (SpringBoot, JPA, SQL 튜닝, React)</li>
                                </ul>
                            </div>

                            <div className="bg-gray-800/60 border border-blue-400/20 rounded-lg p-6 shadow-lg hover:border-blue-400/40 transition-all duration-300 hover:shadow-blue-900/20">
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-3">
                                    <h3 className="text-lg weight-600 text-blue-300">IT 연합 동아리 DEVELOPER 설립 및 운영</h3>
                                    <span className="text-gray-400 text-sm">2023.06 ~ 2024.12</span>
                                </div>
                                <ul className="text-gray-200 leading-relaxed list-disc pl-5 space-y-1">
                                    <li>IT 동아리 DEVELOPER 사이트 제작 및 유지보수</li>
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
                        <h2 className="text-2xl weight-600 mb-8 text-center">대외활동 및 수상 이력</h2>

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
                                    <h3 className="text-lg weight-600 text-blue-300">학과 SW 경진대회 대상</h3>
                                    <p className="text-gray-400 text-sm">동국대학교 전자정보통신공학과</p>
                                </div>

                                <p className="text-gray-400 text-sm">2021.12.16</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col items-center mb-10 lg:mb-20">
                        <h2 className="text-2xl weight-600 mb-4 text-center">보유 자격증</h2>
                        <div className="flex gap-4 justify-center">
                            <div className="bg-gray-800/60 rounded-xl px-6 py-2">
                                정보처리기사
                            </div>
                            <div className="bg-gray-800/60 rounded-xl px-6 py-2">
                                SQLD
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}