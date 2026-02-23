'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { testimonials } from '@/data/mockData';

export default function Testimonials({ testimonials: initialTestimonials }: { testimonials?: any[] }) {
    const data = initialTestimonials || testimonials;
    return (
        <section id="y-kien" className="section-padding bg-slate-900 overflow-hidden relative">
            {/* Decorative background */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary rounded-full blur-[150px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Ý kiến khách hàng</h4>
                    <h2 className="text-3xl md:text-5xl font-bold text-white">CHIA SẺ TỪ TRÁI TIM</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {data.map((t, index) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="glass-dark p-10 rounded-[2.5rem] relative"
                        >
                            <Quote className="absolute top-8 right-8 text-white/5 w-24 h-24" />

                            <div className="flex gap-1 mb-6">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} size={16} className="fill-yellow-500 text-yellow-500" />
                                ))}
                            </div>

                            <p className="text-lg text-slate-300 mb-8 leading-relaxed italic">
                                "{t.content}"
                            </p>

                            <div className="flex items-center gap-4">
                                <img
                                    src={t.image}
                                    alt={t.author}
                                    className="w-16 h-16 rounded-full border-2 border-primary/30"
                                />
                                <div>
                                    <h4 className="text-white font-bold text-lg">{t.author}</h4>
                                    <p className="text-primary-light text-sm">{t.info}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
