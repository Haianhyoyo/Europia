'use client';

import React from 'react';
import {
    Users,
    ClipboardList,
    MessageSquare,
    TrendingUp,
    ArrowUpRight,
    Clock
} from 'lucide-react';
import { services, news } from '@/data/mockData';
import { motion } from 'framer-motion';

const stats = [
    { name: 'Yêu cầu mới', value: '12', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Tổng dịch vụ', value: services.length.toString(), icon: ClipboardList, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { name: 'Bài viết tin tức', value: news.length.toString(), icon: Users, color: 'text-green-500', bg: 'bg-green-500/10' },
    { name: 'Lượt truy cập', value: '1,280', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-500/10' },
];

export default function DashboardPage() {
    const [data, setData] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('/api/data')
            .then(res => res.json())
            .then(json => {
                setData(json);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    const statsList = [
        { name: 'Yêu cầu mới', value: data.consultations.length.toString(), icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { name: 'Tổng dịch vụ', value: data.services.length.toString(), icon: ClipboardList, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { name: 'Bài viết tin tức', value: data.news.length.toString(), icon: Users, color: 'text-green-500', bg: 'bg-green-500/10' },
        { name: 'Lượt truy cập', value: '1,280', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    ];

    return (
        <>
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Tổng Quan Hệ Thống</h1>
                <p className="text-slate-400">Chào mừng bạn quay trở lại trang quản trị Europia.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {statsList.map((stat, index) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-dark p-6 rounded-3xl border border-white/5 group hover:border-primary/30 transition-all"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                                <stat.icon size={24} />
                            </div>
                            <div className="text-primary-light flex items-center text-xs font-bold">
                                +12% <ArrowUpRight size={14} className="ml-1" />
                            </div>
                        </div>
                        <h3 className="text-slate-400 text-sm font-medium mb-1">{stat.name}</h3>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="grid lg:grid-cols-2 gap-8">
                <div className="glass-dark p-8 rounded-[2.5rem] border border-white/5">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-white">Yêu cầu tư vấn mới nhất</h3>
                        <button className="text-sm text-primary font-bold hover:underline">Xem tất cả</button>
                    </div>

                    <div className="space-y-6">
                        {data.consultations.slice(0, 3).length > 0 ? data.consultations.slice(0, 3).map((c: any, i: number) => (
                            <div key={c.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                                        {c.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">{c.name}</h4>
                                        <p className="text-slate-500 text-xs">Cần tư vấn {c.service}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                                    <Clock size={12} />
                                    <span>{c.date}</span>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-8 text-slate-500 text-sm">Chưa có yêu cầu mới</div>
                        )}
                    </div>
                </div>

                <div className="glass-dark p-8 rounded-[2.5rem] border border-white/5">
                    <h3 className="text-xl font-bold text-white mb-8">Cập nhật nội dung</h3>
                    <div className="space-y-6 text-sm text-slate-400">
                        <div className="flex gap-4 items-start">
                            <div className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0 shadow-[0_0_10px_#3b82f6]"></div>
                            <p>Quản trị viên đã cập nhật thông tin dịch vụ <span className="text-white font-bold">"Thẩm Mỹ Ngoại Khoa"</span>.</p>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0 opacity-50"></div>
                            <p>Bài viết mới <span className="text-white font-bold">"Xu hướng thẩm mỹ bền vững"</span> đã được xuất bản.</p>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0 opacity-30"></div>
                            <p>Website đã đồng bộ dữ liệu thành công với hệ thống CRM.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
