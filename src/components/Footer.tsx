import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, Facebook, Youtube, Share2 } from 'lucide-react';
import { websiteSettings } from '@/data/mockData';

export default function Footer({ settings }: { settings?: any }) {
    const data = settings || websiteSettings;
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                {/* Brand */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                            E
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg leading-tight">{data.brandName || "Europia Clinic"}</h3>
                            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">International Standards</p>
                        </div>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-400">
                        Europia tự hào là hệ thống phòng khám quốc tế tiên phong tại Việt Nam, mang đến các giải pháp y khoa và làm đẹp chuẩn Châu Âu.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors hover:text-white">
                            <Facebook size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors hover:text-white">
                            <Youtube size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors hover:text-white">
                            <Share2 size={18} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-bold mb-6 relative inline-block">
                        Liên Kết Nhanh
                        <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded"></span>
                    </h4>
                    <ul className="space-y-4 text-sm">
                        <li><Link href="#trang-chu" className="hover:text-primary transition-colors">Trang chủ</Link></li>
                        <li><Link href="#gioi-thieu" className="hover:text-primary transition-colors">Giới thiệu</Link></li>
                        <li><Link href="#dich-vu" className="hover:text-primary transition-colors">Dịch vụ</Link></li>
                        <li><Link href="#tin-tuc" className="hover:text-primary transition-colors">Tin tức & Sự kiện</Link></li>
                        <li><Link href="#tu-van" className="hover:text-primary transition-colors">Đăng ký tư vấn</Link></li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h4 className="text-white font-bold mb-6 relative inline-block">
                        Dịch Vụ Chính
                        <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded"></span>
                    </h4>
                    <ul className="space-y-4 text-sm">
                        <li><Link href="#" className="hover:text-primary transition-colors">Thẩm mỹ ngoại khoa</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Trị liệu da công nghệ cao</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Y học tái tạo</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Tầm soát sức khỏe</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Dinh dưỡng chuyên sâu</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-white font-bold mb-6 relative inline-block">
                        Thông Tin Liên Hệ
                        <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded"></span>
                    </h4>
                    <ul className="space-y-4 text-sm">
                        <li className="flex gap-3">
                            <MapPin size={20} className="text-primary shrink-0" />
                            <span>{data.address}</span>
                        </li>
                        <li className="flex gap-3">
                            <Phone size={20} className="text-primary shrink-0" />
                            <span className="text-lg font-bold text-primary">{data.hotline}</span>
                        </li>
                        <li className="flex gap-3">
                            <Mail size={20} className="text-primary shrink-0" />
                            <span>{data.email}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
                <p suppressHydrationWarning>© {new Date().getFullYear()} Europia International Clinic. All rights reserved.</p>
            </div>
        </footer>
    );
}
