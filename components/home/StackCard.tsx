import React from 'react';

interface StackCardProps {
    title: string;
    items: string[];
}

const StackCard: React.FC<StackCardProps> = ({ title, items }) => {
    return (
        <div className="flex flex-col gap-4 w-60 sm:w-72 rounded-lg pt-3 pb-5 px-4 bg-black-10p">
            <span className="weight-600 text-blue-500 sm:text-lg">{title}</span>
            <div className="flex flex-row gap-2 flex-wrap text-sm weight-400 sm:weight-500">
                {items.map((item, index) => (
                    <div key={index} className="flex flex-col gap-2 rounded-md px-3 py-1.5 bg-black-10p">
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StackCard;