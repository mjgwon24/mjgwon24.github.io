export interface Post {
    id: string;
    title: string;
    description: string;
    category: 'development' | 'cs' | 'algorithm';
    tags: string[];
    date: string;
    thumbnail?: string;
    readingTime: string;
    slug: string;
    content: string;
}

export const postsData: Post[] = [
    {
        id: '1',
        title: 'Global Exception으로 일관된 예외 응답 처리',
        description: 'FLEXRATE 프로젝트에서 사용한 전역 예외 처리 도입에 대해 다룹니다.',
        category: 'development',
        tags: ['FLEXRATE', 'Global Exception', '예외 처리', 'Spring Boot'],
        date: '2025-04-26',
        thumbnail: '/posting/globalException/flow.png',
        readingTime: '4분',
        slug: 'global-exception-handling',
        content: `
안녕하세요. FLEXRATE 프로젝트의 백엔드 팀장으로 참여한 권민지입니다.<br><br>
API를 개발할때 응답의 일관성은 서비스에 대한 신뢰도, 유지보수성 그리고 클라이언트 개발자들의 생산성까지 영향을 미치는 중요한 요소입니다. 만약 API마다 에러 응답 구조가 매번 달라진다면, 프론트엔드와의 협업 과정에서 혼란이 발생하고 운영 중 오류 추적과 대응 역시 어렵게 됩니다. 이는 단순히 보기 불편한 수준을 넘어 개발 시간의 증가와 확장성 저하를 가져올 수 있으며, 결국 서비스 품질 악화로 이어질 수 있습니다.<br><br>
이러한 상황을 방지하고자, 저희 팀은 초기 설계 단계부터 체계적인 예외 처리 구조를 도입하기로 결정했습니다. 이번 글에서는 왜 일관된 예외 응답이 필요한지, 그리고 저희가 \`GlobalExceptionHandler\`와 커스텀 예외 구조를 어떻게 적용했는지 그 경험을 공유해보고자 합니다.
<br>
<br>

<hr />

# 1. 일관성 없는 에러 처리 방식의 문제점
<br>

일부 프로젝트에서는 예외가 발생할 때 \`throw new RuntimeException("회원 정보를 찾을 수 없습니다.");\`와 같은 방식으로 예외를 던지고, 컨트롤러 혹은 서비스 레이어에서 개별적으로 \`try-catch\`로 처리합니다. 심지어 아무런 처리 없이 서버의 기본 에러 메시지를 그대로 노출시키는 경우도 있습니다.<br><br>
예를 들어, 다음과 같이 특정 사용자 정보를 조회하는 API가 있다고 가정해봅시다.<br><br>

\`\`\`java
@GetMapping("/api/users/{id}")
public UserResponse getUser(@PathVariable Long id) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("User not found"));
    return UserResponse.from(user);
}
\`\`\`
이 코드는 사용자가 없을 때 \`RuntimeException\`을 던집니다.<br><br>
이때 클라이언트는 아래와 같이 일관성 없는 응답을 받게 됩니다.

\`\`\`json
{
  "timestamp": "2025-04-28T16:22:00.123+09:00",
  "status": 500,
  "error": "Internal Server Error",
  "message": "User not found",
  "path": "/api/users/123"
}
\`\`\`

<br>

이 구조의 문제는 API마다 반환하는 필드가 다를 수 있으며, 메시지도 개발자가 입력하는 대로 달라질 수 있고, 에러 코드가 없어서 클라이언트가 이를 구분하여 처리할 방법이 없다는 점입니다.<br><br>

이로 인해 프론트엔드 개발자는 “이 메시지가 무슨 뜻이지?”, “이 에러는 어떤 상황에서 오는 거지?” 와 같은 혼란을 겪게 되고, 서버 로그를 추적할 때도 일관된 기준이 없어 디버깅이 어려워집니다<br><br>

<hr />

# 2. GlobalExceptionHandler와 CustomException 도입

<br>

첫 번째 목차에서 언급한 문제 상황을 막기위해, 저희팀은 에러 코드를 체계화하고 글로벌 예외 처리를 도입하기로 결정했습니다.<br><br>

## 2.1 GlobalExceptionHandler + CustomException 동작 흐름

<img src="/posting/globalException/flow.png" alt="Global Exception Handling Flow" class="w-full rounded-md">

<br>
본격적으로 코드를 구현하기 전에, 간단하게 동작 흐름을 살펴보도록 하겠습니다.

<br>
먼저 클라이언트가 요청을 보내면, 서비스에서 비즈니스 로직 중 FlexrateException(CustomException)을 생성합니다.

이후 예외가 컨트롤러에서 글로벌 핸들러로 전파되고, 환경별로 로그를 처리하게 됩니다.

그렇게 최종적으로 일관된 에러 응답이 반환됩니다.

<br>

## 2.2 ErrorCode ENUM 설계

이제 커스텀 예외처리를 구현하기 위한 첫 단계인 ErrorCode를 설계해보도록 하겠습니다.

먼저, 서비스 내에서 발생 가능한 예외 상황을 정의한 ErrorCode ENUM을 설계했습니다. 

각 예외는 고유 코드, 메시지, HTTP 상태를 포함합니다.

<br>

\`\`\`java
@Getter
@AllArgsConstructor
public enum ErrorCode {
    // 사용자
    USER_NOT_FOUND("U001", "사용자를 찾을 수 없습니다", HttpStatus.NOT_FOUND),

    // 대출
    INVALID_APPLICATION("L001", "신청 정보가 올바르지 않습니다.", HttpStatus.BAD_REQUEST),
    LOAN_NOT_FOUND("L002", "대출 정보를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    APPROVAL_MISSING("L003", "승인 정보가 누락되었습니다.", HttpStatus.BAD_REQUEST),
    LOAN_ALREADY_APPROVED("L004", "이미 승인된 대출입니다.", HttpStatus.CONFLICT),

    // 인증/인가
    EMAIL_ALREADY_REGISTERED("A001", "이미 가입된 이메일입니다.", HttpStatus.CONFLICT),
    INVALID_CREDENTIALS("A002", "아이디 또는 비밀번호가 일치하지 않습니다.", HttpStatus.UNAUTHORIZED),
    PASSKEY_AUTH_FAILED("A003", "패스키 인증에 실패했습니다.", HttpStatus.UNAUTHORIZED),
    INVALID_REFRESH_TOKEN("A004", "유효하지 않은 리프레시 토큰입니다.", HttpStatus.UNAUTHORIZED),

    ...
    
    private final String code;
    private final String message;
    private final HttpStatus status;
}
\`\`\`

이렇게 ErrorCode를 정의해둠으로써, 새로운 예외 상황이 생길 경우 Enum에 추가만 하면 되므로 코드 일관성과 유지보수성이 크게 향상됩니다.
<br><br>

## 2.3 CustomException 구현
다음으로 2.2 목차에서 정의한 ErrorCode를 담는 커스텀 예외를 만듭니다. \`RuntimeException\`을 상속받아, 서비스 레이어에서 언제든 일관된 방식으로 사용할 수 있습니다.

\`\`\`java
@Getter
public class FlexrateException extends RuntimeException {
    private final ErrorCode errorCode;

    public FlexrateException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

\t@Override
\tpublic String getMessage() {
\t    return errorCode.getMessage();
\t}
}
\`\`\`

<br>
이제 서비스 레이어에서는 아래와 같이 간결하고 일관된 방식으로 예외를 던질 수 있습니다.

<img src="/posting/globalException/exampleCode.png" alt="Custom Exception Usage" class="w-full rounded-md">

<br>

## 2.4 GlobalExceptionHandler로 일괄 처리

모든 예외는 \`@RestControllerAdvice\`가 적용된 \`GlobalExceptionHandler\`에서 일괄적으로 처리합니다.

\`@RestControllerAdvice\`는 Spring에서 모든 컨트롤러의 예외를 전역적으로 처리할 수 있게 해주는 어노테이션입니다. (자세한 설명은 다음 목차에서 다룹니다.)

\`\`\`java
@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {
\tprivate final ProfileUtil profileUtil;

\t/**
\t * 커스텀 예외 처리
\t */
\t@ExceptionHandler(FlexrateException.class)
\tpublic ResponseEntity<ErrorResponse> handleFlexrateException(FlexrateException ex) {
\t    ErrorCode errorCode = ex.getErrorCode();
\t    String code = errorCode.getCode();
\t    String message = errorCode.getMessage();
\t    initMDC(code, ex);
\t    logError(message);
\t
\t    return ResponseEntity.status(errorCode.getHttpStatus())
\t            .body(new ErrorResponse(code, message));
\t}

\t// 그 외 예외 처리

\t/**
\t * 공통 헬퍼
\t * - errorCode, message, MDC pageId, stackTrace
\t */
\tprivate void initMDC(String code, Exception ex) {
\t    MDC.put("errorCode", code);
\t    MDC.put("details", ExceptionUtils.getStackTrace(ex));
\t}

\tprivate void logError(String message) {
\t    log.error("{}", message);
\t}

\t/**
\t * 에러 응답 DTO
\t */
\t@Getter
\t@AllArgsConstructor
\tpublic static class ErrorResponse {
\t    private String code;
\t    private String message;
\t}
}
\`\`\`

위 \`GlobalExceptionHandler\` 덕분에 비즈니스 예외는 FlexrateException으로 일괄 처리되고, 예상치 못한 모든 예외도 공통 구조로 처리가 가능합니다.

<br/>

## 2.5 일관된 에러 응답 반환
이제 실제로 에러가 발생하면, 항상 아래와 같은 구조로 응답이 반환됩니다.<br/>

<img src="/posting/globalException/codeResponse.png" alt="Custom Exception Usage" class="w-full rounded-md">
<br/>

이처럼 에러 코드와 메시지가 명확하게 전달되므로 프론트엔드에서는 code 값으로 정확한 분기 처리가 가능해지고, 클라이언트-서버 간의 협업이 훨씬 수월해집니다.
<br/><br/>
<hr />

# 3. @RestControllerAdvice + @ExceptionHandler
<br/>

2.4 GlobalExceptionHandler에서 사용한 \`@RestControllerAdvice\`는 모든 컨트롤러에서 발생하는 예외를 전역적으로 처리할 수 있게 해주는 Spring의 어노테이션입니다. 여기에 \`@ExceptionHandler\`를 조합하면, 특정 예외 타입별로 일관된 응답을 반환할 수 있습니다.<br/><br/>

이 덕분에 각 컨트롤러마다 \`try-catch\`를 반복하지 않아도 돼서 중복 코드를 제거할 수 있습니다. 또한 모든 에러 응답이 동일한 구조로 반환되어 프론트엔드와의 협업이 훨씬 수월해집니다.<br/>

추가적인 예외 상황이 생겨도 Enum과 ExceptionHandler만 확장하면 되기 때문에 확장성도 좋습니다. 에러 코드 기준으로 로그 집계, 알람 연동이 쉬워, 로깅 및 모니터링에도 유용합니다.
<br/><br/>
<hr />

# 4. 에러 응답 필드 확장
에러 응답 필드에는 timestamp, path, traceId 정보를 추가하여 사용합니다. timestamp는 에러 발생 시각을, path는 요청 경로를, traceId는 로그 추적용 ID를 의미합니다. 이러한 필드를 추가하면 아래와 같은 응답이 나오게 됩니다.

\`\`\`json
{
  "code": "V001",
  "message": "유효성 검사 오류",
  "timestamp": "2024-04-28T11:43:00.123+09:00",
  "path": "/api/loans/apply",
  "traceId": "e6fcb0c2-4a3a-4e7a-8d69-2c8e1b9e1a7c"
}
\`\`\`

위와 같은 응답 필드에서, traceId는 ELK(Elasticsearch, Logstash, Kibana)와 같은 로그 분석 시스템과 연동하여 문제 발생 시 빠르게 로그를 추적하고, 장애 원인을 신속히 파악하는 데 큰 도움이 됩니다. Spring Cloud Sleuth, Zipkin 등과 연동하면 traceId를 자동으로 부여하고, 에러 응답에도 포함시킬 수 있습니다.
<br/><br/>
<hr />

# 5. 적용 후기
이전 프로젝트에서는 일관된 에러 구조 없이 개발하여 프론트엔드와 소통하는데도 원활하지 못했고 에러 원인 파악에도 많은 시간이 걸렸었습니다. 하지만 이번 FLEXRATE 프로젝트에서는 에러 코드 기반의 일관된 구조 덕분에 프론트엔드에서 코드로 분기 처리를 하거나 사용자 메시지를 전달하는데 큰 도움이 되었습니다. 또한, 에러 발생 시 로그에서 코드로 빠른 검색이 가능했고, 운영 중 장애 대응 속도도 확연하게 단축되었습니다.
<br/><br/>
<hr />

# 마치며
개발자라면 누구나 “일관된 에러 응답”의 중요성을 한번쯤 느껴보았을 것입니다. API에서 예외 처리는 후순위로 밀리기 쉬운 영역이지만, 서비스의 신뢰도와 생산성을 좌우하는 핵심 요소라고 생각합니다.
<br/><br/>
이 글이 에러 응답 구조에 대한 고민을 하고 계신 분들께 조금이나마 도움이 되었으면 합니다.

감사합니다.


<br><br>

`
    },
    // {
    //     id: '2',
    //     title: 'Next.js 13의 App Router 완벽 가이드',
    //     description: 'Next.js 13에서 도입된 App Router의 핵심 개념과 장점, 사용법을 자세히 살펴봅니다.',
    //     category: 'development',
    //     tags: ['Next.js', 'React', 'App Router', 'SSR'],
    //     date: '2023-12-10',
    //     readingTime: '12분',
    //     slug: 'nextjs-13-app-router-guide'
    // },
    // {
    //     id: '3',
    //     title: 'TypeScript 제네릭 마스터하기',
    //     description: 'TypeScript의 강력한 기능인 제네릭을 실제 사용 사례와 함께 깊이 있게 알아봅니다.',
    //     category: 'development',
    //     tags: ['TypeScript', '제네릭', '타입 시스템'],
    //     date: '2024-01-20',
    //     readingTime: '10분',
    //     slug: 'mastering-typescript-generics'
    // },
    // {
    //     id: '4',
    //     title: '운영체제의 프로세스와 스레드 이해하기',
    //     description: '프로세스와 스레드의 차이점, 특징, 그리고 멀티프로세싱과 멀티스레딩의 장단점을 비교합니다.',
    //     category: 'cs',
    //     tags: ['운영체제', '프로세스', '스레드', '동시성'],
    //     date: '2023-10-05',
    //     readingTime: '15분',
    //     slug: 'understanding-os-process-and-thread'
    // },
    // {
    //     id: '5',
    //     title: '네트워크 OSI 7계층 완벽 정리',
    //     description: '네트워크 통신의 기본 모델인 OSI 7계층을 각 계층별 역할과 프로토콜 중심으로 정리합니다.',
    //     category: 'cs',
    //     tags: ['네트워크', 'OSI 모델', '프로토콜'],
    //     date: '2023-09-18',
    //     readingTime: '14분',
    //     slug: 'network-osi-7-layer-explained'
    // },
    // {
    //     id: '6',
    //     title: '데이터베이스 인덱싱과 쿼리 최적화',
    //     description: '데이터베이스 성능을 크게 좌우하는 인덱스의 원리와 쿼리 최적화 기법을 알아봅니다.',
    //     category: 'cs',
    //     tags: ['데이터베이스', 'SQL', '인덱스', '성능 최적화'],
    //     date: '2024-02-08',
    //     thumbnail: '/posts/database-indexing.png',
    //     readingTime: '11분',
    //     slug: 'database-indexing-and-query-optimization'
    // },
    // {
    //     id: '7',
    //     title: 'DP 알고리즘: 피보나치 수열부터 최적화 문제까지',
    //     description: '동적 계획법(DP)의 기본 개념과 다양한 알고리즘 문제 해결 방법을 소개합니다.',
    //     category: 'algorithm',
    //     tags: ['DP', '알고리즘', '최적화', '피보나치'],
    //     date: '2024-01-05',
    //     readingTime: '13분',
    //     slug: 'dynamic-programming-basics'
    // },
    // {
    //     id: '8',
    //     title: '그래프 탐색: BFS와 DFS 완벽 가이드',
    //     description: '그래프 탐색의 두 가지 주요 알고리즘인 너비 우선 탐색(BFS)과 깊이 우선 탐색(DFS)를 비교 분석합니다.',
    //     category: 'algorithm',
    //     tags: ['그래프', 'BFS', 'DFS', '탐색'],
    //     date: '2024-02-20',
    //     thumbnail: '/posts/graph-search.png',
    //     readingTime: '10분',
    //     slug: 'graph-search-bfs-dfs'
    // },
    // {
    //     id: '9',
    //     title: '이진 탐색: 로그 시간 복잡도의 비밀',
    //     description: '정렬된 배열에서 효율적으로 값을 찾는 이진 탐색 알고리즘의 원리와 구현 방법을 설명합니다.',
    //     category: 'algorithm',
    //     tags: ['이진 탐색', '분할 정복', '시간 복잡도', '알고리즘'],
    //     date: '2023-12-12',
    //     readingTime: '9분',
    //     slug: 'binary-search-explained'
    // }
];