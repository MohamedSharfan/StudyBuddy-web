"""Verified examination evidence (question-level topic index; NO question wording reproduced).
Sources accessed 2026-11-27 via e-thaksalawa (Ministry of Education). Topic labels are StudyBuddy paraphrases."""

SOURCES = {
    "OL2018": dict(kind="OFFICIAL", label="G.C.E. (O/L) 2018 — Mathematics I & II (English medium)", held="December 2018",
                   url="https://e-thaksalawa.moe.gov.lk/lcms/pluginfile.php/46243/mod_resource/content/2/Eol_Math_I%2CII%20pp_2018.PDF",
                   note="Text extracted; P1A Q5, Q17, Q24 partly garbled — topics inferred."),
    "OL2019": dict(kind="OFFICIAL", label="G.C.E. (O/L) 2019 — Mathematics I & II (English medium)", held="December 2019",
                   url="https://e-thaksalawa.moe.gov.lk/lcms/pluginfile.php/46241/mod_resource/content/1/EM_Math_I%2CII%20pp_2019.PDF",
                   note="Text extracted; P1A Q3 and Q21 figure-dependent — topics partly unclear."),
    "MOE2024": dict(kind="MOE_PRACTICE", label="MOE Mathematics Practice Test 2023(2024) (English medium) — not a DoE exam paper", held="—",
                    url="https://www.e-thaksalawa.moe.gov.lk/moodle/pluginfile.php/460944/mod_resource/content/1/2023%282024%29_Mathematics_Practice_Paper_MOE_EM.docx.pdf", note=""),
    "MOE2026": dict(kind="MOE_PRACTICE", label="MOE Mathematics Practice Test 2025(2026) (English medium) — not a DoE exam paper", held="—",
                    url="https://e-thaksalawa.moe.gov.lk/lcms/pluginfile.php/68227/mod_resource/content/1/eol_mp_mat_2025%282-26%29.pdf",
                    note="Paper II header shows 2024(2025) — possibly a typo in the source."),
}

NOT_ACCESSED = [
    ("2016", "G.C.E. (O/L) 2016 (held Dec 2016)", "Listed on e-thaksalawa eol_rev ('Maths Paper I & II - 2016'); direct file link not obtainable in this session.", "https://www.e-thaksalawa.moe.gov.lk/moodle/mod/resource/view.php?id=14787"),
    ("2017", "G.C.E. (O/L) 2017 (held Dec 2017)", "Not located on an official site in this session.", ""),
    ("2020", "G.C.E. (O/L) 2020 (held Mar 2021)", "e-thaksalawa resource page returned no readable file.", "https://e-thaksalawa.moe.gov.lk/lcms/mod/resource/view.php?id=43327"),
    ("2021", "G.C.E. (O/L) 2021 (held May 2022)", "e-thaksalawa resource page returned no readable file.", "https://e-thaksalawa.moe.gov.lk/lcms/mod/resource/view.php?id=43326"),
    ("2022", "G.C.E. (O/L) 2022 (held May–June 2023)", "e-thaksalawa server error.", "https://e-thaksalawa.moe.gov.lk/lcms/mod/resource/view.php?id=43325"),
    ("2023", "G.C.E. (O/L) 2023 (held May 2024)", "Paper & answers PDF is scanned (no machine-readable text); shell download blocked so OCR was not possible.", "https://e-thaksalawa.moe.gov.lk/lcms/pluginfile.php/68014/mod_resource/content/1/eol_mat_pp_p12_ans_2023.pdf"),
    ("2024", "G.C.E. (O/L) 2024 (held Mar 2025)", "Paper & answers PDF is scanned (no machine-readable text).", "https://e-thaksalawa.moe.gov.lk/lcms/pluginfile.php/68016/mod_resource/content/1/eol_mat_pp_p12_ans_2024.pdf"),
    ("2025", "G.C.E. (O/L) 2025 (held 17–26 Feb 2026)", "Not located on an official site in this session.", ""),
    ("TAMIL", "All Tamil-medium question papers 2016–2025", "Not accessed. Equivalent Tamil and English versions are the same examination; counts here are NOT doubled.", ""),
    ("MS", "Official marking schemes 2016–2025", "2018 and 2019 marking schemes are listed on e-thaksalawa (ids 43329, 43331) but were not read in this session.", "https://e-thaksalawa.moe.gov.lk/lcms/mod/resource/view.php?id=43329"),
]

# (source, paper, part, qno, topic_en, chapter, pattern)
Q = []
def add(src, paper, part, rows):
    for qno, topic, ch, pat in rows:
        Q.append(dict(src=src, paper=paper, part=part, q=qno, topic=topic, ch=ch, pat=pat))

add("OL2019", "I", "A", [(1, "Percentage — customs duty", "G11C09", "P1A-PCT"), (2, "Factorising a quadratic expression", "G10C07", "P1A-FACT"), (3, "Unknown value from a figure (figure unclear)", None, "P1A-GEO"),
    (4, "Logarithm → index form", "G10C19", "P1A-LOG"), (5, "Rate — filling a tank", "G10C22", "P1A-RATE"), (6, "Circle angles", "G10C31", "P1A-CIRC"), (7, "Curved surface area of a cylinder", "G10C29", "P1A-MENS"),
    (8, "Gradient of a straight line", "G10C21", "P1A-LINE"), (9, "Simplifying an algebraic fraction", "G11C07", "P1A-AFRAC"), (10, "Right triangle with midpoints", "G11C11", "P1A-GEO"), (11, "Solving a quadratic equation", "G11C13", "P1A-QEQ"),
    (12, "Compound interest (second year)", "G11C09", "P1A-PCT"), (13, "Cyclic quadrilateral angles", "G11C21", "P1A-CIRC"), (14, "Pie chart", "G10C11", "P1A-STAT"), (15, "Geometric progression term", "G11C16", "P1A-PROG"),
    (16, "Parallelogram properties (true/false)", "G10C16", "P1A-PARA"), (17, "LCM of algebraic terms", "G10C12", "P1A-LCM"), (18, "Angle at the centre", "G10C31", "P1A-CIRC"), (19, "Angles of elevation/depression diagram", "G10C32", "P1A-TRIG"),
    (20, "Probability (marbles)", "G10C30", "P1A-PROB"), (21, "Geometry terminology (figure unclear)", None, "P1A-GEO"), (22, "Matrix equation", "G11C19", "P1A-MAT"), (23, "Venn diagram shading", "G11C24", "P1A-SET"),
    (24, "Distance–time graph (speed)", "G10C22", "P1A-RATE"), (25, "Locus (fixed distances)", "G10C28", "P1A-LOCUS")])
add("OL2019", "I", "B", [(1, "Fractions word problem", "G10C03", "P1B-FRAC"), (2, "Composite area (trapezium + semicircle)", "G10C06", "P1B-MENS"), (3, "Rates and income tax", "G11C09", "P1B-FIN"),
    (4, "Frequency table, histogram, frequency polygon", "G10C26", "P1B-STAT"), (5, "Sample space and tree diagram", "G11C25", "P1B-PROB")])
add("OL2019", "II", "A", [(1, "Bank deposit vs share dividends", "G11C10", "P2A-FIN"), (2, "Quadratic graph, turning point, completing the square", "G11C12", "P2A-QGRAPH"), (3, "Simultaneous equations + algebraic fractions", "G10C15", "P2A-ALG"),
    (4, "Quadratic equation from equal areas (semicircle, sector)", "G11C13", "P2A-QEQ"), (5, "Bearings and trigonometry", "G11C18", "P2A-TRIG"), (6, "Mean from a grouped frequency table", "G10C26", "P2A-MEAN")])
add("OL2019", "II", "B", [(7, "Arithmetic progression (context)", "G10C24", "P2B-PROG"), (8, "Constructions: bisector and tangent", "G11C23", "P2B-CONS"), (9, "Parallel lines and triangle proofs", "G11C08", "P2B-PGEO"),
    (10, "Cyclic quadrilateral and diameter proof", "G11C21", "P2B-PCIR"), (11, "Venn diagram and probability", "G11C24", "P2B-VENN"), (12, "Hemisphere and prism volume", "G11C05", "P2B-VOL")])

add("OL2018", "I", "A", [(1, "Work rate (inverse proportion)", "G10C10", "P1A-RATE"), (2, "Factorising a quadratic expression", "G10C07", "P1A-FACT"), (3, "Unknown value from a figure", None, "P1A-GEO"), (4, "Perimeter of square and sector", "G10C01", "P1A-MENS"),
    (5, "Surd/algebraic simplification (text partly garbled)", "G11C01", "P1A-NUM"), (6, "Angles on a straight line", "G10C08", "P1A-ANGLE"), (7, "Logarithm value", "G10C19", "P1A-LOG"), (8, "Cylinder curved surface area → height", "G10C29", "P1A-MENS"),
    (9, "Circle theorem angle", "G10C31", "P1A-CIRC"), (10, "Solving a quadratic equation", "G11C13", "P1A-QEQ"), (11, "Flow rate (volume and time)", "G10C22", "P1A-RATE"), (12, "Parallelogram properties (fill blanks)", "G10C16", "P1A-PARA"),
    (13, "Probability (die multiples)", "G10C30", "P1A-PROB"), (14, "Diameter and angle", "G10C31", "P1A-CIRC"), (15, "Income tax from a table", "G11C09", "P1A-PCT"), (16, "Area of semicircle and triangle", "G10C06", "P1A-MENS"),
    (17, "Unknown value from a figure (garbled)", None, "P1A-GEO"), (18, "Matrix equality", "G11C19", "P1A-MAT"), (19, "Angle at the centre", "G10C31", "P1A-CIRC"), (20, "Set complement and union", "G10C18", "P1A-SET"),
    (21, "Geometric progression term", "G11C16", "P1A-PROG"), (22, "Gradient through two points", "G10C21", "P1A-LINE"), (23, "Quartile position", "G11C15", "P1A-STAT"), (24, "Algebraic fractions (garbled)", "G11C07", "P1A-AFRAC"),
    (25, "Parallelogram in a circle — angle", "G11C21", "P1A-CIRC")])
add("OL2018", "I", "B", [(1, "Fractions — sharing money", "G10C03", "P1B-FRAC"), (2, "Distance–time graph", "G10C22", "P1B-GRAPH"), (3, "Customs duty and municipal rates", "G11C09", "P1B-FIN"),
    (4, "Sample space and tree diagram", "G11C25", "P1B-PROB"), (5, "Grouped frequency, cumulative frequency, median", "G11C15", "P1B-STAT")])
add("OL2018", "II", "A", [(1, "Simple vs compound interest", "G11C09", "P2A-FIN"), (2, "Rectangle — quadratic equation", "G11C13", "P2A-QEQ"), (3, "Quadratic function table and graph", "G11C12", "P2A-QGRAPH"),
    (4, "Simultaneous equations + inequality", "G10C15", "P2A-ALG"), (5, "Cuboid volume → cylinder radius", "G10C29", "P2A-MENS"), (6, "Mean of a frequency distribution", "G10C26", "P2A-MEAN")])
add("OL2018", "II", "B", [(7, "Arithmetic progression (patterns)", "G10C24", "P2B-PROG"), (8, "Constructions and locus", "G10C28", "P2B-CONS"), (9, "Parallelogram ratios and proofs", "G10C17", "P2B-PGEO"),
    (10, "Angle of elevation (trigonometry)", "G11C18", "P2B-TRIG"), (11, "Venn diagram — three subjects", "G11C24", "P2B-VENN"), (12, "Tangent–chord angles, circle proofs", "G11C22", "P2B-PCIR")])

add("MOE2024", "I", "A", [(1, "VAT", "G11C09", "P1A-PCT"), (2, "Linear equation with fractions", "G10C15", "P1A-EQ"), (3, "Angle relationships", "G10C08", "P1A-ANGLE"), (4, "Sector perimeter", "G10C01", "P1A-MENS"), (5, "Parallelogram properties", "G10C16", "P1A-PARA"),
    (6, "Histogram reading", "G10C26", "P1A-STAT"), (7, "Set notation / Venn", "G10C18", "P1A-SET"), (8, "Speed and time", "G10C22", "P1A-RATE"), (9, "Cylinder net", "G10C29", "P1A-MENS"), (10, "Cyclic quadrilateral", "G11C21", "P1A-CIRC"),
    (11, "Square-root approximation", "G10C02", "P1A-NUM"), (12, "Algebraic fractions / indices", "G11C07", "P1A-AFRAC"), (13, "Elevation and depression", "G10C32", "P1A-TRIG"), (14, "Triangle angles", "G10C08", "P1A-ANGLE"), (15, "Geometric progression", "G11C16", "P1A-PROG"),
    (16, "LCM of algebraic expressions", "G10C12", "P1A-LCM"), (17, "Volume of a prism", "G10C29", "P1A-MENS"), (18, "Isosceles triangle angles", "G10C09", "P1A-ANGLE"), (19, "Factorising", "G10C07", "P1A-FACT"), (20, "Probability", "G10C30", "P1A-PROB"),
    (21, "Angle at the centre", "G10C31", "P1A-CIRC"), (22, "Equation of a straight line", "G10C21", "P1A-LINE"), (23, "Circle angles with isosceles triangles", "G10C31", "P1A-CIRC"), (24, "Quadratic equation", "G11C13", "P1A-QEQ"), (25, "Locus — perpendicular bisector", "G10C28", "P1A-LOCUS")])
add("MOE2024", "I", "B", [(1, "Fractions — land allocation", "G10C03", "P1B-FRAC"), (2, "Arc, semicircle, trapezium area", "G10C06", "P1B-MENS"), (3, "Shares, dividends, rates, tax", "G11C10", "P1B-FIN"),
    (4, "Frequency table, pie chart, cumulative frequency", "G11C15", "P1B-STAT"), (5, "Sample space and tree diagram", "G11C25", "P1B-PROB")])
add("MOE2024", "II", "A", [(1, "Loan, reducing balance, compound interest", "G11C09", "P2A-FIN"), (2, "Quadratic graph, turning point", "G11C12", "P2A-QGRAPH"), (3, "Simultaneous equations + algebraic fractions", "G10C15", "P2A-ALG"),
    (4, "Bearings and trigonometry", "G11C18", "P2A-TRIG"), (5, "Quadratic equation from a shaded area", "G11C13", "P2A-QEQ"), (6, "Grouped mean and modal class", "G10C26", "P2A-MEAN")])
add("MOE2024", "II", "B", [(7, "Arithmetic progression (seating)", "G10C24", "P2B-PROG"), (8, "Constructions: circumcircle, angle bisector", "G11C23", "P2B-CONS"), (9, "Cone and cylinder volume with logarithms", "G11C05", "P2B-VOL"),
    (10, "Triangle proof with midpoints", "G11C11", "P2B-PGEO"), (11, "Venn diagram", "G11C24", "P2B-VENN"), (12, "Tangent and cyclic quadrilateral proof", "G11C22", "P2B-PCIR")])

add("MOE2026", "I", "A", [(1, "Sector arc length", "G10C01", "P1A-MENS"), (2, "Unknown value from a figure", None, "P1A-GEO"), (3, "Linear equation with a fraction", "G10C15", "P1A-EQ"), (4, "Logarithm equal to zero", "G10C19", "P1A-LOG"),
    (5, "Cyclic quadrilateral theorem", "G11C21", "P1A-CIRC"), (6, "Algebraic fractions", "G11C07", "P1A-AFRAC"), (7, "Square-root approximation", "G10C02", "P1A-NUM"), (8, "Venn diagram counts", "G10C18", "P1A-SET"),
    (9, "Congruence conditions", "G10C05", "P1A-ANGLE"), (10, "Income tax", "G11C09", "P1A-PCT"), (11, "LCM of algebraic terms", "G10C12", "P1A-LCM"), (12, "Continuous vs discrete data", "G11C15", "P1A-STAT"),
    (13, "Unknown value from a geometric figure", None, "P1A-GEO"), (14, "Prism volume", "G10C29", "P1A-MENS"), (15, "Duty and original value", "G11C09", "P1A-PCT"), (16, "Side length from a figure", "G11C17", "P1A-GEO"),
    (17, "Cosine from sine", "G11C18", "P1A-TRIG"), (18, "Integer solutions of an inequality", "G10C25", "P1A-INEQ"), (19, "Angle in a circle", "G10C31", "P1A-CIRC"), (20, "Line equation from a graph", "G10C21", "P1A-LINE"),
    (21, "Dice sample space", "G10C30", "P1A-PROB"), (22, "Diameter and angles", "G10C31", "P1A-CIRC"), (23, "Travel time (speed)", "G10C22", "P1A-RATE"), (24, "Matrix multiplication", "G11C19", "P1A-MAT"), (25, "Locus — equidistant point", "G10C28", "P1A-LOCUS")])
add("MOE2026", "I", "B", [(1, "Fractions — production and work hours", "G10C03", "P1B-FRAC"), (2, "Trapezium and sector", "G10C06", "P1B-MENS"), (3, "Shares, dividends, simple interest, tax", "G11C10", "P1B-FIN"),
    (4, "Pie chart, histogram, frequency polygon", "G10C26", "P1B-STAT"), (5, "Sample space and tree diagram", "G11C25", "P1B-PROB")])
add("MOE2026", "II", "A", [(1, "Compound interest vs reducing balance", "G11C09", "P2A-FIN"), (2, "Simultaneous equations + inequality", "G10C15", "P2A-ALG"), (3, "Quadratic equation from profit", "G11C13", "P2A-QEQ"),
    (4, "Quadratic function table, graph, roots", "G11C12", "P2A-QGRAPH"), (5, "Angles of elevation and depression", "G11C18", "P2A-TRIG"), (6, "Grouped mean and modal class", "G10C26", "P2A-MEAN")])
add("MOE2026", "II", "B", [(7, "Arithmetic and geometric progressions", "G10C24", "P2B-PROG"), (8, "Constructions: circumcircle and tangent", "G11C23", "P2B-CONS"), (9, "Tangent and equiangular triangles proof", "G11C14", "P2B-PCIR"),
    (10, "Logarithms with cone volume", "G11C05", "P2B-VOL"), (11, "Venn diagram, probability, set notation", "G11C24", "P2B-VENN"), (12, "Parallelogram conditions, rhombus proof", "G10C17", "P2B-PGEO")])

EXAM_STRUCTURE = [
    # section, duration, questions, choice, marks, evidence
    ("P1A", "Paper I: 2 hours (Parts A and B together)", "25 short questions", "All compulsory, answered on the paper", "2 marks each = 50", "2018, 2019 official; MOE 2023(2024), 2025(2026)"),
    ("P1B", "within the 2 hours of Paper I", "5 structured questions", "All compulsory, answered on the paper", "10 marks each = 50", "2018, 2019 official; MOE practice"),
    ("P2A", "Paper II: 3 hours + 10 minutes reading (Parts A and B together)", "6 questions (Q1–6)", "Answer any 5", "10 marks each = 50", "2018 (reading time), 2019 (3 h + 10 min); MOE practice"),
    ("P2B", "within Paper II", "6 questions (Q7–12)", "Answer any 5", "10 marks each = 50", "2018, 2019 official; MOE practice"),
]
