import fs from 'fs/promises';
import path from 'path';
import { supabase } from './supabase';

const DB_PATH = path.join(process.cwd(), 'src/data/db.json');

export async function readDB() {
    // If Supabase is configured, fetch all tables
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        try {
            const [
                { data: services },
                { data: news },
                { data: websiteSettings },
                { data: faqs },
                { data: testimonials },
                { data: consultations }
            ] = await Promise.all([
                supabase.from('services').select('*').order('created_at', { ascending: true }),
                supabase.from('news').select('*').order('created_at', { ascending: false }),
                supabase.from('settings').select('*').single(),
                supabase.from('faqs').select('*'), // Assuming you might add this later
                supabase.from('testimonials').select('*'), // Assuming you might add this later
                supabase.from('consultations').select('*').order('created_at', { ascending: false })
            ]);

            if (websiteSettings || (services && services.length > 0)) {
                return {
                    services: services || [],
                    news: news || [],
                    websiteSettings: websiteSettings || {
                        address: "Đang cập nhật...",
                        hotline: "Đang cập nhật...",
                        email: "contact@europiaclinic.com",
                        working_hours: "Thứ 2 - Chủ Nhật",
                        logo: "/logo-europia.png"
                    },
                    faqs: faqs || [],
                    testimonials: testimonials || [],
                    consultations: consultations || []
                };
            }
            // If Supabase return nothing (empty project), fall through to local JSON
            console.log('Supabase is empty, using local JSON data');
        } catch (error) {
            console.error('Supabase fetch failed, falling back to local JSON:', error);
        }
    }

    // Fallback to local JSON
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
}

export async function writeDB(data: any) {
    // Note: In Supabase mode, we should use specific table updates via API/actions.
    // This local write remains as a fallback or for local dev.
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}
