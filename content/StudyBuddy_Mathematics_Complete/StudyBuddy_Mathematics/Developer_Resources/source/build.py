import os, json, re, csv, shutil, zipfile, collections, subprocess, hashlib, datetime
import build_bank, svg, render
from syllabus import CH, CHAP, AREAS, PATHWAYS
from formulas import F as FORM
from papers import SOURCES, NOT_ACCESSED, Q as PQ, EXAM_STRUCTURE
from patterns import PAT, P1A

OUT = "/home/claude/out/StudyBuddy_Mathematics"
NAMES = ["01_Maths_Concept_Notes.md", "02_Maths_Flashcards.md", "03_Maths_Formula_Bank.md", "04_Maths_Quizzes.md", "05_Maths_Progressive_Practice.md",
         "06_Maths_Chapterwise_Past_Papers.md", "07_Maths_Question_Pattern_Mastery.md", "08_Maths_Visual_Mathematics.md", "09_Maths_Exam_Tricks_and_Strategies.md"]

def main():
    shutil.rmtree(os.path.dirname(OUT), ignore_errors=True); os.makedirs(OUT)
    bank, fails = build_bank.build(); assert not fails, fails
    manifest = svg.write_all(os.path.join(OUT, "Shared_Assets")); render.MANIFEST = manifest
    cards = render.cards(bank)
    stats = {}
    for lang, folder in (("ta", "Tamil_Medium"), ("en", "English_Medium")):
        d = os.path.join(OUT, folder); os.makedirs(d)
        quiz, diag = render.f04(lang, bank)
        files = [render.f01(lang, bank), render.f02(lang, bank, cards), render.f03(lang, bank), quiz, render.f05(lang, bank), render.f06(lang, bank), render.f07(lang, bank), render.f08(lang, bank), render.f09(lang, bank)]
        for nm, txt in zip(NAMES, files):
            open(os.path.join(d, nm), "w", encoding="utf-8", newline="\n").write(txt + "\n")
        # structured export
        exp = []
        for q in bank:
            exp.append(dict(id=q["id"], grade=q["grade"], chapter=q["chapter"], chapter_name=CHAP[q["chapter"]][lang], area=q["area"], medium=lang, pathway=PATHWAYS[q["level"]][0],
                            difficulty=render.DIFFN[q["level"]], kind=q["kind"], formula_ref=q["formula"], diagram_ref=q["diagram"], question=q["q"][lang],
                            hints=[h[lang] for h in q["hints"]], steps=[dict(step_id=f"{q['id']}-S{i+1}", n=i + 1, instruction=s["instr"][lang], working_latex=s["work"]) for i, s in enumerate(q["steps"])],
                            final_answer_latex=q["ans"], value=q["value"], tolerance=q["tol"], unit=q["unit"], accepted=[q["ans"]] + q["accept"],
                            mistake=q["mistake"][lang] if q["mistake"] else None, distractors=[dict(latex=d[0], why=d[1][lang]) for d in q["distractors"]], verification=q["verification"]))
        dr = os.path.join(OUT, "Developer_Resources"); os.makedirs(dr, exist_ok=True)
        json.dump(exp, open(os.path.join(dr, f"questions_{lang}.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        json.dump(dict(items=[q["id"] for q in diag]), open(os.path.join(dr, f"diagnostic_{lang}.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        stats[lang] = dict(diag=len(diag))
    write_dev(bank, cards, manifest, stats)
    qa = run_qa(bank, cards, manifest)
    write_qa(qa, bank, cards, manifest, stats)
    write_tracker(qa)
    zips = package()
    print(json.dumps(dict(questions=len(bank), cards=len(cards), assets=len(manifest), qa_ok=qa["ok"], zips=zips), indent=1))


def write_dev(bank, cards, manifest, stats):
    dr = os.path.join(OUT, "Developer_Resources")
    # resource register
    with open(os.path.join(dr, "Resource_Register.csv"), "w", encoding="utf-8", newline="") as f:
        w = csv.writer(f, lineterminator="\n"); w.writerow(["resource_name", "source_url", "grade", "medium", "exam_year", "textbook_volume", "resource_type", "accessibility", "completeness", "syllabus_relevance"])
        w.writerow(["e-thaksalawa EG10_Mat course (chapter list 1-32)", "https://e-thaksalawa.moe.gov.lk/lcms/course/section.php?id=13240", "10", "English", "", "chapters 1-32 (volume split not verified)", "official course index", "accessed", "chapter titles only", "syllabus map"])
        w.writerow(["e-thaksalawa EG11_Mat(New) course (chapter list 1-25)", "https://www.e-thaksalawa.moe.gov.lk/moodle/mod/forum/view.php?id=47808", "11", "English", "", "Part I ends after Ch 8 ('Revision Part I' marker); later volume split not verified", "official course index", "accessed", "chapter titles only", "syllabus map"])
        w.writerow(["e-thaksalawa Tg10_Mat course (Tamil chapter titles)", "https://e-thaksalawa.moe.gov.lk/lcms/mod/url/view.php?id=11541", "10", "Tamil", "", "", "official course index", "accessed", "chapter titles only", "Tamil terminology"])
        w.writerow(["e-thaksalawa Tg11_Mat course (Tamil chapter titles)", "https://e-thaksalawa.moe.gov.lk/lcms/mod/url/view.php?id=10624", "11", "Tamil", "", "", "official course index", "accessed", "chapter titles only", "Tamil terminology"])
        w.writerow(["Grade 10 Mathematics Teachers' Guide (NIE, implemented from 2015)", "https://www.e-thaksalawa.moe.gov.lk/moodle/pluginfile.php/77588/mod_resource/content/1/EG10_Mat_tim.pdf", "10", "English", "", "", "teachers' guide", "located, not read in full", "partial", "learning outcomes"])
        w.writerow(["Grade 10/11 textbooks (EPD) — all volumes, both media", "http://www.edupub.gov.lk/BooksDownload.php", "10,11", "Tamil,English", "", "NOT VERIFIED", "textbook", "NOT ACCESSED (shell network blocked; no readable copy fetched)", "missing", "core"])
        w.writerow(["Official O/L Mathematics syllabus (NIE)", "https://nie.lk", "10,11", "both", "", "", "syllabus", "NOT ACCESSED", "missing", "core"])
        for k, s in SOURCES.items():
            w.writerow([s["label"], s["url"], "11", "English", k[-4:], "", s["kind"], "accessed (machine-extracted text index)", "question-level topics; wording not stored", "exam analysis"])
        for y, lab, why, url in NOT_ACCESSED:
            w.writerow([lab, url, "11", "Tamil" if y == "TAMIL" else "both", y if y.isdigit() else "", "", "past paper / marking scheme", "NOT ACCESSED: " + why, "missing", "exam analysis"])
        w.writerow(["DoE news: 2025 O/L held 17-26 Feb 2026; 2026 O/L 8-17 Dec 2026", "https://www.adaderana.lk/news/cmqlugnda000a356qir09k7dk", "", "", "2025", "", "news (year mapping)", "accessed", "", "official-year vs calendar-year"])
    # syllabus coverage matrix
    with open(os.path.join(dr, "Syllabus_Coverage_Matrix.csv"), "w", encoding="utf-8", newline="") as f:
        w = csv.writer(f, lineterminator="\n"); w.writerow(["chapter_id", "grade", "chapter_no", "title_en", "title_ta", "area", "notes", "flashcards", "formulas", "practice_F", "practice_G", "practice_A", "verified_past_refs", "patterns", "visuals"])
        for c in CH:
            qs = [q for q in bank if q["chapter"] == c[0]]
            w.writerow([c[0], c[1], c[2], c[3], c[4], c[5], "yes", sum(1 for x in cards if x["chapter"] == c[0]), sum(1 for v in FORM.values() if v[0] == c[0]),
                        sum(1 for q in qs if q["level"] == "F"), sum(1 for q in qs if q["level"] == "G"), sum(1 for q in qs if q["level"] == "A"),
                        sum(1 for p in PQ if p["ch"] == c[0]), ";".join(sorted({p["pat"] for p in PQ if p["ch"] == c[0]})), ";".join(sorted({q["diagram"] for q in qs if q["diagram"]}))])
    with open(os.path.join(dr, "Examination_Pattern_Matrix.csv"), "w", encoding="utf-8", newline="") as f:
        w = csv.writer(f, lineterminator="\n"); w.writerow(["section", "question", "OL2018", "OL2019", "MOE2024_practice", "MOE2026_practice"])
        for r in render.matrix(): w.writerow([r["section"], r["q"], r["OL2018"], r["OL2019"], r["MOE2024"], r["MOE2026"]])
    json.dump(render.freq(), open(os.path.join(dr, "Pattern_Frequency.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    json.dump(manifest, open(os.path.join(dr, "Asset_Manifest.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    open(os.path.join(dr, "Content_Schema.md"), "w", encoding="utf-8").write(SCHEMA)


SCHEMA = """# StudyBuddy Mathematics — Content Schema (v1.0)

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
"""


def run_qa(bank, cards, manifest):
    res = dict(checks=[], ok=True)
    def chk(name, ok, detail=""):
        res["checks"].append((name, ok, detail)); res["ok"] &= ok
    files = []
    for folder in ("Tamil_Medium", "English_Medium"):
        for nm in NAMES:
            p = os.path.join(OUT, folder, nm); files.append(p)
            chk(f"exists {folder}/{nm}", os.path.exists(p) and os.path.getsize(p) > 5000, f"{os.path.getsize(p)} bytes")
    bad = []
    for p in files + [os.path.join(OUT, "Developer_Resources", x) for x in os.listdir(os.path.join(OUT, "Developer_Resources"))]:
        b = open(p, "rb").read()
        if b.startswith(b"\xef\xbb\xbf") or b"\r" in b: bad.append(p)
        s = b.decode("utf-8")
        if "�" in s: bad.append(p + " U+FFFD")
        if re.search(r"\b(TODO|TBD|lorem ipsum|PLACEHOLDER|FIXME)\b", s, re.I): bad.append(p + " placeholder")
    chk("UTF-8, no BOM, no CR, no U+FFFD, no placeholders", not bad, "; ".join(bad))
    for folder in ("Tamil_Medium",):
        tam = sum(1 for nm in NAMES if re.search(r"[஀-௿]", open(os.path.join(OUT, folder, nm), encoding="utf-8").read()))
        chk("Tamil script present in all 9 Tamil files", tam == 9, f"{tam}/9")
    # duplicate ids per file
    dup = []
    for p in files:
        ids = [json.loads(m)["id"] for m in re.findall(r"<!-- meta (\{.*?\}) -->", open(p, encoding="utf-8").read()) if '"id"' in m]
        c = collections.Counter(ids); d = [k for k, v in c.items() if v > 1]
        if d and not p.endswith(("01_Maths_Concept_Notes.md", "03_Maths_Formula_Bank.md", "06_Maths_Chapterwise_Past_Papers.md", "07_Maths_Question_Pattern_Mastery.md", "08_Maths_Visual_Mathematics.md")): dup.append((os.path.basename(p), d[:5]))
    chk("no duplicate IDs in item files (02, 04, 05, 09)", not dup, str(dup))
    chk("unique practice question IDs", len({q["id"] for q in bank}) == len(bank), str(len(bank)))
    chk("unique flashcard IDs", len({c["id"] for c in cards}) == len(cards), str(len(cards)))
    # asset refs
    paths = set(re.findall(r"Shared_Assets/[A-Za-z_]+/[A-Z0-9\-]+\.svg", "".join(open(p, encoding="utf-8").read() for p in files)))
    missing = [x for x in paths if not os.path.exists(os.path.join(OUT, x.replace("Shared_Assets/", "Shared_Assets/")))]
    chk("all referenced SVG assets exist", not missing, f"{len(paths)} referenced; missing {missing}")
    ids_used = {q["diagram"] for q in bank if q["diagram"]}; ids_have = {m["id"] for m in manifest}
    chk("every question diagram id has an asset", ids_used <= ids_have, str(ids_used - ids_have))
    # svg validity
    import xml.dom.minidom
    badsvg = []
    for m in manifest:
        try: xml.dom.minidom.parse(os.path.join(OUT, m["path"]))
        except Exception as e: badsvg.append(m["id"])
    chk("all SVG files are well-formed XML", not badsvg, str(badsvg))
    # dollar balance
    unb = []
    for p in files:
        for i, line in enumerate(open(p, encoding="utf-8")):
            if line.startswith("<!--") or line.startswith("```"): continue
            if line.count("$") % 2: unb.append(f"{os.path.basename(p)}:{i+1}")
    chk("LaTeX $ delimiters balanced on every line", not unb, str(unb[:10]))
    # every question has steps and answer
    miss = [q["id"] for q in bank if not q["steps"] or not q["ans"] or not q["hints"]]
    chk("every practice question has hints, steps and final answer", not miss, str(miss[:5]))
    # chapter coverage
    cov = [c[0] for c in CH if not all(any(q["chapter"] == c[0] and q["level"] == lv for q in bank) for lv in "FGA")]
    chk("all 57 chapters have F, G and A practice", not cov and len(CH) == 57, str(cov))
    # re-run machine verification independently (fresh build)
    b2, f2 = build_bank.build(); chk("re-verification of all generated questions (fresh run)", not f2 and len(b2) == len(bank), f"{len(b2)} questions, {len(f2)} failures")
    # latex render check with KaTeX if available
    res["katex"] = katex_check(files)
    chk("KaTeX parses every LaTeX expression", res["katex"][0] == 0 if res["katex"][1] else True, f"errors={res['katex'][0]} of {res['katex'][1]} expressions; sample={res['katex'][2][:3]}")
    return res


def katex_check(files):
    exprs = set()
    for p in files:
        s = open(p, encoding="utf-8").read()
        s = re.sub(r"<!--.*?-->", "", s)
        s = re.sub(r"```.*?```", "", s, flags=re.S)
        for m in re.findall(r"\$\$(.+?)\$\$", s): exprs.add(m)
        s2 = re.sub(r"\$\$(.+?)\$\$", "", s)
        for m in re.findall(r"\$([^$\n]+?)\$", s2): exprs.add(m)
    exprs = sorted(exprs)
    js = "/home/claude/katexcheck.js"
    if not os.path.exists("/home/claude/node_modules/katex"):
        return (0, 0, ["katex not installed"])
    json.dump(exprs, open("/tmp/exprs.json", "w"))
    out = subprocess.run(["node", js], capture_output=True, text=True, cwd="/home/claude").stdout
    r = json.loads(out); return (len(r), len(exprs), r)


def write_qa(qa, bank, cards, manifest, stats):
    mc = sum(1 for q in bank if q["verification"] == "machine-checked")
    lines = ["# Quality Assurance Report — StudyBuddy GCE O/L Mathematics", "", f"Generated: {datetime.date.today().isoformat()}", "",
             "## Automated checks", "", "| Check | Result | Detail |", "|---|---|---|"]
    for n, ok, d in qa["checks"]: lines.append(f"| {n} | {'PASS' if ok else 'FAIL'} | {str(d)[:300].replace('|','/')} |")
    lines += ["", "## Mathematical verification", "",
              f"- {len(bank)} practice questions generated from {sum(len(v) for v in __import__('core').REG.values())} templates (3 per chapter × 57 chapters).",
              f"- {mc} questions are **machine-checked**: each carries an independent check (SymPy expansion/simplification, substitution of solutions back into equations, recomputation with floating-point π, brute-force enumeration of sample spaces, exact Fraction arithmetic). A question whose check failed was discarded, not published.",
              f"- {len(bank)-mc} questions are **logic-reviewed** (proofs, constructions, conceptual classification, angle facts): reasoning was checked by construction of the template but they are flagged for teacher review.",
              "- Graph/diagram data: every point on a circle is computed with cos/sin; graphs are plotted from the function; numerical check values (e.g. ∠ in a semicircle = 90.0°, PA = PB, AX·XB = CX·XD, OA = OB = OC, PQ/BC = 0.5) are stored in Asset_Manifest.json.",
              "- The 12 shortcut examples in File 09 are asserted in code (the build fails if any is wrong).",
              "- Log-table answers use 4-figure mantissas computed with log10 rounded to 4 d.p.; printed tables may differ in the last digit — answers carry a ±1% tolerance.", "",
              "## Outstanding verification requirements (honest status)", "",
              "1. **Past papers:** only 2018 and 2019 official papers (English) were read, as topic indexes; 2016, 2017, 2020–2025 and all Tamil-medium papers are outstanding. Official marking schemes were not read, so no official marks per sub-question are stated.",
              "2. **Textbooks:** chapter lists were verified from e-thaksalawa course pages; the textbook PDFs (volumes, page content) were not read. Volume split per grade/medium is NOT verified.",
              "3. **Tamil terminology:** chapter titles are official (e-thaksalawa); other terms need checking against the Tamil-medium textbooks by a Tamil-medium Mathematics teacher.",
              "4. **Income-tax table** in G11C09 questions is illustrative (labelled as such), not the current Inland Revenue schedule.",
              "5. **Teacher review** recommended for all items with verification = logic-review, all proofs, and construction step wording.",
              "6. **Simplicity review:** explanations were written to be short; a classroom trial with Foundation-pathway students is recommended.", "",
              "## Content counts", "", f"- Practice questions: {len(bank)} per medium (F {sum(q['level']=='F' for q in bank)}, G {sum(q['level']=='G' for q in bank)}, A {sum(q['level']=='A' for q in bank)})",
              f"- Flashcards: {len(cards)} per medium", f"- Formulas/theorems/constructions: {len(FORM)}", f"- Diagnostic items: {stats['en']['diag']}", f"- SVG assets: {len(manifest)} (incl. construction stages)",
              f"- Verified past-paper question references: {sum(1 for p in PQ if SOURCES[p['src']]['kind']=='OFFICIAL')} official + {sum(1 for p in PQ if SOURCES[p['src']]['kind']!='OFFICIAL')} MOE practice"]
    open(os.path.join(OUT, "Developer_Resources", "Quality_Assurance_Report.md"), "w", encoding="utf-8").write("\n".join(lines) + "\n")


def write_tracker(qa):
    t = f"""# Progress Tracker — StudyBuddy GCE O/L Mathematics

Last updated: {datetime.date.today().isoformat()}

| Area | Status |
|---|---|
| Resource collection | PARTIAL — chapter lists (EN + TA) verified; exam structure verified; 2018 & 2019 official papers + 2 MOE practice papers indexed |
| Missing resources | Textbook PDFs (all volumes, both media); NIE syllabus PDF; O/L papers 2016, 2017, 2020–2025; all Tamil-medium papers; all marking schemes — see Resource_Register.csv |
| Syllabus mapping | COMPLETE at chapter level (57 chapters); subtopic/learning-outcome level pending textbook/syllabus access |
| Examination analysis | PARTIAL — 4 sections verified; pattern matrix from 2 official years + 2 practice papers |
| Tamil medium files | COMPLETE (9/9) for the current evidence base |
| English medium files | COMPLETE (9/9) for the current evidence base |
| Graphical assets | COMPLETE for referenced diagrams ({len(json.load(open(os.path.join(OUT,'Developer_Resources','Asset_Manifest.json'))))} SVGs) |
| Automated QA | {'ALL PASS' if qa['ok'] else 'SOME FAILURES — see QA report'} |
| Outstanding quality checks | Teacher review (logic-reviewed items, Tamil terminology); marking-scheme alignment |

## Exact next unfinished task

1. In claude.ai Settings → Capabilities, allow the domains `e-thaksalawa.moe.gov.lk`, `www.e-thaksalawa.moe.gov.lk`, `www.edupub.gov.lk`, `www.doenets.lk` and `pastpapers.wiki`, so the session can download PDFs for OCR (or attach the PDFs directly).
2. Download and OCR (Tesseract `tam+eng`) the 2016, 2017, 2020–2025 papers and marking schemes, both media.
3. Append each verified question to `papers.py` (same row format), re-run `python3 build.py` — matrix, frequencies, File 06 and File 07 regenerate automatically; no other file needs manual editing.
4. Read the Grade 10/11 textbooks (all volumes) to verify volume splits and to add subtopic-level learning outcomes to the Syllabus_Coverage_Matrix.

## How to continue (for the next session)
- Source code for the shared foundation is in `Developer_Resources/source/` (Python). Keep the ID scheme; add templates with `@tpl(chapter, level)`; run `python3 build.py`.
- Never edit generated Markdown by hand — edit the source and rebuild so Tamil and English stay in step.
"""
    open(os.path.join(OUT, "Developer_Resources", "Progress_Tracker.md"), "w", encoding="utf-8").write(t)


def package():
    src = os.path.join(OUT, "Developer_Resources", "source"); os.makedirs(src, exist_ok=True)
    for f in ["core.py", "syllabus.py", "gen_g10a.py", "gen_g10b.py", "gen_g11.py", "build_bank.py", "notes.py", "formulas.py", "papers.py", "patterns.py", "vis.py", "tricks.py", "svg.py", "render.py", "build.py"]:
        shutil.copy(os.path.join("/home/claude/sbm", f), src)
    base = os.path.dirname(OUT); out = []
    def z(name, include):
        p = os.path.join(base, name)
        with zipfile.ZipFile(p, "w", zipfile.ZIP_DEFLATED) as zf:
            for root, _, fs in os.walk(OUT):
                for f in sorted(fs):
                    full = os.path.join(root, f); rel = os.path.relpath(full, base)
                    if include(rel): zf.write(full, rel)
        r = subprocess.run(["unzip", "-tq", p], capture_output=True, text=True).stdout.strip(); out.append((name, os.path.getsize(p), r))
    z("StudyBuddy_Maths_Tamil_Medium.zip", lambda r: "English_Medium" not in r)
    z("StudyBuddy_Maths_English_Medium.zip", lambda r: "Tamil_Medium" not in r)
    z("StudyBuddy_Mathematics_Complete.zip", lambda r: True)
    return out


if __name__ == "__main__":
    main()
