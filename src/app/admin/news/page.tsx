'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Calendar, Eye, Upload } from 'lucide-react';
import { news } from '@/data/mockData';

export default function AdminNewsPage() {
    const [newsList, setNewsList] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    const fetchData = async () => {
        const res = await fetch('/api/data');
        const json = await res.json();
        setNewsList(json.news);
        setLoading(false);
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [newItem, setNewItem] = React.useState({ title: '', summary: '', excerpt: '', image: '/images/news/general.jpg' });
    const [editingItem, setEditingItem] = React.useState<any>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isEditing: boolean) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                if (isEditing) {
                    setEditingItem((prev: any) => ({ ...prev, image: base64String }));
                } else {
                    setNewItem((prev) => ({ ...prev, image: base64String }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bạn có chắc muốn xóa bài viết này?')) return;
        const res = await fetch('/api/data', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'news', id })
        });
        if (res.ok) fetchData();
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'news', data: { ...newItem, excerpt: newItem.summary } })
        });
        if (res.ok) {
            setIsAddModalOpen(false);
            setNewItem({ title: '', summary: '', excerpt: '', image: '/images/news/general.jpg' });
            fetchData();
        }
    };

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setIsEditModalOpen(true);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'news',
                id: editingItem.id,
                data: { ...editingItem, excerpt: editingItem.summary }
            })
        });
        if (res.ok) {
            setIsEditModalOpen(false);
            setEditingItem(null);
            fetchData();
        }
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
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Quản Lý Tin Tức</h1>
                    <p className="text-slate-400">Đăng tải và chỉnh sửa bài viết y khoa, sự kiện clinic.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-2xl transition-all hover:scale-[1.02] font-bold shadow-lg shadow-primary/20"
                >
                    <Plus size={20} />
                    <span>Viết bài mới</span>
                </button>
            </div>

            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-dark w-full max-w-xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Đăng Bài Viết Mới</h2>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Tiêu đề bài viết</label>
                                <input
                                    required
                                    type="text"
                                    value={newItem.title}
                                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Tóm tắt nội dung</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={newItem.summary}
                                    onChange={(e) => setNewItem({ ...newItem, summary: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Hình ảnh bài viết</label>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Dán link ảnh hoặc chọn file..."
                                            value={newItem.image}
                                            onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary text-sm"
                                        />
                                    </div>
                                    <label className="shrink-0 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 rounded-xl cursor-pointer transition-all border border-white/10">
                                        <Upload size={18} />
                                        <span className="text-sm font-bold">Chọn file</span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, false)}
                                        />
                                    </label>
                                </div>
                                {newItem.image && (
                                    <div className="mt-2 h-20 w-32 rounded-lg overflow-hidden border border-white/10">
                                        <img src={newItem.image} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all"
                                >
                                    HỦY
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/20"
                                >
                                    ĐĂNG BÀI VIẾT
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {isEditModalOpen && editingItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-dark w-full max-w-xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Chỉnh Sửa Bài Viết</h2>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Tiêu đề bài viết</label>
                                <input
                                    required
                                    type="text"
                                    value={editingItem.title}
                                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Tóm tắt nội dung</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={editingItem.summary}
                                    onChange={(e) => setEditingItem({ ...editingItem, summary: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Hình ảnh bài viết</label>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Dán link ảnh hoặc chọn file..."
                                            value={editingItem.image}
                                            onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary text-sm"
                                        />
                                    </div>
                                    <label className="shrink-0 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 rounded-xl cursor-pointer transition-all border border-white/10">
                                        <Upload size={18} />
                                        <span className="text-sm font-bold">Chọn file</span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, true)}
                                        />
                                    </label>
                                </div>
                                {editingItem.image && (
                                    <div className="mt-2 h-20 w-32 rounded-lg overflow-hidden border border-white/10">
                                        <img src={editingItem.image} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditModalOpen(false);
                                        setEditingItem(null);
                                    }}
                                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all"
                                >
                                    HỦY
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/20"
                                >
                                    CẬP NHẬT
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {newsList.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-dark rounded-[2.5rem] border border-white/5 overflow-hidden group hover:border-primary/20 transition-all shadow-xl"
                    >
                        <div className="h-56 relative overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-6 left-6 flex gap-2">
                                <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
                                    Tin tức
                                </span>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="flex items-center gap-4 text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">
                                <span className="flex items-center gap-1.5"><Calendar size={14} /> {item.date}</span>
                                <span className="flex items-center gap-1.5"><Eye size={14} /> 156 lượt xem</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 group-hover:text-primary-light transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-slate-400 text-sm mb-8 line-clamp-2 leading-relaxed italic">
                                {item.summary}
                            </p>

                            <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="p-2.5 bg-white/5 text-slate-400 rounded-xl hover:bg-primary hover:text-white transition-all">
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2.5 bg-white/5 text-slate-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                <button className="text-primary font-bold text-sm tracking-tight flex items-center gap-1 hover:translate-x-1 transition-all">
                                    Xem chi tiết bài viết
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </>
    );
}
