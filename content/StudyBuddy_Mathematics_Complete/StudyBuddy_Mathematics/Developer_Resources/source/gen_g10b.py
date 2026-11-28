"""Grade 10 chapters 17-32."""
from core import *
import math
from fractions import Fraction as Fr
import sympy as sp
X = sp.Symbol("x")

# ---------------- G10C17 Parallelograms II ----------------
@tpl("G10C17", "F")
def para_condition(r):
    opts = [("both pairs of opposite sides are equal", "எதிர்ப் பக்கச் சோடிகள் இரண்டும் சமம்"),
            ("the diagonals bisect each other", "மூலைவிட்டங்கள் ஒன்றையொன்று இருசமகூறிடும்"),
            ("one pair of opposite sides is equal and parallel", "ஒரு சோடி எதிர்ப் பக்கங்கள் சமமும் சமாந்தரமும்"),
            ("both pairs of opposite angles are equal", "எதிர்க் கோணச் சோடிகள் இரண்டும் சமம்")]
    c = r.choice(opts)
    return Q(T(f"In quadrilateral ABCD, {c[0]}. What type of quadrilateral is ABCD? Give the reason.",
               f"ABCD நாற்பக்கலில் {c[1]}. ABCD எவ்வகை நாற்பக்கல்? காரணம் தருக."),
             [S("Recall the conditions for a parallelogram.", "இணைகரத்துக்கான நிபந்தனைகளை நினைவுகூர்க.", r"\text{4 conditions (sides, angles, diagonals, one pair equal \& parallel)}"),
              S("The given fact is one of them.", "தரப்பட்டது அவற்றுள் ஒன்று.", r"\Rightarrow ABCD\ \text{is a parallelogram}")],
             r"\text{Parallelogram}", [T("Any ONE of the four conditions is enough.", "நான்கு நிபந்தனைகளுள் ஏதாவது ஒன்று போதும்.")], kind="concept", formula="T-GEO-PARACOND", verify=lambda: True,
             distractors=[(r"\text{Rhombus}", T("A rhombus needs all four sides equal.", "சாய்சதுரத்துக்கு நான்கு பக்கங்களும் சமமாக வேண்டும்.")), (r"\text{Trapezium}", T("A trapezium has only one pair of parallel sides.", "சரிவகத்தில் ஒரு சோடி சமாந்தரப் பக்கங்கள் மட்டும்."))])


@tpl("G10C17", "G")
def para_find_xy(r):
    x, y = r.choice([(4, 3), (5, 2), (3, 6), (6, 4)])
    a, b, c, d = 2, 1, 1, 2
    s1, s2 = 2 * x + 1, x + (x + 1)  # equal
    t1, t2 = 3 * y - 2, y + 2 * y - 2
    AB = 2 * x + 1; DC = x + (x + 1); AD = 3 * y; BC = 2 * y + y
    k1 = x + 1; k2 = y
    return Q(T(f"In quadrilateral PQRS, PQ = $(2x+1)$ cm, SR = $(x+{x+1})$ cm, PS = $(3y)$ cm and QR = $(2y+{y})$ cm. Find the values of x and y for which PQRS is a parallelogram (opposite sides equal).",
               f"PQRS நாற்பக்கலில் PQ = $(2x+1)$ cm, SR = $(x+{x+1})$ cm, PS = $(3y)$ cm, QR = $(2y+{y})$ cm. எதிர்ப் பக்கங்கள் சமமாகும் இணைகரமாக PQRS அமைய x, y இன் பெறுமானங்கள் யாவை?"),
             [S("Opposite sides equal: PQ = SR.", "எதிர்ப் பக்கங்கள் சமம்: PQ = SR.", rf"2x + 1 = x + {x+1} \Rightarrow x = {x}"),
              S("PS = QR.", "PS = QR.", rf"3y = 2y + {y} \Rightarrow y = {y}")],
             rf"x={x},\ y={y}", [T("Set each pair of opposite sides equal.", "ஒவ்வொரு எதிர்ப் பக்கச் சோடியையும் சமப்படுத்துக.")], value=x, formula="T-GEO-PARACOND",
             verify=lambda: 2 * x + 1 == x + x + 1 and 3 * y == 2 * y + y)


@tpl("G10C17", "A")
def para_midpoints_proof(r):
    return Q(T("In parallelogram ABCD, P and Q are the midpoints of AB and DC. Prove that APCQ is a parallelogram.",
               "ABCD இணைகரத்தில் P, Q என்பன AB, DC இன் நடுப்புள்ளிகள். APCQ ஓர் இணைகரம் என நிறுவுக."),
             [S("AB = DC and AB ∥ DC.", "AB = DC, AB ∥ DC.", r"AB = DC,\ AB\parallel DC\ (\text{ABCD is a parallelogram})"),
              S("Half of equal sides are equal.", "சம பக்கங்களின் அரைவாசிகள் சமம்.", r"AP = \tfrac12 AB = \tfrac12 DC = QC"),
              S("AP lies on AB and QC lies on DC.", "AP, AB மீதும் QC, DC மீதும் உள்ளன.", r"AP\parallel QC"),
              S("One pair of opposite sides equal and parallel.", "ஒரு சோடி எதிர்ப் பக்கங்கள் சமமும் சமாந்தரமும்.", r"\therefore APCQ\ \text{is a parallelogram}")],
             r"APCQ\ \text{is a parallelogram}", [T("Use the condition 'one pair of sides equal and parallel'.", "'ஒரு சோடி பக்கங்கள் சமமும் சமாந்தரமும்' நிபந்தனையைப் பயன்படுத்துக.")], kind="proof", formula="T-GEO-PARACOND", diagram="GEO-PARA-01", verify=lambda: True)


# ---------------- G10C18 Sets ----------------
@tpl("G10C18", "F")
def sets_union(r):
    a, b, i = r.choice([(15, 12, 5), (20, 18, 8), (25, 14, 6), (30, 22, 10)])
    u = a + b - i
    return Q(T(f"n(A) = {a}, n(B) = {b} and n(A ∩ B) = {i}. Find n(A ∪ B).", f"n(A) = {a}, n(B) = {b}, n(A ∩ B) = {i}. n(A ∪ B) ஐக் காண்க."),
             [S("Use the formula.", "சூத்திரத்தைப் பயன்படுத்துக.", r"n(A\cup B) = n(A) + n(B) - n(A\cap B)"),
              S("Substitute.", "பிரதியிடுக.", rf"= {a} + {b} - {i} = {u}")],
             str(u), [T("The overlap is counted twice when you add, so subtract it once.", "கூட்டும்போது பொதுப்பகுதி இருமுறை எண்ணப்படும்; ஒருமுறை கழிக்க.")], value=u, formula="F-SET-UNION", diagram="SET-VENN2-01",
             distractors=[(str(a + b), T("Did not subtract the intersection.", "வெட்டைக் கழிக்கவில்லை.")), (str(a + b - 2 * i), T("Subtracted the intersection twice.", "வெட்டை இருமுறை கழித்தது."))], verify=lambda: u == a + b - i)


@tpl("G10C18", "G")
def sets_neither(r):
    U, a, b, i = r.choice([(40, 22, 18, 7), (50, 30, 24, 12), (60, 35, 28, 15)])
    only_a, only_b = a - i, b - i; nei = U - (a + b - i)
    return Q(T(f"In a class of {U} students, {a} play cricket, {b} play volleyball and {i} play both. How many play (i) only cricket (ii) neither game?",
               f"{U} மாணவர்களுள்ள வகுப்பில் {a} பேர் கிரிக்கெற், {b} பேர் கரப்பந்து, {i} பேர் இரண்டும் விளையாடுவர். (i) கிரிக்கெற் மட்டும் (ii) எதுவுமே விளையாடாதோர் எத்தனை பேர்?"),
             [S("Start with the intersection in the Venn diagram.", "வென் வரிப்படத்தில் வெட்டிலிருந்து தொடங்குக.", rf"n(C\cap V) = {i}"),
              S("Only cricket.", "கிரிக்கெற் மட்டும்.", rf"{a} - {i} = {only_a}"),
              S("Only volleyball.", "கரப்பந்து மட்டும்.", rf"{b} - {i} = {only_b}"),
              S("Neither = total − (union).", "எதுவுமில்லை = மொத்தம் − ஒன்றிப்பு.", rf"{U} - ({only_a} + {i} + {only_b}) = {nei}")],
             rf"(i)\ {only_a}\quad(ii)\ {nei}", [T("Fill the Venn diagram from the middle outwards.", "வென் வரிப்படத்தை நடுவிலிருந்து வெளிநோக்கி நிரப்புக.")], value=nei, formula="F-SET-UNION", diagram="SET-VENN2-01", verify=lambda: only_a + only_b + i + nei == U)


@tpl("G10C18", "A")
def sets_find_both(r):
    U, a, b, nei = r.choice([(45, 25, 28, 4), (60, 32, 40, 6), (50, 27, 30, 3)])
    both = a + b - (U - nei)
    return Q(T(f"Of {U} people, {a} drink tea, {b} drink coffee and {nei} drink neither. How many drink both? How many drink exactly one?",
               f"{U} பேரில் {a} பேர் தேநீர், {b} பேர் கோப்பி அருந்துவர்; {nei} பேர் எதையும் அருந்தார். இரண்டையும் அருந்துவோர் எத்தனை? சரியாக ஒன்றை மட்டும் அருந்துவோர் எத்தனை?"),
             [S("People who drink at least one.", "குறைந்தது ஒன்றை அருந்துவோர்.", rf"n(T\cup C) = {U} - {nei} = {U-nei}"),
              S("Rearrange the union formula.", "ஒன்றிப்புச் சூத்திரத்தை மாற்றி எழுதுக.", rf"n(T\cap C) = {a} + {b} - {U-nei} = {both}"),
              S("Exactly one = union − both.", "சரியாக ஒன்று = ஒன்றிப்பு − இரண்டும்.", rf"{U-nei} - {both} = {U-nei-both}")],
             rf"\text{{both}} = {both},\ \text{{exactly one}} = {U-nei-both}", [T("Find n(T ∪ C) from 'neither'.", "'எதுவுமில்லை' இலிருந்து n(T ∪ C) ஐக் காண்க.")], value=both, formula="F-SET-UNION", verify=lambda: a + b - both == U - nei)


# ---------------- G10C19 Logarithms I ----------------
@tpl("G10C19", "F")
def log_index_form(r):
    b, p = r.choice([(2, 5), (3, 4), (5, 3), (10, 4), (4, 3), (2, 6)])
    return Q(T(f"Write $\\log_{{{b}}} {b**p} = {p}$ in index form.", f"$\\log_{{{b}}} {b**p} = {p}$ ஐச் சுட்டி வடிவில் எழுதுக."),
             [S("Rule: log_a N = x means a^x = N.", "விதி: log_a N = x என்றால் a^x = N.", r"\log_a N = x \iff a^x = N"),
              S("Apply it.", "பிரயோகிக்க.", rf"{b}^{{{p}}} = {b**p}")],
             rf"{b}^{{{p}}} = {b**p}", [T("The base of the log becomes the base of the power.", "மடக்கையின் அடி, வலுவின் அடியாகும்.")], kind="algebra", formula="F-LOG-DEF", verify=lambda: True,
             distractors=[(rf"{p}^{{{b}}} = {b**p}", T("Base and index swapped.", "அடியும் சுட்டியும் மாறின.")), (rf"{b**p}^{{{p}}} = {b}", T("Wrong arrangement.", "பிழையான ஒழுங்கு."))])


@tpl("G10C19", "G")
def log_laws(r):
    a, b = r.choice([(2, 5), (4, 25), (20, 5), (8, 125), (50, 2)])
    prod = a * b; p = int(round(math.log10(prod)))
    return Q(T(f"Simplify without tables: $\\lg {a} + \\lg {b}$", f"அட்டவணையின்றிச் சுருக்குக: $\\lg {a} + \\lg {b}$"),
             [S("Add logs → multiply numbers.", "மடக்கைகளைக் கூட்டல் → எண்களைப் பெருக்கல்.", rf"\lg {a} + \lg {b} = \lg({a}\times{b})"),
              S("Multiply.", "பெருக்குக.", rf"= \lg {prod}"),
              S(f"{prod} = 10^{p}.", f"{prod} = 10^{p}.", rf"= \lg 10^{{{p}}} = {p}")],
             str(p), [T("lg means log base 10.", "lg என்பது அடி 10 மடக்கை."), T("log a + log b = log (ab).", "log a + log b = log (ab).")], value=p, formula="F-LOG-LAWS", verify=lambda: 10 ** p == prod,
             distractors=[(rf"\lg {a+b}", T("log a + log b is NOT log(a + b).", "log a + log b என்பது log(a + b) அல்ல."))])


@tpl("G10C19", "A")
def log_solve(r):
    b, x = r.choice([(2, 3), (3, 2), (2, 4), (5, 2)])
    val = b ** x
    k = r.choice([1, 2, 3])
    return Q(T(f"Solve: $\\log_{{{b}}}(x + {k}) = {x}$", f"தீர்க்க: $\\log_{{{b}}}(x + {k}) = {x}$"),
             [S("Change to index form.", "சுட்டி வடிவுக்கு மாற்றுக.", rf"x + {k} = {b}^{{{x}}}"),
              S("Evaluate the power.", "வலுவைக் கணிக்க.", rf"x + {k} = {val}"),
              S("Solve.", "தீர்க்க.", rf"x = {val-k}")],
             f"x = {val-k}", [T("Turn the log equation into a power.", "மடக்கைச் சமன்பாட்டை வலுவாக மாற்றுக.")], value=val - k, formula="F-LOG-DEF", verify=lambda: b ** x == (val - k) + k)


# ---------------- G10C20 Logarithms II (tables) ----------------
def lg4(v):
    return round(math.log10(v), 4)


@tpl("G10C20", "F")
def log_char(r):
    v = r.choice([3.47, 34.7, 347, 0.347, 0.0347, 5.2, 520, 0.052])
    c = math.floor(math.log10(v)); m = round(math.log10(v) - c, 4)
    cs = f"\\bar{{{abs(c)}}}" if c < 0 else str(c)
    sci_m = v / 10 ** c
    return Q(T(f"Write {v} in scientific notation and state the characteristic of lg {v}.", f"{v} ஐ விஞ்ஞானமுறைக் குறிப்பீட்டில் எழுதி lg {v} இன் சிறப்பியல்பைக் கூறுக."),
             [S("Scientific notation: A × 10ⁿ with 1 ≤ A < 10.", "விஞ்ஞானமுறை: A × 10ⁿ, 1 ≤ A < 10.", rf"{v} = {round(sci_m,3)}\times 10^{{{c}}}"),
              S("The characteristic is the power of 10.", "சிறப்பியல்பு = 10 இன் வலு.", rf"\text{{characteristic}} = {cs}"),
              S("The mantissa (from tables) is the same for 3.47, 34.7, 0.347 …", "அட்டவணையிலிருந்து பெறும் தசமக்கூறு 3.47, 34.7, 0.347 … க்கு ஒன்றே.", rf"\lg {v} = {cs}.{str(m)[2:].ljust(4,'0')}")],
             cs, [T("Count how many places the decimal point moves.", "தசமப் புள்ளி எத்தனை இடம் நகர்கிறது என எண்ணுக.")], kind="numeric", value=c, formula="F-LOG-TAB",
             distractors=[(str(c + 1), T("Counted digits instead of the power of 10.", "10 இன் வலுவுக்குப் பதிலாக இலக்கங்களை எண்ணியது."))], verify=lambda: 10 ** c <= v < 10 ** (c + 1))


@tpl("G10C20", "G")
def log_product(r):
    a, b = r.choice([(3.24, 12.5), (4.56, 2.3), (25.6, 1.75), (6.82, 3.4)])
    la, lb = lg4(a), lg4(b); s = round(la + lb, 4); ans = 10 ** s
    sig = f"{ans:#.3g}".rstrip(".")
    return Q(T(f"Using logarithm tables, find the value of {a} × {b} (to 3 significant figures).", f"மடக்கை அட்டவணையைப் பயன்படுத்தி {a} × {b} இன் பெறுமானத்தை (3 பொருளுள்ள இலக்கங்களுக்கு) காண்க."),
             [S("Let P = the product and take lg.", "P = பெருக்கம் எனக் கொண்டு lg எடுக்க.", rf"\lg P = \lg {a} + \lg {b}"),
              S("Read the logs from the tables.", "அட்டவணையிலிருந்து மடக்கைகளை வாசிக்க.", rf"\lg P = {la:.4f} + {lb:.4f} = {s:.4f}"),
              S("Find the antilog.", "எதிர்மடக்கையைக் காண்க.", rf"P = \text{{antilog}}\ {s:.4f} \approx {sig}")],
             f"{sig}", [T("Multiplication becomes addition of logs.", "பெருக்கல் மடக்கைக் கூட்டலாகும்."), T("Characteristic of the answer tells where the decimal point goes.", "விடையின் சிறப்பியல்பு தசமப் புள்ளியின் இடத்தைக் காட்டும்.")],
             value=float(sig), tol=0.01 * float(sig), formula="F-LOG-TAB", verify=lambda: abs(float(sig) - a * b) / (a * b) < 0.005,
             mistake=T("Multiplying the logs instead of adding them.", "மடக்கைகளைக் கூட்டுவதற்குப் பதிலாகப் பெருக்குதல்."))


@tpl("G10C20", "A")
def log_quotient(r):
    a, b = r.choice([(0.0563, 2.4), (0.875, 12.3), (0.042, 0.35)])
    la, lb = math.log10(a), math.log10(b); d = la - lb; ans = 10 ** d
    ca, cb = math.floor(la), math.floor(lb)
    def bar(v):
        c = math.floor(v); m = v - c
        return (f"\\bar{{{abs(c)}}}" if c < 0 else str(c)) + f".{round(m,4):.4f}"[2:] if False else ((f"\\bar{{{abs(c)}}}" if c < 0 else str(c)) + "." + f"{round(m,4):.4f}"[2:])
    sig = f"{ans:#.3g}".rstrip(".")
    return Q(T(f"Using logarithm tables, find the value of $\\frac{{{a}}}{{{b}}}$ (to 3 significant figures).", f"மடக்கை அட்டவணையைப் பயன்படுத்தி $\\frac{{{a}}}{{{b}}}$ இன் பெறுமானத்தைக் காண்க (3 பொ.இ.)."),
             [S("Division → subtract logs.", "வகுத்தல் → மடக்கைகளைக் கழித்தல்.", rf"\lg P = \lg {a} - \lg {b}"),
              S("Read the logs (bar = negative characteristic).", "மடக்கைகளை வாசிக்க (கோடு = மறைச் சிறப்பியல்பு).", rf"\lg P = {bar(la)} - {bar(lb)}"),
              S("Subtract carefully (mantissa is always positive).", "கவனமாகக் கழிக்க (தசமக்கூறு எப்போதும் நேர்).", rf"\lg P = {bar(d)}"),
              S("Antilog.", "எதிர்மடக்கை.", rf"P \approx {sig}")],
             f"{sig}", [T("Bar numbers: only the characteristic is negative.", "கோட்டு எண்கள்: சிறப்பியல்பு மட்டும் மறை.")], value=float(sig), tol=0.01 * float(sig), formula="F-LOG-TAB",
             verify=lambda: abs(float(sig) - a / b) / (a / b) < 0.005, mistake=T("Treating the whole bar number as negative.", "முழுக் கோட்டு எண்ணையும் மறையாகக் கருதுதல்."))


# ---------------- G10C21 Graphs ----------------
@tpl("G10C21", "F")
def gradient_intercept(r):
    m, c = r.choice([(2, 3), (-3, 1), (Fr(1, 2), -2), (4, -5), (-1, 6)])
    return Q(T(f"For the straight line $y = {fl(m) if m!=1 else ''}x {sgn(c)}$, write down the gradient and the y-intercept.", f"$y = {fl(m)}x {sgn(c)}$ என்ற நேர்கோட்டின் படித்திறனையும் y வெட்டுத்துண்டையும் எழுதுக."),
             [S("Compare with y = mx + c.", "y = mx + c உடன் ஒப்பிடுக.", rf"y = {fl(m)}x {sgn(c)}"),
              S("m is the gradient, c is the intercept.", "m படித்திறன், c வெட்டுத்துண்டு.", rf"m = {fl(m)},\quad c = {c}")],
             rf"m={fl(m)},\ c={c}", [T("The number multiplying x is the gradient.", "x ஐப் பெருக்கும் எண் படித்திறன்.")], value=float(m), formula="F-GRA-LINE", diagram="GRA-LINE-01", verify=lambda: True,
             distractors=[(rf"m={c},\ c={fl(m)}", T("Gradient and intercept swapped.", "படித்திறனும் வெட்டுத்துண்டும் மாறின."))])


@tpl("G10C21", "G")
def gradient_two_points(r):
    x1, y1, x2, y2 = r.choice([(1, 2, 4, 8), (-1, 5, 3, -3), (0, -2, 2, 4), (2, 1, 6, 3)])
    m = Fr(y2 - y1, x2 - x1); c = y1 - m * x1
    return Q(T(f"Find the gradient of the line through ({x1}, {y1}) and ({x2}, {y2}), and its equation.", f"({x1}, {y1}), ({x2}, {y2}) ஊடான நேர்கோட்டின் படித்திறனையும் சமன்பாட்டையும் காண்க."),
             [S("Gradient = change in y ÷ change in x.", "படித்திறன் = y மாற்றம் ÷ x மாற்றம்.", rf"m = \frac{{{y2} - ({y1})}}{{{x2} - ({x1})}} = {fl(m)}"),
              S("Substitute one point in y = mx + c.", "ஒரு புள்ளியை y = mx + c இல் பிரதியிடுக.", rf"{y1} = {fl(m)}\times({x1}) + c \Rightarrow c = {fl(c)}"),
              S("Write the equation.", "சமன்பாட்டை எழுதுக.", rf"y = {fl(m)}x {'+' if c>=0 else '-'} {fl(abs(c))}")],
             rf"m={fl(m)},\ y={fl(m)}x {'+' if c>=0 else '-'} {fl(abs(c))}", [T("Subtract in the same order for top and bottom.", "மேலும் கீழும் ஒரே ஒழுங்கில் கழிக்க.")], value=float(m), formula="F-GRA-GRAD", diagram="GRA-LINE-01",
             verify=lambda: m * x2 + c == y2)


@tpl("G10C21", "A")
def quad_ax2c(r):
    a, c = r.choice([(1, -4), (-1, 4), (2, -8), (-1, 9), (1, -9)])
    xs = list(range(-3, 4)); ys = [a * x * x + c for x in xs]
    roots = sorted({x for x in [math.sqrt(-c / a)] if -c / a >= 0}) if -c / a >= 0 else []
    rt = math.sqrt(-c / a)
    tp = "minimum" if a > 0 else "maximum"; tpta = "இழிவு" if a > 0 else "உயர்வு"
    tbl = " & ".join(map(str, xs)) + r"\\ \hline y & " + " & ".join(map(str, ys))
    return Q(T(f"For $y = {poly([a,0,c])}$: (i) complete a table for x = −3 to 3, (ii) state the turning point and whether it is a maximum or minimum, (iii) find where the graph cuts the x-axis.",
               f"$y = {poly([a,0,c])}$ இற்கு: (i) x = −3 முதல் 3 வரை அட்டவணையை நிரப்புக, (ii) திரும்பற் புள்ளியையும் அது உயர்வா இழிவா என்பதையும் கூறுக, (iii) வரைபு x அச்சை வெட்டும் புள்ளிகளைக் காண்க."),
             [S("Substitute each x value.", "ஒவ்வொரு x பெறுமானத்தையும் பிரதியிடுக.", rf"\begin{{array}}{{c|ccccccc}} x & {tbl}\end{{array}}"),
              S("Turning point is at x = 0 for y = ax² + c.", "y = ax² + c க்குத் திரும்பற் புள்ளி x = 0 இல்.", rf"(0,\ {c}),\ \text{{{tp}}}\ (a {'>' if a>0 else '<'} 0)"),
              S("Graph cuts the x-axis where y = 0.", "y = 0 ஆகுமிடத்தில் வரைபு x அச்சை வெட்டும்.", rf"{poly([a,0,c])} = 0 \Rightarrow x^2 = {fl(Fr(-c,a))} \Rightarrow x = \pm {n(rt)}")],
             rf"(0,{c})\ \text{{{tp}}};\ x=\pm {n(rt)}", [T("Square x first, then multiply by a: (−2)² = 4.", "முதலில் x ஐ வர்க்கித்து பின் a ஆல் பெருக்குக: (−2)² = 4."), T("If a > 0 the curve opens upward (minimum).", "a > 0 எனின் வளைவு மேல்நோக்கித் திறக்கும் (இழிவு).")],
             value=rt, formula="F-GRA-QUAD", diagram="GRA-QUAD-02", verify=lambda: abs(a * rt * rt + c) < 1e-9,
             mistake=T("Writing (−3)² as −9.", "(−3)² ஐ −9 என எழுதுதல்."))


# ---------------- G10C22 Rate ----------------
@tpl("G10C22", "F")
def speed_time(r):
    d, v = r.choice([(120, 40), (150, 60), (90, 45), (210, 70), (75, 50)])
    t = Fr(d, v)
    hrs = int(t); mins = int((t - hrs) * 60)
    return Q(T(f"A bus travels {d} km at an average speed of {v} km/h. How long does it take?", f"ஒரு பேருந்து {d} km தூரத்தைச் சராசரி {v} km/h கதியில் செல்கிறது. எடுக்கும் நேரம் எவ்வளவு?"),
             [S("Time = distance ÷ speed.", "நேரம் = தூரம் ÷ கதி.", rf"t = \frac{{{d}}}{{{v}}} = {fl(t)}\ \text{{h}}"),
              S("Convert to hours and minutes.", "மணித்தியாலம், நிமிடமாக மாற்றுக.", rf"{fl(t)}\ \text{{h}} = {hrs}\ \text{{h}}\ {mins}\ \text{{min}}")],
             rf"{hrs}\ \text{{h}}\ {mins}\ \text{{min}}", [T("Speed = distance/time, so time = distance/speed.", "கதி = தூரம்/நேரம், எனவே நேரம் = தூரம்/கதி.")], unit="h", value=float(t), formula="F-NUM-SPEED", verify=lambda: v * t == d,
             distractors=[(rf"{d*v}\ \text{{h}}", T("Multiplied instead of dividing.", "வகுப்பதற்குப் பதிலாகப் பெருக்கியது."))])


@tpl("G10C22", "G")
def tank_fill(r):
    V, q = r.choice([(1200, 40), (2000, 50), (1800, 30), (3600, 60)])
    t = V // q
    return Q(T(f"A tank holds {n(V)} litres. Water flows in at {q} litres per minute. How long will it take to fill the empty tank?", f"ஒரு தாங்கியில் {n(V)} லீற்றர் கொள்ளும். நிமிடத்துக்கு {q} லீற்றர் வீதம் நீர் பாய்கிறது. வெறுமையான தாங்கி நிரம்ப எவ்வளவு நேரம்?"),
             [S("Time = volume ÷ rate.", "நேரம் = கனவளவு ÷ வீதம்.", rf"t = {n(V)}\div {q} = {t}\ \text{{min}}"),
              S("Convert if needed.", "தேவையெனின் மாற்றுக.", rf"{t}\ \text{{min}} = {t//60}\ \text{{h}}\ {t%60}\ \text{{min}}")],
             rf"{t}\ \text{{min}}", [T("Rate tells how many litres each minute.", "வீதம் ஒவ்வொரு நிமிடத்துக்குமான லீற்றரைக் காட்டும்.")], unit="min", value=t, formula="F-NUM-RATE", verify=lambda: t * q == V)


@tpl("G10C22", "A")
def two_pipes(r):
    V, a, b = r.choice([(1200, 30, 10), (2400, 50, 20), (1800, 45, 15)])
    net = a - b; t = Fr(V, net)
    return Q(T(f"An empty tank of {n(V)} L is filled by a pipe at {a} L/min while a leak removes {b} L/min. How long does it take to fill the tank?", f"{n(V)} L வெறுமையான தாங்கியை ஒரு குழாய் {a} L/min வீதம் நிரப்ப, ஒரு கசிவு {b} L/min வீதம் வெளியேற்றுகிறது. தாங்கி நிரம்ப எடுக்கும் நேரம்?"),
             [S("Net rate = in − out.", "தேறிய வீதம் = உள் − வெளி.", rf"{a} - {b} = {net}\ \text{{L/min}}"),
              S("Time = volume ÷ net rate.", "நேரம் = கனவளவு ÷ தேறிய வீதம்.", rf"{n(V)}\div {net} = {fl(t)}\ \text{{min}}")],
             rf"{fl(t)}\ \text{{min}}", [T("The leak works against the pipe.", "கசிவு குழாய்க்கு எதிராகச் செயற்படும்.")], unit="min", value=float(t), formula="F-NUM-RATE", verify=lambda: t * net == V,
             distractors=[(rf"{fl(Fr(V,a+b))}\ \text{{min}}", T("Added the rates instead of subtracting.", "வீதங்களைக் கழிப்பதற்குப் பதிலாகக் கூட்டியது."))])


# ---------------- G10C23 Formulae ----------------
@tpl("G10C23", "F")
def subst_formula(r):
    u, a, t = r.choice([(5, 2, 3), (10, 3, 4), (0, 9, 2), (8, -2, 3)])
    v = u + a * t
    return Q(T(f"Given v = u + at, find v when u = {u}, a = {a} and t = {t}.", f"v = u + at எனத் தரப்பட்டுள்ளது. u = {u}, a = {a}, t = {t} ஆகும்போது v ஐக் காண்க."),
             [S("Substitute the values.", "பெறுமானங்களைப் பிரதியிடுக.", rf"v = {u} + ({a})\times {t}"),
              S("Multiply first, then add.", "முதலில் பெருக்கிப் பின் கூட்டுக.", rf"v = {u} + ({a*t}) = {v}")],
             f"v = {v}", [T("BODMAS: multiply before adding.", "BODMAS: கூட்டுமுன் பெருக்குக.")], value=v, formula="F-ALG-SUBJ", verify=lambda: v == u + a * t,
             distractors=[(f"v = {(u+a)*t}", T("Added before multiplying.", "பெருக்குமுன் கூட்டியது."))])


@tpl("G10C23", "G")
def change_subject(r):
    return Q(T("Make r the subject of $A = \\pi r^2$, and find r when A = 154 and π = 22/7.", "$A = \\pi r^2$ இல் r ஐ எழுவாயாக்கி, A = 154, π = 22/7 ஆகும்போது r ஐக் காண்க."),
             [S("Divide both sides by π.", "இருபுறமும் π ஆல் வகுக்க.", r"r^2 = \frac{A}{\pi}"),
              S("Take the square root.", "வர்க்கமூலம் எடுக்க.", r"r = \sqrt{\frac{A}{\pi}}"),
              S("Substitute.", "பிரதியிடுக.", r"r = \sqrt{154\times\frac{7}{22}} = \sqrt{49} = 7")],
             r"r=\sqrt{\frac{A}{\pi}},\ r=7", [T("Undo the operations in reverse order.", "செயல்களைத் தலைகீழ் ஒழுங்கில் நீக்குக.")], value=7, formula="F-ALG-SUBJ", verify=lambda: PI * 49 == 154)


@tpl("G10C23", "A")
def change_subject_hard(r):
    return Q(T("Make x the subject of $y = \\frac{2x + 3}{x - 1}$.", "$y = \\frac{2x + 3}{x - 1}$ இல் x ஐ எழுவாயாக்குக."),
             [S("Multiply both sides by (x − 1).", "இருபுறமும் (x − 1) ஆல் பெருக்குக.", r"y(x-1) = 2x+3"),
              S("Expand.", "விரிக்க.", r"xy - y = 2x + 3"),
              S("Collect x terms on one side.", "x உறுப்புகளை ஒருபுறம் சேர்க்க.", r"xy - 2x = y + 3"),
              S("Factorise x.", "x ஐக் காரணியாக எடுக்க.", r"x(y-2) = y+3"),
              S("Divide.", "வகுக்க.", r"x = \frac{y+3}{y-2}")],
             r"x=\frac{y+3}{y-2}", [T("x appears twice — collect, then factorise x out.", "x இருமுறை வருகிறது — சேர்த்து x ஐக் காரணியாக எடுக்க.")], kind="algebra", formula="F-ALG-SUBJ",
             verify=lambda: sp.simplify(sp.sympify("(y+3)/(y-2)").subs("y", (2 * X + 3) / (X - 1)) - X) == 0)


# ---------------- G10C24 Arithmetic progressions ----------------
@tpl("G10C24", "F")
def ap_nth(r):
    a, d, k = r.choice([(3, 4, 10), (5, 3, 15), (20, -2, 8), (7, 5, 12), (2, 6, 20)])
    Tn = a + (k - 1) * d
    return Q(T(f"Find the {k}th term of the arithmetic progression {a}, {a+d}, {a+2*d}, …", f"{a}, {a+d}, {a+2*d}, … எனும் கூட்டல் விருத்தியின் {k} ஆம் உறுப்பைக் காண்க."),
             [S("Identify a and d.", "a, d ஐ இனங்காண்க.", rf"a = {a},\quad d = {a+d} - {a} = {d}"),
              S("Use Tₙ = a + (n − 1)d.", "Tₙ = a + (n − 1)d ஐப் பயன்படுத்துக.", rf"T_{{{k}}} = {a} + ({k}-1)\times({d})"),
              S("Calculate.", "கணிக்க.", rf"T_{{{k}}} = {a} + {(k-1)*d} = {Tn}")],
             str(Tn), [T("d = second term − first term.", "d = இரண்டாம் உறுப்பு − முதலாம் உறுப்பு."), T("Use (n − 1), not n.", "n அல்ல, (n − 1) பயன்படுத்துக.")], value=Tn, formula="F-AP-TN",
             distractors=[(str(a + k * d), T("Used n instead of (n − 1).", "(n − 1) க்குப் பதிலாக n."))], verify=lambda: Tn == a + (k - 1) * d)


@tpl("G10C24", "G")
def ap_sum(r):
    a, d, k = r.choice([(2, 3, 20), (5, 4, 15), (10, 5, 12), (1, 2, 25)])
    Sn = Fr(k, 2) * (2 * a + (k - 1) * d)
    return Q(T(f"Find the sum of the first {k} terms of the AP {a}, {a+d}, {a+2*d}, …", f"{a}, {a+d}, {a+2*d}, … எனும் கூ.வி. இன் முதல் {k} உறுப்புகளின் கூட்டுத்தொகையைக் காண்க."),
             [S("Identify a, d and n.", "a, d, n ஐ இனங்காண்க.", rf"a = {a},\ d = {d},\ n = {k}"),
              S("Use Sₙ = n/2 [2a + (n − 1)d].", "Sₙ = n/2 [2a + (n − 1)d].", rf"S_{{{k}}} = \frac{{{k}}}{{2}}[2\times{a} + ({k}-1)\times{d}]"),
              S("Inside the bracket first.", "முதலில் அடைப்புக்குள்.", rf"= \frac{{{k}}}{{2}}[{2*a} + {(k-1)*d}] = \frac{{{k}}}{{2}}\times{2*a+(k-1)*d}"),
              S("Multiply.", "பெருக்குக.", rf"= {fl(Sn)}")],
             fl(Sn), [T("Sum formula: Sₙ = n/2 [2a + (n − 1)d].", "கூட்டுத்தொகைச் சூத்திரம்.")], value=float(Sn), formula="F-AP-SN", verify=lambda: Sn == sum(a + i * d for i in range(k)))


@tpl("G10C24", "A")
def ap_find_n(r):
    a, d, k = r.choice([(3, 4, 12), (5, 2, 15), (8, 3, 10), (12, 5, 9)])
    Sn = k * (2 * a + (k - 1) * d) // 2
    return Q(T(f"The first term of an AP is {a} and the common difference is {d}. How many terms must be added to get a sum of {Sn}?", f"ஒரு கூ.வி.இன் முதல் உறுப்பு {a}, பொது வித்தியாசம் {d}. கூட்டுத்தொகை {Sn} பெற எத்தனை உறுப்புகளைக் கூட்ட வேண்டும்?"),
             [S("Substitute in Sₙ.", "Sₙ இல் பிரதியிடுக.", rf"{Sn} = \frac{{n}}{{2}}[2\times{a} + (n-1)\times{d}]"),
              S("Multiply by 2 and expand.", "2 ஆல் பெருக்கி விரிக்க.", rf"{2*Sn} = n({2*a} + {d}n - {d}) = {d}n^2 + {2*a-d}n"),
              S("Form a quadratic.", "இருபடிச் சமன்பாடு அமைக்க.", rf"{d}n^2 + {2*a-d}n - {2*Sn} = 0"),
              S("Solve; n must be a positive whole number.", "தீர்க்க; n நேர் முழு எண்ணாக வேண்டும்.", rf"n = {k}")],
             f"n = {k}", [T("You get a quadratic in n.", "n இல் இருபடிச் சமன்பாடு கிடைக்கும்."), T(f"Try factorising with n = {k} as a check.", f"n = {k} எனச் சரிபார்க்க.")], value=k, formula="F-AP-SN",
             verify=lambda: d * k * k + (2 * a - d) * k - 2 * Sn == 0)


# ---------------- G10C25 Algebraic inequalities ----------------
@tpl("G10C25", "F")
def ineq_solve(r):
    a, b, c = r.choice([(2, 3, 11), (3, -1, 8), (5, 2, 17), (4, 1, 13)])
    lim = Fr(c - b, a)
    return Q(T(f"Solve ${a}x {sgn(b)} < {c}$ and write the positive integer solutions.", f"${a}x {sgn(b)} < {c}$ ஐத் தீர்த்து நேர் நிறைவெண் தீர்வுகளை எழுதுக."),
             [S(f"Subtract {b} from both sides.", f"இருபுறமும் {b} ஐக் கழிக்க.", rf"{a}x < {c - b}"),
              S(f"Divide by {a} (positive, so the sign stays).", f"{a} ஆல் வகுக்க (நேர், குறி மாறாது).", rf"x < {fl(lim)}"),
              S("List positive integers less than that.", "அதைவிடச் சிறிய நேர் நிறைவெண்கள்.", rf"x = {', '.join(str(i) for i in range(1, math.ceil(lim)))}")],
             ", ".join(str(i) for i in range(1, math.ceil(lim))), [T("Solve like an equation.", "சமன்பாடு போலத் தீர்க்க.")], formula="F-ALG-INEQ", diagram="GRA-NUMLINE-01", kind="algebra",
             verify=lambda: all(a * i + b < c for i in range(1, math.ceil(lim))) and not a * math.ceil(lim) + b < c)


@tpl("G10C25", "G")
def ineq_negative(r):
    a, b, c = r.choice([(-2, 5, 1), (-3, 4, -5), (-2, 1, -7)])
    lim = Fr(c - b, a)
    return Q(T(f"Solve ${poly([a,b])} \\geq {c}$.", f"${poly([a,b])} \\geq {c}$ ஐத் தீர்க்க."),
             [S(f"Subtract {b}.", f"{b} ஐக் கழிக்க.", rf"{a}x \geq {c-b}"),
              S(f"Divide by {a}. Dividing by a NEGATIVE number reverses the sign.", f"{a} ஆல் வகுக்க. மறை எண்ணால் வகுத்தால் குறி திரும்பும்.", rf"x \leq {fl(lim)}")],
             rf"x \leq {fl(lim)}", [T("What happens to an inequality sign when you divide by a negative?", "மறை எண்ணால் வகுக்கும்போது சமனிலிக் குறிக்கு என்ன நடக்கும்?")], kind="algebra", formula="F-ALG-INEQ", diagram="GRA-NUMLINE-01",
             verify=lambda: a * float(lim) + b == c and a * (float(lim) - 1) + b >= c,
             distractors=[(rf"x \geq {fl(lim)}", T("Sign not reversed.", "குறி திருப்பப்படவில்லை."))], mistake=T("Not reversing the sign when dividing by a negative.", "மறையால் வகுக்கும்போது குறியைத் திருப்பாமை."))


@tpl("G10C25", "A")
def ineq_double(r):
    a, b, lo, hi = r.choice([(2, 1, -3, 9), (3, -2, -8, 7), (2, -1, -5, 7)])
    L, H = Fr(lo - b, a), Fr(hi - b, a)
    ints = [i for i in range(math.ceil(L), math.floor(H) + 1) if lo <= a * i + b < hi]
    return Q(T(f"Find the integer values of x that satisfy ${lo} \\leq {poly([a,b])} < {hi}$.", f"${lo} \\leq {poly([a,b])} < {hi}$ ஐத் திருப்திப்படுத்தும் x இன் நிறைவெண் பெறுமானங்களைக் காண்க."),
             [S(f"Subtract {b} from all three parts.", f"மூன்று பகுதிகளிலிருந்தும் {b} ஐக் கழிக்க.", rf"{lo-b} \leq {a}x < {hi-b}"),
              S(f"Divide all parts by {a}.", f"எல்லாப் பகுதிகளையும் {a} ஆல் வகுக்க.", rf"{fl(L)} \leq x < {fl(H)}"),
              S("List the integers.", "நிறைவெண்களைப் பட்டியலிடுக.", rf"x = {', '.join(map(str, ints))}")],
             ", ".join(map(str, ints)), [T("Do the same operation to all three parts.", "மூன்று பகுதிகளுக்கும் ஒரே செயலைச் செய்க."), T("≤ includes the end; < does not.", "≤ முனையை உள்ளடக்கும்; < உள்ளடக்காது.")],
             kind="algebra", formula="F-ALG-INEQ", diagram="GRA-NUMLINE-01", verify=lambda: all(lo <= a * i + b < hi for i in ints))


# ---------------- G10C26 Frequency distribution ----------------
@tpl("G10C26", "F")
def mean_ungrouped(r):
    xs, fs = r.choice([([1, 2, 3, 4, 5], [3, 5, 8, 3, 1]), ([10, 20, 30, 40], [2, 5, 8, 5]), ([2, 3, 4, 5, 6], [4, 6, 5, 3, 2])])
    fx = [x * f for x, f in zip(xs, fs)]; m = Fr(sum(fx), sum(fs))
    return Q(T(f"Find the mean of the distribution: values {xs} with frequencies {fs}.", f"பெறுமானங்கள் {xs}, மீடிறன்கள் {fs} உடைய பரம்பலின் இடையைக் காண்க."),
             [S("Multiply each value by its frequency.", "ஒவ்வொரு பெறுமானத்தையும் அதன் மீடிறனால் பெருக்குக.", r"fx: " + ", ".join(map(str, fx))),
              S("Add fx and add f.", "fx, f ஐக் கூட்டுக.", rf"\Sigma fx = {sum(fx)},\quad \Sigma f = {sum(fs)}"),
              S("Mean = Σfx ÷ Σf.", "இடை = Σfx ÷ Σf.", rf"\bar{{x}} = \frac{{{sum(fx)}}}{{{sum(fs)}}} = {n(float(m),2) if m.denominator>1 else fl(m)}")],
             n(float(m), 2) if m.denominator > 1 else fl(m), [T("Mean = total of all values ÷ number of values.", "இடை = எல்லாப் பெறுமானங்களின் கூட்டுத்தொகை ÷ எண்ணிக்கை.")], value=float(m), tol=0.01, formula="F-STA-MEAN",
             distractors=[(n(sum(fx) / len(xs), 2), T("Divided by the number of rows instead of Σf.", "Σf க்குப் பதிலாக வரிசை எண்ணிக்கையால் வகுத்தது."))], verify=lambda: abs(float(m) - sum(fx) / sum(fs)) < 1e-9)


@tpl("G10C26", "G")
def mean_grouped(r):
    cls = [(0, 10), (10, 20), (20, 30), (30, 40), (40, 50)]
    fs = r.choice([[3, 7, 12, 5, 3], [2, 5, 9, 8, 6], [4, 6, 10, 6, 4]])
    mids = [(a + b) / 2 for a, b in cls]; fx = [m * f for m, f in zip(mids, fs)]; mean = sum(fx) / sum(fs)
    modal = cls[fs.index(max(fs))]
    return Q(T(f"Classes 0–10, 10–20, 20–30, 30–40, 40–50 have frequencies {fs}. Find (i) the modal class (ii) the mean using mid-values.",
               f"0–10, 10–20, 20–30, 30–40, 40–50 வகுப்புகளின் மீடிறன்கள் {fs}. (i) ஆகார வகுப்பு (ii) நடுப்பெறுமானங்களைப் பயன்படுத்தி இடை ஆகியவற்றைக் காண்க."),
             [S("Modal class = class with the highest frequency.", "ஆகார வகுப்பு = அதிக மீடிறன் உடைய வகுப்பு.", rf"{modal[0]}-{modal[1]}"),
              S("Mid-values.", "நடுப்பெறுமானங்கள்.", r"x: " + ", ".join(n(m) for m in mids)),
              S("fx for each class.", "ஒவ்வொரு வகுப்புக்கும் fx.", r"fx: " + ", ".join(n(v) for v in fx)),
              S("Totals.", "கூட்டுத்தொகைகள்.", rf"\Sigma fx = {n(sum(fx))},\quad \Sigma f = {sum(fs)}"),
              S("Mean.", "இடை.", rf"\bar x = \frac{{{n(sum(fx))}}}{{{sum(fs)}}} = {n(mean,2)}")],
             rf"(i)\ {modal[0]}-{modal[1]}\quad(ii)\ {n(mean,2)}", [T("Mid-value = (lower + upper) ÷ 2.", "நடுப்பெறுமானம் = (கீழ் + மேல்) ÷ 2.")], value=round(mean, 2), tol=0.01, formula="F-STA-MEAN", diagram="STA-HIST-01",
             verify=lambda: abs(mean - sum(m * f for m, f in zip(mids, fs)) / sum(fs)) < 1e-9)


@tpl("G10C26", "A")
def mean_assumed(r):
    cls = [(10, 20), (20, 30), (30, 40), (40, 50), (50, 60), (60, 70)]
    fs = r.choice([[2, 6, 10, 12, 7, 3], [4, 8, 15, 10, 8, 5], [3, 5, 9, 11, 8, 4]])
    mids = [(a + b) // 2 for a, b in cls]; A = 45; ds = [m - A for m in mids]; fd = [d * f for d, f in zip(ds, fs)]
    mean = A + sum(fd) / sum(fs)
    return Q(T(f"Using the assumed mean 45, find the mean of the distribution with classes 10–20 … 60–70 and frequencies {fs} (to 2 d.p.). (Paper II style)",
               f"ஊக இடை 45 ஐப் பயன்படுத்தி, 10–20 … 60–70 வகுப்புகளும் மீடிறன்கள் {fs} உம் உடைய பரம்பலின் இடையைக் காண்க (2 தசமதானங்கள்). (வினாத்தாள் II வகை)"),
             [S("Mid-values x.", "நடுப்பெறுமானங்கள் x.", ", ".join(map(str, mids))),
              S("Deviations d = x − 45.", "விலகல்கள் d = x − 45.", ", ".join(map(str, ds))),
              S("fd for each class.", "ஒவ்வொரு வகுப்புக்கும் fd.", ", ".join(map(str, fd))),
              S("Totals.", "கூட்டுத்தொகைகள்.", rf"\Sigma fd = {sum(fd)},\quad \Sigma f = {sum(fs)}"),
              S("Mean = A + Σfd ÷ Σf.", "இடை = A + Σfd ÷ Σf.", rf"\bar x = 45 + \frac{{{sum(fd)}}}{{{sum(fs)}}} = {n(mean,2)}")],
             n(mean, 2), [T("The assumed mean makes the numbers smaller.", "ஊக இடை எண்களைச் சிறிதாக்கும்."), T("Keep the sign of negative deviations.", "மறை விலகல்களின் குறியை வைத்திருக்க.")],
             value=round(mean, 2), tol=0.01, formula="F-STA-AMEAN", verify=lambda: abs(mean - sum(m * f for m, f in zip(mids, fs)) / sum(fs)) < 1e-9,
             mistake=T("Forgetting to add the assumed mean back at the end.", "இறுதியில் ஊக இடையை மீண்டும் கூட்ட மறத்தல்."))


# ---------------- G10C27 Chords of a circle ----------------
@tpl("G10C27", "F")
def chord_length(r):
    rad, dist = r.choice([(5, 3), (13, 5), (10, 6), (17, 8), (25, 7)])
    half = int(math.isqrt(rad * rad - dist * dist))
    return Q(T(f"A circle has radius {rad} cm. A chord is {dist} cm from the centre. Find the length of the chord.", f"ஒரு வட்டத்தின் ஆரை {rad} cm. ஒரு நாண் மையத்திலிருந்து {dist} cm தூரத்தில் உள்ளது. நாணின் நீளத்தைக் காண்க."),
             [S("The perpendicular from the centre bisects the chord.", "மையத்திலிருந்தான செங்குத்து நாணை இருசமகூறிடும்.", r"AM = MB"),
              S("Use Pythagoras in the right triangle OMA.", "செங்கோண முக்கோணி OMA இல் பைதகரசு.", rf"AM^2 = {rad}^2 - {dist}^2 = {rad*rad-dist*dist}"),
              S("Find half the chord.", "நாணின் அரைவாசியைக் காண்க.", rf"AM = {half}\ \text{{cm}}"),
              S("Double it.", "இரட்டிக்குக.", rf"AB = 2\times {half} = {2*half}\ \text{{cm}}")],
             rf"{2*half}\ \text{{cm}}", [T("Draw the radius to the end of the chord — it is the hypotenuse.", "நாணின் முனைக்கு ஆரையை வரைக — அது செம்பக்கம்.")], unit="cm", value=2 * half, formula="T-GEO-CHORD", diagram="GEO-CHORD-01",
             distractors=[(rf"{half}\ \text{{cm}}", T("Gave half the chord.", "நாணின் அரைவாசியைத் தந்தது."))], verify=lambda: half * half + dist * dist == rad * rad)


@tpl("G10C27", "G")
def chord_distance(r):
    rad, half = r.choice([(10, 8), (13, 12), (5, 4), (15, 12)])
    d = int(math.isqrt(rad * rad - half * half))
    return Q(T(f"A chord of length {2*half} cm is drawn in a circle of radius {rad} cm. Find the distance of the chord from the centre.", f"ஆரை {rad} cm உடைய வட்டத்தில் {2*half} cm நீள நாண் வரையப்பட்டுள்ளது. நாணுக்கு மையத்திலிருந்தான தூரத்தைக் காண்க."),
             [S("Half of the chord.", "நாணின் அரைவாசி.", rf"{2*half}\div 2 = {half}\ \text{{cm}}"),
              S("Pythagoras.", "பைதகரசு.", rf"OM^2 = {rad}^2 - {half}^2 = {d*d}"),
              S("Square root.", "வர்க்கமூலம்.", rf"OM = {d}\ \text{{cm}}")],
             rf"{d}\ \text{{cm}}", [T("Use half the chord, not the whole chord.", "முழு நாண் அல்ல, அரைவாசியைப் பயன்படுத்துக.")], unit="cm", value=d, formula="T-GEO-CHORD", diagram="GEO-CHORD-01", verify=lambda: d * d + half * half == rad * rad)


@tpl("G10C27", "A")
def chord_radius(r):
    half, d = r.choice([(12, 5), (8, 6), (15, 8), (4, 3)])
    rad = int(math.isqrt(half * half + d * d))
    return Q(T(f"A chord AB = {2*half} cm is {d} cm from the centre O of a circle. Find the radius of the circle.", f"AB = {2*half} cm நாண் மையம் O இலிருந்து {d} cm தூரத்தில் உள்ளது. வட்டத்தின் ஆரையைக் காண்க."),
             [S("Half chord and distance form a right triangle with the radius.", "அரை நாணும் தூரமும் ஆரையுடன் செங்கோண முக்கோணியை அமைக்கும்.", rf"r^2 = {half}^2 + {d}^2"),
              S("Calculate.", "கணிக்க.", rf"r^2 = {half*half} + {d*d} = {rad*rad}"),
              S("Square root.", "வர்க்கமூலம்.", rf"r = {rad}\ \text{{cm}}")],
             rf"{rad}\ \text{{cm}}", [T("The radius is the hypotenuse.", "ஆரை செம்பக்கம்.")], unit="cm", value=rad, formula="T-GEO-CHORD", diagram="GEO-CHORD-01", verify=lambda: rad * rad == half * half + d * d)


# ---------------- G10C28 Construction (loci) ----------------
@tpl("G10C28", "F")
def locus_identify(r):
    c = r.choice([("equidistant from two points A and B", "A, B எனும் இரு புள்ளிகளிலிருந்து சம தூரத்தில்", "the perpendicular bisector of AB", "AB இன் செங்குத்து இருசமகூறாக்கி"),
                  ("equidistant from two intersecting lines", "வெட்டும் இரு கோடுகளிலிருந்து சம தூரத்தில்", "the bisector of the angle between them", "அவற்றுக்கிடையிலான கோணத்தின் இருசமகூறாக்கி"),
                  ("at a constant distance 3 cm from a fixed point O", "நிலைத்த புள்ளி O இலிருந்து மாறாத் தூரம் 3 cm இல்", "a circle with centre O and radius 3 cm", "மையம் O, ஆரை 3 cm உடைய வட்டம்"),
                  ("at a constant distance 2 cm from a straight line l", "நேர்கோடு l இலிருந்து மாறாத் தூரம் 2 cm இல்", "two lines parallel to l, 2 cm on each side", "l இன் இருபுறமும் 2 cm தூரத்தில் இரு சமாந்தரக் கோடுகள்")])
    return Q(T(f"What is the locus of a point that moves {c[0]}?", f"{c[1]} அசையும் புள்ளியின் ஒழுக்கு யாது?"),
             [S("Recall the four basic loci.", "நான்கு அடிப்படை ஒழுக்குகளையும் நினைவுகூர்க.", r"\text{point, line, two points, two lines}"),
              S("Match the condition.", "நிபந்தனையைப் பொருத்துக.", rf"\text{{{c[2]}}}")],
             rf"\text{{{c[2]}}}", [T("Draw a few positions of the point and join them.", "புள்ளியின் சில நிலைகளை வரைந்து இணைக்க.")], kind="concept", formula="C-LOCUS", diagram="CON-PERPBIS-01", verify=lambda: True)


@tpl("G10C28", "G")
def construct_perp_bisector(r):
    L = r.choice([6, 7, 8])
    return Q(T(f"Construct the perpendicular bisector of a line segment AB = {L} cm. List the construction steps.", f"AB = {L} cm நீளக் கோட்டுத்துண்டின் செங்குத்து இருசமகூறாக்கியை அமைக்க. அமைப்புப் படிகளைப் பட்டியலிடுக."),
             [S(f"Draw AB = {L} cm with a ruler.", f"அளவுகோலால் AB = {L} cm வரைக.", rf"AB = {L}\ \text{{cm}}"),
              S("With centre A and radius more than half of AB, draw arcs above and below AB.", "மையம் A, AB இன் அரைவாசியிலும் கூடிய ஆரையுடன் AB க்கு மேலும் கீழும் விற்களை வரைக.", rf"r > {L/2}\ \text{{cm}}"),
              S("With centre B and the SAME radius, draw arcs to cut the first arcs at P and Q.", "மையம் B, அதே ஆரையுடன் விற்களை வரைந்து முதல் விற்களை P, Q இல் வெட்டுக.", r"P,\ Q"),
              S("Join PQ. PQ is the perpendicular bisector of AB.", "PQ ஐ இணைக்க. PQ, AB இன் செங்குத்து இருசமகூறாக்கி.", r"PQ\perp AB,\ AM = MB")],
             r"PQ\ \text{is the perpendicular bisector}", [T("Keep the compass width the same for both arcs.", "இரு விற்களுக்கும் கவராயத்தின் அகலம் மாறக்கூடாது.")], kind="construction", formula="C-PERPBIS", diagram="CON-PERPBIS-01", verify=lambda: True)


@tpl("G10C28", "A")
def construct_equidistant(r):
    return Q(T("Construct triangle ABC with AB = 7 cm, ∠ABC = 60° and BC = 6 cm. Locate the point P on BC that is equidistant from AB and AC. Give the steps.",
               "AB = 7 cm, ∠ABC = 60°, BC = 6 cm உடைய ABC முக்கோணியை அமைக்க. AB, AC இலிருந்து சம தூரத்திலுள்ள BC மீதான புள்ளி P ஐக் காண்க. படிகளைத் தருக."),
             [S("Draw AB = 7 cm.", "AB = 7 cm வரைக.", r"AB = 7\ \text{cm}"),
              S("Construct 60° at B (arc from B, then same radius arc from where it cuts BA).", "B இல் 60° அமைக்க (B இலிருந்து வில், அது BA ஐ வெட்டுமிடத்திலிருந்து அதே ஆரை வில்).", r"\angle ABC = 60^\circ"),
              S("Mark C on that arm with BC = 6 cm; join AC.", "அக்கையில் BC = 6 cm ஆக C ஐக் குறித்து AC ஐ இணைக்க.", r"BC = 6\ \text{cm}"),
              S("Equidistant from AB and AC → bisect ∠BAC.", "AB, AC இலிருந்து சம தூரம் → ∠BAC ஐ இருசமகூறிடுக.", r"\text{bisector of }\angle BAC"),
              S("Where the bisector meets BC is P.", "இருசமகூறாக்கி BC ஐச் சந்திக்குமிடம் P.", r"P = \text{bisector}\cap BC")],
             r"P\ \text{on the bisector of }\angle BAC", [T("Points equidistant from two lines lie on the angle bisector.", "இரு கோடுகளிலிருந்து சம தூரத்திலுள்ள புள்ளிகள் கோண இருசமகூறாக்கியில் உள்ளன.")], kind="construction", formula="C-ANGBIS", diagram="CON-ANGBIS-01", verify=lambda: True)


# ---------------- G10C29 Surface area and volume ----------------
@tpl("G10C29", "F")
def cylinder_volume(r):
    rad, h = r.choice([(7, 10), (14, 5), (7, 20), (21, 4)])
    V = PI * rad * rad * h
    return Q(T(f"Find the volume of a cylinder with radius {rad} cm and height {h} cm. (π = 22/7)", f"ஆரை {rad} cm, உயரம் {h} cm உடைய உருளையின் கனவளவைக் காண்க. (π = 22/7)"),
             [S("V = πr²h.", "V = πr²h.", rf"V = \frac{{22}}{{7}}\times {rad}^2\times {h}"),
              S("Calculate.", "கணிக்க.", rf"V = {n(int(V))}\ \text{{cm}}^3")],
             rf"{n(int(V))}\ \text{{cm}}^3", [T("Volume = base area × height.", "கனவளவு = அடிப் பரப்பு × உயரம்.")], unit="cm³", value=float(V), formula="F-MEN-CYLV", diagram="SOL-CYL-01",
             distractors=[(rf"{n(int(2*PI*rad*h))}\ \text{{cm}}^3", T("Used the curved surface area formula.", "வளைமேற்பரப்புச் சூத்திரம்."))], verify=lambda: abs(float(V) - math.pi * rad * rad * h) / float(V) < 0.001)


@tpl("G10C29", "G")
def cylinder_tsa(r):
    rad, h = r.choice([(7, 10), (14, 6), (7, 3)])
    csa = 2 * PI * rad * h; ends = 2 * PI * rad * rad; tsa = csa + ends
    return Q(T(f"Find the total surface area of a closed cylinder of radius {rad} cm and height {h} cm. (π = 22/7)", f"ஆரை {rad} cm, உயரம் {h} cm உடைய மூடிய உருளையின் மொத்த மேற்பரப்பளவைக் காண்க. (π = 22/7)"),
             [S("Curved surface = 2πrh.", "வளைமேற்பரப்பு = 2πrh.", rf"2\times\frac{{22}}{{7}}\times{rad}\times{h} = {fl(csa)}"),
              S("Two circular ends = 2πr².", "இரு வட்ட முனைகள் = 2πr².", rf"2\times\frac{{22}}{{7}}\times{rad}^2 = {fl(ends)}"),
              S("Add.", "கூட்டுக.", rf"{fl(csa)} + {fl(ends)} = {fl(tsa)}\ \text{{cm}}^2")],
             rf"{fl(tsa)}\ \text{{cm}}^2", [T("Closed = two ends.", "மூடியது = இரு முனைகள்.")], unit="cm²", value=float(tsa), formula="F-MEN-CYLA", diagram="SOL-CYL-01", verify=lambda: abs(float(tsa) - (2 * math.pi * rad * h + 2 * math.pi * rad * rad)) / float(tsa) < 0.001,
             distractors=[(rf"{fl(csa+PI*rad*rad)}\ \text{{cm}}^2", T("Only one end added (open cylinder).", "ஒரு முனை மட்டும் (திறந்த உருளை)."))])


@tpl("G10C29", "A")
def prism_to_cylinder(r):
    l, b, h, rad = r.choice([(22, 14, 10, 7), (44, 7, 14, 7), (22, 21, 8, 14)])
    V = l * b * h; H = Fr(V) / (PI * rad * rad)
    return Q(T(f"Water filling a cuboid tank {l} cm × {b} cm × {h} cm is poured into an empty cylinder of radius {rad} cm. Find the height of water in the cylinder. (π = 22/7)",
               f"{l} cm × {b} cm × {h} cm கனவுருத் தாங்கியை நிரப்பிய நீர், ஆரை {rad} cm உடைய வெறுமையான உருளைக்குள் ஊற்றப்படுகிறது. உருளையில் நீரின் உயரத்தைக் காண்க. (π = 22/7)"),
             [S("Volume of water in the cuboid.", "கனவுருவிலுள்ள நீரின் கனவளவு.", rf"{l}\times{b}\times{h} = {n(V)}\ \text{{cm}}^3"),
              S("Same volume in the cylinder.", "அதே கனவளவு உருளையில்.", rf"\frac{{22}}{{7}}\times{rad}^2\times H = {n(V)}"),
              S("Solve for H.", "H ஐத் தீர்க்க.", rf"H = \frac{{{n(V)}}}{{{fl(PI*rad*rad)}}} = {fl(H)}\ \text{{cm}}")],
             rf"{fl(H)}\ \text{{cm}}", [T("The volume of water does not change.", "நீரின் கனவளவு மாறாது.")], unit="cm", value=float(H), formula="F-MEN-CYLV", diagram="SOL-CYL-01", verify=lambda: PI * rad * rad * H == V)


# ---------------- G10C30 Probability ----------------
@tpl("G10C30", "F")
def prob_simple(r):
    red, blue, green = r.choice([(3, 5, 2), (4, 6, 5), (2, 3, 7), (5, 5, 10)])
    tot = red + blue + green; p = Fr(red, tot)
    return Q(T(f"A bag has {red} red, {blue} blue and {green} green balls (identical except colour). One ball is taken at random. Find the probability that it is red.",
               f"ஒரு பையில் {red} சிவப்பு, {blue} நீலம், {green} பச்சைப் பந்துகள் (நிறம் தவிர ஒத்தவை) உள்ளன. எழுமாற்றாக ஒரு பந்து எடுக்கப்படுகிறது. அது சிவப்பாக இருப்பதற்கான நிகழ்தகவைக் காண்க."),
             [S("Total number of balls.", "மொத்தப் பந்துகள்.", rf"{red}+{blue}+{green} = {tot}"),
              S("P(red) = red ÷ total.", "P(சிவப்பு) = சிவப்பு ÷ மொத்தம்.", rf"P = \frac{{{red}}}{{{tot}}} = {fl(p)}")],
             fl(p), [T("Probability = favourable outcomes ÷ total outcomes.", "நிகழ்தகவு = சாதகமான விளைவுகள் ÷ மொத்த விளைவுகள்.")], value=float(p), formula="F-PRO-BASIC",
             distractors=[(fl(Fr(red, blue + green)), T("Divided by the other balls only.", "மற்றப் பந்துகளால் மட்டும் வகுத்தது."))], verify=lambda: p == Fr(red, tot))


@tpl("G10C30", "G")
def prob_complement(r):
    num, den = r.choice([(3, 8), (2, 5), (7, 12), (5, 9)])
    p = Fr(num, den)
    return Q(T(f"The probability that it rains tomorrow is {fl(p)}. Find the probability that it does NOT rain.", f"நாளை மழை பெய்வதற்கான நிகழ்தகவு {fl(p)}. மழை பெய்யாமல் இருப்பதற்கான நிகழ்தகவைக் காண்க."),
             [S("P(not A) = 1 − P(A).", "P(A அல்லாதது) = 1 − P(A).", rf"1 - {fl(p)} = {fl(1-p)}")],
             fl(1 - p), [T("An event and its complement add to 1.", "ஒரு நிகழ்ச்சியும் அதன் நிரப்பியும் 1 ஆகும்.")], value=float(1 - p), formula="F-PRO-COMP", verify=lambda: p + (1 - p) == 1)


@tpl("G10C30", "A")
def prob_dice_grid(r):
    cond = r.choice([("the sum is 7", "கூட்டுத்தொகை 7", lambda a, b: a + b == 7), ("the sum is greater than 9", "கூட்டுத்தொகை 9 இலும் கூடியது", lambda a, b: a + b > 9),
                     ("both numbers are even", "இரு எண்களும் இரட்டை", lambda a, b: a % 2 == 0 and b % 2 == 0), ("the product is 12", "பெருக்கம் 12", lambda a, b: a * b == 12)])
    fav = [(a, b) for a in range(1, 7) for b in range(1, 7) if cond[2](a, b)]; p = Fr(len(fav), 36)
    return Q(T(f"Two fair dice are rolled. Using a grid of the sample space, find the probability that {cond[0]}.", f"இரு சீரான தாயக்கட்டைகள் உருட்டப்படுகின்றன. மாதிரிவெளி நெய்யரியைப் பயன்படுத்தி {cond[1]} ஆவதற்கான நிகழ்தகவைக் காண்க."),
             [S("The grid has 6 × 6 = 36 equally likely outcomes.", "நெய்யரியில் 6 × 6 = 36 சம வாய்ப்புள்ள விளைவுகள்.", r"n(S) = 36"),
              S("Mark the favourable outcomes.", "சாதகமான விளைவுகளைக் குறிக்க.", ", ".join(f"({a},{b})" for a, b in fav)),
              S("Count them and divide.", "எண்ணி வகுக்க.", rf"P = \frac{{{len(fav)}}}{{36}} = {fl(p)}")],
             fl(p), [T("Draw a 6 × 6 grid: first die across, second die down.", "6 × 6 நெய்யரி வரைக.")], value=float(p), formula="F-PRO-BASIC", diagram="PRO-GRID-01", verify=lambda: len(fav) == sum(1 for a in range(1, 7) for b in range(1, 7) if cond[2](a, b)))


# ---------------- G10C31 Angles in a circle ----------------
@tpl("G10C31", "F")
def angle_centre(r):
    c = r.choice([50, 64, 70, 35, 42])
    return Q(T(f"O is the centre of the circle. The angle subtended by arc AB at a point C on the circumference is {c}°. Find ∠AOB.", f"O வட்டத்தின் மையம். AB வில் பரிதியிலுள்ள C இல் எதிரமைக்கும் கோணம் {c}°. ∠AOB ஐக் காண்க."),
             [S("Angle at the centre = 2 × angle at the circumference.", "மையக் கோணம் = 2 × பரிதிக் கோணம்.", rf"\angle AOB = 2\times {c}^\circ = {2*c}^\circ")],
             f"{2*c}^\\circ", [T("Both angles stand on the same arc AB.", "இரு கோணங்களும் ஒரே வில் AB மீது நிற்கின்றன.")], unit="°", value=2 * c, formula="T-CIR-CENTRE", diagram="GEO-CIRC-CENTRE-01",
             distractors=[(f"{c//2}^\\circ", T("Halved instead of doubling.", "இரட்டிப்பதற்குப் பதிலாக அரைவாசி.")), (f"{c}^\\circ", T("Treated as same-segment angles.", "ஒரே துண்ட கோணங்களாகக் கருதியது."))], verify=lambda: True)


@tpl("G10C31", "G")
def angle_semicircle(r):
    a = r.choice([32, 48, 55, 61, 27])
    return Q(T(f"AB is a diameter of a circle and C is a point on the circle. ∠CAB = {a}°. Find ∠ABC.", f"AB வட்டத்தின் விட்டம்; C வட்டத்திலுள்ள ஒரு புள்ளி. ∠CAB = {a}°. ∠ABC ஐக் காண்க."),
             [S("Angle in a semicircle is 90°.", "அரைவட்டத்திலுள்ள கோணம் 90°.", r"\angle ACB = 90^\circ"),
              S("Angle sum of ΔABC.", "ΔABC இன் கோணக் கூட்டுத்தொகை.", rf"\angle ABC = 180 - 90 - {a} = {90-a}^\circ")],
             f"{90-a}^\\circ", [T("Which angle stands on the diameter?", "எந்தக் கோணம் விட்டத்தின் மீது நிற்கிறது?")], unit="°", value=90 - a, formula="T-CIR-SEMI", diagram="GEO-CIRC-SEMI-01", verify=lambda: True)


@tpl("G10C31", "A")
def angle_same_segment(r):
    a, b = r.choice([(35, 50), (28, 62), (40, 45)])
    return Q(T(f"A, B, C, D are points on a circle (in that order). ∠BAC = {a}° and ∠ACD = {b}°. Find ∠BDC and ∠ABD.", f"A, B, C, D வட்டத்திலுள்ள புள்ளிகள். ∠BAC = {a}°, ∠ACD = {b}°. ∠BDC, ∠ABD ஐக் காண்க."),
             [S("Angles in the same segment (on arc BC) are equal.", "ஒரே துண்டத்திலுள்ள (வில் BC மீது) கோணங்கள் சமம்.", rf"\angle BDC = \angle BAC = {a}^\circ"),
              S("Angles on arc AD are equal.", "வில் AD மீதுள்ள கோணங்கள் சமம்.", rf"\angle ABD = \angle ACD = {b}^\circ")],
             rf"\angle BDC={a}^\circ,\ \angle ABD={b}^\circ", [T("Find which arc each angle stands on.", "ஒவ்வொரு கோணமும் எந்த வில் மீது நிற்கிறது எனக் காண்க.")], unit="°", value=a, formula="T-CIR-SAMESEG", diagram="GEO-CIRC-SAMESEG-01", verify=lambda: True)


# ---------------- G10C32 Scale diagrams ----------------
@tpl("G10C32", "F")
def scale_convert(r):
    s, cm = r.choice([(500, 6), (1000, 4.5), (2000, 3.2), (100, 7)])
    m = s * cm / 100
    return Q(T(f"On a scale diagram drawn to 1 : {n(s)}, a length is {cm} cm. Find the actual length in metres.", f"1 : {n(s)} அளவிடையில் வரைந்த படத்தில் ஒரு நீளம் {cm} cm. உண்மை நீளத்தை மீற்றரில் காண்க."),
             [S("Multiply by the scale.", "அளவிடையால் பெருக்குக.", rf"{cm}\times {n(s)} = {n(cm*s)}\ \text{{cm}}"),
              S("Convert cm to m (÷ 100).", "cm ஐ m ஆக மாற்றுக (÷ 100).", rf"{n(cm*s)}\div 100 = {n(m)}\ \text{{m}}")],
             rf"{n(m)}\ \text{{m}}", [T("1 cm on paper = scale cm in reality.", "தாளில் 1 cm = உண்மையில் அளவிடை cm.")], unit="m", value=m, formula="F-TRI-SCALE", verify=lambda: abs(m - cm * s / 100) < 1e-9)


@tpl("G10C32", "G")
def bearing_back(r):
    b = r.choice([40, 75, 120, 210, 300, 155])
    back = (b + 180) % 360
    return Q(T(f"The bearing of B from A is {b:03d}°. Find the bearing of A from B.", f"A இலிருந்து B இன் திசைகோள் {b:03d}°. B இலிருந்து A இன் திசைகோளைக் காண்க."),
             [S("Back bearing = bearing ± 180°.", "எதிர்த் திசைகோள் = திசைகோள் ± 180°.", rf"{b} {'+' if b<180 else '-'} 180 = {back}"),
              S("Write with three digits.", "மூன்று இலக்கங்களில் எழுதுக.", rf"{back:03d}^\circ")],
             f"{back:03d}^\\circ", [T("Bearings are measured clockwise from North, with 3 digits.", "திசைகோள்கள் வடக்கிலிருந்து வலஞ்சுழியாக, 3 இலக்கங்களில்.")], unit="°", value=back, formula="F-TRI-BEAR", diagram="TRI-BEARING-01", verify=lambda: (back - b) % 360 == 180)


@tpl("G10C32", "A")
def elevation_scale(r):
    d, ang = r.choice([(40, 30), (50, 40), (30, 50)])
    h = d * math.tan(math.radians(ang))
    return Q(T(f"A point P is {d} m from the foot of a tower on level ground. The angle of elevation of the top is {ang}°. Using a scale of 1 cm : 10 m, describe the scale drawing and estimate the height of the tower.",
               f"சமதரையில் கோபுர அடியிலிருந்து {d} m தூரத்திலுள்ள P இலிருந்து உச்சியின் ஏற்றக்கோணம் {ang}°. 1 cm : 10 m அளவிடையில் அளவிடைப் படத்தை விவரித்து கோபுரத்தின் உயரத்தை மதிப்பிடுக."),
             [S("Convert the distance with the scale.", "அளவிடையால் தூரத்தை மாற்றுக.", rf"{d}\ \text{{m}} \to {d/10}\ \text{{cm}}"),
              S(f"Draw PQ = {d/10} cm, a perpendicular at Q, and {ang}° at P with a protractor.", f"PQ = {d/10} cm, Q இல் செங்குத்து, P இல் பாகைமானியால் {ang}° வரைக.", rf"\angle P = {ang}^\circ"),
              S("Measure the height on the drawing (about):", "படத்தில் உயரத்தை அளக்க (அண்ணளவாக):", rf"\approx {h/10:.1f}\ \text{{cm}}"),
              S("Convert back with the scale.", "அளவிடையால் மீண்டும் மாற்றுக.", rf"{h/10:.1f}\times 10 \approx {h:.0f}\ \text{{m}}")],
             rf"\approx {h:.0f}\ \text{{m}}", [T("A careful drawing gives an answer within about ±1 m.", "கவனமான வரைபு ±1 m அளவில் விடை தரும்.")], unit="m", value=round(h), tol=1.5, formula="F-TRI-SCALE", diagram="TRI-ELEV-01",
             verify=lambda: abs(h - d * math.tan(math.radians(ang))) < 1e-9)
