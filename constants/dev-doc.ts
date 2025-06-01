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

분석 결과를 바탕으로 서비스 최적화를 위해 다음과 같은 목표와 전략을 정하고, 코드에 반영했습니다.

<br />

## 3.1 이미지 처리 로직의 비동기화 및 자원 최적화
동기 방식의 이미지 업로드 및 병합 처리를 Java의 \`CompletableFuture\`와 비동기 메서드로 전환하여, 이미지들을 병렬로 처리하여 전체 처리 속도가 향상되도록 개선했습니다.

\`\`\`java
// PhotoService.java
// 이미지 업로드 병렬 처리
List<CompletableFuture<String>> futures = new ArrayList<>();
for (MultipartFile image : images) {
    CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
        // 파일 저장 로직
        return fileName;
    });
    futures.add(future);
}
\`\`\`

<br />
이미지 병합(프레임 합성)의 경우도, 비동기적으로 처리해주도록 개선하였습니다.

\`\`\`java
// 선택된 프레임 기반 사진 합성
// 비동기적으로 이미지 병합 작업 실행
return selectFrameService.mergeImagesAsync( /* ... */ )
        .thenApply(combinedImagePath -> PhotoResponseDto.builder()
            // ...
            .fileName(combinedImagePath)
            .build());
\`\`\`

\`\`\`java
// SelectFrameService.java
@Async
public CompletableFuture<String> mergeImagesAsync(/* ... */) {
    // 이미지 병합 처리
    return CompletableFuture.completedFuture(mergedFileName);
}
\`\`\`

<br/>
<br/>

## 3.2 프레임 이미지 캐싱
프레임 이미지는 항상 동일하므로 매 요청마다 디스크에서 읽어올 필요가 없습니다.
따라서, 메모리 내 캐시(ConcurrentHashMap)에 저장하여 불필요한 I/O를 줄이고 응답 속도를 높여주도록 개선하였습니다.

\`\`\`java
// 프레임 이미지 캐시
private final ConcurrentHashMap<Integer, BufferedImage> frameImageCache = new ConcurrentHashMap<>();

private BufferedImage loadFrameImage(String FRAME_PATH, int frameId) throws IOException {
    if (frameImageCache.containsKey(frameId)) 
        return deepCopy(frameImageCache.get(frameId));
    // 디스크에서 읽어와 캐시에 저장
    BufferedImage frameImage = ImageIO.read(new File(FRAME_PATH + frameId + "." + EXT));
    frameImageCache.put(frameId, frameImage);
    return frameImage;
}
\`\`\`

<br/>
<br/>

## 3.3 로깅 강화
장애 및 오류 발생 시 빠르게 원인을 추적하기 위해 Lombok의 \`@Slf4j\` 어노테이션을 활용하여 서비스 및 컨트롤러 전반에 걸쳐 로깅을 적용하였습니다.

\`\`\`java
@Slf4j
@Service
@RequiredArgsConstructor
public class PhotoService {
    // ...
}
\`\`\`

\`\`\`java
@PostMapping
public ResponseEntity<GroupPhotosResponseDto> uploadPhotos(@RequestParam("images") List<MultipartFile> images) {
    if (images.isEmpty()) {
        log.error("업로드할 사진이 없습니다.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
    // ...
}
\`\`\`

<br/>
<br/>

## 3.4 DTO 자료형 개선
개선을 위해 기존 코드를 검토해본 결과, 불필요한 DTO 구조가 존재하고있었습니다.
따라서 필요한 데이터만 포함하도록 DTO 구조를 개선하여 메모리 사용량을 최소화하였습니다.

<br/>
<br/>

## 3.5 임시 파일 및 개인정보 관리
저장 공간 절약과 개인정보 보호를 위해 서비스에서 생성되는 임시 파일 및 개인정보가 포함된 데이터를 주기적으로 삭제하도록 로직을 추가했습니다.
<br/>
<br/>

Spring의 \`@Scheduled\` 어노테이션을 활용하여, 24시간이 지난 파일을 매일 새벽 3시에 일괄 삭제하도록 구현하였습니다.

\`\`\`java
@Service
public class TempFileCleanupService {

    @Value("$\{file.upload-dir\}")
    private String uploadDirectory;

    // 매일 새벽 3시 실행
    @Scheduled(cron = "0 0 3 * * *")
    public void cleanOldFiles() {
        File uploadDir = new File(uploadDirectory);
        long now = System.currentTimeMillis();
        long expiredTime = 24 * 60 * 60 * 1000L;

        for (File groupDir : uploadDir.listFiles(File::isDirectory)) {
            for (File file : groupDir.listFiles()) {
                if (now - file.lastModified() > expiredTime) file.delete();
            }
            // 비어있으면 폴더 삭제
            if (groupDir.list().length == 0) groupDir.delete();
        }
    }
}
\`\`\`

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
이미지 업로드 API (\`uploadPhotos\`)의 최적화를 진행한 결과, 동시 사용자 50명 기준으로 평균 응답 시간이 21ms에서 35ms로 증가했습니다. 그러나 동시 사용자 100명 기준으로는 응답 시간이 24ms에서 27ms로 비교적 안정적인 수준을 유지했습니다.
이러한 성능 변화는 최적화 로직 추가로 인한 데이터 전송량 감소 이점과의 절충으로 판단됩니다. 따라서 이미지 최적화 로직의 장점을 고려할 때, 전체 시스템의 효율성을 높이는 데 긍정적인 영향을 주었다고 결론지었습니다.
<br />
<br />

\`synchronized\` 블록은 특정 자원에 대해 하나의 스레드만 접근할 수 있도록 제한하기 때문에, 여러 스레드가 동시에 실행될 때 병목 현상을 일으킬 수 있습니다. 또한, 여러 스레드가 이 블록에 접근하려고 할 때 락 경쟁이 발생하여 대기 시간이 늘어날 수 있습니다.<br/>
현재 스택네컷 프로젝트에서는 작은 단위의 기능에만 \`synchronized\` 락을 적용하여 큰 병목 현상이 발생하지 않았습니다. 또한 아직까지 락 경쟁이 발생할 정도로 많은 요청이 들어온 적이 없어 성능 저하도 발생하지 않았습니다. 
앞으로의 확장 가능성이 있다고 판단되면, 동기화 범위를 더 세밀하게 조정하거나 락 분할(\`lock splitting\`), 비동기 큐와 같은 대체 동기화 방법을 도입하여 확장성을 확보할 예정입니다.
                `
            },
            problemSolving: {
                title: '문제 해결',
                description: '문제 해결 및 개선 사항',
                content: `
# Race Condition - 비동기 방식 도입으로 인한 동시 디렉토리 생성 문제
비동기 방식(\`CompletableFuture.supplyAsync\`)을 도입하면서 여러 스레드가 동시에 동일한 디렉토리에 접근하는 상황이 발생했습니다.
<br/><br/>
디렉토리가 존재하지 않을 경우, 각 스레드가 \`groupDirectory.exists()\`를 확인한 뒤, 디렉토리를 생성하려고 시도하게 됩니다. 이 과정에서 두 개 이상의 스레드가 동시에, **의도치않게 여러번 디렉토리를 생성**(race condition)할 가능성이 있습니다. 이러한 경우, "디렉토리 생성 실패"나 "IOException" 오류가 발생하게 됩니다.
<br/><br/>
스택네컷 프로젝트에서도 이러한 문제를 경험했으며, 이를 해결하기 위해 클래스 수준의 \`synchronized\` 블록을 도입했습니다.
이렇게 하면 **한 번에 하나의 스레드만 해당 블록에 진입**할 수 있어, 디렉토리 생성 작업이 원자적으로 수행되고, 다른 스레드가 동시에 같은 디렉토리를 생성하려는 시도를 방지할 수 있습니다. 
<br/><br/>

\`\`\`java
// 비동기 업로드 중 디렉토리 생성 부분
synchronized (PhotoService.class) {
    if (!groupDirectory.exists() && !groupDirectory.mkdirs()) {
        throw new IOException("Failed to create group directory: " + groupDirectory.getAbsolutePath());
    }
}
\`\`\`
\`synchronized\` (PhotoService.class)를 사용하여, 동시에 여러 스레드가 해당 블록에 진입하지 못하도록 제어합니다.
위 작업을 통해, 디렉토리 생성이 중복 없이 안전하게 진행될 수 있었습니다.
                `
            },
            retrospective: {
                title: '회고',
                description: '프로젝트 리뷰 및 회고 결과',
                content: `
프로젝트 초기에는 아이디어 구체화부터 설계까지 많은 고민이 필요했습니다. "사진 촬영과 프레임 선택을 통해 특별한 추억을 만들어주자"는 아이디어를 현실화하기 위해 구체적인 설계와 명확한 협업 규칙을 세우는 것이 중요했습니다.
<br /><br />
행사장 현장에서 예상보다 많은 참가자들이 스택네컷 서비스를 이용해 사진을 찍어주었고, "재미있다", "아이디어가 독특하다"는 긍정적인 반응을 많이 들을 수 있었습니다. 우리가 기획했던 작은 서비스가 실제로 사람들에게 웃음과 추억을 남겨줄 수 있었다는 점에서 큰 보람을 느꼈습니다.
<br /><br />
이번 프로젝트를 성공적으로 마무리할 수 있었던 가장 큰 이유는, 각자 맡은 역할을 책임감 있게 수행해준 팀원들이 있었기에 가능한 일이었습니다.
특히, 저를 믿고 따라와준 팀원들에게 진심으로 고맙고, 정말 수고했다는 말을 전하고 싶습니다.
이번 경험을 바탕으로 앞으로도 더 나은 프로젝트를 기획 및 개발하고, 팀원들과 함께 성장하며, 새로운 도전에 나서고 싶습니다.
<br /><br />

스택네컷 프로젝트를 함께해준 모든 팀원들과 응원해주신 분들께 감사드립니다.
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
            flowchart: {
                title: '시퀀스 다이어그램',
                description: '서비스 흐름도 및 아키텍처',
                image: {
                    src: '/portfolio/gyeongju-night/flowchart.png',
                    alt: '경주의 밤 시퀀스 다이어그램',
                }
            },
            api: {
                title: 'API 문서',
                description: 'API 개요 및 세부 사항',
                link: {
                    href: 'https://documenter.getpostman.com/view/33657317/2sB2j7epue#64b85721-a955-48ac-9d01-6e89e770e75d',
                    text: 'API 문서 보기'
                }
            },
            problemSolving: {
                title: '문제 해결',
                description: '문제 해결 및 개선 사항',
                content: `
# 1. 동시 예약(Concurrency) 문제 해결

서비스 개발 과정에서, 여러 사용자가 거의 동시에 동일한 날짜와 방에 대해 예약 요청을 보낼 경우 \`room_availability\` 상태가 중복으로 변경되어 **오버부킹(중복 예약)이 발생하는 문제**가 있었습니다.
<br /><br />
기존에는 예약 요청 시 단순히 해당 날짜의 방이 비어있는지만 확인한 뒤 바로 예약 정보를 저장했습니다. 그러나 거의 동시에 두 개의 트랜잭션이 진행될 경우, 첫 번째 트랜잭션이 아직 커밋되지 않은 상태에서 두 번째 트랜잭션도 동일하게 방이 비어있다고 판단하여, 결국 중복 예약이 발생했습니다.
<br /><br />
이 문제를 해결하기 위해, 우선 예약 로직 전체를 **트랜잭션**으로 감싸 원자성을 보장했습니다. Spring의 \`@Transactional\` 어노테이션을 서비스 계층 메서드에 적용하여, 예약 처리 중 예외가 발생하면 모든 작업이 롤백되도록 했습니다.

\`\`\`java
@Transactional
public void reserveRoom(Long roomId, LocalDate date, Long userId) {
    // 예약 가능 여부 체크 + 예약 확정까지 하나의 트랜잭션에서 처리
}
\`\`\`

<br />

또한, 예약 서비스에서 발생할 수 있는 동시성 및 무결성 이슈를 예방하기 위해, \`날짜 + 방(room)\` 조합에 **유니크 제약조건**을 추가했습니다.  
이렇게 해줌으로써 애플리케이션 레이어에서의 체크와 더불어, 데이터베이스 레이어에서도 중복 예약을 이중으로 차단할 수 있었습니다.

\`\`\`java
@Table(name = "room_availability", 
       uniqueConstraints = @UniqueConstraint(columnNames = {"room_id", "date"}))
@Entity  
public class RoomAvailability {
    // ...
}
\`\`\`

<br />

이러한 조치들을 통해 동시 예약 상황에서도 오버부킹이 발생하지 않도록 데이터 무결성을 보장할 수 있었고, 실제 테스트 환경에서도 여러 사용자가 동시에 같은 방을 예약하더라도 단 한 명만 예약에 성공하는 것을 확인할 수 있었습니다.

<br />

비록 해커톤이라는 짧은 개발 기간 동안 비관적 락까지는 적용하지 못했지만, 트랜잭션과 함께 **낙관적 락**을 활용해 **동시성 문제를 해결**했습니다. 실제 서비스 환경이라면, 트랜잭션 처리와 더불어 JPA의 비관적 락을 적용하여 데이터베이스 레벨에서 동시성 문제를 더욱 확실하게 방지하는것이 안전합니다.
<br />
<br />
<hr />

# 2. 대용량 데이터 처리 및 성능 개선

숙소 및 캠핑장 리스트를 불러올 때 데이터가 많아질 경우, 페이지 로딩 속도가 점차 느려지는 현상이 발생했습니다.

<br />

이러한 문제를 해결하기 위해 대량의 데이터를 한 번에 모두 조회하는 방식 대신, Spring Data JPA의 **페이징(PageRequest)과 정렬(Sort) 기능을 도입**하여 필요한 데이터만 부분적으로 조회하도록 개선했습니다.

\`\`\`java
// ReservationAPI.java
@GetMapping("/reservation/accommodations")  
public ResponseEntity<ResponseDto<FetchAccommodationsResponse>> fetchAccommodations(@RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber,  
                                                                                    @RequestParam(name = "size", defaultValue = "10") int size) {  
    FetchAccommodationsResponse fetchAccommodationsResponse = reservationService.fetchAccommodations(pageNumber, size);  
  
    return ResponseEntity.ok(  
            new ResponseDto<>(ResponseDto.Status.SUCCESS, "숙소 목록 조회 성공", fetchAccommodationsResponse)  
    );  
}
\`\`\`

\`\`\`java
// ReservationService.java
public FetchAccommodationsResponse fetchAccommodations(int pageNumber, int size) {  
    // Sort 객체 생성하여 id 기준으로 정렬
  Sort sort = Sort.by(Sort.Direction.ASC, "id");  
  
    // 페이지 번호와 페이지 크기를 사용하여 PageRequest 객체 생성  
  PageRequest pageRequest = PageRequest.of(pageNumber, size, sort);  
  
    // Page 객체를 사용하여 숙소 목록 조회  
  Page<Accommodation> fetchedAccommodations = accommodationRepository.findAll(pageRequest);  
  
    // 조회된 숙소 목록을 DTO로 변환하여 반환
}
\`\`\`

<br />

이와 같은 개선을 통해, 데이터가 충분히 많이 늘어나는 상황까지 고려하여 페이지 로딩 속도를 효율적으로 개선했습니다. 또한, 사용자가 원하는 페이지와 데이터 크기를 요청 파라미터로 지정할 수 있어 더욱 유연한 데이터 조회가 가능해졌습니다. 
`
            },
            retrospective: {
                title: '회고',
                description: '프로젝트 리뷰 및 회고 결과',
                content: `
모든 팀원들의 노력으로 해커톤에서 최우수상이라는 값진 결과를 얻을 수 있어 정말 기뻤습니다.
<br />
<br />
프로젝트를 진행하면서 가장 보람찼던 순간은 모든 API가 잘 작동하는 것을 확인했을 때였습니다. 팀원들과 함께 잠도 자지않고 개발하며, AI 알고리즘이 사용자의 취향에 맞는 저녁 메뉴를 추천하는 장면을 봤을 때 큰 뿌듯함을 느꼈습니다.
<br />
<br />
제한된 시간 안에 기능 구현과 디자인 완성도를 동시에 높이는 것이 쉽지 않았지만, 팀워크를 통해 이를 해냈다는 점도 큰 자부심으로 남습니다.
더 나아가, 이런 경험들이 기반이 되어 앞으로도 다양한 프로젝트에 도전할 수 있기를 기대합니다.
<br />
<br />
해커톤 프로젝트를 함께해준 모든 팀원분들께 진심으로 감사드립니다. 😊
                `
            }
        }
    },
    'softcat': {
        projectName: '소프트캣',
        subtitle: '구독형 솔루션 판매 서비스',
        sections: {
            api: {
                title: 'API 문서',
                description: 'API 개요 및 세부 사항',
                link: {
                    href: 'https://documenter.getpostman.com/view/33657317/2sB2qXj2wZ',
                    text: 'API 문서 보기'
                }
            }
        }
    }
};