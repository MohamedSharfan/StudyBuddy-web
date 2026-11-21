-- O/L History in the Tamil and English mediums (10 units in Grade 10, 8 in Grade 11; unit 1 of each grade is free).
-- Each medium is a separate subject, so each is unlocked separately. Safe to run more than once.

insert into public.subjects (id, name, level, grade_chapters, free_chapters, is_published, sort_order)
values
  ('history-ol', 'History (Tamil medium)', 'O/L', '{"10": 10, "11": 8}', 1, true, 3),
  ('history-ol-en', 'History (English medium)', 'O/L', '{"10": 10, "11": 8}', 1, true, 4)
on conflict (id) do update set grade_chapters = excluded.grade_chapters, name = excluded.name;
