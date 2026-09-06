// Run against a local production server connected to the campaign project.
// Test-only records are uniquely named and removed in finally. Requires QA_ADMIN_TOKEN.
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { createClient } from '@supabase/supabase-js';
const base = process.env.QA_BASE_URL || 'http://localhost:3100';
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const service = createClient(url, process.env.SUPABASE_SECRET_KEY, { auth: { persistSession: false } });
const anon = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, { auth: { persistSession: false } });
const token = process.env.QA_ADMIN_TOKEN;
assert.ok(token, 'Supply a verified admin token through the environment.');
const id = randomUUID();
const draftId = `post-${id}-draft`;
const slug = `qa-${id}`;
const signupEmail = `qa-${id}@example.invalid`;
let uploadPath;
let outsiderId;
async function api(path, method = 'GET', body, admin = true) {
  const response = await fetch(`${base}${path}`, { method, headers: { Origin: base, ...(admin ? { Authorization: `Bearer ${token}` } : {}), ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }) }, ...(body ? { body: body instanceof FormData ? body : JSON.stringify(body) } : {}) });
  return { status: response.status, body: await response.json() };
}
const translation = { title: 'Automated verification story', excerpt: 'Temporary verification content, removed after testing.', category: 'Verification', coverAlt: 'Ajax youth team', blocks: [{ id: randomUUID(), type: 'paragraph', text: 'Temporary verification paragraph.', src: '', alt: '', caption: '' }, { id: randomUUID(), type: 'youtube', src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', text: '', alt: '', caption: 'Video embed verification' }] };
const post = { slug, coverImage: '/images/ajax-youth-team.png', coverPosition: '50% 50%', publishedAt: new Date().toISOString(), translations: { en: translation, so: { ...translation, title: 'Hubinta wararka ololaha' } } };
try {
  assert.equal((await api('/api/admin/documents', 'GET', null, false)).status, 401);
  const originResponse = await fetch(`${base}/api/admin/documents`, { method: 'POST', headers: { Origin: 'https://other.example', Authorization: `Bearer ${token}` }, body: '{}' });
  assert.equal(originResponse.status, 403);
  assert.equal((await api('/api/admin/session')).status, 200);
  const request = { id: draftId, kind: 'post', locale: null, revision: 0, data: post, publish: false };
  const saved = await api('/api/admin/documents', 'POST', request);
  assert.equal(saved.status, 200, JSON.stringify(saved.body));
  assert.equal(saved.body.document.revision, 1);
  const privateDraft = await anon.from('campaign_documents').select('*').eq('id', draftId);
  assert.equal(privateDraft.data.length, 0, 'Drafts must not be public');
  assert.equal((await fetch(`${base}/en/news/${slug}`)).status, 404);
  assert.equal((await api('/api/admin/documents', 'POST', request)).status, 409, 'Stale revision must not overwrite');
  const bad = structuredClone(post); bad.translations.en.blocks[1].src = 'https://evil.example/embed/foo';
  assert.equal((await api('/api/admin/documents', 'POST', { ...request, revision: 1, data: bad, publish: true })).status, 400);
  const publish = await api('/api/admin/documents', 'POST', { ...request, revision: 1, publish: true });
  assert.equal(publish.status, 200, JSON.stringify(publish.body));
  for (const lang of ['en', 'so']) { const res = await fetch(`${base}/${lang}/news/${slug}`); assert.equal(res.status, 200); const html = await res.text(); assert.ok(html.includes(post.translations[lang].title)); assert.ok(!html.includes('<iframe'), 'Video must wait for visitor consent'); }
  assert.ok((await (await fetch(`${base}/en/news`)).text()).includes(slug));
  assert.ok((await (await fetch(`${base}/en`)).text()).includes(slug));
  assert.ok((await (await fetch(`${base}/sitemap.xml`)).text()).includes(slug));
  const form = new FormData(); form.set('file', new Blob([await readFile(new URL('../public/images/ajax-youth-team.png', import.meta.url))], { type: 'image/png' }), 'team.png');
  const upload = await api('/api/admin/media', 'POST', form);
  assert.equal(upload.status, 200, JSON.stringify(upload.body));
  uploadPath = `uploads/${upload.body.name}`;
  assert.equal((await fetch(upload.body.url)).status, 200);
  const badImage = new FormData(); badImage.set('file', new Blob(['<script>alert(1)</script>'], { type: 'image/png' }), 'fake.png');
  assert.equal((await api('/api/admin/media', 'POST', badImage)).status, 400);
  const signup = { name: 'Automated QA', email: signupEmail, phone: '', region: 'Test', role: 'Verification', message: 'Temporary test record', locale: 'en', consent: true, website: '' };
  assert.equal((await api('/api/supporters', 'POST', { ...signup, consent: false }, false)).status, 400);
  assert.equal((await api('/api/supporters', 'POST', signup, false)).status, 200);
  assert.equal((await api('/api/supporters', 'POST', signup, false)).status, 200);
  const registration = await service.from('campaign_supporters').select('*').eq('email', signupEmail);
  assert.equal(registration.data.length, 1); assert.ok(registration.data[0].consent_at); assert.ok(registration.data[0].consent_text);
  assert.ok((await anon.from('campaign_supporters').select('*')).error, 'Public cannot read registrations');
  assert.ok((await anon.from('campaign_supporters').insert({ ...signup })).error, 'Public cannot insert directly');
  const outsider = await service.auth.admin.createUser({ email: `outsider-${id}@example.invalid`, password: `QA-${randomUUID()}!`, email_confirm: true });
  assert.ifError(outsider.error); outsiderId = outsider.data.user.id;
  // A genuine signed-in account still needs explicit campaign membership.
  const link = await service.auth.admin.generateLink({ type: 'magiclink', email: outsider.data.user.email });
  assert.ifError(link.error);
  const outsiderSession = await anon.auth.verifyOtp({ token_hash: link.data.properties.hashed_token, type: 'email' });
  assert.ifError(outsiderSession.error);
  const denied = await fetch(`${base}/api/admin/documents`, { headers: { Authorization: `Bearer ${outsiderSession.data.session.access_token}` } });
  assert.equal(denied.status, 403);
  assert.equal((await anon.from('campaign_documents').select('*').eq('id', draftId)).data.length, 0);
  assert.equal((await anon.from('campaign_supporters').select('*')).data.length, 0);
  assert.equal((await api('/api/admin/unpublish', 'POST', { id: draftId.replace('-draft', '-published') })).status, 200);
  assert.equal((await fetch(`${base}/en/news/${slug}`)).status, 404);
  console.log('PASS: admin authentication, membership, CSRF, draft privacy, revision conflicts, validation, bilingual publishing, news/home/sitemap, uploads, signup consent, duplicate protection, private registrations and unpublish.');
} finally {
  await service.from('campaign_documents').delete().in('id', [draftId, draftId.replace('-draft', '-published')]);
  await service.from('campaign_supporters').delete().eq('email', signupEmail);
  if (uploadPath) await service.storage.from('campaign-media').remove([uploadPath]);
  if (outsiderId) await service.auth.admin.deleteUser(outsiderId);
}
