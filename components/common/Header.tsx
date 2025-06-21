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

    const copyToClipboard = (text: string, message: string) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);

        textarea.select();
        try {
            document.execCommand('copy');
            showToast(`클립보드에 ${message} 복사되었습니다`);
        } catch (err) {
            showToast(`${message} 복사에 실패했습니다`);
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
                    <div className="bg-gray-900/90 border border-gray-800 rounded-lg shadow-lg p-6 w-[330px] flex flex-col items-center relative animate-fadein">
                        <div className="bg-blue-900/20 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>

                        <div className="text-lg font-bold text-gray-100 mb-1 text-center">
                            CONTACT
                        </div>

                        <div className="text-[15px] text-gray-400 text-center mb-6 leading-relaxed">
                            언제든지 문의해 주세요
                        </div>

                        <div className="flex flex-col gap-3 w-full mt-2">
                            <button
                                className="bg-gradient-to-r from-blue-500/30 to-blue-500/80 hover:from-blue-500 hover:to-blue-800 text-white font-medium rounded-md py-3 w-full transition-all duration-300 text-sm shadow-md hover:shadow-blue-500/10"
                                onClick={() => window.open('https://open.kakao.com/o/sxbzZ4Bh', '_blank')}
                            >
                                <div className="flex items-center justify-center">
                                    <svg width="16" height="16" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                                        <path fill="currentColor" d="M128 36C70.562 36 24 72.713 24 118c0 29.279 19.466 54.97 48.748 69.477-1.593 5.494-5.438 19.555-6.244 22.575-.996 3.783 1.47 3.71 3.088 2.701c1.225-.763 19.248-12.44 27.116-17.471a135.305 135.305 0 0 0 31.292 3.718c57.438 0 104-36.712 104-81.999C232 72.713 185.438 36 128 36z"/>
                                    </svg>
                                    카카오톡 문의
                                </div>
                            </button>

                            <button
                                className="bg-transparent hover:bg-blue-900/20 text-blue-300 border border-blue-500/40 hover:border-blue-400 rounded-md py-3 w-full text-sm font-medium transition-all duration-300 backdrop-blur-sm"
                                onClick={() => copyToClipboard('mjgwon24@gmail.com', '이메일이')}
                            >
                                <div className="flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    이메일 문의
                                </div>
                            </button>
                        </div>

                        <button
                            onClick={toggleModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-300 transition-colors"
                            aria-label="Close modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
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