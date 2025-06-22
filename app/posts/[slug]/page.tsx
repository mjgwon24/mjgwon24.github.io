"use client";

import PostDetail from './PostDetail';
import React from "react";

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
    const [slug, setSlug] = React.useState<string | null>(null);

    React.useEffect(() => {
        params.then((resolvedParams) => setSlug(resolvedParams.slug));
    }, [params]);

    if (!slug) {
        return <div className="h-full">Loading...</div>;
    }

    return <PostDetail slug={slug} />;
}