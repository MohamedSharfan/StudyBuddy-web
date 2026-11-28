# Website functionality NOT provided by Markdown (to build)

Markdown files carry data in `<!-- meta {json} -->` comments; `<details>` only hides answers. The following must be implemented by the website:

- Flashcard flipping, spaced repetition, progress tracking
- Quiz timer, scoring, randomisation, analytics
- Calculation step-by-step reveal with answer input and auto-check (answer + unit in meta)
- Diagram drag-and-drop labelling using `<g id="…-Lnn">` and `…-Lnn-target` IDs in the unlabelled SVG
- Drawing canvas for diagram drawing mode
- Equation balancer with coefficient input (expected coefficients in meta)
- Virtual experiments (input ranges, model formula and test cases in each experiment's JSON block)
- Mock exam timer, Part B '3 of 5' selection, auto-marking of Paper I, OMR grid (science_assets/mock_exams/omr_answer_grid.svg)

`content_bank.json` contains all quiz MCQs, mock structures and calculation answers as JSON.
