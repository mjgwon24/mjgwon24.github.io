import React, { ReactNode } from 'react';
import { Components } from 'react-markdown';
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism";

const components: Components = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="text-xl weight-700 my-2" {...props} />,
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-lg weight-600 my-2" {...props} />,
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="weight-600 my-2" {...props} />,
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc ml-5 my-2" {...props} />,
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal ml-5 my-2" {...props} />,
    hr: (props: React.HTMLAttributes<HTMLHRElement>) => <hr className="border-gray-700 my-4" {...props} />,
    strong: (props: React.HTMLAttributes<HTMLElement>) => <strong className="weight-500 text-blue-400" {...props} />,
    em: (props: React.HTMLAttributes<HTMLElement>) => <em className="italic" {...props} />,
    code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement> & { className?: string; children?: ReactNode }) => {
        const isCodeBlock = className?.startsWith('language-');
        // 언어 추출 (예: language-java -> java)
        const match = /language-(\w+)/.exec(className || '');
        const language = match ? match[1] : '';

        if (isCodeBlock && language) {
            return (
                <SyntaxHighlighter
                    style={dracula}
                    language={language}
                    PreTag="div"
                    customStyle={{
                        margin: '1em 0',
                        borderRadius: '8px',
                        fontSize: '0.8em',
                        lineHeight: '1.7',
                        boxShadow: '0 1px 5px rgba(0,0,0,0.05)'
                    }}
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            );
        }
        // 인라인 코드 처리
        return (
            <code
                className="bg-gray-800 text-blue-300 px-1 py-0.5 rounded text-sm"
                {...props}
            >
                {children}
            </code>
        );
    }
};

export default components;