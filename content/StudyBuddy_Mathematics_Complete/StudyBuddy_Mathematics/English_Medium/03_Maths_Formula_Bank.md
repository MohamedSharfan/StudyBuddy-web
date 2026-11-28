# StudyBuddy — GCE O/L Mathematics · 03 Formula Bank

*Your Virtual Learning Partner · studybuddy.com.lk · English Medium*

<!-- meta {"file": "03", "medium": "en", "schema": "StudyBuddy-Maths-1.0"} -->

Every formula, theorem and construction rule used in the syllabus, organised by chapter, with a verified worked example for each.


## G10C01 — Perimeter

### F-MEN-CIRC — Circumference of a circle
<!-- meta {"id": "F-MEN-CIRC", "chapter": "G10C01", "supplied": false, "medium": "en"} -->

$$C = 2\pi r = \pi d$$

- **Symbols:** r radius, d diameter
- **Units:** cm, m
- **When to use:** Length around a whole circle or a semicircle (half).
- **When not to use / conditions:** Not for area.
- **Rearrangement:** $r = \frac{C}{2\pi}$
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C01-G-RECT_SEMIC-01
<!-- meta {"id": "MQ-G10C01-G-RECT_SEMIC-01", "grade": 10, "chapter": "G10C01", "area": "MEN", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "F-MEN-CIRC", "diagram": "GEO-COMPOSITE-01", "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C01-G-RECT_SEMIC-01-S1", "MQ-G10C01-G-RECT_SEMIC-01-S2", "MQ-G10C01-G-RECT_SEMIC-01-S3", "MQ-G10C01-G-RECT_SEMIC-01-S4"]} -->
**Topic:** Perimeter · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `F-MEN-CIRC`

**Question:** A shape is a rectangle 20 cm long and 14 cm wide, with a semicircle drawn outward on one 14 cm side (that side is removed). Find the perimeter of the shape. (π = 22/7)

**Diagram:** `GEO-COMPOSITE-01` → `Shared_Assets/Geometry/GEO-COMPOSITE-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Radius of the semicircle = half of the width. <!-- MQ-G10C01-G-RECT_SEMIC-01-S1 -->

$$r = 14\div 2 = 7\ \text{cm}$$

Step 2 — Curved edge = half the circumference. <!-- MQ-G10C01-G-RECT_SEMIC-01-S2 -->

$$\pi r = \frac{22}{7}\times 7 = 22\ \text{cm}$$

Step 3 — Add the straight edges: two lengths and one width. <!-- MQ-G10C01-G-RECT_SEMIC-01-S3 -->

$$20+20+14 = 54\ \text{cm}$$

Step 4 — Total perimeter. <!-- MQ-G10C01-G-RECT_SEMIC-01-S4 -->

$$P = 54 + 22 = 76\ \text{cm}$$

**Final answer:** $76$ cm
<br>**Accepted answer formats:** $76$ · **Unit:** cm

> ⚠️ **Common mistake:** Including the hidden side under the semicircle.

<sub>Verification: machine-checked</sub>

### F-MEN-ARC — Arc length of a sector
<!-- meta {"id": "F-MEN-ARC", "chapter": "G10C01", "supplied": false, "medium": "en"} -->

$$l = 2\pi r\times\frac{\theta}{360}$$

- **Symbols:** r radius, θ centre angle in degrees
- **Units:** cm, m
- **When to use:** Curved edge of a sector.
- **When not to use / conditions:** Perimeter of a sector also needs + 2r.
- **Rearrangement:** $\theta = \frac{360\,l}{2\pi r}$
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C01-F-SECTOR_PER-01
<!-- meta {"id": "MQ-G10C01-F-SECTOR_PER-01", "grade": 10, "chapter": "G10C01", "area": "MEN", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-MEN-ARC", "diagram": "GEO-SECTOR-01", "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C01-F-SECTOR_PER-01-S1", "MQ-G10C01-F-SECTOR_PER-01-S2", "MQ-G10C01-F-SECTOR_PER-01-S3", "MQ-G10C01-F-SECTOR_PER-01-S4"]} -->
**Topic:** Perimeter · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-MEN-ARC`

**Question:** A sector has radius 7 cm and centre angle 90°. Find its perimeter. (Take π = 22/7.)

**Diagram:** `GEO-SECTOR-01` → `Shared_Assets/Geometry/GEO-SECTOR-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Write the arc length formula. <!-- MQ-G10C01-F-SECTOR_PER-01-S1 -->

$$l = 2\pi r \times \frac{\theta}{360}$$

Step 2 — Substitute r and θ. <!-- MQ-G10C01-F-SECTOR_PER-01-S2 -->

$$l = 2\times\frac{22}{7}\times 7\times\frac{90}{360}$$

Step 3 — Simplify the arc length. <!-- MQ-G10C01-F-SECTOR_PER-01-S3 -->

$$l = 11\ \text{cm}$$

Step 4 — Perimeter = arc + two radii. <!-- MQ-G10C01-F-SECTOR_PER-01-S4 -->

$$P = 11 + 7 + 7 = 25\ \text{cm}$$

**Final answer:** $25$ cm
<br>**Accepted answer formats:** $25$ · **Unit:** cm

> ⚠️ **Common mistake:** Forgetting to add the two radii.

<sub>Verification: machine-checked</sub>


## G10C02 — Square Root

### F-NUM-SQRT — Square root
<!-- meta {"id": "F-NUM-SQRT", "chapter": "G10C02", "supplied": false, "medium": "en"} -->

$$\sqrt{n}\times\sqrt{n} = n$$

- **Symbols:** n a positive number
- **Units:** —
- **When to use:** Finding a side of a square from its area; approximations.
- **When not to use / conditions:** Negative numbers have no real square root.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C02-F-SQRT_PRIME-01
<!-- meta {"id": "MQ-G10C02-F-SQRT_PRIME-01", "grade": 10, "chapter": "G10C02", "area": "NUM", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-NUM-SQRT", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C02-F-SQRT_PRIME-01-S1", "MQ-G10C02-F-SQRT_PRIME-01-S2", "MQ-G10C02-F-SQRT_PRIME-01-S3"]} -->
**Topic:** Square Root · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-NUM-SQRT`

**Question:** Find √1296 using prime factors.

**Step-by-step solution**

Step 1 — Write the number as a product of prime factors, in pairs. <!-- MQ-G10C02-F-SQRT_PRIME-01-S1 -->

$$1296 = (2\times 2)\times(2\times 2)\times(3\times 3)\times(3\times 3)$$

Step 2 — Take one factor from each pair. <!-- MQ-G10C02-F-SQRT_PRIME-01-S2 -->

$$\sqrt{1296} = 2\times2\times3\times3$$

Step 3 — Multiply. <!-- MQ-G10C02-F-SQRT_PRIME-01-S3 -->

$$\sqrt{1296} = 36$$

**Final answer:** $36$
<br>**Accepted answer formats:** $36$

<sub>Verification: machine-checked</sub>


## G10C03 — Fractions

### F-NUM-FRAC — Fraction operations
<!-- meta {"id": "F-NUM-FRAC", "chapter": "G10C03", "supplied": false, "medium": "en"} -->

$$\frac ab\pm\frac cd = \frac{ad\pm bc}{bd},\quad \frac ab\div\frac cd = \frac ab\times\frac dc$$

- **Symbols:** a, b, c, d whole numbers, b, d ≠ 0
- **Units:** —
- **When to use:** Any fraction calculation.
- **When not to use / conditions:** Never add denominators.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C03-F-ADD_MIXED-01
<!-- meta {"id": "MQ-G10C03-F-ADD_MIXED-01", "grade": 10, "chapter": "G10C03", "area": "NUM", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-NUM-FRAC", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C03-F-ADD_MIXED-01-S1", "MQ-G10C03-F-ADD_MIXED-01-S2", "MQ-G10C03-F-ADD_MIXED-01-S3", "MQ-G10C03-F-ADD_MIXED-01-S4"]} -->
**Topic:** Fractions · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-NUM-FRAC`

**Question:** Simplify: $2\tfrac{1}{3} + 1\tfrac{1}{6}$

**Step-by-step solution**

Step 1 — Change mixed numbers to improper fractions. <!-- MQ-G10C03-F-ADD_MIXED-01-S1 -->

$$2\tfrac{1}{3} = \frac{7}{3},\quad 1\tfrac{1}{6} = \frac{7}{6}$$

Step 2 — Use the common denominator 6. <!-- MQ-G10C03-F-ADD_MIXED-01-S2 -->

$$\frac{7}{3} + \frac{7}{6} = \frac{14}{6} + \frac{7}{6}$$

Step 3 — Add the numerators. <!-- MQ-G10C03-F-ADD_MIXED-01-S3 -->

$$= \frac{21}{6} = \frac{7}{2}$$

Step 4 — Write as a mixed number. <!-- MQ-G10C03-F-ADD_MIXED-01-S4 -->

$$= 3\tfrac{1}{2}$$

**Final answer:** $3\tfrac{1}{2}$
<br>**Accepted answer formats:** $3\tfrac{1}{2}$, $\frac{7}{2}$

> ⚠️ **Common mistake:** Adding denominators together (e.g. 1/2 + 1/3 = 2/5 is wrong).

<sub>Verification: machine-checked</sub>


## G10C04 — Binomial Expressions

### F-ALG-SQ — Square of a binomial
<!-- meta {"id": "F-ALG-SQ", "chapter": "G10C04", "supplied": false, "medium": "en"} -->

$$(a\pm b)^2 = a^2 \pm 2ab + b^2$$

- **Symbols:** a, b terms
- **Units:** —
- **When to use:** Expanding (x + k)², mental squares.
- **When not to use / conditions:** (a + b)² ≠ a² + b².
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C04-F-SQUARE_BIN-01
<!-- meta {"id": "MQ-G10C04-F-SQUARE_BIN-01", "grade": 10, "chapter": "G10C04", "area": "ALG", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-ALG-SQ", "diagram": null, "kind": "algebra", "verification": "machine-checked", "steps": ["MQ-G10C04-F-SQUARE_BIN-01-S1", "MQ-G10C04-F-SQUARE_BIN-01-S2"]} -->
**Topic:** Binomial Expressions · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-ALG-SQ`

**Question:** Expand: $(x + 3)^2$

**Step-by-step solution**

Step 1 — Use (a ± b)² = a² ± 2ab + b². <!-- MQ-G10C04-F-SQUARE_BIN-01-S1 -->

$$(x + 3)^2 = x^2 + 2\times x\times 3 + 3^2$$

Step 2 — Simplify each term. <!-- MQ-G10C04-F-SQUARE_BIN-01-S2 -->

$$= x^{2} + 6x + 9$$

**Final answer:** $x^{2} + 6x + 9$

> ⚠️ **Common mistake:** Writing (x + a)² = x² + a² (missing the middle term).

<sub>Verification: machine-checked</sub>


## G10C05 — Congruence of Triangles

### T-GEO-CONG — Congruence conditions
<!-- meta {"id": "T-GEO-CONG", "chapter": "G10C05", "supplied": false, "medium": "en"} -->

$$\text{SAS, ASA, AAS, SSS, RHS}$$

- **Symbols:** —
- **Units:** —
- **When to use:** Proving two triangles identical.
- **When not to use / conditions:** Not AAA or SSA.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C05-F-CONG_CONDI-01
<!-- meta {"id": "MQ-G10C05-F-CONG_CONDI-01", "grade": 10, "chapter": "G10C05", "area": "GEO", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "T-GEO-CONG", "diagram": null, "kind": "concept", "verification": "logic-review", "steps": ["MQ-G10C05-F-CONG_CONDI-01-S1", "MQ-G10C05-F-CONG_CONDI-01-S2"]} -->
**Topic:** Congruence of Triangles · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `T-GEO-CONG`

**Question:** In triangles ABC and PQR: AB = PQ, ∠B = ∠Q, BC = QR. Which condition shows ΔABC ≡ ΔPQR?

**Step-by-step solution**

Step 1 — List the equal parts in order around the triangle. <!-- MQ-G10C05-F-CONG_CONDI-01-S1 -->

$$\text{AB = PQ, ∠B = ∠Q, BC = QR}$$

Step 2 — Match the pattern to a condition. <!-- MQ-G10C05-F-CONG_CONDI-01-S2 -->

$$\Rightarrow \text{SAS}$$

**Final answer:** $SAS (ப.கோ.ப)$

> ⚠️ **Common mistake:** Using AAA — equal angles alone do not prove congruence.

<sub>Verification: logic-reviewed (teacher review recommended)</sub>


## G10C06 — Area

### F-MEN-SECTA — Area of a sector
<!-- meta {"id": "F-MEN-SECTA", "chapter": "G10C06", "supplied": false, "medium": "en"} -->

$$A = \pi r^2\times\frac{\theta}{360}$$

- **Symbols:** r radius, θ centre angle
- **Units:** cm², m²
- **When to use:** Area of a 'pizza slice' of a circle.
- **When not to use / conditions:** Not for arc length.
- **Rearrangement:** $r = \sqrt{\frac{360A}{\pi\theta}}$
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C06-F-SECTOR_ARE-01
<!-- meta {"id": "MQ-G10C06-F-SECTOR_ARE-01", "grade": 10, "chapter": "G10C06", "area": "MEN", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-MEN-SECTA", "diagram": "GEO-SECTOR-01", "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C06-F-SECTOR_ARE-01-S1", "MQ-G10C06-F-SECTOR_ARE-01-S2", "MQ-G10C06-F-SECTOR_ARE-01-S3"]} -->
**Topic:** Area · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-MEN-SECTA`

**Question:** Find the area of a sector of radius 14 cm with centre angle 60°. (π = 22/7)

**Diagram:** `GEO-SECTOR-01` → `Shared_Assets/Geometry/GEO-SECTOR-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Write the formula. <!-- MQ-G10C06-F-SECTOR_ARE-01-S1 -->

$$A = \pi r^2\times\frac{\theta}{360}$$

Step 2 — Substitute. <!-- MQ-G10C06-F-SECTOR_ARE-01-S2 -->

$$A = \frac{22}{7}\times 14\times 14\times\frac{60}{360}$$

Step 3 — Simplify. <!-- MQ-G10C06-F-SECTOR_ARE-01-S3 -->

$$A = \frac{308}{3}\ \text{cm}^2$$

**Final answer:** $\frac{308}{3}\ \text{cm}^2$
<br>**Accepted answer formats:** $\frac{308}{3}\ \text{cm}^2$ · **Unit:** cm²

> ⚠️ **Common mistake:** Using 2πr (length) instead of πr² (area).

<sub>Verification: machine-checked</sub>

### F-MEN-TRAP — Area of a trapezium
<!-- meta {"id": "F-MEN-TRAP", "chapter": "G10C06", "supplied": false, "medium": "en"} -->

$$A = \frac12(a+b)h$$

- **Symbols:** a, b parallel sides, h perpendicular height
- **Units:** cm², m²
- **When to use:** Quadrilateral with one pair of parallel sides.
- **When not to use / conditions:** h is NOT the slanted side.
- **Rearrangement:** $h = \frac{2A}{a+b}$
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C06-G-TRAPEZIUM_-01
<!-- meta {"id": "MQ-G10C06-G-TRAPEZIUM_-01", "grade": 10, "chapter": "G10C06", "area": "MEN", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "F-MEN-TRAP", "diagram": "GEO-TRAP-SEMI-01", "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C06-G-TRAPEZIUM_-01-S1", "MQ-G10C06-G-TRAPEZIUM_-01-S2", "MQ-G10C06-G-TRAPEZIUM_-01-S3"]} -->
**Topic:** Area · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `F-MEN-TRAP`

**Question:** A lamina is made of a trapezium with parallel sides 10 cm and 14 cm and perpendicular height 7 cm, joined to a semicircle of radius 7 cm. Find the total area. (π = 22/7)

**Diagram:** `GEO-TRAP-SEMI-01` → `Shared_Assets/Geometry/GEO-TRAP-SEMI-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Area of the trapezium. <!-- MQ-G10C06-G-TRAPEZIUM_-01-S1 -->

$$\frac{1}{2}(10+14)\times 7 = 84\ \text{cm}^2$$

Step 2 — Area of the semicircle. <!-- MQ-G10C06-G-TRAPEZIUM_-01-S2 -->

$$\frac{1}{2}\times\frac{22}{7}\times 7^2 = 77\ \text{cm}^2$$

Step 3 — Add the two areas. <!-- MQ-G10C06-G-TRAPEZIUM_-01-S3 -->

$$84 + 77 = 161\ \text{cm}^2$$

**Final answer:** $161\ \text{cm}^2$
<br>**Accepted answer formats:** $161\ \text{cm}^2$ · **Unit:** cm²

> ⚠️ **Common mistake:** Forgetting the ½ in the semicircle area.

<sub>Verification: machine-checked</sub>


## G10C07 — Factors of Quadratic Expressions

### F-ALG-DOS — Difference of two squares
<!-- meta {"id": "F-ALG-DOS", "chapter": "G10C07", "supplied": false, "medium": "en"} -->

$$a^2 - b^2 = (a+b)(a-b)$$

- **Symbols:** a, b terms
- **Units:** —
- **When to use:** Two perfect squares with a minus sign.
- **When not to use / conditions:** a² + b² does not factorise.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C07-A-FACTOR_DOS-01
<!-- meta {"id": "MQ-G10C07-A-FACTOR_DOS-01", "grade": 10, "chapter": "G10C07", "area": "ALG", "medium": "en", "pathway": "A Grade Mastery", "difficulty": "hard", "formula": "F-ALG-DOS", "diagram": null, "kind": "algebra", "verification": "machine-checked", "steps": ["MQ-G10C07-A-FACTOR_DOS-01-S1", "MQ-G10C07-A-FACTOR_DOS-01-S2", "MQ-G10C07-A-FACTOR_DOS-01-S3"]} -->
**Topic:** Factors of Quadratic Expressions · **Pathway:** A Grade Mastery · **Difficulty:** hard · **Formula:** `F-ALG-DOS`

**Question:** Factorise completely: $5x^2 - 245$

**Step-by-step solution**

Step 1 — Take out the common factor. <!-- MQ-G10C07-A-FACTOR_DOS-01-S1 -->

$$5x^2 - 245 = 5(x^2 - 49)$$

Step 2 — Recognise a difference of two squares. <!-- MQ-G10C07-A-FACTOR_DOS-01-S2 -->

$$x^2 - 49 = x^2 - 7^2$$

Step 3 — Use a² − b² = (a + b)(a − b). <!-- MQ-G10C07-A-FACTOR_DOS-01-S3 -->

$$= 5(x+7)(x-7)$$

**Final answer:** $5(x+7)(x-7)$

> ⚠️ **Common mistake:** Stopping at k(x² − a²) — 'completely' means factorise the bracket too.

<sub>Verification: machine-checked</sub>

### F-ALG-FACT — Factorising a quadratic
<!-- meta {"id": "F-ALG-FACT", "chapter": "G10C07", "supplied": false, "medium": "en"} -->

$$ax^2+bx+c:\ \text{find } p,q:\ pq = ac,\ p+q = b$$

- **Symbols:** a, b, c coefficients
- **Units:** —
- **When to use:** Trinomials of degree 2.
- **When not to use / conditions:** If no integers p, q exist, use the formula (Grade 11).
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C07-F-FACTOR_MON-01
<!-- meta {"id": "MQ-G10C07-F-FACTOR_MON-01", "grade": 10, "chapter": "G10C07", "area": "ALG", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-ALG-FACT", "diagram": null, "kind": "algebra", "verification": "machine-checked", "steps": ["MQ-G10C07-F-FACTOR_MON-01-S1", "MQ-G10C07-F-FACTOR_MON-01-S2", "MQ-G10C07-F-FACTOR_MON-01-S3", "MQ-G10C07-F-FACTOR_MON-01-S4"]} -->
**Topic:** Factors of Quadratic Expressions · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-ALG-FACT`

**Question:** Factorise: $x^{2} + 3x - 10$

**Step-by-step solution**

Step 1 — Find two numbers whose product is -10 and sum is 3. <!-- MQ-G10C07-F-FACTOR_MON-01-S1 -->

$$-2\times 5 = -10,\quad -2 + (5) = 3$$

Step 2 — Split the middle term. <!-- MQ-G10C07-F-FACTOR_MON-01-S2 -->

$$x^2  - 2x  + 5x  - 10$$

Step 3 — Group and take common factors. <!-- MQ-G10C07-F-FACTOR_MON-01-S3 -->

$$x(x  - 2)  + 5(x  - 2)$$

Step 4 — Final factors. <!-- MQ-G10C07-F-FACTOR_MON-01-S4 -->

$$(x  - 2)(x  + 5)$$

**Final answer:** $(x  - 2)(x  + 5)$

> ⚠️ **Common mistake:** Choosing numbers with the right product but wrong sign.

<sub>Verification: machine-checked</sub>


## G10C08 — Triangles I

### T-GEO-TRISUM — Angle sum of a triangle
<!-- meta {"id": "T-GEO-TRISUM", "chapter": "G10C08", "supplied": false, "medium": "en"} -->

$$\angle A+\angle B+\angle C = 180^\circ$$

- **Symbols:** —
- **Units:** °
- **When to use:** Finding a missing angle.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C08-F-ANGLE_SUM-01
<!-- meta {"id": "MQ-G10C08-F-ANGLE_SUM-01", "grade": 10, "chapter": "G10C08", "area": "GEO", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "T-GEO-TRISUM", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C08-F-ANGLE_SUM-01-S1", "MQ-G10C08-F-ANGLE_SUM-01-S2", "MQ-G10C08-F-ANGLE_SUM-01-S3"]} -->
**Topic:** Triangles I · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `T-GEO-TRISUM`

**Question:** Two angles of a triangle are 48° and 67°. Find the third angle.

**Step-by-step solution**

Step 1 — Angles of a triangle add up to 180°. <!-- MQ-G10C08-F-ANGLE_SUM-01-S1 -->

$$x + 48 + 67 = 180$$

Step 2 — Add the known angles. <!-- MQ-G10C08-F-ANGLE_SUM-01-S2 -->

$$x + 115 = 180$$

Step 3 — Subtract. <!-- MQ-G10C08-F-ANGLE_SUM-01-S3 -->

$$x = 180 - 115 = 65^\circ$$

**Final answer:** $65^\circ$
<br>**Accepted answer formats:** $65^\circ$ · **Unit:** °

<sub>Verification: machine-checked</sub>

### T-GEO-EXT — Exterior angle theorem
<!-- meta {"id": "T-GEO-EXT", "chapter": "G10C08", "supplied": false, "medium": "en"} -->

$$\angle ACD = \angle A + \angle B$$

- **Symbols:** BC produced to D
- **Units:** °
- **When to use:** Angles outside a triangle.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C08-G-EXTERIOR_A-01
<!-- meta {"id": "MQ-G10C08-G-EXTERIOR_A-01", "grade": 10, "chapter": "G10C08", "area": "GEO", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "T-GEO-EXT", "diagram": "GEO-EXTANGLE-01", "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C08-G-EXTERIOR_A-01-S1", "MQ-G10C08-G-EXTERIOR_A-01-S2"]} -->
**Topic:** Triangles I · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `T-GEO-EXT`

**Question:** In ΔABC, BC is produced to D. ∠BAC = 55° and ∠ABC = 80°. Find ∠ACD.

**Diagram:** `GEO-EXTANGLE-01` → `Shared_Assets/Geometry/GEO-EXTANGLE-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Exterior angle = sum of the two interior opposite angles. <!-- MQ-G10C08-G-EXTERIOR_A-01-S1 -->

$$\angle ACD = \angle BAC + \angle ABC$$

Step 2 — Substitute. <!-- MQ-G10C08-G-EXTERIOR_A-01-S2 -->

$$\angle ACD = 55^\circ + 80^\circ = 135^\circ$$

**Final answer:** $135^\circ$
<br>**Accepted answer formats:** $135^\circ$ · **Unit:** °

<sub>Verification: machine-checked</sub>


## G10C09 — Triangles II

### T-GEO-ISOS — Isosceles triangle theorem
<!-- meta {"id": "T-GEO-ISOS", "chapter": "G10C09", "supplied": false, "medium": "en"} -->

$$AB = AC \iff \angle B = \angle C$$

- **Symbols:** —
- **Units:** —
- **When to use:** Equal sides ↔ equal angles.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C09-F-ISOSCELES_-01
<!-- meta {"id": "MQ-G10C09-F-ISOSCELES_-01", "grade": 10, "chapter": "G10C09", "area": "GEO", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "T-GEO-ISOS", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C09-F-ISOSCELES_-01-S1", "MQ-G10C09-F-ISOSCELES_-01-S2", "MQ-G10C09-F-ISOSCELES_-01-S3"]} -->
**Topic:** Triangles II · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `T-GEO-ISOS`

**Question:** In ΔABC, AB = AC and ∠BAC = 100°. Find ∠ABC.

**Step-by-step solution**

Step 1 — Angles opposite equal sides are equal. <!-- MQ-G10C09-F-ISOSCELES_-01-S1 -->

$$\angle ABC = \angle ACB = y$$

Step 2 — Use the angle sum. <!-- MQ-G10C09-F-ISOSCELES_-01-S2 -->

$$100 + y + y = 180 \Rightarrow 2y = 80$$

Step 3 — Divide by 2. <!-- MQ-G10C09-F-ISOSCELES_-01-S3 -->

$$y = 40^\circ$$

**Final answer:** $40^\circ$
<br>**Accepted answer formats:** $40^\circ$ · **Unit:** °

<sub>Verification: machine-checked</sub>


## G10C10 — Inverse Proportions

### F-NUM-INV — Inverse proportion
<!-- meta {"id": "F-NUM-INV", "chapter": "G10C10", "supplied": false, "medium": "en"} -->

$$x_1y_1 = x_2y_2$$

- **Symbols:** x, y inversely proportional
- **Units:** —
- **When to use:** Workers–days, speed–time.
- **When not to use / conditions:** Not when both increase together.
- **Rearrangement:** $y_2 = \frac{x_1y_1}{x_2}$
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C10-F-MEN_DAYS-01
<!-- meta {"id": "MQ-G10C10-F-MEN_DAYS-01", "grade": 10, "chapter": "G10C10", "area": "NUM", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-NUM-INV", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C10-F-MEN_DAYS-01-S1", "MQ-G10C10-F-MEN_DAYS-01-S2"]} -->
**Topic:** Inverse Proportions · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-NUM-INV`

**Question:** 12 workers can finish a job in 5 days. How many days will 15 workers take (working at the same rate)?

**Step-by-step solution**

Step 1 — Find the total work in worker-days. <!-- MQ-G10C10-F-MEN_DAYS-01-S1 -->

$$12\times 5 = 60\ \text{worker-days}$$

Step 2 — Divide by the new number of workers. <!-- MQ-G10C10-F-MEN_DAYS-01-S2 -->

$$60\div 15 = 4\ \text{days}$$

**Final answer:** $4\ \text{days}$
<br>**Accepted answer formats:** $4\ \text{days}$ · **Unit:** days

> ⚠️ **Common mistake:** Using direct proportion (multiplying by m2/m1).

<sub>Verification: machine-checked</sub>


## G10C11 — Data Representation

### F-STA-PIE — Pie chart angle
<!-- meta {"id": "F-STA-PIE", "chapter": "G10C11", "supplied": false, "medium": "en"} -->

$$\theta = \frac{\text{part}}{\text{total}}\times 360^\circ$$

- **Symbols:** —
- **Units:** °
- **When to use:** Drawing/reading pie charts.
- **When not to use / conditions:** Angles must total 360°.
- **Rearrangement:** $\text{part} = \frac{\theta}{360}\times\text{total}$
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C11-F-PIE_ANGLE-01
<!-- meta {"id": "MQ-G10C11-F-PIE_ANGLE-01", "grade": 10, "chapter": "G10C11", "area": "STA", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-STA-PIE", "diagram": "STA-PIE-01", "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C11-F-PIE_ANGLE-01-S1", "MQ-G10C11-F-PIE_ANGLE-01-S2"]} -->
**Topic:** Data Representation · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-STA-PIE`

**Question:** In a survey of 360 students, 45 chose cricket. Find the angle of the cricket sector in a pie chart.

**Diagram:** `STA-PIE-01` → `Shared_Assets/Statistical_Charts/STA-PIE-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Angle = (part ÷ total) × 360°. <!-- MQ-G10C11-F-PIE_ANGLE-01-S1 -->

$$\frac{45}{360}\times 360^\circ$$

Step 2 — Calculate. <!-- MQ-G10C11-F-PIE_ANGLE-01-S2 -->

$$= 45^\circ$$

**Final answer:** $45^\circ$
<br>**Accepted answer formats:** $45^\circ$ · **Unit:** °

<sub>Verification: machine-checked</sub>


## G10C12 — Least Common Multiple of Algebraic Expressions

### F-ALG-LCM — LCM of algebraic expressions
<!-- meta {"id": "F-ALG-LCM", "chapter": "G10C12", "supplied": false, "medium": "en"} -->

$$\text{LCM} = \prod(\text{each factor})^{\text{highest power}}$$

- **Symbols:** factors after complete factorisation
- **Units:** —
- **When to use:** Adding algebraic fractions; LCM questions.
- **When not to use / conditions:** HCF uses the lowest power.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C12-F-LCM_MONO-01
<!-- meta {"id": "MQ-G10C12-F-LCM_MONO-01", "grade": 10, "chapter": "G10C12", "area": "ALG", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-ALG-LCM", "diagram": null, "kind": "algebra", "verification": "logic-review", "steps": ["MQ-G10C12-F-LCM_MONO-01-S1", "MQ-G10C12-F-LCM_MONO-01-S2", "MQ-G10C12-F-LCM_MONO-01-S3"]} -->
**Topic:** Least Common Multiple of Algebraic Expressions · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-ALG-LCM`

**Question:** Find the LCM of $3a^2$ and $9ab$.

**Step-by-step solution**

Step 1 — LCM of the numbers. <!-- MQ-G10C12-F-LCM_MONO-01-S1 -->

$$\text{LCM}(3,9) = 9$$

Step 2 — For each letter take the highest power. <!-- MQ-G10C12-F-LCM_MONO-01-S2 -->

$$a^{2},\ b^{1}$$

Step 3 — Multiply together. <!-- MQ-G10C12-F-LCM_MONO-01-S3 -->

$$\text{LCM} = 9a^2b$$

**Final answer:** $9a^2b$

> ⚠️ **Common mistake:** Taking the lowest power (that gives the HCF).

<sub>Verification: logic-reviewed (teacher review recommended)</sub>


## G10C13 — Algebraic Fractions

### F-ALG-AFRAC — Algebraic fractions
<!-- meta {"id": "F-ALG-AFRAC", "chapter": "G10C13", "supplied": false, "medium": "en"} -->

$$\frac{P}{Q}\pm\frac{R}{S} = \frac{PS\pm RQ}{QS}$$

- **Symbols:** P, Q, R, S expressions
- **Units:** —
- **When to use:** Simplifying fractions with letters.
- **When not to use / conditions:** Cancel factors only.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C13-F-AF_SAME_DE-01
<!-- meta {"id": "MQ-G10C13-F-AF_SAME_DE-01", "grade": 10, "chapter": "G10C13", "area": "ALG", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-ALG-AFRAC", "diagram": null, "kind": "algebra", "verification": "logic-review", "steps": ["MQ-G10C13-F-AF_SAME_DE-01-S1", "MQ-G10C13-F-AF_SAME_DE-01-S2"]} -->
**Topic:** Algebraic Fractions · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-ALG-AFRAC`

**Question:** Simplify: $\frac{3x}{7} + \frac{4x}{7}$

**Step-by-step solution**

Step 1 — Denominators are equal, so add the numerators. <!-- MQ-G10C13-F-AF_SAME_DE-01-S1 -->

$$\frac{3x+4x}{7}$$

Step 2 — Simplify. <!-- MQ-G10C13-F-AF_SAME_DE-01-S2 -->

$$= \frac{7x}{7}$$

**Final answer:** $\frac{7x}{7}$

<sub>Verification: logic-reviewed (teacher review recommended)</sub>


## G10C14 — Percentages

### F-FIN-PROFIT — Profit percentage
<!-- meta {"id": "F-FIN-PROFIT", "chapter": "G10C14", "supplied": false, "medium": "en"} -->

$$\text{Profit \%} = \frac{SP - CP}{CP}\times 100$$

- **Symbols:** SP selling price, CP cost price
- **Units:** %
- **When to use:** Buying and selling problems.
- **When not to use / conditions:** Never divide by SP.
- **Rearrangement:** $SP = CP\times\frac{100+p}{100}$
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C14-F-PROFIT_PER-01
<!-- meta {"id": "MQ-G10C14-F-PROFIT_PER-01", "grade": 10, "chapter": "G10C14", "area": "FIN", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-FIN-PROFIT", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C14-F-PROFIT_PER-01-S1", "MQ-G10C14-F-PROFIT_PER-01-S2", "MQ-G10C14-F-PROFIT_PER-01-S3"]} -->
**Topic:** Percentages · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-FIN-PROFIT`

**Question:** A trader buys an item for Rs. 1500 and sells it for Rs. 1650. Find the profit percentage.

**Step-by-step solution**

Step 1 — Profit = selling price − cost price. <!-- MQ-G10C14-F-PROFIT_PER-01-S1 -->

$$1650 - 1500 = 150$$

Step 2 — Profit % = profit ÷ cost price × 100. <!-- MQ-G10C14-F-PROFIT_PER-01-S2 -->

$$\frac{150}{1500}\times 100$$

Step 3 — Calculate. <!-- MQ-G10C14-F-PROFIT_PER-01-S3 -->

$$= 10\%$$

**Final answer:** $10\%$
<br>**Accepted answer formats:** $10\%$ · **Unit:** %

<sub>Verification: machine-checked</sub>

### F-FIN-DISC — Discount
<!-- meta {"id": "F-FIN-DISC", "chapter": "G10C14", "supplied": false, "medium": "en"} -->

$$SP = MP\times\frac{100 - d}{100}$$

- **Symbols:** MP marked price, d discount %
- **Units:** Rs.
- **When to use:** Price reductions.
- **When not to use / conditions:** Discount is on the marked price, not the cost.
- **Rearrangement:** $MP = \frac{100\,SP}{100-d}$
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C14-G-DISCOUNT-01
<!-- meta {"id": "MQ-G10C14-G-DISCOUNT-01", "grade": 10, "chapter": "G10C14", "area": "FIN", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "F-FIN-DISC", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C14-G-DISCOUNT-01-S1", "MQ-G10C14-G-DISCOUNT-01-S2"]} -->
**Topic:** Percentages · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `F-FIN-DISC`

**Question:** The marked price of a bag is Rs. 7500. A discount of 15% is given. Find the selling price.

**Step-by-step solution**

Step 1 — Discount amount. <!-- MQ-G10C14-G-DISCOUNT-01-S1 -->

$$7500\times\frac{15}{100} = 1125$$

Step 2 — Selling price = marked price − discount. <!-- MQ-G10C14-G-DISCOUNT-01-S2 -->

$$7500 - 1125 = 6375$$

**Final answer:** $\text{Rs. }6375$
<br>**Accepted answer formats:** $\text{Rs. }6375$ · **Unit:** Rs.

<sub>Verification: machine-checked</sub>

### F-FIN-SI — Simple interest
<!-- meta {"id": "F-FIN-SI", "chapter": "G10C14", "supplied": false, "medium": "en"} -->

$$I = \frac{PRT}{100},\quad A = P + I$$

- **Symbols:** P principal, R rate % p.a., T years
- **Units:** Rs.
- **When to use:** Interest only on the original sum.
- **When not to use / conditions:** Not for compound interest.
- **Rearrangement:** $R = \frac{100I}{PT},\ T = \frac{100I}{PR}$
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C14-A-SIMPLE_INT-01
<!-- meta {"id": "MQ-G10C14-A-SIMPLE_INT-01", "grade": 10, "chapter": "G10C14", "area": "FIN", "medium": "en", "pathway": "A Grade Mastery", "difficulty": "hard", "formula": "F-FIN-SI", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C14-A-SIMPLE_INT-01-S1", "MQ-G10C14-A-SIMPLE_INT-01-S2", "MQ-G10C14-A-SIMPLE_INT-01-S3"]} -->
**Topic:** Percentages · **Pathway:** A Grade Mastery · **Difficulty:** hard · **Formula:** `F-FIN-SI`

**Question:** Rs. 25 000 was deposited at simple interest. After 4 years the total amount was Rs. 37 000. Find the annual interest rate.

**Step-by-step solution**

Step 1 — Interest = amount − principal. <!-- MQ-G10C14-A-SIMPLE_INT-01-S1 -->

$$I = 37\,000 - 25\,000 = 12\,000$$

Step 2 — Interest for one year. <!-- MQ-G10C14-A-SIMPLE_INT-01-S2 -->

$$12\,000\div 4 = 3000$$

Step 3 — Rate = yearly interest ÷ principal × 100. <!-- MQ-G10C14-A-SIMPLE_INT-01-S3 -->

$$\frac{3000}{25\,000}\times 100 = 12\%$$

**Final answer:** $12\%$
<br>**Accepted answer formats:** $12\%$ · **Unit:** %

> ⚠️ **Common mistake:** Using the total amount as the interest.

<sub>Verification: machine-checked</sub>


## G10C15 — Equations

### F-ALG-LIN — Linear equation rules
<!-- meta {"id": "F-ALG-LIN", "chapter": "G10C15", "supplied": false, "medium": "en"} -->

$$a = b \Rightarrow a\pm c = b\pm c,\ ac = bc$$

- **Symbols:** any numbers
- **Units:** —
- **When to use:** Solving for one unknown.
- **When not to use / conditions:** Do not divide by zero.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C15-F-LINEAR_FRA-01
<!-- meta {"id": "MQ-G10C15-F-LINEAR_FRA-01", "grade": 10, "chapter": "G10C15", "area": "ALG", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-ALG-LIN", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C15-F-LINEAR_FRA-01-S1", "MQ-G10C15-F-LINEAR_FRA-01-S2", "MQ-G10C15-F-LINEAR_FRA-01-S3"]} -->
**Topic:** Equations · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-ALG-LIN`

**Question:** Solve: $\frac{x + 5}{2} = 5$

**Step-by-step solution**

Step 1 — Multiply both sides by 2. <!-- MQ-G10C15-F-LINEAR_FRA-01-S1 -->

$$x + 5 = 5\times 2 = 10$$

Step 2 — Subtract 5 from both sides. <!-- MQ-G10C15-F-LINEAR_FRA-01-S2 -->

$$x = 10 - 5$$

Step 3 — Simplify. <!-- MQ-G10C15-F-LINEAR_FRA-01-S3 -->

$$x = 5$$

**Final answer:** $x = 5$
<br>**Accepted answer formats:** $x = 5$

<sub>Verification: machine-checked</sub>

### F-ALG-SIM — Simultaneous equations (elimination)
<!-- meta {"id": "F-ALG-SIM", "chapter": "G10C15", "supplied": false, "medium": "en"} -->

$$a_1x+b_1y=c_1,\ a_2x+b_2y=c_2$$

- **Symbols:** two equations, two unknowns
- **Units:** —
- **When to use:** Two conditions, two unknowns.
- **When not to use / conditions:** Need two independent equations.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C15-G-SIMULTANEO-01
<!-- meta {"id": "MQ-G10C15-G-SIMULTANEO-01", "grade": 10, "chapter": "G10C15", "area": "ALG", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "F-ALG-SIM", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C15-G-SIMULTANEO-01-S1", "MQ-G10C15-G-SIMULTANEO-01-S2", "MQ-G10C15-G-SIMULTANEO-01-S3", "MQ-G10C15-G-SIMULTANEO-01-S4", "MQ-G10C15-G-SIMULTANEO-01-S5"]} -->
**Topic:** Equations · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `F-ALG-SIM`

**Question:** Solve the simultaneous equations: $3x  + 2y = 7$ and $2x  - 3y = 9$

**Step-by-step solution**

Step 1 — Make the y-coefficients equal: multiply (1) by 3 and (2) by 2. <!-- MQ-G10C15-G-SIMULTANEO-01-S1 -->

$$9x  + 6y = 21\quad(3),\qquad 4x  - 6y = 18\quad(4)$$

Step 2 — Add (3) and (4) to remove y. <!-- MQ-G10C15-G-SIMULTANEO-01-S2 -->

$$13x = 39$$

Step 3 — Find x. <!-- MQ-G10C15-G-SIMULTANEO-01-S3 -->

$$x = 3$$

Step 4 — Substitute x in (1) to find y. <!-- MQ-G10C15-G-SIMULTANEO-01-S4 -->

$$3(3)  + 2y = 7 \Rightarrow y = -1$$

Step 5 — Check in (2). <!-- MQ-G10C15-G-SIMULTANEO-01-S5 -->

$$2(3)  - 3(-1) = 9\ \checkmark$$

**Final answer:** $x = 3,\ y = -1$
<br>**Accepted answer formats:** $x = 3,\ y = -1$

> ⚠️ **Common mistake:** Multiplying only the left side of an equation.

<sub>Verification: machine-checked</sub>

### F-ALG-QUAD — Quadratic equation by factors
<!-- meta {"id": "F-ALG-QUAD", "chapter": "G10C15", "supplied": false, "medium": "en"} -->

$$(x-p)(x-q)=0 \Rightarrow x=p \text{ or } x=q$$

- **Symbols:** p, q roots
- **Units:** —
- **When to use:** Quadratics that factorise.
- **When not to use / conditions:** Must equal ZERO first.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C15-A-QUAD_FACTO-01
<!-- meta {"id": "MQ-G10C15-A-QUAD_FACTO-01", "grade": 10, "chapter": "G10C15", "area": "ALG", "medium": "en", "pathway": "A Grade Mastery", "difficulty": "hard", "formula": "F-ALG-QUAD", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C15-A-QUAD_FACTO-01-S1", "MQ-G10C15-A-QUAD_FACTO-01-S2", "MQ-G10C15-A-QUAD_FACTO-01-S3", "MQ-G10C15-A-QUAD_FACTO-01-S4", "MQ-G10C15-A-QUAD_FACTO-01-S5"]} -->
**Topic:** Equations · **Pathway:** A Grade Mastery · **Difficulty:** hard · **Formula:** `F-ALG-QUAD`

**Question:** The length of a rectangle is 4 m more than its width. Its area is 77 m². Form an equation in x (width) and find the width.

**Step-by-step solution**

Step 1 — Write length in terms of x. <!-- MQ-G10C15-A-QUAD_FACTO-01-S1 -->

$$\text{length} = x + 4$$

Step 2 — Area = length × width. <!-- MQ-G10C15-A-QUAD_FACTO-01-S2 -->

$$x(x+4) = 77$$

Step 3 — Rearrange to = 0. <!-- MQ-G10C15-A-QUAD_FACTO-01-S3 -->

$$x^2 + 4x - 77 = 0$$

Step 4 — Factorise. <!-- MQ-G10C15-A-QUAD_FACTO-01-S4 -->

$$(x - 7)(x + 11) = 0$$

Step 5 — Solve and reject the negative value (a length cannot be negative). <!-- MQ-G10C15-A-QUAD_FACTO-01-S5 -->

$$x = 7\ \text{or}\ x = -11 \Rightarrow x = 7\ \text{m}$$

**Final answer:** $7\ \text{m}$
<br>**Accepted answer formats:** $7\ \text{m}$ · **Unit:** m

> ⚠️ **Common mistake:** Giving the negative root as an answer for a length.

<sub>Verification: machine-checked</sub>


## G10C16 — Parallelograms I

### T-GEO-PARA — Parallelogram properties
<!-- meta {"id": "T-GEO-PARA", "chapter": "G10C16", "supplied": false, "medium": "en"} -->

$$AB=DC,\ AD=BC,\ \angle A=\angle C,\ AO=OC$$

- **Symbols:** O diagonal intersection
- **Units:** —
- **When to use:** Angles and lengths in parallelograms.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C16-F-PARA_ANGLE-01
<!-- meta {"id": "MQ-G10C16-F-PARA_ANGLE-01", "grade": 10, "chapter": "G10C16", "area": "GEO", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "T-GEO-PARA", "diagram": "GEO-PARA-01", "kind": "numeric", "verification": "logic-review", "steps": ["MQ-G10C16-F-PARA_ANGLE-01-S1", "MQ-G10C16-F-PARA_ANGLE-01-S2"]} -->
**Topic:** Parallelograms I · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `T-GEO-PARA`

**Question:** In parallelogram ABCD, ∠DAB = 75°. Find ∠ABC, ∠BCD and ∠CDA.

**Diagram:** `GEO-PARA-01` → `Shared_Assets/Geometry/GEO-PARA-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Adjacent angles of a parallelogram add to 180°. <!-- MQ-G10C16-F-PARA_ANGLE-01-S1 -->

$$\angle ABC = 180 - 75 = 105^\circ$$

Step 2 — Opposite angles are equal. <!-- MQ-G10C16-F-PARA_ANGLE-01-S2 -->

$$\angle BCD = \angle DAB = 75^\circ,\quad \angle CDA = \angle ABC = 105^\circ$$

**Final answer:** $105^\circ,\ 75^\circ,\ 105^\circ$
<br>**Accepted answer formats:** $105^\circ,\ 75^\circ,\ 105^\circ$ · **Unit:** °

<sub>Verification: logic-reviewed (teacher review recommended)</sub>


## G10C17 — Parallelograms II

### T-GEO-PARACOND — Conditions for a parallelogram
<!-- meta {"id": "T-GEO-PARACOND", "chapter": "G10C17", "supplied": false, "medium": "en"} -->

$$\text{4 conditions}$$

- **Symbols:** see notes
- **Units:** —
- **When to use:** Proving a quadrilateral is a parallelogram.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C17-F-PARA_CONDI-01
<!-- meta {"id": "MQ-G10C17-F-PARA_CONDI-01", "grade": 10, "chapter": "G10C17", "area": "GEO", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "T-GEO-PARACOND", "diagram": null, "kind": "concept", "verification": "logic-review", "steps": ["MQ-G10C17-F-PARA_CONDI-01-S1", "MQ-G10C17-F-PARA_CONDI-01-S2"]} -->
**Topic:** Parallelograms II · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `T-GEO-PARACOND`

**Question:** In quadrilateral ABCD, one pair of opposite sides is equal and parallel. What type of quadrilateral is ABCD? Give the reason.

**Step-by-step solution**

Step 1 — Recall the conditions for a parallelogram. <!-- MQ-G10C17-F-PARA_CONDI-01-S1 -->

$$\text{4 conditions (sides, angles, diagonals, one pair equal \& parallel)}$$

Step 2 — The given fact is one of them. <!-- MQ-G10C17-F-PARA_CONDI-01-S2 -->

$$\Rightarrow ABCD\ \text{is a parallelogram}$$

**Final answer:** $\text{Parallelogram}$

<sub>Verification: logic-reviewed (teacher review recommended)</sub>


## G10C18 — Sets

### F-SET-UNION — Union of two sets
<!-- meta {"id": "F-SET-UNION", "chapter": "G10C18", "supplied": false, "medium": "en"} -->

$$n(A\cup B) = n(A)+n(B)-n(A\cap B)$$

- **Symbols:** n( ) number of elements
- **Units:** —
- **When to use:** Counting with two overlapping groups.
- **When not to use / conditions:** Three sets need the three-set formula.
- **Rearrangement:** $n(A\cap B) = n(A)+n(B)-n(A\cup B)$
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C18-F-SETS_UNION-01
<!-- meta {"id": "MQ-G10C18-F-SETS_UNION-01", "grade": 10, "chapter": "G10C18", "area": "SET", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-SET-UNION", "diagram": "SET-VENN2-01", "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C18-F-SETS_UNION-01-S1", "MQ-G10C18-F-SETS_UNION-01-S2"]} -->
**Topic:** Sets · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-SET-UNION`

**Question:** n(A) = 25, n(B) = 14 and n(A ∩ B) = 6. Find n(A ∪ B).

**Diagram:** `SET-VENN2-01` → `Shared_Assets/Other_Diagrams/SET-VENN2-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Use the formula. <!-- MQ-G10C18-F-SETS_UNION-01-S1 -->

$$n(A\cup B) = n(A) + n(B) - n(A\cap B)$$

Step 2 — Substitute. <!-- MQ-G10C18-F-SETS_UNION-01-S2 -->

$$= 25 + 14 - 6 = 33$$

**Final answer:** $33$
<br>**Accepted answer formats:** $33$

<sub>Verification: machine-checked</sub>


## G10C19 — Logarithms I

### F-LOG-DEF — Definition of logarithm
<!-- meta {"id": "F-LOG-DEF", "chapter": "G10C19", "supplied": false, "medium": "en"} -->

$$\log_a N = x \iff a^x = N$$

- **Symbols:** a base (a > 0, a ≠ 1), N > 0
- **Units:** —
- **When to use:** Index ↔ log form; log equations.
- **When not to use / conditions:** log of 0 or negatives is undefined.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C19-F-LOG_INDEX_-01
<!-- meta {"id": "MQ-G10C19-F-LOG_INDEX_-01", "grade": 10, "chapter": "G10C19", "area": "NUM", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-LOG-DEF", "diagram": null, "kind": "algebra", "verification": "logic-review", "steps": ["MQ-G10C19-F-LOG_INDEX_-01-S1", "MQ-G10C19-F-LOG_INDEX_-01-S2"]} -->
**Topic:** Logarithms I · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-LOG-DEF`

**Question:** Write $\log_{5} 125 = 3$ in index form.

**Step-by-step solution**

Step 1 — Rule: log_a N = x means a^x = N. <!-- MQ-G10C19-F-LOG_INDEX_-01-S1 -->

$$\log_a N = x \iff a^x = N$$

Step 2 — Apply it. <!-- MQ-G10C19-F-LOG_INDEX_-01-S2 -->

$$5^{3} = 125$$

**Final answer:** $5^{3} = 125$

<sub>Verification: logic-reviewed (teacher review recommended)</sub>

### F-LOG-LAWS — Laws of logarithms
<!-- meta {"id": "F-LOG-LAWS", "chapter": "G10C19", "supplied": false, "medium": "en"} -->

$$\log ab = \log a+\log b,\ \log\tfrac ab = \log a-\log b,\ \log a^n = n\log a$$

- **Symbols:** same base throughout
- **Units:** —
- **When to use:** Simplifying log expressions.
- **When not to use / conditions:** log(a + b) has no rule.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C19-G-LOG_LAWS-01
<!-- meta {"id": "MQ-G10C19-G-LOG_LAWS-01", "grade": 10, "chapter": "G10C19", "area": "NUM", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "F-LOG-LAWS", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C19-G-LOG_LAWS-01-S1", "MQ-G10C19-G-LOG_LAWS-01-S2", "MQ-G10C19-G-LOG_LAWS-01-S3"]} -->
**Topic:** Logarithms I · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `F-LOG-LAWS`

**Question:** Simplify without tables: $\lg 8 + \lg 125$

**Step-by-step solution**

Step 1 — Add logs → multiply numbers. <!-- MQ-G10C19-G-LOG_LAWS-01-S1 -->

$$\lg 8 + \lg 125 = \lg(8\times125)$$

Step 2 — Multiply. <!-- MQ-G10C19-G-LOG_LAWS-01-S2 -->

$$= \lg 1000$$

Step 3 — 1000 = 10^3. <!-- MQ-G10C19-G-LOG_LAWS-01-S3 -->

$$= \lg 10^{3} = 3$$

**Final answer:** $3$
<br>**Accepted answer formats:** $3$

<sub>Verification: machine-checked</sub>


## G10C20 — Logarithms II

### F-LOG-TAB — Calculating with log tables
<!-- meta {"id": "F-LOG-TAB", "chapter": "G10C20", "supplied": false, "medium": "en"} -->

$$P = \text{antilog}\,(\lg a \pm \lg b),\quad \lg a^n = n\lg a$$

- **Symbols:** lg = log base 10
- **Units:** —
- **When to use:** Multiplying, dividing, powers, roots of decimals.
- **When not to use / conditions:** Adjust bar characteristics before dividing.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C20-F-LOG_CHAR-01
<!-- meta {"id": "MQ-G10C20-F-LOG_CHAR-01", "grade": 10, "chapter": "G10C20", "area": "NUM", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-LOG-TAB", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C20-F-LOG_CHAR-01-S1", "MQ-G10C20-F-LOG_CHAR-01-S2", "MQ-G10C20-F-LOG_CHAR-01-S3"]} -->
**Topic:** Logarithms II · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-LOG-TAB`

**Question:** Write 520 in scientific notation and state the characteristic of lg 520.

**Step-by-step solution**

Step 1 — Scientific notation: A × 10ⁿ with 1 ≤ A < 10. <!-- MQ-G10C20-F-LOG_CHAR-01-S1 -->

$$520 = 5.2\times 10^{2}$$

Step 2 — The characteristic is the power of 10. <!-- MQ-G10C20-F-LOG_CHAR-01-S2 -->

$$\text{characteristic} = 2$$

Step 3 — The mantissa (from tables) is the same for 3.47, 34.7, 0.347 … <!-- MQ-G10C20-F-LOG_CHAR-01-S3 -->

$$\lg 520 = 2.7160$$

**Final answer:** $2$
<br>**Accepted answer formats:** $2$

<sub>Verification: machine-checked</sub>


## G10C21 — Graphs

### F-GRA-LINE — Straight line
<!-- meta {"id": "F-GRA-LINE", "chapter": "G10C21", "supplied": false, "medium": "en"} -->

$$y = mx + c$$

- **Symbols:** m gradient, c y-intercept
- **Units:** —
- **When to use:** Linear graphs.
- **When not to use / conditions:** Not for curves.
- **Rearrangement:** $c = y - mx$
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C21-F-GRADIENT_I-01
<!-- meta {"id": "MQ-G10C21-F-GRADIENT_I-01", "grade": 10, "chapter": "G10C21", "area": "GRA", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-GRA-LINE", "diagram": "GRA-LINE-01", "kind": "numeric", "verification": "logic-review", "steps": ["MQ-G10C21-F-GRADIENT_I-01-S1", "MQ-G10C21-F-GRADIENT_I-01-S2"]} -->
**Topic:** Graphs · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-GRA-LINE`

**Question:** For the straight line $y = -3x  + 1$, write down the gradient and the y-intercept.

**Diagram:** `GRA-LINE-01` → `Shared_Assets/Graphs/GRA-LINE-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Compare with y = mx + c. <!-- MQ-G10C21-F-GRADIENT_I-01-S1 -->

$$y = -3x  + 1$$

Step 2 — m is the gradient, c is the intercept. <!-- MQ-G10C21-F-GRADIENT_I-01-S2 -->

$$m = -3,\quad c = 1$$

**Final answer:** $m=-3,\ c=1$
<br>**Accepted answer formats:** $m=-3,\ c=1$

<sub>Verification: logic-reviewed (teacher review recommended)</sub>

### F-GRA-GRAD — Gradient from two points
<!-- meta {"id": "F-GRA-GRAD", "chapter": "G10C21", "supplied": false, "medium": "en"} -->

$$m = \frac{y_2-y_1}{x_2-x_1}$$

- **Symbols:** (x₁, y₁), (x₂, y₂) points
- **Units:** —
- **When to use:** Steepness of a line; speed from a distance–time graph.
- **When not to use / conditions:** Vertical lines have no gradient.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C21-G-GRADIENT_T-01
<!-- meta {"id": "MQ-G10C21-G-GRADIENT_T-01", "grade": 10, "chapter": "G10C21", "area": "GRA", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "F-GRA-GRAD", "diagram": "GRA-LINE-01", "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C21-G-GRADIENT_T-01-S1", "MQ-G10C21-G-GRADIENT_T-01-S2", "MQ-G10C21-G-GRADIENT_T-01-S3"]} -->
**Topic:** Graphs · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `F-GRA-GRAD`

**Question:** Find the gradient of the line through (2, 1) and (6, 3), and its equation.

**Diagram:** `GRA-LINE-01` → `Shared_Assets/Graphs/GRA-LINE-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Gradient = change in y ÷ change in x. <!-- MQ-G10C21-G-GRADIENT_T-01-S1 -->

$$m = \frac{3 - (1)}{6 - (2)} = \frac{1}{2}$$

Step 2 — Substitute one point in y = mx + c. <!-- MQ-G10C21-G-GRADIENT_T-01-S2 -->

$$1 = \frac{1}{2}\times(2) + c \Rightarrow c = 0$$

Step 3 — Write the equation. <!-- MQ-G10C21-G-GRADIENT_T-01-S3 -->

$$y = \frac{1}{2}x + 0$$

**Final answer:** $m=\frac{1}{2},\ y=\frac{1}{2}x + 0$
<br>**Accepted answer formats:** $m=\frac{1}{2},\ y=\frac{1}{2}x + 0$

<sub>Verification: machine-checked</sub>

### F-GRA-QUAD — Quadratic function y = ax² + bx + c
<!-- meta {"id": "F-GRA-QUAD", "chapter": "G10C21", "supplied": false, "medium": "en"} -->

$$y = ax^2+bx+c,\ \ x_{tp} = -\frac{b}{2a}$$

- **Symbols:** a ≠ 0
- **Units:** —
- **When to use:** Tables and graphs of parabolas.
- **When not to use / conditions:** a > 0 minimum; a < 0 maximum.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C21-A-QUAD_AX2C-01
<!-- meta {"id": "MQ-G10C21-A-QUAD_AX2C-01", "grade": 10, "chapter": "G10C21", "area": "GRA", "medium": "en", "pathway": "A Grade Mastery", "difficulty": "hard", "formula": "F-GRA-QUAD", "diagram": "GRA-QUAD-02", "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C21-A-QUAD_AX2C-01-S1", "MQ-G10C21-A-QUAD_AX2C-01-S2", "MQ-G10C21-A-QUAD_AX2C-01-S3"]} -->
**Topic:** Graphs · **Pathway:** A Grade Mastery · **Difficulty:** hard · **Formula:** `F-GRA-QUAD`

**Question:** For $y = 2x^{2} - 8$: (i) complete a table for x = −3 to 3, (ii) state the turning point and whether it is a maximum or minimum, (iii) find where the graph cuts the x-axis.

**Diagram:** `GRA-QUAD-02` → `Shared_Assets/Graphs/GRA-QUAD-02.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Substitute each x value. <!-- MQ-G10C21-A-QUAD_AX2C-01-S1 -->

$$\begin{array}{c|ccccccc} x & -3 & -2 & -1 & 0 & 1 & 2 & 3\\ \hline y & 10 & 0 & -6 & -8 & -6 & 0 & 10\end{array}$$

Step 2 — Turning point is at x = 0 for y = ax² + c. <!-- MQ-G10C21-A-QUAD_AX2C-01-S2 -->

$$(0,\ -8),\ \text{minimum}\ (a > 0)$$

Step 3 — Graph cuts the x-axis where y = 0. <!-- MQ-G10C21-A-QUAD_AX2C-01-S3 -->

$$2x^{2} - 8 = 0 \Rightarrow x^2 = 4 \Rightarrow x = \pm 2$$

**Final answer:** $(0,-8)\ \text{minimum};\ x=\pm 2$
<br>**Accepted answer formats:** $(0,-8)\ \text{minimum};\ x=\pm 2$

> ⚠️ **Common mistake:** Writing (−3)² as −9.

<sub>Verification: machine-checked</sub>


## G10C22 — Rate

### F-NUM-SPEED — Speed
<!-- meta {"id": "F-NUM-SPEED", "chapter": "G10C22", "supplied": false, "medium": "en"} -->

$$S = \frac{D}{T}$$

- **Symbols:** D distance, T time
- **Units:** km/h, m/s
- **When to use:** Travel problems.
- **When not to use / conditions:** Units must match.
- **Rearrangement:** $D = ST,\ T = \frac DS$
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C22-F-SPEED_TIME-01
<!-- meta {"id": "MQ-G10C22-F-SPEED_TIME-01", "grade": 10, "chapter": "G10C22", "area": "NUM", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-NUM-SPEED", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C22-F-SPEED_TIME-01-S1", "MQ-G10C22-F-SPEED_TIME-01-S2"]} -->
**Topic:** Rate · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-NUM-SPEED`

**Question:** A bus travels 75 km at an average speed of 50 km/h. How long does it take?

**Step-by-step solution**

Step 1 — Time = distance ÷ speed. <!-- MQ-G10C22-F-SPEED_TIME-01-S1 -->

$$t = \frac{75}{50} = \frac{3}{2}\ \text{h}$$

Step 2 — Convert to hours and minutes. <!-- MQ-G10C22-F-SPEED_TIME-01-S2 -->

$$\frac{3}{2}\ \text{h} = 1\ \text{h}\ 30\ \text{min}$$

**Final answer:** $1\ \text{h}\ 30\ \text{min}$
<br>**Accepted answer formats:** $1\ \text{h}\ 30\ \text{min}$ · **Unit:** h

<sub>Verification: machine-checked</sub>

### F-NUM-RATE — Rate
<!-- meta {"id": "F-NUM-RATE", "chapter": "G10C22", "supplied": false, "medium": "en"} -->

$$\text{time} = \frac{\text{amount}}{\text{rate}}$$

- **Symbols:** rate per unit time
- **Units:** L/min etc.
- **When to use:** Filling, emptying, working.
- **When not to use / conditions:** Use the net rate when rates oppose.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C22-G-TANK_FILL-01
<!-- meta {"id": "MQ-G10C22-G-TANK_FILL-01", "grade": 10, "chapter": "G10C22", "area": "NUM", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "F-NUM-RATE", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C22-G-TANK_FILL-01-S1", "MQ-G10C22-G-TANK_FILL-01-S2"]} -->
**Topic:** Rate · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `F-NUM-RATE`

**Question:** A tank holds 3600 litres. Water flows in at 60 litres per minute. How long will it take to fill the empty tank?

**Step-by-step solution**

Step 1 — Time = volume ÷ rate. <!-- MQ-G10C22-G-TANK_FILL-01-S1 -->

$$t = 3600\div 60 = 60\ \text{min}$$

Step 2 — Convert if needed. <!-- MQ-G10C22-G-TANK_FILL-01-S2 -->

$$60\ \text{min} = 1\ \text{h}\ 0\ \text{min}$$

**Final answer:** $60\ \text{min}$
<br>**Accepted answer formats:** $60\ \text{min}$ · **Unit:** min

<sub>Verification: machine-checked</sub>


## G10C23 — Formulae

### F-ALG-SUBJ — Changing the subject
<!-- meta {"id": "F-ALG-SUBJ", "chapter": "G10C23", "supplied": false, "medium": "en"} -->

$$\text{undo operations in reverse order}$$

- **Symbols:** —
- **Units:** —
- **When to use:** Rearranging formulas.
- **When not to use / conditions:** Keep both sides balanced.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C23-F-SUBST_FORM-01
<!-- meta {"id": "MQ-G10C23-F-SUBST_FORM-01", "grade": 10, "chapter": "G10C23", "area": "ALG", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-ALG-SUBJ", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C23-F-SUBST_FORM-01-S1", "MQ-G10C23-F-SUBST_FORM-01-S2"]} -->
**Topic:** Formulae · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-ALG-SUBJ`

**Question:** Given v = u + at, find v when u = 5, a = 2 and t = 3.

**Step-by-step solution**

Step 1 — Substitute the values. <!-- MQ-G10C23-F-SUBST_FORM-01-S1 -->

$$v = 5 + (2)\times 3$$

Step 2 — Multiply first, then add. <!-- MQ-G10C23-F-SUBST_FORM-01-S2 -->

$$v = 5 + (6) = 11$$

**Final answer:** $v = 11$
<br>**Accepted answer formats:** $v = 11$

<sub>Verification: machine-checked</sub>


## G10C24 — Arithmetic Progressions

### F-AP-TN — nth term of an AP
<!-- meta {"id": "F-AP-TN", "chapter": "G10C24", "supplied": false, "medium": "en"} -->

$$T_n = a + (n-1)d$$

- **Symbols:** a first term, d common difference
- **Units:** —
- **When to use:** Find a term or n.
- **When not to use / conditions:** Not for GPs.
- **Rearrangement:** $n = \frac{T_n - a}{d} + 1$
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C24-F-AP_NTH-01
<!-- meta {"id": "MQ-G10C24-F-AP_NTH-01", "grade": 10, "chapter": "G10C24", "area": "ALG", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-AP-TN", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C24-F-AP_NTH-01-S1", "MQ-G10C24-F-AP_NTH-01-S2", "MQ-G10C24-F-AP_NTH-01-S3"]} -->
**Topic:** Arithmetic Progressions · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-AP-TN`

**Question:** Find the 15th term of the arithmetic progression 5, 8, 11, …

**Step-by-step solution**

Step 1 — Identify a and d. <!-- MQ-G10C24-F-AP_NTH-01-S1 -->

$$a = 5,\quad d = 8 - 5 = 3$$

Step 2 — Use Tₙ = a + (n − 1)d. <!-- MQ-G10C24-F-AP_NTH-01-S2 -->

$$T_{15} = 5 + (15-1)\times(3)$$

Step 3 — Calculate. <!-- MQ-G10C24-F-AP_NTH-01-S3 -->

$$T_{15} = 5 + 42 = 47$$

**Final answer:** $47$
<br>**Accepted answer formats:** $47$

<sub>Verification: machine-checked</sub>

### F-AP-SN — Sum of an AP
<!-- meta {"id": "F-AP-SN", "chapter": "G10C24", "supplied": false, "medium": "en"} -->

$$S_n = \frac n2[2a+(n-1)d] = \frac n2(a+l)$$

- **Symbols:** l last term
- **Units:** —
- **When to use:** Totals of evenly increasing amounts.
- **When not to use / conditions:** Sₙ is not the nth term.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C24-G-AP_SUM-01
<!-- meta {"id": "MQ-G10C24-G-AP_SUM-01", "grade": 10, "chapter": "G10C24", "area": "ALG", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "F-AP-SN", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C24-G-AP_SUM-01-S1", "MQ-G10C24-G-AP_SUM-01-S2", "MQ-G10C24-G-AP_SUM-01-S3", "MQ-G10C24-G-AP_SUM-01-S4"]} -->
**Topic:** Arithmetic Progressions · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `F-AP-SN`

**Question:** Find the sum of the first 12 terms of the AP 10, 15, 20, …

**Step-by-step solution**

Step 1 — Identify a, d and n. <!-- MQ-G10C24-G-AP_SUM-01-S1 -->

$$a = 10,\ d = 5,\ n = 12$$

Step 2 — Use Sₙ = n/2 [2a + (n − 1)d]. <!-- MQ-G10C24-G-AP_SUM-01-S2 -->

$$S_{12} = \frac{12}{2}[2\times10 + (12-1)\times5]$$

Step 3 — Inside the bracket first. <!-- MQ-G10C24-G-AP_SUM-01-S3 -->

$$= \frac{12}{2}[20 + 55] = \frac{12}{2}\times75$$

Step 4 — Multiply. <!-- MQ-G10C24-G-AP_SUM-01-S4 -->

$$= 450$$

**Final answer:** $450$
<br>**Accepted answer formats:** $450$

<sub>Verification: machine-checked</sub>


## G10C25 — Algebraic Inequalities

### F-ALG-INEQ — Solving inequalities
<!-- meta {"id": "F-ALG-INEQ", "chapter": "G10C25", "supplied": false, "medium": "en"} -->

$$a<b \Rightarrow -a>-b$$

- **Symbols:** multiplying/dividing by a negative reverses the sign
- **Units:** —
- **When to use:** Ranges of values.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C25-F-INEQ_SOLVE-01
<!-- meta {"id": "MQ-G10C25-F-INEQ_SOLVE-01", "grade": 10, "chapter": "G10C25", "area": "ALG", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-ALG-INEQ", "diagram": "GRA-NUMLINE-01", "kind": "algebra", "verification": "machine-checked", "steps": ["MQ-G10C25-F-INEQ_SOLVE-01-S1", "MQ-G10C25-F-INEQ_SOLVE-01-S2", "MQ-G10C25-F-INEQ_SOLVE-01-S3"]} -->
**Topic:** Algebraic Inequalities · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-ALG-INEQ`

**Question:** Solve $2x  + 3 < 11$ and write the positive integer solutions.

**Diagram:** `GRA-NUMLINE-01` → `Shared_Assets/Graphs/GRA-NUMLINE-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Subtract 3 from both sides. <!-- MQ-G10C25-F-INEQ_SOLVE-01-S1 -->

$$2x < 8$$

Step 2 — Divide by 2 (positive, so the sign stays). <!-- MQ-G10C25-F-INEQ_SOLVE-01-S2 -->

$$x < 4$$

Step 3 — List positive integers less than that. <!-- MQ-G10C25-F-INEQ_SOLVE-01-S3 -->

$$x = 1, 2, 3$$

**Final answer:** $1, 2, 3$

<sub>Verification: machine-checked</sub>


## G10C26 — Frequency Distribution

### F-STA-MEAN — Mean of a frequency distribution
<!-- meta {"id": "F-STA-MEAN", "chapter": "G10C26", "supplied": false, "medium": "en"} -->

$$\bar x = \frac{\Sigma fx}{\Sigma f}$$

- **Symbols:** x value or mid-value, f frequency
- **Units:** same as data
- **When to use:** Average of tabled data.
- **When not to use / conditions:** Divide by Σf, not by the number of rows.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C26-F-MEAN_UNGRO-01
<!-- meta {"id": "MQ-G10C26-F-MEAN_UNGRO-01", "grade": 10, "chapter": "G10C26", "area": "STA", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-STA-MEAN", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C26-F-MEAN_UNGRO-01-S1", "MQ-G10C26-F-MEAN_UNGRO-01-S2", "MQ-G10C26-F-MEAN_UNGRO-01-S3"]} -->
**Topic:** Frequency Distribution · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-STA-MEAN`

**Question:** Find the mean of the distribution: values 10, 20, 30, 40 with frequencies 2, 5, 8, 5.

**Step-by-step solution**

Step 1 — Multiply each value by its frequency. <!-- MQ-G10C26-F-MEAN_UNGRO-01-S1 -->

$$fx: 20, 100, 240, 200$$

Step 2 — Add fx and add f. <!-- MQ-G10C26-F-MEAN_UNGRO-01-S2 -->

$$\Sigma fx = 560,\quad \Sigma f = 20$$

Step 3 — Mean = Σfx ÷ Σf. <!-- MQ-G10C26-F-MEAN_UNGRO-01-S3 -->

$$\bar{x} = \frac{560}{20} = 28$$

**Final answer:** $28$
<br>**Accepted answer formats:** $28$ · **Accepted tolerance:** ±0.01

<sub>Verification: machine-checked</sub>

### F-STA-AMEAN — Mean by assumed mean
<!-- meta {"id": "F-STA-AMEAN", "chapter": "G10C26", "supplied": false, "medium": "en"} -->

$$\bar x = A + \frac{\Sigma fd}{\Sigma f},\ d = x - A$$

- **Symbols:** A assumed mean
- **Units:** same as data
- **When to use:** Large mid-values (Paper II).
- **When not to use / conditions:** Remember to add A.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C26-A-MEAN_ASSUM-01
<!-- meta {"id": "MQ-G10C26-A-MEAN_ASSUM-01", "grade": 10, "chapter": "G10C26", "area": "STA", "medium": "en", "pathway": "A Grade Mastery", "difficulty": "hard", "formula": "F-STA-AMEAN", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C26-A-MEAN_ASSUM-01-S1", "MQ-G10C26-A-MEAN_ASSUM-01-S2", "MQ-G10C26-A-MEAN_ASSUM-01-S3", "MQ-G10C26-A-MEAN_ASSUM-01-S4", "MQ-G10C26-A-MEAN_ASSUM-01-S5"]} -->
**Topic:** Frequency Distribution · **Pathway:** A Grade Mastery · **Difficulty:** hard · **Formula:** `F-STA-AMEAN`

**Question:** Using the assumed mean 45, find the mean of the distribution with classes 10–20 … 60–70 and frequencies 4, 8, 15, 10, 8, 5 (to 2 d.p.). (Paper II style)

**Step-by-step solution**

Step 1 — Mid-values x. <!-- MQ-G10C26-A-MEAN_ASSUM-01-S1 -->

$$15, 25, 35, 45, 55, 65$$

Step 2 — Deviations d = x − 45. <!-- MQ-G10C26-A-MEAN_ASSUM-01-S2 -->

$$-30, -20, -10, 0, 10, 20$$

Step 3 — fd for each class. <!-- MQ-G10C26-A-MEAN_ASSUM-01-S3 -->

$$-120, -160, -150, 0, 80, 100$$

Step 4 — Totals. <!-- MQ-G10C26-A-MEAN_ASSUM-01-S4 -->

$$\Sigma fd = -250,\quad \Sigma f = 50$$

Step 5 — Mean = A + Σfd ÷ Σf. <!-- MQ-G10C26-A-MEAN_ASSUM-01-S5 -->

$$\bar x = 45 + \frac{-250}{50} = 40.00$$

**Final answer:** $40.00$
<br>**Accepted answer formats:** $40.00$ · **Accepted tolerance:** ±0.01

> ⚠️ **Common mistake:** Forgetting to add the assumed mean back at the end.

<sub>Verification: machine-checked</sub>


## G10C27 — Chords of a Circle

### T-GEO-CHORD — Perpendicular from centre to chord
<!-- meta {"id": "T-GEO-CHORD", "chapter": "G10C27", "supplied": false, "medium": "en"} -->

$$OM\perp AB \Rightarrow AM = MB;\ r^2 = OM^2 + AM^2$$

- **Symbols:** O centre, M foot
- **Units:** cm
- **When to use:** Chord lengths and distances.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C27-F-CHORD_LENG-01
<!-- meta {"id": "MQ-G10C27-F-CHORD_LENG-01", "grade": 10, "chapter": "G10C27", "area": "GEO", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "T-GEO-CHORD", "diagram": "GEO-CHORD-01", "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C27-F-CHORD_LENG-01-S1", "MQ-G10C27-F-CHORD_LENG-01-S2", "MQ-G10C27-F-CHORD_LENG-01-S3", "MQ-G10C27-F-CHORD_LENG-01-S4"]} -->
**Topic:** Chords of a Circle · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `T-GEO-CHORD`

**Question:** A circle has radius 5 cm. A chord is 3 cm from the centre. Find the length of the chord.

**Diagram:** `GEO-CHORD-01` → `Shared_Assets/Geometry/GEO-CHORD-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — The perpendicular from the centre bisects the chord. <!-- MQ-G10C27-F-CHORD_LENG-01-S1 -->

$$AM = MB$$

Step 2 — Use Pythagoras in the right triangle OMA. <!-- MQ-G10C27-F-CHORD_LENG-01-S2 -->

$$AM^2 = 5^2 - 3^2 = 16$$

Step 3 — Find half the chord. <!-- MQ-G10C27-F-CHORD_LENG-01-S3 -->

$$AM = 4\ \text{cm}$$

Step 4 — Double it. <!-- MQ-G10C27-F-CHORD_LENG-01-S4 -->

$$AB = 2\times 4 = 8\ \text{cm}$$

**Final answer:** $8\ \text{cm}$
<br>**Accepted answer formats:** $8\ \text{cm}$ · **Unit:** cm

<sub>Verification: machine-checked</sub>


## G10C28 — Construction

### C-LOCUS — Basic loci
<!-- meta {"id": "C-LOCUS", "chapter": "G10C28", "supplied": false, "medium": "en"} -->

$$\text{circle; parallel lines; perp. bisector; angle bisector}$$

- **Symbols:** —
- **Units:** —
- **When to use:** Locus questions.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C28-F-LOCUS_IDEN-01
<!-- meta {"id": "MQ-G10C28-F-LOCUS_IDEN-01", "grade": 10, "chapter": "G10C28", "area": "GEO", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "C-LOCUS", "diagram": "CON-PERPBIS-01", "kind": "concept", "verification": "logic-review", "steps": ["MQ-G10C28-F-LOCUS_IDEN-01-S1", "MQ-G10C28-F-LOCUS_IDEN-01-S2"]} -->
**Topic:** Construction · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `C-LOCUS`

**Question:** What is the locus of a point that moves equidistant from two intersecting lines?

**Diagram:** `CON-PERPBIS-01` → `Shared_Assets/Constructions/CON-PERPBIS-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Recall the four basic loci. <!-- MQ-G10C28-F-LOCUS_IDEN-01-S1 -->

$$\text{point, line, two points, two lines}$$

Step 2 — Match the condition. <!-- MQ-G10C28-F-LOCUS_IDEN-01-S2 -->

$$\text{the bisector of the angle between them}$$

**Final answer:** $\text{the bisector of the angle between them}$

<sub>Verification: logic-reviewed (teacher review recommended)</sub>

### C-PERPBIS — Perpendicular bisector
<!-- meta {"id": "C-PERPBIS", "chapter": "G10C28", "supplied": false, "medium": "en"} -->

$$\text{equal arcs from A and B}$$

- **Symbols:** —
- **Units:** —
- **When to use:** Equidistant from two points; circumcentre.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C28-G-CONSTRUCT_-01
<!-- meta {"id": "MQ-G10C28-G-CONSTRUCT_-01", "grade": 10, "chapter": "G10C28", "area": "GEO", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "C-PERPBIS", "diagram": "CON-PERPBIS-01", "kind": "construction", "verification": "logic-review", "steps": ["MQ-G10C28-G-CONSTRUCT_-01-S1", "MQ-G10C28-G-CONSTRUCT_-01-S2", "MQ-G10C28-G-CONSTRUCT_-01-S3", "MQ-G10C28-G-CONSTRUCT_-01-S4"]} -->
**Topic:** Construction · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `C-PERPBIS`

**Question:** Construct the perpendicular bisector of a line segment AB = 8 cm. List the construction steps.

**Diagram:** `CON-PERPBIS-01` → `Shared_Assets/Constructions/CON-PERPBIS-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Draw AB = 8 cm with a ruler. <!-- MQ-G10C28-G-CONSTRUCT_-01-S1 -->

$$AB = 8\ \text{cm}$$

Step 2 — With centre A and radius more than half of AB, draw arcs above and below AB. <!-- MQ-G10C28-G-CONSTRUCT_-01-S2 -->

$$r > 4.0\ \text{cm}$$

Step 3 — With centre B and the SAME radius, draw arcs to cut the first arcs at P and Q. <!-- MQ-G10C28-G-CONSTRUCT_-01-S3 -->

$$P,\ Q$$

Step 4 — Join PQ. PQ is the perpendicular bisector of AB. <!-- MQ-G10C28-G-CONSTRUCT_-01-S4 -->

$$PQ\perp AB,\ AM = MB$$

**Final answer:** $PQ\ \text{is the perpendicular bisector}$

<sub>Verification: logic-reviewed (teacher review recommended)</sub>

### C-ANGBIS — Angle bisector
<!-- meta {"id": "C-ANGBIS", "chapter": "G10C28", "supplied": false, "medium": "en"} -->

$$\text{arc on both arms, then equal arcs}$$

- **Symbols:** —
- **Units:** —
- **When to use:** Equidistant from two lines; incentre.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C28-A-CONSTRUCT_-01
<!-- meta {"id": "MQ-G10C28-A-CONSTRUCT_-01", "grade": 10, "chapter": "G10C28", "area": "GEO", "medium": "en", "pathway": "A Grade Mastery", "difficulty": "hard", "formula": "C-ANGBIS", "diagram": "CON-ANGBIS-01", "kind": "construction", "verification": "logic-review", "steps": ["MQ-G10C28-A-CONSTRUCT_-01-S1", "MQ-G10C28-A-CONSTRUCT_-01-S2", "MQ-G10C28-A-CONSTRUCT_-01-S3", "MQ-G10C28-A-CONSTRUCT_-01-S4", "MQ-G10C28-A-CONSTRUCT_-01-S5"]} -->
**Topic:** Construction · **Pathway:** A Grade Mastery · **Difficulty:** hard · **Formula:** `C-ANGBIS`

**Question:** Construct triangle ABC with AB = 7 cm, ∠ABC = 60° and BC = 6 cm. Locate the point P on BC that is equidistant from AB and AC. Give the steps.

**Diagram:** `CON-ANGBIS-01` → `Shared_Assets/Constructions/CON-ANGBIS-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Draw AB = 7 cm. <!-- MQ-G10C28-A-CONSTRUCT_-01-S1 -->

$$AB = 7\ \text{cm}$$

Step 2 — Construct 60° at B (arc from B, then same radius arc from where it cuts BA). <!-- MQ-G10C28-A-CONSTRUCT_-01-S2 -->

$$\angle ABC = 60^\circ$$

Step 3 — Mark C on that arm with BC = 6 cm; join AC. <!-- MQ-G10C28-A-CONSTRUCT_-01-S3 -->

$$BC = 6\ \text{cm}$$

Step 4 — Equidistant from AB and AC → bisect ∠BAC. <!-- MQ-G10C28-A-CONSTRUCT_-01-S4 -->

$$\text{bisector of }\angle BAC$$

Step 5 — Where the bisector meets BC is P. <!-- MQ-G10C28-A-CONSTRUCT_-01-S5 -->

$$P = \text{bisector}\cap BC$$

**Final answer:** $P\ \text{on the bisector of }\angle BAC$

<sub>Verification: logic-reviewed (teacher review recommended)</sub>


## G10C29 — Surface Area and Volume

### F-MEN-CYLV — Volume of a cylinder
<!-- meta {"id": "F-MEN-CYLV", "chapter": "G10C29", "supplied": true, "medium": "en"} -->

$$V = \pi r^2 h$$

- **Symbols:** r radius, h height
- **Units:** cm³, m³
- **When to use:** Tanks, pipes, cans.
- **When not to use / conditions:** —
- **Rearrangement:** $h = \frac{V}{\pi r^2}$
- **Supplied in exam?** A version has been printed on Paper II in verified papers.

#### Worked example (verified) — MQ-G10C29-F-CYLINDER_V-01
<!-- meta {"id": "MQ-G10C29-F-CYLINDER_V-01", "grade": 10, "chapter": "G10C29", "area": "MEN", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-MEN-CYLV", "diagram": "SOL-CYL-01", "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C29-F-CYLINDER_V-01-S1", "MQ-G10C29-F-CYLINDER_V-01-S2"]} -->
**Topic:** Surface Area and Volume · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-MEN-CYLV`

**Question:** Find the volume of a cylinder with radius 7 cm and height 20 cm. (π = 22/7)

**Diagram:** `SOL-CYL-01` → `Shared_Assets/Other_Diagrams/SOL-CYL-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — V = πr²h. <!-- MQ-G10C29-F-CYLINDER_V-01-S1 -->

$$V = \frac{22}{7}\times 7^2\times 20$$

Step 2 — Calculate. <!-- MQ-G10C29-F-CYLINDER_V-01-S2 -->

$$V = 3080\ \text{cm}^3$$

**Final answer:** $3080\ \text{cm}^3$
<br>**Accepted answer formats:** $3080\ \text{cm}^3$ · **Unit:** cm³

<sub>Verification: machine-checked</sub>

### F-MEN-CYLA — Surface area of a cylinder
<!-- meta {"id": "F-MEN-CYLA", "chapter": "G10C29", "supplied": false, "medium": "en"} -->

$$\text{CSA} = 2\pi rh,\ \text{TSA} = 2\pi rh + 2\pi r^2$$

- **Symbols:** r radius, h height
- **Units:** cm²
- **When to use:** Labels, painting, sheet metal.
- **When not to use / conditions:** Open cylinder: one end only.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C29-G-CYLINDER_T-01
<!-- meta {"id": "MQ-G10C29-G-CYLINDER_T-01", "grade": 10, "chapter": "G10C29", "area": "MEN", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "F-MEN-CYLA", "diagram": "SOL-CYL-01", "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C29-G-CYLINDER_T-01-S1", "MQ-G10C29-G-CYLINDER_T-01-S2", "MQ-G10C29-G-CYLINDER_T-01-S3"]} -->
**Topic:** Surface Area and Volume · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `F-MEN-CYLA`

**Question:** Find the total surface area of a closed cylinder of radius 14 cm and height 6 cm. (π = 22/7)

**Diagram:** `SOL-CYL-01` → `Shared_Assets/Other_Diagrams/SOL-CYL-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Curved surface = 2πrh. <!-- MQ-G10C29-G-CYLINDER_T-01-S1 -->

$$2\times\frac{22}{7}\times14\times6 = 528$$

Step 2 — Two circular ends = 2πr². <!-- MQ-G10C29-G-CYLINDER_T-01-S2 -->

$$2\times\frac{22}{7}\times14^2 = 1232$$

Step 3 — Add. <!-- MQ-G10C29-G-CYLINDER_T-01-S3 -->

$$528 + 1232 = 1760\ \text{cm}^2$$

**Final answer:** $1760\ \text{cm}^2$
<br>**Accepted answer formats:** $1760\ \text{cm}^2$ · **Unit:** cm²

<sub>Verification: machine-checked</sub>


## G10C30 — Probability

### F-PRO-BASIC — Probability of an event
<!-- meta {"id": "F-PRO-BASIC", "chapter": "G10C30", "supplied": false, "medium": "en"} -->

$$P(A) = \frac{n(A)}{n(S)}$$

- **Symbols:** n(A) favourable, n(S) total equally likely outcomes
- **Units:** —
- **When to use:** Equally likely outcomes.
- **When not to use / conditions:** Outcomes must be equally likely.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C30-F-PROB_SIMPL-01
<!-- meta {"id": "MQ-G10C30-F-PROB_SIMPL-01", "grade": 10, "chapter": "G10C30", "area": "PRO", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-PRO-BASIC", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C30-F-PROB_SIMPL-01-S1", "MQ-G10C30-F-PROB_SIMPL-01-S2"]} -->
**Topic:** Probability · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-PRO-BASIC`

**Question:** A bag has 5 red, 5 blue and 10 green balls (identical except colour). One ball is taken at random. Find the probability that it is red.

**Step-by-step solution**

Step 1 — Total number of balls. <!-- MQ-G10C30-F-PROB_SIMPL-01-S1 -->

$$5+5+10 = 20$$

Step 2 — P(red) = red ÷ total. <!-- MQ-G10C30-F-PROB_SIMPL-01-S2 -->

$$P = \frac{5}{20} = \frac{1}{4}$$

**Final answer:** $\frac{1}{4}$
<br>**Accepted answer formats:** $\frac{1}{4}$

<sub>Verification: machine-checked</sub>

### F-PRO-COMP — Complement
<!-- meta {"id": "F-PRO-COMP", "chapter": "G10C30", "supplied": false, "medium": "en"} -->

$$P(A') = 1 - P(A)$$

- **Symbols:** A′ not A
- **Units:** —
- **When to use:** 'Not' or 'at least one' questions.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C30-G-PROB_COMPL-01
<!-- meta {"id": "MQ-G10C30-G-PROB_COMPL-01", "grade": 10, "chapter": "G10C30", "area": "PRO", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "F-PRO-COMP", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C30-G-PROB_COMPL-01-S1"]} -->
**Topic:** Probability · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `F-PRO-COMP`

**Question:** The probability that it rains tomorrow is \frac{3}{8}. Find the probability that it does NOT rain.

**Step-by-step solution**

Step 1 — P(not A) = 1 − P(A). <!-- MQ-G10C30-G-PROB_COMPL-01-S1 -->

$$1 - \frac{3}{8} = \frac{5}{8}$$

**Final answer:** $\frac{5}{8}$
<br>**Accepted answer formats:** $\frac{5}{8}$

<sub>Verification: machine-checked</sub>


## G10C31 — Angles in a Circle

### T-CIR-CENTRE — Angle at the centre
<!-- meta {"id": "T-CIR-CENTRE", "chapter": "G10C31", "supplied": false, "medium": "en"} -->

$$\angle AOB = 2\angle ACB$$

- **Symbols:** same arc AB
- **Units:** °
- **When to use:** Centre and circumference angles.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C31-F-ANGLE_CENT-01
<!-- meta {"id": "MQ-G10C31-F-ANGLE_CENT-01", "grade": 10, "chapter": "G10C31", "area": "GEO", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "T-CIR-CENTRE", "diagram": "GEO-CIRC-CENTRE-01", "kind": "numeric", "verification": "logic-review", "steps": ["MQ-G10C31-F-ANGLE_CENT-01-S1"]} -->
**Topic:** Angles in a Circle · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `T-CIR-CENTRE`

**Question:** O is the centre of the circle. The angle subtended by arc AB at a point C on the circumference is 42°. Find ∠AOB.

**Diagram:** `GEO-CIRC-CENTRE-01` → `Shared_Assets/Geometry/GEO-CIRC-CENTRE-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Angle at the centre = 2 × angle at the circumference. <!-- MQ-G10C31-F-ANGLE_CENT-01-S1 -->

$$\angle AOB = 2\times 42^\circ = 84^\circ$$

**Final answer:** $84^\circ$
<br>**Accepted answer formats:** $84^\circ$ · **Unit:** °

<sub>Verification: logic-reviewed (teacher review recommended)</sub>

### T-CIR-SAMESEG — Angles in the same segment
<!-- meta {"id": "T-CIR-SAMESEG", "chapter": "G10C31", "supplied": false, "medium": "en"} -->

$$\angle ACB = \angle ADB$$

- **Symbols:** C, D on the same arc
- **Units:** °
- **When to use:** Equal circumference angles.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C31-A-ANGLE_SAME-01
<!-- meta {"id": "MQ-G10C31-A-ANGLE_SAME-01", "grade": 10, "chapter": "G10C31", "area": "GEO", "medium": "en", "pathway": "A Grade Mastery", "difficulty": "hard", "formula": "T-CIR-SAMESEG", "diagram": "GEO-CIRC-SAMESEG-01", "kind": "numeric", "verification": "logic-review", "steps": ["MQ-G10C31-A-ANGLE_SAME-01-S1", "MQ-G10C31-A-ANGLE_SAME-01-S2"]} -->
**Topic:** Angles in a Circle · **Pathway:** A Grade Mastery · **Difficulty:** hard · **Formula:** `T-CIR-SAMESEG`

**Question:** A, B, C, D are points on a circle (in that order). ∠BAC = 35° and ∠ACD = 50°. Find ∠BDC and ∠ABD.

**Diagram:** `GEO-CIRC-SAMESEG-01` → `Shared_Assets/Geometry/GEO-CIRC-SAMESEG-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Angles in the same segment (on arc BC) are equal. <!-- MQ-G10C31-A-ANGLE_SAME-01-S1 -->

$$\angle BDC = \angle BAC = 35^\circ$$

Step 2 — Angles on arc AD are equal. <!-- MQ-G10C31-A-ANGLE_SAME-01-S2 -->

$$\angle ABD = \angle ACD = 50^\circ$$

**Final answer:** $\angle BDC=35^\circ,\ \angle ABD=50^\circ$
<br>**Accepted answer formats:** $\angle BDC=35^\circ,\ \angle ABD=50^\circ$ · **Unit:** °

<sub>Verification: logic-reviewed (teacher review recommended)</sub>

### T-CIR-SEMI — Angle in a semicircle
<!-- meta {"id": "T-CIR-SEMI", "chapter": "G10C31", "supplied": false, "medium": "en"} -->

$$AB\ \text{diameter} \Rightarrow \angle ACB = 90^\circ$$

- **Symbols:** —
- **Units:** °
- **When to use:** Right angles in circles.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C31-G-ANGLE_SEMI-01
<!-- meta {"id": "MQ-G10C31-G-ANGLE_SEMI-01", "grade": 10, "chapter": "G10C31", "area": "GEO", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "T-CIR-SEMI", "diagram": "GEO-CIRC-SEMI-01", "kind": "numeric", "verification": "logic-review", "steps": ["MQ-G10C31-G-ANGLE_SEMI-01-S1", "MQ-G10C31-G-ANGLE_SEMI-01-S2"]} -->
**Topic:** Angles in a Circle · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `T-CIR-SEMI`

**Question:** AB is a diameter of a circle and C is a point on the circle. ∠CAB = 61°. Find ∠ABC.

**Diagram:** `GEO-CIRC-SEMI-01` → `Shared_Assets/Geometry/GEO-CIRC-SEMI-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Angle in a semicircle is 90°. <!-- MQ-G10C31-G-ANGLE_SEMI-01-S1 -->

$$\angle ACB = 90^\circ$$

Step 2 — Angle sum of ΔABC. <!-- MQ-G10C31-G-ANGLE_SEMI-01-S2 -->

$$\angle ABC = 180 - 90 - 61 = 29^\circ$$

**Final answer:** $29^\circ$
<br>**Accepted answer formats:** $29^\circ$ · **Unit:** °

<sub>Verification: logic-reviewed (teacher review recommended)</sub>


## G10C32 — Scale Diagrams

### F-TRI-SCALE — Scale
<!-- meta {"id": "F-TRI-SCALE", "chapter": "G10C32", "supplied": false, "medium": "en"} -->

$$\text{real} = \text{drawing}\times\text{scale}$$

- **Symbols:** scale 1 : k
- **Units:** cm, m
- **When to use:** Maps and scale drawings.
- **When not to use / conditions:** Convert units at the end.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C32-F-SCALE_CONV-01
<!-- meta {"id": "MQ-G10C32-F-SCALE_CONV-01", "grade": 10, "chapter": "G10C32", "area": "TRI", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-TRI-SCALE", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C32-F-SCALE_CONV-01-S1", "MQ-G10C32-F-SCALE_CONV-01-S2"]} -->
**Topic:** Scale Diagrams · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-TRI-SCALE`

**Question:** On a scale diagram drawn to 1 : 100, a length is 7 cm. Find the actual length in metres.

**Step-by-step solution**

Step 1 — Multiply by the scale. <!-- MQ-G10C32-F-SCALE_CONV-01-S1 -->

$$7\times 100 = 700\ \text{cm}$$

Step 2 — Convert cm to m (÷ 100). <!-- MQ-G10C32-F-SCALE_CONV-01-S2 -->

$$700\div 100 = 7\ \text{m}$$

**Final answer:** $7\ \text{m}$
<br>**Accepted answer formats:** $7\ \text{m}$ · **Unit:** m

<sub>Verification: machine-checked</sub>

### F-TRI-BEAR — Back bearing
<!-- meta {"id": "F-TRI-BEAR", "chapter": "G10C32", "supplied": false, "medium": "en"} -->

$$\beta_{back} = \beta \pm 180^\circ$$

- **Symbols:** β bearing
- **Units:** °
- **When to use:** Direction from B to A when A to B is known.
- **When not to use / conditions:** Always three digits.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G10C32-G-BEARING_BA-01
<!-- meta {"id": "MQ-G10C32-G-BEARING_BA-01", "grade": 10, "chapter": "G10C32", "area": "TRI", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "F-TRI-BEAR", "diagram": "TRI-BEARING-01", "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G10C32-G-BEARING_BA-01-S1", "MQ-G10C32-G-BEARING_BA-01-S2"]} -->
**Topic:** Scale Diagrams · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `F-TRI-BEAR`

**Question:** The bearing of B from A is 300°. Find the bearing of A from B.

**Diagram:** `TRI-BEARING-01` → `Shared_Assets/Other_Diagrams/TRI-BEARING-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Back bearing = bearing ± 180°. <!-- MQ-G10C32-G-BEARING_BA-01-S1 -->

$$300 - 180 = 120$$

Step 2 — Write with three digits. <!-- MQ-G10C32-G-BEARING_BA-01-S2 -->

$$120^\circ$$

**Final answer:** $120^\circ$
<br>**Accepted answer formats:** $120^\circ$ · **Unit:** °

<sub>Verification: machine-checked</sub>


## G11C01 — Real Numbers

### F-NUM-REAL — Rational numbers
<!-- meta {"id": "F-NUM-REAL", "chapter": "G11C01", "supplied": false, "medium": "en"} -->

$$\frac pq,\ p,q\in\mathbb Z,\ q\ne 0$$

- **Symbols:** p, q integers
- **Units:** —
- **When to use:** Classifying numbers.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C01-F-CLASSIFY-01
<!-- meta {"id": "MQ-G11C01-F-CLASSIFY-01", "grade": 11, "chapter": "G11C01", "area": "NUM", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-NUM-REAL", "diagram": null, "kind": "concept", "verification": "logic-review", "steps": ["MQ-G11C01-F-CLASSIFY-01-S1", "MQ-G11C01-F-CLASSIFY-01-S2"]} -->
**Topic:** Real Numbers · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-NUM-REAL`

**Question:** Is $\sqrt{7}$ rational or irrational? Give a reason.

**Step-by-step solution**

Step 1 — A rational number can be written as p/q (q ≠ 0); its decimal ends or repeats. <!-- MQ-G11C01-F-CLASSIFY-01-S1 -->

$$\frac{p}{q}$$

Step 2 — Check the given number. <!-- MQ-G11C01-F-CLASSIFY-01-S2 -->

$$\sqrt{7} \Rightarrow \text{irrational}$$

**Final answer:** $\text{irrational}$

<sub>Verification: logic-reviewed (teacher review recommended)</sub>

### F-NUM-SURD — Surd rules
<!-- meta {"id": "F-NUM-SURD", "chapter": "G11C01", "supplied": false, "medium": "en"} -->

$$\sqrt{ab} = \sqrt a\sqrt b,\ \frac{a}{\sqrt b} = \frac{a\sqrt b}{b}$$

- **Symbols:** a, b > 0
- **Units:** —
- **When to use:** Simplifying and rationalising.
- **When not to use / conditions:** √(a + b) ≠ √a + √b.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C01-G-SIMPLIFY_S-01
<!-- meta {"id": "MQ-G11C01-G-SIMPLIFY_S-01", "grade": 11, "chapter": "G11C01", "area": "NUM", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "F-NUM-SURD", "diagram": null, "kind": "algebra", "verification": "machine-checked", "steps": ["MQ-G11C01-G-SIMPLIFY_S-01-S1", "MQ-G11C01-G-SIMPLIFY_S-01-S2", "MQ-G11C01-G-SIMPLIFY_S-01-S3"]} -->
**Topic:** Real Numbers · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `F-NUM-SURD`

**Question:** Write $\sqrt{72}$ in its simplest surd form.

**Step-by-step solution**

Step 1 — Find the largest square factor. <!-- MQ-G11C01-G-SIMPLIFY_S-01-S1 -->

$$72 = 36\times 2$$

Step 2 — Split the root. <!-- MQ-G11C01-G-SIMPLIFY_S-01-S2 -->

$$\sqrt{72} = \sqrt{36}\times\sqrt{2}$$

Step 3 — Simplify. <!-- MQ-G11C01-G-SIMPLIFY_S-01-S3 -->

$$= 6\sqrt{2}$$

**Final answer:** $6\sqrt{2}$

<sub>Verification: machine-checked</sub>


## G11C02 — Indices and Logarithms I

### F-IDX-LAWS — Index laws
<!-- meta {"id": "F-IDX-LAWS", "chapter": "G11C02", "supplied": false, "medium": "en"} -->

$$a^ma^n = a^{m+n},\ \frac{a^m}{a^n} = a^{m-n},\ (a^m)^n = a^{mn},\ a^{-n} = \frac1{a^n},\ a^{\frac pq} = \sqrt[q]{a^p}$$

- **Symbols:** a ≠ 0
- **Units:** —
- **When to use:** Simplifying powers.
- **When not to use / conditions:** Laws need the same base.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C02-F-INDEX_LAWS-01
<!-- meta {"id": "MQ-G11C02-F-INDEX_LAWS-01", "grade": 11, "chapter": "G11C02", "area": "NUM", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-IDX-LAWS", "diagram": null, "kind": "algebra", "verification": "machine-checked", "steps": ["MQ-G11C02-F-INDEX_LAWS-01-S1", "MQ-G11C02-F-INDEX_LAWS-01-S2"]} -->
**Topic:** Indices and Logarithms I · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-IDX-LAWS`

**Question:** Simplify: $\frac{x^{4}\times x^{2}}{x^{3}}$

**Step-by-step solution**

Step 1 — Multiply → add indices. <!-- MQ-G11C02-F-INDEX_LAWS-01-S1 -->

$$x^{4+2} = x^{6}$$

Step 2 — Divide → subtract indices. <!-- MQ-G11C02-F-INDEX_LAWS-01-S2 -->

$$x^{6-3} = x^{3}$$

**Final answer:** $x^{3}$

<sub>Verification: machine-checked</sub>


## G11C04 — Surface Area of Solids

### F-MEN-SPHA — Surface area of a sphere
<!-- meta {"id": "F-MEN-SPHA", "chapter": "G11C04", "supplied": false, "medium": "en"} -->

$$A = 4\pi r^2\ (\text{hemisphere solid: } 3\pi r^2)$$

- **Symbols:** r radius
- **Units:** cm²
- **When to use:** Balls, domes.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C04-F-SPHERE_SA-01
<!-- meta {"id": "MQ-G11C04-F-SPHERE_SA-01", "grade": 11, "chapter": "G11C04", "area": "MEN", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-MEN-SPHA", "diagram": "SOL-SPHERE-01", "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G11C04-F-SPHERE_SA-01-S1", "MQ-G11C04-F-SPHERE_SA-01-S2"]} -->
**Topic:** Surface Area of Solids · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-MEN-SPHA`

**Question:** Find the surface area of a sphere of radius \frac{7}{2} cm. (π = 22/7)

**Diagram:** `SOL-SPHERE-01` → `Shared_Assets/Other_Diagrams/SOL-SPHERE-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — A = 4πr². <!-- MQ-G11C04-F-SPHERE_SA-01-S1 -->

$$A = 4\times\frac{22}{7}\times (\frac{7}{2})^2$$

Step 2 — Calculate. <!-- MQ-G11C04-F-SPHERE_SA-01-S2 -->

$$A = 154\ \text{cm}^2$$

**Final answer:** $154\ \text{cm}^2$
<br>**Accepted answer formats:** $154\ \text{cm}^2$ · **Unit:** cm²

<sub>Verification: machine-checked</sub>

### F-MEN-CONEA — Surface area of a cone
<!-- meta {"id": "F-MEN-CONEA", "chapter": "G11C04", "supplied": false, "medium": "en"} -->

$$\text{CSA} = \pi rl,\ l = \sqrt{r^2+h^2}$$

- **Symbols:** r radius, l slant height, h height
- **Units:** cm²
- **When to use:** Cone surfaces, funnels.
- **When not to use / conditions:** Use l, not h.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C04-G-CONE_CSA-01
<!-- meta {"id": "MQ-G11C04-G-CONE_CSA-01", "grade": 11, "chapter": "G11C04", "area": "MEN", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "F-MEN-CONEA", "diagram": "SOL-CONE-01", "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G11C04-G-CONE_CSA-01-S1", "MQ-G11C04-G-CONE_CSA-01-S2"]} -->
**Topic:** Surface Area of Solids · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `F-MEN-CONEA`

**Question:** A right circular cone has base radius 7 cm and height 24 cm. Find the slant height and the curved surface area. (π = 22/7)

**Diagram:** `SOL-CONE-01` → `Shared_Assets/Other_Diagrams/SOL-CONE-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Slant height by Pythagoras. <!-- MQ-G11C04-G-CONE_CSA-01-S1 -->

$$l = \sqrt{7^2 + 24^2} = \sqrt{625} = 25$$

Step 2 — Curved surface area = πrl. <!-- MQ-G11C04-G-CONE_CSA-01-S2 -->

$$\frac{22}{7}\times 7\times 25 = 550\ \text{cm}^2$$

**Final answer:** $l=25\text{ cm},\ 550\ \text{cm}^2$
<br>**Accepted answer formats:** $l=25\text{ cm},\ 550\ \text{cm}^2$ · **Unit:** cm²

<sub>Verification: machine-checked</sub>


## G11C05 — Volume of Solids

### F-MEN-CONEV — Volume of a cone
<!-- meta {"id": "F-MEN-CONEV", "chapter": "G11C05", "supplied": true, "medium": "en"} -->

$$V = \frac13\pi r^2h$$

- **Symbols:** r radius, h perpendicular height
- **Units:** cm³
- **When to use:** Cones, conical containers.
- **When not to use / conditions:** —
- **Rearrangement:** $h = \frac{3V}{\pi r^2}$
- **Supplied in exam?** A version has been printed on Paper II in verified papers.

#### Worked example (verified) — MQ-G11C05-F-CONE_VOLUM-01
<!-- meta {"id": "MQ-G11C05-F-CONE_VOLUM-01", "grade": 11, "chapter": "G11C05", "area": "MEN", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-MEN-CONEV", "diagram": "SOL-CONE-01", "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G11C05-F-CONE_VOLUM-01-S1", "MQ-G11C05-F-CONE_VOLUM-01-S2"]} -->
**Topic:** Volume of Solids · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-MEN-CONEV`

**Question:** Find the volume of a cone with base radius 7 cm and height 12 cm. (π = 22/7)

**Diagram:** `SOL-CONE-01` → `Shared_Assets/Other_Diagrams/SOL-CONE-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — V = ⅓πr²h. <!-- MQ-G11C05-F-CONE_VOLUM-01-S1 -->

$$V = \frac13\times\frac{22}{7}\times7^2\times12$$

Step 2 — Calculate. <!-- MQ-G11C05-F-CONE_VOLUM-01-S2 -->

$$V = 616\ \text{cm}^3$$

**Final answer:** $616\ \text{cm}^3$
<br>**Accepted answer formats:** $616\ \text{cm}^3$ · **Unit:** cm³

<sub>Verification: machine-checked</sub>

### F-MEN-SPHV — Volume of a sphere
<!-- meta {"id": "F-MEN-SPHV", "chapter": "G11C05", "supplied": true, "medium": "en"} -->

$$V = \frac43\pi r^3\ (\text{hemisphere: }\frac23\pi r^3)$$

- **Symbols:** r radius
- **Units:** cm³
- **When to use:** Balls, melting/recasting.
- **When not to use / conditions:** —
- **Rearrangement:** $r = \sqrt[3]{\frac{3V}{4\pi}}$
- **Supplied in exam?** A version has been printed on Paper II in verified papers.

#### Worked example (verified) — MQ-G11C05-G-SPHERE_VOL-01
<!-- meta {"id": "MQ-G11C05-G-SPHERE_VOL-01", "grade": 11, "chapter": "G11C05", "area": "MEN", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "F-MEN-SPHV", "diagram": "SOL-SPHERE-01", "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G11C05-G-SPHERE_VOL-01-S1", "MQ-G11C05-G-SPHERE_VOL-01-S2"]} -->
**Topic:** Volume of Solids · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `F-MEN-SPHV`

**Question:** Find the volume of a sphere of radius 6 cm. (π = 22/7)

**Diagram:** `SOL-SPHERE-01` → `Shared_Assets/Other_Diagrams/SOL-SPHERE-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — V = (4/3)πr³. <!-- MQ-G11C05-G-SPHERE_VOL-01-S1 -->

$$V = \frac43\times\frac{22}{7}\times(6)^3$$

Step 2 — Calculate. <!-- MQ-G11C05-G-SPHERE_VOL-01-S2 -->

$$V = \frac{6336}{7}\ \text{cm}^3 \approx 905.14$$

**Final answer:** $\frac{6336}{7}\ \text{cm}^3$
<br>**Accepted answer formats:** $\frac{6336}{7}\ \text{cm}^3$ · **Unit:** cm³ · **Accepted tolerance:** ±0.01

<sub>Verification: machine-checked</sub>


## G11C06 — Binomial Expressions

### F-ALG-CUBE — Cube of a binomial
<!-- meta {"id": "F-ALG-CUBE", "chapter": "G11C06", "supplied": false, "medium": "en"} -->

$$(a\pm b)^3 = a^3 \pm 3a^2b + 3ab^2 \pm b^3$$

- **Symbols:** a, b terms
- **Units:** —
- **When to use:** Expanding cubes.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C06-F-CUBE_EXPAN-01
<!-- meta {"id": "MQ-G11C06-F-CUBE_EXPAN-01", "grade": 11, "chapter": "G11C06", "area": "ALG", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-ALG-CUBE", "diagram": null, "kind": "algebra", "verification": "machine-checked", "steps": ["MQ-G11C06-F-CUBE_EXPAN-01-S1", "MQ-G11C06-F-CUBE_EXPAN-01-S2"]} -->
**Topic:** Binomial Expressions · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-ALG-CUBE`

**Question:** Expand: $(x + 2)^3$

**Step-by-step solution**

Step 1 — Use (a + b)³ = a³ + 3a²b + 3ab² + b³. <!-- MQ-G11C06-F-CUBE_EXPAN-01-S1 -->

$$x^3 + 3x^2(2) + 3x(2)^2 + 2^3$$

Step 2 — Simplify. <!-- MQ-G11C06-F-CUBE_EXPAN-01-S2 -->

$$= x^{3} + 6x^{2} + 12x + 8$$

**Final answer:** $x^{3} + 6x^{2} + 12x + 8$

<sub>Verification: machine-checked</sub>


## G11C08 — Areas of Plane Figures between Parallel Lines

### T-GEO-AREA-PAR — Areas between parallels
<!-- meta {"id": "T-GEO-AREA-PAR", "chapter": "G11C08", "supplied": false, "medium": "en"} -->

$$\triangle = \tfrac12\,\square\ (\text{same base, same parallels})$$

- **Symbols:** —
- **Units:** cm²
- **When to use:** Equal-area proofs.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C08-F-SAME_BASE_-01
<!-- meta {"id": "MQ-G11C08-F-SAME_BASE_-01", "grade": 11, "chapter": "G11C08", "area": "GEO", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "T-GEO-AREA-PAR", "diagram": "GEO-PARALLEL-AREA-01", "kind": "numeric", "verification": "logic-review", "steps": ["MQ-G11C08-F-SAME_BASE_-01-S1", "MQ-G11C08-F-SAME_BASE_-01-S2"]} -->
**Topic:** Areas of Plane Figures between Parallel Lines · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `T-GEO-AREA-PAR`

**Question:** ΔABC and ΔDBC are on the same base BC and between the same parallel lines (AD ∥ BC). Area of ΔABC = 24 cm². Find the area of ΔDBC.

**Diagram:** `GEO-PARALLEL-AREA-01` → `Shared_Assets/Geometry/GEO-PARALLEL-AREA-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Same base, same height (distance between parallels). <!-- MQ-G11C08-F-SAME_BASE_-01-S1 -->

$$h_{ABC} = h_{DBC}$$

Step 2 — So the areas are equal. <!-- MQ-G11C08-F-SAME_BASE_-01-S2 -->

$$\text{Area }\triangle DBC = 24\ \text{cm}^2$$

**Final answer:** $24\ \text{cm}^2$
<br>**Accepted answer formats:** $24\ \text{cm}^2$ · **Unit:** cm²

<sub>Verification: logic-reviewed (teacher review recommended)</sub>


## G11C09 — Percentage

### F-FIN-RATES — Rates (assessment tax)
<!-- meta {"id": "F-FIN-RATES", "chapter": "G11C09", "supplied": false, "medium": "en"} -->

$$\text{annual rates} = \text{annual value}\times\frac{r}{100}$$

- **Symbols:** r rate %
- **Units:** Rs.
- **When to use:** Council property tax.
- **When not to use / conditions:** Quarterly = annual ÷ 4.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C09-F-RATES_TAX-01
<!-- meta {"id": "MQ-G11C09-F-RATES_TAX-01", "grade": 11, "chapter": "G11C09", "area": "FIN", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-FIN-RATES", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G11C09-F-RATES_TAX-01-S1", "MQ-G11C09-F-RATES_TAX-01-S2"]} -->
**Topic:** Percentage · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-FIN-RATES`

**Question:** The annual value of a house is Rs. 40 000. The council charges rates of 10%. Find the rates per quarter.

**Step-by-step solution**

Step 1 — Annual rates. <!-- MQ-G11C09-F-RATES_TAX-01-S1 -->

$$40\,000\times\frac{10}{100} = 4000$$

Step 2 — One quarter = ÷ 4. <!-- MQ-G11C09-F-RATES_TAX-01-S2 -->

$$4000\div 4 = 1000$$

**Final answer:** $\text{Rs. }1000$
<br>**Accepted answer formats:** $\text{Rs. }1000$ · **Unit:** Rs.

<sub>Verification: machine-checked</sub>

### F-FIN-CI — Compound interest
<!-- meta {"id": "F-FIN-CI", "chapter": "G11C09", "supplied": false, "medium": "en"} -->

$$A = P\left(1+\frac{R}{100}\right)^n$$

- **Symbols:** P principal, R rate %, n years
- **Units:** Rs.
- **When to use:** Interest added each year.
- **When not to use / conditions:** Exam working usually shows year by year.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C09-G-COMPOUND_I-01
<!-- meta {"id": "MQ-G11C09-G-COMPOUND_I-01", "grade": 11, "chapter": "G11C09", "area": "FIN", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "F-FIN-CI", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G11C09-G-COMPOUND_I-01-S1", "MQ-G11C09-G-COMPOUND_I-01-S2", "MQ-G11C09-G-COMPOUND_I-01-S3", "MQ-G11C09-G-COMPOUND_I-01-S4", "MQ-G11C09-G-COMPOUND_I-01-S5"]} -->
**Topic:** Percentage · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `F-FIN-CI`

**Question:** Rs. 100 000 is deposited at 8% compound interest per year. Find the total amount after 2 years and the interest earned.

**Step-by-step solution**

Step 1 — Interest for year 1. <!-- MQ-G11C09-G-COMPOUND_I-01-S1 -->

$$100\,000\times\frac{8}{100} = 8000$$

Step 2 — Amount after year 1. <!-- MQ-G11C09-G-COMPOUND_I-01-S2 -->

$$100\,000 + 8000 = 108\,000$$

Step 3 — Interest for year 2 is on the new amount. <!-- MQ-G11C09-G-COMPOUND_I-01-S3 -->

$$108\,000\times\frac{8}{100} = 8640$$

Step 4 — Amount after year 2. <!-- MQ-G11C09-G-COMPOUND_I-01-S4 -->

$$108\,000 + 8640 = 116\,640$$

Step 5 — Total interest. <!-- MQ-G11C09-G-COMPOUND_I-01-S5 -->

$$116\,640 - 100\,000 = 16\,640$$

**Final answer:** $\text{Amount }\text{Rs. }116\,640,\ \text{interest }\text{Rs. }16\,640$
<br>**Accepted answer formats:** $\text{Amount }\text{Rs. }116\,640,\ \text{interest }\text{Rs. }16\,640$ · **Unit:** Rs.

> ⚠️ **Common mistake:** Calculating year-2 interest on the original amount (that is simple interest).

<sub>Verification: machine-checked</sub>

### F-FIN-TAX — Income tax by bands
<!-- meta {"id": "F-FIN-TAX", "chapter": "G11C09", "supplied": false, "medium": "en"} -->

$$\text{tax} = \sum (\text{amount in band})\times\frac{r_{band}}{100}$$

- **Symbols:** bands from the table given
- **Units:** Rs.
- **When to use:** Progressive tax tables.
- **When not to use / conditions:** Use the table printed in the question; rates change by law.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C09-A-INCOME_TAX-01
<!-- meta {"id": "MQ-G11C09-A-INCOME_TAX-01", "grade": 11, "chapter": "G11C09", "area": "FIN", "medium": "en", "pathway": "A Grade Mastery", "difficulty": "hard", "formula": "F-FIN-TAX", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G11C09-A-INCOME_TAX-01-S1", "MQ-G11C09-A-INCOME_TAX-01-S2", "MQ-G11C09-A-INCOME_TAX-01-S3", "MQ-G11C09-A-INCOME_TAX-01-S4", "MQ-G11C09-A-INCOME_TAX-01-S5"]} -->
**Topic:** Percentage · **Pathway:** A Grade Mastery · **Difficulty:** hard · **Formula:** `F-FIN-TAX`

**Question:** (Illustrative tax table) The first Rs. 1 200 000 of annual income is tax-free. The next Rs. 500 000 is taxed at 6%, the next Rs. 500 000 at 12%, and the rest at 18%. Find the income tax on an annual income of Rs. 2 400 000.

**Step-by-step solution**

Step 1 — Taxable income. <!-- MQ-G11C09-A-INCOME_TAX-01-S1 -->

$$2\,400\,000 - 1\,200\,000 = 1\,200\,000$$

Step 2 — Tax on Rs. 500 000 at 6%. <!-- MQ-G11C09-A-INCOME_TAX-01-S2 -->

$$500\,000\times\frac{6}{100} = 30\,000$$

Step 3 — Tax on Rs. 500 000 at 12%. <!-- MQ-G11C09-A-INCOME_TAX-01-S3 -->

$$500\,000\times\frac{12}{100} = 60\,000$$

Step 4 — Tax on Rs. 200 000 at 18%. <!-- MQ-G11C09-A-INCOME_TAX-01-S4 -->

$$200\,000\times\frac{18}{100} = 36\,000$$

Step 5 — Total tax. <!-- MQ-G11C09-A-INCOME_TAX-01-S5 -->

$$30\,000 + 60\,000 + 36\,000 = 126\,000$$

**Final answer:** $\text{Rs. }126\,000$
<br>**Accepted answer formats:** $\text{Rs. }126\,000$ · **Unit:** Rs.

> ⚠️ **Common mistake:** Applying the highest rate to the whole income.

<sub>Verification: machine-checked</sub>


## G11C10 — Share Market

### F-FIN-SHARE — Shares and dividends
<!-- meta {"id": "F-FIN-SHARE", "chapter": "G11C10", "supplied": false, "medium": "en"} -->

$$N = \frac{\text{money}}{\text{price}},\ \text{dividend} = N\times d$$

- **Symbols:** d dividend per share
- **Units:** Rs.
- **When to use:** Share market problems.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C10-F-BUY_SHARES-01
<!-- meta {"id": "MQ-G11C10-F-BUY_SHARES-01", "grade": 11, "chapter": "G11C10", "area": "FIN", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-FIN-SHARE", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G11C10-F-BUY_SHARES-01-S1"]} -->
**Topic:** Share Market · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-FIN-SHARE`

**Question:** How many shares priced at Rs. 12 each can be bought with Rs. 36 000?

**Step-by-step solution**

Step 1 — Number of shares = money ÷ price per share. <!-- MQ-G11C10-F-BUY_SHARES-01-S1 -->

$$36\,000\div12 = 3000$$

**Final answer:** $3000$
<br>**Accepted answer formats:** $3000$

<sub>Verification: machine-checked</sub>


## G11C11 — Mid-point Theorem

### T-GEO-MID — Mid-point theorem
<!-- meta {"id": "T-GEO-MID", "chapter": "G11C11", "supplied": false, "medium": "en"} -->

$$PQ\parallel BC,\ PQ = \tfrac12 BC$$

- **Symbols:** P, Q midpoints of AB, AC
- **Units:** cm
- **When to use:** Lengths from midpoints.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C11-F-MIDPOINT_L-01
<!-- meta {"id": "MQ-G11C11-F-MIDPOINT_L-01", "grade": 11, "chapter": "G11C11", "area": "GEO", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "T-GEO-MID", "diagram": "GEO-MIDPT-01", "kind": "numeric", "verification": "logic-review", "steps": ["MQ-G11C11-F-MIDPOINT_L-01-S1", "MQ-G11C11-F-MIDPOINT_L-01-S2"]} -->
**Topic:** Mid-point Theorem · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `T-GEO-MID`

**Question:** In ΔABC, P and Q are the midpoints of AB and AC. BC = 10 cm. Find PQ.

**Diagram:** `GEO-MIDPT-01` → `Shared_Assets/Geometry/GEO-MIDPT-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Mid-point theorem: PQ ∥ BC and PQ = ½ BC. <!-- MQ-G11C11-F-MIDPOINT_L-01-S1 -->

$$PQ = \tfrac12 BC$$

Step 2 — Calculate. <!-- MQ-G11C11-F-MIDPOINT_L-01-S2 -->

$$PQ = \tfrac12\times 10 = 5\ \text{cm}$$

**Final answer:** $5\ \text{cm}$
<br>**Accepted answer formats:** $5\ \text{cm}$ · **Unit:** cm

<sub>Verification: logic-reviewed (teacher review recommended)</sub>


## G11C12 — Graphs

### F-GRA-VERTEX — Turning point form
<!-- meta {"id": "F-GRA-VERTEX", "chapter": "G11C12", "supplied": false, "medium": "en"} -->

$$y = (x+b)^2 + c \Rightarrow (-b,\ c)$$

- **Symbols:** b, c constants
- **Units:** —
- **When to use:** Turning point, axis of symmetry, min/max.
- **When not to use / conditions:** For y = −(x + b)² + c the point is a maximum.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C12-F-TP_FROM_VE-01
<!-- meta {"id": "MQ-G11C12-F-TP_FROM_VE-01", "grade": 11, "chapter": "G11C12", "area": "GRA", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-GRA-VERTEX", "diagram": "GRA-QUAD-01", "kind": "numeric", "verification": "logic-review", "steps": ["MQ-G11C12-F-TP_FROM_VE-01-S1", "MQ-G11C12-F-TP_FROM_VE-01-S2", "MQ-G11C12-F-TP_FROM_VE-01-S3"]} -->
**Topic:** Graphs · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-GRA-VERTEX`

**Question:** For $y = (x  - 1)^2  + 4$, write down the turning point, the axis of symmetry and the minimum value of y.

**Diagram:** `GRA-QUAD-01` → `Shared_Assets/Graphs/GRA-QUAD-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Compare with y = (x + b)² + c: turning point (−b, c). <!-- MQ-G11C12-F-TP_FROM_VE-01-S1 -->

$$(-(-1),\ 4) = (1,\ 4)$$

Step 2 — Axis of symmetry passes through the turning point. <!-- MQ-G11C12-F-TP_FROM_VE-01-S2 -->

$$x = 1$$

Step 3 — (x + b)² ≥ 0, so the minimum is c. <!-- MQ-G11C12-F-TP_FROM_VE-01-S3 -->

$$y_{\min} = 4$$

**Final answer:** $(1,4),\ x=1,\ y_{\min}=4$
<br>**Accepted answer formats:** $(1,4),\ x=1,\ y_{\min}=4$

<sub>Verification: logic-reviewed (teacher review recommended)</sub>


## G11C13 — Equations

### F-ALG-QFORM — Quadratic formula
<!-- meta {"id": "F-ALG-QFORM", "chapter": "G11C13", "supplied": false, "medium": "en"} -->

$$x = \frac{-b\pm\sqrt{b^2-4ac}}{2a}$$

- **Symbols:** ax² + bx + c = 0
- **Units:** —
- **When to use:** Quadratics that do not factorise.
- **When not to use / conditions:** b² − 4ac < 0: no real roots.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C13-G-QUAD_FORMU-01
<!-- meta {"id": "MQ-G11C13-G-QUAD_FORMU-01", "grade": 11, "chapter": "G11C13", "area": "ALG", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "F-ALG-QFORM", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G11C13-G-QUAD_FORMU-01-S1", "MQ-G11C13-G-QUAD_FORMU-01-S2", "MQ-G11C13-G-QUAD_FORMU-01-S3", "MQ-G11C13-G-QUAD_FORMU-01-S4"]} -->
**Topic:** Equations · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `F-ALG-QFORM`

**Question:** Solve $x^{2} + 2x - 4 = 0$ using the formula. Give answers to 2 decimal places.

**Step-by-step solution**

Step 1 — Identify a, b, c. <!-- MQ-G11C13-G-QUAD_FORMU-01-S1 -->

$$a = 1,\ b = 2,\ c = -4$$

Step 2 — Discriminant b² − 4ac. <!-- MQ-G11C13-G-QUAD_FORMU-01-S2 -->

$$(2)^2 - 4(1)(-4) = 20$$

Step 3 — Formula. <!-- MQ-G11C13-G-QUAD_FORMU-01-S3 -->

$$x = \frac{-(2) \pm \sqrt{20}}{2\times1},\quad \sqrt{20} \approx 4.472$$

Step 4 — Two answers. <!-- MQ-G11C13-G-QUAD_FORMU-01-S4 -->

$$x \approx 1.24\ \text{or}\ x \approx -3.24$$

**Final answer:** $x \approx 1.24,\ -3.24$
<br>**Accepted answer formats:** $x \approx 1.24,\ -3.24$ · **Accepted tolerance:** ±0.01

<sub>Verification: machine-checked</sub>


## G11C14 — Equiangular Triangles

### T-GEO-SIM — Equiangular triangles
<!-- meta {"id": "T-GEO-SIM", "chapter": "G11C14", "supplied": false, "medium": "en"} -->

$$\frac{AB}{PQ} = \frac{BC}{QR} = \frac{CA}{RP}$$

- **Symbols:** corresponding sides
- **Units:** —
- **When to use:** Unknown sides in similar triangles.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C14-F-SIMILAR_RA-01
<!-- meta {"id": "MQ-G11C14-F-SIMILAR_RA-01", "grade": 11, "chapter": "G11C14", "area": "GEO", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "T-GEO-SIM", "diagram": "GEO-SIMILAR-01", "kind": "numeric", "verification": "logic-review", "steps": ["MQ-G11C14-F-SIMILAR_RA-01-S1", "MQ-G11C14-F-SIMILAR_RA-01-S2", "MQ-G11C14-F-SIMILAR_RA-01-S3"]} -->
**Topic:** Equiangular Triangles · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `T-GEO-SIM`

**Question:** ΔABC and ΔPQR are equiangular. AB = 3 cm, BC = 5 cm and PQ = 9 cm. Find QR.

**Diagram:** `GEO-SIMILAR-01` → `Shared_Assets/Geometry/GEO-SIMILAR-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Corresponding sides are in the same ratio. <!-- MQ-G11C14-F-SIMILAR_RA-01-S1 -->

$$\frac{PQ}{AB} = \frac{QR}{BC}$$

Step 2 — Substitute. <!-- MQ-G11C14-F-SIMILAR_RA-01-S2 -->

$$\frac{9}{3} = \frac{QR}{5}$$

Step 3 — Solve. <!-- MQ-G11C14-F-SIMILAR_RA-01-S3 -->

$$QR = 5\times3 = 15\ \text{cm}$$

**Final answer:** $15\ \text{cm}$
<br>**Accepted answer formats:** $15\ \text{cm}$ · **Unit:** cm

<sub>Verification: logic-reviewed (teacher review recommended)</sub>


## G11C15 — Data Representation and Prediction

### F-STA-MEDIAN — Median position
<!-- meta {"id": "F-STA-MEDIAN", "chapter": "G11C15", "supplied": false, "medium": "en"} -->

$$\frac{n+1}{2}\text{th value}$$

- **Symbols:** n number of values (ordered)
- **Units:** —
- **When to use:** Middle value.
- **When not to use / conditions:** Order the data first.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C15-F-MEDIAN_POS-01
<!-- meta {"id": "MQ-G11C15-F-MEDIAN_POS-01", "grade": 11, "chapter": "G11C15", "area": "STA", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-STA-MEDIAN", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G11C15-F-MEDIAN_POS-01-S1", "MQ-G11C15-F-MEDIAN_POS-01-S2", "MQ-G11C15-F-MEDIAN_POS-01-S3"]} -->
**Topic:** Data Representation and Prediction · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-STA-MEDIAN`

**Question:** Find the median of: 18, 21, 22, 23, 25, 53, 56

**Step-by-step solution**

Step 1 — The data is already in order. Count the values. <!-- MQ-G11C15-F-MEDIAN_POS-01-S1 -->

$$n = 7$$

Step 2 — Median position = (n + 1)/2. <!-- MQ-G11C15-F-MEDIAN_POS-01-S2 -->

$$\frac{7+1}{2} = 4$$

Step 3 — Read that value. <!-- MQ-G11C15-F-MEDIAN_POS-01-S3 -->

$$\text{median} = 23$$

**Final answer:** $23$
<br>**Accepted answer formats:** $23$

<sub>Verification: machine-checked</sub>

### F-STA-QUART — Quartiles and IQR
<!-- meta {"id": "F-STA-QUART", "chapter": "G11C15", "supplied": false, "medium": "en"} -->

$$Q_1: \frac{n+1}{4},\ Q_3: \frac{3(n+1)}{4},\ \text{IQR} = Q_3-Q_1$$

- **Symbols:** n number of values
- **Units:** —
- **When to use:** Spread of data; cumulative frequency curves.
- **When not to use / conditions:** For grouped data read from the curve.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C15-G-QUARTILES-01
<!-- meta {"id": "MQ-G11C15-G-QUARTILES-01", "grade": 11, "chapter": "G11C15", "area": "STA", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "F-STA-QUART", "diagram": null, "kind": "numeric", "verification": "logic-review", "steps": ["MQ-G11C15-G-QUARTILES-01-S1", "MQ-G11C15-G-QUARTILES-01-S2", "MQ-G11C15-G-QUARTILES-01-S3"]} -->
**Topic:** Data Representation and Prediction · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `F-STA-QUART`

**Question:** For the 11 values 6, 28, 29, 30, 32, 38, 43, 48, 51, 59, 74, find the lower quartile, the upper quartile and the interquartile range.

**Step-by-step solution**

Step 1 — Q₁ position = (n + 1)/4. <!-- MQ-G11C15-G-QUARTILES-01-S1 -->

$$\frac{11+1}{4} = 3 \Rightarrow Q_1 = 29$$

Step 2 — Q₃ position = 3(n + 1)/4. <!-- MQ-G11C15-G-QUARTILES-01-S2 -->

$$\frac{3(11+1)}{4} = 9 \Rightarrow Q_3 = 51$$

Step 3 — Interquartile range = Q₃ − Q₁. <!-- MQ-G11C15-G-QUARTILES-01-S3 -->

$$51 - 29 = 22$$

**Final answer:** $Q_1=29,\ Q_3=51,\ \text{IQR}=22$
<br>**Accepted answer formats:** $Q_1=29,\ Q_3=51,\ \text{IQR}=22$

<sub>Verification: logic-reviewed (teacher review recommended)</sub>


## G11C16 — Geometric Progressions

### F-GP-TN — nth term of a GP
<!-- meta {"id": "F-GP-TN", "chapter": "G11C16", "supplied": false, "medium": "en"} -->

$$T_n = ar^{n-1}$$

- **Symbols:** a first term, r common ratio
- **Units:** —
- **When to use:** Multiplying patterns.
- **When not to use / conditions:** Not for APs.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C16-F-GP_NTH-01
<!-- meta {"id": "MQ-G11C16-F-GP_NTH-01", "grade": 11, "chapter": "G11C16", "area": "ALG", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-GP-TN", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G11C16-F-GP_NTH-01-S1", "MQ-G11C16-F-GP_NTH-01-S2", "MQ-G11C16-F-GP_NTH-01-S3"]} -->
**Topic:** Geometric Progressions · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-GP-TN`

**Question:** Find the 5th term of the geometric progression 2, 6, 18, …

**Step-by-step solution**

Step 1 — Common ratio r = second ÷ first. <!-- MQ-G11C16-F-GP_NTH-01-S1 -->

$$r = 3$$

Step 2 — Tₙ = arⁿ⁻¹. <!-- MQ-G11C16-F-GP_NTH-01-S2 -->

$$T_{5} = 2\times(3)^{4}$$

Step 3 — Calculate. <!-- MQ-G11C16-F-GP_NTH-01-S3 -->

$$= 2\times 81 = 162$$

**Final answer:** $162$
<br>**Accepted answer formats:** $162$

<sub>Verification: machine-checked</sub>

### F-GP-SN — Sum of a GP
<!-- meta {"id": "F-GP-SN", "chapter": "G11C16", "supplied": false, "medium": "en"} -->

$$S_n = \frac{a(r^n-1)}{r-1}\ (r\ne 1)$$

- **Symbols:** a, r, n
- **Units:** —
- **When to use:** Totals of growing amounts.
- **When not to use / conditions:** r = 1 gives S = na.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C16-G-GP_SUM-01
<!-- meta {"id": "MQ-G11C16-G-GP_SUM-01", "grade": 11, "chapter": "G11C16", "area": "ALG", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "F-GP-SN", "diagram": null, "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G11C16-G-GP_SUM-01-S1", "MQ-G11C16-G-GP_SUM-01-S2", "MQ-G11C16-G-GP_SUM-01-S3"]} -->
**Topic:** Geometric Progressions · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `F-GP-SN`

**Question:** Find the sum of the first 8 terms of the GP 1, 2, 4, …

**Step-by-step solution**

Step 1 — a and r. <!-- MQ-G11C16-G-GP_SUM-01-S1 -->

$$a = 1,\ r = 2$$

Step 2 — Sₙ = a(rⁿ − 1)/(r − 1) for r > 1. <!-- MQ-G11C16-G-GP_SUM-01-S2 -->

$$S_{8} = \frac{1(2^{8}-1)}{2-1}$$

Step 3 — Calculate. <!-- MQ-G11C16-G-GP_SUM-01-S3 -->

$$= \frac{1\times 255}{1} = 255$$

**Final answer:** $255$
<br>**Accepted answer formats:** $255$

<sub>Verification: machine-checked</sub>


## G11C17 — Pythagoras' Theorem

### T-GEO-PYTH — Pythagoras' theorem
<!-- meta {"id": "T-GEO-PYTH", "chapter": "G11C17", "supplied": false, "medium": "en"} -->

$$c^2 = a^2 + b^2$$

- **Symbols:** c hypotenuse
- **Units:** cm, m
- **When to use:** Right-angled triangles.
- **When not to use / conditions:** Not for non-right triangles.
- **Rearrangement:** $a = \sqrt{c^2-b^2}$
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C17-F-PYTH_HYP-01
<!-- meta {"id": "MQ-G11C17-F-PYTH_HYP-01", "grade": 11, "chapter": "G11C17", "area": "GEO", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "T-GEO-PYTH", "diagram": "GEO-RIGHT-01", "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G11C17-F-PYTH_HYP-01-S1", "MQ-G11C17-F-PYTH_HYP-01-S2"]} -->
**Topic:** Pythagoras' Theorem · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `T-GEO-PYTH`

**Question:** The two shorter sides of a right-angled triangle are 6 cm and 8 cm. Find the hypotenuse.

**Diagram:** `GEO-RIGHT-01` → `Shared_Assets/Geometry/GEO-RIGHT-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — c² = a² + b². <!-- MQ-G11C17-F-PYTH_HYP-01-S1 -->

$$c^2 = 6^2 + 8^2 = 36 + 64 = 100$$

Step 2 — Square root. <!-- MQ-G11C17-F-PYTH_HYP-01-S2 -->

$$c = \sqrt{100} = 10\ \text{cm}$$

**Final answer:** $10\ \text{cm}$
<br>**Accepted answer formats:** $10\ \text{cm}$ · **Unit:** cm

<sub>Verification: machine-checked</sub>


## G11C18 — Trigonometry

### F-TRI-RATIOS — Trigonometric ratios
<!-- meta {"id": "F-TRI-RATIOS", "chapter": "G11C18", "supplied": false, "medium": "en"} -->

$$\sin\theta = \frac{opp}{hyp},\ \cos\theta = \frac{adj}{hyp},\ \tan\theta = \frac{opp}{adj}$$

- **Symbols:** right-angled triangle
- **Units:** —
- **When to use:** Heights, distances, angles.
- **When not to use / conditions:** Only in right-angled triangles (O/L).
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C18-F-TRIG_RATIO-01
<!-- meta {"id": "MQ-G11C18-F-TRIG_RATIO-01", "grade": 11, "chapter": "G11C18", "area": "TRI", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-TRI-RATIOS", "diagram": "GEO-RIGHT-01", "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G11C18-F-TRIG_RATIO-01-S1", "MQ-G11C18-F-TRIG_RATIO-01-S2"]} -->
**Topic:** Trigonometry · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-TRI-RATIOS`

**Question:** In right-angled ΔABC, ∠B = 90°, AB = 4 cm, BC = 3 cm and AC = 5 cm. Write sin A, cos A and tan A.

**Diagram:** `GEO-RIGHT-01` → `Shared_Assets/Geometry/GEO-RIGHT-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — For angle A: opposite = BC, adjacent = AB, hypotenuse = AC. <!-- MQ-G11C18-F-TRIG_RATIO-01-S1 -->

$$\text{opp}=BC,\ \text{adj}=AB,\ \text{hyp}=AC$$

Step 2 — Ratios. <!-- MQ-G11C18-F-TRIG_RATIO-01-S2 -->

$$\sin A = \frac{3}{5},\ \cos A = \frac{4}{5},\ \tan A = \frac{3}{4}$$

**Final answer:** $\sin A=\frac{3}{5},\ \cos A=\frac{4}{5},\ \tan A=\frac{3}{4}$
<br>**Accepted answer formats:** $\sin A=\frac{3}{5},\ \cos A=\frac{4}{5},\ \tan A=\frac{3}{4}$

<sub>Verification: machine-checked</sub>


## G11C19 — Matrices

### F-MAT-ADD — Matrix addition
<!-- meta {"id": "F-MAT-ADD", "chapter": "G11C19", "supplied": false, "medium": "en"} -->

$$(A+B)_{ij} = a_{ij}+b_{ij}$$

- **Symbols:** same order
- **Units:** —
- **When to use:** Adding tables of data.
- **When not to use / conditions:** Different orders cannot be added.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C19-F-MAT_ADD-01
<!-- meta {"id": "MQ-G11C19-F-MAT_ADD-01", "grade": 11, "chapter": "G11C19", "area": "ALG", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-MAT-ADD", "diagram": null, "kind": "algebra", "verification": "logic-review", "steps": ["MQ-G11C19-F-MAT_ADD-01-S1", "MQ-G11C19-F-MAT_ADD-01-S2"]} -->
**Topic:** Matrices · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-MAT-ADD`

**Question:** Find A + B where $A = \begin{pmatrix}-1 & 2\\0 & 4\end{pmatrix}$ and $B = \begin{pmatrix}2 & 2\\-2 & 2\end{pmatrix}$.

**Step-by-step solution**

Step 1 — Add corresponding elements. <!-- MQ-G11C19-F-MAT_ADD-01-S1 -->

$$\begin{pmatrix}-1+(2) & 2+(2)\\0+(-2) & 4+(2)\end{pmatrix}$$

Step 2 — Simplify. <!-- MQ-G11C19-F-MAT_ADD-01-S2 -->

$$\begin{pmatrix}1 & 4\\-2 & 6\end{pmatrix}$$

**Final answer:** $\begin{pmatrix}1 & 4\\-2 & 6\end{pmatrix}$

<sub>Verification: logic-reviewed (teacher review recommended)</sub>

### F-MAT-MULT — Matrix multiplication
<!-- meta {"id": "F-MAT-MULT", "chapter": "G11C19", "supplied": false, "medium": "en"} -->

$$(AB)_{ij} = \text{row}_i(A)\cdot\text{col}_j(B)$$

- **Symbols:** columns of A = rows of B
- **Units:** —
- **When to use:** Combining prices × quantities.
- **When not to use / conditions:** AB ≠ BA in general.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C19-G-MAT_MULT-01
<!-- meta {"id": "MQ-G11C19-G-MAT_MULT-01", "grade": 11, "chapter": "G11C19", "area": "ALG", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "F-MAT-MULT", "diagram": null, "kind": "algebra", "verification": "logic-review", "steps": ["MQ-G11C19-G-MAT_MULT-01-S1", "MQ-G11C19-G-MAT_MULT-01-S2", "MQ-G11C19-G-MAT_MULT-01-S3"]} -->
**Topic:** Matrices · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `F-MAT-MULT`

**Question:** Find AB where $A = \begin{pmatrix}3 & -1\\1 & 0\end{pmatrix}$ and $B = \begin{pmatrix}0\\3\end{pmatrix}$. State the order of AB.

**Step-by-step solution**

Step 1 — Order: (2 × 2)(2 × 1) → 2 × 1. <!-- MQ-G11C19-G-MAT_MULT-01-S1 -->

$$2\times 1$$

Step 2 — Row × column. <!-- MQ-G11C19-G-MAT_MULT-01-S2 -->

$$\begin{pmatrix} 3(0) + -1(3) \\ 1(0) + 0(3) \end{pmatrix}$$

Step 3 — Simplify. <!-- MQ-G11C19-G-MAT_MULT-01-S3 -->

$$\begin{pmatrix}-3\\0\end{pmatrix}$$

**Final answer:** $\begin{pmatrix}-3\\0\end{pmatrix}$

<sub>Verification: logic-reviewed (teacher review recommended)</sub>


## G11C20 — Inequalities

### F-ALG-INEQ2 — Regions of inequalities
<!-- meta {"id": "F-ALG-INEQ2", "chapter": "G11C20", "supplied": false, "medium": "en"} -->

$$ax+by\le c$$

- **Symbols:** test a point to pick the side
- **Units:** —
- **When to use:** Graphical regions.
- **When not to use / conditions:** Dashed line for strict < >.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C20-F-POINT_IN_R-01
<!-- meta {"id": "MQ-G11C20-F-POINT_IN_R-01", "grade": 11, "chapter": "G11C20", "area": "ALG", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-ALG-INEQ2", "diagram": "GRA-REGION-01", "kind": "concept", "verification": "logic-review", "steps": ["MQ-G11C20-F-POINT_IN_R-01-S1", "MQ-G11C20-F-POINT_IN_R-01-S2", "MQ-G11C20-F-POINT_IN_R-01-S3"]} -->
**Topic:** Inequalities · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-ALG-INEQ2`

**Question:** Does the point (1, 2) lie in the region defined by x + y ≤ 5 and y ≥ 1?

**Diagram:** `GRA-REGION-01` → `Shared_Assets/Graphs/GRA-REGION-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Test x + y ≤ 5. <!-- MQ-G11C20-F-POINT_IN_R-01-S1 -->

$$1+2 = 3 \Rightarrow \checkmark$$

Step 2 — Test y ≥ 1. <!-- MQ-G11C20-F-POINT_IN_R-01-S2 -->

$$2 \geq 1 \Rightarrow \checkmark$$

Step 3 — Both must be true. <!-- MQ-G11C20-F-POINT_IN_R-01-S3 -->

$$\text{Yes}$$

**Final answer:** $\text{Yes}$

<sub>Verification: logic-reviewed (teacher review recommended)</sub>


## G11C21 — Cyclic Quadrilaterals

### T-CIR-CYCLIC — Cyclic quadrilateral
<!-- meta {"id": "T-CIR-CYCLIC", "chapter": "G11C21", "supplied": false, "medium": "en"} -->

$$\angle A+\angle C = 180^\circ;\ \text{ext.}\angle = \text{int. opp.}\angle$$

- **Symbols:** —
- **Units:** °
- **When to use:** Angles in cyclic quadrilaterals.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C21-F-CYCLIC_OPP-01
<!-- meta {"id": "MQ-G11C21-F-CYCLIC_OPP-01", "grade": 11, "chapter": "G11C21", "area": "GEO", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "T-CIR-CYCLIC", "diagram": "GEO-CYCLIC-01", "kind": "numeric", "verification": "logic-review", "steps": ["MQ-G11C21-F-CYCLIC_OPP-01-S1", "MQ-G11C21-F-CYCLIC_OPP-01-S2"]} -->
**Topic:** Cyclic Quadrilaterals · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `T-CIR-CYCLIC`

**Question:** ABCD is a cyclic quadrilateral. ∠A = 70° and ∠B = 95°. Find ∠C and ∠D.

**Diagram:** `GEO-CYCLIC-01` → `Shared_Assets/Geometry/GEO-CYCLIC-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Opposite angles of a cyclic quadrilateral add to 180°. <!-- MQ-G11C21-F-CYCLIC_OPP-01-S1 -->

$$\angle C = 180 - 70 = 110^\circ$$

Step 2 — Same for B and D. <!-- MQ-G11C21-F-CYCLIC_OPP-01-S2 -->

$$\angle D = 180 - 95 = 85^\circ$$

**Final answer:** $\angle C=110^\circ,\ \angle D=85^\circ$
<br>**Accepted answer formats:** $\angle C=110^\circ,\ \angle D=85^\circ$ · **Unit:** °

<sub>Verification: logic-reviewed (teacher review recommended)</sub>


## G11C22 — Tangents

### T-CIR-TAN — Tangent properties
<!-- meta {"id": "T-CIR-TAN", "chapter": "G11C22", "supplied": false, "medium": "en"} -->

$$OT\perp PT;\ PA = PB$$

- **Symbols:** T point of contact
- **Units:** —
- **When to use:** Tangent lengths and angles.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C22-F-TANGENT_RA-01
<!-- meta {"id": "MQ-G11C22-F-TANGENT_RA-01", "grade": 11, "chapter": "G11C22", "area": "GEO", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "T-CIR-TAN", "diagram": "GEO-TANGENT-01", "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G11C22-F-TANGENT_RA-01-S1", "MQ-G11C22-F-TANGENT_RA-01-S2", "MQ-G11C22-F-TANGENT_RA-01-S3"]} -->
**Topic:** Tangents · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `T-CIR-TAN`

**Question:** A tangent is drawn from a point P to a circle with centre O and radius 5 cm. OP = 13 cm. Find the length of the tangent.

**Diagram:** `GEO-TANGENT-01` → `Shared_Assets/Geometry/GEO-TANGENT-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Tangent ⟂ radius at the point of contact. <!-- MQ-G11C22-F-TANGENT_RA-01-S1 -->

$$\angle OTP = 90^\circ$$

Step 2 — Pythagoras. <!-- MQ-G11C22-F-TANGENT_RA-01-S2 -->

$$PT^2 = 13^2 - 5^2 = 144$$

Step 3 — Square root. <!-- MQ-G11C22-F-TANGENT_RA-01-S3 -->

$$PT = 12\ \text{cm}$$

**Final answer:** $12\ \text{cm}$
<br>**Accepted answer formats:** $12\ \text{cm}$ · **Unit:** cm

<sub>Verification: machine-checked</sub>

### T-CIR-ALTSEG — Alternate segment theorem
<!-- meta {"id": "T-CIR-ALTSEG", "chapter": "G11C22", "supplied": false, "medium": "en"} -->

$$\angle TAB = \angle ACB$$

- **Symbols:** TA tangent, AB chord
- **Units:** °
- **When to use:** Tangent–chord angles.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C22-A-ALTERNATE_-01
<!-- meta {"id": "MQ-G11C22-A-ALTERNATE_-01", "grade": 11, "chapter": "G11C22", "area": "GEO", "medium": "en", "pathway": "A Grade Mastery", "difficulty": "hard", "formula": "T-CIR-ALTSEG", "diagram": "GEO-ALTSEG-01", "kind": "numeric", "verification": "logic-review", "steps": ["MQ-G11C22-A-ALTERNATE_-01-S1", "MQ-G11C22-A-ALTERNATE_-01-S2"]} -->
**Topic:** Tangents · **Pathway:** A Grade Mastery · **Difficulty:** hard · **Formula:** `T-CIR-ALTSEG`

**Question:** TA is a tangent to a circle at A. AB and AC are chords. ∠TAB = 55° and ∠ABC = 65°. Find ∠ACB and ∠BAC.

**Diagram:** `GEO-ALTSEG-01` → `Shared_Assets/Geometry/GEO-ALTSEG-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Alternate segment theorem: angle between tangent and chord = angle in the alternate segment. <!-- MQ-G11C22-A-ALTERNATE_-01-S1 -->

$$\angle ACB = \angle TAB = 55^\circ$$

Step 2 — Angle sum of ΔABC. <!-- MQ-G11C22-A-ALTERNATE_-01-S2 -->

$$\angle BAC = 180 - 55 - 65 = 60^\circ$$

**Final answer:** $\angle ACB=55^\circ,\ \angle BAC=60^\circ$
<br>**Accepted answer formats:** $\angle ACB=55^\circ,\ \angle BAC=60^\circ$ · **Unit:** °

<sub>Verification: logic-reviewed (teacher review recommended)</sub>


## G11C23 — Constructions

### C-TANGENT — Tangent construction
<!-- meta {"id": "C-TANGENT", "chapter": "G11C23", "supplied": false, "medium": "en"} -->

$$\perp OA\ \text{at } A$$

- **Symbols:** —
- **Units:** —
- **When to use:** Tangent at a point on a circle.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C23-F-CONSTRUCT_-01
<!-- meta {"id": "MQ-G11C23-F-CONSTRUCT_-01", "grade": 11, "chapter": "G11C23", "area": "GEO", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "C-TANGENT", "diagram": "CON-TANGENT-01", "kind": "construction", "verification": "logic-review", "steps": ["MQ-G11C23-F-CONSTRUCT_-01-S1", "MQ-G11C23-F-CONSTRUCT_-01-S2", "MQ-G11C23-F-CONSTRUCT_-01-S3", "MQ-G11C23-F-CONSTRUCT_-01-S4"]} -->
**Topic:** Constructions · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `C-TANGENT`

**Question:** Draw a circle of radius 3 cm with centre O and mark a point A on it. Construct the tangent at A. Write the steps.

**Diagram:** `CON-TANGENT-01` → `Shared_Assets/Constructions/CON-TANGENT-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Draw the circle, radius 3 cm, and mark A. <!-- MQ-G11C23-F-CONSTRUCT_-01-S1 -->

$$OA = r$$

Step 2 — Join OA and extend it beyond A. <!-- MQ-G11C23-F-CONSTRUCT_-01-S2 -->

$$OA\ \text{extended}$$

Step 3 — Construct a perpendicular to OA at A. <!-- MQ-G11C23-F-CONSTRUCT_-01-S3 -->

$$\perp\ \text{at }A$$

Step 4 — That perpendicular is the tangent. <!-- MQ-G11C23-F-CONSTRUCT_-01-S4 -->

$$\text{tangent}\perp OA$$

**Final answer:** $\text{tangent at }A\perp OA$

<sub>Verification: logic-reviewed (teacher review recommended)</sub>

### C-CIRCUM — Circumcircle
<!-- meta {"id": "C-CIRCUM", "chapter": "G11C23", "supplied": false, "medium": "en"} -->

$$\text{perp. bisectors meet at } O$$

- **Symbols:** —
- **Units:** —
- **When to use:** Circle through three vertices.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C23-G-CONSTRUCT_-01
<!-- meta {"id": "MQ-G11C23-G-CONSTRUCT_-01", "grade": 11, "chapter": "G11C23", "area": "GEO", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "C-CIRCUM", "diagram": "CON-CIRCUM-01", "kind": "construction", "verification": "logic-review", "steps": ["MQ-G11C23-G-CONSTRUCT_-01-S1", "MQ-G11C23-G-CONSTRUCT_-01-S2", "MQ-G11C23-G-CONSTRUCT_-01-S3", "MQ-G11C23-G-CONSTRUCT_-01-S4"]} -->
**Topic:** Constructions · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `C-CIRCUM`

**Question:** Construct triangle ABC with AB = 6 cm, BC = 7 cm and AC = 5 cm, then construct its circumcircle. Write the steps.

**Diagram:** `CON-CIRCUM-01` → `Shared_Assets/Constructions/CON-CIRCUM-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Draw BC = 7 cm. <!-- MQ-G11C23-G-CONSTRUCT_-01-S1 -->

$$BC = 7$$

Step 2 — Arc radius 6 cm from B and arc radius 5 cm from C meet at A. <!-- MQ-G11C23-G-CONSTRUCT_-01-S2 -->

$$A$$

Step 3 — Construct the perpendicular bisectors of two sides. <!-- MQ-G11C23-G-CONSTRUCT_-01-S3 -->

$$\text{bisectors of }AB,\ BC$$

Step 4 — They meet at O (circumcentre). Draw the circle with radius OA. <!-- MQ-G11C23-G-CONSTRUCT_-01-S4 -->

$$OA = OB = OC$$

**Final answer:** $\text{circle centre }O,\ \text{radius }OA$

<sub>Verification: logic-reviewed (teacher review recommended)</sub>

### C-INCIRCLE — Incircle
<!-- meta {"id": "C-INCIRCLE", "chapter": "G11C23", "supplied": false, "medium": "en"} -->

$$\text{angle bisectors meet at } I$$

- **Symbols:** —
- **Units:** —
- **When to use:** Circle touching three sides.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C23-A-CONSTRUCT_-01
<!-- meta {"id": "MQ-G11C23-A-CONSTRUCT_-01", "grade": 11, "chapter": "G11C23", "area": "GEO", "medium": "en", "pathway": "A Grade Mastery", "difficulty": "hard", "formula": "C-INCIRCLE", "diagram": "CON-ANGBIS-01", "kind": "construction", "verification": "machine-checked", "steps": ["MQ-G11C23-A-CONSTRUCT_-01-S1", "MQ-G11C23-A-CONSTRUCT_-01-S2", "MQ-G11C23-A-CONSTRUCT_-01-S3", "MQ-G11C23-A-CONSTRUCT_-01-S4"]} -->
**Topic:** Constructions · **Pathway:** A Grade Mastery · **Difficulty:** hard · **Formula:** `C-INCIRCLE`

**Question:** Construct an equilateral triangle of side 6 cm and construct its inscribed circle (incircle). Write the steps and measure the radius.

**Diagram:** `CON-ANGBIS-01` → `Shared_Assets/Constructions/CON-ANGBIS-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Draw AB = 6 cm; arcs of 6 cm from A and B meet at C. <!-- MQ-G11C23-A-CONSTRUCT_-01-S1 -->

$$AB = BC = CA = 6$$

Step 2 — Bisect two angles (e.g. ∠A and ∠B). <!-- MQ-G11C23-A-CONSTRUCT_-01-S2 -->

$$\text{bisectors meet at } I$$

Step 3 — Draw a perpendicular from I to a side; this is the radius. <!-- MQ-G11C23-A-CONSTRUCT_-01-S3 -->

$$r = ID$$

Step 4 — Expected radius (check by calculation). <!-- MQ-G11C23-A-CONSTRUCT_-01-S4 -->

$$r = \frac{6}{2\sqrt3} \approx 1.73\ \text{cm}$$

**Final answer:** $r\approx 1.7\ \text{cm}$

<sub>Verification: machine-checked</sub>


## G11C24 — Sets

### F-SET-UNION3 — Union of three sets
<!-- meta {"id": "F-SET-UNION3", "chapter": "G11C24", "supplied": false, "medium": "en"} -->

$$n(A\cup B\cup C) = \Sigma n(A) - \Sigma n(A\cap B) + n(A\cap B\cap C)$$

- **Symbols:** sums over the three sets / three pairs
- **Units:** —
- **When to use:** Three overlapping groups.
- **When not to use / conditions:** A Venn diagram is usually clearer.
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C24-G-THREE_SETS-01
<!-- meta {"id": "MQ-G11C24-G-THREE_SETS-01", "grade": 11, "chapter": "G11C24", "area": "SET", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "F-SET-UNION3", "diagram": "SET-VENN3-01", "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G11C24-G-THREE_SETS-01-S1", "MQ-G11C24-G-THREE_SETS-01-S2", "MQ-G11C24-G-THREE_SETS-01-S3", "MQ-G11C24-G-THREE_SETS-01-S4", "MQ-G11C24-G-THREE_SETS-01-S5"]} -->
**Topic:** Sets · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `F-SET-UNION3`

**Question:** In a group of 50, 20 study Maths (M), 22 Science (S) and 18 English (E). 8 study M and S, 6 study S and E, 5 study M and E, and 3 study all three. Find (i) the number who study only Maths (ii) the number who study none.

**Diagram:** `SET-VENN3-01` → `Shared_Assets/Other_Diagrams/SET-VENN3-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — Centre region (all three). <!-- MQ-G11C24-G-THREE_SETS-01-S1 -->

$$n(M\cap S\cap E) = 3$$

Step 2 — Exactly two subjects (subtract the centre). <!-- MQ-G11C24-G-THREE_SETS-01-S2 -->

$$MS: 8-3=5,\ SE: 6-3=3,\ ME: 5-3=2$$

Step 3 — Only Maths. <!-- MQ-G11C24-G-THREE_SETS-01-S3 -->

$$20 - 5 - 2 - 3 = 10$$

Step 4 — Only S and only E similarly. <!-- MQ-G11C24-G-THREE_SETS-01-S4 -->

$$11,\ 10$$

Step 5 — None = total − all regions. <!-- MQ-G11C24-G-THREE_SETS-01-S5 -->

$$50 - 44 = 6$$

**Final answer:** $(i)\ 10\quad(ii)\ 6$
<br>**Accepted answer formats:** $(i)\ 10\quad(ii)\ 6$

<sub>Verification: machine-checked</sub>


## G11C25 — Probability

### F-PRO-INDEP — Independent events
<!-- meta {"id": "F-PRO-INDEP", "chapter": "G11C25", "supplied": false, "medium": "en"} -->

$$P(A\cap B) = P(A)\times P(B)$$

- **Symbols:** A, B independent
- **Units:** —
- **When to use:** One event does not affect the other.
- **When not to use / conditions:** Not for dependent events (without replacement).
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C25-F-INDEP_AND-01
<!-- meta {"id": "MQ-G11C25-F-INDEP_AND-01", "grade": 11, "chapter": "G11C25", "area": "PRO", "medium": "en", "pathway": "Foundation Mastery", "difficulty": "easy", "formula": "F-PRO-INDEP", "diagram": null, "kind": "numeric", "verification": "logic-review", "steps": ["MQ-G11C25-F-INDEP_AND-01-S1"]} -->
**Topic:** Probability · **Pathway:** Foundation Mastery · **Difficulty:** easy · **Formula:** `F-PRO-INDEP`

**Question:** Events A and B are independent with P(A) = \frac{3}{4} and P(B) = \frac{2}{3}. Find P(A and B).

**Step-by-step solution**

Step 1 — Independent → multiply. <!-- MQ-G11C25-F-INDEP_AND-01-S1 -->

$$P(A\cap B) = \frac{3}{4}\times\frac{2}{3} = \frac{1}{2}$$

**Final answer:** $\frac{1}{2}$
<br>**Accepted answer formats:** $\frac{1}{2}$

<sub>Verification: logic-reviewed (teacher review recommended)</sub>

### F-PRO-TREE — Tree diagram rules
<!-- meta {"id": "F-PRO-TREE", "chapter": "G11C25", "supplied": false, "medium": "en"} -->

$$\text{along: } \times,\quad \text{between outcomes: } +$$

- **Symbols:** —
- **Units:** —
- **When to use:** Two-stage experiments.
- **When not to use / conditions:** —
- **Supplied in exam?** Not verified as supplied — learn it.

#### Worked example (verified) — MQ-G11C25-G-TREE_TWO_B-01
<!-- meta {"id": "MQ-G11C25-G-TREE_TWO_B-01", "grade": 11, "chapter": "G11C25", "area": "PRO", "medium": "en", "pathway": "Grade Improvement", "difficulty": "medium", "formula": "F-PRO-TREE", "diagram": "PRO-TREE-01", "kind": "numeric", "verification": "machine-checked", "steps": ["MQ-G11C25-G-TREE_TWO_B-01-S1", "MQ-G11C25-G-TREE_TWO_B-01-S2", "MQ-G11C25-G-TREE_TWO_B-01-S3", "MQ-G11C25-G-TREE_TWO_B-01-S4", "MQ-G11C25-G-TREE_TWO_B-01-S5"]} -->
**Topic:** Probability · **Pathway:** Grade Improvement · **Difficulty:** medium · **Formula:** `F-PRO-TREE`

**Question:** Bag 1 has 2 red and 3 blue balls; Bag 2 has 1 red and 3 blue balls. One ball is taken from each bag. Using a tree diagram, find the probability that both balls are the same colour.

**Diagram:** `PRO-TREE-01` → `Shared_Assets/Other_Diagrams/PRO-TREE-01.svg` (generic diagram — not drawn to scale; use the values in the question)

**Step-by-step solution**

Step 1 — First branches (Bag 1). <!-- MQ-G11C25-G-TREE_TWO_B-01-S1 -->

$$P(R_1)=\frac{2}{5},\ P(B_1)=\frac{3}{5}$$

Step 2 — Second branches (Bag 2). <!-- MQ-G11C25-G-TREE_TWO_B-01-S2 -->

$$P(R_2)=\frac{1}{4},\ P(B_2)=\frac{3}{4}$$

Step 3 — Both red: multiply along the branch. <!-- MQ-G11C25-G-TREE_TWO_B-01-S3 -->

$$\frac{2}{5}\times\frac{1}{4} = \frac{1}{10}$$

Step 4 — Both blue. <!-- MQ-G11C25-G-TREE_TWO_B-01-S4 -->

$$\frac{3}{5}\times\frac{3}{4} = \frac{9}{20}$$

Step 5 — Same colour: add the two outcomes. <!-- MQ-G11C25-G-TREE_TWO_B-01-S5 -->

$$\frac{1}{10} + \frac{9}{20} = \frac{11}{20}$$

**Final answer:** $\frac{11}{20}$
<br>**Accepted answer formats:** $\frac{11}{20}$

<sub>Verification: machine-checked</sub>


## Limitations and review notes

- Mathematical content was generated from a shared, machine-checked foundation; questions marked 'logic-reviewed' (proofs, constructions, concepts) should be checked by a qualified Mathematics teacher before publication.
- Tamil terminology follows the e-thaksalawa Tamil-medium chapter titles; other Tamil terms were not checked against the printed Tamil textbooks (not accessible in this session) and need teacher review.
- Diagrams referenced by questions are generic illustrations (not to scale). Interactive buttons (hint, next step) are NOT implemented by these Markdown files; the step IDs and JSON export support the website developer.
- 'Supplied in exam' is marked only where a verified 2018/2019 paper or MOE practice paper printed the formula; all other formulas should be memorised.

