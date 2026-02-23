'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CircleHelp, Newspaper } from 'lucide-react';
import { news, faqs } from '@/data/mockData';

export default function NewsAndFaq({ news: initialNews, faqs: initialFaqs }: { news?: any[], faqs?: any[] }) {
    const newsData = initialNews || news;
    const faqsData = initialFaqs || faqs;
    return (
        <section className="section-padding bg-white">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-3 gap-16">
                    {/* News Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-8">
                            <Newspaper className="text-primary w-8 h-8" />
                            <h2 className="text-3xl font-bold text-slate-900">Tin tức mới nhất</h2>
                        </div>

                        <div className="space-y-8">
                            {newsData.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex flex-col md:flex-row gap-6 p-4 rounded-3xl hover:bg-slate-50 transition-colors group cursor-pointer"
                                >
                                    <div className="w-full md:w-64 h-44 shrink-0 overflow-hidden rounded-2xl">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{item.date}</span>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm leading-relaxed mb-4">
                                            {item.summary}
                                        </p>
                                        <div className="flex items-center text-primary font-bold text-sm">
                                            Đọc tiếp <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div id="faq">
                        <div className="flex items-center gap-3 mb-8">
                            <CircleHelp className="text-primary w-8 h-8" />
                            <h2 className="text-3xl font-bold text-slate-900">Hỏi đáp y khoa</h2>
                        </div>

                        <div className="space-y-4">
                            {faqsData.map((faq, index) => (
                                <motion.div
                                    key={faq.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-6 bg-surface rounded-2xl border border-slate-100 hover:border-primary/20 transition-all shadow-sm"
                                >
                                    <h4 className="font-bold text-slate-900 mb-3 flex gap-2">
                                        <span className="text-primary">Q:</span>
                                        {faq.question}
                                    </h4>
                                    <p className="text-sm text-slate-600 pl-6 border-l-2 border-primary/10">
                                        <span className="font-bold text-primary italic mr-2 text-xs">A:</span>
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-10 p-8 bg-primary rounded-3xl text-white">
                            <h4 className="font-bold text-xl mb-4">Bạn vẫn còn câu hỏi?</h4>
                            <p className="text-white/80 text-sm mb-6">Hãy gửi câu hỏi cho chúng tôi, bác sĩ sẽ phản hồi bạn sớm nhất.</p>
                            <button className="w-full bg-white text-primary font-bold py-3 rounded-xl hover:bg-slate-100 transition-colors">
                                Gửi câu hỏi ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
