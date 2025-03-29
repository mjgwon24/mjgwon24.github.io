export const techStackData = {
    languages: ['JAVA', 'JavaScript', 'TypeScript', 'Thymeleaf', 'HTML/CSS'],
    frameworks: ['Spring', 'Spring Boot', 'React', 'MyBatis', 'Node.js', 'Next.js'],
    infrastructure: ['AWS', 'Nginx', 'Docker', 'MySQL', 'PostgreSQL'],
    tools: ['Git', 'VS Code', 'IntelliJ', 'WebStorm', 'Postman', 'FileZilla']
};

export const projectsData = [
    {
        image: '/portfolio/secubox.png',
        title: '보안 교육 시뮬레이션 개발',
        period: '25.02~25.03',
        organization: '정보보안 SW 웹/앱 개발 공모전',
        description: '차세대 산업 보안 시뮬레이터 웹 플랫폼, SECUBOX입니다. 드래그 앤 드롭을 통해 쉽게 커스텀 네트워크 환경을 구성할 수 있으며, 공격 및 방어 시뮬레이션을 실행해 직접 보안 테스트를 진행할 수 있습니다.',
        detailedDescription: 'SECUBOX는 보안 교육을 위한 시뮬레이션 플랫폼으로, 사용자가 드래그 앤 드롭 방식으로 네트워크 환경을 구성하고, 다양한 공격 및 방어 시나리오를 실행할 수 있는 웹 기반의 서비스입니다. 이 플랫폼은 보안 교육을 보다 실용적이고 효과적으로 진행할 수 있도록 도와줍니다. 사용자는 자신만의 네트워크 환경을 쉽게 설정하고, 다양한 보안 공격 및 방어 기술을 실습할 수 있습니다. 이를 통해 보안 전문가로 성장하는 데 필요한 실전 경험을 쌓을 수 있습니다.',
        roles: ['Back', 'Front', 'Design'],
        tags: ['WEB', 'Security', 'Education'],
        techStacks: ['Spring Boot', 'React', 'MySQL', 'Docker', 'JavaScript', 'HTML/CSS', 'Node.js', 'Git'],
        rolesAndContributions: [
            {
                role: 'Backend',
                contributions: [
                    'Spring Boot를 사용하여 RESTful API 설계 및 구현',
                    'MySQL을 이용한 데이터베이스 설계 및 최적화',
                    'Docker를 활용한 배포 및 환경 설정'
                ]
            },
            {
                role: 'Frontend',
                contributions: [
                    'React를 사용하여 사용자 인터페이스 개발',
                    '사용자 경험을 고려한 UI/UX 설계 및 구현',
                ]
            },
            {
                role: 'Designer',
                contributions: [
                    '전체적인 UI/UX 디자인 및 프로토타입 제작',
                    '사용자 피드백을 반영하여 디자인 개선'
                ]
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
            github: 'https://github.com/secu-box',
            live: 'https://github.com/mjgwon24',
        },
        detailImages: [
            '/portfolio/details/secubox-detail1.png'
        ]
    },{
        image: '/portfolio/semi-erp.png',
        title: '동아리 행정관리 ERP 개발',
        period: '25.01~25.03',
        organization: '동국대학교',
        description: '동국대학교 동아리 행정 전반을 관리해주는 SEMI ERP 서비스입니다. 각 동아리별 인원 관리 및 예산 관리, 일정 관리를 할 수 있습니다.',
        roles: ['Back', 'Front', 'Planning', 'Design'],
        tags: ['WEB', 'ERP', 'Admin Page'],
        techStacks: ['Spring Boot', 'React', 'MySQL', 'Docker'],
        rolesAndContributions: [
            {
                role: 'Backend',
                contributions: [
                    'Spring Boot를 사용하여 RESTful API 설계 및 구현',
                    'MySQL을 이용한 데이터베이스 설계 및 최적화',
                    'Docker를 활용한 배포 및 환경 설정'
                ]
            },
            {
                role: 'Frontend',
                contributions: [
                    'React를 사용하여 사용자 인터페이스 개발',
                    '사용자 경험을 고려한 UI/UX 설계 및 구현',
                ]
            },
            {
                role: 'Designer',
                contributions: [
                    '전체적인 UI/UX 디자인 및 프로토타입 제작',
                    '사용자 피드백을 반영하여 디자인 개선'
                ]
            }
        ],
        slug: 'semi-erp'
    },{
        image: '/portfolio/softcat.png',
        title: '맞춤형 솔루션 판매 서비스 개발',
        period: '24.06~24.11',
        organization: '소프트캣 (Softcat)',
        description: '맞춤형 소프트웨어를 신청하거나 자동화 소프트웨어를 구독할 수 있는 서비스입니다. 원하는 구독 개월수 별로 구매하여 해당 소프트웨어를 사용할 수 있고, 관리자 페이지도 제공합니다.',
        roles: ['Back', 'Front', 'CI/CD'],
        tags: ['WEB', 'Commerce', 'Admin Page'],
        techStacks: ['Spring Boot', 'React', 'MySQL', 'Docker'],
        rolesAndContributions: [
            {
                role: 'Backend',
                contributions: [
                    'Spring Boot를 사용하여 RESTful API 설계 및 구현',
                    'MySQL을 이용한 데이터베이스 설계 및 최적화',
                    'Docker를 활용한 배포 및 환경 설정'
                ]
            },
            {
                role: 'Frontend',
                contributions: [
                    'React를 사용하여 사용자 인터페이스 개발',
                    '사용자 경험을 고려한 UI/UX 설계 및 구현',
                ]
            },
            {
                role: 'CI/CD',
                contributions: [
                    'GitHub Actions를 사용하여 CI/CD 파이프라인 구축 및 자동화'
                ]
            }
        ],
        slug: 'softcat'
    },{
        image: '/portfolio/gyeongju-night.png',
        title: '숙소 예약 서비스 개발',
        period: '24.11~24.12',
        organization: '2024 경주 지역문제 해결 해커톤',
        description: '2024 경주 해커톤 최우수상 수상! 경주만의 독특한 매력을 활용하여, 한옥·캠핑장 예약, 신선 지역 재료 직배송, 태그 이벤트 등을 녹여낸 숙박업소 예약 서비스입니다.',
        roles: ['Back', 'Front', 'Planning', 'Design'],
        tags: ['WEB', 'Commerce'],
        techStacks: ['Spring Boot', 'React', 'MySQL', 'Docker'],
        rolesAndContributions: [
            {
                role: 'Backend',
                contributions: [
                    'Spring Boot를 사용하여 RESTful API 설계 및 구현',
                    'MySQL을 이용한 데이터베이스 설계 및 최적화',
                    'Docker를 활용한 배포 및 환경 설정'
                ]
            },
            {
                role: 'Frontend',
                contributions: [
                    'React를 사용하여 사용자 인터페이스 개발',
                    '사용자 경험을 고려한 UI/UX 설계 및 구현',
                ]
            },
            {
                role: 'Designer',
                contributions: [
                    '전체적인 UI/UX 디자인 및 프로토타입 제작',
                    '사용자 피드백을 반영하여 디자인 개선'
                ]
            }
        ],
        slug: 'gyeongju-night'
    },{
        image: '/portfolio/stack-four-cut.png',
        title: '네컷사진 촬영 서비스 개발',
        period: '24.07~24.10',
        organization: 'IT동아리 DEVELOPER',
        description: '사진을 찍어 네컷 사진으로 병합해주는 추억 남기기 서비스입니다. 경주시와 협업하여 “2024 경주 지역문제 해결 해커톤”에서 실제로 서비스를 사용하였고, 많은 행사 참가자들의 추억을 만들어주었습니다.',
        roles: ['Back', 'Front', 'Planning', 'Design'],
        tags: ['WEB', 'Entertainment'],
        techStacks: ['Spring Boot', 'React', 'MySQL', 'Docker'],
        rolesAndContributions: [
            {
                role: 'Backend',
                contributions: [
                    'Spring Boot를 사용하여 RESTful API 설계 및 구현',
                    'MySQL을 이용한 데이터베이스 설계 및 최적화',
                    'Docker를 활용한 배포 및 환경 설정'
                ]
            },
            {
                role: 'Frontend',
                contributions: [
                    'React를 사용하여 사용자 인터페이스 개발',
                    '사용자 경험을 고려한 UI/UX 설계 및 구현',
                ]
            },
            {
                role: 'Designer',
                contributions: [
                    '전체적인 UI/UX 디자인 및 프로토타입 제작',
                    '사용자 피드백을 반영하여 디자인 개선'
                ]
            }
        ],
        slug: 'stack-four-cut'
    },{
        image: '/portfolio/developer.png',
        title: '개발동아리 사이트 개발',
        period: '24.07~24.12',
        organization: 'IT동아리 DEVELOPER',
        description: '동국대학교 개발 동아리 DEVELOPER의 공식 사이트입니다. 동아리 성과, 활동 내용, 부원 현황 등의 동아리 관련 정보를 제공해줍니다.',
        roles: ['Front', 'Planning', 'Design'],
        tags: ['WEB', 'Community'],
        techStacks: ['Spring Boot', 'React', 'MySQL', 'Docker'],
        rolesAndContributions: [
            {
                role: 'Frontend',
                contributions: [
                    'React를 사용하여 사용자 인터페이스 개발',
                    '사용자 경험을 고려한 UI/UX 설계 및 구현',
                ]
            },
            {
                role: 'Designer',
                contributions: [
                    '전체적인 UI/UX 디자인 및 프로토타입 제작',
                    '사용자 피드백을 반영하여 디자인 개선'
                ]
            }
        ],
        slug: 'developer'
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