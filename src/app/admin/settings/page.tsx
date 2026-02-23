'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, MapPin, Phone, Mail, Clock, ShieldCheck, Globe } from 'lucide-react';
import { websiteSettings } from '@/data/mockData';

export default function AdminSettingsPage() {
    const [formData, setFormData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetch('/api/data')
            .then(res => res.json())
            .then(json => {
                setFormData(json.websiteSettings);
                setIsLoading(false);
            });
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch('/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'settings', data: formData })
            });
            if (res.ok) alert('Cấu hình đã được lưu thành công!');
        } catch (error) {
            alert('Lưu thất bại');
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev: any) => ({ ...prev, logo: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    if (isLoading) return (
        <div className="flex items-center justify-center h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <>
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Cấu Hình Website</h1>
                    <p className="text-slate-400">Cập nhật thông tin nhận diện, liên hệ và thời gian làm việc toàn hệ thống.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-2xl transition-all font-bold shadow-xl shadow-primary/20 disabled:opacity-50"
                >
                    <Save size={20} />
                    <span>{isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Side: Main Info */}
                <div className="lg:col-span-2 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-dark p-10 rounded-[2.5rem] border border-white/5"
                    >
                        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                            <Globe className="text-primary" size={24} />
                            Thông tin cơ bản
                        </h3>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Tên phòng khám / Thương hiệu</label>
                                <input
                                    type="text"
                                    value={formData.brandName || "Europia International Clinic"}
                                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Địa chỉ trụ sở chính</label>
                                <div className="relative">
                                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                    <input
                                        type="text"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-4 text-white outline-none focus:border-primary transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Số Hotline</label>
                                    <div className="relative">
                                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                        <input
                                            type="text"
                                            value={formData.hotline}
                                            onChange={(e) => setFormData({ ...formData, hotline: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-4 text-white outline-none focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Liên Hệ</label>
                                    <div className="relative">
                                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-4 text-white outline-none focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-dark p-10 rounded-[2.5rem] border border-white/5"
                    >
                        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                            <Clock className="text-primary" size={24} />
                            Thời gian hoạt động
                        </h3>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Lịch làm việc hàng tuần</label>
                            <textarea
                                rows={3}
                                value={formData.working_hours}
                                onChange={(e) => setFormData({ ...formData, working_hours: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary transition-all resize-none"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Security & Branding */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-dark p-8 rounded-[2.5rem] border border-white/5 text-center"
                    >
                        <div className="w-20 h-20 bg-primary/10 text-primary rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-2xl overflow-hidden border border-white/10">
                            {formData.logo ? (
                                <img src={formData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
                            ) : (
                                <span>{formData.brandName?.[0] || 'E'}</span>
                            )}
                        </div>
                        <h4 className="text-white font-bold mb-2">Biểu tượng thương hiệu</h4>
                        <p className="text-xs text-slate-500 mb-6">Định dạng khuyên dùng: PNG transparent, tối thiểu 512x512px.</p>
                        <label className="w-full block bg-white/5 border border-white/10 hover:bg-white/10 text-white py-3 rounded-xl transition-all font-bold text-sm uppercase tracking-widest cursor-pointer">
                            Thay đổi Logo
                            <input type="file" className="hidden" accept="image/*" onChange={handleLogoChange} />
                        </label>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-dark p-8 rounded-[2.5rem] border border-white/5"
                    >
                        <h4 className="text-white font-bold mb-6 flex items-center gap-3">
                            <ShieldCheck className="text-green-500" size={20} />
                            Bảo mật & Quyền hạn
                        </h4>
                        <div className="space-y-4">
                            <button className="w-full text-left p-4 rounded-xl hover:bg-white/5 transition-all group">
                                <span className="text-slate-300 font-bold block text-sm group-hover:text-primary">Đổi mật quản trị</span>
                                <span className="text-[10px] text-slate-500">Lần cuối thay đổi: 12 ngày trước</span>
                            </button>
                            <button className="w-full text-left p-4 rounded-xl hover:bg-white/5 transition-all group">
                                <span className="text-slate-300 font-bold block text-sm group-hover:text-primary">Lịch sử đăng nhập</span>
                                <span className="text-[10px] text-slate-500">Xem các phiên truy cập gần đây</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
