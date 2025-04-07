export interface DevDocContent {
    title: string;
    description: string;
    content?: string;
    image?: {
        src: string;
        alt: string;
        width: number;
        height: number;
    };
}

export interface ProjectDevDoc {
    projectName: string;
    subtitle: string;
    sections: {
        planning: DevDocContent;
        wbs: DevDocContent;
        requirements: DevDocContent;
        architecture: DevDocContent;
        process?: DevDocContent;
        flowchart: DevDocContent;
        api: DevDocContent;
        problemSolving: DevDocContent;
        results: DevDocContent;
        retrospective: DevDocContent;
    };
}

export const projectDevDocs: { [key: string]: ProjectDevDoc } = {
    'stack-snapshot': {
        projectName: '스택네컷',
        subtitle: '네컷사진 촬영 서비스',
        sections: {
            planning: {
                title: '기획',
                description: '프로젝트 기획',
                content: `대부분의 행사장에서 사진 촬영 부스를 운영하지만, 참가자들은 촬영한 사진을 현장에서 즉시 받을 수 없는 경우가 많습니다. 또한, 사진을 출력해주는 장비는 비용이 높고, 유지보수가 어렵습니다.
<br /><br/>
이를 해결하기 위해 “현장에서 촬영 → 즉시 편집 → QR 코드로 다운로드” 하는 디지털 방식의 네컷사진 서비스를 기획했습니다. 추가로, QR 코드 다운로드 후 뽑기 이벤트를 추가하여 사용자 참여를 유도하고, 행사 몰입도를 높이는 요소를 추가하였습니다.
<br /><br />
주요 타겟 사용자<br/>
• 행사 참가자: 친구, 동료와 함께 즐길 수 있는 사진 촬영 및 다운로드 기능 제공<br/>
• 행사 주최자: 참가자들의 경험을 향상시키고, 경품 이벤트를 통해 행사의 재미 요소 추가`
            },
            wbs: {
                title: 'WBS',
                description: '프로젝트 WBS',
                image: {
                    src: '/portfolio/stack-snapshot/wbs.png',
                    alt: '스택네컷 WBS',
                    width: 800,
                    height: 600
                }
            },
            requirements: {
                title: '프로젝트 요구사항',
                description: '기능적 요구사항 및 추가 요구사항',
                content: `# 1. 기능적 요구사항

## 1.1 사진 촬영 기능

### FR-1. 다중 사진 촬영
- 사용자는 현장에서 사진을 여러 장(최소 4장 이상) 촬영할 수 있어야 함
- 촬영된 사진은 일시적으로 서버에 저장되며, 사용자가 선택할 때까지 유지

### FR-2. 사진 선택
- 사용자는 촬영된 사진 중 원하는 4장을 선택 가능
- 선택한 사진은 사용자의 세션 동안 유지되며, 세션 만료 시 자동 삭제

### FR-3. 프레임 선택
- 사용자는 제공된 여러 프레임 중 하나를 선택하여 최종 네컷사진 생성 가능
- 프레임 목록은 관리자가 사전 설정 가능

---

## 1.2 사진 조합 및 생성

### FR-4. 최종 네컷사진 생성
- 선택된 4장의 사진과 프레임을 조합하여 최종 네컷사진 생성
- 생성된 사진은 서버에 24시간 저장 후 자동 삭제

### FR-5. QR 코드 생성
- 최종 네컷사진 생성 시 다운로드용 QR 코드 발급
- QR 코드는 1회성으로 발급되며, 24시간 후 자동 폐기

---

## 1.3 사진 다운로드

### FR-6. QR 코드 스캔 후 다운로드
- QR 코드 스캔으로 최종 네컷사진 다운로드 가능
- 모바일 환경 최적화된 다운로드 페이지 제공

---

## 1.4 경품 이벤트(뽑기 게임)

### FR-7. 뽑기 게임 참여
- QR 코드 스캔 후 자동 경품 이벤트 참여
- 사용자 1명당 1회 참여 제한

### FR-8. 당첨 결과 결정
당첨자 구성:
- 1등: 1명
- 2등: 2명
- 3등: 3명
- 나머지: 꽝

### FR-9. 당첨자 처리
- 결과 페이지에서 즉시 당첨 여부 확인 가능
- 관리자 페이지에서 당첨 내역 확인 및 관리

---

# 2. 추가 요구사항

## 2.1 성능 및 보안
- 동시 사용자 10명 이상 접속 시에도 원활한 동작 보장
- QR 코드 다운로드 및 사진 조합 기능 3초 이내 처리
- 개인정보 보호를 위한 24시간 후 데이터 자동 삭제

## 2.2 유지보수
- 다양한 행사(해커톤, 축제 등)에서 지속적으로 활용 가능하도록 설계
- 피드백 수집 및 반영을 통한 지속적인 유지보수 계획`
            },
            architecture: {
                title: '아키텍처 및 기술 설계',
                description: '시스템 설계 및 구조',
                content: `
# 1. 아키텍처 개요
본 프로젝트는 한정된 자원 내에서 최적의 성능을 발휘해야 했기 때문에, 무료 크레딧 활용이 가능한 \`Naver Cloud Server\`를 배포 환경으로 선택하였습니다.<br />
이와 같은 맥락으로, 파일 스토리지 또한 별도로 사용하지 않았습니다(파일 스토리지를 추가로 도입할 경우 이벤트용 서비스의 시스템 복잡성이 증가할 수 있고, 추가적인 관리 비용이 발생할 가능성 존재). 따라서 배포 환경 내 서버 폴더에 직접 파일을 저장하였습니다.<br />
또한 이미지 처리와 QR 코드 생성 같은 고성능 연산이 필요한 기능을 고려하여 비동기 처리 및 캐싱 기법을 적용했습니다.
<br /><br />
# 2. 아키텍처 구성 요소
- 백엔드: \`Spring Boot\`(Java 17)
- 프론트엔드: \`React\`, \`Tailwind CSS\`
- QR 코드 생성: ZXing 라이브러리
- 이미지 처리: \`OpenCV\` 
- 배포 환경: \`Naver Cloud Server\`, \`Nginx\`, GitHub Actions(CI/CD)
`
            },
            flowchart: {
                title: '서비스 흐름도',
                description: '서비스 흐름도 및 아키텍처',
                image: {
                    src: '/portfolio/stack-snapshot/flowchart.png',
                    alt: '스택네컷 플로우차트',
                    width: 800,
                    height: 600
                }
            },
            api: {
                title: 'API 문서',
                description: 'API 개요 및 세부 사항',
                content: 'API 설계와 구현 디테일...'
            },
            problemSolving: {
                title: '문제 해결',
                description: '개발 중 발생한 문제와 해결 방법',
                content: '주요 문제와 개선 및 해결 사례...'
            },
            results: {
                title: '결과물',
                description: '최종 결과물과 특이 사항',
                content: '완성된 결과물 및 주요 성과...'
            },
            retrospective: {
                title: '회고',
                description: '프로젝트 리뷰 및 회고 결과',
                content: '프로젝트 회고 및 개선 사항 정리...'
            }
        }
    },
    // 다른 프로젝트들의 문서 데이터
};