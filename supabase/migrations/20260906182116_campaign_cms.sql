create table public.campaign_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.campaign_admins enable row level security;
revoke all on public.campaign_admins from anon, authenticated;
grant select on public.campaign_admins to authenticated;
grant all on public.campaign_admins to service_role;
create policy "Admin can read own membership" on public.campaign_admins for select to authenticated using (user_id = (select auth.uid()));

create table public.campaign_documents (
  id text primary key,
  kind text not null check (kind in ('content','post','settings')),
  locale text check (locale in ('en','so')),
  status text not null check (status in ('draft','published')),
  data jsonb not null check (jsonb_typeof(data) = 'object'),
  revision integer not null default 1 check (revision > 0),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null,
  check ((kind = 'content' and locale is not null) or (kind <> 'content' and locale is null))
);
create index campaign_documents_feed on public.campaign_documents(kind,status,updated_at desc);
create unique index campaign_post_slug on public.campaign_documents((data->>'slug')) where kind = 'post' and status = 'published';
create index campaign_documents_updated_by on public.campaign_documents(updated_by);
alter table public.campaign_documents enable row level security;
revoke all on public.campaign_documents from anon, authenticated;
grant select on public.campaign_documents to anon, authenticated;
grant insert, update, delete on public.campaign_documents to authenticated;
grant all on public.campaign_documents to service_role;
create policy "Visitors read published content" on public.campaign_documents for select to anon, authenticated using (status = 'published');
create policy "Campaign administrators manage content" on public.campaign_documents for all to authenticated
  using (exists(select 1 from public.campaign_admins where user_id = (select auth.uid())))
  with check (exists(select 1 from public.campaign_admins where user_id = (select auth.uid())));

create table public.campaign_supporters (
  id uuid primary key default gen_random_uuid(),
  name text not null check(length(name) between 2 and 120),
  email text not null unique check(length(email) <= 254),
  phone text not null default '' check(length(phone) <= 40),
  region text not null check(length(region) between 2 and 120),
  role text not null check(length(role) between 1 and 120),
  message text not null default '' check(length(message) <= 3000),
  locale text not null check(locale in ('en','so')),
  consent_at timestamptz not null,
  consent_text text not null,
  created_at timestamptz not null default now()
);
alter table public.campaign_supporters enable row level security;
revoke all on public.campaign_supporters from anon, authenticated;
grant select, delete on public.campaign_supporters to authenticated;
grant all on public.campaign_supporters to service_role;
create policy "Administrators read registrations" on public.campaign_supporters for select to authenticated using (exists(select 1 from public.campaign_admins where user_id = (select auth.uid())));
create policy "Administrators remove registrations" on public.campaign_supporters for delete to authenticated using (exists(select 1 from public.campaign_admins where user_id = (select auth.uid())));

create table public.campaign_rate_limits (
  key text primary key,
  window_start timestamptz not null default now(),
  attempts integer not null default 1
);
alter table public.campaign_rate_limits enable row level security;
revoke all on public.campaign_rate_limits from anon, authenticated;
grant all on public.campaign_rate_limits to service_role;

-- SECURITY INVOKER: this function never bypasses the document table's RLS.
-- Saving and publication share one transaction. The supplied revision prevents lost updates.
create function public.save_campaign_document(p_id text, p_kind text, p_locale text, p_data jsonb, p_revision integer, p_publish boolean default false)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare saved public.campaign_documents; public_id text;
begin
  if auth.uid() is null or not exists(select 1 from public.campaign_admins where user_id = auth.uid()) then raise insufficient_privilege; end if;
  if p_id !~ '^(content-(en|so)|settings|post-[a-f0-9-]{36})-draft$' then raise exception 'Invalid document identity'; end if;
  if p_revision = 0 then
    insert into public.campaign_documents(id,kind,locale,status,data,updated_by)
    values(p_id,p_kind,p_locale,'draft',p_data,auth.uid()) on conflict(id) do nothing returning * into saved;
  else
    update public.campaign_documents set data=p_data,revision=revision+1,updated_at=now(),updated_by=auth.uid()
      where id=p_id and kind=p_kind and locale is not distinct from p_locale and status='draft' and revision=p_revision returning * into saved;
  end if;
  if saved.id is null then raise exception using errcode='40001', message='A newer document revision exists'; end if;
  if p_publish then
    public_id := regexp_replace(p_id,'-draft$','-published');
    insert into public.campaign_documents(id,kind,locale,status,data,updated_by)
      values(public_id,p_kind,p_locale,'published',p_data,auth.uid())
      on conflict(id) do update set data=excluded.data, revision=campaign_documents.revision+1,updated_at=now(),updated_by=auth.uid();
  end if;
  return to_jsonb(saved);
end;
$$;
revoke all on function public.save_campaign_document(text,text,text,jsonb,integer,boolean) from public, anon;
grant execute on function public.save_campaign_document(text,text,text,jsonb,integer,boolean) to authenticated;

-- Only the server's secret API key can invoke this atomic, persistent rate limiter.
create function public.campaign_signup_rate_limit(p_key text) returns boolean
language plpgsql security invoker set search_path = '' as $$
declare count_now integer;
begin
  delete from public.campaign_rate_limits where window_start < now() - interval '1 day';
  insert into public.campaign_rate_limits(key) values(p_key)
    on conflict(key) do update set
      attempts = case when campaign_rate_limits.window_start < now() - interval '15 minutes' then 1 else campaign_rate_limits.attempts+1 end,
      window_start = case when campaign_rate_limits.window_start < now() - interval '15 minutes' then now() else campaign_rate_limits.window_start end
    returning attempts into count_now;
  return count_now <= 5;
end;
$$;
revoke all on function public.campaign_signup_rate_limit(text) from public, anon, authenticated;
grant execute on function public.campaign_signup_rate_limit(text) to service_role;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('campaign-media','campaign-media',true,8388608,array['image/jpeg','image/png','image/webp','image/gif']);
create policy "Administrators list campaign media" on storage.objects for select to authenticated
  using(bucket_id='campaign-media' and exists(select 1 from public.campaign_admins where user_id=(select auth.uid())));
create policy "Administrators upload campaign media" on storage.objects for insert to authenticated
  with check(bucket_id='campaign-media' and exists(select 1 from public.campaign_admins where user_id=(select auth.uid())));
