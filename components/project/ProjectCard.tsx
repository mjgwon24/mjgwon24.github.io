import Image from 'next/image';
import React from 'react';

interface ProjectCardProps {
    image: string;
    title: string;
    period: string;
    organization: string;
    description: string;
    roles: string[];
    tags: string[];
    slug?: string;
    onImageLoad?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
                                                     image, title, period, organization, description, roles, tags, slug = '', onImageLoad
                                                 }) => {
    const handleClick = () => {
        if (slug) {
            window.location.href = `/portfolio/${slug}`;
        }
    };

    return (
        <div
            className="flex flex-col w-60 sm:w-80 rounded-lg bg-black-05p cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
            onClick={handleClick}
        >
            <Image
                src={image}
                alt={title}
                width={320}
                height={190}
                className="w-full h-[140px] sm:h-[190px] object-cover object-center rounded-t-lg"
                onLoad={onImageLoad}
                loading="eager"
            />

            <div className="flex flex-col justify-between sm:h-[250px] sm:h-[240px] p-4">
                <div className="flex flex-col sm:gap-1 gap-0 pb-4 sm:pb-0">
                    <div
                        className="flex flex-col-reverse sm:flex-row justify-start items-start sm:justify-between sm:items-center gap-1 sm:gap-0">
                        <p className="text-sm sm:text-[16px] weight-600">{title}</p>
                        <div
                            className="sm:bg-gradient-to-r sm:from-blue-500/10 sm:to-blue-400/5 sm:backdrop-blur-sm sm:border sm:border-blue-500/20 rounded-md sm:ml-2 sm:px-2 sm:py-0.5">
                            <p className="text-xs weight-400 text-gray-300 sm:text-blue-400">{period}</p>
                        </div>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-400 weight-400">{organization}</span>
                    <span className="text-xs sm:text-sm weight-400 sm:p-0 pt-1">{description}</span>
                </div>

                <div className="flex flex-col sm:gap-1.5 gap-1 flex-wrap">
                    <div className="flex flex-row sm:gap-1.5 gap-1 flex-wrap">
                        {tags.map((tag, index) => (
                            <div key={index} className="pb-0.5 px-2 bg-blue-500/10 rounded-sm">
                                <span className="text-xs sm:text-sm weight-400 text-blue-500">{tag}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-row sm:gap-1.5 gap-1 flex-wrap">
                        {roles.map((role, index) => (
                            <div key={index}
                                 className="pb-0.5 px-2 bg-gradient-to-r from-gray-800/30 to-gray-700/20 backdrop-blur-sm border border-gray-700/20 rounded-md">
                                <span className="text-xs sm:text-sm weight-400 text-gray-300">{role}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;