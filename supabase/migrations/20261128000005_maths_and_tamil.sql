-- O/L Mathematics (Tamil and English mediums: 32 chapters in Grade 10, 25 in Grade 11) and
-- O/L Tamil language & literature (35 topics, listed under grade 10 as "Grade 10 & 11"). Chapter 1 of each grade is free.
-- Each medium is a separate subject, so each is unlocked separately. Safe to run more than once.

insert into public.subjects (id, name, level, grade_chapters, free_chapters, is_published, sort_order)
values
  ('maths-ol', 'Mathematics (Tamil medium)', 'O/L', '{"10": 32, "11": 25}', 1, true, 5),
  ('maths-ol-en', 'Mathematics (English medium)', 'O/L', '{"10": 32, "11": 25}', 1, true, 6),
  ('tamil-ol', 'Tamil (Tamil medium)', 'O/L', '{"10": 35}', 1, true, 7)
on conflict (id) do update set grade_chapters = excluded.grade_chapters, name = excluded.name;
