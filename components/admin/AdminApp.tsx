'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, type FormEvent } from 'react';
import { LayoutDashboard, FileText, Newspaper, Users, Wallet, Handshake, ExternalLink, LogOut, Plus, Save, Send, Eye, X, Download, RefreshCw } from 'lucide-react';
import { browserClient, adminRequest } from '@/lib/cms/browser';
import { content, type Language, type CampaignContent } from '@/content';
import { defaultSettings } from '@/content/cms-defaults';
import type { CampaignSettings, CmsDocument, Post, Supporter } from '@/lib/cms/types';
import { ContentFields, humanize } from './Fields';
import { PostEditor } from './PostEditor';
import { SettingsEditor } from './SettingsEditor';
import { StoryBody } from '../StoryBody';

type Area = 'overview' | 'pages' | 'news' | 'registrations' | 'donations' | 'backers';
const navigation = [{ id: 'overview', label: 'Overview', icon: LayoutDashboard }, { id: 'pages', label: 'Pages & images', icon: FileText }, { id: 'news', label: 'News & updates', icon: Newspaper }, { id: 'registrations', label: 'Registrations', icon: Users }, { id: 'donations', label: 'Donation methods', icon: Wallet }, { id: 'backers', label: 'Supporting entities', icon: Handshake }] as const;
const groups: (keyof CampaignContent)[] = ['home', 'vision', 'plan', 'about', 'news', 'media', 'join', 'images', 'participation', 'brand', 'nav', 'common', 'footer', 'contact', 'meta'];
function newDocument(id: string, kind: CmsDocument['kind'], locale: Language | null, data: unknown): CmsDocument { return { id, kind, locale, status: 'draft', data: structuredClone(data), revision: 0, updated_at: '' }; }
function blankPost(): Post {
  const text = { title: '', excerpt: '', category: 'Campaign update', coverAlt: '', blocks: [] };
  return { slug: `update-${Date.now()}`, coverImage: '', coverPosition: '50% 35%', publishedAt: new Date().toISOString(), translations: { en: structuredClone(text), so: { ...structuredClone(text), category: 'Wararka ololaha' } } };
}
function csvCell(value: unknown) {
  let text = String(value ?? '');
  if (/^[\s]*[=+@-]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}
export function AdminApp({ configured }: { configured: boolean }) {
  const [ready, setReady] = useState(!configured);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [account, setAccount] = useState('');
  const [recovery, setRecovery] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [area, setArea] = useState<Area>('overview');
  const [lang, setLang] = useState<Language>('en');
  const [group, setGroup] = useState<keyof CampaignContent>('home');
  const [documents, setDocuments] = useState<CmsDocument[]>([]);
  const [draft, setDraft] = useState<CmsDocument | null>(null);
  const [dirty, setDirty] = useState(false);
  const [preview, setPreview] = useState(false);
  const [registrations, setRegistrations] = useState<Supporter[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!configured) return;
    let mounted = true;
    async function initialize() {
      try {
        const { data: { session } } = await browserClient().auth.getSession();
        if (session) {
          const [who, docs] = await Promise.all([adminRequest('session'), adminRequest('documents')]);
          if (mounted) { setAccount(who.email); setDocuments(docs.documents); }
        }
      } catch (e) { if (mounted) setError(e instanceof Error ? e.message : 'Unable to load administration.'); }
      finally { if (mounted) setReady(true); }
    }
    void initialize();
    const { data: { subscription } } = browserClient().auth.onAuthStateChange(event => { if (event === 'PASSWORD_RECOVERY' && mounted) setRecovery(true); if (event === 'SIGNED_OUT' && mounted) { setAccount(''); setDocuments([]); setDraft(null); } });
    return () => { mounted = false; subscription.unsubscribe(); };
  }, [configured]);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty) event.preventDefault(); };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  async function login(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError(''); setMessage('');
    try {
      const { error: authError } = await browserClient().auth.signInWithPassword({ email, password });
      if (authError) throw new Error('The email or password was not accepted. Please try again.');
      const [who, docs] = await Promise.all([adminRequest('session'), adminRequest('documents')]);
      setPassword(''); setAccount(who.email); setDocuments(docs.documents);
    } catch (e) { setError(e instanceof Error ? e.message : 'Unable to sign in.'); }
    finally { setBusy(false); }
  }
  async function resetPassword() {
    if (!email) { setError('Enter your admin email first.'); return; }
    setBusy(true); setError('');
    try { const { error } = await browserClient().auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/admin` }); if (error) throw error; setMessage('If the account exists, a password reset link will arrive by email.'); }
    catch { setError('Unable to request a reset right now. Please try again later.'); }
    finally { setBusy(false); }
  }
  async function updatePassword(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError('');
    try { const { error } = await browserClient().auth.updateUser({ password }); if (error) throw error; setPassword(''); setRecovery(false); setMessage('Password updated.'); }
    catch (e) { setError(e instanceof Error ? e.message : 'Unable to update password.'); }
    finally { setBusy(false); }
  }
  const leave = () => !dirty || window.confirm('You have unsaved changes. Discard them and continue?');
  function findDraft(id: string, kind: CmsDocument['kind'], locale: Language | null, fallback: unknown) {
    const existing = documents.find(item => item.id === id);
    const published = documents.find(item => item.id === id.replace(/-draft$/, '-published'));
    return structuredClone(existing ?? newDocument(id, kind, locale, published?.data ?? fallback));
  }
  function navigate(next: Area) {
    if (!leave()) return;
    setArea(next); setError(''); setMessage(''); setDirty(false); setDraft(null);
    if (next === 'pages') setDraft(findDraft(`content-${lang}-draft`, 'content', lang, content[lang]));
    if (next === 'donations' || next === 'backers') setDraft(findDraft('settings-draft', 'settings', null, defaultSettings));
    if (next === 'registrations') void loadRegistrations(0);
  }
  function language(next: Language) {
    if (area === 'pages') { if (!leave()) return; setDraft(findDraft(`content-${next}-draft`, 'content', next, content[next])); setDirty(false); }
    setLang(next);
  }
  function change(data: unknown) { if (draft) { setDraft({ ...draft, data }); setDirty(true); setMessage(''); } }
  async function save(publish: boolean) {
    if (!draft || busy) return;
    setBusy(true); setError(''); setMessage('');
    try {
      const result = await adminRequest('documents', { method: 'POST', body: JSON.stringify({ id: draft.id, kind: draft.kind, locale: draft.locale, data: draft.data, revision: draft.revision, publish }) });
      setDraft(result.document); setDirty(false);
      const docs = await adminRequest('documents'); setDocuments(docs.documents);
      setMessage(publish ? 'Published. The website now shows this version.' : 'Draft saved. The live website has not changed.');
    } catch (e) { setError(e instanceof Error ? e.message : 'Save failed.'); }
    finally { setBusy(false); }
  }
  async function loadRegistrations(next: number) {
    setBusy(true); setError('');
    try { const result = await adminRequest(`supporters?page=${next}`); setRegistrations(result.supporters); setTotal(result.count); setPage(next); }
    catch (e) { setError(e instanceof Error ? e.message : 'Unable to load registrations.'); }
    finally { setBusy(false); }
  }
  async function exportRegistrations() {
    setBusy(true); setError('');
    try {
      const rows: Supporter[] = [];
      for (let index = 0; ; index++) { const result = await adminRequest(`supporters?page=${index}`); rows.push(...result.supporters); if (rows.length >= result.count || !result.supporters.length) break; }
      const keys: (keyof Supporter)[] = ['name', 'email', 'phone', 'region', 'role', 'message', 'locale', 'consent_at', 'consent_text', 'created_at'];
      const csv = [keys.map(csvCell).join(','), ...rows.map(row => keys.map(key => csvCell(row[key])).join(','))].join('\r\n');
      const url = URL.createObjectURL(new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' })); const a = document.createElement('a'); a.href = url; a.download = 'campaign-registrations.csv'; a.click(); URL.revokeObjectURL(url);
    } catch (e) { setError(e instanceof Error ? e.message : 'Export failed.'); }
    finally { setBusy(false); }
  }
  async function removeRegistration(id: string) {
    if (!window.confirm('Permanently remove this registration and its contact details?')) return;
    setBusy(true);
    try { await adminRequest('supporters', { method: 'DELETE', body: JSON.stringify({ id }) }); await loadRegistrations(page); setMessage('Registration removed.'); }
    catch (e) { setError(e instanceof Error ? e.message : 'Unable to remove registration.'); }
    finally { setBusy(false); }
  }
  async function unpublish(id: string) {
    if (!window.confirm('Remove this story from the public website? Its draft will remain available.')) return;
    setBusy(true); setError('');
    try { await adminRequest('unpublish', { method: 'POST', body: JSON.stringify({ id }) }); const result = await adminRequest('documents'); setDocuments(result.documents); setMessage('Story unpublished. Its draft is still available.'); }
    catch (e) { setError(e instanceof Error ? e.message : 'Unable to unpublish.'); }
    finally { setBusy(false); }
  }
  const posts = documents.filter(item => item.kind === 'post' && item.status === 'draft');
  const publishedCount = documents.filter(item => item.kind === 'post' && item.status === 'published').length;
  const title = navigation.find(item => item.id === area)?.label;

  if (!ready) return <main className="admin-loading">Loading campaign workspace…</main>;
  if (!account || recovery) return <main className="admin-login"><div className="admin-login-brand"><span className="admin-star">★</span><p>DEEQ AFRIKA <small>CAMPAIGN WORKSPACE</small></p></div><section className="admin-login-card"><p className="admin-kicker">VISION 2034</p><h1>{recovery ? 'Set a new password.' : 'Welcome back.'}</h1><p>{recovery ? 'Choose a strong password for your admin account.' : 'Your campaign. Your stories. One place to manage it all.'}</p>{!configured && <div className="admin-info"><strong>Database connection needed</strong><p>Configure the campaign’s Supabase connection and administrator account to enable login. Setup instructions are in docs/ADMIN_SETUP.md.</p></div>}<form onSubmit={recovery ? updatePassword : login}>{!recovery && <label className="admin-field"><span>Email address</span><input type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} required disabled={!configured} /></label>}<label className="admin-field"><span>{recovery ? 'New password' : 'Password'}</span><input type="password" autoComplete={recovery ? 'new-password' : 'current-password'} minLength={recovery ? 12 : undefined} value={password} onChange={e => setPassword(e.target.value)} required disabled={!configured} /></label><button className="admin-button admin-button-primary" type="submit" disabled={busy || !configured}>{busy ? 'Please wait…' : recovery ? 'Update password' : 'Sign in'}<ExternalLink size={16} /></button></form>{!recovery && <button type="button" className="admin-text-button" onClick={resetPassword} disabled={busy || !configured}>Forgot password?</button>}{error && <p className="admin-error" role="alert">{error}</p>}{message && <p className="admin-success" role="status">{message}</p>}</section><Link href="/en" className="admin-return">← Back to the campaign website</Link></main>;

  return <div className="admin-shell"><aside className="admin-sidebar"><Link href="/admin" className="admin-brand"><span className="admin-star">★</span><span>DEEQ AFRIKA<small>CAMPAIGN WORKSPACE</small></span></Link><nav aria-label="Campaign administration">{navigation.map(item => <button disabled={busy} key={item.id} type="button" className={area === item.id ? 'active' : ''} onClick={() => navigate(item.id)}><item.icon size={19} />{item.label}</button>)}</nav><div className="admin-sidebar-bottom"><a href="/en" target="_blank" rel="noreferrer"><ExternalLink size={17} />Open website</a><p>{account}</p><button type="button" onClick={async () => { if (leave()) { await browserClient().auth.signOut(); setDirty(false); } }}><LogOut size={17} />Sign out</button></div></aside><main className="admin-main"><header className="admin-topbar"><span>Campaign / {title}</span><span className="admin-connected"><i />Workspace connected</span></header><div className="admin-workspace"><header className="admin-heading"><div><p className="admin-kicker">DEEQ AFRIKA · VISION 2034</p><h1>{title}</h1><p>{area === 'overview' ? 'Keep the campaign moving, one story at a time.' : area === 'pages' ? 'Edit your English and Somali pages, images and shared website content.' : area === 'news' ? 'Create, preview and publish campaign stories in both languages.' : area === 'registrations' ? 'People who have signed up to support the campaign.' : area === 'donations' ? 'Manage verified receiving accounts and payment instructions.' : 'Show the organisations backing your vision.'}</p></div>{(area === 'pages' || (area === 'news' && draft)) && <div className="admin-languages" aria-label="Editing language">{(['en', 'so'] as const).map(l => <button disabled={busy} type="button" key={l} className={lang === l ? 'active' : ''} onClick={() => language(l)}>{l === 'en' ? 'English' : 'Soomaali'}</button>)}</div>}</header>
      {error && <p className="admin-error" role="alert">{error}</p>}{message && <p className="admin-success" role="status">{message}</p>}
      {area === 'overview' && <><div className="admin-stat-grid"><button onClick={() => navigate('pages')}><span>Bilingual website</span><strong>7 pages</strong><small>English + Somali</small></button><button onClick={() => navigate('news')}><span>Published stories</span><strong>{publishedCount}</strong><small>{posts.length} saved drafts</small></button><button onClick={() => navigate('donations')}><span>Get involved</span><strong>Connect</strong><small>Signups, donations & supporters</small></button></div><section className="admin-welcome"><div><p className="admin-kicker">YOUR NEXT CHAPTER</p><h2>Give the campaign<br />a voice.</h2><p>Share a match-day story, a community visit or the next step in Vision 2034. Build it with photographs, words and video.</p><button className="admin-button admin-button-primary" onClick={() => { navigate('news'); setDraft(newDocument(`post-${crypto.randomUUID()}-draft`, 'post', null, blankPost())); }}><Plus size={18} />Write an update</button></div><Image src="/images/deeq-kids-united.jpg" alt="Deeq Afrika with young footballers" width={450} height={480} /></section></>}
      {area === 'news' && !draft && <><div className="admin-list-toolbar"><span>{posts.length} stories</span><button className="admin-button admin-button-primary" onClick={() => setDraft(newDocument(`post-${crypto.randomUUID()}-draft`, 'post', null, blankPost()))}><Plus size={17} />New post</button></div>{!posts.length && <div className="admin-empty"><Newspaper size={36} /><h2>Your first story starts here.</h2><p>Add a headline, photos and a YouTube video, then publish in English and Somali.</p></div>}<div className="admin-post-list">{posts.map(item => { const post = item.data as Post; const liveId = item.id.replace(/-draft$/, '-published'); const live = documents.some(d => d.id === liveId); return <article key={item.id}><div>{post.coverImage ? <Image src={post.coverImage} alt="" width={110} height={85} unoptimized /> : <Newspaper size={28} />}</div><div><span className={`admin-badge ${live ? 'published' : ''}`}>{live ? 'Published' : 'Draft'}</span><h3>{post.translations.en.title || 'Untitled story'}</h3><small>{post.slug}</small></div><button className="admin-button admin-button-secondary" onClick={() => setDraft(structuredClone(item))}>Edit</button>{live && <button className="admin-text-button" disabled={busy} onClick={() => unpublish(liveId)}>Unpublish</button>}</article>; })}</div></>}
      {draft && <><div className="admin-savebar"><div><span className="admin-badge">{dirty ? 'Unsaved changes' : draft.revision ? `Saved · revision ${draft.revision}` : 'New draft'}</span><small>{draft.kind === 'content' ? 'Publishing updates this language across the website.' : draft.kind === 'settings' ? 'Donation methods and supporting entities publish together.' : 'Both language versions publish together.'}</small></div><div>{draft.kind === 'post' && <button className="admin-button admin-button-secondary" type="button" onClick={() => setPreview(true)}><Eye size={16} />Preview</button>}<button className="admin-button admin-button-secondary" type="button" disabled={busy} onClick={() => save(false)}><Save size={16} />Save draft</button><button className="admin-button admin-button-primary" type="button" disabled={busy} onClick={() => save(true)}><Send size={16} />{busy ? 'Saving…' : 'Publish'}</button></div></div>
      {area === 'pages' && <div className="admin-page-layout"><nav aria-label="Page and section selector">{groups.map(key => <button key={key} type="button" className={group === key ? 'active' : ''} onClick={() => setGroup(key)}>{key === 'images' ? 'All page images' : key === 'participation' ? 'Get involved labels' : humanize(key)}</button>)}</nav><section className="admin-editor-panel"><h2>{humanize(group)}</h2><ContentFields path={group} value={(draft.data as CampaignContent)[group]} onChange={value => change({ ...(draft.data as CampaignContent), [group]: value })} /></section></div>}
      {area === 'news' && <section className="admin-editor-panel"><button type="button" className="admin-text-button" onClick={() => { if (leave()) { setDraft(null); setDirty(false); } }}>← All posts</button><PostEditor post={draft.data as Post} onChange={change} lang={lang} /></section>}
      {(area === 'donations' || area === 'backers') && <section className="admin-editor-panel"><SettingsEditor settings={draft.data as CampaignSettings} onChange={change} mode={area} /></section>}</>}
      {area === 'registrations' && <><div className="admin-list-toolbar"><span>{total} registrations</span><div><button disabled={busy} className="admin-button admin-button-secondary" onClick={() => loadRegistrations(page)}><RefreshCw size={16} />Refresh</button><button disabled={busy} className="admin-button admin-button-primary" onClick={exportRegistrations}><Download size={16} />Export CSV</button></div></div>{!registrations.length && <div className="admin-empty"><Users size={36} /><h2>No registrations yet.</h2><p>New signups from Get Involved will appear here.</p></div>}<div className="admin-registration-list">{registrations.map(person => <details key={person.id}><summary><strong>{person.name}</strong><span>{person.region}</span><span>{new Date(person.created_at).toLocaleDateString()}</span></summary><dl><dt>Email</dt><dd><a href={`mailto:${person.email}`}>{person.email}</a></dd><dt>Phone</dt><dd>{person.phone || '—'}</dd><dt>Interest</dt><dd>{person.role}</dd><dt>Message</dt><dd>{person.message || '—'}</dd><dt>Contact consent</dt><dd>{person.consent_text} · {new Date(person.consent_at).toLocaleString()}</dd></dl><button type="button" className="admin-text-button danger" disabled={busy} onClick={() => removeRegistration(person.id)}>Remove registration</button></details>)}</div><div className="admin-pagination"><button className="admin-button admin-button-secondary" disabled={busy || page === 0} onClick={() => loadRegistrations(page - 1)}>Previous</button><span>Page {page + 1}</span><button className="admin-button admin-button-secondary" disabled={busy || (page + 1) * 100 >= total} onClick={() => loadRegistrations(page + 1)}>Next</button></div></>}
    </div></main>{preview && draft?.kind === 'post' && <div className="admin-dialog-backdrop"><section className="admin-dialog admin-story-preview" role="dialog" aria-modal="true" aria-label="Story preview"><header><strong>Draft preview · {lang === 'en' ? 'English' : 'Somali'}</strong><button className="admin-icon-button" onClick={() => setPreview(false)} aria-label="Close preview"><X /></button></header><h1>{(draft.data as Post).translations[lang].title || 'Your headline'}</h1><p>{(draft.data as Post).translations[lang].excerpt}</p>{(draft.data as Post).coverImage && <Image className="admin-preview-cover" src={(draft.data as Post).coverImage} alt={(draft.data as Post).translations[lang].coverAlt} width={1000} height={550} unoptimized />}<StoryBody blocks={(draft.data as Post).translations[lang].blocks} playLabel={content[lang].participation.videoConsent} notice={content[lang].participation.videoNotice} /></section></div>}</div>;
}
