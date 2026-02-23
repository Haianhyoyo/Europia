'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { websiteSettings } from '@/data/mockData';

const navLinks = [
    { name: 'Trang chủ', href: '#trang-chu' },
    { name: 'Giới thiệu', href: '#gioi-thieu' },
    { name: 'Dịch vụ', href: '#dich-vu' },
    { name: 'Tin tức', href: '#tin-tuc' },
    { name: 'Liên hệ', href: '#lien-he' },
];

export default function Navbar({ settings }: { settings?: any }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const data = settings || websiteSettings;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3',
                isScrolled ? 'glass shadow-md py-2' : 'bg-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary/20 transform rotate-3 overflow-hidden">
                        {data.logo ? (
                            <img src={data.logo} alt="Logo" className="w-full h-full object-contain" />
                        ) : (
                            <span>{data.brandName?.[0] || 'E'}</span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className={cn("font-bold text-xl tracking-tight leading-tight", isScrolled ? "text-primary" : "text-white")}>
                            {data.brandName || "Europia"}
                        </span>
                        <span className={cn("text-[10px] uppercase tracking-[0.2em] font-medium", isScrolled ? "text-gray-500" : "text-white/80")}>
                            International Clinic
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                'text-sm font-medium transition-colors hover:text-primary',
                                isScrolled ? 'text-gray-600' : 'text-white/90'
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="hidden lg:flex items-center gap-4">
                    <a
                        href={`tel:${data.hotline}`}
                        className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full transition-all hover:scale-105 shadow-md shadow-primary/20"
                    >
                        <Phone size={16} />
                        <span className="font-bold text-sm">{data.hotline}</span>
                    </a>
                    <button className={cn(
                        "p-2 rounded-full border transition-colors",
                        isScrolled ? "border-gray-200 text-gray-600 hover:bg-gray-50" : "border-white/20 text-white hover:bg-white/10"
                    )}>
                        <User size={20} />
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={cn("lg:hidden p-2", isScrolled ? "text-primary" : "text-white")}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 glass shadow-2xl animate-in slide-in-from-top duration-300">
                    <div className="flex flex-col gap-4 p-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <hr className="border-gray-200" />
                        <a
                            href={`tel:${data.hotline}`}
                            className="flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-bold"
                        >
                            <Phone size={20} />
                            {data.hotline}
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
