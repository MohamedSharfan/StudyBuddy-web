"""Shared mathematical foundation: bilingual question model + formatting helpers.
Every generated question carries computed steps and a machine check (verify) run in QA."""
from fractions import Fraction as Fr
import math, random

REG = {}          # template registry: chapter_id -> list of (level, func)
DIFF = {"F": "easy", "G": "medium", "A": "hard"}


def tpl(ch, level, key=None):
    def deco(f):
        REG.setdefault(ch, []).append((level, f, key or f.__name__))
        return f
    return deco


def T(en, ta):
    return {"en": en, "ta": ta}


def S(en, ta, work, note=None):
    """one solution step: bilingual instruction + LaTeX working (+ optional short note)"""
    d = {"instr": T(en, ta), "work": work}
    if note:
        d["note"] = T(*note) if isinstance(note, tuple) else note
    return d


def Q(q, steps, ans, hints, *, unit="", value=None, tol=0, formula=None, diagram=None,
      mistake=None, distractors=None, verify=None, accept=None, kind="numeric", topic=None):
    return dict(q=q, steps=steps, ans=ans, hints=hints, unit=unit, value=value, tol=tol,
                formula=formula, diagram=diagram, mistake=mistake, distractors=distractors or [],
                verify=verify, accept=accept or [], kind=kind, topic=topic)


def fl(x):
    """LaTeX for Fraction/int/float"""
    if isinstance(x, Fr):
        if x.denominator == 1:
            return n(x.numerator)
        s = "-" if x < 0 else ""
        a = abs(x)
        return f"{s}\\frac{{{a.numerator}}}{{{a.denominator}}}"
    return n(x)


def mixed(x):
    x = Fr(x)
    if x.denominator == 1 or abs(x) < 1:
        return fl(x)
    w = int(x.numerator // x.denominator)
    r = x - w
    return f"{w}\\tfrac{{{r.numerator}}}{{{r.denominator}}}"


def n(x, dp=None):
    """format number with thin-space thousands (Sri Lankan textbook style) for LaTeX"""
    if isinstance(x, Fr):
        return fl(x)
    if dp is not None:
        x = round(x, dp)
        s = f"{x:.{dp}f}"
    elif isinstance(x, float):
        if abs(x - round(x)) < 1e-9:
            s = str(int(round(x)))
        else:
            s = f"{x:.6f}".rstrip("0").rstrip(".")
    else:
        s = str(x)
    neg = s.startswith("-")
    s = s.lstrip("-")
    ip, _, dpart = s.partition(".")
    if len(ip) > 4:
        g = []
        while ip:
            g.insert(0, ip[-3:]); ip = ip[:-3]
        ip = "\\,".join(g)
    return ("-" if neg else "") + ip + ("." + dpart if dpart else "")


def rs(x):
    return f"\\text{{Rs. }}{n(x)}"


def sgn(c, first=False):
    """signed coefficient term helper: returns ' + 3' / ' - 3'"""
    if first:
        return f"{c}"
    return f" + {c}" if c >= 0 else f" - {-c}"


def poly(cs, var="x"):
    """LaTeX of polynomial with integer coeffs, highest degree first"""
    deg = len(cs) - 1
    out = ""
    for i, c in enumerate(cs):
        p = deg - i
        if c == 0:
            continue
        v = "" if p == 0 else (var if p == 1 else f"{var}^{{{p}}}")
        mag = abs(c)
        coef = "" if (mag == 1 and v) else n(mag)
        sign = ("-" if c < 0 else "") if not out else (" - " if c < 0 else " + ")
        out += f"{sign}{coef}{v}"
    return out or "0"


def lin(a, b, var="x"):
    return poly([a, b], var)


PI = Fr(22, 7)
