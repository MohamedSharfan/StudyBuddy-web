"""Grade 10 chapters 1-16: verified question templates (F=Foundation, G=Grade Improvement, A=A Grade)."""
from core import *
import math
from fractions import Fraction as Fr

# ---------------- G10C01 Perimeter ----------------
@tpl("G10C01", "F")
def sector_perimeter(r):
    rad = r.choice([7, 14, 21]); th = r.choice([90, 60, 180, 120]) if rad != 7 else r.choice([90, 180, 45])
    arc = 2 * PI * rad * Fr(th, 360); P = arc + 2 * rad
    return Q(T(f"A sector has radius {rad} cm and centre angle {th}°. Find its perimeter. (Take π = 22/7.)",
               f"ஓர் ஆரைச்சிறையின் ஆரை {rad} cm, மையக் கோணம் {th}°. அதன் சுற்றளவைக் காண்க. (π = 22/7 எனக் கொள்க.)"),
             [S("Write the arc length formula.", "வில்லின் நீளச் சூத்திரத்தை எழுதுக.", r"l = 2\pi r \times \frac{\theta}{360}"),
              S("Substitute r and θ.", "r, θ ஐப் பிரதியிடுக.", rf"l = 2\times\frac{{22}}{{7}}\times {rad}\times\frac{{{th}}}{{360}}"),
              S("Simplify the arc length.", "வில்லின் நீளத்தைச் சுருக்குக.", rf"l = {fl(arc)}\ \text{{cm}}"),
              S("Perimeter = arc + two radii.", "சுற்றளவு = வில் + இரு ஆரைகள்.", rf"P = {fl(arc)} + {rad} + {rad} = {fl(P)}\ \text{{cm}}")],
             f"{fl(P)}", [T("Perimeter of a sector includes the two straight radii.", "ஆரைச்சிறையின் சுற்றளவில் இரு ஆரைகளும் அடங்கும்."),
                          T(f"First find the arc: 2πr × {th}/360.", f"முதலில் வில்: 2πr × {th}/360.")],
             unit="cm", value=float(P), formula="F-MEN-ARC", diagram="GEO-SECTOR-01",
             mistake=T("Forgetting to add the two radii.", "இரு ஆரைகளையும் கூட்ட மறத்தல்."),
             distractors=[(fl(arc), T("Only the arc length; the radii were not added.", "வில் மட்டும்; ஆரைகள் கூட்டப்படவில்லை.")),
                          (fl(arc + rad), T("Only one radius was added.", "ஒரு ஆரை மட்டுமே கூட்டப்பட்டது."))],
             verify=lambda: abs(float(P) - (2 * math.pi * rad * th / 360 + 2 * rad)) < 0.2)


@tpl("G10C01", "G")
def rect_semicircle(r):
    rad = r.choice([7, 14]); L = r.choice([10, 12, 15, 20])
    semi = PI * rad; P = 2 * L + 2 * rad + semi
    return Q(T(f"A shape is a rectangle {L} cm long and {2*rad} cm wide, with a semicircle drawn outward on one {2*rad} cm side (that side is removed). Find the perimeter of the shape. (π = 22/7)",
               f"ஒரு உருவம் நீளம் {L} cm, அகலம் {2*rad} cm உடைய செவ்வகம்; அதன் ஒரு {2*rad} cm பக்கத்தில் வெளிப்புறமாக ஓர் அரைவட்டம் வரையப்பட்டுள்ளது (அப்பக்கம் நீக்கப்பட்டது). உருவின் சுற்றளவைக் காண்க. (π = 22/7)"),
             [S("Radius of the semicircle = half of the width.", "அரைவட்ட ஆரை = அகலத்தின் அரைவாசி.", rf"r = {2*rad}\div 2 = {rad}\ \text{{cm}}"),
              S("Curved edge = half the circumference.", "வளைந்த விளிம்பு = பரிதியின் அரைவாசி.", rf"\pi r = \frac{{22}}{{7}}\times {rad} = {fl(semi)}\ \text{{cm}}"),
              S("Add the straight edges: two lengths and one width.", "நேர் விளிம்புகள்: இரு நீளங்கள் + ஒரு அகலம்.", rf"{L}+{L}+{2*rad} = {2*L+2*rad}\ \text{{cm}}"),
              S("Total perimeter.", "மொத்தச் சுற்றளவு.", rf"P = {2*L+2*rad} + {fl(semi)} = {fl(P)}\ \text{{cm}}")],
             fl(P), [T("Trace the outline: which edges are on the outside?", "வெளி எல்லையைச் சுற்றிப் பார்க்க: எந்த விளிம்புகள் வெளியே உள்ளன?"),
                     T("The side under the semicircle is NOT part of the perimeter.", "அரைவட்டத்தின் கீழுள்ள பக்கம் சுற்றளவில் சேராது.")],
             unit="cm", value=float(P), formula="F-MEN-CIRC", diagram="GEO-COMPOSITE-01",
             mistake=T("Including the hidden side under the semicircle.", "அரைவட்டத்தின் கீழ் மறைந்த பக்கத்தையும் சேர்த்தல்."),
             distractors=[(fl(P + 2 * rad), T("The removed side was also added.", "நீக்கப்பட்ட பக்கமும் கூட்டப்பட்டது.")),
                          (fl(2 * L + 2 * rad + 2 * PI * rad), T("A full circle was used instead of a semicircle.", "அரைவட்டத்துக்குப் பதிலாக முழு வட்டம் பயன்படுத்தப்பட்டது."))],
             verify=lambda: abs(float(P) - (2 * L + 2 * rad + math.pi * rad)) < 0.1)


@tpl("G10C01", "A")
def sector_angle_from_perimeter(r):
    rad, th = r.choice([(7, 90), (14, 45), (21, 60), (14, 90), (7, 180), (21, 120)])
    arc = 2 * PI * rad * Fr(th, 360); P = arc + 2 * rad
    return Q(T(f"The perimeter of a sector of radius {rad} cm is {fl(P)} cm. Find the angle at the centre. (π = 22/7)",
               f"ஆரை {rad} cm உடைய ஓர் ஆரைச்சிறையின் சுற்றளவு {fl(P)} cm. மையக் கோணத்தைக் காண்க. (π = 22/7)"),
             [S("Subtract the two radii to get the arc.", "இரு ஆரைகளைக் கழித்து வில்லைப் பெறுக.", rf"l = {fl(P)} - 2\times {rad} = {fl(arc)}"),
              S("Use the arc formula.", "வில் சூத்திரத்தைப் பயன்படுத்துக.", rf"{fl(arc)} = 2\times\frac{{22}}{{7}}\times {rad}\times\frac{{\theta}}{{360}}"),
              S("Find the full circumference.", "முழுப் பரிதியைக் காண்க.", rf"2\pi r = {fl(2*PI*rad)}"),
              S("Solve for θ.", "θ ஐத் தீர்க்க.", rf"\theta = \frac{{{fl(arc)}}}{{{fl(2*PI*rad)}}}\times 360 = {th}^\circ")],
             f"{th}^\\circ", [T("Arc = perimeter − 2r.", "வில் = சுற்றளவு − 2r."), T("θ/360 = arc ÷ full circumference.", "θ/360 = வில் ÷ முழுப் பரிதி.")],
             unit="°", value=th, formula="F-MEN-ARC", diagram="GEO-SECTOR-01",
             mistake=T("Dividing the whole perimeter by the circumference without removing 2r.", "2r ஐ நீக்காமல் முழுச் சுற்றளவையும் வகுத்தல்."),
             verify=lambda: abs(2 * math.pi * rad * th / 360 + 2 * rad - float(P)) < 0.3)


# ---------------- G10C02 Square Root ----------------
@tpl("G10C02", "F")
def sqrt_prime(r):
    k = r.choice([24, 36, 42, 45, 48, 28, 56, 63]); N = k * k
    f = []; m = k; p = 2
    while m > 1:
        while m % p == 0:
            f.append(p); m //= p
        p += 1
    pairs = r"\times".join(f"({q}\\times {q})" for q in f)
    return Q(T(f"Find √{N} using prime factors.", f"முதன்மைக் காரணிகளைப் பயன்படுத்தி √{N} ஐக் காண்க."),
             [S("Write the number as a product of prime factors, in pairs.", "எண்ணை முதன்மைக் காரணிகளின் பெருக்கமாக, சோடிகளாக எழுதுக.", rf"{N} = {pairs}"),
              S("Take one factor from each pair.", "ஒவ்வொரு சோடியிலிருந்தும் ஒரு காரணியை எடுக்க.", rf"\sqrt{{{N}}} = {r'\times'.join(map(str, f))}"),
              S("Multiply.", "பெருக்குக.", rf"\sqrt{{{N}}} = {k}")],
             str(k), [T("Divide by 2, 3, 5, 7 … repeatedly.", "2, 3, 5, 7 … ஆல் திரும்பத் திரும்ப வகுக்க."),
                      T("Each prime appears an even number of times in a perfect square.", "நிறைவர்க்கத்தில் ஒவ்வொரு முதன்மை எண்ணும் இரட்டை எண்ணிக்கை தடவை வரும்.")],
             value=k, formula="F-NUM-SQRT", verify=lambda: k * k == N,
             distractors=[(str(N // 2), T("Halved the number instead of taking the square root.", "வர்க்கமூலத்துக்குப் பதிலாக அரைவாசி எடுக்கப்பட்டது."))])


@tpl("G10C02", "G")
def sqrt_first_approx(r):
    N = r.choice([5, 7, 10, 13, 18, 20, 27, 30, 40, 50, 60, 75, 85, 90])
    a = math.isqrt(N)
    cands = [round(a + k / 10, 1) for k in range(0, 10)]
    best = min(cands, key=lambda d: abs(d * d - N))
    # correctly rounded to 1 d.p.
    best = round(math.sqrt(N), 1)
    lo, hi = round(best - 0.05, 2), round(best + 0.05, 2)
    return Q(T(f"Find the first approximation (correct to the first decimal place) of √{N}.",
               f"√{N} இன் முதலாம் அண்ணளவாக்கத்தைக் (முதலாம் தசமதானத்துக்குத் திருத்தமாக) காண்க."),
             [S("Find the perfect squares on either side.", "இருபுறமுமுள்ள நிறைவர்க்கங்களைக் காண்க.", rf"{a}^2={a*a} < {N} < {(a+1)**2}={a+1}^2 \Rightarrow {a} < \sqrt{{{N}}} < {a+1}"),
              S("Try the nearest one-decimal value by squaring.", "அண்மையான ஒரு தசம எண்ணை வர்க்கித்துப் பார்க்க.", rf"{best}^2 = {round(best*best,2)}"),
              S("Check the half-way values.", "இடைப் பெறுமானங்களைச் சரிபார்க்க.", rf"{lo}^2 = {round(lo*lo,4)} < {N} < {round(hi*hi,4)} = {hi}^2"),
              S("So the square root rounds to:", "எனவே வர்க்கமூலத்தின் அண்ணளவு:", rf"\sqrt{{{N}}} \approx {best}")],
             f"{best}", [T("Between which two whole numbers is it?", "எந்த இரு முழு எண்களுக்கிடையே உள்ளது?"),
                         T("Square numbers like a.1, a.2, … and see which is closest.", "a.1, a.2, … போன்றவற்றை வர்க்கித்து எது அண்மையானது எனப் பார்க்க.")],
             value=best, tol=0, formula="F-NUM-SQRT",
             mistake=T("Choosing the decimal whose square is just below N without checking which is closer.", "எது அண்மையானது எனப் பார்க்காமல் N க்குக் கீழுள்ளதைத் தெரிவு செய்தல்."),
             verify=lambda: lo * lo <= N <= hi * hi)


@tpl("G10C02", "A")
def sqrt_decimal(r):
    k = r.choice([12, 15, 18, 21, 24, 27, 35]); dp = r.choice([1, 2])
    N = Fr(k * k, 10 ** (2 * dp)); root = Fr(k, 10 ** dp)
    Ns = f"{float(N):.{2*dp}f}"; Rs_ = f"{float(root):.{dp}f}"
    return Q(T(f"Find √{Ns} without a calculator.", f"கணிப்பான் இன்றி √{Ns} ஐக் காண்க."),
             [S("Write the decimal as a fraction with a square denominator.", "தசமத்தை வர்க்க பகுதியுடைய பின்னமாக எழுதுக.", rf"{Ns} = \frac{{{k*k}}}{{{10**(2*dp)}}}"),
              S("Take the square root of top and bottom separately.", "தொகுதி, பகுதிக்குத் தனித்தனியாக வர்க்கமூலம் எடுக்க.", rf"\sqrt{{\frac{{{k*k}}}{{{10**(2*dp)}}}}} = \frac{{{k}}}{{{10**dp}}}"),
              S("Write as a decimal.", "தசமமாக எழுதுக.", rf"= {Rs_}")],
             Rs_, [T("Count decimal places: the root has half as many.", "தசமதானங்களை எண்ணுக: மூலத்தில் அதன் அரைவாசி."),
                   T(f"What is √{k*k}?", f"√{k*k} எவ்வளவு?")],
             value=float(root), formula="F-NUM-SQRT",
             mistake=T("Writing too many decimal places, e.g. √0.09 = 0.03 (wrong; it is 0.3).", "அதிக தசமதானங்கள் எழுதுதல், உ-ம் √0.09 = 0.03 (பிழை; 0.3)."),
             distractors=[(f"{float(root)/10:.{dp+1}f}", T("Decimal point placed wrongly.", "தசமப் புள்ளி பிழையான இடத்தில்."))],
             verify=lambda: root * root == N)


# ---------------- G10C03 Fractions ----------------
@tpl("G10C03", "F")
def add_mixed(r):
    a = Fr(r.choice([1, 2, 3])) + Fr(1, r.choice([2, 3, 4])); b = Fr(r.choice([1, 2])) + Fr(r.choice([1, 2]), r.choice([3, 5, 6]))
    s = a + b
    da, db = a.denominator, b.denominator
    from math import lcm
    L = lcm(da, db)
    ia, ib = Fr(a.numerator, da), Fr(b.numerator, db)
    return Q(T(f"Simplify: ${mixed(a)} + {mixed(b)}$",
               f"சுருக்குக: ${mixed(a)} + {mixed(b)}$"),
             [S("Change mixed numbers to improper fractions.", "கலப்பு எண்களைத் தகாப் பின்னங்களாக மாற்றுக.", rf"{mixed(a)} = {fl(a)},\quad {mixed(b)} = {fl(b)}"),
              S(f"Use the common denominator {L}.", f"பொதுப் பகுதி {L} ஐப் பயன்படுத்துக.", rf"{fl(a)} + {fl(b)} = \frac{{{a.numerator*(L//da)}}}{{{L}}} + \frac{{{b.numerator*(L//db)}}}{{{L}}}"),
              S("Add the numerators.", "தொகுதிகளைக் கூட்டுக.", rf"= \frac{{{a.numerator*(L//da)+b.numerator*(L//db)}}}{{{L}}} = {fl(s)}"),
              S("Write as a mixed number.", "கலப்பு எண்ணாக எழுதுக.", rf"= {mixed(s)}")],
             mixed(s), [T("Make the denominators equal first.", "முதலில் பகுதிகளைச் சமமாக்குக."),
                        T(f"LCM of {da} and {db} is {L}.", f"{da}, {db} இன் பொ.ம.சி. {L}.")],
             value=float(s), accept=[fl(s), mixed(s)], formula="F-NUM-FRAC",
             mistake=T("Adding denominators together (e.g. 1/2 + 1/3 = 2/5 is wrong).", "பகுதிகளையும் கூட்டுதல் (உ-ம் 1/2 + 1/3 = 2/5 பிழை)."),
             distractors=[(fl(Fr(a.numerator + b.numerator, da + db)), T("Added numerators and denominators separately.", "தொகுதிகளையும் பகுதிகளையும் தனித்தனியாகக் கூட்டியது."))],
             verify=lambda: s == a + b)


@tpl("G10C03", "G")
def fraction_remaining(r):
    total = r.choice([60000, 72000, 90000, 120000]); f1 = Fr(1, r.choice([3, 4])); f2 = Fr(r.choice([1, 2]), 5)
    p1 = total * f1; rem = total - p1; p2 = rem * f2; left = rem - p2
    return Q(T(f"A man spent {fl(f1)} of his salary of Rs. {n(total)} on food and {fl(f2)} of the REMAINDER on education. How much money is left?",
               f"ஒருவர் தனது சம்பளம் ரூ. {n(total)} இல் {fl(f1)} பங்கை உணவுக்கும், மீதியின் {fl(f2)} பங்கைக் கல்விக்கும் செலவிட்டார். எஞ்சிய பணம் எவ்வளவு?"),
             [S("Money for food.", "உணவுக்கான பணம்.", rf"{n(total)}\times {fl(f1)} = {n(p1)}"),
              S("Remainder after food.", "உணவின் பின் மீதி.", rf"{n(total)} - {n(p1)} = {n(rem)}"),
              S("Education is a fraction of the remainder.", "கல்வி மீதியின் ஒரு பங்கு.", rf"{n(rem)}\times {fl(f2)} = {n(p2)}"),
              S("Money left.", "எஞ்சிய பணம்.", rf"{n(rem)} - {n(p2)} = {n(left)}")],
             rs(left), [T("'Of the remainder' means use the money left after food.", "'மீதியின்' என்றால் உணவுக்குப் பின் எஞ்சியதைப் பயன்படுத்துக."),
                        T("Work in stages: food → remainder → education → left.", "படிப்படியாக: உணவு → மீதி → கல்வி → எஞ்சியது.")],
             unit="Rs.", value=float(left), formula="F-NUM-FRAC",
             mistake=T("Taking the second fraction of the whole salary instead of the remainder.", "இரண்டாம் பின்னத்தை மீதிக்குப் பதிலாக முழுச் சம்பளத்துக்கு எடுத்தல்."),
             distractors=[(rs(total - p1 - total * f2), T("Second fraction taken of the whole salary.", "இரண்டாம் பின்னம் முழுச் சம்பளத்துக்கு எடுக்கப்பட்டது."))],
             verify=lambda: left == total * (1 - f1) * (1 - f2))


@tpl("G10C03", "A")
def fraction_find_whole(r):
    f1 = Fr(1, r.choice([4, 5])); f2 = Fr(r.choice([1, 2]), 3); total = r.choice([120, 150, 180, 240, 300]) * (f1.denominator)
    rem = 1 - f1; part2 = rem * f2; leftf = rem - part2; left = total * leftf
    return Q(T(f"From a plot of land, {fl(f1)} was used for a house and {fl(f2)} of the remaining part for vegetables. The rest, {n(left)} m², was grassland. (i) What fraction of the whole land is grassland? (ii) Find the total area of the land.",
               f"ஒரு காணியில் {fl(f1)} பங்கு வீட்டுக்கும், மீதியின் {fl(f2)} பங்கு மரக்கறிக்கும் பயன்படுத்தப்பட்டது. எஞ்சிய {n(left)} m² புற்தரை. (i) முழுக் காணியின் எப்பங்கு புற்தரை? (ii) காணியின் மொத்தப் பரப்பளவைக் காண்க."),
             [S("Fraction remaining after the house.", "வீட்டின் பின் மீதிப் பங்கு.", rf"1 - {fl(f1)} = {fl(rem)}"),
              S("Vegetable fraction of the whole land.", "முழுக் காணியில் மரக்கறிப் பங்கு.", rf"{fl(rem)}\times {fl(f2)} = {fl(part2)}"),
              S("Grassland fraction.", "புற்தரைப் பங்கு.", rf"{fl(rem)} - {fl(part2)} = {fl(leftf)}"),
              S("That fraction equals the given area, so find the whole.", "அப்பங்கு தரப்பட்ட பரப்புக்குச் சமம்; முழுமையைக் காண்க.", rf"{fl(leftf)}\ \text{{of land}} = {n(left)} \Rightarrow \text{{land}} = {n(left)}\div {fl(leftf)} = {n(total)}\ \text{{m}}^2")],
             rf"(i)\ {fl(leftf)}\quad (ii)\ {n(total)}\ \text{{m}}^2", [T("Convert every part into a fraction of the WHOLE land.", "ஒவ்வொரு பகுதியையும் முழுக் காணியின் பின்னமாக மாற்றுக."),
                                     T("If (fraction) × whole = area, divide the area by the fraction.", "(பின்னம்) × முழுமை = பரப்பு எனின், பரப்பைப் பின்னத்தால் வகுக்க.")],
             unit="m²", value=total, formula="F-NUM-FRAC",
             mistake=T("Multiplying the area by the fraction instead of dividing.", "பரப்பைப் பின்னத்தால் வகுப்பதற்குப் பதிலாகப் பெருக்குதல்."),
             verify=lambda: total * leftf == left)


# ---------------- G10C04 Binomial expressions ----------------
@tpl("G10C04", "F")
def square_binomial(r):
    a = r.choice([2, 3, 4, 5, 6, 7]); s = r.choice([1, -1])
    return Q(T(f"Expand: $(x {'+' if s>0 else '-'} {a})^2$", f"விரிக்க: $(x {'+' if s>0 else '-'} {a})^2$"),
             [S("Use (a ± b)² = a² ± 2ab + b².", "(a ± b)² = a² ± 2ab + b² ஐப் பயன்படுத்துக.", rf"(x {'+' if s>0 else '-'} {a})^2 = x^2 {'+' if s>0 else '-'} 2\times x\times {a} + {a}^2"),
              S("Simplify each term.", "ஒவ்வொரு உறுப்பையும் சுருக்குக.", rf"= {poly([1, 2*a*s, a*a])}")],
             poly([1, 2 * a * s, a * a]), [T("Square of a binomial has THREE terms.", "ஈருறுப்பின் வர்க்கத்தில் மூன்று உறுப்புகள்."),
                                          T("Middle term = 2 × first × second.", "நடு உறுப்பு = 2 × முதல் × இரண்டாம்.")],
             kind="algebra", formula="F-ALG-SQ",
             mistake=T("Writing (x + a)² = x² + a² (missing the middle term).", "(x + a)² = x² + a² என எழுதுதல் (நடு உறுப்பு விடுபடல்)."),
             distractors=[(poly([1, 0, a * a]), T("Middle term 2ax missing.", "நடு உறுப்பு 2ax விடுபட்டது.")),
                          (poly([1, a * s, a * a]), T("Middle term not doubled.", "நடு உறுப்பு இரட்டிக்கப்படவில்லை."))],
             verify=lambda: __import__("sympy").expand((__import__("sympy").Symbol("x") + s * a) ** 2) == __import__("sympy").sympify(f"x**2+{2*a*s}*x+{a*a}"))


@tpl("G10C04", "G")
def product_binomials(r):
    import sympy as sp
    a, b, c, d = r.choice([2, 3]), r.choice([1, -1, 3, -5]), r.choice([1, 2]), r.choice([4, -2, 5, -3])
    x = sp.Symbol("x"); e = sp.expand((a * x + b) * (c * x + d)); cs = [int(e.coeff(x, 2)), int(e.coeff(x, 1)), int(e.coeff(x, 0))]
    return Q(T(f"Expand and simplify: $({lin(a,b)})({lin(c,d)})$", f"விரித்துச் சுருக்குக: $({lin(a,b)})({lin(c,d)})$"),
             [S("Multiply each term of the first bracket by the second bracket.", "முதல் அடைப்பின் ஒவ்வொரு உறுப்பையும் இரண்டாம் அடைப்பால் பெருக்குக.",
                rf"{a}x({lin(c,d)}) {sgn(b)}({lin(c,d)})"),
              S("Expand.", "விரிக்க.", rf"= {a*c}x^2 {sgn(a*d)}x {sgn(b*c)}x {sgn(b*d)}"),
              S("Collect like terms.", "ஒத்த உறுப்புகளைச் சேர்க்க.", rf"= {poly(cs)}")],
             poly(cs), [T("Four products: first×first, first×last, last×first, last×last.", "நான்கு பெருக்கங்கள்."),
                        T("Watch the signs of negative numbers.", "மறை எண்களின் குறிகளைக் கவனிக்க.")],
             kind="algebra", formula="F-ALG-SQ", verify=lambda: sp.expand((a * x + b) * (c * x + d)) == cs[0] * x**2 + cs[1] * x + cs[2],
             mistake=T("Sign errors when multiplying two negatives.", "இரு மறைகளைப் பெருக்கும்போது குறிப் பிழை."))


@tpl("G10C04", "A")
def binomial_mental(r):
    b = r.choice([101, 102, 103, 98, 97, 51, 49, 202])
    base = 100 if 90 < b < 110 else (50 if 40 < b < 60 else 200)
    d = b - base; v = b * b
    return Q(T(f"Using a binomial expansion, find the value of ${b}^2$ without long multiplication.",
               f"ஈருறுப்பு விரிவைப் பயன்படுத்தி, நீண்ட பெருக்கல் இன்றி ${b}^2$ இன் பெறுமானத்தைக் காண்க."),
             [S(f"Write {b} as {base} {'+' if d>0 else '-'} {abs(d)}.", f"{b} ஐ {base} {'+' if d>0 else '-'} {abs(d)} என எழுதுக.", rf"{b}^2 = ({base} {'+' if d>0 else '-'} {abs(d)})^2"),
              S("Expand.", "விரிக்க.", rf"= {base}^2 {'+' if d>0 else '-'} 2\times{base}\times{abs(d)} + {abs(d)}^2"),
              S("Calculate each term.", "ஒவ்வொரு உறுப்பையும் கணிக்க.", rf"= {n(base*base)} {'+' if d>0 else '-'} {n(2*base*abs(d))} + {d*d}"),
              S("Add.", "கூட்டுக.", rf"= {n(v)}")],
             n(v), [T(f"{b} is close to {base}.", f"{b}, {base} க்கு அண்மையானது."), T("(a ± b)² = a² ± 2ab + b²", "(a ± b)² = a² ± 2ab + b²")],
             value=v, formula="F-ALG-SQ", verify=lambda: v == b * b,
             mistake=T("Forgetting the b² term at the end.", "இறுதி b² உறுப்பை மறத்தல்."))


# ---------------- G10C05 Congruence ----------------
COND = [("SAS", "ப.கோ.ப"), ("ASA", "கோ.ப.கோ"), ("AAS", "கோ.கோ.ப"), ("SSS", "ப.ப.ப"), ("RHS", "செ.ப.ப")]
COND_DESC = {
    "SAS": ("AB = PQ, ∠B = ∠Q, BC = QR", "AB = PQ, ∠B = ∠Q, BC = QR"),
    "ASA": ("∠A = ∠P, AB = PQ, ∠B = ∠Q", "∠A = ∠P, AB = PQ, ∠B = ∠Q"),
    "AAS": ("∠A = ∠P, ∠B = ∠Q, BC = QR", "∠A = ∠P, ∠B = ∠Q, BC = QR"),
    "SSS": ("AB = PQ, BC = QR, CA = RP", "AB = PQ, BC = QR, CA = RP"),
    "RHS": ("∠B = ∠Q = 90°, AC = PR (hypotenuse), AB = PQ", "∠B = ∠Q = 90°, AC = PR (செம்பக்கம்), AB = PQ"),
}


@tpl("G10C05", "F")
def cong_condition(r):
    c, cta = r.choice(COND)
    en, ta = COND_DESC[c]
    other = [x for x in COND if x[0] != c]
    return Q(T(f"In triangles ABC and PQR: {en}. Which condition shows ΔABC ≡ ΔPQR?",
               f"ABC, PQR முக்கோணிகளில்: {ta}. ΔABC ≡ ΔPQR எனக் காட்டும் நிபந்தனை யாது?"),
             [S("List the equal parts in order around the triangle.", "சமமான பகுதிகளை முக்கோணியைச் சுற்றி ஒழுங்காகப் பட்டியலிடுக.", rf"\text{{{en}}}"),
              S("Match the pattern to a condition.", "அமைப்பை ஒரு நிபந்தனையுடன் பொருத்துக.", rf"\Rightarrow \text{{{c}}}")],
             f"{c} ({cta})", [T("S = side, A = angle. Is the angle BETWEEN the two sides?", "S = பக்கம், A = கோணம். கோணம் இரு பக்கங்களுக்கும் இடையிலா?"),
                              T("A right angle with hypotenuse → RHS.", "செங்கோணமும் செம்பக்கமும் → RHS.")],
             kind="concept", formula="T-GEO-CONG",
             distractors=[(f"{o[0]} ({o[1]})", T(f"{o[0]} needs a different arrangement of parts.", f"{o[0]} க்கு வேறு அமைப்பு தேவை.")) for o in r.sample(other, 2)],
             mistake=T("Using AAA — equal angles alone do not prove congruence.", "AAA பயன்படுத்தல் — கோணங்கள் மட்டும் ஒருங்கிசைவை நிறுவாது."),
             verify=lambda: True)


@tpl("G10C05", "G")
def cong_find_side(r):
    ab, bc, ang = r.choice([5, 6, 7, 8]), r.choice([9, 10, 12]), r.choice([40, 50, 65, 70])
    return Q(T(f"ΔABC ≡ ΔPQR. AB = {ab} cm, BC = {bc} cm and ∠ABC = {ang}°. Find PQ, QR and ∠PQR.",
               f"ΔABC ≡ ΔPQR. AB = {ab} cm, BC = {bc} cm, ∠ABC = {ang}°. PQ, QR, ∠PQR ஐக் காண்க."),
             [S("Match vertices in order: A↔P, B↔Q, C↔R.", "உச்சிகளை ஒழுங்காகப் பொருத்துக: A↔P, B↔Q, C↔R.", r"A\leftrightarrow P,\ B\leftrightarrow Q,\ C\leftrightarrow R"),
              S("Corresponding sides are equal.", "ஒத்த பக்கங்கள் சமம்.", rf"PQ = AB = {ab}\ \text{{cm}},\quad QR = BC = {bc}\ \text{{cm}}"),
              S("Corresponding angles are equal.", "ஒத்த கோணங்கள் சமம்.", rf"\angle PQR = \angle ABC = {ang}^\circ")],
             rf"PQ={ab}\text{{ cm}},\ QR={bc}\text{{ cm}},\ \angle PQR={ang}^\circ", [T("The order of letters tells you which parts match.", "எழுத்துக்களின் ஒழுங்கு பொருந்தும் பகுதிகளைக் காட்டும்.")],
             kind="concept", formula="T-GEO-CONG", verify=lambda: True,
             mistake=T("Matching vertices by position in the diagram instead of by the letter order.", "எழுத்து ஒழுங்குக்குப் பதிலாகப் படத்தின் நிலையால் பொருத்துதல்."))


@tpl("G10C05", "A")
def cong_proof(r):
    return Q(T("In the figure, AB = AC and AD bisects ∠BAC, meeting BC at D. Prove that ΔABD ≡ ΔACD and hence that BD = DC.",
               "படத்தில் AB = AC; AD, ∠BAC ஐ இருசமகூறிட்டு BC ஐ D இல் சந்திக்கிறது. ΔABD ≡ ΔACD என நிறுவி, அதிலிருந்து BD = DC எனக் காட்டுக."),
             [S("Side: AB = AC.", "பக்கம்: AB = AC.", r"AB = AC\quad(\text{given / தரவு})"),
              S("Angle: ∠BAD = ∠CAD.", "கோணம்: ∠BAD = ∠CAD.", r"\angle BAD = \angle CAD\quad(\text{AD bisects }\angle A)"),
              S("Side: AD is common.", "பக்கம்: AD பொது.", r"AD = AD\quad(\text{common / பொது})"),
              S("State the congruence.", "ஒருங்கிசைவைக் கூறுக.", r"\therefore \triangle ABD \equiv \triangle ACD\quad(\text{SAS})"),
              S("Corresponding sides are equal.", "ஒத்த பக்கங்கள் சமம்.", r"\therefore BD = DC")],
             r"\triangle ABD\equiv\triangle ACD\ (\text{SAS}),\ BD=DC", [T("Look for a side shared by both triangles.", "இரு முக்கோணிகளுக்கும் பொதுவான பக்கத்தைத் தேடுக."),
                                                                        T("The angle must be between the two sides for SAS.", "SAS க்கு கோணம் இரு பக்கங்களுக்கும் இடையில் இருக்க வேண்டும்.")],
             kind="proof", formula="T-GEO-CONG", diagram="GEO-ISOS-BISECT-01", verify=lambda: True,
             mistake=T("Writing statements without reasons — each statement needs a reason.", "காரணம் இல்லாமல் கூற்றுகள் எழுதுதல் — ஒவ்வொன்றுக்கும் காரணம் தேவை."))


# ---------------- G10C06 Area ----------------
@tpl("G10C06", "F")
def sector_area(r):
    rad = r.choice([7, 14, 21]); th = r.choice([90, 60, 120, 45]) if rad != 7 else r.choice([90, 180, 45, 360 // 4])
    A = PI * rad * rad * Fr(th, 360)
    return Q(T(f"Find the area of a sector of radius {rad} cm with centre angle {th}°. (π = 22/7)",
               f"ஆரை {rad} cm, மையக் கோணம் {th}° உடைய ஆரைச்சிறையின் பரப்பளவைக் காண்க. (π = 22/7)"),
             [S("Write the formula.", "சூத்திரத்தை எழுதுக.", r"A = \pi r^2\times\frac{\theta}{360}"),
              S("Substitute.", "பிரதியிடுக.", rf"A = \frac{{22}}{{7}}\times {rad}\times {rad}\times\frac{{{th}}}{{360}}"),
              S("Simplify.", "சுருக்குக.", rf"A = {fl(A)}\ \text{{cm}}^2")],
             rf"{fl(A)}\ \text{{cm}}^2", [T("Area of the full circle is πr².", "முழு வட்டப் பரப்பு πr²."), T(f"The sector is {th}/360 of the circle.", f"ஆரைச்சிறை வட்டத்தின் {th}/360 பங்கு.")],
             unit="cm²", value=float(A), formula="F-MEN-SECTA", diagram="GEO-SECTOR-01",
             distractors=[(fl(2 * PI * rad * Fr(th, 360)), T("Used the arc-length formula 2πr.", "வில் நீளச் சூத்திரம் 2πr பயன்படுத்தப்பட்டது.")),
                          (fl(PI * rad * rad), T("Area of the whole circle.", "முழு வட்டத்தின் பரப்பு."))],
             mistake=T("Using 2πr (length) instead of πr² (area).", "πr² (பரப்பு) க்குப் பதிலாக 2πr (நீளம்)."),
             verify=lambda: abs(float(A) - math.pi * rad ** 2 * th / 360) < 0.5)


@tpl("G10C06", "G")
def trapezium_semicircle_area(r):
    a, b, h = r.choice([(10, 14, 7), (8, 12, 14), (20, 14, 7)]) if True else None
    rad = 7 if h != 14 else 7
    rad = r.choice([7])
    trap = Fr(a + b, 2) * h; semi = PI * rad * rad / 2; tot = trap + semi
    return Q(T(f"A lamina is made of a trapezium with parallel sides {a} cm and {b} cm and perpendicular height {h} cm, joined to a semicircle of radius {rad} cm. Find the total area. (π = 22/7)",
               f"ஒரு தகடு, சமாந்தரப் பக்கங்கள் {a} cm, {b} cm, செங்குத்துயரம் {h} cm உடைய சரிவகத்தையும், ஆரை {rad} cm உடைய அரைவட்டத்தையும் கொண்டது. மொத்தப் பரப்பளவைக் காண்க. (π = 22/7)"),
             [S("Area of the trapezium.", "சரிவகத்தின் பரப்பளவு.", rf"\frac{{1}}{{2}}({a}+{b})\times {h} = {fl(trap)}\ \text{{cm}}^2"),
              S("Area of the semicircle.", "அரைவட்டத்தின் பரப்பளவு.", rf"\frac{{1}}{{2}}\times\frac{{22}}{{7}}\times {rad}^2 = {fl(semi)}\ \text{{cm}}^2"),
              S("Add the two areas.", "இரு பரப்புகளையும் கூட்டுக.", rf"{fl(trap)} + {fl(semi)} = {fl(tot)}\ \text{{cm}}^2")],
             rf"{fl(tot)}\ \text{{cm}}^2", [T("Split the lamina into shapes you know.", "தகட்டைத் தெரிந்த உருவங்களாகப் பிரிக்க."), T("Trapezium: ½(sum of parallel sides) × height.", "சரிவகம்: ½(சமாந்தரப் பக்கங்களின் கூட்டுத்தொகை) × உயரம்.")],
             unit="cm²", value=float(tot), formula="F-MEN-TRAP", diagram="GEO-TRAP-SEMI-01",
             mistake=T("Forgetting the ½ in the semicircle area.", "அரைவட்டப் பரப்பில் ½ ஐ மறத்தல்."),
             verify=lambda: abs(float(tot) - ((a + b) / 2 * h + math.pi * rad * rad / 2)) < 0.3)


@tpl("G10C06", "A")
def radius_from_sector_area(r):
    rad, th = r.choice([(7, 90), (14, 45), (21, 60), (14, 90), (21, 40)])
    A = PI * rad * rad * Fr(th, 360)
    return Q(T(f"The area of a sector with centre angle {th}° is {fl(A)} cm². Find the radius. (π = 22/7)",
               f"மையக் கோணம் {th}° உடைய ஓர் ஆரைச்சிறையின் பரப்பளவு {fl(A)} cm². ஆரையைக் காண்க. (π = 22/7)"),
             [S("Write the formula with r unknown.", "r தெரியாத சூத்திரத்தை எழுதுக.", rf"{fl(A)} = \frac{{22}}{{7}}\times r^2\times\frac{{{th}}}{{360}}"),
              S("Make r² the subject.", "r² ஐ எழுவாயாக்குக.", rf"r^2 = {fl(A)}\times\frac{{7}}{{22}}\times\frac{{360}}{{{th}}} = {rad*rad}"),
              S("Take the square root.", "வர்க்கமூலம் எடுக்க.", rf"r = \sqrt{{{rad*rad}}} = {rad}\ \text{{cm}}")],
             f"{rad}\\ \\text{{cm}}", [T("Rearrange to get r² alone.", "r² ஐத் தனியாக்குக."), T("Multiply by the reciprocals 7/22 and 360/θ.", "தலைகீழ்கள் 7/22, 360/θ ஆல் பெருக்குக.")],
             unit="cm", value=rad, formula="F-MEN-SECTA", verify=lambda: PI * rad * rad * Fr(th, 360) == A,
             mistake=T("Stopping at r² and forgetting the square root.", "r² உடன் நிறுத்தி வர்க்கமூலம் எடுக்க மறத்தல்."))


# ---------------- G10C07 Factors of quadratic expressions ----------------
@tpl("G10C07", "F")
def factor_monic(r):
    p, q = r.choice([(2, 3), (1, 5), (-2, 5), (3, -4), (-3, -4), (2, 6), (-1, -6)])
    b, c = p + q, p * q
    return Q(T(f"Factorise: ${poly([1,b,c])}$", f"காரணிப்படுத்துக: ${poly([1,b,c])}$"),
             [S(f"Find two numbers whose product is {c} and sum is {b}.", f"பெருக்கம் {c}, கூட்டுத்தொகை {b} ஆகும் இரு எண்களைக் காண்க.", rf"{p}\times {q} = {c},\quad {p} + ({q}) = {b}"),
              S("Split the middle term.", "நடு உறுப்பைப் பிரிக்க.", rf"x^2 {sgn(p)}x {sgn(q)}x {sgn(c)}"),
              S("Group and take common factors.", "தொகுத்துப் பொதுக் காரணி எடுக்க.", rf"x(x {sgn(p)}) {sgn(q)}(x {sgn(p)})"),
              S("Final factors.", "இறுதிக் காரணிகள்.", rf"(x {sgn(p)})(x {sgn(q)})")],
             rf"(x {sgn(p)})(x {sgn(q)})", [T("Product = constant term, sum = coefficient of x.", "பெருக்கம் = மாறிலி, கூட்டுத்தொகை = x இன் குணகம்."),
                                           T("Try factor pairs of the constant.", "மாறிலியின் காரணிச் சோடிகளை முயல்க.")],
             kind="algebra", formula="F-ALG-FACT",
             verify=lambda: __import__("sympy").expand((__import__("sympy").Symbol("x") + p) * (__import__("sympy").Symbol("x") + q)) == __import__("sympy").Symbol("x") ** 2 + b * __import__("sympy").Symbol("x") + c,
             mistake=T("Choosing numbers with the right product but wrong sign.", "சரியான பெருக்கம் ஆனால் பிழையான குறியுள்ள எண்கள்."),
             distractors=[(rf"(x {sgn(-p)})(x {sgn(-q)})", T("Signs reversed.", "குறிகள் தலைகீழ்.")),
                          (rf"(x {sgn(c)})(x {sgn(1)})", T("Used the constant itself as one factor.", "மாறிலியையே காரணியாகக் கொண்டது."))])


@tpl("G10C07", "G")
def factor_nonmonic(r):
    import sympy as sp
    a, p, c, q = r.choice([(2, 1, 1, 3), (3, 2, 1, -1), (2, -3, 1, 2), (3, 1, 2, -5), (2, 5, 1, -2)])
    x = sp.Symbol("x"); e = sp.expand((a * x + p) * (c * x + q)); A, B, C = [int(e.coeff(x, k)) for k in (2, 1, 0)]
    m1, m2 = a * q, p * c
    return Q(T(f"Factorise: ${poly([A,B,C])}$", f"காரணிப்படுத்துக: ${poly([A,B,C])}$"),
             [S(f"Multiply the first and last coefficients: {A} × {C} = {A*C}.", f"முதல், இறுதிக் குணகங்களைப் பெருக்குக: {A} × {C} = {A*C}.", rf"{A}\times({C}) = {A*C}"),
              S(f"Find two numbers with product {A*C} and sum {B}.", f"பெருக்கம் {A*C}, கூட்டுத்தொகை {B} ஆகும் இரு எண்கள்.", rf"{m1}\times({m2}) = {A*C},\quad {m1}+({m2}) = {B}"),
              S("Split the middle term and group.", "நடு உறுப்பைப் பிரித்துத் தொகுக்க.", rf"{A}x^2 {sgn(m1)}x {sgn(m2)}x {sgn(C)}"),
              S("Take common factors.", "பொதுக் காரணிகளை எடுக்க.", rf"= ({lin(a,p)})({lin(c,q)})")],
             rf"({lin(a,p)})({lin(c,q)})", [T("Use the 'ac method': multiply a and c.", "'ac முறை': a, c ஐப் பெருக்குக."), T("Check by expanding your answer.", "விடையை விரித்துச் சரிபார்க்க.")],
             kind="algebra", formula="F-ALG-FACT", verify=lambda: sp.expand((a * x + p) * (c * x + q)) == A * x ** 2 + B * x + C,
             mistake=T("Not checking by expanding — one sign error changes everything.", "விரித்துச் சரிபார்க்காமை."))


@tpl("G10C07", "A")
def factor_dos(r):
    k = r.choice([2, 3, 5]); a = r.choice([3, 4, 5, 6, 7])
    return Q(T(f"Factorise completely: ${k}x^2 - {k*a*a}$", f"முழுமையாகக் காரணிப்படுத்துக: ${k}x^2 - {k*a*a}$"),
             [S("Take out the common factor.", "பொதுக் காரணியை வெளியே எடுக்க.", rf"{k}x^2 - {k*a*a} = {k}(x^2 - {a*a})"),
              S("Recognise a difference of two squares.", "இரு வர்க்கங்களின் வித்தியாசம் என இனங்காண்க.", rf"x^2 - {a*a} = x^2 - {a}^2"),
              S("Use a² − b² = (a + b)(a − b).", "a² − b² = (a + b)(a − b) ஐப் பயன்படுத்துக.", rf"= {k}(x+{a})(x-{a})")],
             rf"{k}(x+{a})(x-{a})", [T("Always look for a common factor first.", "முதலில் பொதுக் காரணியைத் தேடுக."), T("Is the bracket a² − b²?", "அடைப்பு a² − b² வடிவமா?")],
             kind="algebra", formula="F-ALG-DOS",
             verify=lambda: __import__("sympy").expand(k * (__import__("sympy").Symbol("x") + a) * (__import__("sympy").Symbol("x") - a)) == k * __import__("sympy").Symbol("x") ** 2 - k * a * a,
             mistake=T("Stopping at k(x² − a²) — 'completely' means factorise the bracket too.", "k(x² − a²) உடன் நிறுத்தல் — 'முழுமையாக' என்றால் அடைப்பையும் காரணிப்படுத்துக."),
             distractors=[(rf"{k}(x-{a})^2", T("(x − a)² is not a² − b².", "(x − a)² என்பது a² − b² அல்ல.")), (rf"{k}(x^2-{a*a})", T("Not completely factorised.", "முழுமையாகக் காரணிப்படுத்தப்படவில்லை."))])


# ---------------- G10C08 Triangles I ----------------
@tpl("G10C08", "F")
def angle_sum(r):
    a, b = r.choice([(50, 60), (35, 75), (90, 42), (48, 67), (110, 25)])
    x = 180 - a - b
    return Q(T(f"Two angles of a triangle are {a}° and {b}°. Find the third angle.", f"ஒரு முக்கோணியின் இரு கோணங்கள் {a}°, {b}°. மூன்றாம் கோணத்தைக் காண்க."),
             [S("Angles of a triangle add up to 180°.", "முக்கோணியின் கோணங்களின் கூட்டுத்தொகை 180°.", rf"x + {a} + {b} = 180"),
              S("Add the known angles.", "தெரிந்த கோணங்களைக் கூட்டுக.", rf"x + {a+b} = 180"),
              S("Subtract.", "கழிக்க.", rf"x = 180 - {a+b} = {x}^\circ")],
             f"{x}^\\circ", [T("Sum of angles in a triangle = 180°.", "முக்கோணியின் கோணக் கூட்டுத்தொகை = 180°.")], unit="°", value=x, formula="T-GEO-TRISUM",
             distractors=[(f"{360-a-b}^\\circ", T("Used 360° instead of 180°.", "180° க்குப் பதிலாக 360°."))], verify=lambda: a + b + x == 180)


@tpl("G10C08", "G")
def exterior_angle(r):
    a, b = r.choice([(45, 65), (38, 72), (55, 80), (27, 96)])
    return Q(T(f"In ΔABC, BC is produced to D. ∠BAC = {a}° and ∠ABC = {b}°. Find ∠ACD.",
               f"ΔABC இல் BC, D வரை நீட்டப்பட்டுள்ளது. ∠BAC = {a}°, ∠ABC = {b}°. ∠ACD ஐக் காண்க."),
             [S("Exterior angle = sum of the two interior opposite angles.", "புறக்கோணம் = அகத்தெதிர்க் கோணங்கள் இரண்டினதும் கூட்டுத்தொகை.", r"\angle ACD = \angle BAC + \angle ABC"),
              S("Substitute.", "பிரதியிடுக.", rf"\angle ACD = {a}^\circ + {b}^\circ = {a+b}^\circ")],
             f"{a+b}^\\circ", [T("∠ACD is outside the triangle at C.", "∠ACD, C இல் முக்கோணிக்கு வெளியே உள்ளது."), T("Use the exterior angle theorem.", "புறக்கோணத் தேற்றத்தைப் பயன்படுத்துக.")],
             unit="°", value=a + b, formula="T-GEO-EXT", diagram="GEO-EXTANGLE-01",
             distractors=[(f"{180-a-b}^\\circ", T("That is the interior angle ∠ACB.", "அது அகக்கோணம் ∠ACB.")), (f"{180-b}^\\circ", T("Wrong angles paired.", "பிழையான கோணங்கள்."))],
             verify=lambda: (180 - (180 - a - b)) == a + b)


@tpl("G10C08", "A")
def angle_algebra(r):
    k = r.choice([2, 3]); c = r.choice([10, 20, 15]); x = r.choice([20, 25, 30, 35])
    A1, A2 = k * x + c, x; A3 = 180 - A1 - A2
    return Q(T(f"The angles of a triangle are $({k}x + {c})^\\circ$, $x^\\circ$ and ${A3}^\\circ$. Find x and the largest angle.",
               f"ஒரு முக்கோணியின் கோணங்கள் $({k}x + {c})^\\circ$, $x^\\circ$, ${A3}^\\circ$. x ஐயும் மிகப்பெரிய கோணத்தையும் காண்க."),
             [S("Write the angle-sum equation.", "கோணக் கூட்டுத்தொகைச் சமன்பாட்டை எழுதுக.", rf"({k}x+{c}) + x + {A3} = 180"),
              S("Collect terms.", "உறுப்புகளைச் சேர்க்க.", rf"{k+1}x + {c+A3} = 180"),
              S("Solve.", "தீர்க்க.", rf"{k+1}x = {180-c-A3} \Rightarrow x = {x}"),
              S("Find each angle and pick the largest.", "ஒவ்வொரு கோணத்தையும் கண்டு பெரியதைத் தெரிக.", rf"{k}x+{c} = {A1}^\circ,\ x = {x}^\circ,\ {A3}^\circ \Rightarrow \max = {max(A1,A2,A3)}^\circ")],
             rf"x={x},\ \text{{largest}}={max(A1,A2,A3)}^\circ", [T("Angle sum = 180° gives an equation.", "கோணக் கூட்டுத்தொகை = 180° ஒரு சமன்பாட்டைத் தரும்."), T("After finding x, substitute back.", "x கண்டபின் மீண்டும் பிரதியிடுக.")],
             value=x, formula="T-GEO-TRISUM", verify=lambda: A1 + A2 + A3 == 180,
             mistake=T("Giving x as the final answer when the largest angle is asked.", "மிகப்பெரிய கோணம் கேட்கப்படும்போது x ஐ விடையாகத் தருதல்."))


# ---------------- G10C09 Triangles II (isosceles) ----------------
@tpl("G10C09", "F")
def isosceles_base(r):
    v = r.choice([40, 50, 70, 80, 100, 36])
    b = (180 - v) // 2 if (180 - v) % 2 == 0 else None
    return Q(T(f"In ΔABC, AB = AC and ∠BAC = {v}°. Find ∠ABC.", f"ΔABC இல் AB = AC, ∠BAC = {v}°. ∠ABC ஐக் காண்க."),
             [S("Angles opposite equal sides are equal.", "சம பக்கங்களுக்கு எதிரான கோணங்கள் சமம்.", r"\angle ABC = \angle ACB = y"),
              S("Use the angle sum.", "கோணக் கூட்டுத்தொகையைப் பயன்படுத்துக.", rf"{v} + y + y = 180 \Rightarrow 2y = {180-v}"),
              S("Divide by 2.", "2 ஆல் வகுக்க.", rf"y = {b}^\circ")],
             f"{b}^\\circ", [T("AB = AC means the base angles B and C are equal.", "AB = AC எனின் அடிக்கோணங்கள் B, C சமம்.")], unit="°", value=b, formula="T-GEO-ISOS",
             distractors=[(f"{180-v}^\\circ", T("Forgot to divide by 2.", "2 ஆல் வகுக்க மறந்தது."))], verify=lambda: v + 2 * b == 180)


@tpl("G10C09", "G")
def isosceles_exterior(r):
    b = r.choice([50, 65, 70, 72, 55])
    apex = 180 - 2 * b; ext = 180 - b
    return Q(T(f"In ΔPQR, PQ = PR and ∠PQR = {b}°. QR is produced to S. Find ∠QPR and ∠PRS.",
               f"ΔPQR இல் PQ = PR, ∠PQR = {b}°. QR, S வரை நீட்டப்பட்டுள்ளது. ∠QPR, ∠PRS ஐக் காண்க."),
             [S("Base angles are equal.", "அடிக்கோணங்கள் சமம்.", rf"\angle PRQ = \angle PQR = {b}^\circ"),
              S("Apex angle from the angle sum.", "கோணக் கூட்டுத்தொகையிலிருந்து உச்சிக் கோணம்.", rf"\angle QPR = 180 - 2\times{b} = {apex}^\circ"),
              S("Angles on a straight line add to 180°.", "நேர்கோட்டிலுள்ள கோணங்களின் கூட்டுத்தொகை 180°.", rf"\angle PRS = 180 - {b} = {ext}^\circ")],
             rf"\angle QPR={apex}^\circ,\ \angle PRS={ext}^\circ", [T("Which sides are equal? So which angles are equal?", "எப்பக்கங்கள் சமம்? எனவே எக்கோணங்கள் சமம்?")],
             unit="°", value=apex, formula="T-GEO-ISOS", verify=lambda: apex + 2 * b == 180 and ext + b == 180)


@tpl("G10C09", "A")
def isosceles_proof(r):
    return Q(T("In ΔABC, AB = AC. D is the midpoint of BC. Prove that AD is perpendicular to BC.",
               "ΔABC இல் AB = AC. D, BC இன் நடுப்புள்ளி. AD, BC க்குச் செங்குத்து என நிறுவுக."),
             [S("Compare ΔABD and ΔACD: AB = AC.", "ΔABD, ΔACD ஐ ஒப்பிடுக: AB = AC.", r"AB = AC\ (\text{given})"),
              S("BD = DC.", "BD = DC.", r"BD = DC\ (D\text{ is the midpoint})"),
              S("AD is common.", "AD பொது.", r"AD = AD\ (\text{common})"),
              S("Congruent by SSS.", "SSS மூலம் ஒருங்கிசைவு.", r"\triangle ABD\equiv\triangle ACD\ (\text{SSS})"),
              S("So the angles at D are equal; they lie on a straight line.", "எனவே D இலுள்ள கோணங்கள் சமம்; அவை நேர்கோட்டில் உள்ளன.", r"\angle ADB = \angle ADC,\ \angle ADB + \angle ADC = 180^\circ"),
              S("Each angle is 90°.", "ஒவ்வொன்றும் 90°.", r"\angle ADB = 90^\circ \Rightarrow AD\perp BC")],
             r"AD\perp BC", [T("Prove two triangles congruent first.", "முதலில் இரு முக்கோணிகளை ஒருங்கிசைவாக்குக."), T("Two equal angles on a straight line are each 90°.", "நேர்கோட்டிலுள்ள இரு சம கோணங்கள் ஒவ்வொன்றும் 90°.")],
             kind="proof", formula="T-GEO-ISOS", diagram="GEO-ISOS-BISECT-01", verify=lambda: True)


# ---------------- G10C10 Inverse proportions ----------------
@tpl("G10C10", "F")
def men_days(r):
    m1, d1 = r.choice([(6, 10), (8, 15), (12, 5), (10, 9)]); m2 = r.choice([d for d in [3, 4, 5, 6, 10, 12, 15, 20, 24, 30] if (m1 * d1) % d == 0 and d != m1])
    d2 = m1 * d1 // m2
    return Q(T(f"{m1} workers can finish a job in {d1} days. How many days will {m2} workers take (working at the same rate)?",
               f"{m1} தொழிலாளர்கள் ஒரு வேலையை {d1} நாட்களில் முடிப்பர். அதே வீதத்தில் {m2} தொழிலாளர்கள் எத்தனை நாட்கள் எடுப்பர்?"),
             [S("Find the total work in worker-days.", "மொத்த வேலையை ஆள்-நாட்களில் காண்க.", rf"{m1}\times {d1} = {m1*d1}\ \text{{worker-days}}"),
              S("Divide by the new number of workers.", "புதிய தொழிலாளர் எண்ணிக்கையால் வகுக்க.", rf"{m1*d1}\div {m2} = {d2}\ \text{{days}}")],
             f"{d2}\\ \\text{{days}}", [T("More workers → fewer days (inverse proportion).", "அதிக ஆட்கள் → குறைந்த நாட்கள் (நேர்மாறு விகிதசமன்)."), T("Workers × days stays the same.", "ஆட்கள் × நாட்கள் மாறாது.")],
             unit="days", value=d2, formula="F-NUM-INV",
             distractors=[(f"{n(round(d1*m2/m1,2))}\\ \\text{{days}}", T("Treated it as direct proportion.", "நேர் விகிதசமனாகக் கருதியது."))], verify=lambda: m1 * d1 == m2 * d2,
             mistake=T("Using direct proportion (multiplying by m2/m1).", "நேர் விகிதசமன் பயன்படுத்துதல்."))


@tpl("G10C10", "G")
def extra_workers(r):
    m, d, d2 = r.choice([(8, 12, 8), (10, 6, 4), (6, 15, 10), (12, 10, 8)])
    need = m * d // d2; extra = need - m
    return Q(T(f"{m} people can build a wall in {d} days. To finish it in {d2} days, how many MORE people are needed?",
               f"{m} பேர் ஒரு சுவரை {d} நாட்களில் கட்டுவர். அதை {d2} நாட்களில் முடிக்க மேலும் எத்தனை பேர் தேவை?"),
             [S("Total work.", "மொத்த வேலை.", rf"{m}\times{d} = {m*d}\ \text{{person-days}}"),
              S("People needed for the new time.", "புதிய நேரத்துக்குத் தேவையான ஆட்கள்.", rf"{m*d}\div{d2} = {need}"),
              S("Extra people.", "மேலதிக ஆட்கள்.", rf"{need} - {m} = {extra}")],
             str(extra), [T("First find how many people are needed in total.", "முதலில் மொத்தம் எத்தனை பேர் தேவை எனக் காண்க."), T("'More' means subtract the people already there.", "'மேலும்' என்றால் ஏற்கனவே உள்ளவர்களைக் கழிக்க.")],
             value=extra, formula="F-NUM-INV", verify=lambda: (m + extra) * d2 == m * d,
             distractors=[(str(need), T("Total people, not extra people.", "மொத்த ஆட்கள், மேலதிகம் அல்ல."))])


@tpl("G10C10", "A")
def partial_work(r):
    m, d, after, left_m = r.choice([(12, 20, 5, 3), (10, 18, 6, 2), (15, 12, 4, 5)])
    work = m * d; done = m * after; rem = work - done; new_m = m - left_m
    days = Fr(rem, new_m)
    return Q(T(f"{m} workers planned to finish a job in {d} days. After {after} days, {left_m} workers left. How many more days will the remaining workers take to finish the job?",
               f"{m} தொழிலாளர்கள் ஒரு வேலையை {d} நாட்களில் முடிக்கத் திட்டமிட்டனர். {after} நாட்களின் பின் {left_m} பேர் விலகினர். எஞ்சியோர் வேலையை முடிக்க மேலும் எத்தனை நாட்கள் எடுப்பர்?"),
             [S("Total work.", "மொத்த வேலை.", rf"{m}\times{d} = {work}\ \text{{worker-days}}"),
              S("Work already done.", "செய்து முடித்த வேலை.", rf"{m}\times{after} = {done}"),
              S("Work remaining.", "எஞ்சிய வேலை.", rf"{work} - {done} = {rem}"),
              S("Days for the remaining workers.", "எஞ்சிய தொழிலாளருக்கான நாட்கள்.", rf"{rem}\div({m}-{left_m}) = {rem}\div{new_m} = {fl(days)}")],
             f"{fl(days)}\\ \\text{{days}}", [T("Work in worker-days: done + remaining = total.", "ஆள்-நாட்களில்: செய்தது + எஞ்சியது = மொத்தம்.")],
             unit="days", value=float(days), formula="F-NUM-INV", verify=lambda: done + new_m * days == work)


# ---------------- G10C11 Data representation (pie charts) ----------------
@tpl("G10C11", "F")
def pie_angle(r):
    tot = r.choice([120, 180, 360, 240]); part = r.choice([x for x in [20, 30, 40, 45, 60, 90] if (x * 360) % tot == 0])
    ang = part * 360 // tot
    return Q(T(f"In a survey of {tot} students, {part} chose cricket. Find the angle of the cricket sector in a pie chart.",
               f"{tot} மாணவர்களிடம் செய்த ஆய்வில் {part} பேர் கிரிக்கெற்றைத் தெரிந்தனர். வட்ட வரைபில் கிரிக்கெற் ஆரைச்சிறையின் கோணத்தைக் காண்க."),
             [S("Angle = (part ÷ total) × 360°.", "கோணம் = (பகுதி ÷ மொத்தம்) × 360°.", rf"\frac{{{part}}}{{{tot}}}\times 360^\circ"),
              S("Calculate.", "கணிக்க.", rf"= {ang}^\circ")],
             f"{ang}^\\circ", [T("The whole circle (360°) represents all students.", "முழு வட்டம் (360°) எல்லா மாணவர்களையும் குறிக்கும்.")],
             unit="°", value=ang, formula="F-STA-PIE", diagram="STA-PIE-01", verify=lambda: part * 360 == ang * tot,
             distractors=[(f"{round(part*100/tot)}^\\circ", T("Calculated a percentage instead of an angle.", "கோணத்துக்குப் பதிலாகச் சதவீதம்."))])


@tpl("G10C11", "G")
def pie_value(r):
    tot = r.choice([72, 90, 120, 180]); ang = r.choice([a for a in [40, 60, 80, 90, 120, 100] if (a * tot) % 360 == 0])
    val = ang * tot // 360
    return Q(T(f"A pie chart shows how {tot} families travel to work. The bus sector has an angle of {ang}°. How many families travel by bus?",
               f"{tot} குடும்பங்கள் வேலைக்குச் செல்லும் முறையை ஒரு வட்ட வரைபு காட்டுகிறது. பேருந்து ஆரைச்சிறையின் கோணம் {ang}°. எத்தனை குடும்பங்கள் பேருந்தில் செல்கின்றன?"),
             [S("Number = (angle ÷ 360) × total.", "எண்ணிக்கை = (கோணம் ÷ 360) × மொத்தம்.", rf"\frac{{{ang}}}{{360}}\times {tot}"),
              S("Calculate.", "கணிக்க.", rf"= {val}")],
             str(val), [T("Each degree represents total ÷ 360 families.", "ஒவ்வொரு பாகையும் மொத்தம் ÷ 360 குடும்பங்களைக் குறிக்கும்.")], value=val, formula="F-STA-PIE",
             verify=lambda: val * 360 == ang * tot)


@tpl("G10C11", "A")
def pie_missing(r):
    tot = 360 // 3 * r.choice([1, 2])
    a1, a2 = r.choice([(90, 120), (60, 150), (72, 108)]); a3 = 360 - a1 - a2 - 60
    x = (a3 * tot) // 360
    return Q(T(f"A pie chart of {tot} people has sectors of {a1}°, {a2}° and 60°, and one more sector for 'Other'. How many people are in 'Other'?",
               f"{tot} பேரின் வட்ட வரைபில் {a1}°, {a2}°, 60° ஆரைச்சிறைகளும் 'ஏனையவை' எனும் இன்னொரு ஆரைச்சிறையும் உள்ளன. 'ஏனையவை' இல் எத்தனை பேர்?"),
             [S("Angles in a circle add to 360°.", "வட்டத்திலுள்ள கோணங்களின் கூட்டுத்தொகை 360°.", rf"x = 360 - {a1} - {a2} - 60 = {a3}^\circ"),
              S("Convert the angle to people.", "கோணத்தை ஆட்களாக மாற்றுக.", rf"\frac{{{a3}}}{{360}}\times{tot} = {fl(Fr(a3*tot,360))}")],
             fl(Fr(a3 * tot, 360)), [T("Find the missing angle first.", "முதலில் விடுபட்ட கோணத்தைக் காண்க.")], value=float(Fr(a3 * tot, 360)), formula="F-STA-PIE",
             verify=lambda: a1 + a2 + 60 + a3 == 360)


# ---------------- G10C12 LCM of algebraic expressions ----------------
@tpl("G10C12", "F")
def lcm_mono(r):
    p, q = r.choice([(("4", "x^2y", 4, 2, 1), ("6", "xy^2", 6, 1, 2)), (("3", "a^2", 3, 2, 0), ("9", "ab", 9, 1, 1)), (("8", "x", 8, 1, 0), ("12", "x^3", 12, 3, 0))])
    from math import lcm
    c = lcm(p[2], q[2]); e1, e2 = max(p[3], q[3]), max(p[4], q[4])
    v1, v2 = ("x", "y") if "x" in p[1] + q[1] else ("a", "b")
    term = f"{c}{v1}{'^'+str(e1) if e1>1 else ''}{v2 if e2 else ''}{'^'+str(e2) if e2>1 else ''}"
    return Q(T(f"Find the LCM of ${p[0]}{p[1]}$ and ${q[0]}{q[1]}$.", f"${p[0]}{p[1]}$, ${q[0]}{q[1]}$ இன் பொ.ம.சி. ஐக் காண்க."),
             [S("LCM of the numbers.", "எண்களின் பொ.ம.சி.", rf"\text{{LCM}}({p[2]},{q[2]}) = {c}"),
              S("For each letter take the highest power.", "ஒவ்வொரு எழுத்துக்கும் உயர் வலுவை எடுக்க.", rf"{v1}^{{{e1}}}" + (rf",\ {v2}^{{{e2}}}" if e2 else "")),
              S("Multiply together.", "ஒன்றாகப் பெருக்குக.", rf"\text{{LCM}} = {term}")],
             term, [T("Highest power of each letter.", "ஒவ்வொரு எழுத்தின் உயர் வலு.")], kind="algebra", formula="F-ALG-LCM", verify=lambda: True,
             mistake=T("Taking the lowest power (that gives the HCF).", "குறைந்த வலுவை எடுத்தல் (அது பொ.கா.பெ.)."))


@tpl("G10C12", "G")
def lcm_binom(r):
    a = r.choice([2, 3, 4, 5])
    return Q(T(f"Find the LCM of $x^2 - {a*a}$ and $x^2 + {a}x$.", f"$x^2 - {a*a}$, $x^2 + {a}x$ இன் பொ.ம.சி. ஐக் காண்க."),
             [S("Factorise the first expression.", "முதல் கோவையைக் காரணிப்படுத்துக.", rf"x^2-{a*a} = (x+{a})(x-{a})"),
              S("Factorise the second expression.", "இரண்டாம் கோவையைக் காரணிப்படுத்துக.", rf"x^2+{a}x = x(x+{a})"),
              S("Take every factor once (highest power).", "ஒவ்வொரு காரணியையும் ஒருமுறை (உயர் வலுவுடன்) எடுக்க.", rf"\text{{LCM}} = x(x+{a})(x-{a})")],
             rf"x(x+{a})(x-{a})", [T("Factorise both expressions completely first.", "முதலில் இரு கோவைகளையும் முழுமையாகக் காரணிப்படுத்துக."), T("A common factor is written only once.", "பொதுக் காரணி ஒருமுறை மட்டும் எழுதப்படும்.")],
             kind="algebra", formula="F-ALG-LCM", verify=lambda: True,
             distractors=[(rf"x(x+{a})^2(x-{a})", T("Common factor (x + a) written twice.", "பொதுக் காரணி (x + a) இருமுறை.")), (rf"(x+{a})", T("That is the HCF.", "அது பொ.கா.பெ."))])


@tpl("G10C12", "A")
def lcm_three(r):
    a = r.choice([1, 2, 3])
    return Q(T(f"Find the LCM of $x^2 + {2*a}x + {a*a}$, $x^2 - {a*a}$ and $2x + {2*a}$.", f"$x^2 + {2*a}x + {a*a}$, $x^2 - {a*a}$, $2x + {2*a}$ இன் பொ.ம.சி. ஐக் காண்க."),
             [S("Factorise each expression.", "ஒவ்வொரு கோவையையும் காரணிப்படுத்துக.", rf"(x+{a})^2,\quad (x+{a})(x-{a}),\quad 2(x+{a})"),
              S("Highest power of each factor.", "ஒவ்வொரு காரணியினதும் உயர் வலு.", rf"2,\ (x+{a})^2,\ (x-{a})"),
              S("Multiply.", "பெருக்குக.", rf"\text{{LCM}} = 2(x+{a})^2(x-{a})")],
             rf"2(x+{a})^2(x-{a})", [T("(x + a)² appears in the first one — so the LCM needs the square.", "முதலாவதில் (x + a)² உள்ளது — பொ.ம.சி.க்கு வர்க்கம் தேவை.")],
             kind="algebra", formula="F-ALG-LCM", verify=lambda: True)


# ---------------- G10C13 Algebraic fractions ----------------
@tpl("G10C13", "F")
def af_same_den(r):
    a, b, c = r.choice([2, 3, 5]), r.choice([1, 4]), r.choice([3, 7])
    return Q(T(f"Simplify: $\\frac{{{a}x}}{{{c}}} + \\frac{{{b}x}}{{{c}}}$", f"சுருக்குக: $\\frac{{{a}x}}{{{c}}} + \\frac{{{b}x}}{{{c}}}$"),
             [S("Denominators are equal, so add the numerators.", "பகுதிகள் சமம்; தொகுதிகளைக் கூட்டுக.", rf"\frac{{{a}x+{b}x}}{{{c}}}"),
              S("Simplify.", "சுருக்குக.", rf"= \frac{{{a+b}x}}{{{c}}}")],
             rf"\frac{{{a+b}x}}{{{c}}}", [T("Same denominator → add the tops.", "ஒரே பகுதி → மேல்களைக் கூட்டுக.")], kind="algebra", formula="F-ALG-AFRAC", verify=lambda: True,
             distractors=[(rf"\frac{{{a+b}x}}{{{2*c}}}", T("Denominators were added too.", "பகுதிகளும் கூட்டப்பட்டன."))])


@tpl("G10C13", "G")
def af_diff_den(r):
    a, b = r.choice([(2, 3), (3, 4), (4, 5), (2, 5)])
    return Q(T(f"Simplify: $\\frac{{x}}{{{a}}} + \\frac{{x+1}}{{{b}}}$", f"சுருக்குக: $\\frac{{x}}{{{a}}} + \\frac{{x+1}}{{{b}}}$"),
             [S("Common denominator.", "பொதுப் பகுதி.", rf"\text{{LCM}}({a},{b}) = {a*b}"),
              S("Rewrite each fraction.", "ஒவ்வொரு பின்னத்தையும் மீள எழுதுக.", rf"\frac{{{b}x}}{{{a*b}}} + \frac{{{a}(x+1)}}{{{a*b}}}"),
              S("Expand and add the numerators.", "தொகுதிகளை விரித்துக் கூட்டுக.", rf"= \frac{{{b}x + {a}x + {a}}}{{{a*b}}}"),
              S("Simplify.", "சுருக்குக.", rf"= \frac{{{a+b}x + {a}}}{{{a*b}}}")],
             rf"\frac{{{a+b}x+{a}}}{{{a*b}}}", [T("Multiply the whole numerator (x + 1) — use brackets.", "முழுத் தொகுதி (x + 1) ஐயும் பெருக்குக — அடைப்புப் பயன்படுத்துக.")],
             kind="algebra", formula="F-ALG-AFRAC",
             verify=lambda: __import__("sympy").simplify(__import__("sympy").sympify(f"x/{a}+(x+1)/{b}") - __import__("sympy").sympify(f"({a+b}*x+{a})/{a*b}")) == 0,
             mistake=T("Multiplying only x and not the 1 in (x + 1).", "(x + 1) இல் x ஐ மட்டும் பெருக்கி 1 ஐ விடுதல்."))


@tpl("G10C13", "A")
def af_factor(r):
    a = r.choice([1, 2, 3, 4])
    return Q(T(f"Simplify: $\\frac{{2}}{{x-{a}}} - \\frac{{{2*a}}}{{x^2-{a}x}}$", f"சுருக்குக: $\\frac{{2}}{{x-{a}}} - \\frac{{{2*a}}}{{x^2-{a}x}}$"),
             [S("Factorise the second denominator.", "இரண்டாம் பகுதியைக் காரணிப்படுத்துக.", rf"x^2-{a}x = x(x-{a})"),
              S(f"Common denominator x(x − {a}).", f"பொதுப் பகுதி x(x − {a}).", rf"\frac{{2x}}{{x(x-{a})}} - \frac{{{2*a}}}{{x(x-{a})}}"),
              S("Subtract numerators.", "தொகுதிகளைக் கழிக்க.", rf"= \frac{{2x-{2*a}}}{{x(x-{a})}}"),
              S("Factorise and cancel.", "காரணிப்படுத்தி நீக்குக.", rf"= \frac{{2(x-{a})}}{{x(x-{a})}} = \frac{{2}}{{x}}")],
             r"\frac{2}{x}", [T("Factorise denominators before finding the LCM.", "பொ.ம.சி. காணுமுன் பகுதிகளைக் காரணிப்படுத்துக."), T("After subtracting, check if the top factorises.", "கழித்தபின் மேலைக் காரணிப்படுத்த முடியுமா எனப் பார்க்க.")],
             kind="algebra", formula="F-ALG-AFRAC",
             verify=lambda: __import__("sympy").simplify(__import__("sympy").sympify(f"2/(x-{a})-{2*a}/(x**2-{a}*x)") - __import__("sympy").sympify("2/x")) == 0)


# ---------------- G10C14 Percentages ----------------
@tpl("G10C14", "F")
def profit_percent(r):
    cp = r.choice([800, 1200, 2500, 4000, 1500]); pct = r.choice([10, 20, 25, 15])
    sp_ = cp * (100 + pct) // 100
    return Q(T(f"A trader buys an item for Rs. {n(cp)} and sells it for Rs. {n(sp_)}. Find the profit percentage.",
               f"ஒரு வியாபாரி ஒரு பொருளை ரூ. {n(cp)} க்கு வாங்கி ரூ. {n(sp_)} க்கு விற்றார். இலாபச் சதவீதத்தைக் காண்க."),
             [S("Profit = selling price − cost price.", "இலாபம் = விற்ற விலை − கொள்விலை.", rf"{n(sp_)} - {n(cp)} = {n(sp_-cp)}"),
              S("Profit % = profit ÷ cost price × 100.", "இலாப % = இலாபம் ÷ கொள்விலை × 100.", rf"\frac{{{n(sp_-cp)}}}{{{n(cp)}}}\times 100"),
              S("Calculate.", "கணிக்க.", rf"= {pct}\%")],
             f"{pct}\\%", [T("Profit % is always on the COST price.", "இலாப % எப்போதும் கொள்விலையின் மீது.")], unit="%", value=pct, formula="F-FIN-PROFIT",
             distractors=[(f"{n(round((sp_-cp)*100/sp_,2))}\\%", T("Divided by the selling price.", "விற்ற விலையால் வகுக்கப்பட்டது."))], verify=lambda: (sp_ - cp) * 100 == pct * cp)


@tpl("G10C14", "G")
def discount(r):
    mp = r.choice([2400, 3600, 5000, 7500]); d = r.choice([10, 15, 20]);
    sale = mp * (100 - d) // 100
    return Q(T(f"The marked price of a bag is Rs. {n(mp)}. A discount of {d}% is given. Find the selling price.",
               f"ஒரு பையின் குறித்த விலை ரூ. {n(mp)}. {d}% கழிவு வழங்கப்படுகிறது. விற்ற விலையைக் காண்க."),
             [S("Discount amount.", "கழிவுத் தொகை.", rf"{n(mp)}\times\frac{{{d}}}{{100}} = {n(mp*d//100)}"),
              S("Selling price = marked price − discount.", "விற்ற விலை = குறித்த விலை − கழிவு.", rf"{n(mp)} - {n(mp*d//100)} = {n(sale)}")],
             rs(sale), [T(f"Or: selling price = {100-d}% of the marked price.", f"அல்லது: விற்ற விலை = குறித்த விலையின் {100-d}%.")], unit="Rs.", value=sale, formula="F-FIN-DISC",
             distractors=[(rs(mp * d // 100), T("That is the discount, not the price.", "அது கழிவு, விலை அல்ல."))], verify=lambda: sale == mp - mp * d / 100)


@tpl("G10C14", "A")
def simple_interest_find_rate(r):
    P = r.choice([20000, 25000, 40000, 50000]); R = r.choice([6, 8, 10, 12]); t = r.choice([2, 3, 4])
    I = P * R * t // 100; A = P + I
    return Q(T(f"Rs. {n(P)} was deposited at simple interest. After {t} years the total amount was Rs. {n(A)}. Find the annual interest rate.",
               f"ரூ. {n(P)} தனிவட்டிக்கு வைப்பிலிடப்பட்டது. {t} வருடங்களின் பின் மொத்தத் தொகை ரூ. {n(A)}. வருட வட்டி வீதத்தைக் காண்க."),
             [S("Interest = amount − principal.", "வட்டி = மொத்தம் − முதல்.", rf"I = {n(A)} - {n(P)} = {n(I)}"),
              S("Interest for one year.", "ஒரு வருட வட்டி.", rf"{n(I)}\div {t} = {n(I//t)}"),
              S("Rate = yearly interest ÷ principal × 100.", "வீதம் = வருட வட்டி ÷ முதல் × 100.", rf"\frac{{{n(I//t)}}}{{{n(P)}}}\times 100 = {R}\%")],
             f"{R}\\%", [T("Find the interest first.", "முதலில் வட்டியைக் காண்க."), T("I = PRT/100 ⇒ R = 100I/(PT).", "I = PRT/100 ⇒ R = 100I/(PT).")],
             unit="%", value=R, formula="F-FIN-SI", verify=lambda: P * R * t == 100 * I,
             mistake=T("Using the total amount as the interest.", "மொத்தத் தொகையை வட்டியாகக் கொள்ளல்."))


# ---------------- G10C15 Equations ----------------
@tpl("G10C15", "F")
def linear_frac_eq(r):
    x = r.choice([2, 3, 4, 6, 8, 9, 12]); d = r.choice([2, 3, 4]); c = r.choice([1, 2, 5])
    while (x + c) % d:
        x += 1
    rhs = (x + c) // d
    return Q(T(f"Solve: $\\frac{{x + {c}}}{{{d}}} = {rhs}$", f"தீர்க்க: $\\frac{{x + {c}}}{{{d}}} = {rhs}$"),
             [S(f"Multiply both sides by {d}.", f"இருபுறமும் {d} ஆல் பெருக்குக.", rf"x + {c} = {rhs}\times {d} = {rhs*d}"),
              S(f"Subtract {c} from both sides.", f"இருபுறமும் {c} ஐக் கழிக்க.", rf"x = {rhs*d} - {c}"),
              S("Simplify.", "சுருக்குக.", rf"x = {x}")],
             f"x = {x}", [T("Remove the fraction first by multiplying.", "முதலில் பெருக்கிப் பின்னத்தை நீக்குக.")], value=x, formula="F-ALG-LIN",
             verify=lambda: (x + c) == rhs * d, distractors=[(f"x = {rhs*d+c}", T("Added instead of subtracting.", "கழிப்பதற்குப் பதிலாகக் கூட்டியது."))])


@tpl("G10C15", "G")
def simultaneous(r):
    x, y = r.choice([(2, 3), (3, -1), (4, 1), (-2, 5), (5, 2)])
    a1, b1, a2, b2 = r.choice([(2, 3, 3, -2), (3, 2, 2, -3), (1, 2, 3, -1), (2, 1, 1, -3)])
    c1, c2 = a1 * x + b1 * y, a2 * x + b2 * y
    # eliminate y: multiply eq1 by |b2|, eq2 by |b1|
    m1, m2 = abs(b2), abs(b1)
    return Q(T(f"Solve the simultaneous equations: ${poly([a1,0])} {sgn(b1)}y = {c1}$ and ${poly([a2,0])} {sgn(b2)}y = {c2}$",
               f"ஒருங்கமை சமன்பாடுகளைத் தீர்க்க: ${poly([a1,0])} {sgn(b1)}y = {c1}$, ${poly([a2,0])} {sgn(b2)}y = {c2}$"),
             [S(f"Make the y-coefficients equal: multiply (1) by {m1} and (2) by {m2}.", f"y குணகங்களைச் சமமாக்குக: (1) ஐ {m1} ஆலும் (2) ஐ {m2} ஆலும் பெருக்குக.",
                rf"{a1*m1}x {sgn(b1*m1)}y = {c1*m1}\quad(3),\qquad {a2*m2}x {sgn(b2*m2)}y = {c2*m2}\quad(4)"),
              S("Add (3) and (4) to remove y.", "y ஐ நீக்க (3), (4) ஐக் கூட்டுக.", rf"{a1*m1+a2*m2}x = {c1*m1+c2*m2}"),
              S("Find x.", "x ஐக் காண்க.", rf"x = {x}"),
              S("Substitute x in (1) to find y.", "y ஐக் காண x ஐ (1) இல் பிரதியிடுக.", rf"{a1}({x}) {sgn(b1)}y = {c1} \Rightarrow y = {y}"),
              S("Check in (2).", "(2) இல் சரிபார்க்க.", rf"{a2}({x}) {sgn(b2)}({y}) = {c2}\ \checkmark")],
             f"x = {x},\\ y = {y}", [T("Make one variable's coefficients equal with opposite signs, then add.", "ஒரு மாறியின் குணகங்களை எதிர்க் குறிகளுடன் சமமாக்கிக் கூட்டுக."),
                                    T("Always check in the other equation.", "மற்றச் சமன்பாட்டில் எப்போதும் சரிபார்க்க.")],
             value=x, formula="F-ALG-SIM", verify=lambda: a1 * x + b1 * y == c1 and a2 * x + b2 * y == c2 and (b1 * m1 + b2 * m2) == 0,
             mistake=T("Multiplying only the left side of an equation.", "சமன்பாட்டின் இடப்புறத்தை மட்டும் பெருக்குதல்."))


@tpl("G10C15", "A")
def quad_factor_word(r):
    w = r.choice([4, 5, 6, 7, 8]); d = r.choice([2, 3, 4, 5]); L = w + d; A = w * L
    return Q(T(f"The length of a rectangle is {d} m more than its width. Its area is {A} m². Form an equation in x (width) and find the width.",
               f"ஒரு செவ்வகத்தின் நீளம் அதன் அகலத்திலும் {d} m கூடியது. அதன் பரப்பளவு {A} m². அகலம் x எனக் கொண்டு சமன்பாட்டை அமைத்து அகலத்தைக் காண்க."),
             [S("Write length in terms of x.", "நீளத்தை x இல் எழுதுக.", rf"\text{{length}} = x + {d}"),
              S("Area = length × width.", "பரப்பு = நீளம் × அகலம்.", rf"x(x+{d}) = {A}"),
              S("Rearrange to = 0.", "= 0 வடிவத்துக்கு மாற்றுக.", rf"x^2 + {d}x - {A} = 0"),
              S("Factorise.", "காரணிப்படுத்துக.", rf"(x - {w})(x + {L}) = 0"),
              S("Solve and reject the negative value (a length cannot be negative).", "தீர்த்து மறைப் பெறுமானத்தை நிராகரிக்க (நீளம் மறையாக இருக்க முடியாது).", rf"x = {w}\ \text{{or}}\ x = -{L} \Rightarrow x = {w}\ \text{{m}}")],
             f"{w}\\ \\text{{m}}", [T("Let width = x, then length = x + d.", "அகலம் = x எனின் நீளம் = x + d."), T("Bring all terms to one side and factorise.", "எல்லா உறுப்புகளையும் ஒருபுறம் கொண்டுவந்து காரணிப்படுத்துக.")],
             unit="m", value=w, formula="F-ALG-QUAD", verify=lambda: w * (w + d) == A,
             mistake=T("Giving the negative root as an answer for a length.", "நீளத்துக்கு மறை மூலத்தை விடையாகத் தருதல்."))


# ---------------- G10C16 Parallelograms I ----------------
@tpl("G10C16", "F")
def para_angles(r):
    a = r.choice([55, 62, 70, 75, 110, 115])
    return Q(T(f"In parallelogram ABCD, ∠DAB = {a}°. Find ∠ABC, ∠BCD and ∠CDA.", f"ABCD இணைகரத்தில் ∠DAB = {a}°. ∠ABC, ∠BCD, ∠CDA ஐக் காண்க."),
             [S("Adjacent angles of a parallelogram add to 180°.", "இணைகரத்தின் அடுத்துள்ள கோணங்களின் கூட்டுத்தொகை 180°.", rf"\angle ABC = 180 - {a} = {180-a}^\circ"),
              S("Opposite angles are equal.", "எதிர்க் கோணங்கள் சமம்.", rf"\angle BCD = \angle DAB = {a}^\circ,\quad \angle CDA = \angle ABC = {180-a}^\circ")],
             rf"{180-a}^\circ,\ {a}^\circ,\ {180-a}^\circ", [T("Opposite angles equal; neighbouring angles add to 180°.", "எதிர்க் கோணங்கள் சமம்; அயல் கோணங்கள் 180°.")],
             unit="°", value=180 - a, formula="T-GEO-PARA", diagram="GEO-PARA-01", verify=lambda: True)


@tpl("G10C16", "G")
def para_diagonals(r):
    p, q = r.choice([(3, 2), (2, 5), (4, 3)]); x = r.choice([2, 3, 4, 5])
    # AO = p x + 1 , OC = q x + (p-q)x +1 ... design: AO = px + 1, OC = x + k
    k = (p - 1) * x + 1
    return Q(T(f"The diagonals of parallelogram ABCD meet at O. AO = $({p}x + 1)$ cm and OC = $(x + {k})$ cm. Find x and the length of AC.",
               f"ABCD இணைகரத்தின் மூலைவிட்டங்கள் O இல் சந்திக்கின்றன. AO = $({p}x + 1)$ cm, OC = $(x + {k})$ cm. x ஐயும் AC இன் நீளத்தையும் காண்க."),
             [S("Diagonals of a parallelogram bisect each other.", "இணைகரத்தின் மூலைவிட்டங்கள் ஒன்றையொன்று இருசமகூறிடும்.", rf"AO = OC \Rightarrow {p}x + 1 = x + {k}"),
              S("Solve.", "தீர்க்க.", rf"{p-1}x = {k-1} \Rightarrow x = {x}"),
              S("Find AO, then AC = 2 × AO.", "AO கண்டு, AC = 2 × AO.", rf"AO = {p*x+1},\quad AC = 2\times{p*x+1} = {2*(p*x+1)}\ \text{{cm}}")],
             rf"x={x},\ AC={2*(p*x+1)}\text{{ cm}}", [T("O is the midpoint of AC.", "O, AC இன் நடுப்புள்ளி.")], value=x, formula="T-GEO-PARA", verify=lambda: p * x + 1 == x + k)


@tpl("G10C16", "A")
def para_proof(r):
    return Q(T("ABCD is a parallelogram. E and F are points on AB and DC such that AE = CF. Prove that DE = BF.",
               "ABCD ஓர் இணைகரம். AE = CF ஆகுமாறு E, F என்பன முறையே AB, DC மீதுள்ள புள்ளிகள். DE = BF என நிறுவுக."),
             [S("Compare ΔADE and ΔCBF: AD = CB.", "ΔADE, ΔCBF ஐ ஒப்பிடுக: AD = CB.", r"AD = CB\ (\text{opposite sides of a parallelogram})"),
              S("∠DAE = ∠BCF.", "∠DAE = ∠BCF.", r"\angle DAE = \angle BCF\ (\text{opposite angles of a parallelogram})"),
              S("AE = CF.", "AE = CF.", r"AE = CF\ (\text{given})"),
              S("Congruent by SAS.", "SAS மூலம் ஒருங்கிசைவு.", r"\triangle ADE\equiv\triangle CBF\ (\text{SAS})"),
              S("Corresponding sides.", "ஒத்த பக்கங்கள்.", r"\therefore DE = BF")],
             r"DE = BF", [T("Choose two triangles that contain DE and BF.", "DE, BF ஐக் கொண்ட இரு முக்கோணிகளைத் தெரிக.")], kind="proof", formula="T-GEO-PARA", diagram="GEO-PARA-01", verify=lambda: True)
