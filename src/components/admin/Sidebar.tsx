'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    MessageSquare,
    ClipboardList,
    Newspaper,
    Settings,
    LogOut,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
    { name: 'Tổng quan', icon: LayoutDashboard, href: '/admin/dashboard' },
    { name: 'Yêu cầu tư vấn', icon: MessageSquare, href: '/admin/consultations' },
    { name: 'Dịch vụ', icon: ClipboardList, href: '/admin/services' },
    { name: 'Tin tức', icon: Newspaper, href: '/admin/news' },
    { name: 'Cài đặt', icon: Settings, href: '/admin/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem('admin_auth');
        window.location.href = '/admin';
    };

    return (
        <div className="w-72 h-screen sticky top-0 bg-slate-900 border-r border-white/5 flex flex-col p-6 overflow-hidden">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-12 px-2">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary/20">
                    E
                </div>
                <div>
                    <h3 className="text-white font-bold tracking-tight">Europia Admin</h3>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">Control Center</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group flex items-center justify-between p-4 rounded-2xl transition-all duration-300",
                                isActive
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={20} className={cn(isActive ? "text-white" : "text-slate-500 group-hover:text-primary transition-colors")} />
                                <span className="font-bold text-sm">{item.name}</span>
                            </div>
                            {isActive && <ChevronRight size={16} />}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Logout */}
            <div className="pt-6 border-t border-white/5">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-4 rounded-2xl text-slate-500 hover:bg-red-500/10 hover:text-red-500 transition-all font-bold text-sm"
                >
                    <LogOut size={20} />
                    <span>Đăng xuất</span>
                </button>
            </div>
        </div>
    );
}
