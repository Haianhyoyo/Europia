import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import { supabase } from '@/lib/supabase';

const isSupabaseConfigured = () =>
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function GET() {
    try {
        const db = await readDB();
        return NextResponse.json(db);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read database' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { type, data } = await request.json();

        if (isSupabaseConfigured()) {
            let result;
            if (type === 'consultation') {
                result = await supabase.from('consultations').insert([{ ...data, status: 'Mới' }]);
            } else if (type === 'settings') {
                result = await supabase.from('settings').update(data).eq('id', 1);
            } else if (type === 'service') {
                if (data.id && data.id.length > 10) { // UUID check
                    result = await supabase.from('services').update(data).eq('id', data.id);
                } else {
                    const { id, ...rest } = data;
                    result = await supabase.from('services').insert([rest]);
                }
            } else if (type === 'news') {
                if (data.id && data.id.length > 10) {
                    result = await supabase.from('news').update(data).eq('id', data.id);
                } else {
                    const { id, ...rest } = data;
                    result = await supabase.from('news').insert([{ ...rest, date: new Date().toISOString().split('T')[0] }]);
                }
            }

            if (result?.error) throw result.error;
            const updatedDb = await readDB();
            return NextResponse.json({ success: true, db: updatedDb });
        }

        // Fallback to local JSON
        const db = await readDB();
        if (type === 'consultation') {
            const newConsultation = {
                id: Date.now().toString(),
                ...data,
                status: 'Mới',
                date: new Date().toISOString().split('T')[0]
            };
            db.consultations.unshift(newConsultation);
        } else if (type === 'settings') {
            db.websiteSettings = { ...db.websiteSettings, ...data };
        } else if (type === 'service') {
            if (data.id) {
                const index = db.services.findIndex((s: any) => s.id === data.id);
                if (index !== -1) db.services[index] = data;
            } else {
                db.services.push({ ...data, id: Date.now().toString() });
            }
        } else if (type === 'news') {
            if (data.id) {
                const index = db.news.findIndex((n: any) => n.id === data.id);
                if (index !== -1) db.news[index] = data;
            } else {
                db.news.unshift({ ...data, id: Date.now().toString(), date: new Date().toISOString().split('T')[0] });
            }
        }

        await writeDB(db);
        return NextResponse.json({ success: true, db });
    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { type, id } = await request.json();

        if (isSupabaseConfigured()) {
            let result;
            if (type === 'service') {
                result = await supabase.from('services').delete().eq('id', id);
            } else if (type === 'news') {
                result = await supabase.from('news').delete().eq('id', id);
            } else if (type === 'consultation') {
                result = await supabase.from('consultations').delete().eq('id', id);
            }

            if (result?.error) throw result.error;
            const updatedDb = await readDB();
            return NextResponse.json({ success: true, db: updatedDb });
        }

        // Fallback to local JSON
        const db = await readDB();
        if (type === 'service') {
            db.services = db.services.filter((s: any) => s.id !== id);
        } else if (type === 'news') {
            db.news = db.news.filter((n: any) => n.id !== id);
        } else if (type === 'consultation') {
            db.consultations = db.consultations.filter((c: any) => c.id !== id);
        }

        await writeDB(db);
        return NextResponse.json({ success: true, db });
    } catch (error) {
        console.error('DELETE Error:', error);
        return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
    }
}
