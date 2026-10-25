-- StudyBuddy Web — initial schema
-- Profiles, study progress, gamification, subject unlocks (admin-controlled), connections, site settings.
-- Security model:
--   * students can only edit safe profile columns (coins/rank/streak are written by award_activity() only)
--   * subject_unlocks can only be written by admins (via admin_set_unlock())
--   * emails/phones live in student_private (owner + admins only)

create extension if not exists pgcrypto;

-- ───────────────────────── helpers ─────────────────────────

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  added_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

create or replace function public.rank_for(p_coins int)
returns text
language sql
immutable
as $$
  select case
    when p_coins >= 8000 then 'Champion'
    when p_coins >= 5000 then 'Platinum'
    when p_coins >= 2500 then 'Gold'
    when p_coins >= 1000 then 'Silver'
    else 'Bronze'
  end;
$$;

-- ───────────────────────── catalog ─────────────────────────

create table if not exists public.subjects (
  id text primary key,
  name text not null,
  level text not null default 'O/L',
  grade_chapters jsonb not null default '{}'::jsonb, -- {"10": 30, "11": 32}
  free_chapters int not null default 1,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

insert into public.subjects (id, name, level, grade_chapters, free_chapters, is_published, sort_order)
values ('islam-ol', 'Islam', 'O/L', '{"10": 30, "11": 32}', 1, true, 1)
on conflict (id) do update set grade_chapters = excluded.grade_chapters;

-- ───────────────────────── profiles ─────────────────────────

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text,
  display_name text not null default 'Student',
  student_code text not null unique,
  education_level text not null default 'O/L' check (education_level in ('O/L', 'A/L')),
  grade int not null default 10 check (grade in (10, 11, 12, 13)),
  medium text not null default 'Tamil',
  province text,
  bio text not null default '',
  headline text not null default '',
  avatar_url text,
  onboarded boolean not null default false,
  coins int not null default 0 check (coins >= 0),
  streak_days int not null default 0 check (streak_days >= 0),
  current_rank text not null default 'Bronze',
  lifetime_earned int not null default 0,
  last_activity_day date,
  badge_codes text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint username_format check (username is null or username ~ '^[a-z0-9_]{3,20}$'),
  constraint display_name_len check (char_length(display_name) between 1 and 60),
  constraint bio_len check (char_length(bio) <= 280),
  constraint headline_len check (char_length(headline) <= 80)
);

create unique index if not exists profiles_username_lower_idx
  on public.profiles (lower(username)) where username is not null;
create index if not exists profiles_coins_idx on public.profiles (coins desc);

create table if not exists public.student_private (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  email text,
  phone text,
  created_at timestamptz not null default now(),
  constraint phone_len check (phone is null or char_length(phone) <= 20)
);

-- ───────────────────────── progress ─────────────────────────

create table if not exists public.study_completions (
  user_id uuid not null references public.profiles(id) on delete cascade,
  item_id text not null,           -- chapter id e.g. islam-ol-10-01
  kind text not null check (kind in ('lesson', 'flashcards', 'quiz', 'pastpaper')),
  score_percent int,
  coins_awarded int not null default 0,
  completed_at timestamptz not null default now(),
  primary key (user_id, item_id, kind)
);
create index if not exists study_completions_recent_idx on public.study_completions (completed_at desc);

-- ───────────────────────── unlocks ─────────────────────────

create table if not exists public.subject_unlocks (
  user_id uuid not null references public.profiles(id) on delete cascade,
  subject_id text not null references public.subjects(id) on delete cascade,
  unlocked_by uuid references auth.users(id) on delete set null,
  note text not null default '',
  unlocked_at timestamptz not null default now(),
  primary key (user_id, subject_id)
);

create table if not exists public.unlock_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  subject_id text not null,
  action text not null check (action in ('unlock', 'lock')),
  admin_id uuid references auth.users(id) on delete set null,
  note text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.unlock_requests (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  subject_id text not null references public.subjects(id) on delete cascade,
  phone text,
  message text not null default '',
  status text not null default 'pending' check (status in ('pending', 'done', 'dismissed')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz,
  constraint message_len check (char_length(message) <= 500)
);
create unique index if not exists unlock_requests_one_pending
  on public.unlock_requests (user_id, subject_id) where status = 'pending';

-- ───────────────────────── social ─────────────────────────

create table if not exists public.student_connections (
  from_user_id uuid not null references public.profiles(id) on delete cascade,
  to_user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null check (status in ('pending', 'accepted')),
  created_at timestamptz not null default now(),
  primary key (from_user_id, to_user_id),
  check (from_user_id <> to_user_id)
);

-- ───────────────────────── settings ─────────────────────────

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (key, value) values
  ('contact', '{"whatsapp": "", "message": "Hi! I would like to unlock a subject on StudyBuddy. My student code is"}'),
  ('announcement', '{"text": "", "active": false}')
on conflict (key) do nothing;

-- ───────────────────────── RLS ─────────────────────────

alter table public.admin_users enable row level security;
alter table public.subjects enable row level security;
alter table public.profiles enable row level security;
alter table public.student_private enable row level security;
alter table public.study_completions enable row level security;
alter table public.subject_unlocks enable row level security;
alter table public.unlock_events enable row level security;
alter table public.unlock_requests enable row level security;
alter table public.student_connections enable row level security;
alter table public.site_settings enable row level security;

-- admin_users: admins can see the list; writes only through admin_add_admin()
drop policy if exists admin_users_read on public.admin_users;
create policy admin_users_read on public.admin_users for select to authenticated
  using (public.is_admin() or user_id = auth.uid());

-- subjects: public catalog
drop policy if exists subjects_read on public.subjects;
create policy subjects_read on public.subjects for select to anon, authenticated using (true);
drop policy if exists subjects_admin_write on public.subjects;
create policy subjects_admin_write on public.subjects for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- profiles: readable by signed-in students (leaderboard/search); own row editable (safe columns only, see grants)
drop policy if exists profiles_read on public.profiles;
create policy profiles_read on public.profiles for select to authenticated using (true);
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles for update to authenticated
  using (auth.uid() = id) with check (auth.uid() = id);

revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
grant update (username, display_name, education_level, grade, medium, province, bio, headline, avatar_url, onboarded, updated_at)
  on public.profiles to authenticated;

-- student_private: owner + admins
drop policy if exists private_own_read on public.student_private;
create policy private_own_read on public.student_private for select to authenticated
  using (auth.uid() = user_id or public.is_admin());
drop policy if exists private_own_update on public.student_private;
create policy private_own_update on public.student_private for update to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
revoke all on public.student_private from anon, authenticated;
grant select on public.student_private to authenticated;
grant update (phone) on public.student_private to authenticated;

-- study_completions: owner reads; writes only through award_activity()
drop policy if exists completions_read on public.study_completions;
create policy completions_read on public.study_completions for select to authenticated
  using (auth.uid() = user_id or public.is_admin());
revoke insert, update, delete on public.study_completions from anon, authenticated;

-- subject_unlocks: owner reads; admins read all; writes only through admin_set_unlock()
drop policy if exists unlocks_read on public.subject_unlocks;
create policy unlocks_read on public.subject_unlocks for select to authenticated
  using (auth.uid() = user_id or public.is_admin());
revoke insert, update, delete on public.subject_unlocks from anon, authenticated;

drop policy if exists unlock_events_read on public.unlock_events;
create policy unlock_events_read on public.unlock_events for select to authenticated
  using (public.is_admin());
revoke insert, update, delete on public.unlock_events from anon, authenticated;

-- unlock_requests: students create/see their own; admins see/update all
drop policy if exists requests_read on public.unlock_requests;
create policy requests_read on public.unlock_requests for select to authenticated
  using (auth.uid() = user_id or public.is_admin());
drop policy if exists requests_insert on public.unlock_requests;
create policy requests_insert on public.unlock_requests for insert to authenticated
  with check (auth.uid() = user_id and status = 'pending');
drop policy if exists requests_admin_update on public.unlock_requests;
create policy requests_admin_update on public.unlock_requests for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
revoke delete on public.unlock_requests from anon, authenticated;

-- connections: participants
drop policy if exists connections_read on public.student_connections;
create policy connections_read on public.student_connections for select to authenticated
  using (auth.uid() = from_user_id or auth.uid() = to_user_id);
drop policy if exists connections_insert on public.student_connections;
create policy connections_insert on public.student_connections for insert to authenticated
  with check (auth.uid() = from_user_id and status = 'pending');
drop policy if exists connections_update on public.student_connections;
create policy connections_update on public.student_connections for update to authenticated
  using (auth.uid() = to_user_id) with check (auth.uid() = to_user_id and status = 'accepted');
drop policy if exists connections_delete on public.student_connections;
create policy connections_delete on public.student_connections for delete to authenticated
  using (auth.uid() = from_user_id or auth.uid() = to_user_id);

-- site_settings: public read, admin write
drop policy if exists settings_read on public.site_settings;
create policy settings_read on public.site_settings for select to anon, authenticated using (true);
drop policy if exists settings_admin_write on public.site_settings;
create policy settings_admin_write on public.site_settings for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ───────────────────────── signup trigger ─────────────────────────

create or replace function public.generate_student_code()
returns text
language plpgsql
as $$
declare
  alphabet constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  code text;
begin
  loop
    code := 'SB-';
    for i in 1..6 loop
      code := code || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
    end loop;
    exit when not exists (select 1 from public.profiles where student_code = code);
  end loop;
  return code;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, avatar_url, student_code)
  values (
    new.id,
    left(coalesce(nullif(new.raw_user_meta_data->>'full_name', ''), nullif(new.raw_user_meta_data->>'name', ''), split_part(new.email, '@', 1), 'Student'), 60),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture'),
    public.generate_student_code()
  )
  on conflict (id) do nothing;

  insert into public.student_private (user_id, email)
  values (new.id, new.email)
  on conflict (user_id) do update set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ───────────────────────── access check ─────────────────────────

-- p_item = '<subject>-<grade>-<chapter>' e.g. 'islam-ol-10-01'
create or replace function public.can_access_chapter(p_user uuid, p_item text)
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  m text[];
  s public.subjects;
  max_ch int;
begin
  m := regexp_match(p_item, '^([a-z0-9-]+)-(\d{2})-(\d{2})$');
  if m is null then return false; end if;
  select * into s from public.subjects where id = m[1] and is_published;
  if not found then return false; end if;
  max_ch := coalesce((s.grade_chapters ->> (m[2]::int)::text)::int, 0);
  if m[3]::int < 1 or m[3]::int > max_ch then return false; end if;
  if m[3]::int <= s.free_chapters then return true; end if;
  return exists (select 1 from public.subject_unlocks where user_id = p_user and subject_id = s.id)
      or exists (select 1 from public.admin_users where user_id = p_user);
end;
$$;

-- ───────────────────────── rewards ─────────────────────────

create or replace function public.award_activity(p_kind text, p_item text, p_score int default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  reward int;
  prof public.profiles;
  today date := (now() at time zone 'Asia/Colombo')::date;
  new_streak int;
  new_coins int;
  new_rank text;
  badges text[];
  unlocked text[] := '{}';
  n_lessons int; n_quizzes int; n_flash int; n_past int;
  inserted int;
begin
  if uid is null then raise exception 'not signed in'; end if;
  if p_kind not in ('lesson', 'flashcards', 'quiz', 'pastpaper') then raise exception 'bad kind'; end if;
  if not public.can_access_chapter(uid, p_item) then raise exception 'chapter locked'; end if;

  reward := case p_kind when 'lesson' then 1 when 'flashcards' then 2 else 5 end;

  if p_kind in ('quiz', 'pastpaper') and coalesce(p_score, 0) < 80 then
    return jsonb_build_object('passed', false, 'coins_awarded', 0, 'score', coalesce(p_score, 0));
  end if;

  insert into public.study_completions (user_id, item_id, kind, score_percent, coins_awarded)
  values (uid, p_item, p_kind, least(greatest(p_score, 0), 100), reward)
  on conflict do nothing;
  get diagnostics inserted = row_count;

  select * into prof from public.profiles where id = uid for update;

  if inserted = 0 then
    -- already claimed; keep best score
    update public.study_completions set score_percent = greatest(coalesce(score_percent, 0), least(greatest(p_score, 0), 100))
      where user_id = uid and item_id = p_item and kind = p_kind and p_score is not null;
    return jsonb_build_object('passed', true, 'already', true, 'coins_awarded', 0, 'coins', prof.coins,
      'rank', prof.current_rank, 'streak', prof.streak_days, 'new_badges', '[]'::jsonb);
  end if;

  if prof.last_activity_day = today then
    new_streak := greatest(prof.streak_days, 1);
  elsif prof.last_activity_day = today - 1 then
    new_streak := prof.streak_days + 1;
  else
    new_streak := 1;
  end if;

  new_coins := prof.coins + reward;
  new_rank := public.rank_for(new_coins);
  badges := prof.badge_codes;

  select count(*) filter (where kind = 'lesson'),
         count(*) filter (where kind = 'quiz'),
         count(*) filter (where kind = 'flashcards'),
         count(*) filter (where kind = 'pastpaper')
    into n_lessons, n_quizzes, n_flash, n_past
    from public.study_completions where user_id = uid;

  if n_lessons >= 1 and not ('first_note' = any(badges)) then unlocked := array_append(unlocked, 'first_note'); end if;
  if n_quizzes >= 1 and not ('first_quiz' = any(badges)) then unlocked := array_append(unlocked, 'first_quiz'); end if;
  if n_flash >= 1 and not ('first_flashcards' = any(badges)) then unlocked := array_append(unlocked, 'first_flashcards'); end if;
  if n_lessons >= 5 and not ('five_lessons' = any(badges)) then unlocked := array_append(unlocked, 'five_lessons'); end if;
  if n_quizzes >= 3 and not ('three_quizzes' = any(badges)) then unlocked := array_append(unlocked, 'three_quizzes'); end if;
  if n_past >= 1 and not ('exam_explorer' = any(badges)) then unlocked := array_append(unlocked, 'exam_explorer'); end if;
  if prof.lifetime_earned + reward >= 20 and not ('coin_miner' = any(badges)) then unlocked := array_append(unlocked, 'coin_miner'); end if;
  if new_streak >= 7 and not ('seven_day_streak' = any(badges)) then unlocked := array_append(unlocked, 'seven_day_streak'); end if;
  if new_rank in ('Gold', 'Platinum', 'Champion') and not ('gold_rank' = any(badges)) then unlocked := array_append(unlocked, 'gold_rank'); end if;

  update public.profiles set
    coins = new_coins,
    lifetime_earned = lifetime_earned + reward,
    current_rank = new_rank,
    streak_days = new_streak,
    last_activity_day = today,
    badge_codes = badges || unlocked,
    updated_at = now()
  where id = uid;

  return jsonb_build_object('passed', true, 'already', false, 'coins_awarded', reward, 'coins', new_coins,
    'rank', new_rank, 'streak', new_streak, 'new_badges', to_jsonb(unlocked), 'score', p_score);
end;
$$;

-- ───────────────────────── admin RPCs ─────────────────────────

create or replace function public.admin_set_unlock(p_user uuid, p_subject text, p_unlock boolean, p_note text default '')
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then raise exception 'admins only'; end if;
  if p_unlock then
    insert into public.subject_unlocks (user_id, subject_id, unlocked_by, note)
    values (p_user, p_subject, auth.uid(), coalesce(p_note, ''))
    on conflict (user_id, subject_id) do update set unlocked_by = excluded.unlocked_by, note = excluded.note, unlocked_at = now();
    update public.unlock_requests set status = 'done', resolved_at = now()
      where user_id = p_user and subject_id = p_subject and status = 'pending';
  else
    delete from public.subject_unlocks where user_id = p_user and subject_id = p_subject;
  end if;
  insert into public.unlock_events (user_id, subject_id, action, admin_id, note)
  values (p_user, p_subject, case when p_unlock then 'unlock' else 'lock' end, auth.uid(), coalesce(p_note, ''));
end;
$$;

create or replace function public.admin_list_students(
  p_search text default '',
  p_filter text default 'all',     -- all | unlocked | locked | requested
  p_limit int default 50,
  p_offset int default 0
)
returns table (
  id uuid,
  display_name text,
  username text,
  student_code text,
  email text,
  phone text,
  grade int,
  province text,
  avatar_url text,
  coins int,
  streak_days int,
  current_rank text,
  created_at timestamptz,
  last_activity_day date,
  unlocked_subjects text[],
  pending_requests bigint,
  completions bigint,
  is_admin boolean,
  total_count bigint
)
language plpgsql
stable
security definer
set search_path = public
as $$
#variable_conflict use_column
begin
  if not public.is_admin() then raise exception 'admins only'; end if;
  return query
  with base as (
    select p.*, sp.email, sp.phone,
      coalesce((select array_agg(su.subject_id) from public.subject_unlocks su where su.user_id = p.id), '{}') as unlocked,
      (select count(*) from public.unlock_requests r where r.user_id = p.id and r.status = 'pending') as pending,
      (select count(*) from public.study_completions c where c.user_id = p.id) as comps,
      exists (select 1 from public.admin_users a where a.user_id = p.id) as adm
    from public.profiles p
    left join public.student_private sp on sp.user_id = p.id
    where coalesce(p_search, '') = ''
       or p.display_name ilike '%' || p_search || '%'
       or p.username ilike '%' || p_search || '%'
       or p.student_code ilike '%' || p_search || '%'
       or sp.email ilike '%' || p_search || '%'
       or sp.phone ilike '%' || p_search || '%'
  ), filtered as (
    select * from base b
    where p_filter = 'all'
       or (p_filter = 'unlocked' and cardinality(b.unlocked) > 0)
       or (p_filter = 'locked' and cardinality(b.unlocked) = 0)
       or (p_filter = 'requested' and b.pending > 0)
  )
  select f.id, f.display_name, f.username, f.student_code, f.email, f.phone, f.grade, f.province, f.avatar_url,
         f.coins, f.streak_days, f.current_rank, f.created_at, f.last_activity_day,
         f.unlocked, f.pending, f.comps, f.adm, count(*) over ()
  from filtered f
  order by f.pending desc, f.created_at desc
  limit least(greatest(p_limit, 1), 200) offset greatest(p_offset, 0);
end;
$$;

create or replace function public.admin_stats()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  result jsonb;
begin
  if not public.is_admin() then raise exception 'admins only'; end if;
  select jsonb_build_object(
    'students', (select count(*) from public.profiles),
    'new_this_week', (select count(*) from public.profiles where created_at > now() - interval '7 days'),
    'unlocked_students', (select count(distinct user_id) from public.subject_unlocks),
    'pending_requests', (select count(*) from public.unlock_requests where status = 'pending'),
    'active_today', (select count(*) from public.profiles where last_activity_day = (now() at time zone 'Asia/Colombo')::date),
    'completions_week', (select count(*) from public.study_completions where completed_at > now() - interval '7 days'),
    'signups_by_day', coalesce((
      select jsonb_agg(jsonb_build_object('day', d::date, 'count', (
        select count(*) from public.profiles p where (p.created_at at time zone 'Asia/Colombo')::date = d::date
      )) order by d)
      from generate_series((now() at time zone 'Asia/Colombo')::date - 13, (now() at time zone 'Asia/Colombo')::date, interval '1 day') d
    ), '[]'::jsonb),
    'top_chapters', coalesce((
      select jsonb_agg(t) from (
        select item_id, count(*) as completions from public.study_completions
        group by item_id order by count(*) desc limit 6
      ) t
    ), '[]'::jsonb)
  ) into result;
  return result;
end;
$$;

create or replace function public.admin_student_detail(p_user uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then raise exception 'admins only'; end if;
  return jsonb_build_object(
    'completions', coalesce((select jsonb_agg(c order by c.completed_at desc) from public.study_completions c where c.user_id = p_user), '[]'::jsonb),
    'events', coalesce((select jsonb_agg(e order by e.created_at desc) from public.unlock_events e where e.user_id = p_user), '[]'::jsonb),
    'requests', coalesce((select jsonb_agg(r order by r.created_at desc) from public.unlock_requests r where r.user_id = p_user), '[]'::jsonb)
  );
end;
$$;

create or replace function public.admin_add_admin(p_email text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  target uuid;
begin
  if not public.is_admin() then raise exception 'admins only'; end if;
  select user_id into target from public.student_private where lower(email) = lower(trim(p_email));
  if target is null then raise exception 'No student found with that email. Ask them to sign in once first.'; end if;
  insert into public.admin_users (user_id, added_by) values (target, auth.uid()) on conflict do nothing;
  return target::text;
end;
$$;

create or replace function public.admin_remove_admin(p_user uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then raise exception 'admins only'; end if;
  if p_user = auth.uid() then raise exception 'You cannot remove yourself.'; end if;
  delete from public.admin_users where user_id = p_user;
end;
$$;

-- RPC permissions: signed-in users only
revoke execute on function public.award_activity(text, text, int) from public, anon;
revoke execute on function public.admin_set_unlock(uuid, text, boolean, text) from public, anon;
revoke execute on function public.admin_list_students(text, text, int, int) from public, anon;
revoke execute on function public.admin_stats() from public, anon;
revoke execute on function public.admin_student_detail(uuid) from public, anon;
revoke execute on function public.admin_add_admin(text) from public, anon;
revoke execute on function public.admin_remove_admin(uuid) from public, anon;
revoke execute on function public.can_access_chapter(uuid, text) from public, anon;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
grant execute on function public.award_activity(text, text, int) to authenticated;
grant execute on function public.admin_set_unlock(uuid, text, boolean, text) to authenticated;
grant execute on function public.admin_list_students(text, text, int, int) to authenticated;
grant execute on function public.admin_stats() to authenticated;
grant execute on function public.admin_student_detail(uuid) to authenticated;
grant execute on function public.admin_add_admin(text) to authenticated;
grant execute on function public.admin_remove_admin(uuid) to authenticated;
grant execute on function public.can_access_chapter(uuid, text) to authenticated;

-- Public activity counts for profile pages (no item details exposed)
create or replace function public.profile_counts(p_user uuid)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'lessons', count(*) filter (where kind = 'lesson'),
    'quizzes', count(*) filter (where kind = 'quiz'),
    'flashcards', count(*) filter (where kind = 'flashcards'),
    'pastpapers', count(*) filter (where kind = 'pastpaper')
  )
  from public.study_completions where user_id = p_user;
$$;
revoke execute on function public.profile_counts(uuid) from public, anon;
grant execute on function public.profile_counts(uuid) to authenticated;
