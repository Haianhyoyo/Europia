'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Phone, Mail, Trash2 } from 'lucide-react';

export default function ConsultationsPage() {
    const [consultations, setConsultations] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    const fetchData = async () => {
        const res = await fetch('/api/data');
        const json = await res.json();
        setConsultations(json.consultations);
        setLoading(false);
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Bạn có chắc muốn xóa yêu cầu này?')) return;
        const res = await fetch('/api/data', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'consultation', id })
        });
        if (res.ok) fetchData();
    };

    if (loading) return (
        <div className="flex items-center justify-center h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Yêu Cầu Tư Vấn</h1>
                    <p className="text-slate-400">Danh sách khách hàng đăng ký tư vấn trực tuyến.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white focus:border-primary outline-none transition-all w-64"
                        />
                    </div>
                    <button className="flex items-center gap-2 bg-white/5 border border-white/10 text-slate-300 px-4 py-2.5 rounded-xl hover:bg-white/10 transition-all font-bold text-sm">
                        <Filter size={18} />
                        <span>Lọc</span>
                    </button>
                </div>
            </div>

            <div className="glass-dark rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5 text-slate-400 text-xs uppercase tracking-widest font-bold">
                                <th className="px-8 py-5">Khách hàng</th>
                                <th className="px-8 py-5">Dịch vụ quan tâm</th>
                                <th className="px-8 py-5">Ngày đăng ký</th>
                                <th className="px-8 py-5">Trạng thái</th>
                                <th className="px-8 py-5 text-right">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {consultations.length > 0 ? consultations.map((c, index) => (
                                <motion.tr
                                    key={c.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="hover:bg-white/[0.02] transition-colors group"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                                                {c.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-white font-bold mb-1">{c.name}</div>
                                                <div className="flex items-center gap-3 text-slate-500 text-xs">
                                                    <span className="flex items-center gap-1 font-mono tracking-tighter"><Phone size={12} /> {c.phone}</span>
                                                    <span className="flex items-center gap-1"><Mail size={12} /> {c.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/10">
                                            {c.service}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-slate-400 text-sm">{c.date}</td>
                                    <td className="px-8 py-6">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg ${c.status === 'Mới' ? 'bg-green-500/10 text-green-500' :
                                            c.status === 'Đã liên hệ' ? 'bg-blue-500/10 text-blue-500' :
                                                'bg-orange-500/10 text-orange-500'
                                            }`}>
                                            {c.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button
                                            onClick={() => handleDelete(c.id)}
                                            className="text-slate-500 hover:text-red-500 transition-colors p-2"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </motion.tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="px-8 py-12 text-center text-slate-500 text-sm italic">
                                        Chưa có yêu cầu tư vấn nào.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-6 bg-white/2 flex items-center justify-between text-slate-500 text-xs font-bold border-t border-white/5">
                    <span>Hiển thị {consultations.length} kết quả</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded-lg border border-white/5 hover:bg-white/5 transition-all">Trước</button>
                        <button className="px-3 py-1.5 rounded-lg bg-primary text-white">1</button>
                        <button className="px-3 py-1.5 rounded-lg border border-white/5 hover:bg-white/5 transition-all">Sau</button>
                    </div>
                </div>
            </div>
        </>
    );
}
