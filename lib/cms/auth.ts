import { publicClient, cmsConfigured } from './supabase';
export class HttpError extends Error { constructor(public status: number, message: string) { super(message); } }
export function checkOrigin(request: Request) {
  const origin = request.headers.get('origin');
  const expected = process.env.SITE_URL ? new URL(process.env.SITE_URL).origin : new URL(request.url).origin;
  if (!origin || origin !== expected) throw new HttpError(403, 'Request origin is not allowed.');
}
export async function requireAdmin(request: Request) {
  if (!cmsConfigured()) throw new HttpError(503, 'Connect the campaign database to enable administration.');
  const token = request.headers.get('authorization')?.match(/^Bearer (.+)$/)?.[1];
  if (!token) throw new HttpError(401, 'Please sign in.');
  const db = publicClient(token);
  const { data: { user }, error } = await db.auth.getUser(token);
  if (error || !user) throw new HttpError(401, 'Your session has expired. Please sign in again.');
  const { data: admin, error: adminError } = await db.from('campaign_admins').select('user_id').eq('user_id', user.id).maybeSingle();
  if (adminError || !admin) throw new HttpError(403, 'This account does not have campaign administrator access.');
  return { db, user };
}
export function errorResponse(error: unknown) {
  if (error instanceof HttpError) return Response.json({ error: error.message }, { status: error.status });
  console.error('Campaign API request failed', error instanceof Error ? error.message : 'Unknown error');
  return Response.json({ error: 'The request could not be completed. Please try again.' }, { status: 500 });
}
