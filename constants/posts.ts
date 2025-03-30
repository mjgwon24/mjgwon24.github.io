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
}

export const postsData: Post[] = [
    {
        id: '1',
        title: 'React 성능 최적화: 메모이제이션 전략',
        description: '리액트 애플리케이션에서 불필요한 리렌더링을 방지하고 성능을 향상시키는 방법에 대해 알아봅니다.',
        category: 'development',
        tags: ['React', '성능 최적화', 'useMemo', 'useCallback'],
        date: '2023-11-15',
        thumbnail: '/posts/react-optimization.png',
        readingTime: '8분',
        slug: 'react-optimization-strategies'
    },
    {
        id: '2',
        title: 'Next.js 13의 App Router 완벽 가이드',
        description: 'Next.js 13에서 도입된 App Router의 핵심 개념과 장점, 사용법을 자세히 살펴봅니다.',
        category: 'development',
        tags: ['Next.js', 'React', 'App Router', 'SSR'],
        date: '2023-12-10',
        readingTime: '12분',
        slug: 'nextjs-13-app-router-guide'
    },
    {
        id: '3',
        title: 'TypeScript 제네릭 마스터하기',
        description: 'TypeScript의 강력한 기능인 제네릭을 실제 사용 사례와 함께 깊이 있게 알아봅니다.',
        category: 'development',
        tags: ['TypeScript', '제네릭', '타입 시스템'],
        date: '2024-01-20',
        readingTime: '10분',
        slug: 'mastering-typescript-generics'
    },
    {
        id: '4',
        title: '운영체제의 프로세스와 스레드 이해하기',
        description: '프로세스와 스레드의 차이점, 특징, 그리고 멀티프로세싱과 멀티스레딩의 장단점을 비교합니다.',
        category: 'cs',
        tags: ['운영체제', '프로세스', '스레드', '동시성'],
        date: '2023-10-05',
        readingTime: '15분',
        slug: 'understanding-os-process-and-thread'
    },
    {
        id: '5',
        title: '네트워크 OSI 7계층 완벽 정리',
        description: '네트워크 통신의 기본 모델인 OSI 7계층을 각 계층별 역할과 프로토콜 중심으로 정리합니다.',
        category: 'cs',
        tags: ['네트워크', 'OSI 모델', '프로토콜'],
        date: '2023-09-18',
        readingTime: '14분',
        slug: 'network-osi-7-layer-explained'
    },
    {
        id: '6',
        title: '데이터베이스 인덱싱과 쿼리 최적화',
        description: '데이터베이스 성능을 크게 좌우하는 인덱스의 원리와 쿼리 최적화 기법을 알아봅니다.',
        category: 'cs',
        tags: ['데이터베이스', 'SQL', '인덱스', '성능 최적화'],
        date: '2024-02-08',
        thumbnail: '/posts/database-indexing.png',
        readingTime: '11분',
        slug: 'database-indexing-and-query-optimization'
    },
    {
        id: '7',
        title: 'DP 알고리즘: 피보나치 수열부터 최적화 문제까지',
        description: '동적 계획법(DP)의 기본 개념과 다양한 알고리즘 문제 해결 방법을 소개합니다.',
        category: 'algorithm',
        tags: ['DP', '알고리즘', '최적화', '피보나치'],
        date: '2024-01-05',
        readingTime: '13분',
        slug: 'dynamic-programming-basics'
    },
    {
        id: '8',
        title: '그래프 탐색: BFS와 DFS 완벽 가이드',
        description: '그래프 탐색의 두 가지 주요 알고리즘인 너비 우선 탐색(BFS)과 깊이 우선 탐색(DFS)를 비교 분석합니다.',
        category: 'algorithm',
        tags: ['그래프', 'BFS', 'DFS', '탐색'],
        date: '2024-02-20',
        thumbnail: '/posts/graph-search.png',
        readingTime: '10분',
        slug: 'graph-search-bfs-dfs'
    },
    {
        id: '9',
        title: '이진 탐색: 로그 시간 복잡도의 비밀',
        description: '정렬된 배열에서 효율적으로 값을 찾는 이진 탐색 알고리즘의 원리와 구현 방법을 설명합니다.',
        category: 'algorithm',
        tags: ['이진 탐색', '분할 정복', '시간 복잡도', '알고리즘'],
        date: '2023-12-12',
        readingTime: '9분',
        slug: 'binary-search-explained'
    }
];