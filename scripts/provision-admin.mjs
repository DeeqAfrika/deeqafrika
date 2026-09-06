import { createClient } from '@supabase/supabase-js';
const { NEXT_PUBLIC_SUPABASE_URL: url, SUPABASE_SECRET_KEY: key, CAMPAIGN_ADMIN_EMAIL: email, CAMPAIGN_ADMIN_PASSWORD: password } = process.env;
if (!url || !key || !email || !password || password.length < 12) throw new Error('Supply the project URL, server secret, admin email and a password of at least 12 characters through environment variables.');
const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const { data, error } = await db.auth.admin.createUser({ email, password, email_confirm: true });
if (error) throw new Error(`Unable to create admin: ${error.message}. Existing accounts are never changed by this script.`);
const result = await db.from('campaign_admins').insert({ user_id: data.user.id });
if (result.error) throw new Error('Account created, but membership could not be saved. Apply the campaign migration and add the user to campaign_admins.');
console.log('Campaign admin created with verified email and administrator membership.');
