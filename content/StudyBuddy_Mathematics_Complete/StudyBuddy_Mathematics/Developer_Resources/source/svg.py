"""Programmatic, coordinate-computed SVG diagrams (language-neutral labels only).
Every point on a circle is computed with cos/sin; graphs are plotted from the function itself."""
import math, os, json

W, H = 360, 300
STY = ('<style>.l{stroke:#1f2937;stroke-width:2;fill:none}.t{stroke:#1f2937;stroke-width:1.2;fill:none}'
       '.c{stroke:#2563eb;stroke-width:2;fill:none}.k{stroke:#9ca3af;stroke-width:1;stroke-dasharray:4 3;fill:none}'
       '.g{stroke:#e5e7eb;stroke-width:1}.a{stroke:#6b7280;stroke-width:1.4}.s{fill:#bfdbfe;fill-opacity:.55;stroke:#2563eb;stroke-width:1.5}'
       '.r{stroke:#dc2626;stroke-width:2;fill:none}text{font-family:Arial,Helvetica,sans-serif;font-size:14px;fill:#111827}'
       '.sm{font-size:11px}.p{fill:#111827}</style>')


class Svg:
    def __init__(s, w=W, h=H):
        s.w, s.h, s.e = w, h, []

    def line(s, a, b, c="l"): s.e.append(f'<line x1="{a[0]:.1f}" y1="{a[1]:.1f}" x2="{b[0]:.1f}" y2="{b[1]:.1f}" class="{c}"/>')
    def poly(s, pts, c="l", close=True):
        tag = "polygon" if close else "polyline"
        s.e.append(f'<{tag} points="{" ".join(f"{x:.1f},{y:.1f}" for x, y in pts)}" class="{c}"/>')
    def circle(s, o, r, c="c"): s.e.append(f'<circle cx="{o[0]:.1f}" cy="{o[1]:.1f}" r="{r:.1f}" class="{c}"/>')
    def dot(s, p, r=3): s.e.append(f'<circle cx="{p[0]:.1f}" cy="{p[1]:.1f}" r="{r}" class="p"/>')
    def odot(s, p, r=4): s.e.append(f'<circle cx="{p[0]:.1f}" cy="{p[1]:.1f}" r="{r}" fill="#fff" stroke="#111827" stroke-width="1.5"/>')
    def text(s, p, t, c="", anchor="middle"): s.e.append(f'<text x="{p[0]:.1f}" y="{p[1]:.1f}" text-anchor="{anchor}" class="{c}">{t}</text>')
    def path(s, d, c="l"): s.e.append(f'<path d="{d}" class="{c}"/>')
    def arc(s, o, r, a1, a2, c="t"):
        """arc from angle a1 to a2 (degrees, maths orientation, counter-clockwise)"""
        p1 = pt(o, r, a1); p2 = pt(o, r, a2); large = 1 if (a2 - a1) % 360 > 180 else 0
        s.path(f"M{p1[0]:.1f},{p1[1]:.1f} A{r},{r} 0 {large} 0 {p2[0]:.1f},{p2[1]:.1f}", c)
    def right(s, p, u, v, k=10):
        a = (p[0] + u[0] * k, p[1] + u[1] * k); b = (a[0] + v[0] * k, a[1] + v[1] * k); c = (p[0] + v[0] * k, p[1] + v[1] * k)
        s.poly([a, b, c], "t", close=False)
    def tick(s, a, b, n=1):
        m = ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2); dx, dy = b[0] - a[0], b[1] - a[1]; L = math.hypot(dx, dy); ux, uy = dx / L, dy / L; nx, ny = -uy, ux
        for i in range(n):
            off = (i - (n - 1) / 2) * 5
            c = (m[0] + ux * off, m[1] + uy * off)
            s.line((c[0] - nx * 6, c[1] - ny * 6), (c[0] + nx * 6, c[1] + ny * 6), "t")
    def arrow(s, a, b, c="t"):
        s.line(a, b, c); ang = math.atan2(b[1] - a[1], b[0] - a[0])
        for d in (2.6, -2.6):
            s.line(b, (b[0] - 9 * math.cos(ang + d / 6), b[1] - 9 * math.sin(ang + d / 6)), c)
    def svg(s):
        return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {s.w} {s.h}" width="100%" role="img">{STY}<rect width="100%" height="100%" fill="#fff"/>' + "".join(s.e) + "</svg>"


def pt(o, r, deg):
    return (o[0] + r * math.cos(math.radians(deg)), o[1] - r * math.sin(math.radians(deg)))


def lab(s, p, t, dx=0, dy=0):
    s.text((p[0] + dx, p[1] + dy), t)


# --------------------------------------------------------------------------- geometry
def sector():
    s = Svg(); o = (110, 220); r = 150
    s.line(o, pt(o, r, 0)); s.line(o, pt(o, r, 90)); s.arc(o, r, 0, 90, "c"); s.arc(o, 28, 0, 90)
    lab(s, o, "O", -12, 14); lab(s, pt(o, r, 0), "A", 12, 5); lab(s, pt(o, r, 90), "B", -12, 0); lab(s, (o[0] + 75, o[1] + 18), "r"); lab(s, (o[0] + 32, o[1] - 30), "θ")
    return s, dict(desc="Sector OAB, radius r, centre angle θ", values={"theta_drawn_deg": 90})


def composite():
    s = Svg(); L, r = 200, 60; x0, y0 = 60, 90
    s.line((x0, y0), (x0 + L, y0)); s.line((x0, y0 + 2 * r), (x0 + L, y0 + 2 * r)); s.line((x0, y0), (x0, y0 + 2 * r))
    s.line((x0 + L, y0), (x0 + L, y0 + 2 * r), "k"); o = (x0 + L, y0 + r); s.arc(o, r, -90, 90, "c")
    lab(s, (x0 + L / 2, y0 - 8), "L"); lab(s, (x0 - 14, y0 + r + 5), "2r"); s.line(o, pt(o, r, 0), "t"); lab(s, (o[0] + r / 2, o[1] - 6), "r")
    return s, dict(desc="Rectangle L × 2r with an outward semicircle (dashed side is not part of the perimeter)")


def trap_semi():
    s = Svg(); A, B, C, D = (60, 230), (300, 230), (250, 110), (110, 110)
    s.poly([A, B, C, D]); o = ((C[0] + D[0]) / 2, C[1]); r = (C[0] - D[0]) / 2; s.arc(o, r, 0, 180, "c"); s.line(D, C, "k")
    s.line(((C[0] + D[0]) / 2, 110), ((C[0] + D[0]) / 2, 230), "k"); s.right(((C[0] + D[0]) / 2, 230), (1, 0), (0, -1))
    lab(s, (180, 250), "a"); lab(s, (180, 128), "b"); lab(s, (192, 180), "h"); lab(s, (o[0] + r / 2, o[1] - 5), "r")
    return s, dict(desc="Trapezium (parallel sides a, b, height h) with a semicircle of radius r on side b")


def isos_bisect():
    s = Svg(); A, B, C = (180, 40), (70, 250), (290, 250); D = (180, 250)
    s.poly([A, B, C]); s.line(A, D); s.tick(A, B); s.tick(A, C); s.tick(B, D, 2); s.tick(D, C, 2); s.right(D, (1, 0), (0, -1))
    lab(s, A, "A", 0, -8); lab(s, B, "B", -12, 8); lab(s, C, "C", 12, 8); lab(s, D, "D", 0, 20)
    return s, dict(desc="Isosceles triangle AB = AC; D midpoint of BC; AD ⟂ BC")


def ext_angle():
    s = Svg(); A, B, C, D = (150, 50), (50, 240), (240, 240), (340, 240)
    s.poly([A, B, C]); s.line(C, D); s.arc(C, 26, 0, math.degrees(math.atan2(C[1] - A[1], A[0] - C[0])) % 360)
    lab(s, A, "A", 0, -8); lab(s, B, "B", -10, 18); lab(s, C, "C", 0, 20); lab(s, D, "D", 0, 20)
    return s, dict(desc="Triangle ABC with BC produced to D; exterior angle ∠ACD")


def para():
    s = Svg(); A, B, C, D = (60, 230), (240, 230), (300, 80), (120, 80); O = ((A[0] + C[0]) / 2, (A[1] + C[1]) / 2)
    s.poly([A, B, C, D]); s.line(A, C, "t"); s.line(B, D, "t"); s.dot(O)
    for p, t, dx, dy in [(A, "A", -10, 15), (B, "B", 10, 15), (C, "C", 10, -5), (D, "D", -10, -5), (O, "O", 0, -10)]: lab(s, p, t, dx, dy)
    return s, dict(desc="Parallelogram ABCD; diagonals meet at O (AO = OC, BO = OD)")


def chord():
    s = Svg(); o = (180, 150); r = 120; A = pt(o, r, 210); B = pt(o, r, 330); M = ((A[0] + B[0]) / 2, (A[1] + B[1]) / 2)
    s.circle(o, r); s.line(A, B); s.line(o, M, "t"); s.line(o, A, "k"); s.dot(o); s.right(M, (1, 0), (0, -1))
    lab(s, o, "O", 0, -8); lab(s, A, "A", -12, 8); lab(s, B, "B", 12, 8); lab(s, M, "M", 0, 18)
    return s, dict(desc="Chord AB with OM ⟂ AB, so AM = MB; OA is a radius", values={"r": 1, "OM/r": 0.5})


def circ_centre():
    s = Svg(); o = (180, 160); r = 120; A, B, C = pt(o, r, 210), pt(o, r, 330), pt(o, r, 100)
    s.circle(o, r); s.poly([A, o, B], "l", close=False); s.poly([A, C, B], "l", close=False); s.dot(o)
    lab(s, o, "O", 0, 20); lab(s, A, "A", -12, 8); lab(s, B, "B", 12, 8); lab(s, C, "C", 0, -8)
    return s, dict(desc="∠AOB at the centre and ∠ACB on the circumference stand on arc AB (∠AOB = 2∠ACB)")


def circ_semi():
    s = Svg(); o = (180, 160); r = 120; A, B, C = pt(o, r, 180), pt(o, r, 0), pt(o, r, 60)
    s.circle(o, r); s.line(A, B); s.poly([A, C, B], "l", close=False); s.dot(o)
    lab(s, o, "O", 0, 18); lab(s, A, "A", -12, 5); lab(s, B, "B", 12, 5); lab(s, C, "C", 6, -8)
    # right-angle mark at C
    u = ((A[0] - C[0]) / math.dist(A, C), (A[1] - C[1]) / math.dist(A, C)); v = ((B[0] - C[0]) / math.dist(B, C), (B[1] - C[1]) / math.dist(B, C)); s.right(C, u, v)
    return s, dict(desc="AB is a diameter; ∠ACB = 90°", values={"check_angle_C_deg": round(math.degrees(math.acos(u[0] * v[0] + u[1] * v[1])), 6)})


def circ_sameseg():
    s = Svg(); o = (180, 155); r = 120; A, B, C, D = pt(o, r, 200), pt(o, r, 340), pt(o, r, 60), pt(o, r, 120)
    s.circle(o, r); s.poly([A, C, B], "l", close=False); s.poly([A, D, B], "l", close=False)
    for p, t, dx, dy in [(A, "A", -12, 8), (B, "B", 12, 8), (C, "C", 8, -6), (D, "D", -8, -6)]: lab(s, p, t, dx, dy)
    return s, dict(desc="∠ACB and ∠ADB are in the same segment (both on arc AB)")


def cyclic():
    s = Svg(); o = (170, 150); r = 115; A, B, C, D = pt(o, r, 130), pt(o, r, 210), pt(o, r, 320), pt(o, r, 50)
    E = (C[0] + (C[0] - B[0]) * 0.45, C[1] + (C[1] - B[1]) * 0.45)
    s.circle(o, r); s.poly([A, B, C, D]); s.line(C, E)
    for p, t, dx, dy in [(A, "A", -10, -6), (B, "B", -12, 10), (C, "C", 6, 18), (D, "D", 10, -6), (E, "E", 10, 10)]: lab(s, p, t, dx, dy)
    return s, dict(desc="Cyclic quadrilateral ABCD with BC produced to E (∠DCE = ∠BAD)")


def tangent1():
    s = Svg(); o = (120, 160); r = 80; P = (320, 160); d = math.dist(o, P); ang = math.degrees(math.acos(r / d)); T = pt(o, r, ang)
    s.circle(o, r); s.line(o, T); s.line(T, P); s.line(o, P, "t"); s.dot(o)
    u = ((o[0] - T[0]) / r, (o[1] - T[1]) / r); v = ((P[0] - T[0]) / math.dist(P, T), (P[1] - T[1]) / math.dist(P, T)); s.right(T, u, v)
    lab(s, o, "O", -10, 18); lab(s, T, "T", 0, -10); lab(s, P, "P", 12, 5)
    return s, dict(desc="PT is a tangent at T; OT ⟂ PT", values={"dot_OT_PT": round(u[0] * v[0] + u[1] * v[1], 9)})


def tangent2():
    s = Svg(); o = (120, 150); r = 80; P = (320, 150); d = math.dist(o, P); ang = math.degrees(math.acos(r / d)); A, B = pt(o, r, ang), pt(o, r, -ang)
    s.circle(o, r); s.line(A, P); s.line(B, P); s.line(o, A, "t"); s.line(o, B, "t"); s.dot(o); s.tick(A, P); s.tick(B, P)
    lab(s, o, "O", -12, 5); lab(s, A, "A", 0, -10); lab(s, B, "B", 0, 20); lab(s, P, "P", 12, 5)
    return s, dict(desc="Tangents PA = PB from external point P", values={"PA": round(math.dist(P, A), 6), "PB": round(math.dist(P, B), 6)})


def altseg():
    s = Svg(); o = (180, 130); r = 100; A = pt(o, r, 270); B = pt(o, r, 30); C = pt(o, r, 150)
    T1, T2 = (A[0] - 150, A[1]), (A[0] + 150, A[1])
    s.circle(o, r); s.line(T1, T2); s.poly([A, B, C])
    lab(s, A, "A", 0, 20); lab(s, B, "B", 12, 0); lab(s, C, "C", -12, 0); lab(s, T2, "T", 0, 18)
    return s, dict(desc="TA tangent at A; ∠TAB equals ∠ACB in the alternate segment")


def parallel_area():
    s = Svg(); y1, y2 = 70, 230; B, C = (90, y2), (250, y2); A, D = (60, y1), (300, y1)
    s.line((20, y1), (340, y1), "t"); s.line((20, y2), (340, y2), "t"); s.poly([A, B, C], "s"); s.poly([D, B, C], "l")
    for p, t, dx, dy in [(A, "A", 0, -8), (D, "D", 0, -8), (B, "B", -8, 18), (C, "C", 8, 18)]: lab(s, p, t, dx, dy)
    return s, dict(desc="ΔABC and ΔDBC on base BC between parallels AD ∥ BC: equal areas")


def midpt():
    s = Svg(); A, B, C = (170, 40), (50, 250), (310, 250); P = ((A[0] + B[0]) / 2, (A[1] + B[1]) / 2); Q = ((A[0] + C[0]) / 2, (A[1] + C[1]) / 2)
    s.poly([A, B, C]); s.line(P, Q, "c"); s.tick(A, P); s.tick(P, B); s.tick(A, Q, 2); s.tick(Q, C, 2)
    for p, t, dx, dy in [(A, "A", 0, -8), (B, "B", -10, 15), (C, "C", 10, 15), (P, "P", -14, 0), (Q, "Q", 14, 0)]: lab(s, p, t, dx, dy)
    return s, dict(desc="P, Q midpoints of AB, AC: PQ ∥ BC and PQ = ½BC", values={"PQ/BC": round(math.dist(P, Q) / math.dist(B, C), 9)})


def similar():
    s = Svg(); A, B, C = (170, 40), (50, 250), (310, 250); k = 0.55
    D = (A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k); E = (A[0] + (C[0] - A[0]) * k, A[1] + (C[1] - A[1]) * k)
    s.poly([A, B, C]); s.line(D, E, "c")
    for p, t, dx, dy in [(A, "A", 0, -8), (B, "B", -10, 15), (C, "C", 10, 15), (D, "D", -14, 0), (E, "E", 14, 0)]: lab(s, p, t, dx, dy)
    return s, dict(desc="DE ∥ BC: ΔADE and ΔABC are equiangular", values={"AD/AB": k, "DE/BC": round(math.dist(D, E) / math.dist(B, C), 9)})


def chords_int():
    s = Svg(); o = (180, 150); r = 120; A, B, C, D = pt(o, r, 160), pt(o, r, 340), pt(o, r, 60), pt(o, r, 250)
    # intersection X of AB and CD
    def inter(p1, p2, p3, p4):
        x1, y1 = p1; x2, y2 = p2; x3, y3 = p3; x4, y4 = p4; den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
        t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den; return (x1 + t * (x2 - x1), y1 + t * (y2 - y1))
    X = inter(A, B, C, D); s.circle(o, r); s.line(A, B); s.line(C, D); s.line(A, C, "t"); s.line(D, B, "t"); s.dot(X)
    for p, t, dx, dy in [(A, "A", -12, 0), (B, "B", 12, 8), (C, "C", 6, -8), (D, "D", -6, 18), (X, "X", 12, -6)]: lab(s, p, t, dx, dy)
    return s, dict(desc="Chords AB and CD meet at X", values={"AX*XB": round(math.dist(A, X) * math.dist(X, B), 4), "CX*XD": round(math.dist(C, X) * math.dist(X, D), 4)})


def right_tri():
    s = Svg(); A, B, C = (60, 60), (60, 250), (300, 250)
    s.poly([A, B, C]); s.right(B, (0, -1), (1, 0), 14)
    for p, t, dx, dy in [(A, "A", -10, -4), (B, "B", -12, 15), (C, "C", 12, 15)]: lab(s, p, t, dx, dy)
    lab(s, (45, 160), "a"); lab(s, (180, 270), "b"); lab(s, (195, 145), "c")
    return s, dict(desc="Right-angled triangle, ∠B = 90°, hypotenuse c = AC")


# --------------------------------------------------------------------------- sets & probability
def venn2():
    s = Svg(); s.poly([(20, 30), (340, 30), (340, 280), (20, 280)], "t"); s.circle((140, 155), 85); s.circle((220, 155), 85)
    lab(s, (35, 52), "U", 0, 0); lab(s, (90, 90), "A"); lab(s, (270, 90), "B"); lab(s, (180, 160), "A∩B", 0, 0)
    return s, dict(desc="Two-set Venn diagram inside universal set U")


def venn3():
    s = Svg(); s.poly([(15, 15), (345, 15), (345, 290), (15, 290)], "t")
    for c in [(140, 120), (220, 120), (180, 190)]: s.circle(c, 80)
    lab(s, (35, 38), "U"); lab(s, (95, 80), "M"); lab(s, (265, 80), "S"); lab(s, (180, 280), "E"); lab(s, (180, 148), "•")
    return s, dict(desc="Three-set Venn diagram (M, S, E); centre = all three")


def prob_grid():
    s = Svg(330, 330); x0, y0, c = 50, 30, 45
    for i in range(7):
        s.line((x0 + i * c, y0), (x0 + i * c, y0 + 6 * c), "t"); s.line((x0, y0 + i * c), (x0 + 6 * c, y0 + i * c), "t")
    for i in range(6):
        lab(s, (x0 + i * c + c / 2, y0 + 6 * c + 18), str(i + 1)); lab(s, (x0 - 14, y0 + (5 - i) * c + c / 2 + 5), str(i + 1))
    for a in range(1, 7):
        for b in range(1, 7):
            if a + b == 7: s.dot((x0 + (a - 1) * c + c / 2, y0 + (6 - b) * c + c / 2), 5)
    return s, dict(desc="Sample space grid for two dice (36 outcomes); dots mark sum = 7 (6 outcomes)", values={"sum7": 6, "total": 36})


def prob_tree():
    s = Svg(); r = (30, 150); a1, a2 = (150, 80), (150, 220)
    s.line(r, a1); s.line(r, a2)
    for p in (a1, a2):
        s.line(p, (300, p[1] - 40)); s.line(p, (300, p[1] + 40))
    lab(s, (a1[0] + 10, a1[1] - 8), "R"); lab(s, (a2[0] + 10, a2[1] + 18), "B")
    for p in (a1, a2):
        lab(s, (315, p[1] - 36), "R"); lab(s, (315, p[1] + 44), "B")
    s.text((80, 105), "p", "sm"); s.text((80, 200), "1−p", "sm"); s.text((225, a1[1] - 28), "q", "sm"); s.text((225, a1[1] + 35), "1−q", "sm")
    return s, dict(desc="Two-stage tree diagram (Red/Blue); multiply along branches")


# --------------------------------------------------------------------------- graphs
def axes(s, xr, yr, X, Y, step=1):
    for x in range(xr[0], xr[1] + 1, step):
        s.line((X(x), Y(yr[0])), (X(x), Y(yr[1])), "g")
        if x != 0: s.text((X(x), Y(0) + 14), str(x), "sm")
    for y in range(yr[0], yr[1] + 1, step):
        s.line((X(xr[0]), Y(y)), (X(xr[1]), Y(y)), "g")
        if y != 0: s.text((X(0) - 8, Y(y) + 4), str(y), "sm", "end")
    s.arrow((X(xr[0]), Y(0)), (X(xr[1]) + 6, Y(0)), "a"); s.arrow((X(0), Y(yr[0])), (X(0), Y(yr[1]) - 6), "a")
    s.text((X(xr[1]) + 6, Y(0) - 8), "x"); s.text((X(0) + 12, Y(yr[1]) - 2), "y"); s.text((X(0) - 8, Y(0) + 14), "0", "sm", "end")


def plotf(s, f, a, b, X, Y, c="c", n=200, ylim=None):
    pts = []
    for i in range(n + 1):
        x = a + (b - a) * i / n; y = f(x)
        if ylim and not (ylim[0] - 0.01 <= y <= ylim[1] + 0.01): continue
        pts.append((X(x), Y(y)))
    s.poly(pts, c, close=False)


def mk(xr, yr, w=W, h=H, pad=30):
    sx = (w - 2 * pad) / (xr[1] - xr[0]); sy = (h - 2 * pad) / (yr[1] - yr[0])
    return (lambda x: pad + (x - xr[0]) * sx), (lambda y: h - pad - (y - yr[0]) * sy)


def gra_line():
    s = Svg(); xr, yr = (-3, 4), (-4, 8); X, Y = mk(xr, yr); axes(s, xr, yr, X, Y)
    f = lambda x: 2 * x + 1; plotf(s, f, -2.5, 3.5, X, Y); s.dot((X(0), Y(1))); s.dot((X(1), Y(3)))
    s.line((X(0), Y(1)), (X(1), Y(1)), "r"); s.line((X(1), Y(1)), (X(1), Y(3)), "r"); s.text((X(0.5), Y(1) + 14), "1", "sm"); s.text((X(1) + 10, Y(2)), "2", "sm")
    return s, dict(desc="y = 2x + 1: gradient 2 (rise 2 for run 1), y-intercept 1", table={"x": [-2, -1, 0, 1, 2, 3], "y": [f(x) for x in [-2, -1, 0, 1, 2, 3]]})


def gra_quad1():
    s = Svg(); xr, yr = (-3, 5), (-5, 6); X, Y = mk(xr, yr); axes(s, xr, yr, X, Y)
    f = lambda x: x * x - 2 * x - 3; plotf(s, f, -2.2, 4.2, X, Y, ylim=yr)
    for x in (-1, 3): s.dot((X(x), Y(0)))
    s.dot((X(1), Y(-4))); s.line((X(1), Y(yr[0])), (X(1), Y(yr[1])), "k"); s.text((X(1) + 26, Y(-4) + 4), "(1, −4)", "sm")
    xs = list(range(-2, 5))
    return s, dict(desc="y = x² − 2x − 3: roots x = −1, 3; turning point (1, −4) minimum; axis x = 1", table={"x": xs, "y": [f(x) for x in xs]})


def gra_quad2():
    s = Svg(); xr, yr = (-4, 4), (-5, 6); X, Y = mk(xr, yr); axes(s, xr, yr, X, Y)
    plotf(s, lambda x: x * x - 4, -3.1, 3.1, X, Y, "c", ylim=yr); plotf(s, lambda x: -x * x + 4, -3.1, 3.1, X, Y, "r", ylim=yr)
    for x in (-2, 2): s.dot((X(x), Y(0)))
    s.text((X(3), Y(5.2)), "y=x²−4", "sm"); s.text((X(-2.9), Y(-3.5)), "y=4−x²", "sm")
    xs = list(range(-3, 4))
    return s, dict(desc="y = x² − 4 (minimum (0, −4)) and y = 4 − x² (maximum (0, 4)); both cut the x-axis at ±2",
                   table={"x": xs, "y1=x^2-4": [x * x - 4 for x in xs], "y2=4-x^2": [4 - x * x for x in xs]})


def numline():
    s = Svg(360, 120); X = lambda x: 30 + (x + 4) * 37
    s.arrow((15, 60), (345, 60), "a")
    for x in range(-4, 5):
        s.line((X(x), 54), (X(x), 66), "t"); s.text((X(x), 86), str(x).replace("-", "−"), "sm")
    s.dot((X(-2), 60), 5); s.odot((X(3), 60), 5); s.line((X(-2), 60), (X(3), 60), "r")
    return s, dict(desc="−2 ≤ x < 3: filled dot at −2 (included), open dot at 3 (not included)")


def region():
    s = Svg(); xr, yr = (-1, 9), (-1, 5); X, Y = mk(xr, yr); axes(s, xr, yr, X, Y)
    s.poly([(X(0), Y(0)), (X(8), Y(0)), (X(0), Y(4))], "s"); plotf(s, lambda x: (8 - x) / 2, -0.5, 8.5, X, Y, "l")
    s.text((X(6), Y(2.6)), "x+2y=8", "sm")
    return s, dict(desc="Region x ≥ 0, y ≥ 0, x + 2y ≤ 8 (shaded); vertices (0,0), (8,0), (0,4)")


# --------------------------------------------------------------------------- statistics
def pie():
    s = Svg(); o = (180, 150); r = 115; angs = [90, 120, 60, 90]; a = 90
    cols = ["#bfdbfe", "#fde68a", "#bbf7d0", "#fecaca"]
    for k, (d, col) in enumerate(zip(angs, cols)):
        p1, p2 = pt(o, r, a), pt(o, r, a - d); large = 1 if d > 180 else 0
        s.e.append(f'<path d="M{o[0]},{o[1]} L{p1[0]:.1f},{p1[1]:.1f} A{r},{r} 0 {large} 1 {p2[0]:.1f},{p2[1]:.1f} Z" fill="{col}" stroke="#1f2937" stroke-width="1.5"/>')
        mid = pt(o, r * 0.6, a - d / 2); s.text((mid[0], mid[1] + 5), f"{d}°"); a -= d
    return s, dict(desc="Pie chart with sector angles 90°, 120°, 60°, 90° (total 360°)", values={"sum": sum(angs)})


def hist():
    s = Svg(); fs = [3, 7, 12, 5, 3]; xr, yr = (-10, 60), (0, 14); X, Y = mk(xr, yr)
    for k, f in enumerate(fs):
        s.poly([(X(10 * k), Y(0)), (X(10 * k + 10), Y(0)), (X(10 * k + 10), Y(f)), (X(10 * k), Y(f))], "s")
    poly = [(X(-5), Y(0))] + [(X(10 * k + 5), Y(f)) for k, f in enumerate(fs)] + [(X(55), Y(0))]
    s.poly(poly, "r", close=False)
    s.line((X(-10), Y(0)), (X(60), Y(0)), "a"); s.line((X(0), Y(0)), (X(0), Y(14)), "a")
    for x in range(0, 51, 10): s.text((X(x), Y(0) + 15), str(x), "sm")
    for y in range(0, 15, 2): s.text((X(0) - 6, Y(y) + 4), str(y), "sm", "end")
    return s, dict(desc="Histogram (classes 0–10 … 40–50, frequencies 3, 7, 12, 5, 3) with frequency polygon through mid-points, closed at 5 below and 55 above", table={"class": ["0-10", "10-20", "20-30", "30-40", "40-50"], "f": fs, "mid": [5, 15, 25, 35, 45]})


def ogive():
    s = Svg(); fs = [4, 8, 16, 8, 4]; cf = [0] + [sum(fs[:i + 1]) for i in range(5)]; xs = [0, 10, 20, 30, 40, 50]
    xr, yr = (0, 50), (0, 40); X, Y = mk(xr, yr)
    for y in range(0, 41, 10): s.line((X(0), Y(y)), (X(50), Y(y)), "g"); s.text((X(0) - 6, Y(y) + 4), str(y), "sm", "end")
    for x in xs: s.text((X(x), Y(0) + 15), str(x), "sm")
    # smooth-ish curve through points (monotone cubic via many linear segments of a PCHIP)
    import bisect
    def pchip(x):
        i = min(max(bisect.bisect_right(xs, x) - 1, 0), 4); h = 10; t = (x - xs[i]) / h
        d = [(cf[j + 1] - cf[j]) / h for j in range(5)]
        m = [d[0]] + [0 if d[j - 1] * d[j] <= 0 else 2 / (1 / d[j - 1] + 1 / d[j]) for j in range(1, 5)] + [d[4]]
        h00, h10, h01, h11 = 2 * t ** 3 - 3 * t ** 2 + 1, t ** 3 - 2 * t ** 2 + t, -2 * t ** 3 + 3 * t ** 2, t ** 3 - t ** 2
        return h00 * cf[i] + h10 * h * m[i] + h01 * cf[i + 1] + h11 * h * m[i + 1]
    plotf(s, pchip, 0, 50, X, Y)
    for x, c in zip(xs, cf): s.dot((X(x), Y(c)))
    s.line((X(0), Y(20)), (X(25), Y(20)), "k"); s.line((X(25), Y(20)), (X(25), Y(0)), "k"); s.text((X(25) + 4, Y(0) - 6), "Q₂", "sm", "start")
    s.line((X(0), Y(0)), (X(50), Y(0)), "a"); s.line((X(0), Y(0)), (X(0), Y(40)), "a")
    return s, dict(desc="Cumulative frequency curve (frequencies 4, 8, 16, 8, 4; plotted at upper boundaries); median at c.f. 20 → 25", table={"upper": xs, "cf": cf}, values={"median": 25})


# --------------------------------------------------------------------------- trigonometry & scale
def bearing():
    s = Svg(); A = (120, 220); B = pt(A, 170, 90 - 60)
    s.arrow(A, (A[0], A[1] - 180), "a"); s.text((A[0], A[1] - 186), "N"); s.line(A, B); s.dot(A); s.dot(B); s.arc(A, 40, 30, 90)
    lab(s, A, "A", -12, 14); lab(s, B, "B", 10, -4); s.text((A[0] + 22, A[1] - 52), "060°", "sm")
    return s, dict(desc="Bearing of B from A is 060° (clockwise from North)")


def elev():
    s = Svg(); P, Q, T = (50, 250), (290, 250), (290, 70)
    s.line(P, Q); s.line(Q, T); s.line(P, T, "c"); s.right(Q, (-1, 0), (0, -1), 12); s.arc(P, 40, 0, math.degrees(math.atan2(180, 240)))
    lab(s, P, "P", -10, 15); lab(s, Q, "Q", 10, 15); lab(s, T, "T", 10, -4); lab(s, (110, 238), "θ"); lab(s, (170, 270), "d"); lab(s, (305, 165), "h")
    return s, dict(desc="Angle of elevation θ from P to the top T of a tower QT; tan θ = h/d")


def depr():
    s = Svg(); T, F = (60, 60), (60, 250); B1, B2 = (320, 250), (190, 250)
    s.line(T, F); s.line(F, B1); s.line(T, B1, "t"); s.line(T, B2, "t"); s.line(T, (340, 60), "k"); s.right(F, (0, -1), (1, 0), 12)
    s.dot(B1); s.dot(B2); lab(s, T, "T", -12, 0); lab(s, F, "F", -12, 15); lab(s, B1, "B₁", 0, 18); lab(s, B2, "B₂", 0, 18)
    return s, dict(desc="Angles of depression from T to boats B₁ (far, smaller angle) and B₂ (near) — measured from the horizontal")


# --------------------------------------------------------------------------- solids
def cyl():
    s = Svg(); cx, top, bot, rx, ry = 180, 70, 230, 80, 22
    s.e.append(f'<ellipse cx="{cx}" cy="{top}" rx="{rx}" ry="{ry}" class="l"/>'); s.line((cx - rx, top), (cx - rx, bot)); s.line((cx + rx, top), (cx + rx, bot))
    s.path(f"M{cx-rx},{bot} A{rx},{ry} 0 0 0 {cx+rx},{bot}"); s.path(f"M{cx-rx},{bot} A{rx},{ry} 0 0 1 {cx+rx},{bot}", "k")
    s.line((cx, top), (cx + rx, top), "t"); lab(s, (cx + 40, top - 6), "r"); s.line((cx + rx + 20, top), (cx + rx + 20, bot), "t"); lab(s, (cx + rx + 32, (top + bot) / 2), "h")
    return s, dict(desc="Cylinder, radius r, height h")


def cone():
    s = Svg(); cx, apex, base, rx, ry = 180, 40, 240, 90, 22
    s.line((cx, apex), (cx - rx, base)); s.line((cx, apex), (cx + rx, base))
    s.path(f"M{cx-rx},{base} A{rx},{ry} 0 0 0 {cx+rx},{base}"); s.path(f"M{cx-rx},{base} A{rx},{ry} 0 0 1 {cx+rx},{base}", "k")
    s.line((cx, apex), (cx, base), "k"); s.line((cx, base), (cx + rx, base), "t"); s.right((cx, base), (1, 0), (0, -1))
    lab(s, (cx - 10, 150), "h"); lab(s, (cx + 45, base + 16), "r"); lab(s, (cx + 58, 140), "l")
    return s, dict(desc="Right circular cone: radius r, height h, slant height l = √(r² + h²)")


def sphere():
    s = Svg(); o = (180, 150); r = 110
    s.circle(o, r, "l"); s.e.append(f'<ellipse cx="{o[0]}" cy="{o[1]}" rx="{r}" ry="28" class="k"/>'); s.line(o, (o[0] + r, o[1]), "t"); s.dot(o); lab(s, (o[0] + 55, o[1] - 8), "r")
    return s, dict(desc="Sphere of radius r")


def hemi():
    s = Svg(); o = (180, 120); r = 120
    s.path(f"M{o[0]-r},{o[1]} A{r},{r} 0 0 0 {o[0]+r},{o[1]}"); s.e.append(f'<ellipse cx="{o[0]}" cy="{o[1]}" rx="{r}" ry="30" class="l"/>'); s.line(o, (o[0] + r, o[1]), "t"); lab(s, (o[0] + 60, o[1] - 8), "r")
    return s, dict(desc="Solid hemisphere: curved surface 2πr² + flat face πr²")


# --------------------------------------------------------------------------- constructions (stages)
def perpbis(stage=3):
    s = Svg(); A, B = (70, 160), (290, 160); rr = 140; s.line(A, B); s.dot(A); s.dot(B); lab(s, A, "A", -12, 5); lab(s, B, "B", 12, 5)
    h = math.sqrt(rr * rr - ((B[0] - A[0]) / 2) ** 2); P, Q = ((A[0] + B[0]) / 2, 160 - h), ((A[0] + B[0]) / 2, 160 + h)
    if stage >= 1:
        for a in (55, -55): s.arc(A, rr, a - 12, a + 12)
    if stage >= 2:
        for a in (125, 235): s.arc(B, rr, a - 12, a + 12)
        s.dot(P); s.dot(Q); lab(s, P, "P", 12, 0); lab(s, Q, "Q", 12, 10)
    if stage >= 3:
        s.line(P, Q, "c"); M = ((A[0] + B[0]) / 2, 160); s.right(M, (1, 0), (0, -1)); lab(s, M, "M", -12, 18)
    return s, dict(desc=f"Perpendicular bisector of AB — stage {stage}/3", values={"AP": round(math.dist(A, P), 6), "BP": round(math.dist(B, P), 6)})


def angbis(stage=3):
    s = Svg(); O = (60, 240); a1, a2 = 0, 60; L = 280; P1, P2 = pt(O, L, a1), pt(O, L, a2)
    s.line(O, P1); s.line(O, P2); lab(s, O, "A", -10, 12); lab(s, P1, "B", 0, 18); lab(s, P2, "C", -6, -6)
    r1 = 110; X, Yp = pt(O, r1, a1), pt(O, r1, a2)
    if stage >= 1: s.arc(O, r1, -8, 68); s.dot(X); s.dot(Yp)
    r2 = 80; # point where arcs from X and Y meet (on the bisector)
    d = math.dist(X, Yp) / 2; m = ((X[0] + Yp[0]) / 2, (X[1] + Yp[1]) / 2); hh = math.sqrt(r2 * r2 - d * d)
    ux, uy = math.cos(math.radians(30)), -math.sin(math.radians(30)); Z = (m[0] + ux * hh, m[1] + uy * hh)
    if stage >= 2:
        s.arc(X, r2, 80, 120); s.arc(Yp, r2, 0, 40); s.dot(Z)
    if stage >= 3: s.line(O, pt(O, 300, 30), "c")
    ang = math.degrees(math.atan2(O[1] - Z[1], Z[0] - O[0]))
    return s, dict(desc=f"Angle bisector of ∠BAC — stage {stage}/3", values={"bisector_angle_deg": round(ang, 6), "half_angle_deg": 30})


def tangent_con(stage=2):
    s = Svg(); o = (150, 160); r = 90; A = pt(o, r, 20); s.circle(o, r); s.dot(o); s.dot(A); lab(s, o, "O", -10, 18); lab(s, A, "A", -6, -10)
    ext = pt(o, r + 110, 20); s.line(o, ext, "t")
    if stage >= 2:
        d = (math.cos(math.radians(110)), -math.sin(math.radians(110))); s.line((A[0] - 120 * d[0], A[1] - 120 * d[1]), (A[0] + 120 * d[0], A[1] + 120 * d[1]), "c")
        u = (math.cos(math.radians(200)), -math.sin(math.radians(200))); s.right(A, u, d)
    return s, dict(desc=f"Tangent at A: extend OA and construct the perpendicular at A — stage {stage}/2")


def circum(stage=2):
    s = Svg(); A, B, C = (120, 70), (60, 250), (300, 230); s.poly([A, B, C])
    # circumcentre
    ax, ay = A; bx, by = B; cx, cy = C; d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by))
    ux = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / d
    uy = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / d
    O = (ux, uy); R = math.dist(O, A)
    for P1, P2 in [(A, B), (B, C)]:
        m = ((P1[0] + P2[0]) / 2, (P1[1] + P2[1]) / 2); dx, dy = P2[0] - P1[0], P2[1] - P1[1]; L = math.hypot(dx, dy); nx, ny = -dy / L, dx / L
        s.line((m[0] - nx * 150, m[1] - ny * 150), (m[0] + nx * 150, m[1] + ny * 150), "k")
    s.dot(O); lab(s, O, "O", 12, -4)
    if stage >= 2: s.circle(O, R)
    for p, t, dx, dy in [(A, "A", -8, -8), (B, "B", -12, 12), (C, "C", 12, 12)]: lab(s, p, t, dx, dy)
    return s, dict(desc=f"Circumcircle: perpendicular bisectors meet at O — stage {stage}/2", values={"OA": round(R, 6), "OB": round(math.dist(O, B), 6), "OC": round(math.dist(O, C), 6)})


ASSETS = {
    # folder, id: fn
    ("Geometry", "GEO-SECTOR-01"): sector, ("Geometry", "GEO-COMPOSITE-01"): composite, ("Geometry", "GEO-TRAP-SEMI-01"): trap_semi,
    ("Geometry", "GEO-ISOS-BISECT-01"): isos_bisect, ("Geometry", "GEO-EXTANGLE-01"): ext_angle, ("Geometry", "GEO-PARA-01"): para,
    ("Geometry", "GEO-CHORD-01"): chord, ("Geometry", "GEO-CIRC-CENTRE-01"): circ_centre, ("Geometry", "GEO-CIRC-SEMI-01"): circ_semi,
    ("Geometry", "GEO-CIRC-SAMESEG-01"): circ_sameseg, ("Geometry", "GEO-CYCLIC-01"): cyclic, ("Geometry", "GEO-TANGENT-01"): tangent1,
    ("Geometry", "GEO-TANGENT-02"): tangent2, ("Geometry", "GEO-ALTSEG-01"): altseg, ("Geometry", "GEO-PARALLEL-AREA-01"): parallel_area,
    ("Geometry", "GEO-MIDPT-01"): midpt, ("Geometry", "GEO-SIMILAR-01"): similar, ("Geometry", "GEO-CHORDS-INT-01"): chords_int, ("Geometry", "GEO-RIGHT-01"): right_tri,
    ("Other_Diagrams", "SET-VENN2-01"): venn2, ("Other_Diagrams", "SET-VENN3-01"): venn3, ("Other_Diagrams", "PRO-GRID-01"): prob_grid, ("Other_Diagrams", "PRO-TREE-01"): prob_tree,
    ("Graphs", "GRA-LINE-01"): gra_line, ("Graphs", "GRA-QUAD-01"): gra_quad1, ("Graphs", "GRA-QUAD-02"): gra_quad2, ("Graphs", "GRA-NUMLINE-01"): numline, ("Graphs", "GRA-REGION-01"): region,
    ("Statistical_Charts", "STA-PIE-01"): pie, ("Statistical_Charts", "STA-HIST-01"): hist, ("Statistical_Charts", "STA-OGIVE-01"): ogive,
    ("Other_Diagrams", "TRI-BEARING-01"): bearing, ("Other_Diagrams", "TRI-ELEV-01"): elev, ("Other_Diagrams", "TRI-DEPR-01"): depr,
    ("Other_Diagrams", "SOL-CYL-01"): cyl, ("Other_Diagrams", "SOL-CONE-01"): cone, ("Other_Diagrams", "SOL-SPHERE-01"): sphere, ("Other_Diagrams", "SOL-HEMI-01"): hemi,
    ("Constructions", "CON-PERPBIS-01"): perpbis, ("Constructions", "CON-ANGBIS-01"): angbis, ("Constructions", "CON-TANGENT-01"): tangent_con, ("Constructions", "CON-CIRCUM-01"): circum,
}
STAGES = {"CON-PERPBIS-01": (perpbis, 3), "CON-ANGBIS-01": (angbis, 3), "CON-TANGENT-01": (tangent_con, 2), "CON-CIRCUM-01": (circum, 2)}


def write_all(root):
    manifest = []
    for (folder, aid), fn in ASSETS.items():
        s, meta = fn(); p = os.path.join(root, folder, f"{aid}.svg"); os.makedirs(os.path.dirname(p), exist_ok=True)
        open(p, "w", encoding="utf-8").write(s.svg()); manifest.append(dict(id=aid, path=f"Shared_Assets/{folder}/{aid}.svg", **meta))
        if aid in STAGES:
            f2, k = STAGES[aid]
            for st in range(1, k + 1):
                s2, m2 = f2(st); p2 = os.path.join(root, folder, f"{aid}-S{st}.svg"); open(p2, "w", encoding="utf-8").write(s2.svg())
                manifest.append(dict(id=f"{aid}-S{st}", path=f"Shared_Assets/{folder}/{aid}-S{st}.svg", **m2))
    return manifest
