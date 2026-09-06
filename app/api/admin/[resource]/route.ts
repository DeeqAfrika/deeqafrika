import { z } from 'zod';
import { checkOrigin, errorResponse, HttpError, requireAdmin } from '@/lib/cms/auth';
import { validateDocument } from '@/lib/cms/validation';
import { bundledAssets, imageMime } from '@/lib/cms/assets';

export const dynamic = 'force-dynamic';
type Context = { params: Promise<{ resource: string }> };
export async function GET(request: Request, { params }: Context) {
  try {
    const { db, user } = await requireAdmin(request);
    const { resource } = await params;
    if (resource === 'session') return Response.json({ email: user.email }, { headers: { 'Cache-Control': 'no-store' } });
    if (resource === 'documents') {
      const { data, error } = await db.from('campaign_documents').select('*').order('updated_at', { ascending: false }).limit(1000);
      if (error) throw error;
      return Response.json({ documents: data }, { headers: { 'Cache-Control': 'no-store' } });
    }
    if (resource === 'supporters') {
      const page = Math.max(0, Math.min(100000, Number(new URL(request.url).searchParams.get('page')) || 0));
      const { data, count, error } = await db.from('campaign_supporters').select('*', { count: 'exact' }).order('created_at', { ascending: false }).range(page * 100, page * 100 + 99);
      if (error) throw error;
      return Response.json({ supporters: data, count, page }, { headers: { 'Cache-Control': 'no-store' } });
    }
    if (resource === 'media') {
      const { data, error } = await db.storage.from('campaign-media').list('uploads', { limit: 1000, sortBy: { column: 'created_at', order: 'desc' } });
      if (error) throw error;
      const uploaded = data.filter(item => item.id).map(item => ({ name: item.name, url: db.storage.from('campaign-media').getPublicUrl(`uploads/${item.name}`).data.publicUrl }));
      return Response.json({ assets: [...uploaded, ...bundledAssets] }, { headers: { 'Cache-Control': 'no-store' } });
    }
    throw new HttpError(404, 'Not found.');
  } catch (error) { return errorResponse(error); }
}
const saveSchema = z.object({ id: z.string().regex(/^(content-(en|so)|settings|post-[a-f0-9-]{36})-draft$/), kind: z.enum(['content', 'post', 'settings']), locale: z.enum(['en', 'so']).nullable(), revision: z.number().int().min(0), data: z.unknown(), publish: z.boolean() }).strict();
export async function POST(request: Request, { params }: Context) {
  try {
    checkOrigin(request);
    const { db } = await requireAdmin(request);
    const { resource } = await params;
    if (resource === 'media') {
      if (Number(request.headers.get('content-length')) > 9 * 1024 * 1024) throw new HttpError(413, 'Images must be smaller than 8 MB.');
      const form = await request.formData();
      const file = form.get('file');
      if (!(file instanceof File) || file.size === 0 || file.size > 8 * 1024 * 1024) throw new HttpError(400, 'Choose a JPG, PNG, WebP or GIF under 8 MB.');
      const bytes = new Uint8Array(await file.arrayBuffer());
      const mime = imageMime(bytes);
      if (!mime || mime !== file.type) throw new HttpError(400, 'Only valid JPG, PNG, WebP and GIF images are accepted.');
      const extension = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' }[mime];
      const name = `${crypto.randomUUID()}.${extension}`;
      const { error } = await db.storage.from('campaign-media').upload(`uploads/${name}`, bytes, { contentType: mime, cacheControl: '31536000', upsert: false });
      if (error) throw error;
      return Response.json({ name, url: db.storage.from('campaign-media').getPublicUrl(`uploads/${name}`).data.publicUrl });
    }
    if (resource === 'documents') {
      const raw = await request.text();
      if (raw.length > 1500000) throw new HttpError(413, 'This document is too large.');
      const parsed = saveSchema.safeParse(JSON.parse(raw));
      if (!parsed.success) throw new HttpError(400, 'Invalid document. Reload the editor and try again.');
      const input = parsed.data;
      const expectedId = input.kind === 'content' ? `content-${input.locale}-draft` : input.kind === 'settings' ? 'settings-draft' : input.id;
      if (input.id !== expectedId || (input.kind !== 'content' && input.locale !== null) || (input.kind === 'post' && !input.id.startsWith('post-'))) throw new HttpError(400, 'Document identity does not match its type.');
      let value;
      try { value = validateDocument(input.kind, input.data, input.locale, input.publish); } catch (error) { throw new HttpError(400, error instanceof Error ? error.message : 'Check the content fields.'); }
      const { data, error } = await db.rpc('save_campaign_document', { p_id: input.id, p_kind: input.kind, p_locale: input.locale, p_data: value, p_revision: input.revision, p_publish: input.publish });
      if ((error?.code === 'PT409' || error?.code === '40001')) throw new HttpError(409, 'Someone saved a newer version. Reload the editor before saving again.');
      if (error?.code === '23505') throw new HttpError(409, 'Another published post already uses that URL slug. Choose a different slug.');
      if (error) throw error;
      return Response.json({ document: data });
    }
    if (resource === 'unpublish') {
      const { id } = z.object({ id: z.string().regex(/^post-[a-f0-9-]{36}-published$/) }).parse(await request.json());
      const { error } = await db.from('campaign_documents').delete().eq('id', id).eq('status', 'published');
      if (error) throw error;
      return Response.json({ ok: true });
    }
    throw new HttpError(404, 'Not found.');
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof z.ZodError) return Response.json({ error: 'Invalid request.' }, { status: 400 });
    return errorResponse(error);
  }
}
export async function DELETE(request: Request, { params }: Context) {
  try {
    checkOrigin(request);
    const { db } = await requireAdmin(request);
    const { resource } = await params;
    if (resource !== 'supporters') throw new HttpError(404, 'Not found.');
    const { id } = z.object({ id: z.string().uuid() }).parse(await request.json());
    const { error } = await db.from('campaign_supporters').delete().eq('id', id);
    if (error) throw error;
    return Response.json({ ok: true });
  } catch (error) { return errorResponse(error); }
}
