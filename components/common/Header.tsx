'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '' });
    const pathname = usePathname();

    const navLinks = [
        { href: '/about', label: '소개' },
        { href: '/portfolio', label: '포트폴리오' },
        { href: '/posts', label: '포스팅' },
        { href: '/contact', label: 'CONTACT' }
    ]

    const isActive = (path: string) => {
        return pathname === path || pathname?.startsWith(`${path}/`);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const showToast = (message: string) => {
        setToast({ show: true, message });

        setTimeout(() => {
            setToast({ show: false, message: '' });
        }, 1500);
    };

    const copyToClipboard = (text: string) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);

        textarea.select();
        try {
            document.execCommand('copy');
            showToast('클립보드에 복사되었습니다');
        } catch (err) {
            showToast('복사에 실패했습니다');
        }

        document.body.removeChild(textarea);
    };

    return (
        <header
            className="shadow-md fixed top-0 left-0 right-0 z-50"
            style={{background: "rgba(0, 0, 0, 0.70)"}}>
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl weight-600 text-white">
                            MJGWON24
                        </Link>
                    </div>

                    <nav className="hidden md:flex space-x-6 items-center">
                        {navLinks.map((link) =>
                            link.label === 'CONTACT' ? (
                                <button
                                    key={link.href}
                                    onClick={toggleModal}
                                    className="ml-2 text-white text-[14px] weight-600 py-2 px-4 rounded-lg bg-gradient-to-r from-[#4A96EC] to-[#237BE6] bg-white hover:from-[#237BE6] hover:to-[#1A5CAB]"
                                >
                                    {link.label}
                                </button>
                            ) : (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`${isActive(link.href) ? 'text-blue-600 weight-700' : 'text-gray-300'} hover:text-blue-500 transition duration-300 weight-500`}
                                >
                                    {link.label}
                                </Link>
                            )
                        )}
                    </nav>

                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-300 cursor-pointer hover:text-gray-500 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12"/>
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16"/>
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4">
                        <div className="flex flex-col space-y-3">
                            {navLinks.map((link) =>
                                link.label === 'CONTACT' ? (
                                    <button
                                        key={link.href}
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            toggleModal();
                                        }}
                                        className="text-white text-[14px] py-2 px-4 rounded-lg weight-600 text-center mt-2
                                bg-gradient-to-r from-[#4A96EC] to-[#237BE6] bg-white hover:from-[#237BE6] hover:to-[#1A5CAB]"

                                    >
                                        {link.label}
                                    </button>
                                ) : (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`${isActive(link.href) ? 'text-blue-600 weight-700' : 'text-gray-300'} hover:text-blue-500 transition duration-300 weight-500`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="bg-gradient-to-br bg-black border border-gray-800 text-white rounded-md p-8 w-[350px] transform transition-all duration-300 scale-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl weight-700 text-white">CONTACT</h2>

                            <button
                                onClick={toggleModal}
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="Close modal"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-5">
                            <div
                                className="bg-gray-800/50 rounded-lg p-4 flex items-center gap-4 transition-colors hover:bg-gray-700/50 cursor-pointer"
                                onClick={() => copyToClipboard('010-5513-2303')}
                            >
                    <div className="bg-gray-700 rounded-full p-2 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
                                    </svg>
                                </div>
                                <span className="weight-500 text-gray-200">010-5513-2303</span>
                            </div>
                            <div
                                className="bg-gray-800/50 rounded-lg p-4 flex items-center gap-4 transition-colors hover:bg-gray-700/50 cursor-pointer"
                                onClick={() => copyToClipboard('alswlchlrh8@naver.com')}
                            >
                    <div className="bg-gray-700 rounded-full p-2 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="weight-500 text-gray-200">alswlchlrh8@naver.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {toast.show && (
                <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in border border-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium text-gray-100">{toast.message}</span>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;