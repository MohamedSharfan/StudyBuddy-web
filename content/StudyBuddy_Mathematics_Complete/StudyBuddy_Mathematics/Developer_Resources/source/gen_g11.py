"""Grade 11 chapters 1-25."""
from core import *
import math
from fractions import Fraction as Fr
import sympy as sp
X = sp.Symbol("x")

# ---------------- G11C01 Real numbers (surds) ----------------
@tpl("G11C01", "F")
def classify(r):
    items = [("\\sqrt{16}", "rational", "விகிதமுறு"), ("\\sqrt{7}", "irrational", "விகிதமுறா"), ("0.\\dot{3}", "rational", "விகிதமுறு"), ("\\pi", "irrational", "விகிதமுறா"), ("\\frac{22}{7}", "rational", "விகிதமுறு"), ("\\sqrt{2}+1", "irrational", "விகிதமுறா")]
    it = r.choice(items)
    return Q(T(f"Is ${it[0]}$ rational or irrational? Give a reason.", f"${it[0]}$ விகிதமுறு எண்ணா, விகிதமுறா எண்ணா? காரணம் தருக."),
             [S("A rational number can be written as p/q (q ≠ 0); its decimal ends or repeats.", "விகிதமுறு எண்ணை p/q (q ≠ 0) ஆக எழுதலாம்; அதன் தசமம் முடிவுறும் அல்லது மீளும்.", r"\frac{p}{q}"),
              S("Check the given number.", "தரப்பட்ட எண்ணைச் சோதிக்க.", rf"{it[0]} \Rightarrow \text{{{it[1]}}}")],
             rf"\text{{{it[1]}}}", [T("√ of a non-square whole number is irrational.", "நிறைவர்க்கமல்லாத முழு எண்ணின் √ விகிதமுறாதது.")], kind="concept", formula="F-NUM-REAL", verify=lambda: True)


@tpl("G11C01", "G")
def simplify_surd(r):
    k, m = r.choice([(5, 2), (3, 3), (4, 5), (6, 2), (2, 7), (3, 5)])
    N = k * k * m
    return Q(T(f"Write $\\sqrt{{{N}}}$ in its simplest surd form.", f"$\\sqrt{{{N}}}$ ஐ எளிய கரணி வடிவில் எழுதுக."),
             [S("Find the largest square factor.", "மிகப்பெரிய வர்க்கக் காரணியைக் காண்க.", rf"{N} = {k*k}\times {m}"),
              S("Split the root.", "மூலத்தைப் பிரிக்க.", rf"\sqrt{{{N}}} = \sqrt{{{k*k}}}\times\sqrt{{{m}}}"),
              S("Simplify.", "சுருக்குக.", rf"= {k}\sqrt{{{m}}}")],
             rf"{k}\sqrt{{{m}}}", [T(f"Which square number divides {N}?", f"{N} ஐ எந்த வர்க்க எண் வகுக்கும்?")], kind="algebra", formula="F-NUM-SURD", verify=lambda: k * k * m == N,
             distractors=[(rf"{m}\sqrt{{{k}}}", T("Square factor and other factor swapped.", "காரணிகள் மாறின."))])


@tpl("G11C01", "A")
def rationalise(r):
    a, b = r.choice([(6, 3), (10, 5), (4, 2), (15, 3), (14, 7)])
    res = Fr(a, b)
    return Q(T(f"Rationalise the denominator and simplify: $\\frac{{{a}}}{{\\sqrt{{{b}}}}}$", f"பகுதியை விகிதமுறாக்கிச் சுருக்குக: $\\frac{{{a}}}{{\\sqrt{{{b}}}}}$"),
             [S(f"Multiply top and bottom by √{b}.", f"மேலும் கீழும் √{b} ஆல் பெருக்குக.", rf"\frac{{{a}}}{{\sqrt{{{b}}}}}\times\frac{{\sqrt{{{b}}}}}{{\sqrt{{{b}}}}}"),
              S("√b × √b = b.", "√b × √b = b.", rf"= \frac{{{a}\sqrt{{{b}}}}}{{{b}}}"),
              S("Simplify the fraction.", "பின்னத்தைச் சுருக்குக.", rf"= {fl(res) if res.denominator==1 else fl(res)}\sqrt{{{b}}}")],
             rf"{fl(res)}\sqrt{{{b}}}", [T("Multiplying by √b/√b does not change the value.", "√b/√b ஆல் பெருக்குவது பெறுமானத்தை மாற்றாது.")], kind="algebra", formula="F-NUM-SURD",
             verify=lambda: sp.simplify(sp.Integer(a) / sp.sqrt(b) - sp.Rational(a, b) * sp.sqrt(b)) == 0)


# ---------------- G11C02 Indices & logs I ----------------
@tpl("G11C02", "F")
def index_laws(r):
    a, m, k = r.choice([(2, 5, 3), (3, 4, 2), (5, 3, 1), (2, 7, 4)])
    return Q(T(f"Simplify: $\\frac{{x^{{{m}}}\\times x^{{{k}}}}}{{x^{{{k+1}}}}}$", f"சுருக்குக: $\\frac{{x^{{{m}}}\\times x^{{{k}}}}}{{x^{{{k+1}}}}}$"),
             [S("Multiply → add indices.", "பெருக்கல் → சுட்டிகளைக் கூட்டுக.", rf"x^{{{m}+{k}}} = x^{{{m+k}}}"),
              S("Divide → subtract indices.", "வகுத்தல் → சுட்டிகளைக் கழிக்க.", rf"x^{{{m+k}-{k+1}}} = x^{{{m-1}}}")],
             rf"x^{{{m-1}}}", [T("aᵐ × aⁿ = aᵐ⁺ⁿ; aᵐ ÷ aⁿ = aᵐ⁻ⁿ.", "aᵐ × aⁿ = aᵐ⁺ⁿ; aᵐ ÷ aⁿ = aᵐ⁻ⁿ.")], kind="algebra", formula="F-IDX-LAWS",
             verify=lambda: sp.simplify(X ** m * X ** k / X ** (k + 1) - X ** (m - 1)) == 0, distractors=[(rf"x^{{{m*k-k-1}}}", T("Multiplied indices instead of adding.", "சுட்டிகளைக் கூட்டுவதற்குப் பதிலாகப் பெருக்கியது."))])


@tpl("G11C02", "G")
def frac_neg_index(r):
    b, p, q = r.choice([(8, 2, 3), (27, 2, 3), (16, 3, 4), (25, 3, 2), (32, 3, 5)])
    root = round(b ** (1 / q)); val = Fr(1, root ** p)
    return Q(T(f"Find the value of ${b}^{{-\\frac{{{p}}}{{{q}}}}}$.", f"${b}^{{-\\frac{{{p}}}{{{q}}}}}$ இன் பெறுமானத்தைக் காண்க."),
             [S("Negative index → reciprocal.", "மறைச் சுட்டி → தலைகீழ்.", rf"{b}^{{-\frac{{{p}}}{{{q}}}}} = \frac{{1}}{{{b}^{{\frac{{{p}}}{{{q}}}}}}}"),
              S(f"Denominator {q} → {q}th root.", f"பகுதி {q} → {q} ஆம் மூலம்.", rf"\sqrt[{q}]{{{b}}} = {root}"),
              S(f"Numerator {p} → power.", f"தொகுதி {p} → வலு.", rf"{root}^{{{p}}} = {root**p}"),
              S("Answer.", "விடை.", rf"\frac{{1}}{{{root**p}}}")],
             fl(val), [T("Root first, then power — smaller numbers.", "முதலில் மூலம், பின் வலு — எண்கள் சிறியவை.")], value=float(val), formula="F-IDX-LAWS", verify=lambda: abs(b ** (-p / q) - float(val)) < 1e-9)


@tpl("G11C02", "A")
def log_expr(r):
    return Q(T("Simplify: $\\lg 8 + 2\\lg 5 - \\lg 2$", "சுருக்குக: $\\lg 8 + 2\\lg 5 - \\lg 2$"),
             [S("Power rule: 2 lg 5 = lg 5² = lg 25.", "வலு விதி: 2 lg 5 = lg 25.", r"\lg 8 + \lg 25 - \lg 2"),
              S("Combine: add → multiply, subtract → divide.", "சேர்க்க: கூட்டல் → பெருக்கல், கழித்தல் → வகுத்தல்.", r"\lg\frac{8\times 25}{2} = \lg 100"),
              S("lg 100 = 2.", "lg 100 = 2.", r"= 2")],
             "2", [T("Use n log a = log aⁿ first.", "முதலில் n log a = log aⁿ.")], value=2, formula="F-LOG-LAWS", verify=lambda: abs(math.log10(8) + 2 * math.log10(5) - math.log10(2) - 2) < 1e-12)


# ---------------- G11C03 Indices & logs II ----------------
@tpl("G11C03", "F")
def log_power(r):
    a, p = r.choice([(2.5, 3), (1.8, 4), (3.2, 2), (12.4, 2)])
    l = round(math.log10(a), 4); L = round(p * l, 4); ans = f"{10**L:#.3g}".rstrip(".")
    return Q(T(f"Using logarithm tables, find ${a}^{{{p}}}$ (3 significant figures).", f"மடக்கை அட்டவணையால் ${a}^{{{p}}}$ ஐக் காண்க (3 பொ.இ.)."),
             [S("lg of a power = power × lg.", "வலுவின் lg = வலு × lg.", rf"\lg P = {p}\lg {a}"),
              S("From tables.", "அட்டவணையிலிருந்து.", rf"= {p}\times {l:.4f} = {L:.4f}"),
              S("Antilog.", "எதிர்மடக்கை.", rf"P \approx {ans}")],
             str(ans), [T("log aⁿ = n log a.", "log aⁿ = n log a.")], value=float(ans), tol=0.01 * float(ans), formula="F-LOG-TAB", verify=lambda: abs(float(ans) - a ** p) / a ** p < 0.006)


@tpl("G11C03", "G")
def log_root(r):
    a = r.choice([0.0729, 0.512, 0.0343, 0.343, 0.81])
    q = 3 if a in (0.512, 0.0343, 0.343) else 2
    la = math.log10(a); c = math.floor(la); m = la - c
    # make characteristic divisible by q
    adj = (-c) % q
    c2 = c - adj; m2 = m + adj
    res = 10 ** (la / q); ans = f"{res:#.3g}".rstrip(".")
    bar = lambda c: f"\\bar{{{abs(c)}}}" if c < 0 else str(c)
    return Q(T(f"Using logarithms, find $\\sqrt[{q}]{{{a}}}$.", f"மடக்கைகளைப் பயன்படுத்தி $\\sqrt[{q}]{{{a}}}$ ஐக் காண்க."),
             [S("lg of a root = lg ÷ index.", "மூலத்தின் lg = lg ÷ சுட்டி.", rf"\lg P = \frac{{1}}{{{q}}}\lg {a}"),
              S("Write lg with a bar characteristic.", "கோட்டுச் சிறப்பியல்புடன் lg ஐ எழுதுக.", rf"\lg {a} = {bar(c)}.{f'{m:.4f}'[2:]}"),
              S(f"Make the characteristic divisible by {q}.", f"சிறப்பியல்பை {q} ஆல் வகுபடச் செய்க.", rf"= {bar(c2)} + {m2:.4f}"),
              S(f"Divide by {q}.", f"{q} ஆல் வகுக்க.", rf"\lg P = {bar(c2//q)}.{f'{m2/q:.4f}'[2:]}"),
              S("Antilog.", "எதிர்மடக்கை.", rf"P \approx {ans}")],
             str(ans), [T("Never divide a bar number directly — adjust it first.", "கோட்டு எண்ணை நேரடியாக வகுக்க வேண்டாம் — முதலில் சீராக்குக.")], value=float(ans), tol=0.01 * float(ans), formula="F-LOG-TAB",
             verify=lambda: abs(float(ans) - a ** (1 / q)) / a ** (1 / q) < 0.006, mistake=T("Dividing −2 + 0.86 as if it were −2.86.", "−2 + 0.86 ஐ −2.86 போல வகுத்தல்."))


@tpl("G11C03", "A")
def log_combined(r):
    a, b, c = r.choice([(4.86, 2.35, 3.7), (12.5, 0.64, 2.8), (7.24, 3.6, 1.95)])
    val = (a * b * b) / c; ans = f"{val:#.3g}".rstrip(".")
    la, lb, lc = [round(math.log10(v), 4) for v in (a, b, c)]
    L = round(la + 2 * lb - lc, 4)
    return Q(T(f"Using logarithm tables, evaluate $\\frac{{{a}\\times {b}^2}}{{{c}}}$ (3 s.f.).", f"மடக்கை அட்டவணையால் $\\frac{{{a}\\times {b}^2}}{{{c}}}$ ஐ மதிப்பிடுக (3 பொ.இ.)."),
             [S("Take lg of the whole expression.", "முழுக் கோவைக்கும் lg எடுக்க.", rf"\lg P = \lg {a} + 2\lg {b} - \lg {c}"),
              S("Substitute table values.", "அட்டவணைப் பெறுமானங்களைப் பிரதியிடுக.", rf"= {la:.4f} + 2({lb:.4f}) - {lc:.4f}"),
              S("Simplify.", "சுருக்குக.", rf"= {L:.4f}"),
              S("Antilog.", "எதிர்மடக்கை.", rf"P \approx {ans}")],
             str(ans), [T("Top: add logs. Bottom: subtract logs.", "மேல்: மடக்கைகளைக் கூட்டுக. கீழ்: கழிக்க.")], value=float(ans), tol=0.01 * float(ans), formula="F-LOG-TAB", verify=lambda: abs(float(ans) - val) / val < 0.006)


# ---------------- G11C04 Surface area of solids ----------------
@tpl("G11C04", "F")
def sphere_sa(r):
    rad = r.choice([7, 14, 21, Fr(7, 2)])
    A = 4 * PI * rad * rad
    return Q(T(f"Find the surface area of a sphere of radius {fl(rad)} cm. (π = 22/7)", f"ஆரை {fl(rad)} cm உடைய கோளத்தின் மேற்பரப்பளவைக் காண்க. (π = 22/7)"),
             [S("A = 4πr².", "A = 4πr².", rf"A = 4\times\frac{{22}}{{7}}\times ({fl(rad)})^2"),
              S("Calculate.", "கணிக்க.", rf"A = {fl(A)}\ \text{{cm}}^2")],
             rf"{fl(A)}\ \text{{cm}}^2", [T("Sphere surface = 4 × area of a great circle.", "கோள மேற்பரப்பு = 4 × பெருவட்டப் பரப்பு.")], unit="cm²", value=float(A), formula="F-MEN-SPHA", diagram="SOL-SPHERE-01", verify=lambda: abs(float(A) - 4 * math.pi * float(rad) ** 2) / float(A) < 0.001)


@tpl("G11C04", "G")
def cone_csa(r):
    rad, h = r.choice([(6, 8), (5, 12), (9, 12), (7, 24)])
    l = int(math.isqrt(rad * rad + h * h)); A = PI * rad * l
    return Q(T(f"A right circular cone has base radius {rad} cm and height {h} cm. Find the slant height and the curved surface area. (π = 22/7)", f"ஒரு நேர்வட்டக் கூம்பின் அடி ஆரை {rad} cm, உயரம் {h} cm. சாய்வுயரத்தையும் வளைமேற்பரப்பளவையும் காண்க. (π = 22/7)"),
             [S("Slant height by Pythagoras.", "பைதகரசால் சாய்வுயரம்.", rf"l = \sqrt{{{rad}^2 + {h}^2}} = \sqrt{{{rad*rad+h*h}}} = {l}"),
              S("Curved surface area = πrl.", "வளைமேற்பரப்பு = πrl.", rf"\frac{{22}}{{7}}\times {rad}\times {l} = {fl(A)}\ \text{{cm}}^2")],
             rf"l={l}\text{{ cm}},\ {fl(A)}\ \text{{cm}}^2", [T("Use the SLANT height l, not the vertical height.", "செங்குத்து உயரம் அல்ல, சாய்வுயரம் l.")], unit="cm²", value=float(A), formula="F-MEN-CONEA", diagram="SOL-CONE-01",
             distractors=[(rf"{fl(PI*rad*h)}\ \text{{cm}}^2", T("Used vertical height h instead of l.", "l க்குப் பதிலாக h."))], verify=lambda: l * l == rad * rad + h * h)


@tpl("G11C04", "A")
def hemisphere_tsa(r):
    rad = r.choice([7, 14, Fr(21, 2)])
    A = 3 * PI * rad * rad
    return Q(T(f"Find the total surface area of a solid hemisphere of radius {fl(rad)} cm. (π = 22/7)", f"ஆரை {fl(rad)} cm உடைய திண்ம அரைக்கோளத்தின் மொத்த மேற்பரப்பளவைக் காண்க. (π = 22/7)"),
             [S("Curved part = half of 4πr² = 2πr².", "வளைந்த பகுதி = 4πr² இன் அரைவாசி = 2πr².", r"2\pi r^2"),
              S("Flat circular face = πr².", "தட்டையான வட்ட முகம் = πr².", r"\pi r^2"),
              S("Total = 3πr².", "மொத்தம் = 3πr².", rf"3\times\frac{{22}}{{7}}\times({fl(rad)})^2 = {fl(A)}\ \text{{cm}}^2")],
             rf"{fl(A)}\ \text{{cm}}^2", [T("A SOLID hemisphere includes the flat face.", "திண்ம அரைக்கோளத்தில் தட்டை முகமும் அடங்கும்.")], unit="cm²", value=float(A), formula="F-MEN-SPHA", diagram="SOL-HEMI-01",
             distractors=[(rf"{fl(2*PI*rad*rad)}\ \text{{cm}}^2", T("Flat face left out.", "தட்டை முகம் விடுபட்டது."))], verify=lambda: abs(float(A) - 3 * math.pi * float(rad) ** 2) / float(A) < 0.001)


# ---------------- G11C05 Volume of solids ----------------
@tpl("G11C05", "F")
def cone_volume(r):
    rad, h = r.choice([(7, 12), (14, 9), (21, 10), (7, 6)])
    V = Fr(1, 3) * PI * rad * rad * h
    return Q(T(f"Find the volume of a cone with base radius {rad} cm and height {h} cm. (π = 22/7)", f"அடி ஆரை {rad} cm, உயரம் {h} cm உடைய கூம்பின் கனவளவைக் காண்க. (π = 22/7)"),
             [S("V = ⅓πr²h.", "V = ⅓πr²h.", rf"V = \frac13\times\frac{{22}}{{7}}\times{rad}^2\times{h}"),
              S("Calculate.", "கணிக்க.", rf"V = {fl(V)}\ \text{{cm}}^3")],
             rf"{fl(V)}\ \text{{cm}}^3", [T("A cone is one third of a cylinder with the same base and height.", "கூம்பு, அதே அடி, உயரமுள்ள உருளையின் மூன்றில் ஒன்று.")], unit="cm³", value=float(V), formula="F-MEN-CONEV", diagram="SOL-CONE-01",
             distractors=[(rf"{fl(PI*rad*rad*h)}\ \text{{cm}}^3", T("Forgot the ⅓.", "⅓ மறந்தது."))], verify=lambda: abs(float(V) - math.pi * rad * rad * h / 3) / float(V) < 0.001)


@tpl("G11C05", "G")
def sphere_volume(r):
    rad = r.choice([3, 6, Fr(21, 2), 21])
    V = Fr(4, 3) * PI * Fr(rad) ** 3
    return Q(T(f"Find the volume of a sphere of radius {fl(rad)} cm. (π = 22/7)", f"ஆரை {fl(rad)} cm உடைய கோளத்தின் கனவளவைக் காண்க. (π = 22/7)"),
             [S("V = (4/3)πr³.", "V = (4/3)πr³.", rf"V = \frac43\times\frac{{22}}{{7}}\times({fl(rad)})^3"),
              S("Calculate.", "கணிக்க.", rf"V = {fl(V)}\ \text{{cm}}^3" + (rf" \approx {float(V):.2f}" if Fr(V).denominator > 1 else ""))],
             rf"{fl(V)}\ \text{{cm}}^3", [T("Cube the radius: r × r × r.", "ஆரையைக் கனமாக்குக: r × r × r.")], unit="cm³", value=float(V), tol=0.01, formula="F-MEN-SPHV", diagram="SOL-SPHERE-01", verify=lambda: abs(float(V) - 4 / 3 * math.pi * float(rad) ** 3) / float(V) < 0.001)


@tpl("G11C05", "A")
def melt_spheres(r):
    R, rr = r.choice([(6, 2), (9, 3), (12, 3), (10, 2)])
    k = (R ** 3) // (rr ** 3)
    return Q(T(f"A solid metal sphere of radius {R} cm is melted and recast into small spheres of radius {rr} cm. How many small spheres are made?", f"ஆரை {R} cm உடைய திண்ம உலோகக் கோளம் உருக்கப்பட்டு ஆரை {rr} cm உடைய சிறு கோளங்களாக வார்க்கப்படுகிறது. எத்தனை சிறு கோளங்கள் கிடைக்கும்?"),
             [S("Volume is conserved: N × small volume = big volume.", "கனவளவு மாறாது: N × சிறு கனவளவு = பெரிய கனவளவு.", rf"N\times\frac43\pi({rr})^3 = \frac43\pi({R})^3"),
              S("Cancel (4/3)π on both sides.", "இருபுறமும் (4/3)π ஐ நீக்குக.", rf"N\times {rr**3} = {R**3}"),
              S("Divide.", "வகுக்க.", rf"N = {R**3}\div {rr**3} = {k}")],
             str(k), [T("You don't need π — it cancels.", "π தேவையில்லை — அது நீங்கும்.")], value=k, formula="F-MEN-SPHV", verify=lambda: k * rr ** 3 == R ** 3,
             distractors=[(str(R // rr), T("Compared radii instead of volumes.", "கனவளவுக்குப் பதிலாக ஆரைகளை ஒப்பிட்டது.")), (str((R // rr) ** 2), T("Compared areas, not volumes.", "பரப்புகளை ஒப்பிட்டது."))])


# ---------------- G11C06 Binomial (cubes) ----------------
@tpl("G11C06", "F")
def cube_expand(r):
    a = r.choice([1, 2, 3])
    e = sp.expand((X + a) ** 3); cs = [int(e.coeff(X, k)) for k in (3, 2, 1, 0)]
    return Q(T(f"Expand: $(x + {a})^3$", f"விரிக்க: $(x + {a})^3$"),
             [S("Use (a + b)³ = a³ + 3a²b + 3ab² + b³.", "(a + b)³ = a³ + 3a²b + 3ab² + b³.", rf"x^3 + 3x^2({a}) + 3x({a})^2 + {a}^3"),
              S("Simplify.", "சுருக்குக.", rf"= {poly(cs)}")],
             poly(cs), [T("Coefficients follow 1, 3, 3, 1.", "குணகங்கள் 1, 3, 3, 1 ஒழுங்கில்.")], kind="algebra", formula="F-ALG-CUBE", verify=lambda: e == sum(c * X ** (3 - i) for i, c in enumerate(cs)))


@tpl("G11C06", "G")
def cube_minus(r):
    a = r.choice([2, 3, 4]); b = r.choice([1, 2])
    e = sp.expand((a * X - b) ** 3); cs = [int(e.coeff(X, k)) for k in (3, 2, 1, 0)]
    return Q(T(f"Expand: $({a}x - {b})^3$", f"விரிக்க: $({a}x - {b})^3$"),
             [S("Use (a − b)³ = a³ − 3a²b + 3ab² − b³.", "(a − b)³ = a³ − 3a²b + 3ab² − b³.", rf"({a}x)^3 - 3({a}x)^2({b}) + 3({a}x)({b})^2 - {b}^3"),
              S("Simplify each term.", "ஒவ்வொரு உறுப்பையும் சுருக்குக.", rf"= {poly(cs)}")],
             poly(cs), [T("Signs alternate: +, −, +, −.", "குறிகள் மாறிமாறி: +, −, +, −."), T(f"({a}x)³ = {a**3}x³, not {a}x³.", f"({a}x)³ = {a**3}x³, {a}x³ அல்ல.")], kind="algebra", formula="F-ALG-CUBE",
             verify=lambda: e == sum(c * X ** (3 - i) for i, c in enumerate(cs)))


@tpl("G11C06", "A")
def cube_identity(r):
    s, p = r.choice([(5, 6), (7, 10), (6, 8), (4, 3)])
    val = s ** 3 - 3 * p * s
    return Q(T(f"If x + y = {s} and xy = {p}, find the value of x³ + y³ without finding x and y.", f"x + y = {s}, xy = {p} எனின், x, y ஐக் காணாமல் x³ + y³ இன் பெறுமானத்தைக் காண்க."),
             [S("Expand (x + y)³.", "(x + y)³ ஐ விரிக்க.", r"(x+y)^3 = x^3 + y^3 + 3xy(x+y)"),
              S("Rearrange.", "மாற்றி எழுதுக.", r"x^3 + y^3 = (x+y)^3 - 3xy(x+y)"),
              S("Substitute.", "பிரதியிடுக.", rf"= {s}^3 - 3\times{p}\times{s} = {s**3} - {3*p*s} = {val}")],
             str(val), [T("Use the expansion of (x + y)³.", "(x + y)³ இன் விரிவைப் பயன்படுத்துக.")], value=val, formula="F-ALG-CUBE",
             verify=lambda: all(abs(complex(r1) ** 3 + complex(r2) ** 3 - val) < 1e-6 for r1, r2 in [sp.solve(X ** 2 - s * X + p, X)]))


# ---------------- G11C07 Algebraic fractions ----------------
@tpl("G11C07", "F")
def af_cancel(r):
    a = r.choice([2, 3, 4, 5])
    return Q(T(f"Simplify: $\\frac{{x^2 - {a*a}}}{{x + {a}}}$", f"சுருக்குக: $\\frac{{x^2 - {a*a}}}{{x + {a}}}$"),
             [S("Factorise the numerator.", "தொகுதியைக் காரணிப்படுத்துக.", rf"\frac{{(x+{a})(x-{a})}}{{x+{a}}}"),
              S("Cancel the common factor.", "பொதுக் காரணியை நீக்குக.", rf"= x - {a}")],
             f"x - {a}", [T("You may cancel factors, never terms.", "காரணிகளை மட்டும் நீக்கலாம்; உறுப்புகளை அல்ல.")], kind="algebra", formula="F-ALG-AFRAC",
             verify=lambda: sp.simplify((X ** 2 - a * a) / (X + a) - (X - a)) == 0, distractors=[(rf"x - {a*a//a}x", T("Cancelled terms instead of factors.", "காரணிகளுக்குப் பதிலாக உறுப்புகளை நீக்கியது."))])


@tpl("G11C07", "G")
def af_multiply(r):
    a = r.choice([1, 2, 3])
    return Q(T(f"Simplify: $\\frac{{x^2 + {a}x}}{{x^2 - {a*a}}} \\times \\frac{{x - {a}}}{{2x}}$", f"சுருக்குக: $\\frac{{x^2 + {a}x}}{{x^2 - {a*a}}} \\times \\frac{{x - {a}}}{{2x}}$"),
             [S("Factorise everything.", "எல்லாவற்றையும் காரணிப்படுத்துக.", rf"\frac{{x(x+{a})}}{{(x+{a})(x-{a})}}\times\frac{{x-{a}}}{{2x}}"),
              S("Cancel common factors.", "பொதுக் காரணிகளை நீக்குக.", r"= \frac{1}{2}")],
             r"\frac{1}{2}", [T("Factorise first, cancel second.", "முதலில் காரணிப்படுத்தி, பின் நீக்குக.")], value=0.5, formula="F-ALG-AFRAC",
             verify=lambda: sp.simplify((X ** 2 + a * X) / (X ** 2 - a * a) * (X - a) / (2 * X)) == sp.Rational(1, 2))


@tpl("G11C07", "A")
def af_quad_dens(r):
    a, b = r.choice([(1, 2), (2, 3), (1, 3)])
    expr = 2 / (X ** 2 + (a + b) * X + a * b) + 1 / (X + a)
    simp = sp.factor(sp.together(expr))
    return Q(T(f"Simplify: $\\frac{{2}}{{x^2 + {a+b}x + {a*b}}} + \\frac{{1}}{{x + {a}}}$", f"சுருக்குக: $\\frac{{2}}{{x^2 + {a+b}x + {a*b}}} + \\frac{{1}}{{x + {a}}}$"),
             [S("Factorise the quadratic denominator.", "இருபடிப் பகுதியைக் காரணிப்படுத்துக.", rf"x^2 + {a+b}x + {a*b} = (x+{a})(x+{b})"),
              S("Common denominator (x + a)(x + b).", "பொதுப் பகுதி.", rf"\frac{{2}}{{(x+{a})(x+{b})}} + \frac{{x+{b}}}{{(x+{a})(x+{b})}}"),
              S("Add numerators.", "தொகுதிகளைக் கூட்டுக.", rf"= \frac{{x + {b+2}}}{{(x+{a})(x+{b})}}")],
             rf"\frac{{x+{b+2}}}{{(x+{a})(x+{b})}}", [T("The LCM is already the quadratic once factorised.", "காரணிப்படுத்திய இருபடியே பொ.ம.சி.")], kind="algebra", formula="F-ALG-AFRAC",
             verify=lambda: sp.simplify(expr - (X + b + 2) / ((X + a) * (X + b))) == 0)


# ---------------- G11C08 Areas between parallel lines ----------------
@tpl("G11C08", "F")
def same_base_parallels(r):
    A = r.choice([24, 30, 36, 45])
    return Q(T(f"ΔABC and ΔDBC are on the same base BC and between the same parallel lines (AD ∥ BC). Area of ΔABC = {A} cm². Find the area of ΔDBC.", f"ΔABC, ΔDBC ஒரே அடி BC மீதும் ஒரே சமாந்தரக் கோடுகளுக்கிடையிலும் (AD ∥ BC) உள்ளன. ΔABC இன் பரப்பு = {A} cm². ΔDBC இன் பரப்பைக் காண்க."),
             [S("Same base, same height (distance between parallels).", "ஒரே அடி, ஒரே உயரம் (சமாந்தரங்களுக்கிடைத் தூரம்).", r"h_{ABC} = h_{DBC}"),
              S("So the areas are equal.", "எனவே பரப்புகள் சமம்.", rf"\text{{Area }}\triangle DBC = {A}\ \text{{cm}}^2")],
             rf"{A}\ \text{{cm}}^2", [T("Area of a triangle = ½ × base × height.", "முக்கோணப் பரப்பு = ½ × அடி × உயரம்.")], unit="cm²", value=A, formula="T-GEO-AREA-PAR", diagram="GEO-PARALLEL-AREA-01", verify=lambda: True)


@tpl("G11C08", "G")
def para_triangle_area(r):
    A = r.choice([40, 56, 64, 90])
    return Q(T(f"Parallelogram PQRS and ΔPQT are on the same base PQ and between the same parallels. The area of PQRS is {A} cm². Find the area of ΔPQT.", f"PQRS இணைகரமும் ΔPQT உம் ஒரே அடி PQ மீதும் ஒரே சமாந்தரங்களுக்கிடையிலும் உள்ளன. PQRS இன் பரப்பு {A} cm². ΔPQT இன் பரப்பைக் காண்க."),
             [S("A triangle is half the parallelogram on the same base and between the same parallels.", "ஒரே அடி, ஒரே சமாந்தரங்களிலுள்ள முக்கோணி இணைகரத்தின் அரைவாசி.", r"\triangle = \tfrac12\ \text{parallelogram}"),
              S("Calculate.", "கணிக்க.", rf"\tfrac12\times {A} = {A//2}\ \text{{cm}}^2")],
             rf"{A//2}\ \text{{cm}}^2", [T("Parallelogram = base × height; triangle = ½ × base × height.", "இணைகரம் = அடி × உயரம்; முக்கோணி = ½ × அடி × உயரம்.")], unit="cm²", value=A // 2, formula="T-GEO-AREA-PAR", diagram="GEO-PARALLEL-AREA-01", verify=lambda: True)


@tpl("G11C08", "A")
def area_proof(r):
    return Q(T("In parallelogram ABCD, E is any point on DC. Prove that area ΔAEB = area ΔADE + area ΔBCE.", "ABCD இணைகரத்தில் E, DC மீதுள்ள ஏதேனும் ஒரு புள்ளி. ΔAEB இன் பரப்பு = ΔADE இன் பரப்பு + ΔBCE இன் பரப்பு என நிறுவுக."),
             [S("ΔAEB and parallelogram ABCD: same base AB, between AB ∥ DC.", "ΔAEB, இணைகரம் ABCD: ஒரே அடி AB, AB ∥ DC க்கிடையில்.", r"\triangle AEB = \tfrac12\,ABCD"),
              S("The rest of the parallelogram is the other half.", "இணைகரத்தின் மீதி மற்ற அரைவாசி.", r"\triangle ADE + \triangle BCE = ABCD - \triangle AEB = \tfrac12\,ABCD"),
              S("Both equal half the parallelogram.", "இரண்டும் இணைகரத்தின் அரைவாசிக்குச் சமம்.", r"\therefore \triangle AEB = \triangle ADE + \triangle BCE")],
             r"\triangle AEB = \triangle ADE + \triangle BCE", [T("Compare each part with the whole parallelogram.", "ஒவ்வொரு பகுதியையும் முழு இணைகரத்துடன் ஒப்பிடுக.")], kind="proof", formula="T-GEO-AREA-PAR", diagram="GEO-PARALLEL-AREA-01", verify=lambda: True)


# ---------------- G11C09 Percentage (finance) ----------------
@tpl("G11C09", "F")
def rates_tax(r):
    av, pct = r.choice([(24000, 8), (36000, 6), (50000, 5), (40000, 10)])
    yr = av * pct // 100; q = yr // 4
    return Q(T(f"The annual value of a house is Rs. {n(av)}. The council charges rates of {pct}%. Find the rates per quarter.", f"ஒரு வீட்டின் வருடாந்தப் பெறுமதி ரூ. {n(av)}. சபை {pct}% மதிப்பீட்டு வரி அறவிடுகிறது. காலாண்டுக்கான மதிப்பீட்டு வரியைக் காண்க."),
             [S("Annual rates.", "வருட மதிப்பீட்டு வரி.", rf"{n(av)}\times\frac{{{pct}}}{{100}} = {n(yr)}"),
              S("One quarter = ÷ 4.", "ஒரு காலாண்டு = ÷ 4.", rf"{n(yr)}\div 4 = {n(q)}")],
             rs(q), [T("Rates are a percentage of the ANNUAL value, paid in four quarters.", "மதிப்பீட்டு வரி வருடாந்தப் பெறுமதியின் சதவீதம்; நான்கு காலாண்டுகளில் செலுத்தப்படும்.")], unit="Rs.", value=q, formula="F-FIN-RATES", verify=lambda: q * 4 * 100 == av * pct,
             distractors=[(rs(yr), T("Annual rates, not quarterly.", "வருடத்துக்கானது, காலாண்டுக்கல்ல."))])


@tpl("G11C09", "G")
def compound_interest(r):
    P, R = r.choice([(50000, 10), (40000, 5), (80000, 10), (100000, 8)])
    A1 = P * (100 + R) // 100; A2 = A1 * (100 + R) / 100; I = A2 - P
    return Q(T(f"Rs. {n(P)} is deposited at {R}% compound interest per year. Find the total amount after 2 years and the interest earned.", f"ரூ. {n(P)} வருடத்துக்கு {R}% கூட்டுவட்டிக்கு வைப்பிலிடப்படுகிறது. 2 வருடங்களின் பின் மொத்தத் தொகையையும் பெற்ற வட்டியையும் காண்க."),
             [S("Interest for year 1.", "முதல் வருட வட்டி.", rf"{n(P)}\times\frac{{{R}}}{{100}} = {n(P*R//100)}"),
              S("Amount after year 1.", "முதல் வருட முடிவில் தொகை.", rf"{n(P)} + {n(P*R//100)} = {n(A1)}"),
              S("Interest for year 2 is on the new amount.", "இரண்டாம் வருட வட்டி புதிய தொகையின் மீது.", rf"{n(A1)}\times\frac{{{R}}}{{100}} = {n(A1*R/100)}"),
              S("Amount after year 2.", "இரண்டாம் வருட முடிவில் தொகை.", rf"{n(A1)} + {n(A1*R/100)} = {n(A2)}"),
              S("Total interest.", "மொத்த வட்டி.", rf"{n(A2)} - {n(P)} = {n(I)}")],
             rf"\text{{Amount }}{rs(A2)},\ \text{{interest }}{rs(I)}", [T("Compound: each year's interest is added before the next year.", "கூட்டுவட்டி: ஒவ்வொரு வருட வட்டியும் அடுத்த வருடத்துக்கு முன் சேர்க்கப்படும்.")],
             unit="Rs.", value=A2, formula="F-FIN-CI", verify=lambda: abs(A2 - P * (1 + R / 100) ** 2) < 1e-6,
             distractors=[(rs(P + 2 * P * R // 100), T("Used simple interest.", "தனிவட்டி பயன்படுத்தப்பட்டது."))], mistake=T("Calculating year-2 interest on the original amount (that is simple interest).", "இரண்டாம் வருட வட்டியை ஆரம்பத் தொகையில் கணித்தல் (அது தனிவட்டி)."))


@tpl("G11C09", "A")
def income_tax(r):
    # illustrative tax table (not an official current rate)
    inc = r.choice([1500000, 1800000, 2400000])
    free = 1200000; band = [(500000, 6), (500000, 12), (10 ** 9, 18)]
    taxable = inc - free; rem = taxable; tax = 0; parts = []
    for w, p in band:
        t = min(rem, w)
        if t <= 0:
            break
        tax += t * p // 100; parts.append((t, p)); rem -= t
    return Q(T(f"(Illustrative tax table) The first Rs. 1 200 000 of annual income is tax-free. The next Rs. 500 000 is taxed at 6%, the next Rs. 500 000 at 12%, and the rest at 18%. Find the income tax on an annual income of Rs. {n(inc)}.",
               f"(உதாரண வரி அட்டவணை) வருட வருமானத்தின் முதல் ரூ. 1 200 000 வரிவிலக்கு. அடுத்த ரூ. 500 000 இற்கு 6%, அடுத்த ரூ. 500 000 இற்கு 12%, மீதிக்கு 18%. வருட வருமானம் ரூ. {n(inc)} இற்கான வருமான வரியைக் காண்க."),
             [S("Taxable income.", "வரிக்குட்படும் வருமானம்.", rf"{n(inc)} - 1\,200\,000 = {n(taxable)}")] +
             [S(f"Tax on Rs. {n(t)} at {p}%.", f"ரூ. {n(t)} க்கு {p}% வரி.", rf"{n(t)}\times\frac{{{p}}}{{100}} = {n(t*p//100)}") for t, p in parts] +
             [S("Total tax.", "மொத்த வரி.", " + ".join(n(t * p // 100) for t, p in parts) + rf" = {n(tax)}")],
             rs(tax), [T("Tax each band separately, then add.", "ஒவ்வொரு படியையும் தனித்தனியாக வரியிட்டுக் கூட்டுக.")], unit="Rs.", value=tax, formula="F-FIN-TAX",
             verify=lambda: tax == sum(t * p // 100 for t, p in parts), mistake=T("Applying the highest rate to the whole income.", "முழு வருமானத்துக்கும் உயர் வீதத்தைப் பிரயோகித்தல்."))


# ---------------- G11C10 Share market ----------------
@tpl("G11C10", "F")
def buy_shares(r):
    money, price = r.choice([(50000, 25), (60000, 40), (36000, 12), (45000, 15)])
    k = money // price
    return Q(T(f"How many shares priced at Rs. {price} each can be bought with Rs. {n(money)}?", f"ரூ. {price} விலையுள்ள பங்குகளில் ரூ. {n(money)} க்கு எத்தனை பங்குகள் வாங்கலாம்?"),
             [S("Number of shares = money ÷ price per share.", "பங்குகளின் எண்ணிக்கை = பணம் ÷ பங்கொன்றின் விலை.", rf"{n(money)}\div{price} = {n(k)}")],
             n(k), [T("Divide the money by the price of one share.", "பணத்தை ஒரு பங்கின் விலையால் வகுக்க.")], value=k, formula="F-FIN-SHARE", verify=lambda: k * price == money)


@tpl("G11C10", "G")
def dividend_income(r):
    k, d = r.choice([(2000, 3), (1500, 4), (2500, 2), (1200, 5)])
    inc = k * d
    return Q(T(f"A person owns {n(k)} shares. The company pays an annual dividend of Rs. {d} per share. Find the annual dividend income.", f"ஒருவரிடம் {n(k)} பங்குகள் உள்ளன. கம்பனி பங்கொன்றுக்கு வருடத்துக்கு ரூ. {d} பங்கிலாபம் வழங்குகிறது. வருடப் பங்கிலாப வருமானத்தைக் காண்க."),
             [S("Dividend income = shares × dividend per share.", "பங்கிலாப வருமானம் = பங்குகள் × பங்கொன்றுக்கான பங்கிலாபம்.", rf"{n(k)}\times {d} = {n(inc)}")],
             rs(inc), [T("Dividend is paid per share.", "பங்கிலாபம் பங்கொன்றுக்கு வழங்கப்படும்.")], unit="Rs.", value=inc, formula="F-FIN-SHARE", verify=lambda: inc == k * d)


@tpl("G11C10", "A")
def shares_vs_bank(r):
    money, price, div, rate = r.choice([(60000, 30, 3, 8), (80000, 40, 5, 10), (90000, 45, 4, 9)])
    k = money // price; d_inc = k * div; b_inc = money * rate // 100
    better = "shares" if d_inc > b_inc else ("bank" if b_inc > d_inc else "equal")
    bta = {"shares": "பங்குகள்", "bank": "வங்கி", "equal": "சமம்"}[better]
    return Q(T(f"Kamal has Rs. {n(money)}. Option A: buy shares at Rs. {price} each paying an annual dividend of Rs. {div} per share. Option B: deposit in a bank at {rate}% simple interest per year. Which gives the higher income in one year, and by how much?",
               f"கமலிடம் ரூ. {n(money)} உள்ளது. தெரிவு A: பங்கொன்று ரூ. {price} விலையில் பங்குகள் வாங்கல்; வருடப் பங்கிலாபம் பங்கொன்றுக்கு ரூ. {div}. தெரிவு B: வருடத்துக்கு {rate}% தனிவட்டியில் வங்கியில் வைப்பிலிடல். ஒரு வருடத்தில் எது அதிக வருமானம் தரும்? எவ்வளவு அதிகம்?"),
             [S("Number of shares.", "பங்குகளின் எண்ணிக்கை.", rf"{n(money)}\div {price} = {n(k)}"),
              S("Dividend income.", "பங்கிலாப வருமானம்.", rf"{n(k)}\times{div} = {n(d_inc)}"),
              S("Bank interest for one year.", "ஒரு வருட வங்கி வட்டி.", rf"{n(money)}\times\frac{{{rate}}}{{100}} = {n(b_inc)}"),
              S("Compare.", "ஒப்பிடுக.", rf"|{n(d_inc)} - {n(b_inc)}| = {n(abs(d_inc-b_inc))}")],
             rf"\text{{{better}}},\ {rs(abs(d_inc-b_inc))}", [T("Find both incomes, then subtract.", "இரு வருமானங்களையும் கண்டு கழிக்க.")], unit="Rs.", value=abs(d_inc - b_inc), formula="F-FIN-SHARE", verify=lambda: True)


# ---------------- G11C11 Mid-point theorem ----------------
@tpl("G11C11", "F")
def midpoint_length(r):
    bc = r.choice([8, 10, 12.4, 15, 9])
    return Q(T(f"In ΔABC, P and Q are the midpoints of AB and AC. BC = {bc} cm. Find PQ.", f"ΔABC இல் P, Q என்பன AB, AC இன் நடுப்புள்ளிகள். BC = {bc} cm. PQ ஐக் காண்க."),
             [S("Mid-point theorem: PQ ∥ BC and PQ = ½ BC.", "நடுப்புள்ளித் தேற்றம்: PQ ∥ BC, PQ = ½ BC.", r"PQ = \tfrac12 BC"),
              S("Calculate.", "கணிக்க.", rf"PQ = \tfrac12\times {bc} = {n(bc/2)}\ \text{{cm}}")],
             rf"{n(bc/2)}\ \text{{cm}}", [T("Join of midpoints = half the third side.", "நடுப்புள்ளிகளை இணைக்கும் கோடு = மூன்றாம் பக்கத்தின் அரைவாசி.")], unit="cm", value=bc / 2, formula="T-GEO-MID", diagram="GEO-MIDPT-01", verify=lambda: True,
             distractors=[(rf"{n(bc*2)}\ \text{{cm}}", T("Doubled instead of halving.", "அரைவாசிக்குப் பதிலாக இரட்டித்தது."))])


@tpl("G11C11", "G")
def midpoint_perimeter(r):
    a, b, c = r.choice([(6, 8, 10), (7, 9, 12), (5, 12, 13)])
    return Q(T(f"The sides of ΔABC are AB = {a} cm, BC = {b} cm and CA = {c} cm. P, Q, R are the midpoints of the sides. Find the perimeter of ΔPQR.", f"ΔABC இன் பக்கங்கள் AB = {a} cm, BC = {b} cm, CA = {c} cm. P, Q, R பக்கங்களின் நடுப்புள்ளிகள். ΔPQR இன் சுற்றளவைக் காண்க."),
             [S("Each side of ΔPQR is half of a side of ΔABC.", "ΔPQR இன் ஒவ்வொரு பக்கமும் ΔABC இன் ஒரு பக்கத்தின் அரைவாசி.", rf"\tfrac12({a}),\ \tfrac12({b}),\ \tfrac12({c})"),
              S("Perimeter = half of the big perimeter.", "சுற்றளவு = பெரிய சுற்றளவின் அரைவாசி.", rf"\tfrac12({a}+{b}+{c}) = {n((a+b+c)/2)}\ \text{{cm}}")],
             rf"{n((a+b+c)/2)}\ \text{{cm}}", [T("Use the mid-point theorem three times.", "நடுப்புள்ளித் தேற்றத்தை மூன்று முறை பயன்படுத்துக.")], unit="cm", value=(a + b + c) / 2, formula="T-GEO-MID", diagram="GEO-MIDPT-01", verify=lambda: True)


@tpl("G11C11", "A")
def midpoint_converse(r):
    return Q(T("In ΔABC, D is the midpoint of AB. A line through D parallel to BC meets AC at E. If AC = 14 cm and BC = 10 cm, find AE and DE. Give reasons.", "ΔABC இல் D, AB இன் நடுப்புள்ளி. D ஊடாக BC க்குச் சமாந்தரமான கோடு AC ஐ E இல் சந்திக்கிறது. AC = 14 cm, BC = 10 cm எனின் AE, DE ஐக் காரணங்களுடன் காண்க."),
             [S("Converse of the mid-point theorem: E is the midpoint of AC.", "நடுப்புள்ளித் தேற்றத்தின் மறுதலை: E, AC இன் நடுப்புள்ளி.", r"AE = \tfrac12 AC = 7\ \text{cm}"),
              S("Then DE = ½ BC.", "அப்போது DE = ½ BC.", r"DE = \tfrac12\times 10 = 5\ \text{cm}")],
             r"AE = 7\text{ cm},\ DE = 5\text{ cm}", [T("A line from a midpoint parallel to a side bisects the third side.", "நடுப்புள்ளியிலிருந்து ஒரு பக்கத்துக்குச் சமாந்தரமான கோடு மூன்றாம் பக்கத்தை இருசமகூறிடும்.")], unit="cm", value=7, formula="T-GEO-MID", diagram="GEO-MIDPT-01", verify=lambda: True)


# ---------------- G11C12 Graphs (quadratic) ----------------
@tpl("G11C12", "F")
def tp_from_vertex_form(r):
    b, c = r.choice([(2, -3), (-1, 4), (3, -1), (-2, -5)])
    return Q(T(f"For $y = (x {sgn(b)})^2 {sgn(c)}$, write down the turning point, the axis of symmetry and the minimum value of y.", f"$y = (x {sgn(b)})^2 {sgn(c)}$ இற்குத் திரும்பற் புள்ளி, சமச்சீர் அச்சு, y இன் இழிவுப் பெறுமானம் ஆகியவற்றை எழுதுக."),
             [S("Compare with y = (x + b)² + c: turning point (−b, c).", "y = (x + b)² + c உடன் ஒப்பிடுக: திரும்பற் புள்ளி (−b, c).", rf"(-({b}),\ {c}) = ({-b},\ {c})"),
              S("Axis of symmetry passes through the turning point.", "சமச்சீர் அச்சு திரும்பற் புள்ளியூடாகச் செல்லும்.", rf"x = {-b}"),
              S("(x + b)² ≥ 0, so the minimum is c.", "(x + b)² ≥ 0, எனவே இழிவு c.", rf"y_{{\min}} = {c}")],
             rf"({-b},{c}),\ x={-b},\ y_{{\min}}={c}", [T("The sign inside the bracket flips for the x-coordinate.", "அடைப்புக்குள் உள்ள குறி x ஆள்கூற்றுக்குத் திரும்பும்.")], formula="F-GRA-VERTEX", diagram="GRA-QUAD-01", verify=lambda: True, value=c,
             distractors=[(rf"({b},{c}),\ x={b},\ y_{{\min}}={c}", T("Sign of the x-coordinate not flipped.", "x ஆள்கூற்றின் குறி திருப்பப்படவில்லை."))])


@tpl("G11C12", "G")
def quad_table_roots(r):
    p, q = r.choice([(-1, 3), (-2, 2), (1, 4), (-3, 1)])
    b, c = -(p + q), p * q  # y = x^2 + bx + c, roots p, q
    xs = list(range(min(p, q) - 1, max(p, q) + 2)); ys = [x * x + b * x + c for x in xs]
    xt = Fr(p + q, 2); yt = xt * xt + b * xt + c
    tbl = " & ".join(map(str, xs)) + r"\\ \hline y & " + " & ".join(map(str, ys))
    return Q(T(f"For $y = {poly([1,b,c])}$, prepare a table of values for x from {xs[0]} to {xs[-1]}, then use it to find (i) the roots of ${poly([1,b,c])} = 0$ (ii) the turning point.",
               f"$y = {poly([1,b,c])}$ இற்கு x = {xs[0]} முதல் {xs[-1]} வரை பெறுமான அட்டவணை தயாரித்து, (i) ${poly([1,b,c])} = 0$ இன் மூலங்கள் (ii) திரும்பற் புள்ளி ஆகியவற்றைக் காண்க."),
             [S("Table of values.", "பெறுமான அட்டவணை.", rf"\begin{{array}}{{c|{'c'*len(xs)}}} x & {tbl}\end{{array}}"),
              S("Roots: where y = 0 (the curve cuts the x-axis).", "மூலங்கள்: y = 0 ஆகுமிடம் (வளைவு x அச்சை வெட்டும்).", rf"x = {p},\ x = {q}"),
              S("Turning point x-value = midway between the roots.", "திரும்பற் புள்ளியின் x = மூலங்களின் நடு.", rf"x = \frac{{{p}+{q}}}{{2}} = {fl(xt)}"),
              S("Substitute to get y.", "y ஐப் பெற பிரதியிடுக.", rf"y = {fl(yt)} \Rightarrow ({fl(xt)},\ {fl(yt)})")],
             rf"x={p},\ {q};\ ({fl(xt)},{fl(yt)})", [T("Look for y = 0 in your table.", "அட்டவணையில் y = 0 ஐத் தேடுக."), T("The curve is symmetric about the turning point.", "வளைவு திரும்பற் புள்ளி பற்றிச் சமச்சீர்.")],
             formula="F-GRA-QUAD", diagram="GRA-QUAD-01", value=float(yt), verify=lambda: p * p + b * p + c == 0 and q * q + b * q + c == 0)


@tpl("G11C12", "A")
def complete_square_graph(r):
    b, c = r.choice([(4, 1), (-6, 5), (2, -2), (-4, -1)])
    h = Fr(b, 2); k = c - h * h
    return Q(T(f"Express $y = {poly([1,b,c])}$ in the form $y = (x + a)^2 + k$. Hence write the turning point and the range of x for which y is decreasing.", f"$y = {poly([1,b,c])}$ ஐ $y = (x + a)^2 + k$ வடிவில் எழுதுக. அதிலிருந்து திரும்பற் புள்ளியையும் y குறையும் x வீச்சையும் எழுதுக."),
             [S("Half the x-coefficient.", "x குணகத்தின் அரைவாசி.", rf"\frac{{{b}}}{{2}} = {fl(h)}"),
              S("Complete the square.", "வர்க்கப் பூர்த்தி செய்க.", rf"y = (x {'+' if h>=0 else '-'} {fl(abs(h))})^2 - ({fl(h)})^2 {sgn(c)}"),
              S("Simplify the constant.", "மாறிலியைச் சுருக்குக.", rf"y = (x {'+' if h>=0 else '-'} {fl(abs(h))})^2 {'+' if k>=0 else '-'} {fl(abs(k))}"),
              S("Turning point and decreasing range.", "திரும்பற் புள்ளியும் குறையும் வீச்சும்.", rf"({fl(-h)},\ {fl(k)}),\quad x < {fl(-h)}")],
             rf"y=(x {'+' if h>=0 else '-'} {fl(abs(h))})^2 {'+' if k>=0 else '-'} {fl(abs(k))};\ ({fl(-h)},{fl(k)});\ x<{fl(-h)}", [T("x² + bx = (x + b/2)² − (b/2)².", "x² + bx = (x + b/2)² − (b/2)².")], formula="F-GRA-VERTEX", diagram="GRA-QUAD-01", value=float(k),
             verify=lambda: sp.expand((X + h) ** 2 + k) == X ** 2 + b * X + c)


# ---------------- G11C13 Equations (quadratic formula) ----------------
@tpl("G11C13", "F")
def quad_factor_solve(r):
    p, q = r.choice([(2, 5), (-3, 4), (1, -6), (-2, -5)])
    b, c = -(p + q), p * q
    return Q(T(f"Solve: ${poly([1,b,c])} = 0$", f"தீர்க்க: ${poly([1,b,c])} = 0$"),
             [S("Factorise.", "காரணிப்படுத்துக.", rf"(x {sgn(-p)})(x {sgn(-q)}) = 0"),
              S("Each factor = 0.", "ஒவ்வொரு காரணியும் = 0.", rf"x {sgn(-p)} = 0\ \text{{or}}\ x {sgn(-q)} = 0"),
              S("Solve.", "தீர்க்க.", rf"x = {p}\ \text{{or}}\ x = {q}")],
             rf"x = {p}\ \text{{or}}\ {q}", [T("If A × B = 0, then A = 0 or B = 0.", "A × B = 0 எனின் A = 0 அல்லது B = 0.")], formula="F-ALG-QUAD", value=p,
             verify=lambda: p * p + b * p + c == 0 and q * q + b * q + c == 0, distractors=[(rf"x = {-p}\ \text{{or}}\ {-q}", T("Signs of the roots reversed.", "மூலங்களின் குறிகள் தலைகீழ்."))])


@tpl("G11C13", "G")
def quad_formula(r):
    a, b, c = r.choice([(1, -4, 1), (2, 3, -1), (1, 2, -4), (3, -5, 1)])
    D = b * b - 4 * a * c; r1 = (-b + math.sqrt(D)) / (2 * a); r2 = (-b - math.sqrt(D)) / (2 * a)
    return Q(T(f"Solve ${poly([a,b,c])} = 0$ using the formula. Give answers to 2 decimal places.", f"சூத்திரத்தைப் பயன்படுத்தி ${poly([a,b,c])} = 0$ ஐத் தீர்க்க. விடைகளை 2 தசமதானங்களுக்குத் தருக."),
             [S("Identify a, b, c.", "a, b, c ஐ இனங்காண்க.", rf"a = {a},\ b = {b},\ c = {c}"),
              S("Discriminant b² − 4ac.", "தன்மைகாட்டி b² − 4ac.", rf"({b})^2 - 4({a})({c}) = {D}"),
              S("Formula.", "சூத்திரம்.", rf"x = \frac{{-({b}) \pm \sqrt{{{D}}}}}{{2\times{a}}},\quad \sqrt{{{D}}} \approx {math.sqrt(D):.3f}"),
              S("Two answers.", "இரு விடைகள்.", rf"x \approx {r1:.2f}\ \text{{or}}\ x \approx {r2:.2f}")],
             rf"x \approx {r1:.2f},\ {r2:.2f}", [T("x = [−b ± √(b² − 4ac)] / 2a", "x = [−b ± √(b² − 4ac)] / 2a"), T("Be careful with −b when b is negative.", "b மறையாக இருந்தால் −b இல் கவனம்.")],
             formula="F-ALG-QFORM", value=round(r1, 2), tol=0.01, verify=lambda: abs(a * r1 * r1 + b * r1 + c) < 1e-9 and abs(a * r2 * r2 + b * r2 + c) < 1e-9)


@tpl("G11C13", "A")
def quad_word(r):
    x = r.choice([4, 5, 6, 8]); d = r.choice([2, 3])
    # number and reciprocal style: product of consecutive even etc. Use: speed problem simpler: two numbers differ by d, product P
    P = x * (x + d)
    return Q(T(f"A rectangular garden is {d} m longer than it is wide. A path 1 m wide is laid all around the OUTSIDE, and the area of the garden alone is {P} m². Find the width of the garden and the area of the path.",
               f"ஒரு செவ்வகத் தோட்டத்தின் நீளம் அகலத்திலும் {d} m கூடியது. தோட்டத்தைச் சுற்றி வெளிப்புறமாக 1 m அகலப் பாதை உள்ளது. தோட்டத்தின் பரப்பு மட்டும் {P} m². தோட்டத்தின் அகலத்தையும் பாதையின் பரப்பையும் காண்க."),
             [S("Let width = x, length = x + d.", "அகலம் = x, நீளம் = x + d.", rf"x(x+{d}) = {P}"),
              S("Rearrange.", "மாற்றியமைக்க.", rf"x^2 + {d}x - {P} = 0"),
              S("Factorise and reject the negative root.", "காரணிப்படுத்தி மறை மூலத்தை நிராகரிக்க.", rf"(x-{x})(x+{x+d}) = 0 \Rightarrow x = {x}"),
              S("Outer rectangle (add 2 m to each dimension).", "வெளிச் செவ்வகம் (ஒவ்வொரு அளவுக்கும் 2 m சேர்க்க).", rf"({x}+2)\times({x+d}+2) = {(x+2)*(x+d+2)}"),
              S("Path = outer − garden.", "பாதை = வெளி − தோட்டம்.", rf"{(x+2)*(x+d+2)} - {P} = {(x+2)*(x+d+2)-P}\ \text{{m}}^2")],
             rf"x={x}\text{{ m}},\ \text{{path}}={(x+2)*(x+d+2)-P}\text{{ m}}^2", [T("A 1 m path on both sides adds 2 m to each dimension.", "இருபுறமும் 1 m பாதை ஒவ்வொரு அளவுக்கும் 2 m சேர்க்கும்.")], unit="m", value=x, formula="F-ALG-QUAD",
             verify=lambda: x * (x + d) == P)


# ---------------- G11C14 Equiangular triangles ----------------
@tpl("G11C14", "F")
def similar_ratio(r):
    a, b, k = r.choice([(4, 6, 2), (3, 5, 3), (6, 9, Fr(1, 2)), (5, 7, Fr(3, 2))])
    return Q(T(f"ΔABC and ΔPQR are equiangular. AB = {a} cm, BC = {b} cm and PQ = {fl(a*k)} cm. Find QR.", f"ΔABC, ΔPQR இயல்பொத்தவை. AB = {a} cm, BC = {b} cm, PQ = {fl(a*k)} cm. QR ஐக் காண்க."),
             [S("Corresponding sides are in the same ratio.", "ஒத்த பக்கங்கள் ஒரே விகிதத்தில்.", r"\frac{PQ}{AB} = \frac{QR}{BC}"),
              S("Substitute.", "பிரதியிடுக.", rf"\frac{{{fl(a*k)}}}{{{a}}} = \frac{{QR}}{{{b}}}"),
              S("Solve.", "தீர்க்க.", rf"QR = {b}\times{fl(Fr(k))} = {fl(b*k)}\ \text{{cm}}")],
             rf"{fl(b*k)}\ \text{{cm}}", [T("Find the scale factor PQ ÷ AB first.", "முதலில் அளவுக்காரணி PQ ÷ AB ஐக் காண்க.")], unit="cm", value=float(b * k), formula="T-GEO-SIM", diagram="GEO-SIMILAR-01", verify=lambda: True)


@tpl("G11C14", "G")
def similar_parallel(r):
    ad, db, de = r.choice([(4, 2, 6), (3, 6, 5), (5, 3, 10)])
    bc = Fr(de * (ad + db), ad)
    return Q(T(f"In ΔABC, DE ∥ BC with D on AB and E on AC. AD = {ad} cm, DB = {db} cm and DE = {de} cm. Find BC.", f"ΔABC இல் DE ∥ BC; D, AB மீதும் E, AC மீதும் உள்ளன. AD = {ad} cm, DB = {db} cm, DE = {de} cm. BC ஐக் காண்க."),
             [S("ΔADE and ΔABC are equiangular (corresponding angles, DE ∥ BC).", "ΔADE, ΔABC இயல்பொத்தவை (ஒத்த கோணங்கள், DE ∥ BC).", r"\triangle ADE \sim \triangle ABC"),
              S("AB = AD + DB.", "AB = AD + DB.", rf"AB = {ad}+{db} = {ad+db}"),
              S("Ratio of sides.", "பக்க விகிதம்.", rf"\frac{{BC}}{{DE}} = \frac{{AB}}{{AD}} \Rightarrow BC = {de}\times\frac{{{ad+db}}}{{{ad}}} = {fl(bc)}\ \text{{cm}}")],
             rf"{fl(bc)}\ \text{{cm}}", [T("Use AB (the whole side), not DB.", "DB அல்ல, முழுப் பக்கம் AB.")], unit="cm", value=float(bc), formula="T-GEO-SIM", diagram="GEO-SIMILAR-01", verify=lambda: bc * ad == de * (ad + db),
             distractors=[(rf"{fl(Fr(de*db,ad))}\ \text{{cm}}", T("Used DB instead of AB.", "AB க்குப் பதிலாக DB."))])


@tpl("G11C14", "A")
def similar_proof(r):
    return Q(T("AB and CD are two chords of a circle that intersect at X inside the circle. Prove that ΔAXC and ΔDXB are equiangular and hence that AX × XB = CX × XD.", "AB, CD என்பன வட்டத்துக்குள் X இல் வெட்டும் இரு நாண்கள். ΔAXC, ΔDXB இயல்பொத்தவை என நிறுவி, அதிலிருந்து AX × XB = CX × XD எனக் காட்டுக."),
             [S("Vertically opposite angles.", "குத்தெதிர்க் கோணங்கள்.", r"\angle AXC = \angle DXB"),
              S("Angles in the same segment (on arc BC... arc AD).", "ஒரே துண்டக் கோணங்கள் (வில் AD மீது).", r"\angle ACX = \angle ACD = \angle ABD = \angle DBX"),
              S("Third angles are equal (angle sum).", "மூன்றாம் கோணங்களும் சமம் (கோணக் கூட்டுத்தொகை).", r"\angle CAX = \angle BDX"),
              S("So the triangles are equiangular; sides are proportional.", "எனவே முக்கோணிகள் இயல்பொத்தவை; பக்கங்கள் விகிதசமம்.", r"\frac{AX}{DX} = \frac{CX}{BX}"),
              S("Cross-multiply.", "குறுக்காகப் பெருக்குக.", r"AX\times XB = CX\times XD")],
             r"AX\times XB = CX\times XD", [T("Look for vertically opposite angles and same-segment angles.", "குத்தெதிர்க் கோணங்களையும் ஒரே துண்டக் கோணங்களையும் தேடுக.")], kind="proof", formula="T-GEO-SIM", diagram="GEO-CHORDS-INT-01", verify=lambda: True)


# ---------------- G11C15 Data representation & prediction ----------------
@tpl("G11C15", "F")
def median_position(r):
    data = sorted(r.sample(range(10, 60), r.choice([7, 9, 11])))
    k = len(data); med = data[(k - 1) // 2]
    return Q(T(f"Find the median of: {', '.join(map(str, data))}", f"இடையத்தைக் காண்க: {', '.join(map(str, data))}"),
             [S("The data is already in order. Count the values.", "தரவுகள் ஏற்கனவே ஒழுங்கில் உள்ளன. எண்ணுக.", rf"n = {k}"),
              S("Median position = (n + 1)/2.", "இடையத்தின் நிலை = (n + 1)/2.", rf"\frac{{{k}+1}}{{2}} = {(k+1)//2}"),
              S("Read that value.", "அப்பெறுமானத்தை வாசிக்க.", rf"\text{{median}} = {med}")],
             str(med), [T("Always order the data first.", "முதலில் தரவுகளை ஒழுங்குபடுத்துக.")], value=med, formula="F-STA-MEDIAN", verify=lambda: med == sorted(data)[len(data) // 2])


@tpl("G11C15", "G")
def quartiles(r):
    data = sorted(r.sample(range(1, 80), 11))
    q1, q2, q3 = data[2], data[5], data[8]
    return Q(T(f"For the 11 values {', '.join(map(str, data))}, find the lower quartile, the upper quartile and the interquartile range.", f"{', '.join(map(str, data))} எனும் 11 பெறுமானங்களுக்குக் கீழ்க் காலணை, மேற் காலணை, காலணையிடை வீச்சு ஆகியவற்றைக் காண்க."),
             [S("Q₁ position = (n + 1)/4.", "Q₁ நிலை = (n + 1)/4.", r"\frac{11+1}{4} = 3 \Rightarrow Q_1 = " + str(q1)),
              S("Q₃ position = 3(n + 1)/4.", "Q₃ நிலை = 3(n + 1)/4.", r"\frac{3(11+1)}{4} = 9 \Rightarrow Q_3 = " + str(q3)),
              S("Interquartile range = Q₃ − Q₁.", "காலணையிடை வீச்சு = Q₃ − Q₁.", rf"{q3} - {q1} = {q3-q1}")],
             rf"Q_1={q1},\ Q_3={q3},\ \text{{IQR}}={q3-q1}", [T("Positions: (n+1)/4 and 3(n+1)/4.", "நிலைகள்: (n+1)/4, 3(n+1)/4.")], value=q3 - q1, formula="F-STA-QUART", verify=lambda: True)


@tpl("G11C15", "A")
def ogive_read(r):
    cls = [(0, 10), (10, 20), (20, 30), (30, 40), (40, 50)]
    fs = r.choice([[4, 8, 16, 8, 4], [5, 10, 15, 6, 4], [2, 8, 20, 6, 4]])
    cf = [sum(fs[:i + 1]) for i in range(len(fs))]; N = cf[-1]
    # median by linear interpolation
    m = N / 2; i = next(j for j, v in enumerate(cf) if v >= m); L = cls[i][0]; F = cf[i - 1] if i else 0
    med = L + (m - F) / fs[i] * 10
    return Q(T(f"Classes 0–10 … 40–50 have frequencies {fs}. (i) Make a cumulative frequency table. (ii) Using the cumulative frequency curve (or interpolation), estimate the median.",
               f"0–10 … 40–50 வகுப்புகளின் மீடிறன்கள் {fs}. (i) திரள் மீடிறன் அட்டவணை அமைக்க. (ii) திரள் மீடிறன் வளையியைப் (அல்லது இடைச்செருகலைப்) பயன்படுத்தி இடையத்தை மதிப்பிடுக."),
             [S("Cumulative frequencies (plot at upper boundaries 10, 20, …).", "திரள் மீடிறன்கள் (மேல் எல்லைகள் 10, 20, … இல் குறிக்க).", ", ".join(map(str, cf))),
              S("Median is at N/2.", "இடையம் N/2 இல்.", rf"\frac{{{N}}}{{2}} = {m:g}"),
              S(f"It lies in the class {L}–{L+10}.", f"அது {L}–{L+10} வகுப்பில் உள்ளது.", rf"\text{{c.f. before}} = {F},\ f = {fs[i]}"),
              S("Interpolate.", "இடைச்செருகுக.", rf"{L} + \frac{{{m:g}-{F}}}{{{fs[i]}}}\times 10 \approx {med:.1f}")],
             rf"\approx {med:.1f}", [T("Read across from N/2 on the vertical axis to the curve, then down.", "நிலைக்குத்து அச்சில் N/2 இலிருந்து வளையி வரை, பின் கீழே.")], value=round(med, 1), tol=0.6, formula="F-STA-QUART", diagram="STA-OGIVE-01",
             verify=lambda: cf[-1] == sum(fs))


# ---------------- G11C16 Geometric progressions ----------------
@tpl("G11C16", "F")
def gp_nth(r):
    a, q, k = r.choice([(3, 2, 6), (2, 3, 5), (5, 2, 7), (1, 4, 4), (64, Fr(1, 2), 6)])
    Tn = a * Fr(q) ** (k - 1)
    return Q(T(f"Find the {k}th term of the geometric progression {a}, {fl(a*Fr(q))}, {fl(a*Fr(q)**2)}, …", f"{a}, {fl(a*Fr(q))}, {fl(a*Fr(q)**2)}, … எனும் பெருக்கல் விருத்தியின் {k} ஆம் உறுப்பைக் காண்க."),
             [S("Common ratio r = second ÷ first.", "பொது விகிதம் r = இரண்டாம் ÷ முதல்.", rf"r = {fl(Fr(q))}"),
              S("Tₙ = arⁿ⁻¹.", "Tₙ = arⁿ⁻¹.", rf"T_{{{k}}} = {a}\times({fl(Fr(q))})^{{{k-1}}}"),
              S("Calculate.", "கணிக்க.", rf"= {a}\times {fl(Fr(q)**(k-1))} = {fl(Tn)}")],
             fl(Tn), [T("Multiply by r each time, not add.", "ஒவ்வொரு முறையும் r ஆல் பெருக்குக, கூட்டவேண்டாம்.")], value=float(Tn), formula="F-GP-TN", verify=lambda: Tn == a * Fr(q) ** (k - 1),
             distractors=[(fl(a * Fr(q) ** k), T("Used power n instead of n − 1.", "n − 1 க்குப் பதிலாக n."))])


@tpl("G11C16", "G")
def gp_sum(r):
    a, q, k = r.choice([(2, 3, 5), (1, 2, 8), (3, 2, 6), (5, 3, 4)])
    Sn = a * (q ** k - 1) // (q - 1)
    return Q(T(f"Find the sum of the first {k} terms of the GP {a}, {a*q}, {a*q*q}, …", f"{a}, {a*q}, {a*q*q}, … எனும் பெ.வி. இன் முதல் {k} உறுப்புகளின் கூட்டுத்தொகையைக் காண்க."),
             [S("a and r.", "a, r.", rf"a = {a},\ r = {q}"),
              S("Sₙ = a(rⁿ − 1)/(r − 1) for r > 1.", "r > 1 இற்கு Sₙ = a(rⁿ − 1)/(r − 1).", rf"S_{{{k}}} = \frac{{{a}({q}^{{{k}}}-1)}}{{{q}-1}}"),
              S("Calculate.", "கணிக்க.", rf"= \frac{{{a}\times {q**k - 1}}}{{{q-1}}} = {Sn}")],
             str(Sn), [T("Work out rⁿ first.", "முதலில் rⁿ ஐக் கணிக்க.")], value=Sn, formula="F-GP-SN", verify=lambda: Sn == sum(a * q ** i for i in range(k)))


@tpl("G11C16", "A")
def gp_find_r(r):
    a, q = r.choice([(3, 2), (2, 3), (5, 2), (4, 3)])
    T3, T6 = a * q ** 2, a * q ** 5
    return Q(T(f"The 3rd term of a GP is {T3} and the 6th term is {T6}. Find the first term and the common ratio.", f"ஒரு பெ.வி. இன் 3 ஆம் உறுப்பு {T3}, 6 ஆம் உறுப்பு {T6}. முதல் உறுப்பையும் பொது விகிதத்தையும் காண்க."),
             [S("Write both terms.", "இரு உறுப்புகளையும் எழுதுக.", rf"ar^2 = {T3},\quad ar^5 = {T6}"),
              S("Divide to remove a.", "a ஐ நீக்க வகுக்க.", rf"r^3 = \frac{{{T6}}}{{{T3}}} = {q**3}"),
              S("Cube root.", "கனமூலம்.", rf"r = {q}"),
              S("Find a.", "a ஐக் காண்க.", rf"a\times {q}^2 = {T3} \Rightarrow a = {a}")],
             rf"a={a},\ r={q}", [T("Divide one equation by the other.", "ஒரு சமன்பாட்டை மற்றதால் வகுக்க.")], value=q, formula="F-GP-TN", verify=lambda: a * q ** 2 == T3 and a * q ** 5 == T6)


# ---------------- G11C17 Pythagoras ----------------
@tpl("G11C17", "F")
def pyth_hyp(r):
    a, b = r.choice([(6, 8), (5, 12), (9, 12), (8, 15), (7, 24)])
    c = int(math.isqrt(a * a + b * b))
    return Q(T(f"The two shorter sides of a right-angled triangle are {a} cm and {b} cm. Find the hypotenuse.", f"செங்கோண முக்கோணியின் சிறிய இரு பக்கங்கள் {a} cm, {b} cm. செம்பக்கத்தைக் காண்க."),
             [S("c² = a² + b².", "c² = a² + b².", rf"c^2 = {a}^2 + {b}^2 = {a*a} + {b*b} = {c*c}"),
              S("Square root.", "வர்க்கமூலம்.", rf"c = \sqrt{{{c*c}}} = {c}\ \text{{cm}}")],
             rf"{c}\ \text{{cm}}", [T("The hypotenuse is opposite the right angle.", "செம்பக்கம் செங்கோணத்துக்கு எதிரே.")], unit="cm", value=c, formula="T-GEO-PYTH", diagram="GEO-RIGHT-01", verify=lambda: c * c == a * a + b * b,
             distractors=[(rf"{a+b}\ \text{{cm}}", T("Added the sides without squaring.", "வர்க்கிக்காமல் பக்கங்களைக் கூட்டியது."))])


@tpl("G11C17", "G")
def pyth_ladder(r):
    L, d = r.choice([(10, 6), (13, 5), (17, 8), (25, 7)])
    h = int(math.isqrt(L * L - d * d))
    return Q(T(f"A {L} m ladder leans against a vertical wall. Its foot is {d} m from the wall. How high up the wall does it reach?", f"{L} m நீள ஏணி நிலைக்குத்துச் சுவரில் சாய்ந்துள்ளது. அதன் அடி சுவரிலிருந்து {d} m. அது சுவரில் எவ்வளவு உயரம் வரை எட்டும்?"),
             [S("The ladder is the hypotenuse.", "ஏணி செம்பக்கம்.", rf"h^2 + {d}^2 = {L}^2"),
              S("Rearrange.", "மாற்றியமைக்க.", rf"h^2 = {L*L} - {d*d} = {h*h}"),
              S("Square root.", "வர்க்கமூலம்.", rf"h = {h}\ \text{{m}}")],
             rf"{h}\ \text{{m}}", [T("Subtract when finding a shorter side.", "சிறிய பக்கத்தைக் காணும்போது கழிக்க.")], unit="m", value=h, formula="T-GEO-PYTH", diagram="GEO-RIGHT-01", verify=lambda: h * h + d * d == L * L)


@tpl("G11C17", "A")
def pyth_two_step(r):
    a, b, c = r.choice([(3, 4, 12), (6, 8, 24), (2, 3, 6)])
    d1 = math.sqrt(a * a + b * b); d2 = math.sqrt(a * a + b * b + c * c)
    return Q(T(f"A cuboid measures {a} cm × {b} cm × {c} cm. Find the length of the longest rod that fits inside (the space diagonal).", f"ஒரு கனவுரு {a} cm × {b} cm × {c} cm. உள்ளே பொருந்தும் மிக நீண்ட கோலின் நீளத்தை (வெளி மூலைவிட்டம்) காண்க."),
             [S("Diagonal of the base.", "அடியின் மூலைவிட்டம்.", rf"d^2 = {a}^2 + {b}^2 = {a*a+b*b}"),
              S("Space diagonal uses d and the height.", "வெளி மூலைவிட்டம் d, உயரம் ஆகியவற்றைப் பயன்படுத்தும்.", rf"D^2 = d^2 + {c}^2 = {a*a+b*b} + {c*c} = {a*a+b*b+c*c}"),
              S("Square root.", "வர்க்கமூலம்.", rf"D = {n(d2,2) if d2%1 else int(d2)}\ \text{{cm}}")],
             rf"{n(d2,2) if d2%1 else int(d2)}\ \text{{cm}}", [T("Use Pythagoras twice.", "பைதகரசை இருமுறை பயன்படுத்துக.")], unit="cm", value=round(d2, 2), tol=0.01, formula="T-GEO-PYTH", verify=lambda: abs(d2 * d2 - (a * a + b * b + c * c)) < 1e-9)


# ---------------- G11C18 Trigonometry ----------------
@tpl("G11C18", "F")
def trig_ratio(r):
    a, b, c = r.choice([(3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25)])
    return Q(T(f"In right-angled ΔABC, ∠B = 90°, AB = {b} cm, BC = {a} cm and AC = {c} cm. Write sin A, cos A and tan A.", f"செங்கோண ΔABC இல் ∠B = 90°, AB = {b} cm, BC = {a} cm, AC = {c} cm. sin A, cos A, tan A ஐ எழுதுக."),
             [S("For angle A: opposite = BC, adjacent = AB, hypotenuse = AC.", "கோணம் A இற்கு: எதிர் = BC, அயல் = AB, செம்பக்கம் = AC.", r"\text{opp}=BC,\ \text{adj}=AB,\ \text{hyp}=AC"),
              S("Ratios.", "விகிதங்கள்.", rf"\sin A = \frac{{{a}}}{{{c}}},\ \cos A = \frac{{{b}}}{{{c}}},\ \tan A = \frac{{{a}}}{{{b}}}")],
             rf"\sin A=\frac{{{a}}}{{{c}}},\ \cos A=\frac{{{b}}}{{{c}}},\ \tan A=\frac{{{a}}}{{{b}}}", [T("SOH CAH TOA.", "sin = எதிர்/செம்; cos = அயல்/செம்; tan = எதிர்/அயல்.")], formula="F-TRI-RATIOS", diagram="GEO-RIGHT-01", value=a / c, verify=lambda: a * a + b * b == c * c)


@tpl("G11C18", "G")
def elevation_height(r):
    d, ang = r.choice([(20, 35), (50, 40), (30, 52), (40, 28)])
    t = round(math.tan(math.radians(ang)), 4); h = d * t
    return Q(T(f"From a point {d} m from the foot of a vertical tower on level ground, the angle of elevation of the top is {ang}°. Find the height of the tower. (Use tables: tan {ang}° = {t:.4f})", f"சமதரையில் நிலைக்குத்துக் கோபுர அடியிலிருந்து {d} m தூரத்திலுள்ள புள்ளியிலிருந்து உச்சியின் ஏற்றக்கோணம் {ang}°. கோபுரத்தின் உயரத்தைக் காண்க. (அட்டவணை: tan {ang}° = {t:.4f})"),
             [S("Draw a right triangle: height opposite the angle, distance adjacent.", "செங்கோண முக்கோணி: உயரம் கோணத்துக்கு எதிர், தூரம் அயல்.", rf"\tan {ang}^\circ = \frac{{h}}{{{d}}}"),
              S("Make h the subject.", "h ஐ எழுவாயாக்குக.", rf"h = {d}\times\tan {ang}^\circ = {d}\times {t:.4f}"),
              S("Calculate.", "கணிக்க.", rf"h \approx {h:.2f}\ \text{{m}}")],
             rf"{h:.2f}\ \text{{m}}", [T("Opposite and adjacent → tan.", "எதிரும் அயலும் → tan.")], unit="m", value=round(h, 2), tol=0.05, formula="F-TRI-RATIOS", diagram="TRI-ELEV-01", verify=lambda: abs(h - d * math.tan(math.radians(ang))) < 0.01)


@tpl("G11C18", "A")
def two_angles(r):
    h, a1, a2 = r.choice([(40, 30, 50), (60, 25, 45), (50, 35, 60)])
    t1, t2 = round(math.tan(math.radians(a1)), 4), round(math.tan(math.radians(a2)), 4)
    x1, x2 = h / t1, h / t2; gap = x1 - x2
    return Q(T(f"From the top of a {h} m cliff, the angles of depression of two boats in line with the foot of the cliff are {a1}° and {a2}°. Find the distance between the boats. (tan {a1}° = {t1:.4f}, tan {a2}° = {t2:.4f})", f"{h} m உயரக் குன்றின் உச்சியிலிருந்து, குன்றின் அடியுடன் நேர்கோட்டிலுள்ள இரு படகுகளின் இறக்கக்கோணங்கள் {a1}°, {a2}°. படகுகளுக்கிடையிலான தூரத்தைக் காண்க. (tan {a1}° = {t1:.4f}, tan {a2}° = {t2:.4f})"),
             [S("Angle of depression = angle of elevation from the boat (alternate angles).", "இறக்கக்கோணம் = படகிலிருந்தான ஏற்றக்கோணம் (ஒன்றுவிட்ட கோணங்கள்).", rf"\tan\theta = \frac{{{h}}}{{x}}"),
              S("Far boat.", "தொலைவிலுள்ள படகு.", rf"x_1 = \frac{{{h}}}{{\tan {a1}^\circ}} = \frac{{{h}}}{{{t1:.4f}}} \approx {x1:.2f}"),
              S("Near boat.", "அருகிலுள்ள படகு.", rf"x_2 = \frac{{{h}}}{{{t2:.4f}}} \approx {x2:.2f}"),
              S("Difference.", "வித்தியாசம்.", rf"{x1:.2f} - {x2:.2f} \approx {gap:.2f}\ \text{{m}}")],
             rf"\approx {gap:.2f}\ \text{{m}}", [T("The smaller angle belongs to the farther boat.", "சிறிய கோணம் தொலைவிலுள்ள படகுக்குரியது.")], unit="m", value=round(gap, 2), tol=0.1, formula="F-TRI-RATIOS", diagram="TRI-DEPR-01",
             verify=lambda: abs(gap - (h / math.tan(math.radians(a1)) - h / math.tan(math.radians(a2)))) < 0.05)


# ---------------- G11C19 Matrices ----------------
@tpl("G11C19", "F")
def mat_add(r):
    A = [[r.randint(-3, 5) for _ in range(2)] for _ in range(2)]; B = [[r.randint(-3, 5) for _ in range(2)] for _ in range(2)]
    C = [[A[i][j] + B[i][j] for j in range(2)] for i in range(2)]
    m = lambda M: r"\begin{pmatrix}" + r"\\".join(" & ".join(map(str, row)) for row in M) + r"\end{pmatrix}"
    return Q(T(f"Find A + B where $A = {m(A)}$ and $B = {m(B)}$.", f"$A = {m(A)}$, $B = {m(B)}$ எனின் A + B ஐக் காண்க."),
             [S("Add corresponding elements.", "ஒத்த மூலகங்களைக் கூட்டுக.", r"\begin{pmatrix}" + r"\\".join(" & ".join(f"{A[i][j]}+({B[i][j]})" for j in range(2)) for i in range(2)) + r"\end{pmatrix}"),
              S("Simplify.", "சுருக்குக.", m(C))],
             m(C), [T("Matrices of the same order are added element by element.", "ஒரே வரிசையுடைய தாயங்கள் மூலகம் மூலகமாகக் கூட்டப்படும்.")], kind="algebra", formula="F-MAT-ADD", verify=lambda: True)


@tpl("G11C19", "G")
def mat_mult(r):
    A = [[r.randint(-2, 4) for _ in range(2)] for _ in range(2)]; B = [[r.randint(-2, 4)] for _ in range(2)]
    C = sp.Matrix(A) * sp.Matrix(B)
    m = lambda M: r"\begin{pmatrix}" + r"\\".join(" & ".join(map(str, row)) for row in M) + r"\end{pmatrix}"
    return Q(T(f"Find AB where $A = {m(A)}$ and $B = {m(B)}$. State the order of AB.", f"$A = {m(A)}$, $B = {m(B)}$ எனின் AB ஐக் கண்டு அதன் வரிசையைக் கூறுக."),
             [S("Order: (2 × 2)(2 × 1) → 2 × 1.", "வரிசை: (2 × 2)(2 × 1) → 2 × 1.", r"2\times 1"),
              S("Row × column.", "நிரை × நிரல்.", rf"\begin{{pmatrix}} {A[0][0]}({B[0][0]}) + {A[0][1]}({B[1][0]}) \\ {A[1][0]}({B[0][0]}) + {A[1][1]}({B[1][0]}) \end{{pmatrix}}"),
              S("Simplify.", "சுருக்குக.", m([[int(C[0])], [int(C[1])]]))],
             m([[int(C[0])], [int(C[1])]]), [T("Each row of A times the column of B.", "A இன் ஒவ்வொரு நிரையும் × B இன் நிரல்.")], kind="algebra", formula="F-MAT-MULT", verify=lambda: True)


@tpl("G11C19", "A")
def mat_equation(r):
    x, y = r.choice([(2, 3), (-1, 4), (3, -2)])
    a, b, c, d = r.choice([(2, 1, 1, 3), (3, 2, 1, -1), (1, 2, 2, 5)])
    p, q = a * x + b * y, c * x + d * y
    return Q(T(f"Find x and y if $\\begin{{pmatrix}} {a} & {b} \\\\ {c} & {d} \\end{{pmatrix}}\\begin{{pmatrix}} x \\\\ y \\end{{pmatrix}} = \\begin{{pmatrix}} {p} \\\\ {q} \\end{{pmatrix}}$.", f"$\\begin{{pmatrix}} {a} & {b} \\\\ {c} & {d} \\end{{pmatrix}}\\begin{{pmatrix}} x \\\\ y \\end{{pmatrix}} = \\begin{{pmatrix}} {p} \\\\ {q} \\end{{pmatrix}}$ எனின் x, y ஐக் காண்க."),
             [S("Multiply out.", "பெருக்கி விரிக்க.", rf"{a}x {sgn(b)}y = {p},\quad {c}x {sgn(d)}y = {q}"),
              S("Solve the simultaneous equations.", "ஒருங்கமை சமன்பாடுகளைத் தீர்க்க.", rf"x = {x},\ y = {y}"),
              S("Check.", "சரிபார்க்க.", rf"{a}({x}) {sgn(b)}({y}) = {p}\ \checkmark")],
             rf"x={x},\ y={y}", [T("Matrix multiplication gives two equations.", "தாயப் பெருக்கல் இரு சமன்பாடுகளைத் தரும்.")], value=x, formula="F-MAT-MULT", verify=lambda: a * x + b * y == p and c * x + d * y == q)


# ---------------- G11C20 Inequalities (graphical) ----------------
@tpl("G11C20", "F")
def point_in_region(r):
    px, py = r.choice([(1, 2), (3, 1), (0, 4), (2, 5)])
    ok1 = px + py <= 5; ok2 = py >= 1
    ok = ok1 and ok2
    return Q(T(f"Does the point ({px}, {py}) lie in the region defined by x + y ≤ 5 and y ≥ 1?", f"({px}, {py}) புள்ளி x + y ≤ 5, y ≥ 1 ஆல் வரையறுக்கப்பட்ட பிரதேசத்தில் உள்ளதா?"),
             [S("Test x + y ≤ 5.", "x + y ≤ 5 ஐச் சோதிக்க.", rf"{px}+{py} = {px+py} \Rightarrow {'\\checkmark' if ok1 else '\\times'}"),
              S("Test y ≥ 1.", "y ≥ 1 ஐச் சோதிக்க.", rf"{py} \geq 1 \Rightarrow {'\\checkmark' if ok2 else '\\times'}"),
              S("Both must be true.", "இரண்டும் உண்மையாக வேண்டும்.", r"\text{" + ("Yes" if ok else "No") + "}")],
             r"\text{" + ("Yes" if ok else "No") + "}", [T("Substitute the point into each inequality.", "புள்ளியை ஒவ்வொரு சமனிலியிலும் பிரதியிடுக.")], kind="concept", formula="F-ALG-INEQ2", diagram="GRA-REGION-01", verify=lambda: True)


@tpl("G11C20", "G")
def region_describe(r):
    return Q(T("Write the inequalities that describe the region bounded by the x-axis, the y-axis and the line x + 2y = 8 (the triangle in the first quadrant), including the boundary.", "x அச்சு, y அச்சு, x + 2y = 8 கோடு ஆகியவற்றால் எல்லைப்படுத்தப்பட்ட (முதலாம் கால்வட்டத்திலுள்ள முக்கோணி) பிரதேசத்தை, எல்லையுட்பட, விவரிக்கும் சமனிலிகளை எழுதுக."),
             [S("Right of the y-axis.", "y அச்சுக்கு வலப்புறம்.", r"x \geq 0"),
              S("Above the x-axis.", "x அச்சுக்கு மேலே.", r"y \geq 0"),
              S("Test (0,0) in x + 2y: 0 ≤ 8, so the origin side is x + 2y ≤ 8.", "(0,0) ஐச் சோதிக்க: 0 ≤ 8; எனவே x + 2y ≤ 8.", r"x + 2y \leq 8")],
             r"x\geq 0,\ y\geq 0,\ x+2y\leq 8", [T("Test the origin to decide which side.", "எப்பக்கம் எனத் தீர்மானிக்க ஆதிப்புள்ளியைச் சோதிக்க.")], kind="algebra", formula="F-ALG-INEQ2", diagram="GRA-REGION-01", verify=lambda: True)


@tpl("G11C20", "A")
def simultaneous_ineq_int(r):
    pts = [(x, y) for x in range(0, 6) for y in range(0, 6) if x + y <= 4 and y >= x and x >= 1]
    return Q(T("List all points (x, y) with whole-number coordinates that satisfy x ≥ 1, y ≥ x and x + y ≤ 4.", "x ≥ 1, y ≥ x, x + y ≤ 4 ஐத் திருப்திப்படுத்தும் முழு எண் ஆள்கூறுகளுடைய எல்லாப் புள்ளிகளையும் (x, y) பட்டியலிடுக."),
             [S("x starts at 1.", "x, 1 இலிருந்து தொடங்கும்.", r"x = 1, 2, \dots"),
              S("For x = 1: y ≥ 1 and y ≤ 3.", "x = 1 இற்கு: y ≥ 1, y ≤ 3.", r"(1,1),(1,2),(1,3)"),
              S("For x = 2: y ≥ 2 and y ≤ 2.", "x = 2 இற்கு: y ≥ 2, y ≤ 2.", r"(2,2)"),
              S("x = 3 fails (y ≥ 3 and y ≤ 1).", "x = 3 பொருந்தாது.", ", ".join(f"({a},{b})" for a, b in pts))],
             ", ".join(f"({a},{b})" for a, b in pts), [T("Fix x, then find the allowed y values.", "x ஐ நிலைப்படுத்தி அனுமதிக்கப்பட்ட y ஐக் காண்க.")], kind="algebra", formula="F-ALG-INEQ2", diagram="GRA-REGION-01", verify=lambda: pts == [(1, 1), (1, 2), (1, 3), (2, 2)])


# ---------------- G11C21 Cyclic quadrilaterals ----------------
@tpl("G11C21", "F")
def cyclic_opposite(r):
    a, b = r.choice([(85, 100), (70, 95), (110, 75), (64, 118)])
    return Q(T(f"ABCD is a cyclic quadrilateral. ∠A = {a}° and ∠B = {b}°. Find ∠C and ∠D.", f"ABCD ஒரு வட்ட நாற்பக்கல். ∠A = {a}°, ∠B = {b}°. ∠C, ∠D ஐக் காண்க."),
             [S("Opposite angles of a cyclic quadrilateral add to 180°.", "வட்ட நாற்பக்கலின் எதிர்க் கோணங்கள் 180° ஆகும்.", rf"\angle C = 180 - {a} = {180-a}^\circ"),
              S("Same for B and D.", "B, D க்கும் அவ்வாறே.", rf"\angle D = 180 - {b} = {180-b}^\circ")],
             rf"\angle C={180-a}^\circ,\ \angle D={180-b}^\circ", [T("Opposite angles are supplementary.", "எதிர்க் கோணங்கள் மிகைநிரப்பிகள்.")], unit="°", value=180 - a, formula="T-CIR-CYCLIC", diagram="GEO-CYCLIC-01", verify=lambda: True,
             distractors=[(rf"\angle C={a}^\circ,\ \angle D={b}^\circ", T("Assumed opposite angles are equal (that is for parallelograms).", "எதிர்க் கோணங்கள் சமம் எனக் கருதியது (இணைகரத்துக்கு)."))])


@tpl("G11C21", "G")
def cyclic_exterior(r):
    a = r.choice([72, 85, 98, 105])
    return Q(T(f"ABCD is a cyclic quadrilateral. Side BC is produced to E. ∠BAD = {a}°. Find ∠DCE.", f"ABCD வட்ட நாற்பக்கல். BC, E வரை நீட்டப்பட்டுள்ளது. ∠BAD = {a}°. ∠DCE ஐக் காண்க."),
             [S("Exterior angle of a cyclic quadrilateral = interior opposite angle.", "வட்ட நாற்பக்கலின் புறக்கோணம் = அகத்தெதிர்க் கோணம்.", rf"\angle DCE = \angle BAD = {a}^\circ")],
             f"{a}^\\circ", [T("Or: ∠BCD = 180° − ∠A, then ∠DCE = 180° − ∠BCD.", "அல்லது: ∠BCD = 180° − ∠A, பின் ∠DCE = 180° − ∠BCD.")], unit="°", value=a, formula="T-CIR-CYCLIC", diagram="GEO-CYCLIC-01", verify=lambda: True)


@tpl("G11C21", "A")
def cyclic_algebra(r):
    x = r.choice([20, 25, 30, 35])
    A = 2 * x + 10; C = 180 - A; k = C - x
    return Q(T(f"In cyclic quadrilateral PQRS, ∠P = $(2x + 10)^\\circ$ and ∠R = $(x + {k})^\\circ$. Find x and ∠R.", f"PQRS வட்ட நாற்பக்கலில் ∠P = $(2x + 10)^\\circ$, ∠R = $(x + {k})^\\circ$. x ஐயும் ∠R ஐயும் காண்க."),
             [S("Opposite angles add to 180°.", "எதிர்க் கோணங்கள் 180°.", rf"(2x+10) + (x+{k}) = 180"),
              S("Simplify.", "சுருக்குக.", rf"3x + {10+k} = 180 \Rightarrow 3x = {170-k}"),
              S("Solve and substitute.", "தீர்த்துப் பிரதியிடுக.", rf"x = {x},\ \angle R = {x}+{k} = {C}^\circ")],
             rf"x={x},\ \angle R={C}^\circ", [T("P and R are opposite.", "P, R எதிரெதிர்.")], value=x, formula="T-CIR-CYCLIC", diagram="GEO-CYCLIC-01", verify=lambda: A + C == 180)


# ---------------- G11C22 Tangents ----------------
@tpl("G11C22", "F")
def tangent_radius(r):
    rad, d = r.choice([(5, 13), (8, 17), (7, 25), (6, 10)])
    t = int(math.isqrt(d * d - rad * rad))
    return Q(T(f"A tangent is drawn from a point P to a circle with centre O and radius {rad} cm. OP = {d} cm. Find the length of the tangent.", f"மையம் O, ஆரை {rad} cm உடைய வட்டத்துக்கு P இலிருந்து ஒரு தொடலி வரையப்பட்டுள்ளது. OP = {d} cm. தொடலியின் நீளத்தைக் காண்க."),
             [S("Tangent ⟂ radius at the point of contact.", "தொடுபுள்ளியில் தொடலி ⟂ ஆரை.", r"\angle OTP = 90^\circ"),
              S("Pythagoras.", "பைதகரசு.", rf"PT^2 = {d}^2 - {rad}^2 = {t*t}"),
              S("Square root.", "வர்க்கமூலம்.", rf"PT = {t}\ \text{{cm}}")],
             rf"{t}\ \text{{cm}}", [T("The right angle is at the point of contact.", "செங்கோணம் தொடுபுள்ளியில்.")], unit="cm", value=t, formula="T-CIR-TAN", diagram="GEO-TANGENT-01", verify=lambda: t * t + rad * rad == d * d)


@tpl("G11C22", "G")
def two_tangents(r):
    ang = r.choice([40, 50, 64, 70])
    return Q(T(f"PA and PB are tangents from P to a circle with centre O. ∠APB = {ang}°. Find ∠AOB and ∠PAB.", f"PA, PB என்பன P இலிருந்து மையம் O உடைய வட்டத்துக்கான தொடலிகள். ∠APB = {ang}°. ∠AOB, ∠PAB ஐக் காண்க."),
             [S("∠OAP = ∠OBP = 90° (tangent ⟂ radius).", "∠OAP = ∠OBP = 90°.", r"90^\circ + 90^\circ"),
              S("Angles of quadrilateral OAPB add to 360°.", "OAPB நாற்பக்கலின் கோணங்கள் 360°.", rf"\angle AOB = 360 - 180 - {ang} = {180-ang}^\circ"),
              S("PA = PB, so ΔPAB is isosceles.", "PA = PB; ΔPAB இருசமபக்கம்.", rf"\angle PAB = \frac{{180-{ang}}}{{2}} = {(180-ang)//2}^\circ")],
             rf"\angle AOB={180-ang}^\circ,\ \angle PAB={(180-ang)//2}^\circ", [T("Tangents from an external point are equal.", "வெளிப்புள்ளியிலிருந்தான தொடலிகள் சமம்.")], unit="°", value=180 - ang, formula="T-CIR-TAN", diagram="GEO-TANGENT-02", verify=lambda: True)


@tpl("G11C22", "A")
def alternate_segment(r):
    a, b = r.choice([(55, 65), (48, 72), (40, 80)])
    return Q(T(f"TA is a tangent to a circle at A. AB and AC are chords. ∠TAB = {a}° and ∠ABC = {b}°. Find ∠ACB and ∠BAC.", f"TA, A இல் வட்டத்துக்கான தொடலி. AB, AC நாண்கள். ∠TAB = {a}°, ∠ABC = {b}°. ∠ACB, ∠BAC ஐக் காண்க."),
             [S("Alternate segment theorem: angle between tangent and chord = angle in the alternate segment.", "ஒன்றுவிட்ட துண்டத் தேற்றம்: தொடலிக்கும் நாணுக்குமிடையிலான கோணம் = ஒன்றுவிட்ட துண்டக் கோணம்.", rf"\angle ACB = \angle TAB = {a}^\circ"),
              S("Angle sum of ΔABC.", "ΔABC இன் கோணக் கூட்டுத்தொகை.", rf"\angle BAC = 180 - {a} - {b} = {180-a-b}^\circ")],
             rf"\angle ACB={a}^\circ,\ \angle BAC={180-a-b}^\circ", [T("Find the angle on the OTHER side of the chord AB.", "நாண் AB இன் மறுபக்கக் கோணத்தைக் காண்க.")], unit="°", value=a, formula="T-CIR-ALTSEG", diagram="GEO-ALTSEG-01", verify=lambda: True)


# ---------------- G11C23 Constructions ----------------
@tpl("G11C23", "F")
def construct_tangent_point(r):
    rad = r.choice([3, 3.5, 4])
    return Q(T(f"Draw a circle of radius {rad} cm with centre O and mark a point A on it. Construct the tangent at A. Write the steps.", f"மையம் O, ஆரை {rad} cm உடைய வட்டம் வரைந்து அதில் A ஐக் குறிக்க. A இல் தொடலியை அமைக்க. படிகளை எழுதுக."),
             [S(f"Draw the circle, radius {rad} cm, and mark A.", f"ஆரை {rad} cm வட்டம் வரைந்து A ஐக் குறிக்க.", r"OA = r"),
              S("Join OA and extend it beyond A.", "OA ஐ இணைத்து A க்கு அப்பால் நீட்டுக.", r"OA\ \text{extended}"),
              S("Construct a perpendicular to OA at A.", "A இல் OA க்குச் செங்குத்து அமைக்க.", r"\perp\ \text{at }A"),
              S("That perpendicular is the tangent.", "அச்செங்குத்தே தொடலி.", r"\text{tangent}\perp OA")],
             r"\text{tangent at }A\perp OA", [T("Tangent is perpendicular to the radius.", "தொடலி ஆரைக்குச் செங்குத்து.")], kind="construction", formula="C-TANGENT", diagram="CON-TANGENT-01", verify=lambda: True)


@tpl("G11C23", "G")
def construct_circumcircle(r):
    return Q(T("Construct triangle ABC with AB = 6 cm, BC = 7 cm and AC = 5 cm, then construct its circumcircle. Write the steps.", "AB = 6 cm, BC = 7 cm, AC = 5 cm உடைய ABC முக்கோணியை அமைத்து அதன் சுற்றுவட்டத்தை அமைக்க. படிகளை எழுதுக."),
             [S("Draw BC = 7 cm.", "BC = 7 cm வரைக.", r"BC = 7"),
              S("Arc radius 6 cm from B and arc radius 5 cm from C meet at A.", "B இலிருந்து 6 cm வில், C இலிருந்து 5 cm வில் A இல் சந்திக்கும்.", r"A"),
              S("Construct the perpendicular bisectors of two sides.", "இரு பக்கங்களின் செங்குத்து இருசமகூறாக்கிகளை அமைக்க.", r"\text{bisectors of }AB,\ BC"),
              S("They meet at O (circumcentre). Draw the circle with radius OA.", "அவை O (சுற்றுமையம்) இல் சந்திக்கும். ஆரை OA வட்டம் வரைக.", r"OA = OB = OC")],
             r"\text{circle centre }O,\ \text{radius }OA", [T("The circumcentre is equidistant from all three vertices.", "சுற்றுமையம் மூன்று உச்சிகளிலிருந்தும் சம தூரம்.")], kind="construction", formula="C-CIRCUM", diagram="CON-CIRCUM-01", verify=lambda: True)


@tpl("G11C23", "A")
def construct_incircle(r):
    return Q(T("Construct an equilateral triangle of side 6 cm and construct its inscribed circle (incircle). Write the steps and measure the radius.", "பக்கம் 6 cm உடைய சமபக்க முக்கோணியை அமைத்து அதன் உள்வட்டத்தை அமைக்க. படிகளை எழுதி ஆரையை அளக்க."),
             [S("Draw AB = 6 cm; arcs of 6 cm from A and B meet at C.", "AB = 6 cm; A, B இலிருந்து 6 cm விற்கள் C இல் சந்திக்கும்.", r"AB = BC = CA = 6"),
              S("Bisect two angles (e.g. ∠A and ∠B).", "இரு கோணங்களை இருசமகூறிடுக.", r"\text{bisectors meet at } I"),
              S("Draw a perpendicular from I to a side; this is the radius.", "I இலிருந்து ஒரு பக்கத்துக்குச் செங்குத்து வரைக; அதுவே ஆரை.", r"r = ID"),
              S("Expected radius (check by calculation).", "எதிர்பார்க்கும் ஆரை (கணிப்பால் சரிபார்க்க).", rf"r = \frac{{6}}{{2\sqrt3}} \approx {6/(2*math.sqrt(3)):.2f}\ \text{{cm}}")],
             rf"r\approx {6/(2*math.sqrt(3)):.1f}\ \text{{cm}}", [T("The incentre is where the angle bisectors meet.", "கோண இருசமகூறாக்கிகள் சந்திக்குமிடம் உள்மையம்.")], kind="construction", value=round(6 / (2 * math.sqrt(3)), 2), tol=0.1, formula="C-INCIRCLE", diagram="CON-ANGBIS-01", verify=lambda: abs(6 / (2 * math.sqrt(3)) - math.sqrt(3)) < 1e-9)


# ---------------- G11C24 Sets (three sets) ----------------
@tpl("G11C24", "F")
def set_notation(r):
    A = {1, 2, 3, 4, 5}; B = {4, 5, 6, 7}
    return Q(T("U = {1, 2, …, 9}, A = {1, 2, 3, 4, 5}, B = {4, 5, 6, 7}. Find A ∩ B, A ∪ B and A′.", "U = {1, 2, …, 9}, A = {1, 2, 3, 4, 5}, B = {4, 5, 6, 7}. A ∩ B, A ∪ B, A′ ஐக் காண்க."),
             [S("Intersection: elements in both.", "வெட்டு: இரண்டிலுமுள்ள மூலகங்கள்.", r"A\cap B = \{4,5\}"),
              S("Union: elements in either.", "ஒன்றிப்பு: ஏதாவதொன்றிலுள்ளவை.", r"A\cup B = \{1,2,3,4,5,6,7\}"),
              S("Complement: in U but not in A.", "நிரப்பி: U இல் உள்ள A இல் இல்லாதவை.", r"A' = \{6,7,8,9\}")],
             r"A\cap B=\{4,5\};\ A\cup B=\{1,\dots,7\};\ A'=\{6,7,8,9\}", [T("∩ = and, ∪ = or, ′ = not.", "∩ = உம், ∪ = அல்லது, ′ = அல்லாத.")], kind="concept", formula="F-SET-UNION", diagram="SET-VENN2-01", verify=lambda: A & B == {4, 5} and A | B == set(range(1, 8)))


@tpl("G11C24", "G")
def three_sets(r):
    abc, ab, bc, ac, a, b, c, U = r.choice([(3, 8, 6, 5, 20, 22, 18, 50), (2, 5, 4, 6, 15, 18, 16, 40)])
    only_ab, only_bc, only_ac = ab - abc, bc - abc, ac - abc
    oa, ob, oc = a - only_ab - only_ac - abc, b - only_ab - only_bc - abc, c - only_ac - only_bc - abc
    union = oa + ob + oc + only_ab + only_bc + only_ac + abc; nei = U - union
    return Q(T(f"In a group of {U}, {a} study Maths (M), {b} Science (S) and {c} English (E). {ab} study M and S, {bc} study S and E, {ac} study M and E, and {abc} study all three. Find (i) the number who study only Maths (ii) the number who study none.",
               f"{U} பேரில் {a} கணிதம் (M), {b} விஞ்ஞானம் (S), {c} ஆங்கிலம் (E) கற்கின்றனர். {ab} பேர் M, S; {bc} பேர் S, E; {ac} பேர் M, E; {abc} பேர் மூன்றையும் கற்கின்றனர். (i) கணிதம் மட்டும் கற்போர் (ii) எதையும் கற்காதோர் எண்ணிக்கையைக் காண்க."),
             [S("Centre region (all three).", "நடுப் பிரதேசம் (மூன்றும்).", rf"n(M\cap S\cap E) = {abc}"),
              S("Exactly two subjects (subtract the centre).", "சரியாக இரு பாடங்கள் (நடுவைக் கழிக்க).", rf"MS: {ab}-{abc}={only_ab},\ SE: {bc}-{abc}={only_bc},\ ME: {ac}-{abc}={only_ac}"),
              S("Only Maths.", "கணிதம் மட்டும்.", rf"{a} - {only_ab} - {only_ac} - {abc} = {oa}"),
              S("Only S and only E similarly.", "S மட்டும், E மட்டும்.", rf"{ob},\ {oc}"),
              S("None = total − all regions.", "எதுவுமில்லை = மொத்தம் − எல்லாப் பிரதேசங்களும்.", rf"{U} - {union} = {nei}")],
             rf"(i)\ {oa}\quad(ii)\ {nei}", [T("Always fill a Venn diagram from the centre outward.", "வென் வரிப்படத்தை எப்போதும் நடுவிலிருந்து வெளிநோக்கி நிரப்புக.")], value=oa, formula="F-SET-UNION3", diagram="SET-VENN3-01",
             verify=lambda: union == a + b + c - ab - bc - ac + abc and nei >= 0 and min(oa, ob, oc) >= 0)


@tpl("G11C24", "A")
def sets_shading(r):
    reg = r.choice([("(A ∪ B)′", "outside both circles", "இரு வட்டங்களுக்கும் வெளியே"), ("A ∩ B′", "in A but not in B", "A இல் உள்ள B இல் இல்லாத பகுதி"), ("A′ ∩ B", "in B but not in A", "B இல் உள்ள A இல் இல்லாத பகுதி"), ("(A ∩ B)′", "everything except the overlap", "வெட்டுப் பகுதி தவிர மற்ற அனைத்தும்")])
    return Q(T(f"Describe the region {reg[0]} on a two-set Venn diagram.", f"இரு தொடை வென் வரிப்படத்தில் {reg[0]} பிரதேசத்தை விவரிக்க."),
             [S("Read the symbols: ′ = not, ∩ = and, ∪ = or.", "குறியீடுகள்: ′ = அல்லாத, ∩ = உம், ∪ = அல்லது.", reg[0].replace("∪", r"\cup").replace("∩", r"\cap")),
              S("Region:", "பிரதேசம்:", rf"\text{{{reg[1]}}}")],
             rf"\text{{{reg[1]}}}", [T("Work inside the brackets first.", "முதலில் அடைப்புக்குள்.")], kind="concept", formula="F-SET-UNION", diagram="SET-VENN2-01", verify=lambda: True)


# ---------------- G11C25 Probability (tree diagrams) ----------------
@tpl("G11C25", "F")
def indep_and(r):
    p1, p2 = r.choice([(Fr(1, 2), Fr(1, 6)), (Fr(2, 5), Fr(1, 2)), (Fr(3, 4), Fr(2, 3))])
    return Q(T(f"Events A and B are independent with P(A) = {fl(p1)} and P(B) = {fl(p2)}. Find P(A and B).", f"A, B சாராத நிகழ்ச்சிகள்; P(A) = {fl(p1)}, P(B) = {fl(p2)}. P(A உம் B உம்) ஐக் காண்க."),
             [S("Independent → multiply.", "சாராதவை → பெருக்குக.", rf"P(A\cap B) = {fl(p1)}\times{fl(p2)} = {fl(p1*p2)}")],
             fl(p1 * p2), [T("'And' along a branch means multiply.", "கிளை வழியே 'உம்' என்றால் பெருக்கல்.")], value=float(p1 * p2), formula="F-PRO-INDEP", verify=lambda: True,
             distractors=[(fl(p1 + p2), T("Added instead of multiplying.", "பெருக்குவதற்குப் பதிலாகக் கூட்டியது."))])


@tpl("G11C25", "G")
def tree_two_bags(r):
    r1, b1 = r.choice([(3, 2), (4, 1), (2, 3)]); r2, b2 = r.choice([(1, 3), (2, 2), (3, 1)])
    t1, t2 = r1 + b1, r2 + b2
    pRR = Fr(r1, t1) * Fr(r2, t2); pBB = Fr(b1, t1) * Fr(b2, t2); same = pRR + pBB
    return Q(T(f"Bag 1 has {r1} red and {b1} blue balls; Bag 2 has {r2} red and {b2} blue balls. One ball is taken from each bag. Using a tree diagram, find the probability that both balls are the same colour.",
               f"பை 1 இல் {r1} சிவப்பு, {b1} நீலம்; பை 2 இல் {r2} சிவப்பு, {b2} நீலம். ஒவ்வொரு பையிலிருந்தும் ஒரு பந்து எடுக்கப்படுகிறது. மர வரிப்படத்தைப் பயன்படுத்தி இரு பந்துகளும் ஒரே நிறமாக இருப்பதற்கான நிகழ்தகவைக் காண்க."),
             [S("First branches (Bag 1).", "முதல் கிளைகள் (பை 1).", rf"P(R_1)={fl(Fr(r1,t1))},\ P(B_1)={fl(Fr(b1,t1))}"),
              S("Second branches (Bag 2).", "இரண்டாம் கிளைகள் (பை 2).", rf"P(R_2)={fl(Fr(r2,t2))},\ P(B_2)={fl(Fr(b2,t2))}"),
              S("Both red: multiply along the branch.", "இரண்டும் சிவப்பு: கிளை வழியே பெருக்குக.", rf"{fl(Fr(r1,t1))}\times{fl(Fr(r2,t2))} = {fl(pRR)}"),
              S("Both blue.", "இரண்டும் நீலம்.", rf"{fl(Fr(b1,t1))}\times{fl(Fr(b2,t2))} = {fl(pBB)}"),
              S("Same colour: add the two outcomes.", "ஒரே நிறம்: இரு விளைவுகளையும் கூட்டுக.", rf"{fl(pRR)} + {fl(pBB)} = {fl(same)}")],
             fl(same), [T("Multiply along branches, add between outcomes.", "கிளை வழியே பெருக்கு; விளைவுகளுக்கிடையே கூட்டு.")], value=float(same), formula="F-PRO-TREE", diagram="PRO-TREE-01", verify=lambda: same == pRR + pBB)


@tpl("G11C25", "A")
def tree_without_replacement(r):
    rr, bb = r.choice([(5, 3), (4, 4), (6, 2)])
    t = rr + bb
    pRR = Fr(rr, t) * Fr(rr - 1, t - 1); pBB = Fr(bb, t) * Fr(bb - 1, t - 1); diff = 1 - pRR - pBB
    return Q(T(f"A box has {rr} red and {bb} blue pens. Two pens are taken one after the other WITHOUT replacement. Find the probability that the two pens are of different colours.", f"ஒரு பெட்டியில் {rr} சிவப்பு, {bb} நீலப் பேனைகள் உள்ளன. மீள வைக்காமல் ஒன்றன்பின் ஒன்றாக இரு பேனைகள் எடுக்கப்படுகின்றன. இரண்டும் வெவ்வேறு நிறமாக இருப்பதற்கான நிகழ்தகவைக் காண்க."),
             [S("Second draw has one fewer pen.", "இரண்டாம் எடுப்பில் ஒரு பேனை குறைவு.", rf"\text{{total}}: {t} \to {t-1}"),
              S("Red then blue.", "சிவப்பு பின் நீலம்.", rf"\frac{{{rr}}}{{{t}}}\times\frac{{{bb}}}{{{t-1}}} = {fl(Fr(rr,t)*Fr(bb,t-1))}"),
              S("Blue then red.", "நீலம் பின் சிவப்பு.", rf"\frac{{{bb}}}{{{t}}}\times\frac{{{rr}}}{{{t-1}}} = {fl(Fr(bb,t)*Fr(rr,t-1))}"),
              S("Add.", "கூட்டுக.", rf"{fl(Fr(rr,t)*Fr(bb,t-1))} + {fl(Fr(bb,t)*Fr(rr,t-1))} = {fl(diff)}")],
             fl(diff), [T("Without replacement: the second fraction changes.", "மீள வைக்காமல்: இரண்டாம் பின்னம் மாறும்.")], value=float(diff), formula="F-PRO-TREE", diagram="PRO-TREE-01",
             verify=lambda: diff == 2 * Fr(rr, t) * Fr(bb, t - 1), distractors=[(fl(2 * Fr(rr, t) * Fr(bb, t)), T("Treated it as WITH replacement.", "மீள வைத்தது போலக் கருதியது."))])
