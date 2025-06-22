'use client';

import React from 'react';
import { Share2, BookmarkPlus, Link2 } from 'lucide-react';
import useToast from "@/components/utils/Toast/useToast";
import Toast from "@/components/utils/Toast/Toast";

type Props = {
    direction?: 'row' | 'col';
    size?: number;
    gap?: string;
    className?: string;
    onShare?: () => void;
    onBookmark?: () => void;
    onCopyLink?: () => void;
};

export default function PostActionButtons({
                                              direction = 'row',
                                              size = 20,
                                              gap = 'gap-2',
                                              className = '',
                                              onShare,
                                              onBookmark,
                                              onCopyLink,
                                          }: Props) {
    const { toast, showToast } = useToast();

    const handleCopyLink = async () => {
        if (onCopyLink) return onCopyLink();
        try {
            await navigator.clipboard.writeText(window.location.href);
            showToast('링크가 클립보드에 복사되었습니다');
        } catch {
            showToast('링크 복사에 실패했습니다');
        }
    };

    return (
        <>
            <div className={`flex flex-${direction} ${gap} ${className}`}>
                {/*<button className="cursor-pointer p-2 rounded-full bg-black-05p hover:bg-black-10p"*/}
                {/*        aria-label="공유"*/}
                {/*        onClick={onShare}*/}
                {/*        type="button">*/}
                {/*    <Share2 size={size} className="text-gray-400" />*/}
                {/*</button>*/}
                {/*<button className="cursor-pointer p-2 rounded-full bg-black-05p hover:bg-black-10p transition-colors"*/}
                {/*        aria-label="북마크"*/}
                {/*        onClick={onBookmark}*/}
                {/*        type="button">*/}
                {/*    <BookmarkPlus size={size} className="text-gray-400" />*/}
                {/*</button>*/}
                <button className="cursor-pointer p-2 rounded-full bg-black-05p hover:bg-black-10p transition-colors"
                        aria-label="링크 복사"
                        onClick={handleCopyLink}
                        type="button">
                    <Link2 size={size} className="text-gray-400" />
                </button>
            </div>
            <Toast show={toast.show} message={toast.message} />
        </>
    );
}
