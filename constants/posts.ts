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
        description: '커스텀 예외와 글로벌 핸들러를 통해 일관된 에러 응답 구조를 구현하는 방법에 대해 다룹니다.',
        category: 'development',
        tags: ['Global Exception', '예외 처리', 'Spring Boot', 'FLEXRATE'],
        date: '2025-04-26',
        thumbnail: '/posting/globalException/flow.png',
        readingTime: '4분',
        slug: 'global-exception-handling',
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
        category: 'development',
        tags: ['ELK', '로그 분석', '장애 추적', 'FLEXRATE', 'SOFTCAT'],
        date: '2025-05-01',
        thumbnail: '/posting/elk/kibana.png',
        readingTime: '6분',
        slug: 'elk-implementation',
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

<img src="/posting/elk/elk-flow.png" alt="ELK Stack Flow" class="w-full rounded-md">
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

<img src="/posting/elk/kibana-ex-site1.png" alt="Kibana Example site" class="w-full rounded-md">
<br/>

먼저, Management > Stack Management > Data Views 경로로 접근해 Create data view 버튼을 눌러 \`logstash.conf\`에서 설정했던 index 패턴을 등록해줍니다.<br/> 제 경우에는 \`service-log-*\` 패턴을 등록하여 모든 날짜의 서비스 로그를 볼 수 있도록 설정했습니다.<br/><br/>

<img src="/posting/elk/kibana-ex-site2.png" alt="Kibana Example site" class="w-full rounded-md">
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