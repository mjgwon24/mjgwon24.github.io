export interface Post {
    id: string;
    title: string;
    description: string;
    category: 'backend' | 'cs' | 'algorithm';
    tags: string[];
    date: string;
    thumbnail?: string;
    readingTime: string;
    slug: string;
    projects?: string[];
    content: string;
}

export const postsData: Post[] = [
    {
        id: '1',
        title: 'Global Exception으로 일관된 예외 응답 처리',
        description: '커스텀 예외와 글로벌 핸들러를 통해 일관된 에러 응답 구조를 구현하는 방법에 대해 다룹니다.',
        category: 'backend',
        tags: ['Global Exception', '예외 처리', 'Spring Boot'],
        date: '2025-04-26',
        thumbnail: '/posting/global-exception-handling/flow.png',
        readingTime: '4분',
        slug: 'global-exception-handling',
        projects: ['flexrate', 'softcat'],
        content: `
API를 개발할때 응답의 일관성은 서비스에 대한 신뢰도, 유지보수성 그리고 클라이언트 개발자들의 생산성까지 영향을 미치는 중요한 요소입니다. 만약 API마다 에러 응답 구조가 매번 달라진다면, 프론트엔드와의 협업 과정에서 혼란이 발생하고 운영 중 오류 추적과 대응 역시 어렵게 됩니다. 이는 단순히 보기 불편한 수준을 넘어 개발 시간의 증가와 확장성 저하를 가져올 수 있으며, 결국 서비스 품질 악화로 이어질 수 있습니다.<br><br>
이러한 상황을 방지하고자, 저는 프로젝트 초기 설계 단계부터 체계적인 예외 처리 구조를 도입하기로 결정했습니다. 이번 글에서는 왜 일관된 예외 응답이 필요한지, 그리고 프로젝트에 \`GlobalExceptionHandler\`와 커스텀 예외 구조를 어떻게 적용했는지 그 경험을 공유해보고자 합니다.
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

<img src="/posting/global-exception-handling/flow.png" alt="Global Exception Handling Flow" class="w-full rounded-md">

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

<img src="/posting/global-exception-handling/exampleCode.png" alt="Custom Exception Usage" class="w-full rounded-md">

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

<img src="/posting/global-exception-handling/codeResponse.png" alt="Custom Exception Usage" class="w-full rounded-md">
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
이전 프로젝트에서는 일관된 에러 구조 없이 개발하여 프론트엔드와 소통하는데도 원활하지 못했고 에러 원인 파악에도 많은 시간이 걸렸었습니다. 하지만 일관된 에러 응답을 정의한 프로젝트에서는 에러 코드 기반의 일관된 구조 덕분에 프론트엔드에서 코드로 분기 처리를 하거나 사용자 메시지를 전달하는데 큰 도움이 되었습니다. 또한, 에러 발생 시 로그에서 코드로 빠른 검색이 가능했고, 운영 중 장애 대응 속도도 확연하게 단축되었습니다.
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
    {
        id: '2',
        title: '정교한 이슈 트래킹을 위한 ELK 도입',
        description: '운영 환경에서의 실시간 로그 분석과 이슈 트래킹을 위한 ELK 스택의 도입과 활용 방법에 대해 다룹니다.',
        category: 'backend',
        tags: ['ELK', '로그 분석', '장애 추적'],
        date: '2025-05-01',
        thumbnail: '/posting/elk-implementation/kibana.png',
        readingTime: '6분',
        slug: 'elk-implementation-implementation',
        projects: ['flexrate', 'softcat'],
        content: `
서비스를 운영함에 있어서 장애나 이슈의 원인을 빠르고 정확하게 파악하는 것은 언제나 중요합니다.<br/>
단순히 로그 파일을 서버에서 열어보는 방식으로는 분산된 여러 서비스의 상태를 종합적으로 파악하기 어렵고, 문제 발생 시 실시간으로 대응하는 것도 제한적입니다.<br/>
그래서 최근 많은 IT 서비스에서는 로그의 중앙 집중화와 실시간 모니터링을 위해 \`ELK\`(Elasticsearch, Logstash, Kibana) 스택을 채택하고 있습니다.<br><br>

저 또한 \`ELK\`를 채택하였고, 이번 글에서는 \`ELK\`를 도입한 이유, \`Docker\` 기반 환경에서의 환경 구축 방법, 그리고 각 구성요소별 설정 방법을 자세히 다뤄보려고 합니다.<br/><br/>
<hr />

# 1. ELK를 도입하게 된 이유
<br>

\`ELK\`를 도입한 프로젝트는 \`Spring Boot\` 기반의 백엔드와 여러 인프라가 컨테이너 환경에서 돌아가는 구조입니다.<br/>

이런 구조에서 발생하는 다양한 로그를 한 곳에 모으고, 실시간으로 모니터링하며, 장애 발생 시 신속하게 원인을 분석할 필요가 있었습니다.<br/><br/>

특히, 에러, 경고 등 중요한 이벤트를 실시간으로 감지하여 빠르게 대응하고자 했으며, 로그 검색, 집계, 시각화를 통해 운영 효율성과 데이터 기반 인사이트를 얻고자 하여 \`ELK\` 도입을 결정하게 되었습니다.
<br/><br/>
<hr />

# 2. ELK란 무엇이고, 어떻게 동작하는걸까?
먼저, \`ELK\`에 대한 간단한 설명과 작동 원리에 대해 알아보고 가도록 하겠습니다.<br/><br/>
\`ELK\`란, \`Elasticsearch\`, \`Logstash\`, \`Kibana\` 세 가지 오픈소스 솔루션의 약자입니다.<br/>
\`Elasticsearch\`는 검색과 분석 엔진을 담당하고, \`Logstash\`는 로그 수집, 가공, 전송의 역할을 담당하며, \`Kibana\`는 시각화와 대시보드를 담당하고 있습니다.<br/><br/>

<img src="/posting/elk-implementation/elk-flow.png" alt="ELK Stack Flow" class="w-full rounded-md">
<br/>

먼저, \`Spring Boot\`에서 발생한 로그를 \`Filebeat\`를 통해 \`Logstash\`가 수집하고, 필요에 따라 가공한 뒤, \`Elasticsearch\`에 저장합니다.<br/>
\`Kibana\`는 \`Elasticsearch\`에 저장된 로그를 웹 UI로 시각화하고, 실시간 검색/대시보드를 제공합니다.<br/>
이러한 \`ELK\`의 구조 덕분에 웹에서 모든 로그를 한눈에 확인하여, 필요한 정보를 빠르게 찾을 수 있습니다.
<br/><br/>
<hr />

# 3. Docker 기반 환경 구축
\`ELK\` 스택을 효율적으로 관리하기 위해 개발과 운영 환경 간의 설정, 환경 일관성을 보장하고, 배포를 더 원활하게 해주기 위해서 \`Docker\`를 활용한 컨테이너 기반 환경을 구축하였습니다.<br/><br/>
여기서 로그 파일을 효율적으로 수집하기 위해 \`Filebeat\`를 함께 사용해주었습니다.<br/>
\`Filebeat\`는 경량화된 로그 수집기로, 로그 파일을 모니터링하고 변경 사항을 감지하여 \`Logstash\`나 \`Elasticsearch\`로 전송하는 역할을 담당합니다.<br/> 이는 특히 컨테이너 환경에서 로그 파일이 여러 곳에 분산되어 있을 때 유용합니다.<br/><br/>
이제 \`ELK\`를 사용하기 위한 환경 구축 과정을 본격적으로 살펴보겠습니다.

<br/><br/>

## 3.1 Elasticsearch, filebeat, Logstash, Kibana 기본 설정
가장 첫 번째로, 컨테이너 환경에서 \`ELK\`를 구성하기 위해 루트 경로에 \`docker-compose.yml\`을 작성해줍니다.<br/><br/>

\`\`\`yaml
services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: backend
    ports:
      - "8080:8080"
\tdepends_on:
      - mysql
      - redis
    environment:
      SPRING_PROFILES_ACTIVE: prod
      MYSQL_URL: \${MYSQL_URL_PROD}
      MYSQL_USERNAME: \${MYSQL_USERNAME_PROD}
      MYSQL_PASSWORD: \${MYSQL_PASSWORD_PROD}
      REDIS_HOST: \${REDIS_HOST_PROD}
      REDIS_PORT: \${REDIS_PORT_PROD}
      ELASTICSEARCH_HOST: \${ELASTICSEARCH_HOST}
      ELASTICSEARCH_PORT: \${ELASTICSEARCH_PORT}
      LOG_PATH: \${LOG_PATH}
      LOGSTASH_HOST_PROD: \${LOGSTASH_HOST_PROD}
      LOGSTASH_PORT_PROD: \${LOGSTASH_PORT_PROD}
    restart: always
    volumes:
      - backend-logs:/logs
    env_file:
      - ./.env
  logstash:
    image: docker.elastic.co/logstash/logstash:8.13.2
    container_name: logstash
    ports:
      - "5001:5000"
    volumes:
      - ./logstash/pipeline/logstash.conf:/usr/share/logstash/pipeline/logstash.conf:ro
    depends_on:
      - elasticsearch
    restart: always
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.13.2
    container_name: elasticsearch
    environment:
      - discovery.type=single-node
  - ES_JAVA_OPTS=-Xms2g -Xmx2g
    ports:
      - "9200:9200"
    restart: always
  kibana:
    image: docker.elastic.co/kibana/kibana:8.13.2
    container_name: kibana
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
      - ELASTICSEARCH_SERVICEACCOUNTTOKEN=\${KIBANA_ELASTICSEARCH_SERVICEACCOUNTTOKEN}
    depends_on:
      - elasticsearch
  restart: always
  filebeat:
    image: docker.elastic.co/beats/filebeat:8.13.2
    container_name: filebeat
    user: root
    depends_on:
      - elasticsearch
      - backend
    volumes:
      - ./filebeat/filebeat.yml:/usr/share/filebeat/filebeat.yml:ro
      - backend-logs:/logs:ro
  restart: always


volumes:
  backend-logs:
\`\`\`

\`filebeat\`는 로그 파일을 모니터링하고 변경 사항을 감지하여 \`Logstash\`로 전송합니다.<br/> 컨테이너 환경에서 로그 파일에 접근할 수 있도록 \`backend-logs\` 볼륨을 공유하도록 설정하였습니다.<br/><br/>
\`Elasticsearch\`는 단일 노드(single-node)로 구성되어 있습니다.<br/>
저희 서비스는 소규모 운영 환경이기 때문에 관리를 간편하게 하고자 이를 사용했지만, 실제 프로덕션 환경에서는 데이터 신뢰성과 가용성을 위해 클러스터(다중 노드) 구성을 권장합니다.<br/><br/>
추가로, JVM 메모리를 2GB로 할당하여 대량의 로그 데이터 처리 시 메모리 부족으로 인한 성능 저하를 방지하도록 설정하였습니다.<br/>
\`Logstash\`는 5000번 포트를 통해 로그를 수신하며, 커스텀 파이프라인 설정 파일을 볼륨으로 마운트하여 로그 처리 로직을 정의합니다.<br/>
\`Kibana\`는 \`Elasticsearch\`와 연결하여 웹 인터페이스를 통해 로그 데이터를 시각화합니다. 보안을 위해 서비스 계정 토큰은 환경 변수로 설정해주었습니다.

<br/><br/>

## 3.2 Spring Boot 로그를 Logstash로 전송하기 위한 Logback 설정
\`Spring Boot\`에서 생성되는 로그를 \`Logstash\`로 전송하기 위해서는 \`Logback\` 설정이 우선적으로 필요합니다.<br/> 이를 위해 \`logback-spring.xml\` 파일을 구성해야 합니다.<br/> 이 파일은 애플리케이션의 로그 형식과 출력 대상을 정의합니다.<br/><br/>

먼저, \`Logstash\`로 로그를 전송하기 위해 \`logstash-logback-encoder\` 라이브러리를 프로젝트에 추가해야 합니다. <br/>이 라이브러리는 \`Logback\`에서 생성된 로그를 JSON 형식으로 변환하여 \`Logstash\`로 전송하는 기능을 제공합니다. <br/>아래와 같이 \`build.gradle\` 파일에 의존성을 추가하여 라이브러리를 사용할 수 있습니다.<br/><br/>

\`\`\`
implementation 'net.logstash.logback:logstash-logback-encoder:7.4'
\`\`\`
<br/>

이제 \`logback-spring.xml\` 파일을 다음과 같이 작성합니다.<br/>

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <include resource="org/springframework/boot/logging/logback/defaults.xml"/>

    <property name="LOG_PATH" value="\${LOG_PATH:logs}"/>

    <!-- prod profile -->
    <springProfile name="prod">
        <property name="LOGSTASH_HOST" value="\${LOGSTASH_HOST_PROD:logstash}"/>
        <property name="LOGSTASH_PORT" value="\${LOGSTASH_PORT_PROD:5000}"/>
    </springProfile>

    <!-- local profile -->
    <springProfile name="!prod">
        <property name="LOGSTASH_HOST" value="\${LOGSTASH_HOST:localhost}"/>
        <property name="LOGSTASH_PORT" value="\${LOGSTASH_PORT:5000}"/>
    </springProfile>

    <!-- Logstash로 로그 전송하는 appender(로그 메시지를 출력할 위치를 결정하는 컴포넌트) 설정 -->
    <appender name="LOGSTASH" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
        <destination>\${LOGSTASH_HOST_PROD}:\${LOGSTASH_PORT_PROD}</destination>
        <encoder class="net.logstash.logback.encoder.LoggingEventCompositeJsonEncoder">
            <providers>
                <timestamp>
                    <fieldName>@timestamp</fieldName>
                </timestamp>
                <pattern>
                    <pattern>
                        {
                            "level": "%level",
                            "logger": "%logger",
                            "thread": "%thread",
                            "message": "%replace(%message){'(?i)(password\\\\\\\\s*[:=]\\\\\\\\s*)[^,\\\\\\\\s\\\\"]+', '$1****'}",
                            "exception": "%replace(%exception){'(?i)(password\\\\\\\\s*[:=]\\\\\\\\s*)[^,\\\\\\\\s\\\\"]+', '$1****'}"
                        }
                    </pattern>
                </pattern>
            </providers>
        </encoder>
    </appender>

    <!-- JSON 파일 로그 (ELK 연동용) -->
    <appender name="JSON_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>\${LOG_PATH}/app-log.json</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>\${LOG_PATH}/app-log-%d{yyyy-MM-dd}.json</fileNamePattern>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <encoder class="net.logstash.logback.encoder.LoggingEventCompositeJsonEncoder">
            <providers>
                <timestamp>
                    <fieldName>timestamp</fieldName>
                    <pattern>yyyy-MM-dd'T'HH:mm:ss.SSSZ</pattern>
                </timestamp>
                <pattern>
                    <pattern>
                        {
                            "level": "%level",
                            "logger": "%logger",
                            "thread": "%thread",
                            "message": "%replace(%message){'(?i)(password\\\\\\\\s*[:=]\\\\\\\\s*)[^,\\\\\\\\s\\\\"]+', '$1****'}",
                            "exception": "%replace(%exception){'(?i)(password\\\\\\\\s*[:=]\\\\\\\\s*)[^,\\\\\\\\s\\\\"]+', '$1****'}"
                        }
                    </pattern>
                </pattern>
            </providers>
        </encoder>
    </appender>

    <!-- 로그 레벨 및 Appender 지정 -->
    <root level="INFO">
        <appender-ref ref="LOGSTASH"/>
        <appender-ref ref="JSON_FILE"/>
    </root>
</configuration>
\`\`\`

Profile은 개발 환경(local)과 운영 환경(prod)에 따라 다른 \`Logstash\` 호스트와 포트를 사용할 수 있도록 설정했습니다.<br/> 이를 통해 환경별로 유연하게 로그 전송 대상을 변경할 수 있습니다.<br/><br/>
\`LOGSTASH Appender\`는 TCP 소켓을 통해 \`Logstash\`로 로그를 직접 전송하는 Appender입니다.<br/> JSON 형식으로 로그를 인코딩하며, 민감한 정보(ex. 비밀번호)는 마스킹 처리하도록 설정했습니다.<br/><br/>
\`JSON_FILE Appender\`는 로그를 JSON 형식으로 파일에 저장하는 Appender입니다.<br/> 이는 \`Filebeat\`가 수집할 수 있도록 하며, 일별로 로그 파일을 롤링하고 30일간 보관하도록 설정했습니다.<br/><br/>

이러한 \`Logback\` 설정을 통해 \`Spring Boot\` 애플리케이션에서 생성되는 로그는 두 가지 방식으로 ELK 스택에 전달됩니다.<br/>

1. TCP 소켓을 통해 Logstash로 직접 전송
2. JSON 파일로 저장 후 Filebeat를 통해 수집
<br/><br/>

이러한 이중 전송 방식을 통해 로그 손실 가능성을 최소화하고, 네트워크 문제가 발생해도 로그를 안정적으로 수집할 확률을 높여줍니다.

<br/><br/>

## 3.3 filebeat, Logstash 파이프라인 설정
이제 로그 수집의 시작점인 \`Filebeat\`의 설정을 해줍니다.<br/> \`Filebeat\`는 애플리케이션의 로그 파일을 실시간으로 모니터링하고, 변경 사항이 발생하면 이를 \`Logstash\`로 전송하는 역할을 합니다.<br/><br/>

\`\`\`xml
filebeat.inputs:
  - type: filestream
    id: backend-logs
    enabled: true
    paths:
      - /logs/*.log
      - /logs/*.json
    parsers:
      - ndjson:
          keys_under_root: true
          overwrite_keys: true

output.logstash:
  hosts: ["logstash:5000"]
\`\`\`

설정 파일에서는 \`/logs\` 디렉터리 하위의 \`.log\`와 \`.json\` 확장자를 가진 모든 파일을 수집 대상으로 지정하였고, \`ndjson\` 파서를 적용해 JSON 형식의 로그를 효율적으로 처리하도록 하였습니다.<br/>

\`Filebeat\`의 output은 \`Logstash\`의 5000번 포트로 지정되어 있어, 수집된 로그 데이터가 \`Logstash\`로 전달되도록 구성되어 있습니다.<br/><br/>

\`Filebeat\` 설정이 완료되면, 다음으로  \`logstash/pipeline/logstash.conf\` 경로에 \`Logstash\` 파이프라인을 설정해줍니다.<br/> 이 경로는 \`docker-compose.yml\`의 volumes에 있는 경로입니다.<br/>
\`Logstash\`는 해당 파이프라인 설정 파일(logstash.conf)을 통해 로그를 수집하고, 필요한 경우 가공한 뒤 \`Elasticsearch\`로 전달합니다.<br/><br/>

\`\`\`xml
input {
  tcp {
    port => 5000
    codec => plain { charset => "UTF-8" }
  }
}

filter {
  json {
    source => "message"
    target => "log"
  }

  mutate {
    add_field => { "level" => "%{[log][level]}" }
    add_field => { "logger" => "%{[log][logger]}" }
    add_field => { "message" => "%{[log][message]}" }
  }
}

output {
  elasticsearch {
    hosts => ["<http://elasticsearch:9200>"]
    index => "service-log-%{+YYYY.MM.dd}"
  }
  stdout { codec => rubydebug }
}
\`\`\`

input 블록을 통해 TCP 5000 포트로 들어오는 로그를 JSON으로 파싱합니다.<br/>
별도의 가공이 필요하다면 filter 블록에서 처리해줍니다.<br/>
\`Elasticsearch\`에는 날짜별 인덱스로 저장해줍니다.<br/>

이 과정을 통해 로그 데이터 수집과, 저장 및 분석을 위한 준비가 완료됩니다.

<br/><br/>

## 3.4 Kibana 대시보드 설정
환경 구축을 마친 뒤, 정상적으로 설정이 되었는지 확인해주기 위해 \`http://localhost:9200\`로 접속하여 elastic search가 켜져있는지 확인합니다.<br/>
정상적으로 접근 가능하다면, \`http://localhost:5601\` \`kibana\`에 접속합니다.<br/><br/>

<img src="/posting/elk-implementation/kibana-ex-site1.png" alt="Kibana Example site" class="w-full rounded-md">
<br/>

먼저, Management > Stack Management > Data Views 경로로 접근해 Create data view 버튼을 눌러 \`logstash.conf\`에서 설정했던 index 패턴을 등록해줍니다.<br/> 제 경우에는 \`service-log-*\` 패턴을 등록하여 모든 날짜의 서비스 로그를 볼 수 있도록 설정했습니다.<br/><br/>

<img src="/posting/elk-implementation/kibana-ex-site2.png" alt="Kibana Example site" class="w-full rounded-md">
<br/>

정상적으로 패턴이 등록되었다면, 이제 \`Kibana\`까지 사용할 준비가 완료된 것입니다.<br/>
Analytics > Discover 메뉴로 접근하면 로그들이 실시간 수집되는 모습을 보실 수 있습니다.

<br/>
<hr />

# 4. 도커 환경 재빌드 스크립트

도커 환경에서 소스 코드나 설정 파일을 수정할 때마다 여러 명령어를 반복적으로 입력하는 비효율적인 작업을 피하기위해 재빌드 스크립트도 작성해주었습니다.<br/><br/>

\`\`\`shell
#!/bin/bash

# 에러 발생 시 즉시 종료
set -e

echo "=== 프로덕션 환경 인프라 재빌드 시작 ==="

echo "1. Gradle 빌드"
./gradlew clean build -x test

echo "2. .env 파일을 build/libs/로 복사"
cp .env build/libs/

echo "3. 도커 백엔드 이미지를 --no-cache로 재빌드"
docker-compose build --no-cache backend

echo "4. 도커 백엔드 컨테이너를 새로 실행"
docker-compose up -d backend

echo "모든 작업이 완료되었습니다."
\`\`\`

<br/>해당 스크립트를 실행하기 위해 실행 권한을 부여합니다.<br/>

\`chmod +x prod_docker_back_deploy.sh\`

<br/>그 후 아래 명령어로 스크립트를 실행할 수 있습니다.<br/>

\`./prod_docker_back_deploy.sh\`

<br/>
<hr />

# 마치며

이번 글에서는 \`ELK\`의 필요성과 핵심 구성요소, 그리고 \`Docker\` 기반 환경에서의 구축 방법을 다뤘습니다.
<br/><br/>
이 글이 ELK 도입에 대한 고민을 하고 계신 분들께 조금이나마 도움이 되길 바라며,<br/>
다음 포스팅에서는 이렇게 구축한 \`ELK\`를 어떻게 활용할 수 있는지, MDC를 통한 식별자 설정, 실시간 장애 모니터링, 대시보드 구성, 알림 등 구체적인 활용법을 다뤄보겠습니다.<br/><br/>

감사합니다.
        `
    },
    {
        id: '3',
        title: 'JMeter 부하 테스트로 성능 진단하고 최적화하기',
        description: 'JMeter를 사용해 부하 테스트를 진행하여 병목 지점을 찾고, 성능을 최적화한 과정에 대해 다룹니다.',
        category: 'backend',
        tags: ['JMeter', '부하테스트', '성능테스트', 'QA'],
        date: '2025-04-15',
        thumbnail: '/posting/jmeter-performance-testing/jmeter-flow.png',
        readingTime: '9분',
        slug: 'jmeter-performance-testing',
        projects: ['stack-snapshot'],
        content: `
로컬 환경에서 개발할 때는 모든 기능이 정상적으로 동작하는 것처럼 보여도, 실제 운영 환경에 배포하면 예상치 못한 현실적인 문제에 부딪히는 경우가 많습니다.<br/>
이런 문제를 미리 예방하려면, 실제 서비스 환경을 충분히 고려해 배포 전에 철저한 성능 테스트를 진행하고, 발견된 이슈를 신속하게 개선하는 과정이 매우 중요합니다.<br/><br/>

이번 글에서는 JMeter를 활용해 부하 테스트를 진행하며 병목 구간을 진단하고, 비동기 아키텍처와 최적화 기법을 도입해 실질적으로 어떤 성능 개선 효과를 얻었는지에 대한 과정을 자세히 다뤄보려고 합니다.<br>
<hr />

# 1. 문제 파악
<br>
스택네컷 프로젝트는 현장에서 촬영한 네컷사진을 즉시 편집하고, QR 코드로 다운로드할 수 있는 디지털 사진 서비스입니다.<br>
사용자는 사진 촬영 후 즉시 결과물을 받아볼 수 있고, 이후 뽑기 이벤트 부가 기능도 즐길 수 있습니다.<br>
이러한 서비스 특성상, 빠른 이미지 처리와 실시간 응답성이 매우 중요합니다.<br><br>

프로젝트 초기에는 시스템 구조를 단순하게 유지하기 위해 모든 이미지 처리 로직을 **동기(Synchronous) 방식**으로 설계했습니다.<br>
즉, 사용자가 사진을 업로드하면 서버는 순차적으로 이미지를 저장하고, 프레임을 합성한 뒤, 최종 결과물을 생성해 응답하는 구조였습니다.<br>
개발할 때는 이 방식이 큰 문제가 없어 보였고, 로컬 환경에서 또한 서버 자원도 충분했고, 응답 속도 역시 만족스러웠습니다.<br><br>

하지만, 스택네컷 서비스의 실제 운영 환경은 사람이 많은 대학 축제나 대규모 이벤트 현장이었기 때문에, 여러 대의 촬영 기기를 통해 많은 사용자가 동시에 사진을 업로드하고 결과물을 요청하는 상황이 빈번히 발생할 수 있었습니다.<br>
특히, 행사장에서는 짧은 시간 동안 트래픽이 집중되기 때문에, 서버가 과연 이러한 부하를 안정적으로 처리할 수 있을지 사전에 검증할 필요가 있었습니다.<br><br>

이러한 현실적인 상황을 충분히 반영하기 위해, 실제 운영 환경과 유사한 조건인 여러 대의 기기, 동시 접속자 다수를 가정해 JMeter 부하 테스트를 진행하였습니다.<br>  
동기 방식 구조에서는 모든 요청이 한 줄로 늘어서 순차적으로 처리되기 때문에, 만약 앞선 요청 중 하나라도 이미지 병합이나 파일 저장 등에서 시간이 오래 걸리면, 뒤따르는 모든 요청이 그만큼 지연될 수밖에 없습니다.<br>
동시 접속자가 늘어날수록 병목 현상은 더욱 심해지고, 서버의 최대 처리량 역시 빠르게 한계에 도달할 수 있습니다.<br><br>

이러한 동기 방식의 한계는 서버 리소스를 비효율적으로 사용하는 원인이 됩니다.<br>
CPU와 메모리는 대기 상태에 머무르는 시간이 많아지고, I/O 작업이 완료될 때까지 다음 작업이 진행되지 못하는 구조적 비효율이 발생합니다.<br>
이런 상황이 반복되면, 일시적인 트래픽 증가에도 서비스 전체가 느려지거나, 심할 경우 장애로 이어질 수 있습니다.<br><br>

따라서, 직접 서비스할 환경을 모의한 부하 테스트를 진행하여 실제 환경에서 문제가 있을지 여부를 파악하고자 JMeter 부하 테스트를 진행하게 되었습니다.

<br/>
<hr />

# 2. JMeter 부하 테스트로 구체적 문제 진단
<br/>

## 2.1 테스트 시나리오 및 환경
먼저, 실제 행사장과 유사하게 여러 대의 촬영 기기가 동시에 서버에 요청을 보내는 상황을 가정했습니다.<br>
JMeter를 통해 동시 사용자를 50명, 100명으로 설정하고, 각 사용자가 20초 동안 2회씩 사진 업로드 및 결과 조회를 반복하도록 시나리오를 구성했습니다.<br><br>

테스트 환경은 아래와 같이 설정했습니다.<br><br>

<img src="/posting/jmeter-performance-testing/jmeter-flow.png" alt="JMeter Test Flow" class="w-[300px] rounded-md">
<br>

- Window 기반 개발 서버, Java 17, Spring Boot 3.x
- 네트워크 환경: 무선 wifi
- JMeter 5.6.3 버전 사용
- 테스트 대상 API: 
  - POST /api/photos/upload (이미지 업로드)
  - POST /api/photos/frames (프레임 합성)
  - GET /api/photos/result (결과 다운로드)
  - 그 외 기본 api 4개
  
  <br>
  
## 2.2 동기 구조일 시 성능 지표 분석

테스트 결과 도출된 지표는 아래와 같습니다.<br><br>

• 최적화 전 동시 접속자 **50명** 성능 테스트 결과
<img src="/posting/jmeter-performance-testing/jmeter-before-50.png" alt="JMeter Test Result 50 Users" class="w-full rounded-md">
<br/>
• 최적화 전 동시 접속자 **100명** 성능 테스트 결과
<img src="/posting/jmeter-performance-testing/jmeter-before-100.png" alt="JMeter Test Result 100 Users" class="w-full rounded-md">
<br/>

동시 접속자 50명 기준, 전체 API의 평균 응답 시간은 20ms 내외로 비교적 안정적이었습니다.<br/>  
하지만, 동시 접속자가 100명으로 늘어나자 일부 API, 특히 이미지 병합(POST /api/photos/frames) 구간에서 평균 응답 시간이 133ms까지 증가했습니다.<br/>  
최대 응답 시간 역시 282ms로 급등했으며, 99% 응답 시간도 244ms로 증가했습니다.<br/>
이는 병목 구간이 특정 API에 집중되어 있음을 의미합니다.<br/><br/>

동시 접속자 증가에 따라, 이미지 업로드 및 병합 API의 데이터 전송량 또한 급격히 늘어났습니다.<br/>  
50명 기준 초당 15,464KB, 100명 기준 30,713KB에 달하는 데이터가 전송되었습니다.<br/>
이는 서버의 I/O 리소스가 빠르게 소진될 수 있음을 나타냅니다.<br/><br/>

가장 큰 병목은 이미지 병합(프레임 합성) API에서 발생했습니다.<br/>  
이 구간은 연산량이 많고, 파일 입출력이 집중되는 구조이기 때문에, 동기 방식에서는 앞선 요청이 완료될 때까지 후속 요청이 모두 대기 상태에 머무르게 됩니다.<br/>
결과적으로 동시 요청이 몰릴수록 응답 지연이 눈에 띄게 증가하게 됩니다.<br/><br/>

모든 테스트에서 에러율은 0.00%로 SLA(1% 이하)를 안정적으로 만족했습니다.<br/>
하지만, 이는 서버가 요청을 모두 정상 처리했음을 의미할 뿐, 실제 사용자의 체감 대기 시간은 충분히 길어질 수 있다는 점을 보여줍니다.<br/><br/>

결과적으로, 이미지 처리 로직의 복잡성과 동기적 처리 방식으로 인해 동시 접속자가 증가할 경우 서버 성능이 크게 저하된다는 사실을 확인했습니다.
<br/><br/>
<hr />

# 3. 개선 목표 및 전략 수립
<br>
JMeter 부하 테스트를 통해 동기 구조의 한계와 주요 병목 구간이 명확히 드러난 이후, 본격적으로 서비스의 성능을 근본적으로 개선하기 위한 목표와 전략을 수립하였습니다.<br><br>
성능 개선의 궁극적인 목적은 단순히 수치상 응답 시간을 줄이는 데에만 있지 않습니다.<br>
실제 현장에서 수십, 수백 명의 사용자가 동시에 사진을 촬영하고 결과물을 받아가는 상황에서도, 서비스가 안정적으로 동작하며, 사용자 모두가 쾌적한 경험을 누릴 수 있도록 하는 것이 목표였습니다.<br>
무엇보다도, 이미지 업로드 및 병합과 같은 연산량이 큰 작업에서 발생하는 병목을 해소하고, 서버 리소스를 효율적으로 활용하여 처리량을 극대화하는 것이 핵심 과제였습니다.<br><br>

이러한 분석 결과와 개선 목표를 바탕으로 서비스 최적화를 위해 다음과 같은 전략을 정하고, 코드에 반영했습니다.<br><br>

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
프레임 이미지는 항상 동일하므로 매 요청마다 디스크에서 읽어올 필요가 없습니다.<br>
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

## 3.3 DTO 자료형 개선
개선을 위해 기존 코드를 검토해본 결과, 불필요한 DTO 필드가 존재하고있었습니다.<br/>
따라서 필요한 데이터만 포함하도록 DTO 구조를 개선하여 메모리 사용량을 최소화하였습니다.

<br/>

## 3.4 임시 파일 및 개인정보 관리
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

<br/>
<hr />

# 4. 성능 개선 결과
<br>

## 4.1 이미지 처리 최적화 효과

이미지 처리 최적화 후, JMeter를 통해 다시 성능 테스트를 진행하여 개선 효과를 확인했습니다.<br><br>

• 이미지 처리 최적화 후 동시 접속자 **50명** 성능 테스트 결과

<img src="/posting/jmeter-performance-testing/jmeter-image-after-50.png" alt="After JMeter Aggregate 50" />
<br/>

• 이미지 처리 최적화 후 동시 접속자 **100명** 성능 테스트 결과

<img src="/posting/jmeter-performance-testing/jmeter-image-after-100.png" alt="After JMeter Aggregate 100" />
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

비동기 처리 도입 후, JMeter를 통해 다시 성능 테스트를 진행하여 개선 효과를 확인했습니다.<br><br>

• 비동기 처리 도입 후 동시 접속자 **50명** 성능 테스트 결과
<img src="/posting/jmeter-performance-testing/jmeter-async-after-50.png" alt="After JMeter Aggregate 50" />
<br/>
• 비동기 처리 도입 후 동시 접속자 **100명** 성능 테스트 결과
<img src="/posting/jmeter-performance-testing/jmeter-async-after-100.png" alt="After JMeter Aggregate 100" />
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
<br/><br/>

결과적으로, 비동기 처리 도입과 이미지 최적화 로직 추가로 인해, 전체 API의 평균 응답 시간이 **21ms에서 15ms로 감소**했습니다.<br>
또한, 이미지 병합 API의 최대 응답 시간은 **282ms에서 95ms로 크게 감소**했음을 확인할 수 있었습니다.<br><br>

<hr />

# 5. 비동기 도입의 트레이드오프와 한계
<br>

## 5.1 race condition - 비동기 방식 도입으로 인한 동시 디렉토리 생성 문제

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


## 5.2 비동기 처리의 트레이드오프

이미지 업로드 API (\`uploadPhotos\`)의 최적화를 진행한 결과, 동시 사용자 50명 기준으로 평균 응답 시간이 21ms에서 35ms로 증가했습니다.<br>
그러나 동시 사용자 100명 기준으로는 응답 시간이 24ms에서 27ms로 비교적 안정적인 수준을 유지했습니다.<br>
이러한 성능 변화는 최적화 로직 추가로 인한 데이터 전송량 감소 이점과의 절충으로 판단됩니다.<br>
따라서 이미지 최적화 로직의 장점을 고려할 때, 전체 시스템의 효율성을 높이는 데 긍정적인 영향을 주었다고 볼 수 있습니다.
<br /><br />

\`synchronized\` 블록은 특정 자원에 대해 하나의 스레드만 접근할 수 있도록 제한하기 때문에, 여러 스레드가 동시에 실행될 때 병목 현상을 일으킬 수 있습니다.<br> 
또한, 여러 스레드가 이 블록에 접근하려고 할 때 락 경쟁이 발생하여 대기 시간이 늘어날 수 있습니다.<br/><br>
현재 스택네컷 프로젝트에서는 작은 단위의 기능에만 \`synchronized\` 락을 적용하여 큰 병목 현상이 발생하지 않았습니다. <br>
또한 아직까지 락 경쟁이 발생할 정도로 많은 요청이 들어온 적이 없어 성능 저하도 발생하지 않았습니다.<br> 
앞으로의 확장 가능성이 있다고 판단되면, 동기화 범위를 더 세밀하게 조정하거나 락 분할(\`lock splitting\`), 비동기 큐와 같은 대체 동기화 방법을 도입하여 확장성을 확보할 예정입니다.<br><br>

<br/>
<hr />

# 마치며

이번 글에서는 JMeter를 활용한 부하 테스트를 통해 스택네컷 서비스의 성능 병목을 진단하고, 비동기 아키텍처와 최적화 기법을 도입하여 성능을 개선한 과정을 다뤘습니다.<br/><br/>

이 글이 부하 테스트와 성능 최적화에 대한 분석을 고려하는 분들께 도움이 되었으면 합니다.<br/>
감사합니다.
        `
    },
    {
        id: '4',
        title: 'JWT 인증/인가 시스템 설계 방법 - part.1',
        description: '토큰, 세션 기반 인증의 차이와 JWT를 활용한 인증/인가 시스템 설계 방법에 대해 다룹니다.',
        category: 'backend',
        tags: ['Token', 'Session', 'JWT', '인증', '인가'],
        date: '2025-06-14',
        thumbnail: '/posting/jwt-authentication-design-part1/thumb-login.png',
        readingTime: '6분',
        slug: 'jwt-authentication-design-part1',
        projects: ['flexrate', 'softcat', 'semi-erp', 'gyeongju-night', 'secubox'],
        content: `
실제 운영을 위한 서비스를 구현하다 보면, 단순히 로그인/로그아웃만 해주는 기능만으로는 보안이 부족하다는 걸 느끼게 됩니다. 저 역시 최근 웹, 모바일, API 서버와 같이 여러 클라이언트가 동시에 접근하는 프로젝트를 진행하면서, 어떻게 하면 더 안전하고, 확장성 있게 인증/인가를 처리할 수 있을지 고민하게 되었습니다. 특히 서비스가 커지면서 세션 기반 인증의 한계가 확실히 느껴졌고, 운영 환경에서는 보안과 확장성을 모두 챙길 수 있는 방법으로 토큰 기반 인증 방식을 도입하게 됐습니다.<br/><br/>
이번 포스팅에서는 인증/인가가 왜 중요한지, 세션과 토큰 방식이 어떤 차이가 있는지, 그리고 JWT의 원리를 간단하게 다뤄보려고 합니다.
<hr />

# 1. 토큰 기반 인증을 선택한 이유
<br>
웹 서비스가 성장하고 다양한 플랫폼에서 동시에 접근하는 환경이 늘어나면서, 인증/인가의 중요성이 점점 커지고 있습니다.<br>
여기서 인증은 “진짜 본인이 맞는지”를 확인하는 과정이고, 인가는 “사용자가 이 행동을 하는것을 허락”하는 절차입니다.<br>
만약 이 과정이 허술하다면, 민감한 정보가 유출되거나 권한 없는 사람이 시스템을 망가뜨릴 수 있습니다. 실제로 이런 보안 사고는 뉴스에서도 종종 등장합니다.<br><br>

특히, 여러 서비스가 연동되는 환경에서는 인증/인가 시스템이 서비스 전체의 신뢰성과 직결되기 때문에, 단순히 로그인/로그아웃만 구현하고 끝이 아니라는 것을 최근에 자주 느끼고 있습니다.<br><br>

과거의 프로젝트에서는 전통적인 세션 기반 인증 방식을 고려했었습니다. <br>
그러나 서비스가 점점 커지고, 여러 대의 서버에 트래픽을 분산(Scale-out)해야 하는 상황이 되면서 세션 방식이 가진 한계가 명확하게 드러났습니다. 그래서 이를 극복하고자 토큰 기반 인증, 그 중에서도 JWT(JSON Web Token) 방식을 선택하게 되었습니다.<br>

<br/>
<hr />

# 2. 세션 vs 토큰 기반 인증 차이
<br/>

서비스를 설계할 때, ‘세션(Session) 기반 인증’과 ‘토큰(Token) 기반 인증’ 두 인증 방식이 가장 많이 비교된다고 생각합니다. 둘 다 사용자 인증을 처리하는 게 목표지만, 내부 동작 방식과 운영 관점에서는 차이가 많습니다.<br><br>

## 2.1 세션 기반 인증의 특징과 한계
세션 기반 인증은 사용자가 로그인할 때마다 서버가 세션을 생성하고, 클라이언트에게 세션 ID를 쿠키로 전달하는 방식입니다. 이 세션 ID를 통해 사용자의 인증 상태를 서버가 직접 관리하게 됩니다.<br><br>

초기에는 구현이 간단하고, 단일 서버 환경에서는 비교적 무난하게 동작합니다. <br>
하지만 서비스가 성장하면서 서버를 여러 대로 늘리면, 아래와 같은 문제가 발생합니다.<br><br>

1. 서버 메모리 사용량 증가<br>
2. 확장성(Scale-out) 문제<br><br>

### 2.1.1 서버 메모리 사용량 증가
각 사용자의 세션 정보는 서버 메모리에 저장되기 때문에, 사용자가 많아질수록 서버 메모리의 부담이 커집니다.<br> 
특히, 로그인을 자주 하거나 장시간 유지되는 서비스일수록 이 부담은 더욱 커질 것 입니다.<br><br>

### 2.1.2 확장성(Scale-out) 문제
여러 대의 서버로 트래픽을 분산하는 환경이라고 가정해봅시다.<br> 

사용자가 서버A에서 로그인했을 경우 생성된 세션 정보는 서버B에서도 인식할 수 있어야 합니다.<br> 

이를 위해 Redis같은 별도의 세션 저장소를 도입하거나, 부가적인 인프라 구성이 필요해집니다.<br> 

이 과정에서 관리 포인트가 늘어나고, 아키텍처가 더욱 복잡해질 수 있습니다.<br> <br> 
  
## 2.2 토큰 기반 인증의 장점
위에서 언급한 한계를 극복하기 위해 토큰 기반 인증이 등장하게 되었습니다.<br> <br> 

토큰 기반 인증의 가장 큰 장점은 **Stateless 구조**라는 점입니다. 서버가 인증 상태를 직접 저장하지 않기 때문에, 서버 대수를 늘려도 세션 동기화나 별도의 저장소 관리 없이 트래픽을 자유롭게 분산시킬 수 있습니다.<br><br>  

아래와 같이 Spring Security의 세션 관리 정책을 STATELESS로 지정하면, 서버가 세션 정보를 관리하지 않게 됩니다.<br> 

\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
\t\t@Bean
\t  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
\t\t  http.sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
\t\t  // 그 외 설정들
\t  
\t\t  return http.build();
\t\t}
}
\`\`\`

<br>
또한, 토큰 기반 인증은 마이크로서비스 환경과도 잘 맞습니다. 각 서비스가 독립적으로 인증을 처리할 수 있고, 토큰에 담긴 Claims 정보를 통해 권한 검증도 효율적으로 수행할 수 있습니다.<br><br>

예를 들어, 아래의 JwtTokenProvider 클래스 코드를 보면, 토큰 생성 시 사용자 id, role, type과 같은 주요 정보를 Claims에 포함시키고, 이를 바탕으로 추후 필요시 추출하여 사용할 수 있습니다.<br>

\`\`\`java
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {
    @Value("\$\{jwt.secret - key}")
    private String secretKey;
 
    /**
     * JWT 토큰 생성
     * @param memberId 회원 ID
     * @param role 회원 역할
     * @param type JWT 타입 (ACCESS, REFRESH)
     * @return 생성된 JWT 토큰 문자열
     */
    public String generateToken(Long memberId, Role role, JwtType type) {
        Duration expiredAt = Duration.ofDays(7);
        if (type == JwtType.ACCESS) {
            expiredAt = Duration.ofHours(1);
        }

        Date now = new Date();
        SecretKey key = getSigningKey();

        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + expiredAt.toMillis()))
                .setSubject(String.valueOf(memberId))
                .claim("id", memberId)
                .claim("role", role.name())
                .claim("type", type.name())
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    } 
    
    /**
     * 회원 ID를 JWT 토큰에서 추출
     * @param token JWT 토큰 문자열
     * @return 회원 ID
     */
    public Long getMemberId(String token) {
        Claims claims = getClaims(token);
        Long memberId = claims.get("id", Long.class);
        
        if (memberId == null) {
            log.warn("JWT 토큰에 id 정보가 없습니다.");
            return null;
        }
        
        return memberId;
    }

    /**
     * JWT 토큰에서 역할(Role) 추출
     * @param token JWT 토큰 문자열
     * @return Role 객체, 토큰에 role 정보가 없거나 잘못된 경우 null 반환
     */
    public Role getRole(String token) {
        Claims claims = getClaims(token);
        String roleString = claims.get("role", String.class);

        if (roleString == null) {
            log.warn("JWT 토큰에 role 정보가 없습니다.");
            return null;
        }

        try {
            return Role.valueOf(roleString);
        } catch (IllegalArgumentException e) {
            log.warn("잘못된 role 값: {}", roleString);
            return null;
        }
    }
}
\`\`\`

<br/>
마지막으로, 모바일 앱이나 다양한 클라이언트 지원 측면에서도 토큰 기반 인증은 큰 이점을 제공합니다.<br/>

HTTP 헤더에 토큰만 추가하면 모바일, 웹, 외부 API 등 어디서든 인증 로직이 똑같이 적용되니까, 프론트엔드와 백엔드가 분리된 구조에서도 편하게 인증/인가 처리를 할 수 있습니다.<br/><br/>

즉, 아래와 같이 차이를 정리해볼 수 있겠습니다.<br/>

- 세션 기반 인증 : 단일 서버 환경에서는 문제 없지만, 서비스가 확장되고 다양한 플랫폼을 지원해야할 경우 한계 존재.
- 토큰 기반 인증 : Stateless 구조 덕분에 서버 확장과 다양한 플랫폼 지원 가능. 마이크로서비스 환경에 적합함.

<br/>
<hr />

# 3. JWT 토큰 설계와 구현
<br>
운영 환경에서 JWT 기반 인증 시스템을 설계할 때는 단순히 라이브러리를 도입하는 수준을 넘어, 실제 서비스의 보안과 확장성을 모두 고려한 아키텍처 설계가 필요합니다. 이를 위해 JWT 구조와 엑세스/리프레시 토큰 전략을 이해하는 것은 필수라고 볼 수 있습니다.<br/><br/>

## 3.1 JWT 구조

JWT(JSON Web Token)는 크게 세 부분으로 구성되어 있습니다.<br/>

- **Header**: 토큰의 타입(JWT)과 서명 알고리즘 정보
- **Payload(Claims)**: 인증에 필요한 사용자 정보와 추가 데이터
- **Signature**: 토큰의 위/변조를 방지하기 위해 서버의 비밀키로 서명된 값

<br/>
JWT는 이 세 부분을 \`.\`으로 구분하여 하나의 문자열로 인코딩합니다.<br/>
실제로는 Base64Url로 인코딩되어 전송되며, 서버와 클라이언트가 토큰의 내용을 쉽게 파싱할 수 있습니다.

<br/>
<br/>

## 3.2 Access Token vs Refresh Token

운영 환경에서는 보안과 사용자 경험을 모두 고려해야 하므로, Access Token과 Refresh Token을 분리해서 관리하는 것이 일반적입니다.<br/><br/>

**Access Token**은 실제 인증 및 인가에 사용되는 토큰으로, 유효 기간이 짧게 설정됩니다. 만약 탈취되더라도 공격자가 사용할 수 있는 시간이 제한되므로, 보안 사고의 영향을 최소화할 수 있습니다.

**Refresh Token**은 Access Token이 만료되었을 때 새로운 Access Token을 발급받기 위한 용도로 사용되며, 상대적으로 긴 유효 기간으로 관리됩니다. 이 역시 탈취 위험을 고려해 Redis와 같은 별도의 저장소에서 관리하거나, 쿠키의 보안 속성을 강화하여 저장합니다.

<br/>
저는 위 토큰들을 사용해줄때 주로 아래와 같이 만료 시간을 지정합니다.

- **Access Token**: 1시간
토큰 탈취 시 피해를 최소화해주기 위해 짧은 유효기간을 주되, 사용자 경험이 저하되지 않도록 너무 짧지 않게 지정
- **Refresh Token**: 7일
사용자가 장기간 로그인 상태를 유지할 수 있도록 충분한 기간 설정

<br/>

## 3.3 토큰 생성 및 검증 로직

보통 JWT의 서명 알고리즘으로 HMAC-SHA256(HS256)을 가장 많이 사용합니다.<br/><br/>

HS256은 간단하고 빠르며, 대칭키 방식이기때문에 관리가 편하다는 장점이 있습니다. 또한, JWS(Json Web Signature) 표준에서도 널리 지원해서 운영 환경에서 검증된 선택이 될 수 있습니다.<br/>

RSA 같은 비대칭키도 있지만, 이 경우는 규모가 크거나 특별한 보안 요구가 있을 경우 주로 사용합니다.<br/><br/>

이제 목차 2.2에서 잠깐 봤던 토큰 생성 로직을 다시 보도록 하겠습니다.<br/>

\`\`\`java
/**
* JWT 토큰 생성
* @param memberId 회원 ID
* @param role 회원 역할
* @param type JWT 타입 (ACCESS, REFRESH)
* @return 생성된 JWT 토큰 문자열
*/
public String generateToken(Long memberId, Role role, JwtType type) {
    Duration expiredAt = Duration.ofDays(7);
    if (type == JwtType.ACCESS) {
        expiredAt = Duration.ofHours(1);
    }
    
    Date now = new Date();
    SecretKey key = getSigningKey();
    
    return Jwts.builder()
            .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
            .setIssuedAt(now)
            .setExpiration(new Date(now.getTime() + expiredAt.toMillis()))
            .setSubject(String.valueOf(memberId))
            .claim("id", memberId)
            .claim("role", role.name())
            .claim("type", type.name())
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();
}
\`\`\`

<br/>
여기서 Claims을 어떻게 설계해줄지에 대한 고민이 필요합니다.<br/>

저는 아래 정보들을 넣어주었습니다.<br/>

- **id**: 회원 고유 ID (DB PK)
- **role**: 사용자의 권한(USER, ADMIN)
- **type**: 토큰 종류(ACCESS, REFRESH)

<br/>
이렇게 설계함으로써, 토큰만으로도 인증과 인가, 그리고 토큰 종류 구분까지 모두 처리할 수 있도록 해주었습니다.<br/><br/>

토큰 검증 역시 HMAC-SHA256으로 서명된 토큰을 서버에서 복호화하여 Claims를 추출하고, 만료 여부, 블랙리스트 등록 여부와 같은 유효성을 체크해주도록 구현했습니다.<br/>

\`\`\`java
/**
* JWT 토큰 유효성 검사
* @param token 검사할 JWT 토큰 문자열
* @return 토큰이 유효하면 true, 그렇지 않으면 false
*/
public boolean validToken(String token) {
    SecretKey key = getSigningKey();

    if (jwtBlacklistService.isBlacklisted(token)) {
        log.warn("블랙리스트에 등록된 JWT 토큰으로 접근 시도: {}", token);
        return false;
    }

    try {
        Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
        return true;
    } catch (ExpiredJwtException e) {
        log.warn("만료된 JWT 토큰: {}", e.getMessage());
    } // ... 기타 예외 처리 생략
    return false;
}

/**
* JWT 서명 키를 디코딩하여 SecretKey 객체로 변환
* @return SecretKey 객체
*/
private SecretKey getSigningKey() {
    byte[] keyBytes = Base64.getDecoder().decode(secretKey);
    return new SecretKeySpec(keyBytes, SignatureAlgorithm.HS256.getJcaName());
}
\`\`\`


<br/>
<hr />

# 4. 운영 환경의 보안 고려사항
인증/인가 부분인 만큼 추가적으로 고려해야하는 보안적인 측면이 더 존재합니다. 마지막 장에서는 이 부분들에 대해 다뤄보도록 하겠습니다.
<br><br>

## 4.1 JWT 블랙리스트 구현

JWT는 본질적으로 Stateless하기 때문에, 토큰이 발급된 이후에는 서버가 그 상태를 직접 추적하지 않습니다. 하지만, 사용자가 로그아웃하거나 탈퇴하는 경우, 이미 발급된 토큰이 여전히 유효하다면 심각한 보안 문제가 발생할 수 있습니다. 이를 해결하기 위해 **블랙리스트 관리**가 필요합니다.<br /><br />

로그아웃 시 해당 토큰을 즉시 무효화해주기 위해, 저는 Redis 인메모리 저장소를 활용하여 블랙리스트를 관리해주었습니다.<br />

\`\`\`java
@Service
@RequiredArgsConstructor
public class JwtBlacklistService {
    private final StringRedisTemplate redisTemplate;
    private static final String BLACKLIST_PREFIX = "jwt_blacklist:";

    /**
     * JWT 토큰을 블랙리스트에 추가
     * @param token JWT 토큰 문자열
     * @param expirationMillis 블랙리스트에 추가된 토큰의 만료 시간 (밀리초 단위)
     */
    public void blacklistToken(String token, long expirationMillis) {
        String key = BLACKLIST_PREFIX + token;
        redisTemplate.opsForValue().set(key, "blacklisted", expirationMillis, TimeUnit.MILLISECONDS);
    }

    /**
     * 블랙리스트에 등록된 토큰인지 확인
     * @param token JWT 토큰 문자열
     * @return 블랙리스트 여부
     */
    public boolean isBlacklisted(String token) {
        String key = BLACKLIST_PREFIX + token;
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }
}
\`\`\`

위와 같이 로그아웃된 토큰이나 탈퇴한 회원의 토큰을 블랙리스트에 등록하여 더 이상 사용할 수 없도록 만들어주고자 하였습니다.

<br />

## 4.2 토큰 탈취 대응 전략

토큰 기반 인증의 가장 큰 위험 중 하나는 토큰 탈취입니다. <br />
만약 공격자가 토큰을 획득하면, 별도의 추가 인증 없이 서비스에 접근할 수 있습니다. 이를 방어하기 위해서는 토큰의 저장 방식과 쿠키 설정이 매우 중요합니다.<br /><br />

**쿠키 보안 속성**을 강화하는 것이 기본이며, 아래와 같은 설정을 적용합니다.<br />

- \`HttpOnly\`: 자바스크립트에서 쿠키를 접근하지 못하도록 하여 XSS 공격 방어
- \`Secure\`: HTTPS 환경에서만 쿠키가 전송되도록 하여 네트워크 상의 도청 방어
- \`SameSite=“None”\`: 크로스사이트 요청에서도 쿠키가 전송되도록 함

<br />
이를 적용하여 아래와 같이 CookieUtil 클래스 내부에 토큰 쿠키 생성 메서드를 구현하여 사용해주었습니다.<br />

이 방식은 리프레시 토큰 쿠키를 생성할 때도 동일하게 적용할 수 있습니다.<br />

\`\`\`java
/**
* 액세스 토큰 쿠키 생성
* @param accessToken 액세스 토큰
* @param maxAgeSeconds 쿠키 최대 유효 시간 (초 단위)
* @return ResponseCookie
*/
public static ResponseCookie createAccessTokenCookie(String accessToken, int maxAgeSeconds) {
    return ResponseCookie.from("access_token", accessToken)
            .httpOnly(true)
            .secure(true)
            .sameSite("None")
            .path("/")
            .maxAge(maxAgeSeconds)
            .build();
}
\`\`\`

<br>

## 4.3 토큰 저장 위치별 보안 비교

토큰은 크게 LocalStorage, Cookie, Memory와 같은 위치에 저장할 수 있습니다. 각 방식은 장단점이 뚜렷하므로, 서비스 특성에 맞는 선택이 필요합니다.<br>

- **LocalStorage**
    - 장점: 구현이 간단하고, 프론트엔드에서 쉽게 접근 가능
    - 단점: XSS 공격에 매우 취약, 토큰 탈취 가능성 높음
- **Cookie (HttpOnly, Secure 설정)**
    - 장점: XSS로부터 안전, 서버와 브라우저가 자동으로 쿠키를 관리
    - 단점: CSRF 공격에 노출될 수 있으므로 SameSite 옵션과 추가적인 방어가 필요
- **Memory (클라이언트 런타임 메모리)**
    - 장점: 새로고침 시 토큰이 사라져 보안성이 높음
    - 단점: 사용성 측면에서 불편함(로그인 상태 유지 어려움)

<br>
일반적으로는 HttpOnly, Secure 쿠키에 토큰을 저장하여 XSS와 CSRF를 모두 방어할 수 있도록 설계합니다. 만약 모바일 앱이나 SPA 환경이라면, 메모리 저장 방식도 고려할 수 있습니다.

<br/>
<hr />

# 마치며

이번 글에서는 Spring Boot 환경에서 JWT 기반 인증/인가 시스템을 설계할 때 알고 있어야할 원리와 운영 환경의 보안 고려사항을 다뤄보았습니다.<br/><br/>

이 글이 인증/인가 시스템을 이해하고 구축하는 데 조금이나마 도움이 되길 바라며, 다음 포스팅에서는 Spring Security와 Redis를 활용한 통합 구현, 그리고 성능 최적화 부분을 더 깊이 있게 다뤄보겠습니다.<br/><br/>
감사합니다.
        `
    },
    // {
    //     id: '2',
    //     title: 'Next.js 13의 App Router 완벽 가이드',
    //     description: 'Next.js 13에서 도입된 App Router의 핵심 개념과 장점, 사용법을 자세히 살펴봅니다.',
    //     category: 'backend',
    //     tags: ['Next.js', 'React', 'App Router', 'SSR'],
    //     date: '2023-12-10',
    //     readingTime: '12분',
    //     slug: 'nextjs-13-app-router-guide'
    // },
    // {
    //     id: '3',
    //     title: 'TypeScript 제네릭 마스터하기',
    //     description: 'TypeScript의 강력한 기능인 제네릭을 실제 사용 사례와 함께 깊이 있게 알아봅니다.',
    //     category: 'backend',
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