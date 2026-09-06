'use client';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
let client: SupabaseClient | undefined;
export function browserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error('Campaign database is not configured.');
  return client ??= createClient(url, key);
}
export async function adminRequest(resource: string, init: RequestInit = {}) {
  const { data: { session } } = await browserClient().auth.getSession();
  if (!session) throw new Error('Please sign in again.');
  const response = await fetch(`/api/admin/${resource}`, { ...init, headers: { ...(init.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }), ...init.headers, Authorization: `Bearer ${session.access_token}` } });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'The request could not be completed.');
  return result;
}
