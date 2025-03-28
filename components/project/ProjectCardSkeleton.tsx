import React from 'react';

const ProjectCardSkeleton = () => {
    return (
        <div className="flex flex-col w-60 sm:w-80 rounded-lg bg-black-10p overflow-hidden animate-pulse">
            <div className="w-full h-[140px] sm:h-[190px] bg-gray-700/30" />

            <div className="flex flex-col justify-between sm:h-[250px] sm:h-[240px] p-4">
                <div className="flex flex-col sm:gap-1 gap-0 pb-4 sm:pb-0">
                    <div className="flex flex-col-reverse sm:flex-row justify-start items-start sm:justify-between sm:items-center gap-1 sm:gap-0">
                        <div className="h-5 bg-gray-700/30 rounded w-2/3 mb-2" />
                        <div className="h-4 bg-gray-700/30 rounded w-16" />
                    </div>
                    <div className="h-4 bg-gray-700/30 rounded w-1/2 mb-2" />
                    <div className="h-4 bg-gray-700/30 rounded w-full mb-1" />
                    <div className="h-4 bg-gray-700/30 rounded w-5/6" />
                </div>

                <div className="flex flex-col sm:gap-1.5 gap-1 flex-wrap mt-2">
                    <div className="flex flex-row gap-2">
                        <div className="h-5 bg-gray-700/30 rounded w-14" />
                        <div className="h-5 bg-gray-700/30 rounded w-14" />
                    </div>

                    <div className="flex flex-row gap-2 mt-2">
                        <div className="h-5 bg-gray-700/30 rounded w-12" />
                        <div className="h-5 bg-gray-700/30 rounded w-12" />
                        <div className="h-5 bg-gray-700/30 rounded w-12" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCardSkeleton;