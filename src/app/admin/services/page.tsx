'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Search, ExternalLink, Upload } from 'lucide-react';
import { services } from '@/data/mockData';

export default function AdminServicesPage() {
    const [servicesList, setServicesList] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    const fetchData = async () => {
        const res = await fetch('/api/data');
        const json = await res.json();
        setServicesList(json.services);
        setLoading(false);
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [newService, setNewService] = React.useState({ title: '', description: '', image: '/images/services/general.jpg', features: ['Dịch vụ cao cấp', 'Bác sĩ chuyên khoa'] });
    const [editingService, setEditingService] = React.useState<any>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isEditing: boolean) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                if (isEditing) {
                    setEditingService((prev: any) => ({ ...prev, image: base64String }));
                } else {
                    setNewService((prev) => ({ ...prev, image: base64String }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bạn có chắc muốn xóa dịch vụ này?')) return;
        const res = await fetch('/api/data', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'service', id })
        });
        if (res.ok) fetchData();
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'service', data: newService })
        });
        if (res.ok) {
            setIsAddModalOpen(false);
            setNewService({ title: '', description: '', image: '/images/services/general.jpg', features: ['Dịch vụ cao cấp', 'Bác sĩ chuyên khoa'] });
            fetchData();
        }
    };

    const handleEdit = (service: any) => {
        setEditingService(service);
        setIsEditModalOpen(true);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'service', id: editingService.id, data: editingService })
        });
        if (res.ok) {
            setIsEditModalOpen(false);
            setEditingService(null);
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
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Quản Lý Dịch Vụ</h1>
                    <p className="text-slate-400">Danh sách các dịch vụ đang hiển thị tại trang chủ.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-2xl transition-all hover:scale-[1.02] font-bold shadow-lg shadow-primary/20"
                >
                    <Plus size={20} />
                    <span>Thêm dịch vụ mới</span>
                </button>
            </div>

            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-dark w-full max-w-xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Thêm Dịch Vụ Mới</h2>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Tên dịch vụ</label>
                                <input
                                    required
                                    type="text"
                                    value={newService.title}
                                    onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Mô tả ngắn</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={newService.description}
                                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Hình ảnh dịch vụ</label>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Dán link ảnh hoặc chọn file..."
                                            value={newService.image}
                                            onChange={(e) => setNewService({ ...newService, image: e.target.value })}
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
                                {newService.image && (
                                    <div className="mt-2 h-20 w-32 rounded-lg overflow-hidden border border-white/10">
                                        <img src={newService.image} alt="Preview" className="w-full h-full object-cover" />
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
                                    LƯU DỊCH VỤ
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {isEditModalOpen && editingService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-dark w-full max-w-xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Chỉnh Sửa Dịch Vụ</h2>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Tên dịch vụ</label>
                                <input
                                    required
                                    type="text"
                                    value={editingService.title}
                                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Mô tả ngắn</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={editingService.description}
                                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Hình ảnh dịch vụ</label>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Dán link ảnh hoặc chọn file..."
                                            value={editingService.image}
                                            onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
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
                                {editingService.image && (
                                    <div className="mt-2 h-20 w-32 rounded-lg overflow-hidden border border-white/10">
                                        <img src={editingService.image} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditModalOpen(false);
                                        setEditingService(null);
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

            <div className="grid grid-cols-1 gap-6">
                {servicesList.map((service, index) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-dark p-6 md:p-8 rounded-[2rem] border border-white/5 flex flex-col md:flex-row gap-8 items-center group hover:border-primary/20 transition-all"
                    >
                        <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shrink-0">
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-bold text-white">{service.title}</h3>
                                <a href={`/?#dich-vu`} target="_blank" className="text-slate-500 hover:text-primary transition-colors">
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                            <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                                {service.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {service.features.map((f: string) => (
                                    <span key={f} className="text-[10px] uppercase tracking-widest font-bold bg-white/5 text-slate-400 px-3 py-1 rounded-lg border border-white/5">
                                        {f}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex md:flex-col gap-3 shrink-0">
                            <button
                                onClick={() => handleEdit(service)}
                                className="p-3 bg-white/5 text-slate-400 rounded-xl hover:bg-primary hover:text-white transition-all shadow-lg">
                                <Edit2 size={20} />
                            </button>
                            <button
                                onClick={() => handleDelete(service.id)}
                                className="p-3 bg-white/5 text-slate-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </>
    );
}
