-- O/L vs A/L students, plus the A/L stream.
-- Safe to run more than once.

alter table public.profiles add column if not exists stream text;

alter table public.profiles drop constraint if exists stream_valid;
alter table public.profiles add constraint stream_valid check (
  (education_level = 'O/L' and stream is null and grade in (10, 11))
  or (education_level = 'A/L' and stream is not null and stream in ('physical', 'biology', 'commerce', 'arts', 'technology') and grade in (12, 13))
);

-- Students may set their own level and stream.
grant update (stream) on public.profiles to authenticated;

-- Leaderboards are filtered by level.
create index if not exists profiles_level_coins_idx on public.profiles (education_level, coins desc) where onboarded;

-- The default WhatsApp message no longer assumes a subject or a greeting.
update public.site_settings
set value = jsonb_set(value, '{message}', '"Hi! I would like to unlock a subject on StudyBuddy. My student code is"')
where key = 'contact'
  and value ->> 'message' = 'Assalamu alaikum! I would like to unlock StudyBuddy Islam. My student code is';
