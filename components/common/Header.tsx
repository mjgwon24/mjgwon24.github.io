'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path;
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="shadow-md fixed top-0 left-0 right-0 z-50"
        style={{background: "rgba(0, 0, 0, 0.70)"}}
        >
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl weight-600 text-white">
                            MJGWON24
                        </Link>
                    </div>

                    <nav className="hidden md:flex space-x-6 items-center">
                        <Link
                            href="/about"
                            className={`${isActive('/about') ? 'text-blue-600 weight-700' : 'text-gray-300'} hover:text-blue-500 transition duration-300 weight-500`}
                        >
                            소개
                        </Link>
                        <Link
                            href="/portfolio"
                            className={`${isActive('/portfolio') ? 'text-blue-600 weight-700' : 'text-gray-300'} hover:text-blue-500 transition duration-300 weight-500`}
                        >
                            포트폴리오
                        </Link>
                        <Link
                            href="/posting"
                            className={`${isActive('/posting') ? 'text-blue-600 weight-700' : 'text-gray-300'} hover:text-blue-500 transition duration-300 weight-500`}
                        >
                            포스팅
                        </Link>
                        <Link
                            href="/contact"
                            className="ml-2 text-white text-[14px] weight-600 py-2 px-4 rounded-lg"
                            style={{background: "linear-gradient(90deg, #4A96EC 4.14%, #237BE6 97.19%), #FFF"}}
                        >
                            CONTACT
                        </Link>
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
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4">
                        <div className="flex flex-col space-y-3">
                            <Link
                                href="/about"
                                className={`${isActive('/about') ? 'text-blue-600 weight-700' : 'text-gray-300'} hover:text-blue-500 transition duration-300 weight-500`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                소개
                            </Link>
                            <Link
                                href="/portfolio"
                                className={`${isActive('/portfolio') ? 'text-blue-600 weight-700' : 'text-gray-300'} hover:text-blue-500 transition duration-300 weight-500`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                포트폴리오
                            </Link>
                            <Link
                                href="/posting"
                                className={`${isActive('/posting') ? 'text-blue-600 weight-700' : 'text-gray-300'} hover:text-blue-500 transition duration-300 weight-500`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                포스팅
                            </Link>
                            <Link
                                href="/contact"
                                className="text-white text-[14px] py-2 px-4 rounded-lg weight-600 text-center mt-2"
                                style={{background: "linear-gradient(90deg, #4A96EC 4.14%, #237BE6 97.19%), #FFF"}}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                CONTACT
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;