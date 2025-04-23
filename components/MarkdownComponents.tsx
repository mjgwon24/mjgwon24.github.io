import React, { ReactNode } from 'react';
import { Components } from 'react-markdown';

const components: Components = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="text-xl weight-700 my-2" {...props} />,
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-lg weight-600 my-2" {...props} />,
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="weight-600 my-2" {...props} />,
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc ml-5 my-2" {...props} />,
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal ml-5 my-2" {...props} />,
    hr: (props: React.HTMLAttributes<HTMLHRElement>) => <hr className="border-gray-700 my-4" {...props} />,
    strong: (props: React.HTMLAttributes<HTMLElement>) => <strong className="weight-500 text-blue-400" {...props} />,
    em: (props: React.HTMLAttributes<HTMLElement>) => <em className="italic" {...props} />,
    code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement> & { className?: string; children?: ReactNode }) =>
        (<code className={`bg-gray-800 text-blue-300 px-1 py-0.5 rounded text-sm ${className || ''}`} {...props}>
            {children}
        </code>)
};

export default components;