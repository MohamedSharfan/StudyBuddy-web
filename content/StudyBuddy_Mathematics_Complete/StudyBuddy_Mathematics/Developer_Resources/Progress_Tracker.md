# Progress Tracker — StudyBuddy GCE O/L Mathematics

Last updated: 2026-11-27

| Area | Status |
|---|---|
| Resource collection | PARTIAL — chapter lists (EN + TA) verified; exam structure verified; 2018 & 2019 official papers + 2 MOE practice papers indexed |
| Missing resources | Textbook PDFs (all volumes, both media); NIE syllabus PDF; O/L papers 2016, 2017, 2020–2025; all Tamil-medium papers; all marking schemes — see Resource_Register.csv |
| Syllabus mapping | COMPLETE at chapter level (57 chapters); subtopic/learning-outcome level pending textbook/syllabus access |
| Examination analysis | PARTIAL — 4 sections verified; pattern matrix from 2 official years + 2 practice papers |
| Tamil medium files | COMPLETE (9/9) for the current evidence base |
| English medium files | COMPLETE (9/9) for the current evidence base |
| Graphical assets | COMPLETE for referenced diagrams (52 SVGs) |
| Automated QA | ALL PASS |
| Outstanding quality checks | Teacher review (logic-reviewed items, Tamil terminology); marking-scheme alignment |

## Exact next unfinished task

1. In claude.ai Settings → Capabilities, allow the domains `e-thaksalawa.moe.gov.lk`, `www.e-thaksalawa.moe.gov.lk`, `www.edupub.gov.lk`, `www.doenets.lk` and `pastpapers.wiki`, so the session can download PDFs for OCR (or attach the PDFs directly).
2. Download and OCR (Tesseract `tam+eng`) the 2016, 2017, 2020–2025 papers and marking schemes, both media.
3. Append each verified question to `papers.py` (same row format), re-run `python3 build.py` — matrix, frequencies, File 06 and File 07 regenerate automatically; no other file needs manual editing.
4. Read the Grade 10/11 textbooks (all volumes) to verify volume splits and to add subtopic-level learning outcomes to the Syllabus_Coverage_Matrix.

## How to continue (for the next session)
- Source code for the shared foundation is in `Developer_Resources/source/` (Python). Keep the ID scheme; add templates with `@tpl(chapter, level)`; run `python3 build.py`.
- Never edit generated Markdown by hand — edit the source and rebuild so Tamil and English stay in step.
