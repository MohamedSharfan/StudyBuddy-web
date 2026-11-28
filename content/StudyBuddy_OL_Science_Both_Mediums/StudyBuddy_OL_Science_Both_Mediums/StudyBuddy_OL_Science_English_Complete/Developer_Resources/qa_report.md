# QA report (internal)

## Automated checks (all passed at build time)

- Every chapter MCQ: exactly 4 distinct options, 1 correct (asserted in cdef.py)
- 88 worked calculations: answer substituted back into defining relation (calc.py asserts)
- 50 equations: atom counts equal on both sides, lowest whole-number coefficients; 7 half-equations: atoms + charge
- 13 virtual-experiment models: test cases recomputed
- Mock structured questions: each Part A = 15, Part B = 20 marks (asserted); 5 mocks × 40 unique MCQs, no MCQ reused across mocks or quizzes
- 2019 Paper II sub-part marks re-summed to 15/20
- KaTeX: 395 expressions rendered with throwOnError=true — 0 errors
- UTF-8, no BOM, no CR, no U+FFFD, no placeholders, no duplicate meta IDs, every image path exists, `$` balanced per line, all SVG parse as XML
- SVGs rendered to PNG with rsvg-convert and visually inspected in contact sheets

## Outstanding human verification

- English terminology vs. current NIE English-medium textbooks (e.g. some biology terms)
- Schematic anatomy diagrams (heart, nephron, digestive, eye, flower)
- Teacher check of the 2019 English-medium key before use for marking
- Model answers for descriptive mock parts (acceptable alternatives)
- Practical list vs. official textbook activities

## Counts

- Chapters 35 · flashcards 670 · quiz MCQs 899 · mock MCQs 200 · structured mock questions 45
- Past-paper references: 40 Paper I + 9 Paper II (one session: 2019)
- Worked calculations 88 in 22 types · diagrams 38 (×2 SVG) · equations 50 · experiments 26
