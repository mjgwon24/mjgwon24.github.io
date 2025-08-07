export const techStackData = {
    Backend: ['Java', 'Spring', 'Nest.js', 'JPA', 'MyBatis', 'AWS', 'Docker'],
    Frontend: ['JavaScript', 'TypeScript', 'React.js', 'Next.js', 'HTML/CSS'],
    Data: ['SQL', 'ELK stack'],
    Database: ['MySQL', 'MongoDB', 'Redis'],

    languages: ['Java', 'Node.js', 'JavaScript', 'TypeScript'],
    frameworks: ['Spring', 'MyBatis', 'React.js', 'Next.js'],
    infrastructure: ['AWS Cloud', 'Nginx', 'Docker'],
    tools: ['Git', 'Figma', 'JMeter', 'Postman'],
    aiAssistants: ['Copilot', 'MCP'],
};

export const projectsData = [
    {
        image: '/portfolio/flexrate/th/thumb1.png',
        title: '소비습관 기반 동적 금리 대출 서비스 개발',
        period: '25.04~25.06',
        organization: '우리FISA',
        description: '우리FIS 아카데미 최종 프로젝트 1위 수상작으로, 사용자의 소비습관을 기반으로 동적 금리를 산정해주는 대출 서비스',
        detailedDescription:
            `2025 우리FIS 아카데미 최종 프로젝트 1등 수상작!
당신의 일상이 금리를 결정합니다, FLEXRATE!

고객의 소비 패턴을 자체 AI가 분석하여, 건전한 소비는 금리 인하로, 과소비는 금리 상승으로 즉각 반영하는 머신러닝 기반 동적 금리 시스템을 도입하였습니다. 이로 인해 청년층은 자신의 소비 습관에 따라 직접 금리를 관리할 수 있으며, 기존의 전통적인 신용평가와 다른 더욱 합리적인 금융을 경험할 할 수 있습니다.
`,
        roles: ['Back', 'Front', 'Infra', 'AI'],
        tags: ['WEB', 'AI', 'Finance', 'Admin Page'],
        techStacks: ['Spring Boot', 'JPA', 'Spring Security', 'Flyway', 'QueryDSL', 'Redis', 'MySQL', 'React', 'Next.js', 'Emotion', 'TypeScript', 'Apex Charts', 'Axios', 'Tanstack Query', 'AWS EC2', 'AWS RDS', 'AWS ECR', 'Docker', 'Vercel', 'Github Actions', 'Filebeat', 'ELK Stack', 'Fast API', 'OpenAI GPT', 'Google Mail SMTP', 'Swagger'],
        rolesAndContributions: [
            {
                role: 'Backend Lead',
                contributions:`
- 신용 점수 산정, 대출 신청, 관리자 페이지, 마이페이지 API 설계 및 구현
- 신뢰성있는 서비스 구현을 위해 PIN 번호를 통한 다중인증 MFA 체계 도입
- 일관성있는 서비스 운영을 위해 AOP 기반 공통 로깅 및 예외 처리 체계 도입
`
            },
            {
                role: 'Data',
                contributions: `
- 신속한 장애 대응을 위해 Filebeat와 ELK 스택을 도입하여 로그 수집/분석/시각화 체계 구축
- 체계적인 스키마 관리를 위해 Flyway기반 DB 마이그레이션 프로세스 도입
`
            },
            {
                role: 'Infra',
                contributions: `
- GithubAction, Shell Script 기반 자동 배포 CI/CD 파이프라인 구축
- 유지보수성과 확장성을 높이기 위해 stateless 서비스는 Docker로, stateful 데이터베이스는 RDS로 분리, AI 모듈은 별도의 인스턴스로 분리하여 인프라 구성
`
            },
            {
                role: 'Frontend Engineer',
                contributions: `
- 초기 로딩 속도 개선을 위해 이미지 priority 속성, dynamic import, 스켈레톤 적용으로  LCP 7초에서 2.35초로 66% 단축
- 디자인 일관성과 생산성을 높이기 위한 디자인 시스템 개선
- 웹뷰를 포함한 웹 프로덕트 아키텍처 설계 및 CI/CD 자동화
`
            },
            {
                role: 'AI',
                contributions: `
- 실제 카드 소비데이터 100만건의 결측값 보정과 파생 변수 생성을 통해 맞춤형 금리를 산정하는  데이터 전처리 진행
`
            }
        ],
        achievements: [
            {
                title: '2025 우리FIS 아카데미 4기 최종 프로젝트 1등',
                description: '2025 우리FIS 아카데미 4기 최종 프로젝트 최우수상 수상',
                date: '2025.06.12',
            }
        ],
        slug: 'flexrate',
        links: {
            github: 'https://github.com/FLEX-RATE/flexrate-back',
        },
        detailImages: [
            '/portfolio/flexrate/th/thumb2.gif',
            '/portfolio/flexrate/th/indicator1.png',
            '/portfolio/flexrate/th/indicator2.png',
            '/portfolio/flexrate/th/flow1.png',
            '/portfolio/flexrate/th/flow2.png',
            '/portfolio/flexrate/th/thumb3.gif',
            '/portfolio/flexrate/th/thumb4.gif',
            '/portfolio/flexrate/th/thumb5.gif',
            '/portfolio/flexrate/th/thumb6.gif',
            '/portfolio/flexrate/th/thumb7.gif',
            '/portfolio/flexrate/th/thumb8.gif',
            '/portfolio/flexrate/th/thumb9.gif',
            '/portfolio/flexrate/th/thumb10.gif',
            '/portfolio/flexrate/th/thumb11.gif',
        ]
    },{
        image: '/portfolio/secubox.png',
        title: '보안 교육 시뮬레이션 개발',
        period: '25.02~25.04',
        organization: '정보보안 SW 웹/앱 개발 공모전',
        description: '드래그 앤 드롭을 통해 쉽게 커스텀 네트워크 환경을 구성할 수 있는 차세대 산업 보안 시뮬레이터 웹 플랫폼',
        detailedDescription: '산업별 사이버 위협이 증가하는 가운데, 이론 중심의 기존 보안 교육은 실전 대응력이 부족합니다. ' +
            '이에 따라, 보다 실전적인 훈련이 가능한 차별화된 실습형 보안 플랫폼 "SECUBOX"를 기획하게 되었습니다.\n\n' +
            'SECUBOX는 웹 기반 실습형 보안 훈련 플랫폼으로, 사용자가 직접 네트워크 환경을 커스텀하여 구성하고, 맞춤형 공격 및 방어 시뮬레이션을 수행할 수 있도록 설계되었습니다.\n' +
            '이를 통해 기업과 개인 모두 쉽고 효과적이게 보안 역량을 강화할 수 있습니다.\n' +
            '\n' +
            '• Drag & Drop 네트워크 구성으로 원하는 장비를 배치하고, 직접 커스터마이징 가능\n' +
            '• 금융, 제조, 스마트 시티 등 특화된 시나리오 제공하여 산업별 맞춤형 보안 훈련 가능\n' +
            '• 다양한 공격 및 방어 모듈을 활용한 실전 시뮬레이션 실습 가능\n' +
            '• 별도 구축 없이 언제 어디서나 보안 훈련을 수행할 수 있는 웹 기반 환경',
        roles: ['Back', 'Front', 'Infra', 'Design'],
        tags: ['WEB', 'Security', 'Education'],
        techStacks: ['Spring Boot', 'QueryDSL', 'WebSocket', 'React', 'Redux', 'MySQL', 'AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Git'],
        rolesAndContributions: [
            {
                role: 'Backend',
                contributions:`
- 사용자 커스텀 네트워크 구성 정보 구조화 및 관리
- 실시간 공격/방어 시나리오 실행 로직 구현
- SYN flood, DDoS 보안 이벤트 탐지 및 실시간 알림 시스템 개발
- 네트워크 객체 및 이벤트 이력 데이터 조회 \`QueryDSL\` 기반 최적화
- 운영 로그 및 감사 이력 관리
- \`DTO\`/\`Mapper\` 표준화
- 사용자 인증 및 권한 관리 기능 구현
- \`Builder\`/\`record\` 기반 DTO, \`CQRS\` 구조, 테스트 자동화 적용
                `
            },
            {
                role: 'Frontend',
                contributions: `
- 네트워크 시각화 엔진 및 Drag&Drop UI 설계/구현
- 공격/방어 시나리오 실행 패널 및 실시간 로그 뷰어 개발
- \`Redux\` 기반 대규모 상태관리 구조 설계 및 퍼포먼스 최적화
- 백엔드와의 실시간 \`WebSocket\` 연동 및 에러 핸들링
- 사용자 중심 시나리오 선택/환경 저장 기능 개발
- 교육 효과를 높이기 위한 UX 설계 및 인터랙션 강화
                `
            },
            {
                role: 'Infra',
                contributions:`
- AWS 기반 클라우드 인프라 설계 및 IaC(Terraform, CDK)로 자동화 구축
- \`Docker\`/\`Kubernetes\` 기반 격리된 네트워크 환경 제공, 실습 시나리오별 동적 리소스 할당
- \`Prometheus\`, \`ELK\`, \`Grafana\`로 실시간 모니터링 및 경보 시스템 구축
- \`Spring Security\`, \`HTTPS\` 인증/인가 및 데이터 보안 강화
- \`GitHub Actions\`, \`Jenkins\` 기반 CI/CD 및 배포 자동화 파이프라인 구축
                `
            },
            {
                role: 'Design',
                contributions: `
- 프로토타입 및 디자인 제작
                `
            }
        ],
        slug: 'secubox',
        achievements: [
            {
                title: '정보보안 SW 웹/앱 개발 공모전 본선 진출',
                description: '정보보안 SW 웹/앱 개발 공모전 본선 진출',
                date: '2025.04',
            }
        ],
        detailImages: [
            '/portfolio/details/secubox-detail1.png',
            '/portfolio/details/secubox-detail2.png',
        ]
    },{
        image: '/portfolio/semi-erp/th/thumb1.png',
        title: '동아리 행정관리 ERP 개발',
        period: '25.01~now',
        organization: '동국대학교',
        description: '동아리별 인원 관리 및 예산 관리, 일정 관리 같은 동아리 행정 전반을 관리해주는 SEMI ERP 서비스',
        detailedDescription: `SEMI ERP는 동국대학교 동아리행정정보시스템으로, 교내 동아리 운영의 모든 행정 절차를 하나의 통합 플랫폼에서 처리할 수 있도록 설계된 서비스입니다. 동아리 운영 과정에서 자주 지적되는 투명성 부족과 행정 업무의 번거로움을 해소하기 위해 개발되었습니다.

예산 계획 및 집행, 통장 관리, 인원 관리, 일정 관리 등 동아리 운영에 필수적인 기능들을 제공합니다. 또한, 동아리 회원 등급에 따라 권한을 명확하게 구분하여 처리하였습니다. 동아리 내 상위 등급 회원은 예산 승인, 인원 관리, 일정 조정 등 동아리의 전반적인 행정 업무를 직접 수행할 수 있도록 모든 관리 기능에 접근할 수 있게 하였고, 하위 등급 회원은 본인에게 필요한 정보만을 조회할 수 있도록 권한을 제한해주었습니다. 이를 통해 각 회원이 자신의 역할에 맞는 업무만 수행하도록 하여, 불필요한 정보 노출을 방지하고 동아리 운영의 투명성을 강화해주었습니다.
        `,
        roles: ['Back', 'Front', 'Planning', 'Design'],
        tags: ['WEB', 'ERP', 'Admin Page'],
        techStacks: ['Spring Boot', 'JPA', 'QueryDSL', 'MySQL', 'Docker', 'React', 'Next.js', 'Tailwind', 'Axios', 'TanstackQuery', 'Google Mail SMTP', 'Git', 'Figma'],
        rolesAndContributions: [
            {
                role: 'Backend',
                contributions: `### 설계
- 동아리별 통장(계좌) 관리 메뉴 데이터 모델 및 API 구조 설계
- 회원 등급 및 권한 기반 접근 제어 정책 설계
- 서비스 계층의 확장성과 테스트 용이성을 고려한 interface 기반 설계

### 개발
- 통장 정보/내역 조회, 추가, 수정, 삭제(soft delete)등 계좌 도메인 전반 API 개발
- 각 API별 요청자 회원 검증 로직 추가
- CQRS 패턴 기반으로 Command(등록/수정/삭제)와 Query(조회) 핸들러 분리 구현
- 도메인 서비스 및 리포지토리 추상화를 위한 interface 정의 및 활용

### 보안
- 통장 관리 API 접근 시, 요청자 회원의 소속 및 권한 검증 로직 적용
- 소속된 동아리의 일정 권한 이상일 경우에만 추가, 수정, 삭제 동작 가능하도록 분기처리

### 테스트
- 권한별(상위/하위 등급) 통장 API 접근 테스트 케이스 작성 및 검증
- 통장 정보 변경, 삭제, 조회 등 주요 기능에 대한 JUnit 기반 단위 테스트 수행

### 최적화
- 대용량 통장 내역 데이터 처리 시 성능 저하 방지를 위한 Spring Data 페이지네이션 적용
- MapStruct 활용으로 수동 매핑 코드 제거 및 DTO 변환 성능 최적화
- Global Exception Handler를 통한 일관된 에러 응답 구조 적립`
            },
            {
                role: 'Frontend',
                contributions: `### 설계
- 공통 레이아웃 구조 설계 및 구현

### 개발
- 조회조건 영역, 범위 입력 폼 등 공통 컴포넌트 구현으로 재사용과 통일성 확보
- 예산 메뉴 전반 UI 및 기능 구현  

### 최적화
- 메뉴 전반 검토 및 디테일 개선, 통일화
- 라이트하우스 LCP 지표 분석 및 개발자 퍼포먼스 탭을 활용한 화면 렌더링 속도 개선  
- 화면 세로 길이 축소 시 UI 요소 찌그러짐 현상 개선  
- 통장관리 테이블 높이, UI 배경 색상 등 시각적 일관성 및 가독성 개선  

### 테스트
- Cypress를 활용한 E2E(End-to-End) 테스트 작성 및 자동화  
- UI 변경 사항 및 오류 수정 후, 브라우저별 크로스 테스트 및 주요 기능 회귀 테스트 수행`
            },
            {
                role: 'Designer',
                contributions: `- 사용자 흐름 설계, 와이어프레임 제작
- 화면 레이아웃 및 인터랙션 설계
- 컴포넌트 스타일 가이드 정의 및 적용`
            }
        ],
        slug: 'semi-erp',
        links: {
            github: 'https://github.com/mjgwon24/dgu-semi-erp-back'
        },
    },{
        image: '/portfolio/softcat/th/thumb1.png',
        title: '구독형 솔루션 판매 서비스 개발',
        period: '24.06~24.11',
        organization: '소프트캣 (Softcat)',
        description: '맞춤형 소프트웨어 신청과 자동화 소프트웨어 구독을 한 번에 해결할 수 있는 통합 플랫폼 서비스',
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
- CQRS 패턴 적용으로 읽기/쓰기 작업 분리하여 서비스 확장성 및 유지보수성 강화
- 쿼리 실행계획 분석을 통해 \`fetch join\` 최소화, 페이징, 복합 인덱스를 추가하여 응답 속도를 **351ms에서 56ms로 84% 단축**
- \`PortOne\`(네이버페이, 카카오페이, 토스, 일반결제) 기반 결제 연동 및 결제 내역 관리
- \`UUID\` 기반 자동 라이선스 키 발급 및 \`Spring Validation\`을 이용한 유효성 검증 로직 구현
- \`Thymeleaf\` 템플릿 엔진을 통한 UI 데이터 바인딩 및 **SSR 구현**
- 공통 로깅 로직 자동화를 위한 \`AOP\` 적용
- MDC를 통한 \`loginId\`, \`traceId\`, \`pageId\` 식별자 추가로 로그 추적성 향상

### 보안
- \`JWT\`, \`OAuth2\` 기반 인증/인가, HTTPS 적용, 개인정보 암호화(\`Jasypt\`), 역할별 **접근 제어 정책** 수립 및 적용
- 결제 트랜잭션 무결성 확보를 위한 \`@Transactional\`, 예외 처리, **입력 검증** 적용

### 테스트
- \`JUnit\`, \`Mockito\` 기반 **단위 테스트** 코드 작성(Jacoco 기반 주요 서비스/도메인 기준 **90% 이상 커버리지** 확보)
`
            },
            {
                role: 'Frontend',
                contributions: `
### 개발
- \`Thymeleaf\` 템플릿 엔진을 사용하여 서버 사이드 렌더링(SSR) 기반 동적 웹 페이지 구현
- 사용자, 상품, 결제, 라이선스 등 모든 도메인 UI 화면 설계 및 개발
- 결제 진행 과정과 결과 안내 등 사용자 플로우에 맞춘 **상태별 안내** 및 **예외 처리** 구현
- 폼 입력값에 대한 **유효성 검증** 로직 적용 및 에러 메시지 동적 반영
- \`Spring MVC\`와 연동하여 \`Thymeleaf\`로 데이터 바인딩
- 공통 레이아웃, 헤더, 푸터, 네비게이션과 같은 **공통 템플릿 컴포넌트** 구현
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
- 롤링 배포 전략을 통한 무중단 서비스 배포를 고려한 설계

### 보안 
- SSH 키 기반 접근 제어 및 **보안 그룹 설정**으로 서버/DB 접근 보호  
- Cafe24에서 구매한 도메인을 LightSail의 DNS 관리 기능으로 연결, **SSL 인증서** 적용을 통한 안전한 서비스 접속 환경 구축

### 운영
- 로드밸런싱 기반 **트래픽 분산 및 장애 대응 체계** 설계 
- \`ELK\`(Elasticsearch, Logstash, Kibana), \`Filebeat\` 기반 **실시간 로그 분석 및 모니터링 체계 구축**
- LightSail 모니터링 도구를 통한 인스턴스 **CPU, 메모리, 네트워크 사용량 실시간 점검**
- MySQL 데이터베이스 **주기적 스냅샷 및 백업 정책** 수립 및 운영
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
        description: '1,300여 명 이상이 이용한 행사를 위한 사진 촬영 서비스',
        detailedDescription: '2024 경북 해커톤, 동국대학교 축제에서 이벤트성 서비스로 사용되었으며, 누적 1,300명 이상의 사용자들에게 소중한 추억을 제공했습니다. 이벤트 현장에서 요구되는 빠른 응답 속도, 안정적인 서버 운영, 20대들이 관심을 가질만한 UI/UX를 고려하여 개발되었으며, 실사용자 피드백을 바탕으로 기능을 개선하여 추후 행사에서도 활용 가능하도록 고도화하였습니다.\n' +
            '\n' +
            '스택네컷은 행사장에서 참가자들이 직접 촬영한 네컷사진을 제공하는 서비스입니다. 사용자는 원하는 사진을 선택하고 프레임을 적용한 후, QR 코드를 통해 즉시 다운로드할 수 있습니다. 또한, 부가 서비스인 경품 이벤트(뽑기 게임)를 통해 행사 참여도를 높입니다.',
        roles: ['PM', 'Back', 'Front', 'Infra', 'Design'],
        tags: ['WEB', 'Entertainment'],
        techStacks: ['Spring Boot', 'REST API', 'JPA', 'MySQL', 'React', 'Node.js', 'Nginx', 'JavaScript', 'HTML/CSS', 'Naver Cloud', 'Git', 'FileZilla', 'Postman', 'JMeter', 'Figma'],
        rolesAndContributions: [
            {
                role: 'Tech Lead',
                contributions: `
- 팀 리더로 참여하여 스택네컷에 필요한 IT 서비스 기획/개발/배포/운영
- JMeter 부하 테스트를 통해 기존 동기 방식의 api를 비동기/병렬 처리되도록 개선하여 응답 속도 66% 단축 (282ms → 95ms)
- 반복적으로 사용되는 이미지 프레임을 메모리 내에 캐싱하여 데이터 전송량 40% 절감 (15,464KB/s → 9,285KB/s)
- 개인 정보 보호를 위해 사용자들이 촬영한 사진은 서버 내에서 24시간 이후 제거되도록  스프링 스케줄러를 통해 자동화
`
            },
            {
                role: 'People Lead',
                contributions: `
- 팀원들이 최대한 빠르게 스택네컷 팀 방향성과 문화에 적응하도록  개발 프로세스 및 컨벤션 가이드 문서 작성
- 성공적으로 행사에 서비스를 제공하기 위해 전반적인 일정관리 진행 및 우선순위 기반 업무 할당
                `
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
                description: '동국대학교 축제에서 실사용자 1,210명 사용',
                date: '2025.05.28',
            },
            {
                title: '2024 경주 지역문제 해결 해커톤',
                description: '2024 경주 지역문제 해결 해커톤 행사에서 실사용자 90명 사용',
                date: '2024.11.29',
            },
        ],
        detailImages: [
            '/portfolio/stack-snapshot/thumb/thumb12.gif',
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
        description: '2024 경주 해커톤 최우수상 수상작으로, 캠핑장 예약, 신선 지역 재료 직배송, SNS 연계 이벤트를 녹여낸 숙박업소 예약 서비스',
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
### 설계
- Java 17의 record와 Lombok Builder 패턴을 결합해 불변 객체 기반 DTO 구조 설계
- 예약 서비스의 날짜, 객체 조합에 유니크 제약조건을 적용하여 데이터 무결성 및 동시성 이슈 예방
- Spring Data JPA 기반 CRUD, 페이징, 정렬 기능을 고려한 API 응답 구조 설계

### 개발
- \`@Transactional\` 어노테이션을 활용해 트랜잭션 처리 및 예외 발생 시 롤백 구현
- Slf4j를 활용한 통합 로깅 체계와 일관된 예외 처리 로직 구현

### 보안
- \`@Value\` 어노테이션과 Config 클래스 분리로 환경 변수 및 설정 파일 관리
- CORS 정책 등 인프라 보안 설정 적용

### 테스트
- 예약 및 데이터 무결성 검증을 위한 단위 테스트와 통합 테스트 작성
- 동시성 시나리오 테스트로 오버부킹 방지 로직 검증

### 최적화
- Spring Data JPA의 페이징, 정렬 기능 적용으로 대용량 데이터 조회 성능 개선
- 필요한 컬럼만 조회하는 DTO 분리 및 쿼리 최적화
`
            },
            {
                role: 'Frontend',
                contributions:
`
### 개발
- Next.js 기반 SSR과 CSR 병행 구조로 SPA 설계 및 구현
- React Query와 axios로 서버 데이터 패칭, 캐싱, 자동 갱신 로직 구현
- 이미지 업로드 및 미리보기 기능 구현

### 최적화
- useCallback, useRef 등 React Hook 활용으로 불필요한 렌더링 최소화
- Tailwind CSS 적용으로 반응형 및 일관된 디자인 시스템 구축

### 협업
- Figma를 활용한 프로토타입 공유 및 UI/UX 피드백 반영
- 재사용 가능한 컴포넌트 설계로 팀원 간 개발 효율성 증대
- React-icons 등 외부 라이브러리 선택 및 도입 논의
`
            },
            {
                role: 'Design',
                contributions:
`
- 경주의 시그니처 컬러인 주황색을 메인 컬러로 선정하여, 지역의 정체성을 시각적으로 강조한 서비스 전체 디자인 구현
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
    },
//     {
//         image: '/portfolio/developer.png',
//         title: '개발동아리 사이트 개발',
//         period: '24.07~24.12',
//         organization: 'DEVELOPER',
//         description: '동국대학교 개발 동아리 DEVELOPER의 공식 사이트입니다. 동아리 성과, 활동 내용, 부원 현황 등의 동아리 관련 정보를 제공해줍니다.',
//         roles: ['Front', 'Planning', 'Design'],
//         tags: ['WEB', 'Community'],
//         techStacks: ['React', 'JavaScript', 'HTML/CSS', 'Node.js', 'Tailwind CSS', 'Git'],
//         rolesAndContributions: [
//             {
//                 role: 'Frontend',
//                 contributions:`
// SPA 기반 동적 웹 페이지 개발
//                 `
//             },
//             {
//                 role: 'Designer',
//                 contributions: `
// 동아리 로고 및 웹사이트 디자인
//                 `
//             }
//         ],
//         achievements: [
//             {
//                 title: 'IT동아리 DEVELOPER 공식 사이트',
//                 description: '동국대학교 IT동아리 DEVELOPER 공식 사이트로 사용중',
//                 date: '2024.12.01',
//             }
//         ],
//         slug: 'developer',
//         links: {
//             github: 'https://github.com/mjgwon24/developer2023-web',
//             live: 'https://www.developer2023.com/',
//         },
//         detailImages: [
//             '/portfolio/details/developer/developer-detail1.png',
//             '/portfolio/details/developer/developer-detail2.png',
//             '/portfolio/details/developer/developer-detail3.png'
//         ]
//     }
];

export const linkCardsData = [
    {
        title: '소개 페이지',
        description: '더 자세한 소개, 경력 사항을\n확인해보실 수 있습니다.',
        linkText: '보러가기',
        href: '/about'
    },
    {
        title: '기술 포스팅',
        description: '사용했던 기술, 활동 회고와 관련된\n포스팅을 확인해보실 수 있습니다.',
        linkText: '보러가기',
        href: '/posts'
    },
    {
        title: 'Github',
        icon: 'icon/github.svg',
        description: '프로젝트 진행 과정, 관련 코드들을\n직접 확인해보실 수 있습니다.',
        linkText: '깃허브',
        href: 'https://github.com/mjgwon24'
    },
];

export const aboutCardsData = [
    {
        title: '포트폴리오',
        description: '진행한 프로젝트들을\n확인해보실 수 있습니다.',
        linkText: '보러가기',
        href: '/portfolio'
    },
    {
        title: '기술 포스팅',
        description: '사용했던 기술, 활동 회고와 관련된\n포스팅을 확인해보실 수 있습니다.',
        linkText: '보러가기',
        href: '/posts'
    },
    {
        title: 'Github',
        icon: 'icon/github.svg',
        description: '프로젝트 진행 과정, 관련 코드들을\n직접 확인해보실 수 있습니다.',
        linkText: '깃허브',
        href: 'https://github.com/mjgwon24'
    },
];