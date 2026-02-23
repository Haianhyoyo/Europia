'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Calendar, ArrowRight } from 'lucide-react';
import { websiteSettings } from '@/data/mockData';

export default function Hero({ settings }: { settings?: any }) {
    const data = settings || websiteSettings;
    return (
        <section id="trang-chu" className="relative h-screen flex items-center overflow-hidden bg-slate-900">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000")',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 z-10 grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-xl"
                >
                    <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
                        <ShieldCheck size={18} />
                        <span className="text-sm font-bold uppercase tracking-wider">Hệ Thống Y Khoa Quốc Tế</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Nâng Tầm Nhan Sắc <br />
                        <span className="text-primary-light">Vẻ Đẹp Đích Thực</span>
                    </h1>

                    <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                        Hội tụ tinh hoa y học Châu Âu và công nghệ làm đẹp tiên tiến nhất thế giới,
                        mang lại cho bạn sự tự tin và diện mạo hoàn hảo nhất.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a
                            href="#tu-van"
                            className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 shadow-xl shadow-primary/30 hover:scale-105"
                        >
                            <Calendar size={20} />
                            Đăng ký tư vấn ngay
                        </a>
                        <a
                            href="#dich-vu"
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 group"
                        >
                            Xem dịch vụ
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    <div className="mt-12 flex items-center gap-6">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="avatar" />
                                </div>
                            ))}
                        </div>
                        <div className="text-slate-400 text-sm">
                            <span className="text-white font-bold block text-base">5000+</span>
                            Khách hàng tin tưởng
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="hidden lg:block relative"
                >
                    <div className="relative z-10 glass-dark p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">
                        <div className="bg-primary/20 p-4 rounded-2xl mb-6">
                            <span className="text-primary font-bold text-sm block mb-1">Hotline tư vấn 24/7</span>
                            <h3 className="text-3xl font-bold text-white tracking-widest">{websiteSettings.hotline}</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-slate-300">
                                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500">
                                    <ShieldCheck size={18} />
                                </div>
                                <span>Bác sĩ đầu ngành trực tiếp khám</span>
                            </div>
                            <div className="flex items-center gap-4 text-slate-300">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500">
                                    <ShieldCheck size={18} />
                                </div>
                                <span>Quy trình chuyên nghiệp, bảo mật</span>
                            </div>
                            <div className="flex items-center gap-4 text-slate-300">
                                <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                                    <ShieldCheck size={18} />
                                </div>
                                <span>Trang thiết bị hiện đại bậc nhất</span>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/30 rounded-full blur-[100px] -z-10"></div>
                    <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-accent/20 rounded-full blur-[100px] -z-10"></div>
                </motion.div>
            </div>
        </section>
    );
}
