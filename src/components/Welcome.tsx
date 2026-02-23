'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, FileSignature, Users, HeartPulse } from 'lucide-react';

const stats = [
    {
        icon: <FileSignature className="w-8 h-8 text-primary" />,
        label: 'Chứng chỉ cấp phép',
        value: '100%',
        desc: 'Đầy đủ pháp lý từ Bộ Y Tế'
    },
    {
        icon: <Users className="w-8 h-8 text-primary" />,
        label: 'Đội ngũ bác sĩ',
        value: '15+',
        desc: 'Chuyên gia giàu kinh nghiệm'
    },
    {
        icon: <Award className="w-8 h-8 text-primary" />,
        label: 'Giải thưởng',
        value: '50+',
        desc: 'Bằng khen qua các năm'
    },
    {
        icon: <HeartPulse className="w-8 h-8 text-primary" />,
        label: 'Khách hàng hài lòng',
        value: '98%',
        desc: 'Phản hồi tích cực hàng tháng'
    }
];

export default function Welcome({ settings }: { settings?: any }) {
    const data = settings || { brandName: 'Europia' };
    return (
        <section id="gioi-thieu" className="section-padding bg-surface">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.h4
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-bold uppercase tracking-widest text-sm mb-4"
                    >
                        Chào mừng đến với
                    </motion.h4>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight"
                    >
                        {(data.brandName || "EUROPIA").toUpperCase()} <span className="text-primary">INTERNATIONAL</span> CLINIC
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-600 text-lg leading-relaxed"
                    >
                        Phòng khám là một trong những cơ sở y tế chuyên khoa chuyên nghiệp, uy tín hàng đầu tại khu vực.
                        Chúng tôi tự hào mang đến môi trường chăm sóc sức khỏe y tế chất lượng cao, thân thiện và tin cậy.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                        >
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                {stat.icon}
                            </div>
                            <h3 className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</h3>
                            <p className="font-bold text-slate-800 mb-2">{stat.label}</p>
                            <p className="text-sm text-slate-500">{stat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
