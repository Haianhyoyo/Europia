'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { websiteSettings } from '@/data/mockData';

export default function Contact({ settings }: { settings?: any }) {
    const data = settings || websiteSettings;
    return (
        <section id="lien-he" className="section-padding bg-surface">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div>
                        <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Thông tin liên hệ</h4>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-12">LUÔN SẴN SÀNG <br /> LẮNG NGHE BẠN</h2>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
                            >
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4">
                                    <MapPin size={24} />
                                </div>
                                <h4 className="font-bold text-slate-900 mb-2">Địa chỉ</h4>
                                <p className="text-xs text-slate-500 leading-relaxed font-semibold uppercase tracking-wider mb-2">Trụ sở chính</p>
                                <p className="text-[14px] text-slate-600">{data.address}</p>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
                            >
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4">
                                    <Phone size={24} />
                                </div>
                                <h4 className="font-bold text-slate-900 mb-2">Hotline</h4>
                                <p className="text-xs text-slate-500 leading-relaxed font-semibold uppercase tracking-wider mb-2">Tư vấn 24/7</p>
                                <p className="text-xl font-bold text-primary">{data.hotline}</p>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
                            >
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4">
                                    <Mail size={24} />
                                </div>
                                <h4 className="font-bold text-slate-900 mb-2">Email</h4>
                                <p className="text-xs text-slate-500 leading-relaxed font-semibold uppercase tracking-wider mb-2">Hợp tác & Liên hệ</p>
                                <p className="text-[14px] text-slate-600">{data.email}</p>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
                            >
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4">
                                    <Clock size={24} />
                                </div>
                                <h4 className="font-bold text-slate-900 mb-2">Giờ làm việc</h4>
                                <p className="text-xs text-slate-500 leading-relaxed font-semibold uppercase tracking-wider mb-2">Thứ 2 - Chủ Nhật</p>
                                <p className="text-[14px] text-slate-600">{data.working_hours}</p>
                            </motion.div>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary/5 rounded-[3rem] blur-3xl -z-10 group-hover:bg-primary/10 transition-colors"></div>
                        <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden h-[500px] relative">
                            <div className="absolute inset-0 bg-slate-100 flex items-center justify-center flex-col text-slate-400 p-8 text-center">
                                <MapPin size={48} className="mb-4 opacity-50" />
                                <h4 className="font-bold text-lg text-slate-600 mb-2">Bản đồ phòng khám</h4>
                                <p className="text-sm">Hiện tại là bản demo, bạn có thể tích hợp Google Maps API ở đây.</p>
                                <button className="mt-8 flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20">
                                    Xem trên Google Maps <ExternalLink size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
