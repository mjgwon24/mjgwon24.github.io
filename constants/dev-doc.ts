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
    link?: {
        href: string;
        text: string;
    }
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
        improvement?: DevDocContent; // 성능 개선
        problemSolving?: DevDocContent; // 문제 해결
        results?: DevDocContent;
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
이를 해결하기 위해 **“현장에서 촬영 → 즉시 편집 → QR 코드로 다운로드”** 하는 디지털 방식의 **네컷사진 서비스**, 스택네컷을 기획했습니다. 추가로, QR 코드 다운로드 후 뽑기 이벤트를 추가하여 사용자 참여를 유도하고, 행사 몰입도를 높이는 요소를 추가하였습니다.
<br /><br />
[ 주요 타겟 사용자 ]<br/>
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
                content: `
# 1. 기능적 요구사항

## 1.1 사진 촬영 기능

### **FR-1. 다중 사진 촬영**
- 사용자는 현장에서 사진을 여러 장(최소 4장 이상) 촬영할 수 있어야 함
- 촬영된 사진은 일시적으로 서버에 저장되며, 사용자가 선택할 때까지 유지

### **FR-2. 사진 선택**
- 사용자는 촬영된 사진 중 원하는 4장을 선택 가능
- 선택한 사진은 사용자의 세션 동안 유지되며, 세션 만료 시 자동 삭제

### **FR-3. 프레임 선택**
- 사용자는 제공된 여러 프레임 중 하나를 선택하여 최종 네컷사진 생성 가능
- 프레임 목록은 관리자가 사전 설정 가능

---

## 1.2 사진 조합 및 생성

### **FR-4. 최종 네컷사진 생성**
- 선택된 4장의 사진과 프레임을 조합하여 최종 네컷사진 생성
- 생성된 사진은 서버에 24시간 저장 후 자동 삭제

### **FR-5. QR 코드 생성**
- 최종 네컷사진 생성 시 다운로드용 QR 코드 발급
- QR 코드는 1회성으로 발급되며, 24시간 후 자동 폐기

---

## 1.3 사진 다운로드

### **FR-6. QR 코드 스캔 후 다운로드**
- QR 코드 스캔으로 최종 네컷사진 다운로드 가능
- 모바일 환경 최적화된 다운로드 페이지 제공

---

## 1.4 경품 이벤트(뽑기 게임)

### **FR-7. 뽑기 게임 참여**
- QR 코드 스캔 후 자동 경품 이벤트 참여
- 사용자 1명당 1회 참여 제한

### **FR-8. 당첨 결과 결정**
당첨자 구성:
- 1등: 1명
- 2등: 2명
- 3등: 3명
- 나머지: 꽝

### **FR-9. 당첨자 처리**
- 결과 페이지에서 즉시 당첨 여부 확인 가능
- 관리자 페이지에서 당첨 내역 확인 및 관리

---

# 2. 추가 요구사항

## 2.1 성능 및 보안
- 동시 사용자 50명 ~ 100명 접속 시에도 원활한 동작 보장
- QR 코드 다운로드 및 사진 조합 기능 1초 이내 처리
- 개인정보 보호를 위한 24시간 후 데이터 자동 삭제

## 2.2 유지보수
- 다양한 행사(해커톤, 축제 등)에서 지속적으로 활용 가능하도록 설계
- 피드백 수집 및 반영을 통한 지속적인 유지보수 계획`
            },
            architecture: {
                title: '아키텍처 및 기술 설계',
                description: '시스템 설계 및 구조',
                content: `
<img src="/portfolio/stack-snapshot/architecture.png" alt="stack-snapshot architecture" />

<br />

# 1. 아키텍처 개요
본 프로젝트는 한정된 자원 내에서 최적의 성능을 발휘해야 했기 때문에, 무료 크레딧 활용이 가능한 \`Naver Cloud Server\`를 배포 환경으로 선택하였습니다.<br />
이와 같은 맥락으로, 파일 스토리지 또한 별도로 사용하지 않았습니다(파일 스토리지를 추가로 도입할 경우 이벤트용 서비스의 시스템 복잡성이 증가할 수 있고, 추가적인 관리 비용이 발생할 가능성 존재). 따라서 배포 환경 내 서버 폴더에 직접 파일을 저장하였습니다.<br />
<br />
# 2. 기술 스택 설계
- 백엔드: \`Spring Boot\`(Java 17), \`JPA\`, \`MySQL\`
- 프론트엔드: \`React\`, \`Tailwind CSS\`
- QR 코드 생성: ZXing 라이브러리
- 이미지 처리: \`OpenCV\` 
- 인프라: \`Naver Cloud Server\`, \`Nginx\`, GitHub Actions(CI/CD)
`
            },
            flowchart: {
                title: '시퀀스 다이어그램',
                description: '서비스 흐름도 및 아키텍처',
                image: {
                    src: '/portfolio/stack-snapshot/flowchart.png',
                    alt: '스택네컷 시퀀스 다이어그램',
                }
            },
            api: {
                title: 'API 문서',
                description: 'API 개요 및 세부 사항',
                link: {
                    href: 'https://documenter.getpostman.com/view/33657317/2sB2cUC3iT#b26da350-eed8-45fd-8b97-21febb6e50b8',
                    text: 'API 문서 보기'
                }
            },
            improvement: {
                title: '최적화 및 트레이드 오프',
                description: '성능 개선 및 최적화',
                content: `
# 1. 개요

스택네컷 프로젝트는 초기에 동기(Synchronous) 구조로 설계되었습니다. 이 구조는 소규모 사용 환경에서는 큰 문제가 없었지만, 동시 사용자가 많아질 경우 서버에 병목 현상이 발생하는 문제가 있었습니다. 이러한 문제를 해결하기 위해 \`JMeter\`를 활용해 부하 테스트를 진행했습니다.<br /><br />
부하 테스트 결과를 토대로 **비동기식(Asynchronous) 아키텍처를 도입**하고 **이미지 처리 로직을 최적화**하여 성능을 개선했습니다. 또한, 개인정보 보호와 같은 서비스 품질도 함께 강화했습니다. <br /><br />
그 결과, 사용자 응답 속도를 **66% 향상**시킬 수 있었으며, 데이터 전송량 또한 **40% 감소**시킬 수 있었습니다. <br />
<hr />  

# 2. 문제점 진단
## 2.1 테스트 시나리오
<img src="/portfolio/stack-snapshot/jmeter/jmeter-flow.png" alt="Before JMeter Aggregate 50" style="max-width: 300px" />

- 사용 테스트 도구: \`JMeter\`
- 관찰 배경: 
    - 동시 사용자 50명, 100명을 설정하고 20초 동안 점진적으로 증가
    - 각 사용자가 2회씩 요청 반복
<br/>
<br/>

## 2.2 최적화 전 API 테스트 결과 분석
• 최적화 전 동시 접속자 **50명** 성능 테스트 결과
<img src="/portfolio/stack-snapshot/jmeter/jmeter-before-50.png" alt="Before JMeter Aggregate 50" />
<br/>
• 최적화 전 동시 접속자 **100명** 성능 테스트 결과
<img src="/portfolio/stack-snapshot/jmeter/jmeter-before-100.png" alt="Before JMeter Aggregate 100" />
<br/>

- 전체 응답 시간:  
  - 50명: 평균 20ms  
  - 100명: 평균 21ms (전체 평균은 안정적이나, API별 차이 존재)

- **병목 구간:**  
  - \`POST /api/photos/frames\`(이미지 병합) API 동시 접속 50명→100명 증가 시
    - 평균 응답 125ms → 133ms  
    - 최대 응답 157ms → 282ms  
    - 99% Line **153ms → 244ms**로 **급등**

- 처리량/데이터 전송량:
  - 동시 접속자 증가시 **이미지 업로드/병합 API**에서 **데이터 전송량 급증**

- 에러율:
  - 전 API 0.00% (SLA 1% 이하 충족)

<br />

결과적으로 **이미지 처리 로직의 복잡성**과 **동기적 처리 방식**으로 인해 동시 접속자가 증가할 경우 **서버 성능이 크게 저하**된다는 사실을 확인했습니다. 또한, 기존 로직에는 데이터 보존 정책이 없어 개인정보가 유출될 위험도 있다는 점을 파악했습니다.

<hr />  

# 3. 개선 목표 및 전략

분석한 결과를 바탕으로 서비스 최적화를 위해 개선 목표와 방향을 정하였습니다. 먼저, 이미지 처리 로직의 최적화를 통해 자원 사용을 최소화하는 것을 목표로 삼았습니다. 다음으로, 오류 파악을 위해 로깅을 더 철저히 하고, 개인정보를 보호하기 위해 \`@Scheduled\`  기반 자동 삭제를 통해 데이터를 24시간 후 자동으로 삭제하고자 하였습니다.
<br/>
<br/>
적용한 주요 개선 전략으로는, 동기 프로세스를 비동기 구조로 전환하여 처리 속도를 높였습니다. 이를 위해 \`@Async\`와 Executor를 활용하였습니다. 또한 불필요한 임시 파일을 제거하여 저장 공간을 절약했습니다. 마지막으로, DTO 자료형을 개선하여 메모리 사용을 최소화하고, 프레임 이미지 캐싱과 병합 프로세스를 단순화하여 시스템의 복잡성을 줄였습니다.

<hr />

# 4. 성능 개선 결과
## 4.1 이미지 처리 최적화 효과
• 이미지 처리 최적화 후 동시 접속자 **50명** 성능 테스트 결과
<img src="/portfolio/stack-snapshot/jmeter/jmeter-image-after-50.png" alt="After JMeter Aggregate 50" />
<br/>
• 이미지 처리 최적화 후 동시 접속자 **100명** 성능 테스트 결과
<img src="/portfolio/stack-snapshot/jmeter/jmeter-image-after-100.png" alt="After JMeter Aggregate 100" />
<br />

- 평균 응답 시간 최대 **21% 감소**:
  - 50명: 125ms → 115ms (8%↓)  
  - 100명: 133ms → 105ms (**21%↓**)
- 데이터 전송량 **40% 감소**:  
  - 50명: 15,464KB/s → 9,285KB/s (**40%↓**)
  - 100명: 30,713KB/s → 18,457KB/s (**40%↓**)
<br />
<br />

## 4.2 비동기 처리 도입 효과
• 비동기 처리 도입 후 동시 접속자 **50명** 성능 테스트 결과
<img src="/portfolio/stack-snapshot/jmeter/jmeter-async-after-50.png" alt="After JMeter Aggregate 50" />
<br/>
• 비동기 처리 도입 후 동시 접속자 **100명** 성능 테스트 결과
<img src="/portfolio/stack-snapshot/jmeter/jmeter-async-after-100.png" alt="After JMeter Aggregate 100" />
<br />

- 이미지 병합 API 응답 시간 최대 **66% 감소**:
  - 50명: 125ms → 88ms (30%↓)  
  - 100명: 133ms → 82ms (38%↓)  
  - 최대 응답 시간: 282ms → 95ms (**66%↓**)
- 전체 API 평균 응답 시간 최대 **33% 감소**:  
  - 50명: 20ms → 15ms (25%↓)  
  - 100명: 21ms → 14ms (**33%↓**)
- 에러율:  
  - 모든 API 0.00%로 안정적 유지
  
<hr />

# 5. 비동기 기술 도입의 트레이드 오프
이미지 업로드 API (\`uploadPhotos\`)의 최적화를 진행한 결과, 동시 사용자 50명 기준으로 평균 응답 시간이 21ms에서 35ms로 증가했습니다. 그러나 동시 사용자 100명 기준으로는 응답 시간이 24ms에서 27ms로 비교적 안정적인 수준을 유지했습니다.<br/> 
이러한 성능 변화는 최적화 로직 추가로 인한 데이터 전송량 감소와 같은 이점과의 절충으로 판단됩니다. 따라서 이미지 최적화 로직의 장점을 고려할 때, 전체 시스템의 효율성을 높이는 데 긍정적인 영향을 줄 것으로 보입니다.
<br/><br/>
\`synchronized\` 블록은 병렬 처리의 가능성을 제한하므로, 여러 스레드가 동시에 실행될 때 병목 현상을 일으킬 수 있습니다. 또한, 여러 스레드가 이 블록에 접근하려고 할 때 락 경쟁이 발생하여 대기 시간이 늘어날 수 있습니다.<br/>
현재 스택네컷 프로젝트에서는 작은 단위의 기능에만 \`synchronized\` 락을 적용하여 큰 병목 현상이 발생하지 않았습니다. 게다가 아직까지 락 경쟁이 발생할 정도로 많은 요청이 들어온 적이 없어 성능 저하도 발생하지 않았습니다. 앞으로 확장성을 고려하여 필요시 더 세밀한 동기화 방법을 검토할 계획입니다.

                `
            },
            problemSolving: {
                title: '문제 해결',
                description: '문제 해결 및 개선 사항',
                content: `
# Race Condition - 비동기 방식 도입으로 인한 동시 디렉토리 생성 문제
\`CompletableFuture.supplyAsync\`를 사용하여 여러 스레드가 동시에 동일한 디렉토리에 접근하는 상황이 있었습니다. 디렉토리가 존재하지 않을 경우, 각 스레드가 디렉토리를 생성하려고 시도하게 됩니다. 이 과정에서 두 개 이상의 스레드가 동시에 \`groupDirectory.exists()\`를 호출한 후, **의도치않게 여러번 디렉토리를 생성**(race condition)할 가능성이 있습니다. 이러한 경우, "디렉토리 생성 실패"나 "IOException" 오류가 발생할 수 있습니다.
<br/><br/>
스택네컷 프로젝트에서도 이러한 문제를 경험했으며, 이를 해결하기 위해 적절한 동기화 메커니즘을 구현했습니다. 클래스 수준의 \`synchronized\` 블록을 사용하여 **한 번에 하나의 스레드만 해당 블록에 진입**할 수 있도록 했습니다. 
<br/><br/>
이러한 방식으로 디렉토리 생성 작업이 원자적으로 수행되어 다른 스레드가 동시에 같은 디렉토리를 생성하려는 시도를 방지할 수 있었습니다.
                `
            },
            retrospective: {
                title: '회고',
                description: '프로젝트 리뷰 및 회고 결과',
                content: `
초기 소규모 사용자 환경에서는 동기 방식이 적합했지만, 사용자 수 증가에 따라 일부 로직의 비동기 처리 필요성을 느끼게 되었습니다. 이번 경험을 통해 **상황에 맞는 기술 선택의 중요성**을 다시한번 느끼게 되었습니다.
<br /><br />
JMeter를 활용해 최적화 방법을 직접 검증하고 성능 개선 결과를 확인할 때 매우 즐겁고 뿌듯했습니다. 함께 열심히 작업해준 팀원들에게도 무척 고맙고, 즐거운 경험이었습니다.
<br /><br />
이번 프로젝트는 함께한 팀원들의 첫 프로젝트였던 만큼, 모든 팀원이 많은 것을 배우고 지식을 얻어갈 수 있도록 노력했습니다. 모두에게 보람찬 경험이 된 것 같아 정말 기쁩니다!
                `
            }
        }
    },
    'gyeongju-night': {
        projectName: '경주의 밤',
        subtitle: '숙소 예약 서비스',
        sections: {
            planning: {
                title: '기획',
                description: '프로젝트 기획',
                content:
`
"지역 상생을 위한 경주 지역문제 해결"이라는 목표를 달성하기 위해, 경주의 주말 집중 숙박 수요와 상권 경쟁력 약화 문제를 분석했습니다. 이를 통해 단순한 숙박 예약을 넘어 지역 경제의 선순환을 이끌 방법을 고민했습니다.<br /><br />
이러한 고민 끝에, 경주만의 특색 있는 숙박 옵션(한옥·펜션·캠핑)과 지역 농산물, 밀키트를 하나로 연결하는 통합 플랫폼, '경주의 밤' 플랫폼을 기획하게 되었습니다. 오프라인 키오스크와 SNS 이벤트를 활용해 관광객과 지역 상권 간 자연스러운 상호작용을 촉진하고, AI 개인 맞춤형 식사 추천을 통해 사용자 참여를 높이고자 하였습니다.<br /><br />
또한 빈 공실을 물류 거점으로 활용하고 배송 일자리를 창출하는 등 지역 자원을 효율적으로 활용하여 소상공인과 소비자 모두에게 혜택이 돌아가는 구조를 설계했습니다.<br /><br />
결과적으로 '경주의 밤'은 경주의 고유한 매력을 살리면서도, 관광객 경험 향상과 지역 경제 활성화라는 두 가지 목표를 동시에 달성할 수 있는 서비스로 완성되었습니다.
`
            },
            wbs: {
                title: 'WBS',
                description: '프로젝트 WBS',
                image: {
                    src: '/portfolio/gyeongju-night/wbs.png',
                    alt: '경주의 밤 WBS',
                    width: 800,
                    height: 600
                }
            },
            architecture: {
                title: '아키텍처 및 기술 설계',
                description: '시스템 설계 및 구조',
                content: `
<img src="/portfolio/gyeongju-night/architecture.png" alt="gyeongju-night architecture" />

<br />

# 1. 아키텍처 개요
본 프로젝트는 짧은 해커톤 기간 동안 진행되어, 빠른 프로토타입 개발과 MVP 필수 기능 구현에 집중해야 했습니다.
따라서 개발 환경의 차이로 발생할 수 있는 문제를 방지하기 위해 Docker 컨테이너를 도입하여 환경의 일관성을 확보하였습니다.<br />
데이터 관리는 MySQL을 통해 수행하고, AI 추천 시스템은 별도의 TensorFlow 모듈로 구현하여, 백엔드 서버가 AI 모듈에 요청을 보내고 응답을 받아 클라이언트에 반환하는 구조로 설계하였습니다.
프론트엔드와 백엔드 간에는 REST API를 통해 데이터가 원활하게 교환되도록 설계하였습니다.
<br />
<br />

# 2. 기술 스택 설계
- 백엔드: \`Spring Boot\`(Java 17), \`JPA\`, \`MySQL\`
- 프론트엔드: \`React\`, \`Next.js\`, \`Tailwind CSS\`
- AI 추천 시스템: \`TensorFlow\`, \`DNN\`
- 인프라: \`Docker\`, \`Git\`
`},

        }
    }
};