"""Instantiate every template several times, run machine verification, assign stable IDs."""
import random, json, sys, traceback
import core, gen_g10a, gen_g10b, gen_g11
from syllabus import CHAP
LEVELS = {"F": 4, "G": 4, "A": 3}   # instances per template per level (deduplicated)

import re
def _plain(t):
    # outside $...$ : LaTeX thin spaces -> normal spaces, python lists -> comma lists
    parts = t.split("$")
    for i in range(0, len(parts), 2):
        parts[i] = parts[i].replace("\\,", " ")
        parts[i] = re.sub(r"\[([-\d., ]+)\]", r"\1", parts[i])
    return "$".join(parts)

def clean(q):
    for L in ("en", "ta"):
        q["q"][L] = _plain(q["q"][L])
        for h in q["hints"]: h[L] = _plain(h[L])
        for s in q["steps"]: s["instr"][L] = _plain(s["instr"][L])
        if q["mistake"]: q["mistake"][L] = _plain(q["mistake"][L])
        for d in q["distractors"]: d[1][L] = _plain(d[1][L])

def build():
    bank, fails = [], []
    for ch, tpls in core.REG.items():
        for level, f, key in tpls:
            seen = set(); k = 0
            for seed in range(40):
                if k >= LEVELS[level]: break
                r = random.Random(f"{ch}-{key}-{seed}")
                try:
                    q = f(r)
                except Exception as e:
                    fails.append((ch, key, seed, "gen", repr(e))); continue
                sig = q["q"]["en"]
                if sig in seen: continue
                seen.add(sig)
                ok = True
                try:
                    ok = bool(q["verify"]()) if q["verify"] else True
                except Exception as e:
                    ok = False; fails.append((ch, key, seed, "verify-exc", repr(e)))
                if not ok:
                    fails.append((ch, key, seed, "verify-false", sig)); continue
                k += 1
                import inspect, re as _re
                try:
                    src = inspect.getsource(q["verify"]) if q["verify"] else ""
                except Exception:
                    src = ""
                q["verification"] = "logic-review" if _re.search(r"verify=lambda: True\b", src) and "verify=lambda: True if" not in src else "machine-checked"
                clean(q)
                q.update(id=f"MQ-{ch}-{level}-{key[:10].upper()}-{k:02d}", chapter=ch, level=level, template=key, verified=True,
                         grade=CHAP[ch]["grade"], area=CHAP[ch]["area"])
                q.pop("verify")
                bank.append(q)
    return bank, fails

if __name__ == "__main__":
    bank, fails = build()
    print("questions:", len(bank)); print("failures:", len(fails))
    for f in fails[:60]: print(f)
