import { postsData } from '@/constants/posts';

export async function generateStaticParams() {
    return postsData.map(post => ({ slug: post.slug }));
}