'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Send, CheckCircle } from 'lucide-react';
import { services, websiteSettings } from '@/data/mockData';

export default function ConsultationForm({ settings, services: initialServices }: { settings?: any, services?: any[] }) {
    const dataSettings = settings || websiteSettings;
    const servicesList = initialServices || services;
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        service: '',
        note: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'consultation',
                    data: formData
                })
            });

            if (res.ok) {
                setSubmitted(true);
            }
        } catch (error) {
            console.error('Submission failed', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <section id="tu-van" className="section-padding bg-primary/5">
                <div className="container mx-auto px-4 max-w-2xl text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white p-12 rounded-[2rem] shadow-2xl border border-primary/10"
                    >
                        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={40} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Gửi yêu cầu thành công!</h2>
                        <p className="text-slate-600 mb-8">Cảm ơn bạn đã tin tưởng. Đội ngũ bác sĩ của chúng tôi sẽ liên hệ lại với bạn trong vòng 15 phút.</p>
                        <button
                            onClick={() => {
                                setSubmitted(false);
                                setFormData({ name: '', phone: '', service: '', note: '' });
                            }}
                            className="text-primary font-bold hover:underline"
                        >
                            Gửi thêm yêu cầu khác
                        </button>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id="tu-van" className="section-padding bg-surface relative overflow-hidden">
            {/* Decorative Blob */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Liên hệ ngay</h4>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            Để Lại Thông Tin <br /> Để Được Tư Vấn Miễn Phí
                        </h2>
                        <p className="text-slate-600 text-lg mb-8">
                            Chúng tôi cam kết bảo mật thông tin khách hàng 100%. Mọi thắc mắc của bạn sẽ được giải đáp bởi các bác sĩ chuyên khoa phụ trách.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-6 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <span className="text-xs text-slate-400 block mb-1 uppercase font-bold tracking-wider">Hỗ trợ 24/7</span>
                                    <span className="text-xl font-bold text-slate-900">{dataSettings.hotline}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-slate-100"
                    >
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Họ và tên *</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Nguyễn Văn A"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Số điện thoại *</label>
                                    <input
                                        required
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="09xx xxx xxx"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Dịch vụ quan tâm</label>
                                <select
                                    value={formData.service}
                                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                                >
                                    <option value="">Chọn dịch vụ (không bắt buộc)</option>
                                    {servicesList.map(s => (
                                        <option key={s.id} value={s.title}>{s.title}</option>
                                    ))}
                                    <option value="Khác">Khác</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Nội dung cần tư vấn</label>
                                <textarea
                                    rows={4}
                                    value={formData.note}
                                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                    placeholder="Nhập câu hỏi hoặc tình trạng của bạn..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-xl shadow-primary/20 disabled:opacity-50"
                            >
                                {isSubmitting ? 'ĐANG GỬI...' : 'GỬI YÊU CẦU NGAY'}
                                <Send size={18} />
                            </button>

                            <p className="text-center text-xs text-slate-400">
                                Bằng cách nhấn gửi, bạn đồng ý với chính sách bảo mật của chúng tôi.
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
