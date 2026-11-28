# StudyBuddy Mathematics — Content Schema (v1.0)

All files are UTF-8 (no BOM), LF line endings. Maths is LaTeX for KaTeX/MathJax: inline `$…$`, display `$$…$$`.
Tamil and English files share every ID; only the text fields differ.

## Identifier scheme
| Object | Pattern | Example |
|---|---|---|
| Chapter | `G{grade}C{nn}` | `G10C24` |
| Practice question | `MQ-{chapter}-{F|G|A}-{TEMPLATE}-{nn}` | `MQ-G10C24-G-AP_SUM-01` |
| Solution step | `{question_id}-S{n}` | `MQ-G10C24-G-AP_SUM-01-S2` |
| Quiz item | `QZ-…` (same suffix as its source MQ question) | `QZ-G10C01-F-SECTOR_PER-01` |
| Diagnostic item | `D{nn}` → points to an MQ id | `D07` |
| Flashcard | `FC-{nnnn}` | `FC-0042` |
| Formula / theorem / construction | `F-…`, `T-…`, `C-…` | `F-AP-SN`, `T-CIR-CYCLIC` |
| Past-paper reference | `PP-{source}-P{I|II}{A|B}-Q{nn}` | `PP-OL2019-PIIB-Q07` |
| Question pattern | `P1A-…`, `P1B-…`, `P2A-…`, `P2B-…` | `P2A-MEAN` |
| Visual | `VIS-{asset}`; asset `GEO-…`, `GRA-…`, `STA-…`, `SET-…`, `PRO-…`, `TRI-…`, `SOL-…`, `CON-…`; stages `-S{n}` | `CON-PERPBIS-01-S2` |
| Trick | `TR-{nn}` | `TR-05` |

## Machine-readable metadata
Every item in the Markdown files carries an HTML comment `<!-- meta {json} -->` directly under its heading. Keys used:
`id, grade, chapter, area, medium, pathway (Foundation Mastery | Grade Improvement | A Grade Mastery), difficulty (easy|medium|hard), formula, diagram, kind (numeric|algebra|concept|proof|construction), verification (machine-checked|logic-review), steps[]`.
Past-paper items add `source, source_type (OFFICIAL|MOE_PRACTICE), exam_year, paper, part, question, marks, pattern, answer_status`.

## Structured exports (preferred for import)
`Developer_Resources/questions_{ta|en}.json` — one object per practice question:
```json
{"id": "...", "grade": 10, "chapter": "G10C01", "chapter_name": "...", "area": "MEN", "medium": "en",
 "pathway": "Foundation Mastery", "difficulty": "easy", "kind": "numeric", "formula_ref": "F-MEN-ARC", "diagram_ref": "GEO-SECTOR-01",
 "question": "...", "hints": ["weaker hint", "stronger hint"],
 "steps": [{"step_id": "...-S1", "n": 1, "instruction": "...", "working_latex": "..."}],
 "final_answer_latex": "...", "value": 25.0, "tolerance": 0, "unit": "cm", "accepted": ["..."],
 "mistake": "...", "distractors": [{"latex": "...", "why": "..."}], "verification": "machine-checked"}
```
Interaction mapping: Show Hint → `hints[i]` in order; Reveal Next Step → `steps[n]`; Show Full Solution → all steps; Show Final Answer → `final_answer_latex`;
Try Again → compare numeric input with `value ± tolerance` (after unit stripping); Practise Similar → other ids with the same `chapter` + `pathway` (or same template prefix).

## Diagnostic logic
`diagnostic_{lang}.json` lists the item ids in order. Per area: score% = correct/items×100; <50 → Foundation Mastery; 50–79 (or ≥80 with any A-level item wrong) → Grade Improvement; ≥80 with all A-level items correct → A Grade Mastery; <3 items → needs further assessment.

## Filtering
grade · chapter · area/topic · difficulty · pathway · exam section (chapter `sections` in File 01 meta; pattern `section`) · question pattern.
