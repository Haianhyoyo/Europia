'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { services } from '@/data/mockData';

export default function Services({ services: initialServices }: { services?: any[] }) {
    const data = initialServices || services;
    return (
        <section id="dich-vu" className="section-padding bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Dịch vụ chuyên khoa</h4>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
                            GIẢI PHÁP CHĂM SÓC <br /> SỨC KHỎE TỐI ƯU
                        </h2>
                    </div>
                    <p className="text-slate-500 md:max-w-xs text-sm leading-relaxed">
                        Chúng tôi cung cấp đa dạng các dịch vụ thăm khám và xét nghiệm với quy trình chuẩn y khoa quốc tế.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative h-[450px] overflow-hidden rounded-3xl cursor-pointer shadow-lg"
                        >
                            {/* Image Background */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${service.image})` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                            </div>

                            {/* Content Panel */}
                            <div className="absolute inset-x-0 bottom-0 p-8 translate-y-24 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                                <p className="text-slate-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    {service.description}
                                </p>
                                <ul className="space-y-2 mb-6">
                                    {service.features.map((f: string) => (
                                        <li key={f} className="flex items-center gap-2 text-white italic text-xs">
                                            <CheckCircle2 size={14} className="text-primary-light" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full bg-white text-primary font-bold py-3 rounded-xl hover:bg-primary hover:text-white transition-colors duration-300">
                                    Xem chi tiết
                                </button>
                            </div>

                            {/* Bottom Title Bar (Visible initially) */}
                            <div className="absolute inset-x-0 bottom-0 p-8 flex items-center justify-between group-hover:opacity-0 transition-opacity">
                                <h3 className="text-xl font-bold text-white">{service.title}</h3>
                                <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white">
                                    +
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
