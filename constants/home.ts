export const techStackData = {
    languages: ['JAVA', 'JavaScript', 'TypeScript', 'Thymeleaf', 'HTML/CSS'],
    frameworks: ['Spring', 'Spring Boot', 'React', 'MyBatis', 'Node.js', 'Next.js'],
    infrastructure: ['AWS', 'Nginx', 'Docker', 'MySQL', 'PostgreSQL'],
    tools: ['Git', 'JMeter', 'VS Code', 'IntelliJ', 'Postman', 'FileZilla']
};

export const projectsData = [
    {
        image: '/portfolio/flexrate/th/thumb1.png',
        title: '변동금리 대출 서비스 개발',
        period: '25.04~25.06',
        organization: '정보보안 SW 웹/앱 개발 공모전',
        description: '변동금리 대출 서비스 설명 요약',
        detailedDescription: '세부 설명',
        roles: ['Back', 'Front', 'Infra'],
        tags: ['WEB', 'Finance', 'Admin Page'],
        techStacks: ['Spring Boot', 'React', 'MySQL', 'Docker', 'JavaScript', 'HTML/CSS', 'Node.js', 'Git'],
        rolesAndContributions: [
            {
                role: 'Backend',
                contributions:`
### 설계

### 개발

### 보안
                `
            },
            {
                role: 'Frontend',
                contributions: `
### 설계

### 개발

### 보안
                `
            },
            {
                role: 'Infra',
                contributions: `
### 설계

                `
            }
        ],
        achievements: [
            {
                title: '정보보안 SW 웹/앱 개발 공모전',
                description: '2025년 정보보안 SW 웹/앱 개발 공모전에서 최우수상 수상',
                date: '2025.03.15',
            }
        ],
        slug: 'flexrate',
        links: {
            github: 'https://github.com/FLEX-RATE/flexrate-back',
            live: 'https://github.com/mjgwon24',
        },
        detailImages: [
            '/portfolio/details/secubox-detail1.png',
            '/portfolio/details/secubox-detail2.png',
            '/portfolio/details/secubox-detail3.png'
        ]
    },{
        image: '/portfolio/secubox.png',
        title: '보안 교육 시뮬레이션 개발',
        period: '25.02~25.03',
        organization: '정보보안 SW 웹/앱 개발 공모전',
        description: '차세대 산업 보안 시뮬레이터 웹 플랫폼, SECUBOX입니다. 드래그 앤 드롭을 통해 쉽게 커스텀 네트워크 환경을 구성할 수 있으며, 공격 및 방어 시뮬레이션을 실행해 직접 보안 테스트를 진행할 수 있습니다.',
        detailedDescription: '산업별 사이버 위협이 증가하는 가운데, 기존 보안 교육은 이론 중심이라 실전 대응력이 부족합니다. 또한, 산업별 특화된 보안 교육이 부족한 상황입니다. 이' +
            '이에 따라, 보다 실전적인 훈련이 가능한 차별화된 실습형 보안 플랫폼 "SECUBOX"를 기획하게 되었습니다.\n\n' +
            '본 서비스는 웹 기반 실습형 보안 훈련 플랫폼으로, 사용자가 직접 네트워크 환경을 커스텀하여 구성하고, 맞춤형 공격·방어 시뮬레이션을 수행할 수 있도록 설계되었습니다.\n' +
            '이를 통해 기업과 개인 모두 쉽고 효과적으로 보안 역량을 강화할 수 있습니다.\n' +
            '\n' +
            '• Drag & Drop 네트워크 구성으로 원하는 장비를 배치하고, 직접 커스터마이징 가능\n' +
            '• 금융, 제조, 스마트 시티 등 특화된 시나리오 제공하여 산업별 맞춤형 보안 훈련 가능\n' +
            '•  다양한 공격·방어 모듈을 활용한 실전 시뮬레이션 실습 가능\n' +
            '• 별도 구축 없이 언제 어디서나 보안 훈련을 수행할 수 있는 웹 기반 환경',
        roles: ['Back', 'Front', 'Design'],
        tags: ['WEB', 'Security', 'Education'],
        techStacks: ['Spring Boot', 'React', 'MySQL', 'Docker', 'JavaScript', 'HTML/CSS', 'Node.js', 'Git'],
        rolesAndContributions: [
            {
                role: 'Backend',
                contributions:`
- Spring Boot를 사용하여 RESTful API 설계 및 구현
- 보안 시뮬레이션을 위한 다양한 공격 및 방어 모듈 개발 및 관리
- 사용자 인증 및 권한 관리 기능 구현
- Docker를 활용한 배포 및 환경 설정
                `
            },
            {
                role: 'Frontend',
                contributions: `
- React를 사용하여 사용자 인터페이스 개발
- 사용자 경험을 고려한 UI/UX 설계 및 구현
- 사용자 인증 및 권한 관리 기능 구현
- Docker를 활용한 배포 및 환경 설정
                `
            },
            {
                role: 'Designer',
                contributions: `
- UI/UX 디자인 및 프로토타입 제작
- 사용자 피드백을 반영하여 디자인 개선
- Figma를 활용한 프로토타입 제작 및 사용자 피드백 반영
                `
            }
        ],
        achievements: [
            {
                title: '정보보안 SW 웹/앱 개발 공모전',
                description: '2025년 정보보안 SW 웹/앱 개발 공모전에서 최우수상 수상',
                date: '2025.03.15',
            }
        ],
        slug: 'secubox',
        links: {
            github: 'https://secubox-front.vercel.app/',
            live: 'https://github.com/mjgwon24',
        },
        detailImages: [
            '/portfolio/details/secubox-detail1.png',
            '/portfolio/details/secubox-detail2.png',
            '/portfolio/details/secubox-detail3.png'
        ]
    },{
        image: '/portfolio/semi-erp/th/thumb1.png',
        title: '동아리 행정관리 ERP 개발',
        period: '25.01~now',
        organization: '동국대학교',
        description: '동국대학교 동아리 행정 전반을 관리해주는 SEMI ERP 서비스입니다. 각 동아리별 인원 관리 및 예산 관리, 일정 관리를 할 수 있습니다.',
        roles: ['Back', 'Front', 'Planning', 'Design'],
        tags: ['WEB', 'ERP', 'Admin Page'],
        techStacks: ['Spring Boot', 'React', 'MySQL', 'Docker'],
        rolesAndContributions: [
            {
                role: 'Backend',
                contributions: ``
            },
            {
                role: 'Frontend',
                contributions: ``
            },
            {
                role: 'Designer',
                contributions: ``
            }
        ],
        slug: 'semi-erp'
    },{
        image: '/portfolio/softcat/th/thumb1.png',
        title: '구독형 솔루션 판매 서비스 개발',
        period: '24.06~24.11',
        organization: '소프트캣 (Softcat)',
        description: '맞춤형 소프트웨어 신청과 자동화 소프트웨어 구독을 한 번에 해결할 수 있는 통합 플랫폼 서비스입니다. 라이선스 키 발급을 통해 안전하게 소프트웨어를 이용할 수 있습니다.',
        detailedDescription: 'Softcat은 맞춤형 소프트웨어 신청과 자동화 소프트웨어 구독을 한 번에 해결할 수 있는 통합 플랫폼입니다.\n' +
            '\n' +
            '사용자는 원하는 구독 기간을 선택해 쉽고 빠르게 소프트웨어를 구매할 수 있으며, 라이선스 키 발급을 통해 안전하게 소프트웨어를 이용할 수 있습니다. 관리자 페이지에서는 상품 등록, 라이선스 관리 등 핵심 기능을 제공하여 운영 효율성을 높였습니다.\n' +
            '\n' +
            '결제 서비스에 요구되는 강력한 보안 정책과 빠른 로딩 속도를 고려하여 구현하였으며, 지속적인 자동화 테스트와 유지보수를 통해 서비스의 안정성과 신뢰성을 꾸준히 강화했습니다.',
        roles: ['Back', 'Front', 'Infra'],
        tags: ['WEB', 'Commerce', 'Admin Page'],
        techStacks: ['Spring Boot', 'REST API', 'Spring MVC', 'JPA', 'Spring Security', 'JWT', 'OAuth2', 'Thymeleaf', 'JavaScript', 'HTML/CSS', 'MySQL', 'Tailwind', 'AWS LightSail', 'Nginx', 'Docker', 'FileZilla', 'Postman', 'JMeter', 'PortOne API'],
        rolesAndContributions: [
            {
                role: 'Backend',
                contributions: `
### 설계
- 사용자, 상품, 구독, 라이선스 등 **전체 도메인 모델 설계**
- \`Spring MVC\` 기반 레이어드 아키텍처 구조 구축

### 개발
- \`PortOne\`(네이버페이, 카카오페이, 토스, 일반결제) 기반 결제 연동 및 결제 내역 관리
- \`UUID\` 기반 자동 라이선스 키 발급 및 \`Spring Validation\`을 이용한 유효성 검증 로직 구현
- \`Spring Data JPA\`와 쿼리, 로그 수집 기능을 활용한 관리자 페이지 실시간 통계 및 로그 데이터 제공
- 구독 기간별 상품 구매 및 **결제 로직 구현**
- 상품, 사용자, 라이선스 등 \`CRUD API\` 및 **비즈니스 로직 개발**
- \`Thymeleaf\` 템플릿 엔진을 통한 UI 데이터 바인딩 및 **SSR 구현** 

### 보안
- \`JWT\`, \`OAuth2\` 기반 인증/인가, HTTPS 적용, 개인정보 암호화(\`Jasypt\`), **접근 제어 정책** 수립 및 적용
- 결제 트랜잭션 무결성 확보를 위한 \`@Transactional\`, 예외 처리, **입력 검증** 적용
- 실행계획 분석 및 \`Redis\` 캐싱 전략 도입을 통한 **쿼리 최적화**

### 테스트
- \`JUnit\`, \`Mockito\` 기반 **자동화 테스트** 및 커버리지 확보
`
            },
            {
                role: 'Frontend',
                contributions: `
### 개발
- \`Thymeleaf\` 템플릿 엔진을 사용하여 서버 사이드 렌더링(SSR) 기반 동적 웹 페이지 구현
- 사용자, 상품, 결제, 라이선스 등 모든 도메인 UI 화면 설계 및 개발
- 결제 진행 과정과 결과 안내 등 사용자 플로우에 맞춘 **상태별 안내** 및 **예외 처리** 화면 구현
- 폼 입력값에 대한 **유효성 검증** 로직 적용 및 에러 메시지 동적 반영
- \`Spring MVC\`와 연동하여 \`Thymeleaf\`로 데이터 바인딩
- 관리자 페이지에서 실시간 통계 및 로그 데이터 시각화 UI 구현
- 공통 레이아웃, 헤더, 푸터, 네비게이션과 같은 **공통 템플릿 컴포넌트** 구현 및 재사용
- 알림, 모달, 토스트 등 동적 인터랙션 요소를 \`Thymeleaf\`, \`JavaScript\` 조합으로 구현
- UI/UX 일관성 유지를 위한 **스타일 가이드** 작성 및 CSS 구조 관리
- \`Webpack\`을 활용한 번들링 및 빌드 자동화

### 최적화
- 고정형 레이아웃을 **반응형**으로 전환, 시맨틱 마크업 및 ARIA 속성 적용을 통한 접근성 향상

### 테스트
- 주요 화면 및 폼 기능 E2E 테스트, 크로스 브라우저 호환성 확인

### 협업
- 디자이너와의 요구사항 조율 및 UI/UX 품질 공통 개선
                `
            },
            {
                role: 'Infra',
                contributions: `
### 배포
- \`AWS LightSail\`을 통한 웹 애플리케이션 및 \`MySQL\` 데이터베이스 인프라 구성
- \`GitHub Actions\` 기반 **CI/CD 파이프라인 구축**으로 코드 빌드 및 배포 자동화
- 운영/테스트 환경 분리 및 환경 변수 관리 체계화

### 보안 
- SSH 키 기반 접근 제어 및 **보안 그룹** 설정으로 서버/DB 접근 보호  
- LightSail 방화벽으로 HTTP/HTTPS, MySQL 등 **필수 포트만 개방**  
- Cafe24에서 구매한 도메인을 LightSail의 DNS 관리 기능으로 연결, **SSL 인증서** 적용을 통한 안전한 서비스 접속 환경 구축

### 운영 
- \`ELK\`(Elasticsearch, Logstash, Kibana) 기반 **로그 및 모니터링 연동**
- LightSail 모니터링 도구를 통한 인스턴스 **CPU, 메모리, 네트워크 사용량 실시간 점검**
- MySQL 데이터베이스 **주기적 스냅샷 및 백업 정책** 수립 및 운영
- 트래픽 및 리소스 사용량 분석을 통한 인스턴스 사양 최적화
                `
            }
        ],
        detailImages: [
            '/portfolio/softcat/th/thumb2.png',
            '/portfolio/softcat/th/thumb3.png',
            '/portfolio/softcat/th/thumb4.png',
            '/portfolio/softcat/th/thumb5.png',
            '/portfolio/softcat/th/thumb6.png',
            '/portfolio/softcat/th/thumb7.png',
            '/portfolio/softcat/th/thumb8.png',
            '/portfolio/softcat/th/thumb9.png',
            '/portfolio/softcat/th/thumb10.png',
            '/portfolio/softcat/th/thumb11.png',
            '/portfolio/softcat/th/thumb12.png',
        ],
        slug: 'softcat',
        links: {
            isDevDoc: true,
            github: 'https://github.com/mjgwon24/softcat',
        },
        achievements: [
            {
                title: 'Softcat 창업',
                description: 'Softcat 창업 및 서비스 런칭',
                date: '2024.12.15',
            }
        ],
    },{
        image: '/portfolio/stack-snapshot/thumb/thumb1.png',
        title: '네컷사진 촬영 서비스 개발',
        period: '24.07~24.12',
        organization: 'DEVELOPER',
        description: '2024 경북 해커톤, 동국대학교 축제에서 누적 160명 이상의 사용자들에게 특별한 추억을 만들어준 사진 촬영 서비스입니다.',
        detailedDescription: '스택네컷(Stack Snapshot) 은 행사장에서 참가자들이 직접 촬영한 네컷사진을 제공하는 서비스입니다. 사용자는 원하는 사진을 선택하고 프레임을 적용한 후, QR 코드를 통해 즉시 다운로드할 수 있습니다. 또한, 부가 서비스인 경품 이벤트(뽑기 게임)를 통해 행사 참여도를 높입니다.\n' +
            '\n' +
            '2024 경북 해커톤, 동국대학교 축제에서 이벤트성 서비스로 사용되었으며, 누적 160명 이상의 사용자들에게 소중한 추억을 제공했습니다. 이벤트 현장에서 요구되는 빠른 응답 속도, 안정적인 서버 운영, 20대들이 관심을 가질만한 UI/UX를 고려하여 개발되었으며, 실사용자 피드백을 바탕으로 기능을 개선하여 추후 행사에서도 활용 가능하도록 고도화하였습니다.',
        roles: ['PM', 'Back', 'Front', 'Planning', 'Design'],
        tags: ['WEB', 'Entertainment'],
        techStacks: ['Spring Boot', 'REST API', 'JPA', 'MySQL', 'React', 'Node.js', 'Nginx', 'JavaScript', 'HTML/CSS', 'Naver Cloud', 'Git', 'FileZilla', 'Postman', 'JMeter', 'Figma'],
        rolesAndContributions: [
            {
                role: 'PM',
                contributions: `
- 기술 스택 선정 및 아키텍처 설계
- 팀원 역할 분배 및 일정 관리
`
            },
            {
                role: 'Backend',
                contributions: `
- [비동기 아키텍처 설계] Spring Boot 기반으로 동기 구조를 비동기로 전환
- [비동기 아키텍처 설계] 이미지 처리 병목 해소 및 서버 **응답속도 66% 향상**(282ms → 95ms)
- [비동기 아키텍처 설계] JMeter 부하테스트로 실환경 성능 검증, 최소 **100명 동시접속 안정성** 확보
- [동시성 이슈 해결] 비동기 환경에서의 **race condition** 문제(여러 스레드가 동시에 디렉토리 생성에 접근)를 클래스 수준의 \`synchronized\` 동기화 블록으로 **원자적 처리하여 해결**
- [리소스 절감] 불필요한 임시파일 최소화, 프레임 캐싱, DTO 개선으로 **데이터 전송량 40% 절감**(15,464KB/s → 9,285KB/s)
- [이미지 처리] OpenCV 활용 실시간 네컷사진 합성
`
            },
            {
                role: 'Frontend',
                contributions: 'React·Tailwind 기반 반응형 UI 개발'
            },
            {
                role: 'Planning',
                contributions:`
- 촬영부터 편집, QR 다운로드, 경품 참여까지 한 번에 진행할 수 있는 원스톱 경험 설계
- 참가자 몰입도와 주최자 만족도를 모두 높이는 이벤트 연동 전략 수립
                `
            },
            {
                role: 'Design',
                contributions: '행사 분위기와 타겟 연령층을 고려한 서비스 및 네컷 프레임 디자인'
            }
        ],
        slug: 'stack-snapshot',
        links: {
            isDevDoc: true,
            github: 'https://github.com/mjgwon24/stack-snapshot-back',
        },
        achievements: [
            {
                title: '2025 동국대학교 축제',
                description: '동국대학교 축제에서 실사용자 100명 사용',
                date: '2025.05.28',
            },
            {
                title: '2024 경주 지역문제 해결 해커톤',
                description: '2024 경주 지역문제 해결 해커톤 행사에서 실사용자 60명 사용',
                date: '2024.11.29',
            },
        ],
        detailImages: [
            '/portfolio/stack-snapshot/thumb/thumb12.gif',
            '/portfolio/stack-snapshot/thumb/thumb13.png',
            '/portfolio/stack-snapshot/thumb/thumb11.png',
            '/portfolio/stack-snapshot/thumb/thumb2.png',
            '/portfolio/stack-snapshot/thumb/thumb3.png',
            '/portfolio/stack-snapshot/thumb/thumb4.png',
            '/portfolio/stack-snapshot/thumb/thumb5.png',
            '/portfolio/stack-snapshot/thumb/thumb6.png',
            '/portfolio/stack-snapshot/thumb/thumb7.png',
            '/portfolio/stack-snapshot/thumb/thumb8.png',
            '/portfolio/stack-snapshot/thumb/thumb9.png',
            '/portfolio/stack-snapshot/thumb/thumb10.png',
        ]
    },{
        image: '/portfolio/gyeongju-night/thumb/thumb1.png',
        title: '숙소 예약 서비스 개발',
        period: '24.11~24.12',
        organization: '2024 경주 지역문제 해결 해커톤',
        description: '2024 경주 해커톤 최우수상 수상! 경주만의 독특한 매력을 활용하여, 한옥·캠핑장 예약, 신선 지역 재료 직배송, SNS 연계 이벤트 등을 녹여낸 숙박업소 예약 서비스입니다.',
        detailedDescription:
`"경주의 밤"은 경주 지역 경제 활성화를 목표로 기획된 통합 플랫폼입니다.

전국 단위 숙박 플랫폼이 넘치는 시대에 경주만의 독특한 매력을 집중적으로 살리는 서비스로, 숙박 예약과 지역 특산품 연계, 그리고 SNS 기반의 오프라인 이벤트 참여 기능을 제공합니다.

2024 경주 해커톤에서 최우수상을 받은 작품으로, 참가팀 중 유일하게 전체 기능의 90% 이상을 구현해, 가장 완성도 높은 결과물을 도출했습니다.`,
        roles: ['Back', 'Front', 'Planning', 'Design'],
        tags: ['WEB', 'Commerce'],
        techStacks: ['Spring Boot', 'REST API', 'JPA', 'JPQL', 'Next.js', 'React Query', 'Tailwind', 'MySQL', 'Docker', 'Git', 'Postman', 'Figma'],
        rolesAndContributions: [
            {
                role: 'Backend',
                contributions:
`
-   [데이터/트랜잭션] 예약 서비스에서 발생할 수 있는 동시성·무결성 이슈를 고려하여, 날짜+객체 조합의 유니크 제약조건을 통해 이중 예약 및 동시성 문제 예방
-   [데이터/트랜잭션]  \`@Transactional\`  어노테이션을 통한 데이터 무결성 보장 및 실패 시 롤백 처리
-   [인프라]  \`docker-compose.yml\`을 활용한 DB 컨테이너화로 개발 환경 구축 시간 단축
-   [설계] Java 17의 \`record\`와 Lombok의 Builder 패턴을 결합하여, 불변 객체 기반 DTO 구조 설계
-   [설정/정책]  \`@Value\`  어노테이션으로 외부 설정(환경 변수/설정 파일) 주입 및 Config 클래스 분리, CORS 등 인프라 정책 설정
-   [로깅/예외] Slf4j를 활용한 로깅과 일관된 예외 처리 체계 구축
-   [쿼리] Spring Data JPA 기반 CRUD, 페이징, 정렬 기능을 활용해 API 응답 구조 설계
`
            },
            {
                role: 'Frontend',
                contributions:
`
- [SPA 설계] Next.js 기반 서버사이드 렌더링(SSR) 및 클라이언트 사이드 렌더링(CSR) 병행 구조 설계
- [상태 관리/비동기 처리] React Query와 \`axios\`로 서버 데이터 패칭, 캐싱, 자동 갱신하여 비동기 데이터 흐름 체계화
- [UI/UX] Tailwind CSS를 통한 반응형 디자인 및 일관된 디자인 시스템 구축
- [컴포넌트화] 재사용 가능한 컴포넌트 기반 설계로 유지보수성과 확장성 강화
- [외부 라이브러리] 인터페이스 완성도를 위해 \`React-icons\` 외부 라이브러리 활용
- [코드 최적화] \`useCallback\`, \`useRef\` React Hook을 활용해 렌더링 최적화
- [이미지 업로드] 이미지 업로드 및 미리보기 기능 구현
`
            },
            {
                role: 'Design',
                contributions:
`
- [UI/UX] Figma를 사용하여 프로토타입 제작
- [컬러 아이덴티티] 경주의 시그니처 컬러인 주황색을 메인 컬러로 선정하여, 지역의 정체성을 시각적으로 강조한 디자인 구현
`
            }
        ],
        slug: 'gyeongju-night',
        links: {
            isDevDoc: true,
            github: 'https://github.com/mjgwon24/tour-recommend-back',
        },
        achievements: [
            {
                title: '2024 경주 지역문제 해결 해커톤 최우수상',
                description: '2024 경주 지역문제 해결 해커톤에서 경북 ICT 융합 산업 진흥 협회로부터 최우수상 수상',
                date: '2024.12.01',
            }
        ],
        detailImages: [
            '/portfolio/gyeongju-night/thumb/thumb2.png',
            '/portfolio/gyeongju-night/thumb/thumb3.png',
            '/portfolio/gyeongju-night/thumb/thumb4.png',
            '/portfolio/gyeongju-night/thumb/thumb5.png',
            '/portfolio/gyeongju-night/thumb/thumb6.png',
            '/portfolio/gyeongju-night/thumb/thumb7.png',
            '/portfolio/gyeongju-night/thumb/thumb8.png'
        ]
    },{
        image: '/portfolio/developer.png',
        title: '개발동아리 사이트 개발',
        period: '24.07~24.12',
        organization: 'DEVELOPER',
        description: '동국대학교 개발 동아리 DEVELOPER의 공식 사이트입니다. 동아리 성과, 활동 내용, 부원 현황 등의 동아리 관련 정보를 제공해줍니다.',
        roles: ['Front', 'Planning', 'Design'],
        tags: ['WEB', 'Community'],
        techStacks: ['React', 'JavaScript', 'HTML/CSS', 'Node.js', 'Tailwind CSS', 'Git'],
        rolesAndContributions: [
            {
                role: 'Frontend',
                contributions:`
- [React] SPA 기반의 동아리 공식 웹사이트 개발
- [Next.js] 정적 페이지 생성 및 SEO 최적화
- [Tailwind CSS] 반응형 웹 디자인 및 UI 컴포넌트 라이브러리 제작
- [Node.js] 관리자 페이지 및 API 서버 개발
- [Git] Github Flow 기반의 협업 및 버전 관리
                `
            },
            {
                role: 'Designer',
                contributions: `
- [Figma] 동아리 로고 및 웹사이트 디자인
- [UI/UX] 사용자 경험을 고려한 UI/UX 설계 및 구현
- [Prototyping] Figma를 활용한 프로토타입 제작 및 사용자 피드백 반영
                `
            }
        ],
        achievements: [
            {
                title: 'IT동아리 DEVELOPER 공식 사이트',
                description: '동국대학교 IT동아리 DEVELOPER 공식 사이트로 사용중',
                date: '2024.12.01',
            }
        ],
        slug: 'developer',
        links: {
            github: 'https://github.com/mjgwon24/developer2023-web',
            live: 'https://www.developer2023.com/',
        },
        detailImages: [
            '/portfolio/details/developer/developer-detail1.png',
            '/portfolio/details/developer/developer-detail2.png',
            '/portfolio/details/developer/developer-detail3.png'
        ]
    }
];

export const linkCardsData = [
    {
        title: '소개 페이지',
        description: '더 자세한 소개, 경력 사항을\n확인하실 수 있어요!',
        linkText: '보러가기',
        href: '/about'
    },
    {
        title: '기술 포스팅',
        description: '사용했던 기술, 활동 회고와 관련된\n포스팅을 확인하실 수 있어요!',
        linkText: '보러가기',
        href: '/about'
    },
    {
        title: 'Github',
        icon: 'icon/github.svg',
        description: '프로젝트 진행 과정, 관련 코드들을\n직접 볼 수 있어요!',
        linkText: '깃허브',
        href: '/about'
    },
];