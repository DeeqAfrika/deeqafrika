import { AdminApp } from '@/components/admin/AdminApp';
import { cmsConfigured } from '@/lib/cms/supabase';
export const dynamic = 'force-dynamic';
export default function AdminPage() { return <AdminApp configured={cmsConfigured()} />; }
