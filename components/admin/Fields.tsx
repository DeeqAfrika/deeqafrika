'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Upload, X, ImageIcon, Plus, Trash2 } from 'lucide-react';
import { adminRequest } from '@/lib/cms/browser';
import { bundledAssets } from '@/lib/cms/assets';

export function Field({ label, value, onChange, multiline = false, type = 'text', hint }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean; type?: string; hint?: string }) {
  return <label className="admin-field"><span>{label}</span>{multiline ? <textarea value={value} rows={value.length > 180 ? 5 : 3} onChange={event => onChange(event.target.value)} /> : <input type={type} value={value} onChange={event => onChange(event.target.value)} />}{hint && <small>{hint}</small>}</label>;
}
export function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const [assets, setAssets] = useState(bundledAssets);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function showLibrary() {
    setOpen(true); setError('');
    try { const result = await adminRequest('media'); setAssets(result.assets); } catch (e) { setError(e instanceof Error ? e.message : 'Unable to load uploads.'); }
  }
  async function upload(file?: File) {
    if (!file) return;
    setBusy(true); setError('');
    try {
      const body = new FormData(); body.set('file', file);
      const asset = await adminRequest('media', { method: 'POST', body });
      onChange(asset.url); setOpen(false);
    } catch (e) { setError(e instanceof Error ? e.message : 'Upload failed.'); }
    finally { setBusy(false); }
  }
  return <div className="admin-image-field"><span className="admin-label">{label}</span><button className="image-picker-trigger" onClick={showLibrary} type="button">{value ? <Image src={value} alt="Selected image preview" width={360} height={180} unoptimized /> : <ImageIcon size={28} />}<span>{value ? 'Change image' : 'Choose image'}</span></button>{open && <div className="admin-dialog-backdrop"><section className="admin-dialog" role="dialog" aria-modal="true" aria-label="Choose an image"><header><div><h2>Media library</h2><p>Choose a campaign photo or upload your own.</p></div><button className="admin-icon-button" type="button" onClick={() => setOpen(false)} aria-label="Close media library"><X /></button></header><label className="admin-upload"><Upload size={18} />{busy ? 'Uploading…' : 'Upload image'}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" disabled={busy} onChange={e => upload(e.target.files?.[0])} /></label><p className="admin-help">JPG, PNG, WebP or GIF · up to 8 MB. Uploaded images are public campaign assets.</p>{error && <p className="admin-error" role="alert">{error}</p>}<div className="admin-asset-grid">{assets.map(asset => <button type="button" key={asset.url} onClick={() => { onChange(asset.url); setOpen(false); }}><Image src={asset.url} alt={asset.name} width={240} height={160} unoptimized /><span>{asset.name}</span></button>)}</div></section></div>}</div>;
}
export function humanize(text: string) { return text.replace(/([a-z])([A-Z])/g, '$1 $2').replaceAll('_', ' ').replace(/^./, c => c.toUpperCase()); }
export function ContentFields({ value, onChange, path = '' }: { value: unknown; onChange: (value: unknown) => void; path?: string }) {
  if (typeof value === 'string') {
    const key = path.split('.').at(-1) || 'Text';
    if (['src', 'image'].includes(key)) return <ImageField label="Image" value={value} onChange={onChange} />;
    return <Field label={humanize(key)} value={value} onChange={onChange} multiline={value.length > 100 || ['body', 'intro', 'description', 'quote', 'statement', 'success', 'privacy'].includes(key)} hint={key === 'position' ? 'Horizontal and vertical focus, e.g. 50% 30%. Lower vertical values keep faces near the top.' : undefined} />;
  }
  if (Array.isArray(value)) {
    const fixed = ['about.journey', 'plan.policies'].includes(path);
    return <div className="admin-repeater">{value.map((item, index) => <section className="admin-repeater-item" key={index}><header><strong>{humanize(path.split('.').at(-1) || 'Item')} {index + 1}</strong>{!fixed && value.length > 1 && <button type="button" className="admin-icon-button" aria-label={`Remove item ${index + 1}`} onClick={() => onChange(value.filter((_, i) => i !== index))}><Trash2 size={16} /></button>}</header><ContentFields value={item} path={`${path}.${index}`} onChange={next => onChange(value.map((old, i) => i === index ? next : old))} /></section>)}{!fixed && value.length < 100 && <button className="admin-button admin-button-secondary" type="button" onClick={() => onChange([...value, structuredClone(value[0])])}><Plus size={16} />Add item</button>}</div>;
  }
  if (value && typeof value === 'object') return <div className="admin-fields">{Object.entries(value).map(([key, item]) => {
    if (['lang', 'locale', 'languageName'].includes(key)) return null;
    const childPath = path ? `${path}.${key}` : key;
    return typeof item === 'object' && item !== null ? <details className="admin-field-group" key={key} open={path.split('.').length < 2}><summary>{humanize(key)}</summary><ContentFields value={item} path={childPath} onChange={next => onChange({ ...value, [key]: next })} /></details> : <ContentFields key={key} value={item} path={childPath} onChange={next => onChange({ ...value, [key]: next })} />;
  })}</div>;
  return null;
}
