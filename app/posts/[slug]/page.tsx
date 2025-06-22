import { postsData } from '@/constants/posts';
import PostDetail from './PostDetail';

export async function generateStaticParams() {
    return postsData.map(post => ({ slug: post.slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
    return <PostDetail slug={params.slug} />;
}