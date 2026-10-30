-- O/L Islam in the English medium (same 30 + 32 chapters as the Tamil medium; chapter 1 of each grade is free).
-- It is a separate subject, so it is unlocked separately from the Tamil medium.
-- Safe to run more than once.

insert into public.subjects (id, name, level, grade_chapters, free_chapters, is_published, sort_order)
values ('islam-ol-en', 'Islam (English medium)', 'O/L', '{"10": 30, "11": 32}', 1, true, 2)
on conflict (id) do update set grade_chapters = excluded.grade_chapters, name = excluded.name;

update public.subjects set name = 'Islam (Tamil medium)' where id = 'islam-ol' and name = 'Islam';
