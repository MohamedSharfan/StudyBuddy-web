-- O/L Science (Tamil and English mediums: 20 chapters in Grade 10, 15 in Grade 11) and
-- O/L English (one version for every medium: 27 chapters, listed under grade 10 as "Grade 10 & 11"). Chapter 1 of each grade is free.
-- Each medium is a separate subject, so each is unlocked separately. Safe to run more than once.

insert into public.subjects (id, name, level, grade_chapters, free_chapters, is_published, sort_order)
values
  ('science-ol', 'Science (Tamil medium)', 'O/L', '{"10": 20, "11": 15}', 1, true, 8),
  ('science-ol-en', 'Science (English medium)', 'O/L', '{"10": 20, "11": 15}', 1, true, 9),
  ('english-ol', 'English', 'O/L', '{"10": 27}', 1, true, 10)
on conflict (id) do update set grade_chapters = excluded.grade_chapters, name = excluded.name;
