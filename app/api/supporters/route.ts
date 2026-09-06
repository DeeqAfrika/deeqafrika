import { createClient } from '@supabase/supabase-js';
import { signupSchema } from '@/lib/cms/validation';
import { checkOrigin, errorResponse, HttpError } from '@/lib/cms/auth';
import { getCampaignContent } from '@/lib/cms/content';
export async function POST(request: Request) {
  try {
    checkOrigin(request);
    const raw = await request.text();
    if (raw.length > 10000) throw new HttpError(413, 'Registration is too large.');
    const parsed = signupSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) throw new HttpError(400, 'Please check the form and consent to campaign contact.');
    const { website, consent, ...fields } = parsed.data;
    if (website) return Response.json({ ok: true });
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SECRET_KEY;
    if (!url || !key) throw new HttpError(503, 'Registration is temporarily unavailable. Please contact the campaign directly.');
    const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    // Hosting-provided IP is used only for an irreversible, short-lived rate-limit key.
    const ip = request.headers.get('x-vercel-forwarded-for') ?? request.headers.get('cf-connecting-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${key}:${ip}`));
    const rateKey = Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2, '0')).join('');
    const { data: allowed, error: rateError } = await db.rpc('campaign_signup_rate_limit', { p_key: rateKey });
    if (rateError) throw rateError;
    if (!allowed) return Response.json({ error: 'Too many registrations. Please try again in 15 minutes.' }, { status: 429, headers: { 'Retry-After': '900' } });
    const copy = await getCampaignContent(fields.locale);
    const { error } = await db.from('campaign_supporters').insert({ ...fields, consent_at: consent ? new Date().toISOString() : null, consent_text: copy.join.fields.consent });
    // Do not reveal whether an email has previously registered, and never overwrite existing consent or identity.
    if (error && error.code !== '23505') throw error;
    return Response.json({ ok: true });
  } catch (error) {
    if (error instanceof SyntaxError) return Response.json({ error: 'Invalid request.' }, { status: 400 });
    return errorResponse(error);
  }
}
