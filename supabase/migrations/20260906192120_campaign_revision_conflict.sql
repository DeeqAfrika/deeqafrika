-- Use an HTTP conflict code rather than a retriable serialization failure.
create or replace function public.save_campaign_document(p_id text, p_kind text, p_locale text, p_data jsonb, p_revision integer, p_publish boolean default false)
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
  if saved.id is null then raise exception using errcode='PT409', message='A newer document revision exists'; end if;
  if p_publish then
    public_id := regexp_replace(p_id,'-draft$','-published');
    insert into public.campaign_documents(id,kind,locale,status,data,updated_by)
      values(public_id,p_kind,p_locale,'published',p_data,auth.uid())
      on conflict(id) do update set data=excluded.data, revision=campaign_documents.revision+1,updated_at=now(),updated_by=auth.uid();
  end if;
  return to_jsonb(saved);
end;
$$;
