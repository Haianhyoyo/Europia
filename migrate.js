const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Error: Please provide NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const dbPath = path.join(__dirname, 'src/data/db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

async function migrate() {
    console.log('Starting migration...');

    // 1. Migrate Services
    if (db.services?.length) {
        console.log('Migrating services...');
        const { error } = await supabase.from('services').insert(
            db.services.map(({ id, ...rest }) => rest)
        );
        if (error) console.error('Error migrating services:', error);
    }

    // 2. Migrate News
    if (db.news?.length) {
        console.log('Migrating news...');
        const { error } = await supabase.from('news').insert(
            db.news.map(({ id, ...rest }) => rest)
        );
        if (error) console.error('Error migrating news:', error);
    }

    // 3. Migrate Settings
    if (db.websiteSettings) {
        console.log('Migrating settings...');
        const { error } = await supabase.from('settings').update({
            address: db.websiteSettings.address,
            hotline: db.websiteSettings.hotline,
            email: db.websiteSettings.email,
            working_hours: db.websiteSettings.working_hours,
            logo: db.websiteSettings.logo,
            brand_name: db.websiteSettings.brandName || 'Europia'
        }).eq('id', 1);
        if (error) console.error('Error migrating settings:', error);
    }

    console.log('Migration finished!');
}

migrate();
