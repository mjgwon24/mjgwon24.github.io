import React from 'react';
import Link from "next/link";

interface SectionTitleProps {
    emoji: string;
    title: string;
    subtitle?: string;
    showMoreLink?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
                                                       emoji, title, subtitle, showMoreLink
                                                   }) => {
    return (
        <div className="flex flex-col gap-2 sm:gap-3 items-center mb-6">
            <h2 className="text-white text-2xl sm:text-3xl weight-700 pr-1 select-none">
                {emoji} {title}
            </h2>
            {subtitle && (
                <p className="text-white sm:text-xl weight-500 pl-3 select-none">{subtitle}</p>
            )}
            {showMoreLink && (
                <Link
                    href={showMoreLink}
                    className="text-white text-[14px] sm:text-[16px] py-1.5 px-8 rounded-lg weight-600 text-center mt-2
          bg-gradient-to-r from-[#4A96EC] to-[#237BE6] bg-white hover:from-[#237BE6] hover:to-[#1A5CAB]"
                >
                    전체보기
                </Link>
            )}
        </div>
    );
};

export default SectionTitle;