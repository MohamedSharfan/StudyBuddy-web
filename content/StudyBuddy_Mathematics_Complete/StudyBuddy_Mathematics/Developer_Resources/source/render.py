"""Render the nine student-facing Markdown files per medium + developer resources from the shared foundation."""
import json, os, random, collections, csv, io
import build_bank, svg
from syllabus import CH, CHAP, AREAS, PATHWAYS, SECTIONS
from notes import NOTES
from formulas import F as FORM
from papers import SOURCES, NOT_ACCESSED, Q as PQ, EXAM_STRUCTURE
from patterns import PAT, P1A
from vis import V
from tricks import TRICKS, SECTIONS as TSEC, GENERAL, PATHWAY_GUIDE, CHECKLIST

L = {
 "en": dict(q="Question", hint="Hint", sol="Step-by-step solution", step="Step", fa="Final answer", mis="Common mistake", unit="Unit", tol="Accepted tolerance",
            fmt="Accepted answer formats", diag="Diagram", nts="generic diagram — not drawn to scale; use the values in the question", topic="Topic", diff="Difficulty", path="Pathway",
            formula="Formula", ver="Verification", grade="Grade", ch="Chapter", sec="Exam sections", prereq="Prerequisite", key="Key ideas", ex="Worked example",
            mist="Common mistakes", exam="Examination connection", sup="Pathway support", check="Check yourself", ans="Answer", opts="Options", correct="Correct answer",
            why="Why the other options are wrong", easy="easy", medium="medium", hard="hard", contents="Contents", mc="machine-checked", lr="logic-reviewed (teacher review recommended)",
            sym="Symbols", units="Units", when="When to use", notw="When not to use / conditions", rearr="Rearrangement", supplied="Supplied in exam?", sup_y="A version has been printed on Paper II in verified papers.",
            sup_n="Not verified as supplied — learn it.", example="Worked example (verified)"),
 "ta": dict(q="வினா", hint="குறிப்பு", sol="படிமுறைத் தீர்வு", step="படி", fa="இறுதி விடை", mis="பொதுவான பிழை", unit="அலகு", tol="ஏற்கும் பிழை வரம்பு",
            fmt="ஏற்கும் விடை வடிவங்கள்", diag="படம்", nts="பொதுப் படம் — அளவிடைக்கு வரையப்படவில்லை; வினாவிலுள்ள பெறுமானங்களைப் பயன்படுத்துக", topic="தலைப்பு", diff="கடினம்", path="கற்றல் பாதை",
            formula="சூத்திரம்", ver="சரிபார்ப்பு", grade="தரம்", ch="அத்தியாயம்", sec="பரீட்சைப் பகுதிகள்", prereq="முன்தேவை", key="முக்கிய கருத்துகள்", ex="செய்து காட்டிய உதாரணம்",
            mist="பொதுவான பிழைகள்", exam="பரீட்சைத் தொடர்பு", sup="கற்றல் பாதை ஆதரவு", check="உங்களைச் சோதியுங்கள்", ans="விடை", opts="தெரிவுகள்", correct="சரியான விடை",
            why="மற்றத் தெரிவுகள் ஏன் பிழை", easy="எளிது", medium="நடுத்தரம்", hard="கடினம்", contents="உள்ளடக்கம்", mc="கணினியால் சரிபார்க்கப்பட்டது", lr="தர்க்க ரீதியாக மீளாய்வு (ஆசிரியர் மீளாய்வு பரிந்துரை)",
            sym="குறியீடுகள்", units="அலகுகள்", when="எப்போது பயன்படுத்துவது", notw="பயன்படுத்தக்கூடாத இடம் / நிபந்தனைகள்", rearr="மாற்றியமைப்பு", supplied="பரீட்சையில் தரப்படுமா?", sup_y="சரிபார்த்த வினாத்தாள்களில் வினாத்தாள் II இல் ஒரு வடிவம் அச்சிடப்பட்டிருந்தது.",
            sup_n="தரப்படுவதாகச் சரிபார்க்கப்படவில்லை — கற்றுக்கொள்க.", example="செய்து காட்டிய உதாரணம் (சரிபார்க்கப்பட்டது)"),
}
DIFFN = {"F": "easy", "G": "medium", "A": "hard"}
PLV = {"F": 1, "G": 2, "A": 3}


def chname(c, lang):
    return CHAP[c][lang]


def meta(d):
    return "<!-- meta " + json.dumps(d, ensure_ascii=False) + " -->"


def qmeta(q, lang, extra=None):
    d = dict(id=q["id"], grade=q["grade"], chapter=q["chapter"], area=q["area"], medium=lang, pathway=PATHWAYS[q["level"]][0], difficulty=DIFFN[q["level"]],
             formula=q["formula"], diagram=q["diagram"], kind=q["kind"], verification=q["verification"], steps=[f'{q["id"]}-S{i+1}' for i in range(len(q["steps"]))])
    if extra: d.update(extra)
    return meta(d)


def unit_txt(q, lang):
    return q["unit"] or ""


def qbody(q, lang, hl="####", show_hints=True, show_meta=True, extra=None, title=None):
    t = L[lang]; out = []
    out.append(f"{hl} {title or q['id']}")
    if show_meta: out.append(qmeta(q, lang, extra))
    out.append(f"**{t['topic']}:** {chname(q['chapter'], lang)} · **{t['path']}:** {PATHWAYS[q['level']][1 if lang=='ta' else 0]} · **{t['diff']}:** {t[DIFFN[q['level']]]} · **{t['formula']}:** `{q['formula']}`")
    out.append(""); out.append(f"**{t['q']}:** {q['q'][lang]}")
    if q["diagram"]:
        out.append(""); out.append(f"**{t['diag']}:** `{q['diagram']}` → {asset_path(q['diagram'])} ({t['nts']})")
    if show_hints:
        out.append("")
        for i, h in enumerate(q["hints"]):
            out.append(f"- **{t['hint']} {i+1}:** {h[lang]}")
    out.append(""); out.append(f"**{t['sol']}**"); out.append("")
    for i, s in enumerate(q["steps"]):
        out.append(f"{t['step']} {i+1} — {s['instr'][lang]} <!-- {q['id']}-S{i+1} -->"); out.append(""); out.append(f"$${s['work']}$$"); out.append("")
    u = unit_txt(q, lang)
    out.append(f"**{t['fa']}:** ${q['ans']}$" + (f" {u}" if u and u not in ("°", "%", "Rs.") and "text{" not in q["ans"] else ""))
    if q["kind"] == "numeric" and q.get("value") is not None:
        fm = [q["ans"]] + q.get("accept", [])
        out.append(f"<br>**{t['fmt']}:** " + ", ".join(f"${x}$" for x in dict.fromkeys(fm)) + (f" · **{t['unit']}:** {u}" if u else "") + (f" · **{t['tol']}:** ±{round(q['tol'],3)}" if q["tol"] else ""))
    if q["mistake"]:
        out.append(""); out.append(f"> ⚠️ **{t['mis']}:** {q['mistake'][lang]}")
    out.append(""); out.append(f"<sub>{t['ver']}: {t['mc'] if q['verification']=='machine-checked' else t['lr']}</sub>"); out.append("")
    return "\n".join(out)


MANIFEST = None
def asset_path(aid):
    for m in MANIFEST:
        if m["id"] == aid: return f"`{m['path']}`"
    return f"`{aid}`"


def header(lang, fno, title_en, title_ta, intro_en, intro_ta):
    title = title_en if lang == "en" else title_ta
    medium = "English Medium" if lang == "en" else "தமிழ் மொழிமூலம்"
    intro = intro_en if lang == "en" else intro_ta
    return f"# StudyBuddy — GCE O/L Mathematics · {title}\n\n*{'Your Virtual Learning Partner' if lang=='en' else 'உங்கள் மெய்நிகர் கற்றல் துணை'} · studybuddy.com.lk · {medium}*\n\n{meta(dict(file=f'{fno:02d}', medium=lang, schema='StudyBuddy-Maths-1.0'))}\n\n{intro}\n"


def limits(lang, items):
    h = "## Limitations and review notes" if lang == "en" else "## வரம்புகளும் மீளாய்வுக் குறிப்புகளும்"
    return "\n" + h + "\n\n" + "\n".join(f"- {i[lang] if isinstance(i, dict) else i}" for i in items) + "\n"


COMMON_LIMITS = [
    {"en": "Mathematical content was generated from a shared, machine-checked foundation; questions marked 'logic-reviewed' (proofs, constructions, concepts) should be checked by a qualified Mathematics teacher before publication.",
     "ta": "கணித உள்ளடக்கம் கணினியால் சரிபார்க்கப்பட்ட பொது அடித்தளத்திலிருந்து உருவாக்கப்பட்டது; 'தர்க்க மீளாய்வு' எனக் குறித்தவை (நிறுவல்கள், அமைப்புகள், கருத்துகள்) வெளியிடுமுன் தகுதியான கணித ஆசிரியரால் சரிபார்க்கப்பட வேண்டும்."},
    {"en": "Tamil terminology follows the e-thaksalawa Tamil-medium chapter titles; other Tamil terms were not checked against the printed Tamil textbooks (not accessible in this session) and need teacher review.",
     "ta": "தமிழ்ச் சொற்கள் e-thaksalawa தமிழ்மொழிமூல அத்தியாயத் தலைப்புகளைப் பின்பற்றுகின்றன; ஏனைய சொற்கள் அச்சிட்ட தமிழ்ப் பாடநூல்களுடன் ஒப்பிடப்படவில்லை (இவ்வமர்வில் அணுக முடியவில்லை) — ஆசிரியர் மீளாய்வு தேவை."},
    {"en": "Diagrams referenced by questions are generic illustrations (not to scale). Interactive buttons (hint, next step) are NOT implemented by these Markdown files; the step IDs and JSON export support the website developer.",
     "ta": "வினாக்கள் குறிக்கும் படங்கள் பொது விளக்கப்படங்கள் (அளவிடையற்றவை). ஊடாடும் பொத்தான்கள் இக்கோப்புகளால் செயற்படுத்தப்படவில்லை; படி அடையாளங்களும் JSON ஏற்றுமதியும் இணைய உருவாக்குநருக்கு உதவும்."},
]


# ---------------------------------------------------------------- File 01
def f01(lang, bank):
    t = L[lang]; byc = collections.defaultdict(list)
    for q in bank: byc[q["chapter"]].append(q)
    o = [header(lang, 1, "01 Concept Notes", "01 கருத்துக் குறிப்புகள்",
                "Concise notes for every official Grade 10 and Grade 11 chapter, each with fully worked, verified examples and support for all three learning pathways.",
                "தரம் 10, 11 இன் ஒவ்வொரு அதிகாரபூர்வ அத்தியாயத்துக்குமான சுருக்கக் குறிப்புகள்; ஒவ்வொன்றிலும் சரிபார்த்த முழுமையான உதாரணங்களும் மூன்று கற்றல் பாதைகளுக்குமான ஆதரவும்.")]
    o.append(f"## {t['contents']}\n")
    for c in CH:
        o.append(f"- `{c[0]}` {t['grade']} {c[1]} · {t['ch']} {c[2]} — {chname(c[0], lang)}")
    for c in CH:
        cid = c[0]; nt = NOTES[cid]; qs = byc[cid]
        o.append(f"\n---\n\n## {cid} · {t['grade']} {c[1]} · {t['ch']} {c[2]} — {chname(cid, lang)}\n")
        o.append(meta(dict(id=cid, grade=c[1], chapter=c[2], area=c[5], sections=CHAP[cid]["sections"], medium=lang)))
        o.append(f"\n**{t['sec']}:** " + ", ".join(SECTIONS[s][1 if lang == 'ta' else 0] for s in CHAP[cid]["sections"]) + "\n")
        o.append(nt["s"][lang] + "\n")
        o.append(f"**{t['prereq']}:** {nt['p'][lang]}\n")
        o.append(f"### {t['key']}\n"); o += [f"- {k[lang]}" for k in nt["k"]]
        fids = list(dict.fromkeys(q["formula"] for q in qs))
        o.append(""); o.append(f"**{t['formula']}:** " + ", ".join(f"`{f}` ${FORM[f][3]}$" for f in fids if f in FORM))
        vids = list(dict.fromkeys(q["diagram"] for q in qs if q["diagram"]))
        if vids: o.append(f"\n**{t['diag']}:** " + ", ".join(f"`{v}` {asset_path(v)}" for v in vids))
        for lv in ("F", "G"):
            ex = next(q for q in qs if q["level"] == lv)
            o.append(""); o.append(qbody(ex, lang, "###", show_hints=False, title=f"{t['ex']} ({PATHWAYS[lv][1 if lang=='ta' else 0]}) — {ex['id']}"))
        o.append(f"### {t['mist']}\n"); o += [f"- {m[lang]}" for m in nt["m"]]
        o.append(f"\n### {t['exam']}\n\n{nt['x'][lang]}\n")
        o.append(f"### {t['sup']}\n")
        for lv, tip in zip("FGA", nt["pw"]):
            o.append(f"- **{PATHWAYS[lv][1 if lang=='ta' else 0]}:** {tip[lang]}")
        a = next(q for q in qs if q["level"] == "A")
        o.append(f"\n**{t['check']}:** {a['q'][lang]} → `{a['id']}` (File 05)\n")
    o.append(limits(lang, COMMON_LIMITS))
    return "\n".join(o)


# ---------------------------------------------------------------- File 02 flashcards
def cards(bank):
    out = []; n = 0
    def add(ch, qen, aen, qta, ata, lv, kind):
        nonlocal n; n += 1; out.append(dict(id=f"FC-{n:04d}", chapter=ch, q={"en": qen, "ta": qta}, a={"en": aen, "ta": ata}, level=lv, kind=kind))
    for c in CH:
        cid = c[0]; nt = NOTES[cid]
        for fid, f in FORM.items():
            if f[0] == cid:
                add(cid, f"State the formula/rule: {f[1]}.", f"${f[3]}$", f"சூத்திரம்/விதியைக் கூறுக: {f[2]}.", f"${f[3]}$", "F", "formula")
                if f[7] and f[7] != "—":
                    add(cid, f"When do you use: {f[1]}?", f[7], f"எப்போது பயன்படுத்துவீர்: {f[2]}?", f[8], "G", "application")
                if f[9] and f[9] != "—":
                    add(cid, f"{f[1]} — what condition or warning must you remember?", f[9], f"{f[2]} — நினைவில் வைக்க வேண்டிய நிபந்தனை/எச்சரிக்கை?", f[10], "G", "condition")
        for k in nt["c"]:
            add(cid, k[0], k[1], k[2], k[3], "F", "quick")
        for m in nt["m"]:
            add(cid, f"Spot the mistake: {m['en']}", "This is a common error — see the chapter notes for the correct method.", f"பிழையைக் காண்க: {m['ta']}", "இது பொதுவான பிழை — சரியான முறைக்கு அத்தியாயக் குறிப்புகளைப் பார்க்க.", "G", "mistake")
        # quick calculation cards from F questions (short answers)
        for q in [x for x in bank if x["chapter"] == cid and x["level"] == "F" and x["kind"] == "numeric"][:1]:
            add(cid, q["q"]["en"], f"${q['ans']}$ — " + "; ".join(f"${s['work']}$" for s in q["steps"][-2:]), q["q"]["ta"], f"${q['ans']}$ — " + "; ".join(f"${s['work']}$" for s in q["steps"][-2:]), "F", "quick-calc")
        if any(x["diagram"] for x in bank if x["chapter"] == cid):
            d = next(x["diagram"] for x in bank if x["chapter"] == cid and x["diagram"])
            if d in V:
                v = V[d]; add(cid, f"Diagram {d}: what does it show?", v[3], f"படம் {d}: அது எதைக் காட்டுகிறது?", v[4], "F", "diagram")
    return out


def f02(lang, bank, cs):
    t = L[lang]
    o = [header(lang, 2, "02 Flashcards", "02 நினைவு அட்டைகள்", "Tap-to-reveal style cards for active recall: formulas, rules, conditions, quick calculations, diagram recognition and common mistakes.",
                "செயலூக்க நினைவுக்கான அட்டைகள்: சூத்திரங்கள், விதிகள், நிபந்தனைகள், விரைவுக் கணிப்புகள், படங்கள், பொதுவான பிழைகள்.")]
    cur = None
    for c in cs:
        if c["chapter"] != cur:
            cur = c["chapter"]; o.append(f"\n## {cur} — {chname(cur, lang)}\n")
        o.append(f"### {c['id']}")
        o.append(meta(dict(id=c["id"], chapter=c["chapter"], kind=c["kind"], difficulty=DIFFN[c["level"]], pathway=PATHWAYS[c["level"]][0], medium=lang)))
        o.append(f"**{t['q']}:** {c['q'][lang]}\n")
        o.append(f"<details><summary>{t['ans']}</summary>\n\n{c['a'][lang]}\n\n</details>\n")
        o.append(f"<sub>{t['topic']}: {chname(c['chapter'], lang)} · {t['diff']}: {t[DIFFN[c['level']]]} · {t['path']}: {PATHWAYS[c['level']][1 if lang=='ta' else 0]}</sub>\n")
    o.append(limits(lang, COMMON_LIMITS))
    return "\n".join(o)


# ---------------------------------------------------------------- File 03 formula bank
def f03(lang, bank):
    t = L[lang]
    o = [header(lang, 3, "03 Formula Bank", "03 சூத்திர வங்கி", "Every formula, theorem and construction rule used in the syllabus, organised by chapter, with a verified worked example for each.",
                "பாடத்திட்டத்தில் பயன்படும் ஒவ்வொரு சூத்திரமும் தேற்றமும் அமைப்பு விதியும், அத்தியாய வாரியாக, சரிபார்த்த உதாரணத்துடன்.")]
    for c in CH:
        fs = [(k, f) for k, f in FORM.items() if f[0] == c[0]]
        if not fs: continue
        o.append(f"\n## {c[0]} — {chname(c[0], lang)}\n")
        for fid, f in fs:
            o.append(f"### {fid} — {f[1] if lang=='en' else f[2]}")
            o.append(meta(dict(id=fid, chapter=f[0], supplied=bool(f[12]), medium=lang)))
            o.append(f"\n$${f[3]}$$\n")
            o.append(f"- **{t['sym']}:** {f[4] if lang=='en' else f[5]}")
            o.append(f"- **{t['units']}:** {f[6]}")
            o.append(f"- **{t['when']}:** {f[7] if lang=='en' else f[8]}")
            o.append(f"- **{t['notw']}:** {f[9] if lang=='en' else f[10]}")
            if f[11]: o.append(f"- **{t['rearr']}:** ${f[11]}$")
            o.append(f"- **{t['supplied']}** {t['sup_y'] if f[12] else t['sup_n']}")
            ex = next((q for q in bank if q["formula"] == fid), None)
            if ex:
                o.append(""); o.append(qbody(ex, lang, "####", show_hints=False, title=f"{t['example']} — {ex['id']}"))
    o.append(limits(lang, COMMON_LIMITS + [{"en": "'Supplied in exam' is marked only where a verified 2018/2019 paper or MOE practice paper printed the formula; all other formulas should be memorised.",
                                             "ta": "சரிபார்த்த 2018/2019 அல்லது பயிற்சி வினாத்தாளில் அச்சிடப்பட்டவை மட்டும் 'தரப்படும்' எனக் குறிக்கப்பட்டன; ஏனையவற்றை மனனம் செய்க."}]))
    return "\n".join(o)


# ---------------------------------------------------------------- File 04 quizzes
def _inter(q):
    out = []
    for s in q["steps"][:-1]:
        w = s["work"]
        if "=" in w and "\\begin" not in w:
            rhs = w.split("=")[-1].strip()
            rhs = rhs.replace("\\Rightarrow", "").strip()
            if rhs and len(rhs) < 40 and any(ch.isdigit() for ch in rhs) and rhs != q["ans"] and "x" not in rhs.replace("\\times", ""):
                out.append(rhs)
    return list(dict.fromkeys(out))


STOP = {"en": "This is an intermediate value from the working — the question asks for the final result.",
        "ta": "இது வேலையின் இடைப் பெறுமானம் — வினா இறுதி விடையைக் கேட்கிறது."}


def mcq_of(q, rng):
    ds = [d for d in q["distractors"] if d[0] != q["ans"]]
    for v in _inter(q):
        if len(ds) >= 3: break
        if v not in {d[0] for d in ds}: ds.append((v, STOP))
    seen = set([q["ans"]]); uniq = []
    for d in ds:
        if d[0] not in seen: seen.add(d[0]); uniq.append(d)
    if len(uniq) < 2: return None
    opts = [(q["ans"], None)] + uniq[:3]
    rng.shuffle(opts)
    return opts


def diag_set(bank):
    plan = {a: 3 for a in AREAS}; plan["ALG"] = 6; plan["GEO"] = 6
    sel = []; rng = random.Random(7)
    for area, k in plan.items():
        pool = [q for q in bank if q["area"] == area and q["kind"] in ("numeric", "algebra")]
        per = {"F": k // 3, "G": k // 3, "A": k - 2 * (k // 3)}
        for lv, m in per.items():
            cands = [q for q in pool if q["level"] == lv]
            chs = list(dict.fromkeys(q["chapter"] for q in cands)); rng.shuffle(chs)
            for ch in chs[:m]:
                sel.append(next(q for q in cands if q["chapter"] == ch))
    return sel


def f04(lang, bank):
    t = L[lang]; rng = random.Random(11)
    o = [header(lang, 4, "04 Quizzes and Diagnostic Assessment", "04 வினாடி வினாக்களும் தேர்ச்சி மதிப்பீடும்",
                "Part A is the diagnostic assessment with topic-level pathway recommendations. Part B contains chapter quizzes (multiple-choice and short numerical). Every answer is explained step by step.",
                "பகுதி A: தலைப்பு மட்டக் கற்றல் பாதைப் பரிந்துரைகளுடன் தேர்ச்சி மதிப்பீடு. பகுதி B: அத்தியாய வினாடி வினாக்கள் (பல்தேர்வு, குறு எண் விடை). ஒவ்வொரு விடையும் படிப்படியாக விளக்கப்படும்.")]
    ds = diag_set(bank)
    o.append("\n## " + ("Part A — Diagnostic assessment" if lang == "en" else "பகுதி A — தேர்ச்சி மதிப்பீடு") + "\n")
    o.append(("**Instructions:** " + f"{len(ds)} questions, about 60–75 minutes, no calculator. Each question scores 1 (correct) or 0. Results are a learning guide only — they do NOT predict an examination grade.")
             if lang == "en" else ("**அறிவுறுத்தல்:** " + f"{len(ds)} வினாக்கள், சுமார் 60–75 நிமிடம், கணிப்பான் இல்லை. ஒவ்வொன்றும் 1 (சரி) அல்லது 0. முடிவுகள் கற்றல் வழிகாட்டி மட்டுமே — பரீட்சைத் தரத்தை எதிர்வுகூறாது."))
    o.append("")
    for i, q in enumerate(ds):
        o.append(qbody(q, lang, "###", show_hints=False, extra=dict(diagnostic=True, diag_no=i + 1), title=f"D{i+1:02d} · {AREAS[q['area']][1 if lang=='ta' else 0]} · {q['id']}"))
    # recommendation logic
    o.append("### " + ("Scoring and topic-level recommendation logic" if lang == "en" else "புள்ளியிடலும் தலைப்பு மட்டப் பரிந்துரைத் தர்க்கமும"))
    rows = collections.OrderedDict()
    for q in ds: rows.setdefault(q["area"], []).append(q)
    o.append("\n| " + (" | ".join(["Area", "Items", "Item IDs (level)"] if lang == "en" else ["பிரிவு", "வினாக்கள்", "வினா அடையாளங்கள் (மட்டம்)"])) + " |\n|---|---|---|")
    for a, qs in rows.items():
        o.append(f"| {AREAS[a][1 if lang=='ta' else 0]} (`{a}`) | {len(qs)} | " + ", ".join(f"D{ds.index(q)+1:02d} ({q['level']})" for q in qs) + " |")
    if lang == "en":
        o.append("""
**Rule (per area, computed from that area's items only):**

1. score% = correct ÷ items × 100, and note whether the hardest (A-level) item was correct.
2. score% < 50 → **Foundation Mastery**.
3. 50 ≤ score% < 80, or ≥ 80 but the A-level item wrong → **Grade Improvement**.
4. score% ≥ 80 **and** every A-level item correct → **A Grade Mastery**.
5. Fewer than 3 items answered in an area → **Needs further assessment** (do the 3 F/G/A practice questions of any chapter in that area from File 05, then re-apply the rule).
6. Prerequisite flag: if every F-level item in an area is wrong, show the 'Prerequisite' line of each chapter in that area (File 01) first.

Example output: Algebra — A Grade Mastery · Geometry — Foundation Mastery · Statistics — Grade Improvement · Trigonometry — Foundation Mastery.
""")
    else:
        o.append("""
**விதி (ஒவ்வொரு பிரிவுக்கும், அப்பிரிவின் வினாக்களிலிருந்து மட்டும்):**

1. புள்ளி% = சரியானவை ÷ வினாக்கள் × 100; மிகக் கடினமான (A மட்ட) வினா சரியா என்பதையும் குறிக்க.
2. புள்ளி% < 50 → **அடிப்படைத் தேர்ச்சி**.
3. 50 ≤ புள்ளி% < 80, அல்லது ≥ 80 ஆனால் A மட்ட வினா பிழை → **தர மேம்பாடு**.
4. புள்ளி% ≥ 80 **உம்** எல்லா A மட்ட வினாக்களும் சரி → **A தரத் தேர்ச்சி**.
5. ஒரு பிரிவில் 3 இலும் குறைந்த வினாக்கள் → **மேலும் மதிப்பீடு தேவை** (கோப்பு 05 இலிருந்து அப்பிரிவின் ஏதேனும் அத்தியாயத்தின் F/G/A வினாக்களைச் செய்து விதியை மீளப் பிரயோகிக்க).
6. முன்தேவைக் குறி: ஒரு பிரிவின் எல்லா F மட்ட வினாக்களும் பிழையெனின், அப்பிரிவு அத்தியாயங்களின் 'முன்தேவை' வரியை (கோப்பு 01) முதலில் காட்டுக.

உதாரண வெளியீடு: அட்சரகணிதம் — A தரத் தேர்ச்சி · கேத்திரகணிதம் — அடிப்படைத் தேர்ச்சி · புள்ளிவிபரவியல் — தர மேம்பாடு · திரிகோணகணிதம் — அடிப்படைத் தேர்ச்சி.
""")
    o.append("```json\n" + json.dumps({"areas": {a: [q["id"] for q in qs] for a, qs in rows.items()}, "rule": {"foundation_below": 50, "a_grade_min": 80, "a_grade_requires_all_A_items": True, "min_items": 3}}, ensure_ascii=False, indent=1) + "\n```\n")
    # chapter quizzes
    o.append("\n## " + ("Part B — Chapter quizzes" if lang == "en" else "பகுதி B — அத்தியாய வினாடி வினாக்கள்") + "\n")
    dids = {q["id"] for q in ds}
    for c in CH:
        qs = [q for q in bank if q["chapter"] == c[0] and q["id"] not in dids]
        o.append(f"\n### {c[0]} — {chname(c[0], lang)}\n")
        k = 0
        for q in qs:
            if k >= 6: break
            opts = mcq_of(q, rng)
            if opts:
                k += 1; qid = q["id"].replace("MQ-", "QZ-")
                o.append(f"#### {qid}")
                o.append(meta(dict(id=qid, source_question=q["id"], type="mcq", chapter=q["chapter"], pathway=PATHWAYS[q["level"]][0], difficulty=DIFFN[q["level"]], formula=q["formula"], diagram=q["diagram"], medium=lang)))
                o.append(f"**{t['q']}:** {q['q'][lang]}\n")
                letters = "ABCD"
                for j, (val, _) in enumerate(opts): o.append(f"- **{letters[j]}.** ${val}$")
                ci = [j for j, (v, e) in enumerate(opts) if e is None][0]
                o.append(f"\n<details><summary>{t['correct']}</summary>\n\n**{letters[ci]}** — ${q['ans']}$\n")
                for j, s in enumerate(q["steps"]): o.append(f"{j+1}. {s['instr'][lang]} $ {s['work']} $")
                o.append(f"\n**{t['why']}:**")
                for j, (v, e) in enumerate(opts):
                    if e is not None: o.append(f"- **{letters[j]}** ${v}$ — {e[lang]}")
                o.append("\n</details>\n")
            elif q["kind"] == "numeric" and q.get("value") is not None and k < 6:
                k += 1; qid = q["id"].replace("MQ-", "QZ-")
                o.append(f"#### {qid}")
                o.append(meta(dict(id=qid, source_question=q["id"], type="numeric", chapter=q["chapter"], value=q["value"], tolerance=q["tol"], unit=q["unit"], pathway=PATHWAYS[q["level"]][0], difficulty=DIFFN[q["level"]], formula=q["formula"], medium=lang)))
                o.append(f"**{t['q']}:** {q['q'][lang]}\n")
                o.append(f"<details><summary>{t['correct']}</summary>\n\n${q['ans']}$ (" + (f"{t['tol']}: ±{round(q['tol'],3)}; " if q['tol'] else "") + (f"{t['unit']}: {q['unit']}" if q['unit'] else "") + ")\n")
                for j, s in enumerate(q["steps"]): o.append(f"{j+1}. {s['instr'][lang]} $ {s['work']} $")
                o.append("\n</details>\n")
    o.append(limits(lang, COMMON_LIMITS + [{"en": "Diagnostic thresholds (50%, 80%) are StudyBuddy design choices, not official standards; they should be tuned with real student data.",
                                             "ta": "தேர்ச்சி வரம்புகள் (50%, 80%) StudyBuddy வடிவமைப்புத் தெரிவுகள், அதிகாரபூர்வ நியமங்கள் அல்ல; உண்மை மாணவர் தரவுடன் சீராக்கப்பட வேண்டும்."}]))
    return "\n".join(o), ds


# ---------------------------------------------------------------- File 05
def f05(lang, bank):
    o = [header(lang, 5, "05 Progressive Practice", "05 படிமுறைப் பயிற்சி", "Original practice for every chapter at three levels — Foundation Mastery, Grade Improvement and A Grade Mastery — each with hints, separate solution steps and a final answer.",
                "ஒவ்வொரு அத்தியாயத்துக்குமான மூல பயிற்சி மூன்று மட்டங்களில் — அடிப்படைத் தேர்ச்சி, தர மேம்பாடு, A தரத் தேர்ச்சி — குறிப்புகள், தனித்தனி தீர்வுப் படிகள், இறுதி விடையுடன்.")]
    for c in CH:
        o.append(f"\n---\n\n## {c[0]} — {chname(c[0], lang)}\n")
        for lv in "FGA":
            o.append(f"### {PATHWAYS[lv][1 if lang=='ta' else 0]}\n")
            for q in [q for q in bank if q["chapter"] == c[0] and q["level"] == lv]:
                o.append(qbody(q, lang, "####"))
    o.append(limits(lang, COMMON_LIMITS + [{"en": "All questions in this file are original StudyBuddy questions (not past-paper reproductions).", "ta": "இக்கோப்பிலுள்ள எல்லா வினாக்களும் StudyBuddy இன் மூல வினாக்கள் (கடந்தகால வினாக்களின் மறுபதிப்பல்ல)."}]))
    return "\n".join(o)


# ---------------------------------------------------------------- File 06
SECMARK = {"A": 2}
def equiv_for(pq, bank, used):
    ch = pq["ch"] or {"P1A-GEO": "G10C08"}.get(pq["pat"], "G10C08")
    want = "F" if (pq["paper"] == "I" and pq["part"] == "A") else ("G" if pq["paper"] == "I" else "A")
    order = {"F": "FGA", "G": "GAF", "A": "AGF"}[want]
    for lv in order:
        for q in bank:
            if q["chapter"] == ch and q["level"] == lv and q["id"] not in used:
                used.add(q["id"]); return q
    for q in bank:
        if q["chapter"] == ch: return q


def f06(lang, bank):
    t = L[lang]; used = set()
    o = [header(lang, 6, "06 Chapter-wise Past Papers", "06 அத்தியாய வாரியான கடந்தகால வினாக்கள்",
                "Verified examination questions indexed by chapter. Official question wording is NOT reproduced; each reference is paired with an independently written equivalent practice question (label ORIGINAL_EQUIVALENT) with a complete worked solution.",
                "சரிபார்த்த பரீட்சை வினாக்கள் அத்தியாய வாரியாக. அதிகாரபூர்வ வினாச் சொற்கள் மறுபதிப்பு செய்யப்படவில்லை; ஒவ்வொரு குறிப்புக்கும் சுயாதீனமாக எழுதிய சமமான பயிற்சி வினா (ORIGINAL_EQUIVALENT) முழுத் தீர்வுடன்.")]
    o.append("## " + ("Evidence status" if lang == "en" else "ஆதார நிலை") + "\n")
    o.append("| Source | Type | Status |\n|---|---|---|" if lang == "en" else "| மூலம் | வகை | நிலை |\n|---|---|---|")
    for k, s in SOURCES.items():
        o.append(f"| {s['label']} | {s['kind']} | {'question-level topic index verified' if lang=='en' else 'வினா மட்டத் தலைப்புச் சுட்டி சரிபார்க்கப்பட்டது'} — [{k}]({s['url']}) {s['note']} |")
    for y, lab, why, url in NOT_ACCESSED:
        o.append(f"| {lab} | — | {'NOT ACCESSED' if lang=='en' else 'அணுகப்படவில்லை'}: {why} {f'[link]({url})' if url else ''} |")
    o.append("")
    o.append(("**Marks:** Paper I Part A questions carry 2 marks; every other question carries 10 marks (verified instructions). Sub-question marks are only in the official marking schemes, which were not read — so they are not stated here."
              if lang == "en" else "**புள்ளிகள்:** வினாத்தாள் I பகுதி A வினாக்கள் 2 புள்ளிகள்; ஏனைய ஒவ்வொரு வினாவும் 10 புள்ளிகள் (சரிபார்த்த அறிவுறுத்தல்கள்). உப வினாப் புள்ளிகள் அதிகாரபூர்வ புள்ளித்திட்டங்களில் மட்டும்; அவை வாசிக்கப்படாததால் இங்கு குறிப்பிடப்படவில்லை.") + "\n")
    byc = collections.defaultdict(list)
    for p in PQ: byc[p["ch"] or "UNCLASSIFIED"].append(p)
    for c in CH + [("UNCLASSIFIED", 0, 0, "Unclassified (figure-dependent)", "வகைப்படுத்தப்படாதவை (படம் சார்ந்தவை)", "GEO", "")]:
        ps = byc.get(c[0], [])
        if not ps: continue
        name = c[3] if lang == "en" else c[4]
        if c[0] != "UNCLASSIFIED": name = chname(c[0], lang)
        o.append(f"\n## {c[0]} — {name}\n")
        for p in ps:
            pid = f"PP-{p['src']}-P{p['paper']}{p['part']}-Q{p['q']:02d}"
            sec = f"P{1 if p['paper']=='I' else 2}{p['part']}"
            marks = 2 if sec == "P1A" else 10
            src = SOURCES[p["src"]]
            o.append(f"### {pid}")
            o.append(meta(dict(id=pid, source=p["src"], source_type=src["kind"], exam_year=p["src"][-4:] if p["src"].startswith("OL") else None, medium="English (source)", paper=p["paper"], part=p["part"], question=p["q"], marks=marks, chapter=p["ch"], pattern=p["pat"], answer_status="ORIGINAL_EQUIVALENT")))
            lvl = "F" if sec == "P1A" else ("G" if sec == "P1B" else "A")
            o.append(f"- **{'Source' if lang=='en' else 'மூலம்'}:** {src['label']} · Paper {p['paper']} · Part {p['part']} · Q{p['q']} · {marks} {'marks' if lang=='en' else 'புள்ளிகள்'} · [{p['src']}]({src['url']})")
            o.append(f"- **{'Topic (StudyBuddy summary)' if lang=='en' else 'தலைப்பு (StudyBuddy சுருக்கம்)'}:** {p['topic']}" + ("" if lang == "en" else " (ஆங்கில மூலச் சுருக்கம்)"))
            o.append(f"- **{'Question pattern' if lang=='en' else 'வினா அமைப்பு'}:** `{p['pat']}` · **{t['path']}:** {PATHWAYS[lvl][1 if lang=='ta' else 0]} · **{'Official marking scheme' if lang=='en' else 'அதிகாரபூர்வ புள்ளித்திட்டம்'}:** {'not read (see register)' if lang=='en' else 'வாசிக்கப்படவில்லை (பதிவேடு பார்க்க)'}")
            eq = equiv_for(p, bank, used)
            o.append(""); o.append(qbody(eq, lang, "####", extra=dict(answer_status="ORIGINAL_EQUIVALENT", linked_past_question=pid), title=f"ORIGINAL_EQUIVALENT — {eq['id']}"))
    o.append(limits(lang, COMMON_LIMITS + [
        {"en": "Only 2 of the 10 required examination years (2018, 2019) could be read; 2016, 2017 and 2020–2025 papers and all Tamil-medium papers remain outstanding (see Developer_Resources/Resource_Register.csv). Two MOE practice papers are included as clearly labelled supporting evidence, not as examination papers.",
         "ta": "தேவையான 10 பரீட்சை ஆண்டுகளில் 2 (2018, 2019) மட்டுமே வாசிக்க முடிந்தது; 2016, 2017, 2020–2025 வினாத்தாள்களும் எல்லாத் தமிழ்மொழிமூல வினாத்தாள்களும் நிலுவையில் (Resource_Register.csv பார்க்க). இரு கல்வி அமைச்சுப் பயிற்சி வினாத்தாள்கள் தெளிவாகக் குறிக்கப்பட்ட துணை ஆதாரமாக மட்டும்."},
        {"en": "Topic summaries were produced from machine-extracted text; figure-dependent items are marked 'unclassified'.", "ta": "தலைப்புச் சுருக்கங்கள் கணினி பிரித்தெடுத்த உரையிலிருந்து; படம் சார்ந்தவை 'வகைப்படுத்தப்படாதவை'."}]))
    return "\n".join(o)


# ---------------------------------------------------------------- File 07
def matrix():
    srcs = list(SOURCES)
    rows = []
    for sec, (paper, part, qs) in {"P1A": ("I", "A", range(1, 26)), "P1B": ("I", "B", range(1, 6)), "P2A": ("II", "A", range(1, 7)), "P2B": ("II", "B", range(7, 13))}.items():
        for qn in qs:
            r = dict(section=sec, q=qn)
            for s in srcs:
                m = [p for p in PQ if p["src"] == s and p["paper"] == paper and p["part"] == part and p["q"] == qn]
                r[s] = m[0]["pat"] if m else ""
            rows.append(r)
    return rows


def freq():
    out = {}
    for pat in list(PAT) + list(P1A):
        off = sorted({p["src"] for p in PQ if p["pat"] == pat and SOURCES[p["src"]]["kind"] == "OFFICIAL"})
        moe = sorted({p["src"] for p in PQ if p["pat"] == pat and SOURCES[p["src"]]["kind"] != "OFFICIAL"})
        n_off_q = sum(1 for p in PQ if p["pat"] == pat and SOURCES[p["src"]]["kind"] == "OFFICIAL")
        out[pat] = dict(official_years=off, n_official_papers=len(off), n_official_questions=n_off_q, moe=moe)
    return out


def f07(lang, bank):
    t = L[lang]; fr = freq(); mx = matrix()
    o = [header(lang, 7, "07 Question Pattern Mastery", "07 வினா அமைப்புத் தேர்ச்சி",
                "Learn to solve whole categories of examination questions. Patterns come from verified evidence: official 2018 and 2019 papers plus two MOE practice papers. Frequencies are historical counts only — they never guarantee what will appear.",
                "பரீட்சை வினா வகைகளை முழுமையாகத் தீர்க்கக் கற்க. அமைப்புகள் சரிபார்த்த ஆதாரங்களிலிருந்து: அதிகாரபூர்வ 2018, 2019 வினாத்தாள்களும் இரு கல்வி அமைச்சுப் பயிற்சி வினாத்தாள்களும். நிகழ்வெண்கள் வரலாற்று எண்ணிக்கை மட்டுமே — எது வரும் என உறுதியளிக்காது.")]
    o.append("## " + ("Cross-year question-pattern matrix" if lang == "en" else "ஆண்டிடை வினா அமைப்பு அணி") + "\n")
    o.append("| Sec | Q | OL2018 | OL2019 | MOE2024* | MOE2026* |\n|---|---|---|---|---|---|")
    for r in mx: o.append(f"| {r['section']} | {r['q']} | {r['OL2018']} | {r['OL2019']} | {r['MOE2024']} | {r['MOE2026']} |")
    o.append("\n*" + ("MOE practice papers (supporting evidence, not DoE examinations)." if lang == "en" else "கல்வி அமைச்சுப் பயிற்சி வினாத்தாள்கள் (துணை ஆதாரம், பரீட்சைத் திணைக்கள வினாத்தாள்கள் அல்ல).") + "\n")
    o.append("### " + ("Observed positions (verified evidence only)" if lang == "en" else "அவதானித்த நிலைகள் (சரிபார்த்த ஆதாரம் மட்டும்)") + "\n")
    obs_en = ["Paper II Part A Q6 was a grouped-frequency mean question in all 4 sources.", "Paper II Part B Q7 was a progression (AP, once AP+GP) question in all 4 sources.",
              "Paper II Part B Q8 was a construction question in all 4 sources.", "Paper II Part B Q11 was a Venn-diagram question in all 4 sources.",
              "Paper I Part B Q1 was a fractions word problem in all 4 sources.", "Paper II Part A always contained one finance question (Q1) and one quadratic-graph question (Q2–Q4).",
              "Paper I Part A Q25 was a locus/construction item in 3 of 4 sources (2018 differed).", "Changes: 2018 Paper I Part B used a distance–time graph (Q2) and placed probability before statistics."]
    obs_ta = ["வினாத்தாள் II பகுதி A வி6: 4 மூலங்களிலும் கூட்டமாக்கிய இடை.", "வினாத்தாள் II பகுதி B வி7: 4 மூலங்களிலும் விருத்தி (ஒருமுறை கூ.வி.+பெ.வி.).",
              "வினாத்தாள் II பகுதி B வி8: 4 மூலங்களிலும் அமைப்பு.", "வினாத்தாள் II பகுதி B வி11: 4 மூலங்களிலும் வென் வரிப்படம்.",
              "வினாத்தாள் I பகுதி B வி1: 4 மூலங்களிலும் பின்னச் சொற்கணக்கு.", "வினாத்தாள் II பகுதி A இல் எப்போதும் ஒரு நிதி வினா (வி1), ஒரு இருபடி வரைபு (வி2–வி4).",
              "வினாத்தாள் I பகுதி A வி25: 4 இல் 3 மூலங்களில் ஒழுக்கு/அமைப்பு (2018 வேறு).", "மாற்றங்கள்: 2018 வினாத்தாள் I பகுதி B இல் தூர–நேர வரைபு (வி2); நிகழ்தகவு புள்ளிவிபரத்துக்கு முன்."]
    o += [f"- {x}" for x in (obs_en if lang == "en" else obs_ta)]
    o.append("\n" + ("> Only 2 official years were analysed. These are observations, not predictions." if lang == "en" else "> 2 அதிகாரபூர்வ ஆண்டுகள் மட்டுமே பகுப்பாய்வு செய்யப்பட்டன. இவை அவதானிப்புகள், எதிர்வுகூறல்கள் அல்ல.") + "\n")
    o.append("## " + ("Paper-wise navigation" if lang == "en" else "வினாத்தாள் வாரியான வழிசெலுத்தல்") + "\n")
    for sec in ("P1A", "P1B", "P2A", "P2B"):
        ids = [k for k, v in PAT.items() if v["sec"] == sec] if sec != "P1A" else list(P1A)
        o.append(f"- **{SECTIONS[sec][1 if lang=='ta' else 0]}:** " + ", ".join(f"`{i}`" for i in ids))
    # detailed patterns
    for pid, p in PAT.items():
        f_ = fr[pid]
        o.append(f"\n---\n\n## {pid} — {p['n'][lang]}\n")
        o.append(meta(dict(id=pid, section=p["sec"], chapters=p["ch"], official_years=f_["official_years"], moe_practice=f_["moe"], medium=lang)))
        o.append(f"**{SECTIONS[p['sec']][1 if lang=='ta' else 0]}** · " + (f"Historical frequency: {f_['n_official_papers']}/2 official papers ({', '.join(f_['official_years']) or '—'}); MOE practice: {', '.join(f_['moe']) or '—'}" if lang == "en"
               else f"வரலாற்று நிகழ்வெண்: 2 அதிகாரபூர்வ வினாத்தாள்களில் {f_['n_official_papers']} ({', '.join(f_['official_years']) or '—'}); பயிற்சி: {', '.join(f_['moe']) or '—'}") + "\n")
        o.append(f"- **{'How to recognise it' if lang=='en' else 'இனங்காணும் முறை'}:** {p['r'][lang]}")
        o.append(f"- **{'What the examiner asks' if lang=='en' else 'பரீட்சகர் கேட்பது'}:** {p['a'][lang]}")
        o.append(f"- **{'Chapters / concepts' if lang=='en' else 'அத்தியாயங்கள் / கருத்துகள்'}:** " + ", ".join(f"`{c}` {chname(c, lang)}" for c in p["ch"]))
        fids = list(dict.fromkeys(q["formula"] for q in bank if q["chapter"] in p["ch"]))[:6]
        o.append(f"- **{'Formulas / theorems' if lang=='en' else 'சூத்திரங்கள் / தேற்றங்கள்'}:** " + ", ".join(f"`{f}`" for f in fids))
        o.append(f"\n### {'Standard solving technique' if lang=='en' else 'நிலையான தீர்வு முறை'}\n")
        o += [f"{i+1}. {s[lang]}" for i, s in enumerate(p["t"])]
        o.append(f"\n- **{'Common variations' if lang=='en' else 'பொதுவான மாறுபாடுகள்'}:** {p['v'][lang]}")
        o.append(f"- **{'Common mistakes' if lang=='en' else 'பொதுவான பிழைகள்'}:** {p['m'][lang]}")
        o.append(f"- **{'Examination working' if lang=='en' else 'பரீட்சை வேலை'}:** {p['w'][lang]}")
        rel = [f"PP-{q['src']}-P{q['paper']}{q['part']}-Q{q['q']:02d}" for q in PQ if q["pat"] == pid]
        o.append(f"- **{'Related past-paper IDs (File 06)' if lang=='en' else 'தொடர்புடைய கடந்தகால வினா அடையாளங்கள் (கோப்பு 06)'}:** " + ", ".join(f"`{r}`" for r in rel))
        ex = next(q for q in bank if q["chapter"] in p["ch"] and q["level"] == "G")
        o.append(""); o.append(qbody(ex, lang, "###", title=f"{'Worked example' if lang=='en' else 'செய்து காட்டிய உதாரணம்'} — {ex['id']}"))
        o.append(f"### {'Practice by pathway (full solutions in File 05)' if lang=='en' else 'பாதை வாரியான பயிற்சி (முழுத் தீர்வுகள் கோப்பு 05 இல்)'}\n")
        for lv in "FGA":
            ids = [q["id"] for q in bank if q["chapter"] in p["ch"] and q["level"] == lv and q["id"] != ex["id"]][:4]
            o.append(f"- **{PATHWAYS[lv][1 if lang=='ta' else 0]}:** " + ", ".join(f"`{i}`" for i in ids))
    o.append("\n---\n\n## " + ("Paper I Part A short-question patterns" if lang == "en" else "வினாத்தாள் I பகுதி A குறுவினா அமைப்புகள்") + "\n")
    o.append("| Pattern | " + ("Name | Official occurrences (2018+2019) | MOE practice | Chapters | Practice (File 05)" if lang == "en" else "பெயர் | அதிகாரபூர்வ நிகழ்வுகள் (2018+2019) | பயிற்சி | அத்தியாயங்கள் | பயிற்சி (கோப்பு 05)") + " |\n|---|---|---|---|---|---|")
    for pid, (ne, nta, chs) in P1A.items():
        f_ = fr[pid]; ids = [q["id"] for q in bank if q["chapter"] in chs and q["level"] in "FG"][:3]
        o.append(f"| `{pid}` | {ne if lang=='en' else nta} | {f_['n_official_questions']} | {', '.join(f_['moe']) or '—'} | {', '.join(chs)} | {', '.join(ids)} |")
    o.append(limits(lang, COMMON_LIMITS + [{"en": "Frequencies are based on 2 official papers and 2 MOE practice papers only; equivalent Tamil/English versions were not double-counted. They must be recomputed when the remaining 8 years are added.",
                                             "ta": "நிகழ்வெண்கள் 2 அதிகாரபூர்வ, 2 பயிற்சி வினாத்தாள்களை மட்டும் அடிப்படையாகக் கொண்டவை; தமிழ்/ஆங்கில வடிவங்கள் இருமுறை எண்ணப்படவில்லை. மீதி 8 ஆண்டுகள் சேர்க்கப்படும்போது மீளக் கணிக்கப்பட வேண்டும்."}]))
    return "\n".join(o)


# ---------------------------------------------------------------- File 08
def f08(lang, bank):
    t = L[lang]
    o = [header(lang, 8, "08 Visual Mathematics", "08 காட்சிக் கணிதம்", "Accurate, programmatically drawn graphs, diagrams, charts and step-by-step constructions (SVG in Shared_Assets). Every plotted value was computed from the mathematics, not drawn by hand.",
                "நிரல்மூலம் துல்லியமாக வரைந்த வரைபுகள், படங்கள், அட்டவணைகள், படிமுறை அமைப்புகள் (Shared_Assets இல் SVG). ஒவ்வொரு பெறுமானமும் கணிதத்திலிருந்து கணிக்கப்பட்டது.")]
    for m in [m for m in MANIFEST if "-S" not in m["id"]]:
        aid = m["id"]; v = V.get(aid)
        if not v: continue
        ch = v[0]; rel = [q["id"] for q in bank if q["diagram"] == aid][:6]
        o.append(f"\n## VIS-{aid} — {v[1] if lang=='en' else v[2]}\n")
        o.append(meta(dict(id=f"VIS-{aid}", asset=m["path"], grade=CHAP[ch]["grade"], chapter=ch, formulas=v[6], related_questions=rel, medium=lang)))
        o.append(f"![{aid}](../{m['path']})\n")
        o.append(f"- **{t['grade']}:** {CHAP[ch]['grade']} · **{t['topic']}:** {chname(ch, lang)}")
        o.append(f"- **{'Learning objective' if lang=='en' else 'கற்றல் நோக்கம்'}:** {v[1] if lang=='en' else v[2]}")
        o.append(f"- **{'Explanation' if lang=='en' else 'விளக்கம்'}:** {v[3] if lang=='en' else v[4]}")
        if m.get("values"): o.append(f"- **{'Computed check values' if lang=='en' else 'கணித்த சரிபார்ப்புப் பெறுமானங்கள்'}:** `" + json.dumps(m["values"], ensure_ascii=False) + "`")
        if m.get("table"):
            tb = m["table"]; keys = list(tb)
            o.append("\n| " + " | ".join(keys) + " |\n|" + "---|" * len(keys))
            for i in range(len(tb[keys[0]])): o.append("| " + " | ".join(str(tb[k][i]) for k in keys) + " |")
            o.append("")
        if v[5]:
            o.append(f"**{'Sequential instructions' if lang=='en' else 'படிமுறை அறிவுறுத்தல்கள்'}:**")
            o += [f"{i+1}. {s[0] if lang=='en' else s[1]}" for i, s in enumerate(v[5])]
        stages = [x for x in MANIFEST if x["id"].startswith(aid + "-S")]
        if stages:
            o.append("\n" + " ".join(f"![{s['id']}](../{s['path']})" for s in stages) + "\n")
        o.append(f"- **{'Formulas' if lang=='en' else 'சூத்திரங்கள்'}:** " + ", ".join(f"`{f}` ${FORM[f][3]}$" for f in v[6] if f in FORM))
        o.append(f"- **{'Related question IDs' if lang=='en' else 'தொடர்புடைய வினா அடையாளங்கள்'}:** " + (", ".join(f"`{r}`" for r in rel) or "—"))
        lv = "F" if aid.startswith(("GEO-SECTOR", "SET-VENN2", "PRO-GRID", "GRA-LINE", "STA-PIE")) else "G"
        o.append(f"- **{t['path']}:** {PATHWAYS[lv][1 if lang=='ta' else 0]}")
    # graph interpretation exercises
    o.append("\n## " + ("Graph interpretation exercises" if lang == "en" else "வரைபு விளக்க அப்பியாசங்கள்") + "\n")
    gi = [q for q in bank if q["diagram"] in ("GRA-QUAD-01", "GRA-QUAD-02", "STA-OGIVE-01", "GRA-LINE-01", "GRA-REGION-01")][:6]
    for q in gi: o.append(qbody(q, lang, "###"))
    o.append(limits(lang, COMMON_LIMITS + [{"en": "SVG labels are language-neutral (letters, numbers); captions and instructions are in this file. Structured JSON for interactive versions is in Developer_Resources/Asset_Manifest.json.",
                                             "ta": "SVG குறிகள் மொழிசாராதவை (எழுத்துகள், எண்கள்); விளக்கங்கள் இக்கோப்பில். ஊடாடும் பதிப்புகளுக்கான JSON Developer_Resources/Asset_Manifest.json இல்."}]))
    return "\n".join(o)


# ---------------------------------------------------------------- File 09
def f09(lang, bank):
    t = L[lang]; X = lambda p: p[lang]
    o = [header(lang, 9, "09 Exam Tricks and Strategies", "09 பரீட்சை உத்திகளும் வியூகங்களும்", "Practical, valid techniques and section-by-section strategy for the GCE O/L Mathematics examination. No grade is guaranteed.",
                "க.பொ.த. சா/த கணிதப் பரீட்சைக்கான நடைமுறை, செல்லுபடியான உத்திகளும் பகுதிவாரி வியூகமும். எந்தத் தரமும் உறுதியளிக்கப்படவில்லை.")]
    o.append("## " + ("Examination structure (verified)" if lang == "en" else "பரீட்சை அமைப்பு (சரிபார்க்கப்பட்டது)") + "\n")
    o.append("| Section | Time | Questions | Choice | Marks | Evidence |\n|---|---|---|---|---|---|")
    for r in EXAM_STRUCTURE: o.append("| " + " | ".join([SECTIONS[r[0]][1 if lang == 'ta' else 0]] + list(r[1:])) + " |")
    o.append("\n" + ("Calculators are not allowed (secondary source; confirm with the current DoE instructions). Mathematical tables are provided." if lang == "en" else "கணிப்பான்கள் அனுமதியில்லை (இரண்டாம்நிலை மூலம்; தற்போதைய பரீட்சைத் திணைக்கள அறிவுறுத்தல்களுடன் உறுதிப்படுத்துக). கணித அட்டவணைகள் வழங்கப்படும்.") + "\n")
    for sec in ("P1A", "P1B", "P2A", "P2B"):
        s = TSEC[sec]
        o.append(f"\n## {SECTIONS[sec][1 if lang=='ta' else 0]}\n")
        o.append(f"**{'Time management' if lang=='en' else 'நேர முகாமைத்துவம்'}:** {s['time'][0] if lang=='en' else s['time'][1]}\n")
        o += [f"- {X(x)}" for x in s["tips"]]
        ids = [k for k, v in PAT.items() if v["sec"] == sec] if sec != "P1A" else list(P1A)[:8]
        o.append(f"\n{'Recurring question types (File 07)' if lang=='en' else 'மீளும் வினா வகைகள் (கோப்பு 07)'}: " + ", ".join(f"`{i}`" for i in ids))
    o.append("\n## " + ("Valid shortcuts with worked examples" if lang == "en" else "உதாரணங்களுடன் செல்லுபடியான குறுக்குவழிகள்") + "\n")
    for k in TRICKS:
        o.append(f"### {k['id']} — {X(k['name'])}")
        o.append(meta(dict(id=k["id"], medium=lang, verified=True)))
        o.append(f"- **{'How it works' if lang=='en' else 'எப்படி'}:** {X(k['how'])}")
        o.append(f"- **{'Why it works' if lang=='en' else 'ஏன்'}:** {X(k['why'])}")
        o.append(f"- **{'When to use' if lang=='en' else 'எப்போது'}:** {X(k['when'])}")
        o.append(f"- **{'When not to use' if lang=='en' else 'எப்போது வேண்டாம்'}:** {X(k['whennot'])}")
        o.append(f"- **{'In the exam' if lang=='en' else 'பரீட்சையில்'}:** {X(k['exam'])}")
        o.append(f"\n**{t['q']}:** {X(k['q'])}\n")
        for i, (ins, w) in enumerate(k["steps"]): o.append(f"{t['step']} {i+1} — {X(ins)}\n\n$${w}$$\n")
        o.append(f"**{t['fa']}:** ${k['ans']}$\n")
    titles = {"partial": ("Justified partial-mark opportunities", "நியாயமான பகுதிப் புள்ளி வாய்ப்புகள்"), "verify": ("Answer verification", "விடைச் சரிபார்ப்பு"), "rounding": ("Rounding", "மட்டந்தட்டல்"),
              "units": ("Units", "அலகுகள்"), "graph": ("Graph drawing guidance", "வரைபு வரையும் வழிகாட்டல்"), "construction": ("Geometrical construction guidance", "கேத்திரகணித அமைப்பு வழிகாட்டல்"), "proof": ("Mathematical proof guidance", "கணித நிறுவல் வழிகாட்டல்")}
    for key, items in GENERAL.items():
        o.append(f"\n## {titles[key][0] if lang=='en' else titles[key][1]}\n"); o += [f"- {X(x)}" for x in items]
    o.append("\n## " + ("Common examination mistakes (from all chapters)" if lang == "en" else "பொதுவான பரீட்சைப் பிழைகள் (எல்லா அத்தியாயங்களிலிருந்தும்)") + "\n")
    for c in CH[:]:
        o.append(f"- **{chname(c[0], lang)}:** {NOTES[c[0]]['m'][0][lang]}")
    o.append("\n## " + ("Preparation by pathway" if lang == "en" else "பாதை வாரியான தயாரிப்பு") + "\n")
    for lv in "FGA":
        o.append(f"### {PATHWAYS[lv][1 if lang=='ta' else 0]}\n"); o += [f"- {X(x)}" for x in PATHWAY_GUIDE[lv]]; o.append("")
    o.append("## " + ("Examination readiness checklist" if lang == "en" else "பரீட்சைத் தயார்நிலைச் சரிபார்ப்புப் பட்டியல்") + "\n")
    o += [f"- [ ] {X(x)}" for x in CHECKLIST]
    o.append("\n## " + ("Full-paper practice references" if lang == "en" else "முழு வினாத்தாள் பயிற்சி மூலங்கள்") + "\n")
    for k, s in SOURCES.items(): o.append(f"- [{s['label']}]({s['url']})")
    o.append("- e-thaksalawa O/L past papers (Mathematics section): https://e-thaksalawa.moe.gov.lk/lcms/course/section.php?id=14674")
    o.append(limits(lang, COMMON_LIMITS + [{"en": "Section strategies are based on verified 2018–2019 papers and MOE practice papers; the examination structure can change — always read the instructions on the day.",
                                             "ta": "பகுதி வியூகங்கள் சரிபார்த்த 2018–2019, பயிற்சி வினாத்தாள்களை அடிப்படையாகக் கொண்டவை; பரீட்சை அமைப்பு மாறலாம் — அன்றைய அறிவுறுத்தல்களை எப்போதும் வாசிக்க."}]))
    return "\n".join(o)
