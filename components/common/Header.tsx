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
                    <div className="bg-black/90 border border-zinc-800 rounded-lg shadow-xl p-8 w-[350px] flex flex-col items-center relative animate-fadein">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-16 mb-3" viewBox="0 0 24 24" fill="#4A96EC" stroke="#4A96EC">
                            <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/>
                        </svg>

                        <div className="text-xl font-bold text-white mb-2 mt-2 text-center">
                            CONTACT
                        </div>

                        <div className="text-[15px] text-zinc-400 text-center mb-8 leading-relaxed">
                            언제든지 문의해 주세요
                        </div>

                        <div className="flex flex-col gap-4 w-full">
                            <button
                                className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium rounded-lg py-3.5 w-full transition-all duration-300 text-sm shadow-lg hover:shadow-blue-500/30 flex items-center justify-center"
                                onClick={() => window.open('https://open.kakao.com/o/sxbzZ4Bh', '_blank')}
                            >
                                <svg width="18" height="18" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                                    <path fill="currentColor" d="M128 36C70.562 36 24 72.713 24 118c0 29.279 19.466 54.97 48.748 69.477-1.593 5.494-5.438 19.555-6.244 22.575-.996 3.783 1.47 3.71 3.088 2.701c1.225-.763 19.248-12.44 27.116-17.471a135.305 135.305 0 0 0 31.292 3.718c57.438 0 104-36.712 104-81.999C232 72.713 185.438 36 128 36z"/>
                                </svg>
                                카카오톡 문의
                            </button>
                            <button
                                className="bg-transparent hover:bg-blue-200/10 text-blue-300 border border-blue-400 hover:border-blue-500 rounded-lg py-3.5 w-full text-sm font-medium transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
                                onClick={() => copyToClipboard('mjgwon24@gmail.com', '이메일이')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                이메일 문의
                            </button>
                        </div>

                        <button
                            onClick={toggleModal}
                            className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded-full hover:bg-zinc-800/50"
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