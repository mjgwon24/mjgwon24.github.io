import React, { ReactNode } from 'react';

interface LinkCardProps {
    title: string;
    description: string;
    linkText: string;
    icon?: ReactNode | string;
    href?: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ title, description, linkText, icon, href }) => {
    return (
        <div className="flex flex-col items-center gap-3 sm:gap-6 sm:w-[190px]">
            <div className="flex flex-col items-center gap-1">
                <div className="flex flex-row items-center gap-1.5">
                    {typeof icon === 'string' ?
                        <img src={icon} alt={`${title} 아이콘`} className="w-4 h-4 sm:w-5 sm:h-5" /> :
                        icon
                    }
                    <p className="text-white weight-600 sm:text-xl">{title}</p>
                </div>
                <p className="text-white text-xs sm:text-sm text-center weight-400">{description}</p>
            </div>
            <div className="cursor-pointer flex flex-row gap-1 items-center border border-blue-400 border-solid rounded-md pl-6 pr-4 sm:pr-4.5 py-1.5
        bg-[linear-gradient(90deg,rgba(74,150,236,0.10)_4.14%,rgba(35,123,230,0.10)_97.19%)]
        hover:bg-[linear-gradient(90deg,rgba(74,150,236,0.20)_4.14%,rgba(35,123,230,0.50)_97.19%)]"
            onClick={() =>
                href && window.open(href, '_blank')}>
                <p className="text-xs sm:text-sm text-center weight-600 text-blue-400">{linkText}</p>
                <svg className="w-3 sm:w-4 h-3 sm:h-4 text-blue-400" fill="none" stroke="currentColor"
                     strokeWidth="3"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h14"></path>
                </svg>
            </div>
        </div>
    );
};

export default LinkCard;