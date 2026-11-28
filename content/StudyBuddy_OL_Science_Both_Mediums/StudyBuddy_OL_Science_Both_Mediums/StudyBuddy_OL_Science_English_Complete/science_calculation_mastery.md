# StudyBuddy — Science Calculation Mastery

> Four levels for each calculation type (basic, intermediate, exam level, challenge). Each solution has 8 steps; each step is in `<details>` — expand them one by one. All answers were computed in Python and checked by substituting back into the original formula. g = 10 m s⁻².

## The eight-step method

1. Read the question
2. List the data
3. Find
4. Convert units
5. Choose the formula
6. Substitute
7. Calculate
8. Answer, unit, explanation

## Contents

- CL-SPEED — Average speed (SC10-02, Physics)
- CL-ACCEL — Acceleration (SC10-02, Physics)
- CL-FMA — Newton's second law (SC10-04, Physics)
- CL-WMOM — Weight and momentum (SC10-04, Physics)
- CL-RESULT — Resultant force (SC10-09, Physics)
- CL-MOMENT — Moment of a force (SC10-11, Physics)
- CL-PRESS — Pressure, liquid pressure, Pascal (SC10-15, Physics)
- CL-WORK — Work, energy, power, efficiency (SC10-18, Physics)
- CL-OHM — Ohm's law and combinations of resistors (SC10-19, Physics)
- CL-EPOWER — Electric power, energy, cost (SC11-10, Physics)
- CL-HEAT — Specific heat capacity and latent heat (SC11-09, Physics)
- CL-WAVE — Wave equation (SC11-04, Physics)
- CL-OPTICS — Refractive index and lenses (SC11-05, Physics)
- CL-TRANS — Transformer (SC11-13, Physics)
- CL-TEMP — Converting temperature scales (SC11-09, Physics)
- CL-MOLE — Moles, molar mass, particles (SC10-07, Chemistry)
- CL-CONC — Solution concentration, density (SC11-03, Chemistry)
- CL-ENTH — Heat of reaction (SC11-08, Chemistry)
- CL-RATE — Average rate of reaction (SC10-17, Chemistry)
- CL-GENE — Mendelian ratios (SC10-20, Biology)
- CL-ECO — Energy transfer in a food chain (SC10-13, Biology)
- CL-MICRO — Microscope magnification (SC10-06, Biology)

---

## CL-SPEED: Average speed

<!-- meta {"type":"calc_type","id":"CL-SPEED","chapter_id":"SC10-02","discipline":"PHY","levels":4} -->

*Motion in a straight line*

**Formula:**

$$v = \frac{s}{t}$$

| Symbol | Quantity | Unit |
|---|---|---|
| v | speed | m s⁻¹ |
| s | distance | m |
| t | time | s |

- **When to use:** When distance and time are given.
- **Unit conversions:** km → m (× 1000); min → s (× 60); km h⁻¹ → m s⁻¹ (÷ 3.6).
- **Rearranged forms:** $s = vt,\quad t = \frac{s}{v}$
- **Common mistakes:** Not converting units; taking the average of speeds.

### CL-SPEED-1 · Basic

<!-- meta {"type":"worked_example","id":"CL-SPEED-1","level":"Basic","answer":8.0,"unit":"m s⁻¹","verified":true,"hints":["Divide distance by time.","Unit m s⁻¹."]} -->

**Question:** A cyclist covers a distance of 120 m in 15 s. Find the average speed.

<details><summary>Step 1: Read the question</summary>

A cyclist covers a distance of 120 m in 15 s. Find the average speed.

</details>

<details><summary>Step 2: List the data</summary>

s = 120 m; t = 15 s

</details>

<details><summary>Step 3: Find</summary>

v

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$v = \frac{s}{t}$

</details>

<details><summary>Step 6: Substitute</summary>

$v = \frac{120}{15}$

</details>

<details><summary>Step 7: Calculate</summary>

$v = 8$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**8 m s⁻¹** — He covers 8 m every second.

</details>

<details><summary>Hints</summary>

- Divide distance by time.
- Unit m s⁻¹.

</details>

### CL-SPEED-2 · Intermediate

<!-- meta {"type":"worked_example","id":"CL-SPEED-2","level":"Intermediate","answer":10.0,"unit":"m s⁻¹","verified":true,"hints":["First change km to m and min to s.","1 km = 1000 m; 1 min = 60 s."]} -->

**Question:** A bus travels 9 km in 15 minutes. Find the average speed in m s⁻¹.

<details><summary>Step 1: Read the question</summary>

A bus travels 9 km in 15 minutes. Find the average speed in m s⁻¹.

</details>

<details><summary>Step 2: List the data</summary>

s = 9 km; t = 15 min

</details>

<details><summary>Step 3: Find</summary>

v

</details>

<details><summary>Step 4: Convert units</summary>

$s = 9\ \text{km} = 9000\ \text{m}$ ; $t = 15\ \text{min} = 900\ \text{s}$

</details>

<details><summary>Step 5: Choose the formula</summary>

$v = \frac{s}{t}$

</details>

<details><summary>Step 6: Substitute</summary>

$v = \frac{9000}{900}$

</details>

<details><summary>Step 7: Calculate</summary>

$v = 10$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**10 m s⁻¹** — In km h⁻¹ this is 36 km h⁻¹.

</details>

<details><summary>Hints</summary>

- First change km to m and min to s.
- 1 km = 1000 m; 1 min = 60 s.

</details>

### CL-SPEED-3 · Exam level

<!-- meta {"type":"worked_example","id":"CL-SPEED-3","level":"Exam level","answer":1000,"unit":"m","verified":true,"hints":["Rearrange v = s/t for s.","s = vt."]} -->

**Question:** A car travels at a constant speed of 25 m s⁻¹ for 40 s. Distance travelled?

<details><summary>Step 1: Read the question</summary>

A car travels at a constant speed of 25 m s⁻¹ for 40 s. Distance travelled?

</details>

<details><summary>Step 2: List the data</summary>

v = 25 m s⁻¹; t = 40 s

</details>

<details><summary>Step 3: Find</summary>

s

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$s = v \times t$

</details>

<details><summary>Step 6: Substitute</summary>

$s = 25 \times 40$

</details>

<details><summary>Step 7: Calculate</summary>

$s = 1000$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**1000 m**

</details>

<details><summary>Hints</summary>

- Rearrange v = s/t for s.
- s = vt.

</details>

### CL-SPEED-4 · Challenge

<!-- meta {"type":"worked_example","id":"CL-SPEED-4","level":"Challenge","answer":5.0,"unit":"m s⁻¹","verified":true,"hints":["You need the total distance and total time.","Do not take the average of the speeds."]} -->

**Question:** A person runs 600 m in 100 s, then 900 m in 200 s. Average speed for the whole journey?

<details><summary>Step 1: Read the question</summary>

A person runs 600 m in 100 s, then 900 m in 200 s. Average speed for the whole journey?

</details>

<details><summary>Step 2: List the data</summary>

s₁ = 600 m; t₁ = 100 s; s₂ = 900 m; t₂ = 200 s

</details>

<details><summary>Step 3: Find</summary>

Average speed

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$v_{avg} = \frac{\text{total distance}}{\text{total time}}$

</details>

<details><summary>Step 6: Substitute</summary>

$v = \frac{600+900}{100+200}$

</details>

<details><summary>Step 7: Calculate</summary>

$v = \frac{1500}{300} = 5$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**5 m s⁻¹** — It is not the average of the two speeds (6 + 4.5)/2 = 5.25!

</details>

<details><summary>Hints</summary>

- You need the total distance and total time.
- Do not take the average of the speeds.

</details>

---

## CL-ACCEL: Acceleration

<!-- meta {"type":"calc_type","id":"CL-ACCEL","chapter_id":"SC10-02","discipline":"PHY","levels":4} -->

*Motion in a straight line*

**Formula:**

$$a = \frac{v-u}{t}$$

| Symbol | Quantity | Unit |
|---|---|---|
| a | acceleration | m s⁻² |
| v | final velocity | m s⁻¹ |
| u | initial velocity | m s⁻¹ |
| t | time | s |

- **When to use:** When the change in velocity and the time are known.
- **Unit conversions:** km h⁻¹ ÷ 3.6 = m s⁻¹.
- **Rearranged forms:** $v = u + at,\ t = \frac{v-u}{a}$
- **Common mistakes:** Swapping u and v; leaving out the negative sign for deceleration.

### CL-ACCEL-1 · Basic

<!-- meta {"type":"worked_example","id":"CL-ACCEL-1","level":"Basic","answer":3.0,"unit":"m s⁻²","verified":true,"hints":["From rest → u = 0.","Change in velocity ÷ time."]} -->

**Question:** A car starting from rest reaches a velocity of 18 m s⁻¹ in 6 s. Acceleration?

<details><summary>Step 1: Read the question</summary>

A car starting from rest reaches a velocity of 18 m s⁻¹ in 6 s. Acceleration?

</details>

<details><summary>Step 2: List the data</summary>

u = 0 m s⁻¹; v = 18 m s⁻¹; t = 6 s

</details>

<details><summary>Step 3: Find</summary>

a

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$a = \frac{v-u}{t}$

</details>

<details><summary>Step 6: Substitute</summary>

$a = \frac{18-0}{6}$

</details>

<details><summary>Step 7: Calculate</summary>

$a = 3$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**3 m s⁻²** — The velocity increases by 3 m s⁻¹ every second.

</details>

<details><summary>Hints</summary>

- From rest → u = 0.
- Change in velocity ÷ time.

</details>

### CL-ACCEL-2 · Intermediate

<!-- meta {"type":"worked_example","id":"CL-ACCEL-2","level":"Intermediate","answer":-3.0,"unit":"m s⁻²","verified":true,"hints":["Divide by 3.6 to change km h⁻¹ into m s⁻¹.","Final velocity 0."]} -->

**Question:** A motorcycle moving at 54 km h⁻¹ is stopped in 5 s. Acceleration?

<details><summary>Step 1: Read the question</summary>

A motorcycle moving at 54 km h⁻¹ is stopped in 5 s. Acceleration?

</details>

<details><summary>Step 2: List the data</summary>

u = 54 km h⁻¹; v = 0 m s⁻¹; t = 5 s

</details>

<details><summary>Step 3: Find</summary>

a

</details>

<details><summary>Step 4: Convert units</summary>

$u = 54 \div 3.6 = 15\ \text{m s}^{-1}$

</details>

<details><summary>Step 5: Choose the formula</summary>

$a = \frac{v-u}{t}$

</details>

<details><summary>Step 6: Substitute</summary>

$a = \frac{0-15}{5}$

</details>

<details><summary>Step 7: Calculate</summary>

$a = -3$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**-3 m s⁻²** — Negative sign — deceleration (velocity decreases).

</details>

<details><summary>Hints</summary>

- Divide by 3.6 to change km h⁻¹ into m s⁻¹.
- Final velocity 0.

</details>

### CL-ACCEL-3 · Exam level

<!-- meta {"type":"worked_example","id":"CL-ACCEL-3","level":"Exam level","answer":24.0,"unit":"m s⁻¹","verified":true,"hints":["Rearrange a = (v − u)/t for v.","v = u + at."]} -->

**Question:** An object moving at 4 m s⁻¹ accelerates at 2.5 m s⁻² for 8 s. Final velocity?

<details><summary>Step 1: Read the question</summary>

An object moving at 4 m s⁻¹ accelerates at 2.5 m s⁻² for 8 s. Final velocity?

</details>

<details><summary>Step 2: List the data</summary>

u = 4 m s⁻¹; a = 2.5 m s⁻²; t = 8 s

</details>

<details><summary>Step 3: Find</summary>

v

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$v = u + at$

</details>

<details><summary>Step 6: Substitute</summary>

$v = 4 + 2.5\times8$

</details>

<details><summary>Step 7: Calculate</summary>

$v = 4 + 20 = 24$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**24 m s⁻¹**

</details>

<details><summary>Hints</summary>

- Rearrange a = (v − u)/t for v.
- v = u + at.

</details>

### CL-ACCEL-4 · Challenge

<!-- meta {"type":"worked_example","id":"CL-ACCEL-4","level":"Challenge","answer":160.0,"unit":"m","verified":true,"hints":["The shape under the graph is a trapezium.","Gradient = acceleration."]} -->

**Question:** On a velocity–time graph the velocity increases uniformly from 10 to 30 m s⁻¹ in 0–8 s. Acceleration and displacement?

<details><summary>Step 1: Read the question</summary>

On a velocity–time graph the velocity increases uniformly from 10 to 30 m s⁻¹ in 0–8 s. Acceleration and displacement?

</details>

<details><summary>Step 2: List the data</summary>

u = 10 m s⁻¹; v = 30 m s⁻¹; t = 8 s

</details>

<details><summary>Step 3: Find</summary>

a, s

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$a = \frac{v-u}{t},\quad s = \text{trapezium area} = \frac{(u+v)}{2}t$

</details>

<details><summary>Step 6: Substitute</summary>

$a = \frac{30-10}{8},\ s = \frac{10+30}{2}\times8$

</details>

<details><summary>Step 7: Calculate</summary>

$a = 2.5\ \text{m s}^{-2}$ → $s = 160\ \text{m}$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**160 m** — Area = displacement; gradient = acceleration.

</details>

<details><summary>Hints</summary>

- The shape under the graph is a trapezium.
- Gradient = acceleration.

</details>

---

## CL-FMA: Newton's second law

<!-- meta {"type":"calc_type","id":"CL-FMA","chapter_id":"SC10-04","discipline":"PHY","levels":4} -->

*Newton's laws of motion*

**Formula:**

$$F = ma$$

| Symbol | Quantity | Unit |
|---|---|---|
| F | resultant force | N |
| m | mass | kg |
| a | acceleration | m s⁻² |

- **When to use:** Relationship between force, mass and acceleration.
- **Unit conversions:** g → kg (÷ 1000).
- **Rearranged forms:** $a = \frac{F}{m},\ m = \frac{F}{a}$
- **Common mistakes:** Using the applied force instead of the resultant force; not changing g into kg.

### CL-FMA-1 · Basic

<!-- meta {"type":"worked_example","id":"CL-FMA-1","level":"Basic","answer":2400,"unit":"N","verified":true,"hints":["F = ma.","Unit N."]} -->

**Question:** Resultant force needed for a 1200 kg car to accelerate at 2 m s⁻²?

<details><summary>Step 1: Read the question</summary>

Resultant force needed for a 1200 kg car to accelerate at 2 m s⁻²?

</details>

<details><summary>Step 2: List the data</summary>

m = 1200 kg; a = 2 m s⁻²

</details>

<details><summary>Step 3: Find</summary>

F

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$F = ma$

</details>

<details><summary>Step 6: Substitute</summary>

$F = 1200\times2$

</details>

<details><summary>Step 7: Calculate</summary>

$F = 2400$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**2400 N**

</details>

<details><summary>Hints</summary>

- F = ma.
- Unit N.

</details>

### CL-FMA-2 · Intermediate

<!-- meta {"type":"worked_example","id":"CL-FMA-2","level":"Intermediate","answer":8.0,"unit":"m s⁻²","verified":true,"hints":["Change g into kg (÷ 1000).","a = F/m."]} -->

**Question:** A resultant force of 4 N acts on a 500 g ball. Acceleration?

<details><summary>Step 1: Read the question</summary>

A resultant force of 4 N acts on a 500 g ball. Acceleration?

</details>

<details><summary>Step 2: List the data</summary>

m = 500 g; F = 4 N

</details>

<details><summary>Step 3: Find</summary>

a

</details>

<details><summary>Step 4: Convert units</summary>

$m = 500\ \text{g} = 0.5\ \text{kg}$

</details>

<details><summary>Step 5: Choose the formula</summary>

$a = \frac{F}{m}$

</details>

<details><summary>Step 6: Substitute</summary>

$a = \frac{4}{0.5}$

</details>

<details><summary>Step 7: Calculate</summary>

$a = 8$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**8 m s⁻²**

</details>

<details><summary>Hints</summary>

- Change g into kg (÷ 1000).
- a = F/m.

</details>

### CL-FMA-3 · Exam level

<!-- meta {"type":"worked_example","id":"CL-FMA-3","level":"Exam level","answer":4.0,"unit":"m s⁻²","verified":true,"hints":["Resultant force first.","Friction acts in the opposite direction."]} -->

**Question:** A 50 kg box is pulled with a force of 300 N; friction is 100 N. Acceleration?

<details><summary>Step 1: Read the question</summary>

A 50 kg box is pulled with a force of 300 N; friction is 100 N. Acceleration?

</details>

<details><summary>Step 2: List the data</summary>

m = 50 kg; F = 300 N; Friction = 100 N

</details>

<details><summary>Step 3: Find</summary>

a

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$F_{net} = F - f,\quad a = \frac{F_{net}}{m}$

</details>

<details><summary>Step 6: Substitute</summary>

$F_{net} = 300-100 = 200\ \text{N};\ a = \frac{200}{50}$

</details>

<details><summary>Step 7: Calculate</summary>

$a = 4$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**4 m s⁻²** — The resultant force must be used.

</details>

<details><summary>Hints</summary>

- Resultant force first.
- Friction acts in the opposite direction.

</details>

### CL-FMA-4 · Challenge

<!-- meta {"type":"worked_example","id":"CL-FMA-4","level":"Challenge","answer":1600.0,"unit":"N","verified":true,"hints":["First find a.","Then F = ma."]} -->

**Question:** A 800 kg vehicle speeds up from 5 to 25 m s⁻¹ in 10 s. Average resultant force?

<details><summary>Step 1: Read the question</summary>

A 800 kg vehicle speeds up from 5 to 25 m s⁻¹ in 10 s. Average resultant force?

</details>

<details><summary>Step 2: List the data</summary>

m = 800 kg; u = 5 m s⁻¹; v = 25 m s⁻¹; t = 10 s

</details>

<details><summary>Step 3: Find</summary>

F

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$a = \frac{v-u}{t},\ F = ma$

</details>

<details><summary>Step 6: Substitute</summary>

$a = \frac{25-5}{10} = 2;\ F = 800\times2$

</details>

<details><summary>Step 7: Calculate</summary>

$F = 1600$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**1600 N** — Two steps: acceleration, then force.

</details>

<details><summary>Hints</summary>

- First find a.
- Then F = ma.

</details>

---

## CL-WMOM: Weight and momentum

<!-- meta {"type":"calc_type","id":"CL-WMOM","chapter_id":"SC10-04","discipline":"PHY","levels":4} -->

*Newton's laws of motion*

**Formula:**

$$W = mg,\quad p = mv$$

| Symbol | Quantity | Unit |
|---|---|---|
| W | weight | N |
| m | mass | kg |
| g | acceleration due to gravity | m s⁻² |
| p | momentum | kg m s⁻¹ |

- **When to use:** Weight–mass conversion; momentum calculation.
- **Unit conversions:** g → kg.
- **Rearranged forms:** $m = \frac{W}{g},\ v = \frac{p}{m}$
- **Common mistakes:** Confusing weight and mass.

### CL-WMOM-1 · Basic

<!-- meta {"type":"worked_example","id":"CL-WMOM-1","level":"Basic","answer":450,"unit":"N","verified":true,"hints":["W = mg.","g = 10."]} -->

**Question:** Weight of a 45 kg student? (g = 10 m s⁻²)

<details><summary>Step 1: Read the question</summary>

Weight of a 45 kg student? (g = 10 m s⁻²)

</details>

<details><summary>Step 2: List the data</summary>

m = 45 kg; g = 10 m s⁻²

</details>

<details><summary>Step 3: Find</summary>

W

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$W = mg$

</details>

<details><summary>Step 6: Substitute</summary>

$W = 45\times10$

</details>

<details><summary>Step 7: Calculate</summary>

$W = 450$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**450 N** — Weight is a force (N); mass is in kg.

</details>

<details><summary>Hints</summary>

- W = mg.
- g = 10.

</details>

### CL-WMOM-2 · Intermediate

<!-- meta {"type":"worked_example","id":"CL-WMOM-2","level":"Intermediate","answer":6.0,"unit":"kg m s⁻¹","verified":true,"hints":["p = mv.","Unit kg m s⁻¹."]} -->

**Question:** A 0.15 kg cricket ball moves at 40 m s⁻¹. Momentum?

<details><summary>Step 1: Read the question</summary>

A 0.15 kg cricket ball moves at 40 m s⁻¹. Momentum?

</details>

<details><summary>Step 2: List the data</summary>

m = 0.15 kg; v = 40 m s⁻¹

</details>

<details><summary>Step 3: Find</summary>

p

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$p = mv$

</details>

<details><summary>Step 6: Substitute</summary>

$p = 0.15\times40$

</details>

<details><summary>Step 7: Calculate</summary>

$p = 6$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**6 kg m s⁻¹**

</details>

<details><summary>Hints</summary>

- p = mv.
- Unit kg m s⁻¹.

</details>

### CL-WMOM-3 · Exam level

<!-- meta {"type":"worked_example","id":"CL-WMOM-3","level":"Exam level","answer":96.0,"unit":"N","verified":true,"hints":["First find the mass.","Mass does not depend on location."]} -->

**Question:** An astronaut whose weight on Earth is 600 N goes to the Moon (g = 1.6 m s⁻²). His mass and his weight on the Moon?

<details><summary>Step 1: Read the question</summary>

An astronaut whose weight on Earth is 600 N goes to the Moon (g = 1.6 m s⁻²). His mass and his weight on the Moon?

</details>

<details><summary>Step 2: List the data</summary>

W = 600 N; g(Moon) = 1.6 m s⁻²

</details>

<details><summary>Step 3: Find</summary>

m, W_moon

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$m = \frac{W}{g},\ W_{moon} = m\,g_{moon}$

</details>

<details><summary>Step 6: Substitute</summary>

$m = \frac{600}{10} = 60;\ W = 60\times1.6$

</details>

<details><summary>Step 7: Calculate</summary>

$m = 60\ \text{kg}$ → $W_{moon} = 96\ \text{N}$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**96 N** — Mass does not change; only weight decreases.

</details>

<details><summary>Hints</summary>

- First find the mass.
- Mass does not depend on location.

</details>

### CL-WMOM-4 · Challenge

<!-- meta {"type":"worked_example","id":"CL-WMOM-4","level":"Challenge","answer":2.0,"unit":"m s⁻¹","verified":true,"hints":["Total momentum before and after the collision is equal.","Combined mass = m₁ + m₂."]} -->

**Question:** A 2 kg trolley moving at 3 m s⁻¹ joins a 1 kg trolley at rest and they move together. Common velocity? (conservation of momentum)

<details><summary>Step 1: Read the question</summary>

A 2 kg trolley moving at 3 m s⁻¹ joins a 1 kg trolley at rest and they move together. Common velocity? (conservation of momentum)

</details>

<details><summary>Step 2: List the data</summary>

m₁ = 2 kg; u₁ = 3 m s⁻¹; m₂ = 1 kg

</details>

<details><summary>Step 3: Find</summary>

v

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$m_1u_1 + m_2u_2 = (m_1+m_2)v$

</details>

<details><summary>Step 6: Substitute</summary>

$2\times3 + 1\times0 = 3\,v$

</details>

<details><summary>Step 7: Calculate</summary>

$v = \frac{6}{3} = 2$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**2 m s⁻¹** — Total momentum does not change.

</details>

<details><summary>Hints</summary>

- Total momentum before and after the collision is equal.
- Combined mass = m₁ + m₂.

</details>

---

## CL-RESULT: Resultant force

<!-- meta {"type":"calc_type","id":"CL-RESULT","chapter_id":"SC10-09","discipline":"PHY","levels":4} -->

*Resultant force*

**Formula:**

$$R = F_1 \pm F_2;\ R = \sqrt{F_1^2+F_2^2}$$

| Symbol | Quantity | Unit |
|---|---|---|
| R | resultant | N |
| F | forces | N |

- **When to use:** Forces in one line or perpendicular forces.
- **Unit conversions:** —
- **Rearranged forms:** $F_2 = \sqrt{R^2 - F_1^2}$
- **Common mistakes:** Adding without considering direction.

### CL-RESULT-1 · Basic

<!-- meta {"type":"worked_example","id":"CL-RESULT-1","level":"Basic","answer":7,"unit":"N","verified":true,"hints":["Opposite directions — subtract.","State the direction."]} -->

**Question:** 12 N east and 5 N west act on an object. Resultant?

<details><summary>Step 1: Read the question</summary>

12 N east and 5 N west act on an object. Resultant?

</details>

<details><summary>Step 2: List the data</summary>

F₁ = 12 N; F₂ = 5 N

</details>

<details><summary>Step 3: Find</summary>

R

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$R = F_1 - F_2$

</details>

<details><summary>Step 6: Substitute</summary>

$R = 12-5$

</details>

<details><summary>Step 7: Calculate</summary>

$R = 7\ \text{N (east)}$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**7 N** — Direction of the larger force.

</details>

<details><summary>Hints</summary>

- Opposite directions — subtract.
- State the direction.

</details>

### CL-RESULT-2 · Intermediate

<!-- meta {"type":"worked_example","id":"CL-RESULT-2","level":"Intermediate","answer":15.0,"unit":"N","verified":true,"hints":["Pythagoras.","√(81 + 144)."]} -->

**Question:** 9 N and 12 N act perpendicular to each other. Resultant?

<details><summary>Step 1: Read the question</summary>

9 N and 12 N act perpendicular to each other. Resultant?

</details>

<details><summary>Step 2: List the data</summary>

F₁ = 9 N; F₂ = 12 N

</details>

<details><summary>Step 3: Find</summary>

R

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$R = \sqrt{F_1^2+F_2^2}$

</details>

<details><summary>Step 6: Substitute</summary>

$R = \sqrt{9^2+12^2} = \sqrt{225}$

</details>

<details><summary>Step 7: Calculate</summary>

$R = 15$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**15 N**

</details>

<details><summary>Hints</summary>

- Pythagoras.
- √(81 + 144).

</details>

### CL-RESULT-3 · Exam level

<!-- meta {"type":"worked_example","id":"CL-RESULT-3","level":"Exam level","answer":3.0,"unit":"m s⁻²","verified":true,"hints":["Resultant first.","F = ma."]} -->

**Question:** On a 4 kg object, 20 N acts to the right and 8 N to the left. Acceleration?

<details><summary>Step 1: Read the question</summary>

On a 4 kg object, 20 N acts to the right and 8 N to the left. Acceleration?

</details>

<details><summary>Step 2: List the data</summary>

m = 4 kg; F₁ = 20 N; F₂ = 8 N

</details>

<details><summary>Step 3: Find</summary>

a

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$a = \frac{F_1-F_2}{m}$

</details>

<details><summary>Step 6: Substitute</summary>

$a = \frac{20-8}{4}$

</details>

<details><summary>Step 7: Calculate</summary>

$a = 3$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**3 m s⁻²** — To the right.

</details>

<details><summary>Hints</summary>

- Resultant first.
- F = ma.

</details>

### CL-RESULT-4 · Challenge

<!-- meta {"type":"worked_example","id":"CL-RESULT-4","level":"Challenge","answer":50.0,"unit":"N","verified":true,"hints":["3–4–5 triple.","tan for the angle."]} -->

**Question:** A boat is pushed east by a force of 30 N and north by the wind with a force of 40 N. Magnitude of the resultant and its angle from east? (tan 53.1° ≈ 1.333)

<details><summary>Step 1: Read the question</summary>

A boat is pushed east by a force of 30 N and north by the wind with a force of 40 N. Magnitude of the resultant and its angle from east? (tan 53.1° ≈ 1.333)

</details>

<details><summary>Step 2: List the data</summary>

F₁ = 30 N; F₂ = 40 N

</details>

<details><summary>Step 3: Find</summary>

R, θ

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$R = \sqrt{F_1^2+F_2^2},\ \tan\theta = \frac{F_2}{F_1}$

</details>

<details><summary>Step 6: Substitute</summary>

$R = \sqrt{30^2+40^2};\ \tan\theta = \frac{40}{30}$

</details>

<details><summary>Step 7: Calculate</summary>

$R = 50\ \text{N}$ → $\theta \approx 53.1^\circ$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**50 N** — It can also be checked with a scale drawing (parallelogram rule).

</details>

<details><summary>Hints</summary>

- 3–4–5 triple.
- tan for the angle.

</details>

---

## CL-MOMENT: Moment of a force

<!-- meta {"type":"calc_type","id":"CL-MOMENT","chapter_id":"SC10-11","discipline":"PHY","levels":4} -->

*Turning effect of a force*

**Formula:**

$$M = F \times d$$

| Symbol | Quantity | Unit |
|---|---|---|
| M | moment | N m |
| F | force | N |
| d | perpendicular distance | m |

- **When to use:** Rotation, equilibrium, levers.
- **Unit conversions:** cm → m (÷ 100).
- **Rearranged forms:** $F = \frac{M}{d},\ d = \frac{M}{F}$
- **Common mistakes:** A distance that is not perpendicular; leaving out the rule's own weight.

### CL-MOMENT-1 · Basic

<!-- meta {"type":"worked_example","id":"CL-MOMENT-1","level":"Basic","answer":10.0,"unit":"N m","verified":true,"hints":["M = Fd.","d is the perpendicular distance."]} -->

**Question:** A 25 N force acts perpendicularly at the end of a spanner, 0.4 m from the pivot. Moment?

<details><summary>Step 1: Read the question</summary>

A 25 N force acts perpendicularly at the end of a spanner, 0.4 m from the pivot. Moment?

</details>

<details><summary>Step 2: List the data</summary>

F = 25 N; d = 0.4 m

</details>

<details><summary>Step 3: Find</summary>

M

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$M = F\times d$

</details>

<details><summary>Step 6: Substitute</summary>

$M = 25\times0.4$

</details>

<details><summary>Step 7: Calculate</summary>

$M = 10$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**10 N m**

</details>

<details><summary>Hints</summary>

- M = Fd.
- d is the perpendicular distance.

</details>

### CL-MOMENT-2 · Intermediate

<!-- meta {"type":"worked_example","id":"CL-MOMENT-2","level":"Intermediate","answer":18.0,"unit":"N m","verified":true,"hints":["cm → m.","M = Fd."]} -->

**Question:** A 30 N perpendicular force acts 60 cm from the hinge of a door. Moment?

<details><summary>Step 1: Read the question</summary>

A 30 N perpendicular force acts 60 cm from the hinge of a door. Moment?

</details>

<details><summary>Step 2: List the data</summary>

F = 30 N; d = 60 cm

</details>

<details><summary>Step 3: Find</summary>

M

</details>

<details><summary>Step 4: Convert units</summary>

$d = 60\ \text{cm} = 0.6\ \text{m}$

</details>

<details><summary>Step 5: Choose the formula</summary>

$M = Fd$

</details>

<details><summary>Step 6: Substitute</summary>

$M = 30\times0.6$

</details>

<details><summary>Step 7: Calculate</summary>

$M = 18$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**18 N m**

</details>

<details><summary>Hints</summary>

- cm → m.
- M = Fd.

</details>

### CL-MOMENT-3 · Exam level

<!-- meta {"type":"worked_example","id":"CL-MOMENT-3","level":"Exam level","answer":1.5,"unit":"m","verified":true,"hints":["Principle of moments.","Clockwise = anticlockwise."]} -->

**Question:** On a see-saw a 300 N child sits 2 m from the centre. Where must a 400 N child sit to balance?

<details><summary>Step 1: Read the question</summary>

On a see-saw a 300 N child sits 2 m from the centre. Where must a 400 N child sit to balance?

</details>

<details><summary>Step 2: List the data</summary>

W₁ = 300 N; d₁ = 2 m; W₂ = 400 N

</details>

<details><summary>Step 3: Find</summary>

d₂

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$W_1d_1 = W_2d_2$

</details>

<details><summary>Step 6: Substitute</summary>

$300\times2 = 400\times d_2$

</details>

<details><summary>Step 7: Calculate</summary>

$d_2 = \frac{600}{400} = 1.5$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**1.5 m** — On the other side, nearer the centre.

</details>

<details><summary>Hints</summary>

- Principle of moments.
- Clockwise = anticlockwise.

</details>

### CL-MOMENT-4 · Challenge

<!-- meta {"type":"worked_example","id":"CL-MOMENT-4","level":"Challenge","answer":1.0,"unit":"N","verified":true,"hints":["The rule's weight acts at 50 cm.","Measure each force's distance from the pivot."]} -->

**Question:** A uniform metre rule of weight 1.0 N is pivoted at the 40 cm mark. 2.0 N hangs at the 10 cm mark. What weight must hang at the 90 cm mark?

<details><summary>Step 1: Read the question</summary>

A uniform metre rule of weight 1.0 N is pivoted at the 40 cm mark. 2.0 N hangs at the 10 cm mark. What weight must hang at the 90 cm mark?

</details>

<details><summary>Step 2: List the data</summary>

Pivot = 40 cm; Rule weight = 1 N (at 50 cm); W_A = 2 N (10 cm)

</details>

<details><summary>Step 3: Find</summary>

W_B (90 cm)

</details>

<details><summary>Step 4: Convert units</summary>

$\text{Distances can be kept in cm (same unit on both sides)}$

</details>

<details><summary>Step 5: Choose the formula</summary>

$\sum M_{\text{anticlockwise}} = \sum M_{\text{clockwise}}$

</details>

<details><summary>Step 6: Substitute</summary>

$2.0\times(40-10) = 1.0\times(50-40) + W_B\times(90-40)$

</details>

<details><summary>Step 7: Calculate</summary>

$60 = 10 + 50W_B$ → $W_B = 1$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**1 N** — Do not forget the rule's own weight.

</details>

<details><summary>Hints</summary>

- The rule's weight acts at 50 cm.
- Measure each force's distance from the pivot.

</details>

---

## CL-PRESS: Pressure, liquid pressure, Pascal

<!-- meta {"type":"calc_type","id":"CL-PRESS","chapter_id":"SC10-15","discipline":"PHY","levels":4} -->

*Hydrostatic pressure and its applications*

**Formula:**

$$P = \frac{F}{A};\ P = h\rho g;\ \frac{F_1}{A_1} = \frac{F_2}{A_2}$$

| Symbol | Quantity | Unit |
|---|---|---|
| P | pressure | Pa |
| F | force | N |
| A | area | m² |
| h | depth | m |
| ρ | density | kg m⁻³ |

- **When to use:** Solid and liquid pressure; hydraulic machines.
- **Unit conversions:** cm² → m² (÷ 10 000).
- **Rearranged forms:** $F = PA,\ h = \frac{P}{\rho g}$
- **Common mistakes:** Not converting cm² to m² (when it is not a ratio); using height instead of depth.

### CL-PRESS-1 · Basic

<!-- meta {"type":"worked_example","id":"CL-PRESS-1","level":"Basic","answer":20000.0,"unit":"Pa","verified":true,"hints":["P = F/A.","Unit Pa."]} -->

**Question:** A box of weight 800 N stands on an area of 0.04 m². Pressure?

<details><summary>Step 1: Read the question</summary>

A box of weight 800 N stands on an area of 0.04 m². Pressure?

</details>

<details><summary>Step 2: List the data</summary>

F = 800 N; A = 0.04 m²

</details>

<details><summary>Step 3: Find</summary>

P

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$P = \frac{F}{A}$

</details>

<details><summary>Step 6: Substitute</summary>

$P = \frac{800}{0.04}$

</details>

<details><summary>Step 7: Calculate</summary>

$P = 20000$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**20000 Pa**

</details>

<details><summary>Hints</summary>

- P = F/A.
- Unit Pa.

</details>

### CL-PRESS-2 · Intermediate

<!-- meta {"type":"worked_example","id":"CL-PRESS-2","level":"Intermediate","answer":120000,"unit":"Pa","verified":true,"hints":["P = hρg.","Water ρ = 1000."]} -->

**Question:** Liquid pressure at a depth of 12 m in a water tank? (ρ = 1000 kg m⁻³)

<details><summary>Step 1: Read the question</summary>

Liquid pressure at a depth of 12 m in a water tank? (ρ = 1000 kg m⁻³)

</details>

<details><summary>Step 2: List the data</summary>

h = 12 m; ρ = 1000 kg m⁻³; g = 10 m s⁻²

</details>

<details><summary>Step 3: Find</summary>

P

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$P = h\rho g$

</details>

<details><summary>Step 6: Substitute</summary>

$P = 12\times1000\times10$

</details>

<details><summary>Step 7: Calculate</summary>

$P = 120000$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**120000 Pa**

</details>

<details><summary>Hints</summary>

- P = hρg.
- Water ρ = 1000.

</details>

### CL-PRESS-3 · Exam level

<!-- meta {"type":"worked_example","id":"CL-PRESS-3","level":"Exam level","answer":6000.0,"unit":"N","verified":true,"hints":["Pascal's law.","Pressure is equal on both sides."]} -->

**Question:** In a hydraulic jack the small piston is 5 cm² and the large one 200 cm². If 150 N is applied to the small one, the force on the large one?

<details><summary>Step 1: Read the question</summary>

In a hydraulic jack the small piston is 5 cm² and the large one 200 cm². If 150 N is applied to the small one, the force on the large one?

</details>

<details><summary>Step 2: List the data</summary>

F₁ = 150 N; A₁ = 5 cm²; A₂ = 200 cm²

</details>

<details><summary>Step 3: Find</summary>

F₂

</details>

<details><summary>Step 4: Convert units</summary>

$\text{It is a ratio, so cm}^2\text{ need not be converted}$

</details>

<details><summary>Step 5: Choose the formula</summary>

$\frac{F_1}{A_1} = \frac{F_2}{A_2}$

</details>

<details><summary>Step 6: Substitute</summary>

$\frac{150}{5} = \frac{F_2}{200}$

</details>

<details><summary>Step 7: Calculate</summary>

$F_2 = 150\times\frac{200}{5} = 6000$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**6000 N** — The force is multiplied 40 times (Pascal).

</details>

<details><summary>Hints</summary>

- Pascal's law.
- Pressure is equal on both sides.

</details>

### CL-PRESS-4 · Challenge

<!-- meta {"type":"worked_example","id":"CL-PRESS-4","level":"Challenge","answer":800.0,"unit":"kg m⁻³","verified":true,"hints":["Rearrange P = hρg for ρ.","Total = atmospheric + liquid."]} -->

**Question:** The liquid pressure at a depth of 3 m in a liquid is 24000 Pa. (i) Density of the liquid? (ii) If atmospheric pressure is 1.0 × 10⁵ Pa, the total pressure at that depth?

<details><summary>Step 1: Read the question</summary>

The liquid pressure at a depth of 3 m in a liquid is 24000 Pa. (i) Density of the liquid? (ii) If atmospheric pressure is 1.0 × 10⁵ Pa, the total pressure at that depth?

</details>

<details><summary>Step 2: List the data</summary>

P = 24000 Pa; h = 3 m

</details>

<details><summary>Step 3: Find</summary>

ρ, P_total

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$\rho = \frac{P}{hg};\ P_{total} = P_{atm} + h\rho g$

</details>

<details><summary>Step 6: Substitute</summary>

$\rho = \frac{24000}{3\times10};\ P = 100000 + 24000$

</details>

<details><summary>Step 7: Calculate</summary>

$\rho = 800\ \text{kg m}^{-3}$ → $P_{total} = 124000\ \text{Pa}$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**800 kg m⁻³** — The density is less than water — a liquid like oil.

</details>

<details><summary>Hints</summary>

- Rearrange P = hρg for ρ.
- Total = atmospheric + liquid.

</details>

---

## CL-WORK: Work, energy, power, efficiency

<!-- meta {"type":"calc_type","id":"CL-WORK","chapter_id":"SC10-18","discipline":"PHY","levels":4} -->

*Work, energy and power*

**Formula:**

$$W = Fs;\ E_k = \tfrac12mv^2;\ E_p = mgh;\ P = \frac{W}{t}$$

| Symbol | Quantity | Unit |
|---|---|---|
| W | work | J |
| E_k | kinetic energy | J |
| E_p | potential energy | J |
| P | power | W |
| η | efficiency | % |

- **When to use:** Force–displacement; height–speed; energy with time.
- **Unit conversions:** kJ ↔ J; minutes → s.
- **Rearranged forms:** $v = \sqrt{\frac{2E_k}{m}},\ h = \frac{E_p}{mg}$
- **Common mistakes:** Forgetting v²; confusion about multiplying or dividing by efficiency.

### CL-WORK-1 · Basic

<!-- meta {"type":"worked_example","id":"CL-WORK-1","level":"Basic","answer":240,"unit":"J","verified":true,"hints":["W = Fs.","Unit J."]} -->

**Question:** A 40 N force moves a box 6 m in the direction of the force. Work done?

<details><summary>Step 1: Read the question</summary>

A 40 N force moves a box 6 m in the direction of the force. Work done?

</details>

<details><summary>Step 2: List the data</summary>

F = 40 N; s = 6 m

</details>

<details><summary>Step 3: Find</summary>

W

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$W = Fs$

</details>

<details><summary>Step 6: Substitute</summary>

$W = 40\times6$

</details>

<details><summary>Step 7: Calculate</summary>

$W = 240$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**240 J**

</details>

<details><summary>Hints</summary>

- W = Fs.
- Unit J.

</details>

### CL-WORK-2 · Intermediate

<!-- meta {"type":"worked_example","id":"CL-WORK-2","level":"Intermediate","answer":300.0,"unit":"kJ","verified":true,"hints":["Square v.","1 kJ = 1000 J."]} -->

**Question:** A 1500 kg car moves at 20 m s⁻¹. Kinetic energy (in kJ)?

<details><summary>Step 1: Read the question</summary>

A 1500 kg car moves at 20 m s⁻¹. Kinetic energy (in kJ)?

</details>

<details><summary>Step 2: List the data</summary>

m = 1500 kg; v = 20 m s⁻¹

</details>

<details><summary>Step 3: Find</summary>

E_k

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$E_k = \frac12 mv^2$

</details>

<details><summary>Step 6: Substitute</summary>

$E_k = \frac12\times1500\times20^2$

</details>

<details><summary>Step 7: Calculate</summary>

$E_k = 300000\ \text{J} = 300\ \text{kJ}$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**300 kJ**

</details>

<details><summary>Hints</summary>

- Square v.
- 1 kJ = 1000 J.

</details>

### CL-WORK-3 · Exam level

<!-- meta {"type":"worked_example","id":"CL-WORK-3","level":"Exam level","answer":20.0,"unit":"m s⁻¹","verified":true,"hints":["Conservation of energy.","m cancels on both sides."]} -->

**Question:** A stone falls from rest from a height of 20 m (ignore air resistance). Speed on reaching the ground?

<details><summary>Step 1: Read the question</summary>

A stone falls from rest from a height of 20 m (ignore air resistance). Speed on reaching the ground?

</details>

<details><summary>Step 2: List the data</summary>

h = 20 m; g = 10 m s⁻²

</details>

<details><summary>Step 3: Find</summary>

v

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$mgh = \frac12 mv^2 \Rightarrow v = \sqrt{2gh}$

</details>

<details><summary>Step 6: Substitute</summary>

$v = \sqrt{2\times10\times20}$

</details>

<details><summary>Step 7: Calculate</summary>

$v = \sqrt{400} = 20$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**20 m s⁻¹** — The mass cancels, so it is not needed.

</details>

<details><summary>Hints</summary>

- Conservation of energy.
- m cancels on both sides.

</details>

### CL-WORK-4 · Challenge

<!-- meta {"type":"worked_example","id":"CL-WORK-4","level":"Challenge","answer":666.6666666666666,"unit":"W","verified":true,"hints":["Useful work = mgh.","Input = output ÷ efficiency."]} -->

**Question:** A water pump lifts 200 kg of water to a height of 15 m in 60 s. If its efficiency is 75%, the input power of the pump?

<details><summary>Step 1: Read the question</summary>

A water pump lifts 200 kg of water to a height of 15 m in 60 s. If its efficiency is 75%, the input power of the pump?

</details>

<details><summary>Step 2: List the data</summary>

m = 200 kg; h = 15 m; t = 60 s; η = 75 %

</details>

<details><summary>Step 3: Find</summary>

P_in

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$P_{out} = \frac{mgh}{t},\ P_{in} = \frac{P_{out}}{\eta}$

</details>

<details><summary>Step 6: Substitute</summary>

$P_{out} = \frac{200\times10\times15}{60} = 500\ \text{W};\ P_{in} = \frac{500}{0.75}$

</details>

<details><summary>Step 7: Calculate</summary>

$P_{in} = 666.6667$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**666.667 W** — 25% of the energy is wasted as heat and sound.

</details>

<details><summary>Hints</summary>

- Useful work = mgh.
- Input = output ÷ efficiency.

</details>

---

## CL-OHM: Ohm's law and combinations of resistors

<!-- meta {"type":"calc_type","id":"CL-OHM","chapter_id":"SC10-19","discipline":"PHY","levels":4} -->

*Current electricity*

**Formula:**

$$V = IR;\ R_s = R_1+R_2;\ \frac1{R_p} = \frac1{R_1}+\frac1{R_2}$$

| Symbol | Quantity | Unit |
|---|---|---|
| V | potential difference | V |
| I | current | A |
| R | resistance | Ω |

- **When to use:** Circuit calculations.
- **Unit conversions:** mA → A (÷ 1000); kΩ → Ω (× 1000).
- **Rearranged forms:** $I = \frac VR,\ R = \frac VI$
- **Common mistakes:** Taking 1/R as R in parallel.

### CL-OHM-1 · Basic

<!-- meta {"type":"worked_example","id":"CL-OHM-1","level":"Basic","answer":3.0,"unit":"A","verified":true,"hints":["V = IR.","I = V/R."]} -->

**Question:** A 3 Ω resistor with a 9 V battery. Current?

<details><summary>Step 1: Read the question</summary>

A 3 Ω resistor with a 9 V battery. Current?

</details>

<details><summary>Step 2: List the data</summary>

V = 9 V; R = 3 Ω

</details>

<details><summary>Step 3: Find</summary>

I

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$I = \frac{V}{R}$

</details>

<details><summary>Step 6: Substitute</summary>

$I = \frac{9}{3}$

</details>

<details><summary>Step 7: Calculate</summary>

$I = 3$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**3 A**

</details>

<details><summary>Hints</summary>

- V = IR.
- I = V/R.

</details>

### CL-OHM-2 · Intermediate

<!-- meta {"type":"worked_example","id":"CL-OHM-2","level":"Intermediate","answer":8.0,"unit":"Ω","verified":true,"hints":["The parallel part first.","Then add in series."]} -->

**Question:** 6 Ω and 12 Ω in parallel; 4 Ω in series with this combination. Total resistance?

<details><summary>Step 1: Read the question</summary>

6 Ω and 12 Ω in parallel; 4 Ω in series with this combination. Total resistance?

</details>

<details><summary>Step 2: List the data</summary>

R₁ = 4 Ω; R₂ = 6 Ω; R₃ = 12 Ω

</details>

<details><summary>Step 3: Find</summary>

R

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$\frac1{R_p} = \frac1{R_2}+\frac1{R_3};\ R = R_1 + R_p$

</details>

<details><summary>Step 6: Substitute</summary>

$\frac1{R_p} = \frac1{6}+\frac1{12} = \frac{3}{12}$

</details>

<details><summary>Step 7: Calculate</summary>

$R_p = 4\ \Omega$ → $R = 4 + 4 = 8$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**8 Ω**

</details>

<details><summary>Hints</summary>

- The parallel part first.
- Then add in series.

</details>

### CL-OHM-3 · Exam level

<!-- meta {"type":"worked_example","id":"CL-OHM-3","level":"Exam level","answer":8.0,"unit":"V","verified":true,"hints":["In series the current is the same.","V = IR for each resistor."]} -->

**Question:** 2 Ω and 4 Ω in series with a 12 V cell. Current and the potential difference across 4 Ω?

<details><summary>Step 1: Read the question</summary>

2 Ω and 4 Ω in series with a 12 V cell. Current and the potential difference across 4 Ω?

</details>

<details><summary>Step 2: List the data</summary>

V = 12 V; R₁ = 2 Ω; R₂ = 4 Ω

</details>

<details><summary>Step 3: Find</summary>

I, V₂

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$I = \frac{V}{R_1+R_2};\ V_2 = IR_2$

</details>

<details><summary>Step 6: Substitute</summary>

$I = \frac{12}{2+4};\ V_2 = 2\times4$

</details>

<details><summary>Step 7: Calculate</summary>

$I = 2\ \text{A}$ → $V_2 = 8\ \text{V}$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**8 V** — Potential differences 4 V + 8 V = 12 V.

</details>

<details><summary>Hints</summary>

- In series the current is the same.
- V = IR for each resistor.

</details>

### CL-OHM-4 · Challenge

<!-- meta {"type":"worked_example","id":"CL-OHM-4","level":"Challenge","answer":3.0,"unit":"A","verified":true,"hints":["In parallel V is the same.","Add the branch currents."]} -->

**Question:** 3 Ω and 6 Ω in parallel with a 6 V cell. Total current from the cell? Check by two methods.

<details><summary>Step 1: Read the question</summary>

3 Ω and 6 Ω in parallel with a 6 V cell. Total current from the cell? Check by two methods.

</details>

<details><summary>Step 2: List the data</summary>

V = 6 V; R₁ = 3 Ω; R₂ = 6 Ω

</details>

<details><summary>Step 3: Find</summary>

I

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$I = \frac{V}{R_1} + \frac{V}{R_2}$

</details>

<details><summary>Step 6: Substitute</summary>

$I = \frac{6}{3} + \frac{6}{6} = 2 + 1$

</details>

<details><summary>Step 7: Calculate</summary>

$I = 3$ → $\text{Alternative method: } R_p = 2\ \Omega,\ I = 6/2 = 3$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**3 A** — Both methods give 3 A.

</details>

<details><summary>Hints</summary>

- In parallel V is the same.
- Add the branch currents.

</details>

---

## CL-EPOWER: Electric power, energy, cost

<!-- meta {"type":"calc_type","id":"CL-EPOWER","chapter_id":"SC11-10","discipline":"PHY","levels":4} -->

*Power and energy of electric appliances*

**Formula:**

$$P = VI;\ E = Pt;\ \text{kWh} = \text{kW}\times\text{h}$$

| Symbol | Quantity | Unit |
|---|---|---|
| P | power | W |
| E | energy | J / kWh |
| t | time | s / h |

- **When to use:** Electricity bills, choosing a fuse, comparing appliances.
- **Unit conversions:** W → kW (÷ 1000); min → h (÷ 60); 1 kWh = 3.6 × 10⁶ J.
- **Rearranged forms:** $I = \frac PV,\ t = \frac EP$
- **Common mistakes:** Using W in kWh calculations; s/h confusion.

### CL-EPOWER-1 · Basic

<!-- meta {"type":"worked_example","id":"CL-EPOWER-1","level":"Basic","answer":1150,"unit":"W","verified":true,"hints":["P = VI.","Unit W."]} -->

**Question:** Power of a heater taking 5 A at 230 V?

<details><summary>Step 1: Read the question</summary>

Power of a heater taking 5 A at 230 V?

</details>

<details><summary>Step 2: List the data</summary>

V = 230 V; I = 5 A

</details>

<details><summary>Step 3: Find</summary>

P

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$P = VI$

</details>

<details><summary>Step 6: Substitute</summary>

$P = 230\times5$

</details>

<details><summary>Step 7: Calculate</summary>

$P = 1150$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**1150 W**

</details>

<details><summary>Hints</summary>

- P = VI.
- Unit W.

</details>

### CL-EPOWER-2 · Intermediate

<!-- meta {"type":"worked_example","id":"CL-EPOWER-2","level":"Intermediate","answer":2880.0,"unit":"Rs.","verified":true,"hints":["Change W into kW.","Total hours = 2 × 30."]} -->

**Question:** A 1500 W electric iron is used 2 hours a day for 30 days. If one unit costs Rs. 32, the cost?

<details><summary>Step 1: Read the question</summary>

A 1500 W electric iron is used 2 hours a day for 30 days. If one unit costs Rs. 32, the cost?

</details>

<details><summary>Step 2: List the data</summary>

P = 1500 W; t = 60 h

</details>

<details><summary>Step 3: Find</summary>

Cost

</details>

<details><summary>Step 4: Convert units</summary>

$P = 1500\ \text{W} = 1.5\ \text{kW}$

</details>

<details><summary>Step 5: Choose the formula</summary>

$E = Pt\ (\text{kWh});\ \text{cost} = E\times\text{price}$

</details>

<details><summary>Step 6: Substitute</summary>

$E = 1.5\times60$

</details>

<details><summary>Step 7: Calculate</summary>

$E = 90\ \text{kWh}$ → $\text{cost} = 90\times32 = 2880$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**2880 Rs.**

</details>

<details><summary>Hints</summary>

- Change W into kW.
- Total hours = 2 × 30.

</details>

### CL-EPOWER-3 · Exam level

<!-- meta {"type":"worked_example","id":"CL-EPOWER-3","level":"Exam level","answer":94.89999999999999,"unit":"kWh","verified":true,"hints":["Difference in power × time.","W → kW."]} -->

**Question:** An 8 W LED gives the same light as a 60 W filament bulb. If used 5 hours a day, the energy saved in a year (365 days)?

<details><summary>Step 1: Read the question</summary>

An 8 W LED gives the same light as a 60 W filament bulb. If used 5 hours a day, the energy saved in a year (365 days)?

</details>

<details><summary>Step 2: List the data</summary>

P₁ = 60 W; P₂ = 8 W; t = 1825 h

</details>

<details><summary>Step 3: Find</summary>

Saving (kWh)

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$\Delta E = (P_1 - P_2)\,t$

</details>

<details><summary>Step 6: Substitute</summary>

$\Delta E = \frac{60-8}{1000}\times1825$

</details>

<details><summary>Step 7: Calculate</summary>

$\Delta E = 94.9$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**94.9 kWh** — Using LEDs saves energy and money (2019 Paper II Q7B type).

</details>

<details><summary>Hints</summary>

- Difference in power × time.
- W → kW.

</details>

### CL-EPOWER-4 · Challenge

<!-- meta {"type":"worked_example","id":"CL-EPOWER-4","level":"Challenge","answer":4.0,"unit":"A","verified":true,"hints":["Rearrange P = VI for I.","Fuse > normal current."]} -->

**Question:** A 230 V, 920 W kettle. (i) Current (ii) Resistance (iii) Energy used in 10 minutes (J) (iv) Suitable fuse (from 3 A, 5 A, 13 A)?

<details><summary>Step 1: Read the question</summary>

A 230 V, 920 W kettle. (i) Current (ii) Resistance (iii) Energy used in 10 minutes (J) (iv) Suitable fuse (from 3 A, 5 A, 13 A)?

</details>

<details><summary>Step 2: List the data</summary>

V = 230 V; P = 920 W; t = 10 min

</details>

<details><summary>Step 3: Find</summary>

I, R, E, fuse

</details>

<details><summary>Step 4: Convert units</summary>

$t = 10\ \text{min} = 600\ \text{s}$

</details>

<details><summary>Step 5: Choose the formula</summary>

$I = \frac PV;\ R = \frac VI;\ E = Pt$

</details>

<details><summary>Step 6: Substitute</summary>

$I = \frac{920}{230};\ R = \frac{230}{4};\ E = 920\times600$

</details>

<details><summary>Step 7: Calculate</summary>

$I = 4\ \text{A}$ → $R = 57.5\ \Omega$ → $E = 552000\ \text{J} = 5.52 \times 10^{5}\ \text{J}$ → $\text{Fuse: 5 A (slightly higher than 4 A)}$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**4 A** — The fuse should be slightly higher than the normal current.

</details>

<details><summary>Hints</summary>

- Rearrange P = VI for I.
- Fuse > normal current.

</details>

---

## CL-HEAT: Specific heat capacity and latent heat

<!-- meta {"type":"calc_type","id":"CL-HEAT","chapter_id":"SC11-09","discipline":"PHY","levels":4} -->

*Heat*

**Formula:**

$$Q = mc\Delta\theta;\ Q = mL$$

| Symbol | Quantity | Unit |
|---|---|---|
| Q | heat | J |
| m | mass | kg |
| c | specific heat capacity | J kg⁻¹ °C⁻¹ |
| L | specific latent heat | J kg⁻¹ |

- **When to use:** Temperature change; change of state.
- **Unit conversions:** g → kg; kJ → J; no K conversion needed for Δθ.
- **Rearranged forms:** $c = \frac{Q}{m\Delta\theta},\ \Delta\theta = \frac{Q}{mc}$
- **Common mistakes:** Using Δθ during a change of state.

### CL-HEAT-1 · Basic

<!-- meta {"type":"worked_example","id":"CL-HEAT-1","level":"Basic","answer":252000,"unit":"J","verified":true,"hints":["Q = mcθ.","Δθ = change in temperature."]} -->

**Question:** Heat needed to heat 2 kg of water by 30 °C? (c = 4200 J kg⁻¹ °C⁻¹)

<details><summary>Step 1: Read the question</summary>

Heat needed to heat 2 kg of water by 30 °C? (c = 4200 J kg⁻¹ °C⁻¹)

</details>

<details><summary>Step 2: List the data</summary>

m = 2 kg; c = 4200 J kg⁻¹ °C⁻¹; Δθ = 30 °C

</details>

<details><summary>Step 3: Find</summary>

Q

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$Q = mc\Delta\theta$

</details>

<details><summary>Step 6: Substitute</summary>

$Q = 2\times4200\times30$

</details>

<details><summary>Step 7: Calculate</summary>

$Q = 252000\ \text{J} = 252\ \text{kJ}$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**252000 J**

</details>

<details><summary>Hints</summary>

- Q = mcθ.
- Δθ = change in temperature.

</details>

### CL-HEAT-2 · Intermediate

<!-- meta {"type":"worked_example","id":"CL-HEAT-2","level":"Intermediate","answer":27000.0,"unit":"J","verified":true,"hints":["g → kg.","Δθ = final − initial."]} -->

**Question:** A 500 g aluminium pan is heated from 25 °C to 85 °C. (c = 900 J kg⁻¹ °C⁻¹) Heat absorbed?

<details><summary>Step 1: Read the question</summary>

A 500 g aluminium pan is heated from 25 °C to 85 °C. (c = 900 J kg⁻¹ °C⁻¹) Heat absorbed?

</details>

<details><summary>Step 2: List the data</summary>

m = 500 g; c = 900 J kg⁻¹ °C⁻¹; θ₁ = 25 °C; θ₂ = 85 °C

</details>

<details><summary>Step 3: Find</summary>

Q

</details>

<details><summary>Step 4: Convert units</summary>

$m = 0.5\ \text{kg},\ \Delta\theta = 85-25 = 60\ ^\circ\text{C}$

</details>

<details><summary>Step 5: Choose the formula</summary>

$Q = mc\Delta\theta$

</details>

<details><summary>Step 6: Substitute</summary>

$Q = 0.5\times900\times60$

</details>

<details><summary>Step 7: Calculate</summary>

$Q = 27000$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**27000 J**

</details>

<details><summary>Hints</summary>

- g → kg.
- Δθ = final − initial.

</details>

### CL-HEAT-3 · Exam level

<!-- meta {"type":"worked_example","id":"CL-HEAT-3","level":"Exam level","answer":10.0,"unit":"°C","verified":true,"hints":["Rearrange Q = mcθ for θ.","The one with higher c heats up less."]} -->

**Question:** Two liquids of equal mass (2 kg), A (c = 4200) and B (c = 2100), each receive 84000 J of heat. Temperature rises? Which is the better coolant?

<details><summary>Step 1: Read the question</summary>

Two liquids of equal mass (2 kg), A (c = 4200) and B (c = 2100), each receive 84000 J of heat. Temperature rises? Which is the better coolant?

</details>

<details><summary>Step 2: List the data</summary>

Q = 84000 J; m = 2 kg; c_A = 4200; c_B = 2100

</details>

<details><summary>Step 3: Find</summary>

Δθ_A, Δθ_B

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$\Delta\theta = \frac{Q}{mc}$

</details>

<details><summary>Step 6: Substitute</summary>

$\Delta\theta_A = \frac{84000}{2\times4200};\ \Delta\theta_B = \frac{84000}{2\times2100}$

</details>

<details><summary>Step 7: Calculate</summary>

$\Delta\theta_A = 10\ ^\circ\text{C}$ → $\Delta\theta_B = 20\ ^\circ\text{C}$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**10 °C** — A — high c; it absorbs more heat with a smaller temperature rise (2019 Paper II Q8B type).

</details>

<details><summary>Hints</summary>

- Rearrange Q = mcθ for θ.
- The one with higher c heats up less.

</details>

### CL-HEAT-4 · Challenge

<!-- meta {"type":"worked_example","id":"CL-HEAT-4","level":"Challenge","answer":84000.0,"unit":"J","verified":true,"hints":["Two stages: melting, heating.","Temperature does not change while melting."]} -->

**Question:** Total heat needed to change 0.2 kg of ice at 0 °C into water at 20 °C? (L = 336 000 J kg⁻¹, c = 4200 J kg⁻¹ °C⁻¹)

<details><summary>Step 1: Read the question</summary>

Total heat needed to change 0.2 kg of ice at 0 °C into water at 20 °C? (L = 336 000 J kg⁻¹, c = 4200 J kg⁻¹ °C⁻¹)

</details>

<details><summary>Step 2: List the data</summary>

m = 0.2 kg; L = 336000 J kg⁻¹; c = 4200 J kg⁻¹ °C⁻¹

</details>

<details><summary>Step 3: Find</summary>

Q

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$Q = mL + mc\Delta\theta$

</details>

<details><summary>Step 6: Substitute</summary>

$Q = 0.2\times336000 + 0.2\times4200\times20$

</details>

<details><summary>Step 7: Calculate</summary>

$Q = 67200 + 16800$ → $Q = 84000$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**84000 J** — First melting (temperature does not change), then heating.

</details>

<details><summary>Hints</summary>

- Two stages: melting, heating.
- Temperature does not change while melting.

</details>

---

## CL-WAVE: Wave equation

<!-- meta {"type":"calc_type","id":"CL-WAVE","chapter_id":"SC11-04","discipline":"PHY","levels":4} -->

*Waves and their applications*

**Formula:**

$$v = f\lambda;\ T = \frac1f$$

| Symbol | Quantity | Unit |
|---|---|---|
| v | wave speed | m s⁻¹ |
| f | frequency | Hz |
| λ | wavelength | m |

- **When to use:** Wave, sound and echo calculations.
- **Unit conversions:** kHz → Hz (× 1000); cm → m.
- **Rearranged forms:** $\lambda = \frac vf,\ f = \frac v\lambda$
- **Common mistakes:** Not dividing by 2 for an echo.

### CL-WAVE-1 · Basic

<!-- meta {"type":"worked_example","id":"CL-WAVE-1","level":"Basic","answer":332.8,"unit":"m s⁻¹","verified":true,"hints":["v = fλ."]} -->

**Question:** Speed of a sound of frequency 256 Hz and wavelength 1.3 m?

<details><summary>Step 1: Read the question</summary>

Speed of a sound of frequency 256 Hz and wavelength 1.3 m?

</details>

<details><summary>Step 2: List the data</summary>

f = 256 Hz; λ = 1.3 m

</details>

<details><summary>Step 3: Find</summary>

v

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$v = f\lambda$

</details>

<details><summary>Step 6: Substitute</summary>

$v = 256\times1.3$

</details>

<details><summary>Step 7: Calculate</summary>

$v = 332.8$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**332.8 m s⁻¹**

</details>

<details><summary>Hints</summary>

- v = fλ.

</details>

### CL-WAVE-2 · Intermediate

<!-- meta {"type":"worked_example","id":"CL-WAVE-2","level":"Intermediate","answer":2.0,"unit":"cm","verified":true,"hints":["kHz → Hz.","m → cm (× 100)."]} -->

**Question:** Sound travels at 340 m s⁻¹ in air. Wavelength of a 17 kHz sound (in cm)?

<details><summary>Step 1: Read the question</summary>

Sound travels at 340 m s⁻¹ in air. Wavelength of a 17 kHz sound (in cm)?

</details>

<details><summary>Step 2: List the data</summary>

v = 340 m s⁻¹; f = 17 kHz

</details>

<details><summary>Step 3: Find</summary>

λ

</details>

<details><summary>Step 4: Convert units</summary>

$f = 17\ \text{kHz} = 17000\ \text{Hz}$

</details>

<details><summary>Step 5: Choose the formula</summary>

$\lambda = \frac{v}{f}$

</details>

<details><summary>Step 6: Substitute</summary>

$\lambda = \frac{340}{17000}$

</details>

<details><summary>Step 7: Calculate</summary>

$\lambda = 0.02\ \text{m} = 2\ \text{cm}$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**2 cm**

</details>

<details><summary>Hints</summary>

- kHz → Hz.
- m → cm (× 100).

</details>

### CL-WAVE-3 · Exam level

<!-- meta {"type":"worked_example","id":"CL-WAVE-3","level":"Exam level","answer":1360,"unit":"m","verified":true,"hints":["Use the speed of sound.","d = vt."]} -->

**Question:** Thunder is heard 4 s after the lightning is seen (ignore the light's time). Distance of the lightning?

<details><summary>Step 1: Read the question</summary>

Thunder is heard 4 s after the lightning is seen (ignore the light's time). Distance of the lightning?

</details>

<details><summary>Step 2: List the data</summary>

t = 4 s; v = 340 m s⁻¹

</details>

<details><summary>Step 3: Find</summary>

d

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$d = vt$

</details>

<details><summary>Step 6: Substitute</summary>

$d = 340\times4$

</details>

<details><summary>Step 7: Calculate</summary>

$d = 1360$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**1360 m** — Light arrives almost instantly.

</details>

<details><summary>Hints</summary>

- Use the speed of sound.
- d = vt.

</details>

### CL-WAVE-4 · Challenge

<!-- meta {"type":"worked_example","id":"CL-WAVE-4","level":"Challenge","answer":450.0,"unit":"m","verified":true,"hints":["The total time is for going and returning.","Divide by 2."]} -->

**Question:** A ship's SONAR ultrasound pulse reflects from the sea bed and returns in 0.6 s. Sound travels at 1500 m s⁻¹ in water. Depth of the sea?

<details><summary>Step 1: Read the question</summary>

A ship's SONAR ultrasound pulse reflects from the sea bed and returns in 0.6 s. Sound travels at 1500 m s⁻¹ in water. Depth of the sea?

</details>

<details><summary>Step 2: List the data</summary>

t (there and back) = 0.6 s; v = 1500 m s⁻¹

</details>

<details><summary>Step 3: Find</summary>

Depth

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$d = \frac{vt}{2}$

</details>

<details><summary>Step 6: Substitute</summary>

$d = \frac{1500\times0.6}{2}$

</details>

<details><summary>Step 7: Calculate</summary>

$d = 450$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**450 m** — Divide by 2 because the sound goes and returns.

</details>

<details><summary>Hints</summary>

- The total time is for going and returning.
- Divide by 2.

</details>

---

## CL-OPTICS: Refractive index and lenses

<!-- meta {"type":"calc_type","id":"CL-OPTICS","chapter_id":"SC11-05","discipline":"PHY","levels":4} -->

*Geometrical optics*

**Formula:**

$$n = \frac{\sin i}{\sin r} = \frac cv;\ \frac1f = \frac1u + \frac1v$$

| Symbol | Quantity | Unit |
|---|---|---|
| n | refractive index | — |
| f | focal length | cm |
| u | object distance | cm |
| v | image distance | cm |

- **When to use:** Refraction; image position (checking).
- **Unit conversions:** Can be kept in cm (same unit).
- **Rearranged forms:** $\sin r = \frac{\sin i}{n}$
- **Common mistakes:** Dividing the angles themselves (not taking sin); the sign for a virtual image.

### CL-OPTICS-1 · Basic

<!-- meta {"type":"worked_example","id":"CL-OPTICS-1","level":"Basic","answer":1.532,"unit":"(no unit)","verified":true,"hints":["n = sin i / sin r.","No unit."]} -->

**Question:** Light passes from air into glass at an angle of incidence of 50° and is refracted at 30°. Refractive index? (sin 50° = 0.766, sin 30° = 0.5)

<details><summary>Step 1: Read the question</summary>

Light passes from air into glass at an angle of incidence of 50° and is refracted at 30°. Refractive index? (sin 50° = 0.766, sin 30° = 0.5)

</details>

<details><summary>Step 2: List the data</summary>

sin i = 0.766; sin r = 0.5

</details>

<details><summary>Step 3: Find</summary>

n

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$n = \frac{\sin i}{\sin r}$

</details>

<details><summary>Step 6: Substitute</summary>

$n = \frac{0.766}{0.5}$

</details>

<details><summary>Step 7: Calculate</summary>

$n = 1.532$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**1.532 (no unit)**

</details>

<details><summary>Hints</summary>

- n = sin i / sin r.
- No unit.

</details>

### CL-OPTICS-2 · Intermediate

<!-- meta {"type":"worked_example","id":"CL-OPTICS-2","level":"Intermediate","answer":200000000.0,"unit":"m s⁻¹","verified":true,"hints":["n = c/v.","v = c/n."]} -->

**Question:** Speed of light in glass of refractive index 1.5? (3 × 10⁸ m s⁻¹ in air)

<details><summary>Step 1: Read the question</summary>

Speed of light in glass of refractive index 1.5? (3 × 10⁸ m s⁻¹ in air)

</details>

<details><summary>Step 2: List the data</summary>

c = 300000000 m s⁻¹; n = 1.5

</details>

<details><summary>Step 3: Find</summary>

v

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$n = \frac{c}{v} \Rightarrow v = \frac{c}{n}$

</details>

<details><summary>Step 6: Substitute</summary>

$v = \frac{3\times10^8}{1.5}$

</details>

<details><summary>Step 7: Calculate</summary>

$v = 2 \times 10^{8}$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**2 × 10⁸ m s⁻¹**

</details>

<details><summary>Hints</summary>

- n = c/v.
- v = c/n.

</details>

### CL-OPTICS-3 · Exam level

<!-- meta {"type":"worked_example","id":"CL-OPTICS-3","level":"Exam level","answer":14.999999999999996,"unit":"cm","verified":true,"hints":["The formula is for checking; at O/L the ray diagram is the main method.","1/v = 1/f − 1/u."]} -->

**Question:** An object is placed 30 cm in front of a convex lens of focal length 10 cm. Image distance and magnification? (magnitude form: 1/f = 1/u + 1/v, real image positive)

<details><summary>Step 1: Read the question</summary>

An object is placed 30 cm in front of a convex lens of focal length 10 cm. Image distance and magnification? (magnitude form: 1/f = 1/u + 1/v, real image positive)

</details>

<details><summary>Step 2: List the data</summary>

f = 10 cm; u = 30 cm

</details>

<details><summary>Step 3: Find</summary>

v, m

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$\frac1f = \frac1u + \frac1v;\ m = \frac vu$

</details>

<details><summary>Step 6: Substitute</summary>

$\frac1v = \frac1{10} - \frac1{30} = \frac{2}{30}$

</details>

<details><summary>Step 7: Calculate</summary>

$v = 15\ \text{cm}$ → $m = \frac{15}{30} = 0.5$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**15 cm** — The image is real, inverted and diminished (object beyond 2F) — this agrees with the ray diagram.

</details>

<details><summary>Hints</summary>

- The formula is for checking; at O/L the ray diagram is the main method.
- 1/v = 1/f − 1/u.

</details>

### CL-OPTICS-4 · Challenge

<!-- meta {"type":"worked_example","id":"CL-OPTICS-4","level":"Challenge","answer":2.9999999999999996,"unit":"(times)","verified":true,"hints":["u < f — virtual image.","Negative v = virtual image."]} -->

**Question:** To use a convex lens of f = 12 cm as a magnifying glass, the object is at 8 cm. Image distance and magnification?

<details><summary>Step 1: Read the question</summary>

To use a convex lens of f = 12 cm as a magnifying glass, the object is at 8 cm. Image distance and magnification?

</details>

<details><summary>Step 2: List the data</summary>

f = 12 cm; u = 8 cm

</details>

<details><summary>Step 3: Find</summary>

v, m

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$\frac1v = \frac1f - \frac1u$

</details>

<details><summary>Step 6: Substitute</summary>

$\frac1v = \frac1{12} - \frac1{8} = -\frac{1}{24}$

</details>

<details><summary>Step 7: Calculate</summary>

$v = -24\ \text{cm (negative → virtual image, on the object side)}$ → $m = \frac{24}{8} = 3$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**3 (times)** — A virtual, upright image 3 times larger.

</details>

<details><summary>Hints</summary>

- u < f — virtual image.
- Negative v = virtual image.

</details>

---

## CL-TRANS: Transformer

<!-- meta {"type":"calc_type","id":"CL-TRANS","chapter_id":"SC11-13","discipline":"PHY","levels":4} -->

*Electromagnetism and electromagnetic induction*

**Formula:**

$$\frac{V_s}{V_p} = \frac{N_s}{N_p};\ V_pI_p = V_sI_s\ (\text{ideal})$$

| Symbol | Quantity | Unit |
|---|---|---|
| V | voltage | V |
| N | turns | — |
| I | current | A |

- **When to use:** AC voltage change.
- **Unit conversions:** kV → V (× 1000).
- **Rearranged forms:** $N_s = N_p\frac{V_s}{V_p}$
- **Common mistakes:** Writing the ratio upside down; forgetting efficiency.

### CL-TRANS-1 · Basic

<!-- meta {"type":"worked_example","id":"CL-TRANS-1","level":"Basic","answer":12.0,"unit":"V","verified":true,"hints":["Ratio formula."]} -->

**Question:** In a transformer Np = 1150, Ns = 60, Vp = 230 V. Vs?

<details><summary>Step 1: Read the question</summary>

In a transformer Np = 1150, Ns = 60, Vp = 230 V. Vs?

</details>

<details><summary>Step 2: List the data</summary>

Vp = 230 V; Np = 1150; Ns = 60

</details>

<details><summary>Step 3: Find</summary>

Vs

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$\frac{V_s}{V_p} = \frac{N_s}{N_p}$

</details>

<details><summary>Step 6: Substitute</summary>

$V_s = 230\times\frac{60}{1150}$

</details>

<details><summary>Step 7: Calculate</summary>

$V_s = 12$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**12 V** — A step-down transformer.

</details>

<details><summary>Hints</summary>

- Ratio formula.

</details>

### CL-TRANS-2 · Intermediate

<!-- meta {"type":"worked_example","id":"CL-TRANS-2","level":"Intermediate","answer":92.0,"unit":"turns","verified":true,"hints":["kV → V.","Ratio."]} -->

**Question:** A transformer changes 11 kV into 230 V and has 4400 primary turns. Secondary turns?

<details><summary>Step 1: Read the question</summary>

A transformer changes 11 kV into 230 V and has 4400 primary turns. Secondary turns?

</details>

<details><summary>Step 2: List the data</summary>

Vp = 11 kV; Vs = 230 V; Np = 4400

</details>

<details><summary>Step 3: Find</summary>

Ns

</details>

<details><summary>Step 4: Convert units</summary>

$V_p = 11\ \text{kV} = 11000\ \text{V}$

</details>

<details><summary>Step 5: Choose the formula</summary>

$N_s = N_p\frac{V_s}{V_p}$

</details>

<details><summary>Step 6: Substitute</summary>

$N_s = 4400\times\frac{230}{11000}$

</details>

<details><summary>Step 7: Calculate</summary>

$N_s = 92$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**92 turns**

</details>

<details><summary>Hints</summary>

- kV → V.
- Ratio.

</details>

### CL-TRANS-3 · Exam level

<!-- meta {"type":"worked_example","id":"CL-TRANS-3","level":"Exam level","answer":10.0,"unit":"A","verified":true,"hints":["Ideal: input power = output power."]} -->

**Question:** Ideal transformer: Vp = 240 V, Ip = 0.5 A, Vs = 12 V. Is?

<details><summary>Step 1: Read the question</summary>

Ideal transformer: Vp = 240 V, Ip = 0.5 A, Vs = 12 V. Is?

</details>

<details><summary>Step 2: List the data</summary>

Vp = 240 V; Ip = 0.5 A; Vs = 12 V

</details>

<details><summary>Step 3: Find</summary>

Is

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$V_pI_p = V_sI_s$

</details>

<details><summary>Step 6: Substitute</summary>

$240\times0.5 = 12\times I_s$

</details>

<details><summary>Step 7: Calculate</summary>

$I_s = 10$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**10 A** — As voltage decreases, current increases.

</details>

<details><summary>Hints</summary>

- Ideal: input power = output power.

</details>

### CL-TRANS-4 · Challenge

<!-- meta {"type":"worked_example","id":"CL-TRANS-4","level":"Challenge","answer":22.5,"unit":"A","verified":true,"hints":["First the output power.","I = P/V."]} -->

**Question:** A transformer has a primary power of 500 W, efficiency 90%, Vs = 20 V. Secondary current? Power wasted?

<details><summary>Step 1: Read the question</summary>

A transformer has a primary power of 500 W, efficiency 90%, Vs = 20 V. Secondary current? Power wasted?

</details>

<details><summary>Step 2: List the data</summary>

Pp = 500 W; η = 90 %; Vs = 20 V

</details>

<details><summary>Step 3: Find</summary>

Is, loss

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$P_s = \eta P_p;\ I_s = \frac{P_s}{V_s}$

</details>

<details><summary>Step 6: Substitute</summary>

$P_s = 0.9\times500 = 450;\ I_s = \frac{450}{20}$

</details>

<details><summary>Step 7: Calculate</summary>

$I_s = 22.5\ \text{A}$ → $\text{loss} = 500 - 450 = 50\ \text{W}$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**22.5 A** — The loss is heat in the core (2019 Paper I Q23 type).

</details>

<details><summary>Hints</summary>

- First the output power.
- I = P/V.

</details>

---

## CL-TEMP: Converting temperature scales

<!-- meta {"type":"calc_type","id":"CL-TEMP","chapter_id":"SC11-09","discipline":"PHY","levels":4} -->

*Heat*

**Formula:**

$$T(K) = \theta(^\circ C) + 273$$

| Symbol | Quantity | Unit |
|---|---|---|
| T | kelvin temperature | K |
| θ | Celsius | °C |

- **When to use:** Scale conversion.
- **Unit conversions:** —
- **Rearranged forms:** $\theta = T - 273$
- **Common mistakes:** Adding 273 to a change (Δ).

### CL-TEMP-1 · Basic

<!-- meta {"type":"worked_example","id":"CL-TEMP-1","level":"Basic","answer":310,"unit":"K","verified":true,"hints":["+273."]} -->

**Question:** Human body temperature 37 °C in kelvin?

<details><summary>Step 1: Read the question</summary>

Human body temperature 37 °C in kelvin?

</details>

<details><summary>Step 2: List the data</summary>

θ = 37 °C

</details>

<details><summary>Step 3: Find</summary>

T

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$T = \theta + 273$

</details>

<details><summary>Step 6: Substitute</summary>

$T = 37+273$

</details>

<details><summary>Step 7: Calculate</summary>

$T = 310$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**310 K**

</details>

<details><summary>Hints</summary>

- +273.

</details>

### CL-TEMP-2 · Intermediate

<!-- meta {"type":"worked_example","id":"CL-TEMP-2","level":"Intermediate","answer":-23,"unit":"°C","verified":true,"hints":["−273."]} -->

**Question:** 250 K in °C?

<details><summary>Step 1: Read the question</summary>

250 K in °C?

</details>

<details><summary>Step 2: List the data</summary>

T = 250 K

</details>

<details><summary>Step 3: Find</summary>

θ

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$\theta = T - 273$

</details>

<details><summary>Step 6: Substitute</summary>

$\theta = 250-273$

</details>

<details><summary>Step 7: Calculate</summary>

$\theta = -23$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**-23 °C** — Below 0 °C.

</details>

<details><summary>Hints</summary>

- −273.

</details>

### CL-TEMP-3 · Exam level

<!-- meta {"type":"worked_example","id":"CL-TEMP-3","level":"Exam level","answer":60,"unit":"K","verified":true,"hints":["The difference is the same on both scales."]} -->

**Question:** Water goes from 20 °C to 80 °C. Change in temperature in kelvin?

<details><summary>Step 1: Read the question</summary>

Water goes from 20 °C to 80 °C. Change in temperature in kelvin?

</details>

<details><summary>Step 2: List the data</summary>

θ₁ = 20 °C; θ₂ = 80 °C

</details>

<details><summary>Step 3: Find</summary>

ΔT

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$\Delta T = \Delta\theta$

</details>

<details><summary>Step 6: Substitute</summary>

$\Delta T = 80-20$

</details>

<details><summary>Step 7: Calculate</summary>

$\Delta T = 60$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**60 K** — A change of 1 °C = a change of 1 K.

</details>

<details><summary>Hints</summary>

- The difference is the same on both scales.

</details>

### CL-TEMP-4 · Challenge

<!-- meta {"type":"worked_example","id":"CL-TEMP-4","level":"Challenge","answer":126000.0,"unit":"J","verified":true,"hints":["The kelvin difference can be used directly."]} -->

**Question:** 0.5 kg of water is heated from 293 K to 353 K. Heat needed? (c = 4200 J kg⁻¹ K⁻¹)

<details><summary>Step 1: Read the question</summary>

0.5 kg of water is heated from 293 K to 353 K. Heat needed? (c = 4200 J kg⁻¹ K⁻¹)

</details>

<details><summary>Step 2: List the data</summary>

m = 0.5 kg; T₁ = 293 K; T₂ = 353 K

</details>

<details><summary>Step 3: Find</summary>

Q

</details>

<details><summary>Step 4: Convert units</summary>

$\Delta T = 353-293 = 60\ \text{K} = 60\ ^\circ\text{C}$

</details>

<details><summary>Step 5: Choose the formula</summary>

$Q = mc\Delta T$

</details>

<details><summary>Step 6: Substitute</summary>

$Q = 0.5\times4200\times60$

</details>

<details><summary>Step 7: Calculate</summary>

$Q = 126000$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**1.26 × 10⁵ J**

</details>

<details><summary>Hints</summary>

- The kelvin difference can be used directly.

</details>

---

## CL-MOLE: Moles, molar mass, particles

<!-- meta {"type":"calc_type","id":"CL-MOLE","chapter_id":"SC10-07","discipline":"CHE","levels":4} -->

*Quantification of elements and compounds*

**Formula:**

$$n = \frac mM;\ N = nN_A$$

| Symbol | Quantity | Unit |
|---|---|---|
| n | moles | mol |
| m | mass | g |
| M | molar mass | g mol⁻¹ |
| N_A | Avogadro constant | 6.022 × 10²³ mol⁻¹ |

- **When to use:** Mass ↔ moles ↔ particles; reacting masses.
- **Unit conversions:** kg → g (× 1000).
- **Rearranged forms:** $m = nM,\ n = \frac{N}{N_A}$
- **Common mistakes:** Confusing molecules and atoms; an unbalanced equation.

### CL-MOLE-1 · Basic

<!-- meta {"type":"worked_example","id":"CL-MOLE-1","level":"Basic","answer":2.0,"unit":"mol","verified":true,"hints":["n = m/M."]} -->

**Question:** Number of moles in 36 g of water? (H₂O = 18 g mol⁻¹)

<details><summary>Step 1: Read the question</summary>

Number of moles in 36 g of water? (H₂O = 18 g mol⁻¹)

</details>

<details><summary>Step 2: List the data</summary>

m = 36 g; M = 18 g mol⁻¹

</details>

<details><summary>Step 3: Find</summary>

n

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$n = \frac{m}{M}$

</details>

<details><summary>Step 6: Substitute</summary>

$n = \frac{36}{18}$

</details>

<details><summary>Step 7: Calculate</summary>

$n = 2$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**2 mol**

</details>

<details><summary>Hints</summary>

- n = m/M.

</details>

### CL-MOLE-2 · Intermediate

<!-- meta {"type":"worked_example","id":"CL-MOLE-2","level":"Intermediate","answer":0.25,"unit":"mol","verified":true,"hints":["First calculate the molar mass."]} -->

**Question:** Moles in 25 g of CaCO₃? (Ca = 40, C = 12, O = 16)

<details><summary>Step 1: Read the question</summary>

Moles in 25 g of CaCO₃? (Ca = 40, C = 12, O = 16)

</details>

<details><summary>Step 2: List the data</summary>

m = 25 g

</details>

<details><summary>Step 3: Find</summary>

n

</details>

<details><summary>Step 4: Convert units</summary>

$M(\text{CaCO}_3) = 40 + 12 + 3\times16 = 100$

</details>

<details><summary>Step 5: Choose the formula</summary>

$n = \frac{m}{M}$

</details>

<details><summary>Step 6: Substitute</summary>

$n = \frac{25}{100}$

</details>

<details><summary>Step 7: Calculate</summary>

$n = 0.25$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**0.25 mol**

</details>

<details><summary>Hints</summary>

- First calculate the molar mass.

</details>

### CL-MOLE-3 · Exam level

<!-- meta {"type":"worked_example","id":"CL-MOLE-3","level":"Exam level","answer":1.5055e+23,"unit":"molecules","verified":true,"hints":["N = n × N_A.","For atoms, multiply by the number in the molecule."]} -->

**Question:** Molecules and oxygen atoms in 0.25 mol of CO₂?

<details><summary>Step 1: Read the question</summary>

Molecules and oxygen atoms in 0.25 mol of CO₂?

</details>

<details><summary>Step 2: List the data</summary>

n = 0.25 mol; N_A = 602200000000000027262976 mol⁻¹

</details>

<details><summary>Step 3: Find</summary>

N

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$N = nN_A$

</details>

<details><summary>Step 6: Substitute</summary>

$N = 0.25\times6.022\times10^{23}$

</details>

<details><summary>Step 7: Calculate</summary>

$N = 1.506 \times 10^{23}\ \text{molecules}$ → $\text{O atoms} = 2\times 1.506 \times 10^{23} = 3.011 \times 10^{23}$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**1.506 × 10²³ molecules** — Each CO₂ has 2 O atoms.

</details>

<details><summary>Hints</summary>

- N = n × N_A.
- For atoms, multiply by the number in the molecule.

</details>

### CL-MOLE-4 · Challenge

<!-- meta {"type":"worked_example","id":"CL-MOLE-4","level":"Challenge","answer":0.5,"unit":"g","verified":true,"hints":["Mole ratio from the balanced equation.","H₂ = 2 g mol⁻¹."]} -->

**Question:** Mg + 2HCl → MgCl₂ + H₂. Mass of H₂ formed if 6 g of Mg reacts completely? (Mg = 24, H = 1)

<details><summary>Step 1: Read the question</summary>

Mg + 2HCl → MgCl₂ + H₂. Mass of H₂ formed if 6 g of Mg reacts completely? (Mg = 24, H = 1)

</details>

<details><summary>Step 2: List the data</summary>

m(Mg) = 6 g

</details>

<details><summary>Step 3: Find</summary>

m(H₂)

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$n = \frac mM;\ \text{mole ratio Mg : H}_2 = 1:1$

</details>

<details><summary>Step 6: Substitute</summary>

$n(\text{Mg}) = \frac{6}{24} = 0.25$

</details>

<details><summary>Step 7: Calculate</summary>

$n(\text{H}_2) = 0.25$ → $m(\text{H}_2) = 0.25\times2 = 0.5$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**0.5 g**

</details>

<details><summary>Hints</summary>

- Mole ratio from the balanced equation.
- H₂ = 2 g mol⁻¹.

</details>

---

## CL-CONC: Solution concentration, density

<!-- meta {"type":"calc_type","id":"CL-CONC","chapter_id":"SC11-03","discipline":"CHE","levels":4} -->

*Mixtures*

**Formula:**

$$C = \frac nV;\ \rho = \frac mV;\ w/w\% = \frac{m_{solute}}{m_{solution}}\times100$$

| Symbol | Quantity | Unit |
|---|---|---|
| C | concentration | mol dm⁻³ |
| V | volume | dm³ |
| ρ | density | g cm⁻³ |

- **When to use:** Preparing solutions, analysing solutions.
- **Unit conversions:** cm³ → dm³ (÷ 1000).
- **Rearranged forms:** $n = CV,\ V = \frac nC$
- **Common mistakes:** Using cm³ directly; dividing by the mass of solvent.

### CL-CONC-1 · Basic

<!-- meta {"type":"worked_example","id":"CL-CONC-1","level":"Basic","answer":0.4,"unit":"mol dm⁻³","verified":true,"hints":["cm³ → dm³ (÷ 1000)."]} -->

**Question:** 0.2 mol of NaCl in 500 cm³ of solution. Concentration?

<details><summary>Step 1: Read the question</summary>

0.2 mol of NaCl in 500 cm³ of solution. Concentration?

</details>

<details><summary>Step 2: List the data</summary>

n = 0.2 mol; V = 500 cm³

</details>

<details><summary>Step 3: Find</summary>

C

</details>

<details><summary>Step 4: Convert units</summary>

$V = 500\ \text{cm}^3 = 0.5\ \text{dm}^3$

</details>

<details><summary>Step 5: Choose the formula</summary>

$C = \frac nV$

</details>

<details><summary>Step 6: Substitute</summary>

$C = \frac{0.2}{0.5}$

</details>

<details><summary>Step 7: Calculate</summary>

$C = 0.4$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**0.4 mol dm⁻³**

</details>

<details><summary>Hints</summary>

- cm³ → dm³ (÷ 1000).

</details>

### CL-CONC-2 · Intermediate

<!-- meta {"type":"worked_example","id":"CL-CONC-2","level":"Intermediate","answer":5.0,"unit":"g","verified":true,"hints":["n = CV.","m = nM."]} -->

**Question:** Mass of NaOH needed to prepare 250 cm³ of 0.5 mol dm⁻³ NaOH solution? (NaOH = 40)

<details><summary>Step 1: Read the question</summary>

Mass of NaOH needed to prepare 250 cm³ of 0.5 mol dm⁻³ NaOH solution? (NaOH = 40)

</details>

<details><summary>Step 2: List the data</summary>

C = 0.5 mol dm⁻³; V = 250 cm³; M = 40 g mol⁻¹

</details>

<details><summary>Step 3: Find</summary>

m

</details>

<details><summary>Step 4: Convert units</summary>

$V = 0.25\ \text{dm}^3$

</details>

<details><summary>Step 5: Choose the formula</summary>

$n = CV;\ m = nM$

</details>

<details><summary>Step 6: Substitute</summary>

$n = 0.5\times0.25 = 0.125;\ m = 0.125\times40$

</details>

<details><summary>Step 7: Calculate</summary>

$m = 5$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**5 g** — 2019 Paper I Q14 type.

</details>

<details><summary>Hints</summary>

- n = CV.
- m = nM.

</details>

### CL-CONC-3 · Exam level

<!-- meta {"type":"worked_example","id":"CL-CONC-3","level":"Exam level","answer":7.5,"unit":"%","verified":true,"hints":["Solution = solute + solvent."]} -->

**Question:** 15 g of sugar was dissolved in 185 g of water. Mass fraction %?

<details><summary>Step 1: Read the question</summary>

15 g of sugar was dissolved in 185 g of water. Mass fraction %?

</details>

<details><summary>Step 2: List the data</summary>

solute = 15 g; solvent = 185 g

</details>

<details><summary>Step 3: Find</summary>

w/w %

</details>

<details><summary>Step 4: Convert units</summary>

$\text{mass of solution} = 185 + 15 = 200\ \text{g}$

</details>

<details><summary>Step 5: Choose the formula</summary>

$w/w\% = \frac{m_{\text{solute}}}{m_{\text{solution}}}\times100$

</details>

<details><summary>Step 6: Substitute</summary>

$\frac{15}{200}\times100$

</details>

<details><summary>Step 7: Calculate</summary>

$= 7.5\%$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**7.5 %** — Divide by the solution, not the solvent.

</details>

<details><summary>Hints</summary>

- Solution = solute + solvent.

</details>

### CL-CONC-4 · Challenge

<!-- meta {"type":"worked_example","id":"CL-CONC-4","level":"Challenge","answer":0.6799999999999999,"unit":"mol dm⁻³","verified":true,"hints":["First the mass, using density.","Then the percentage, then moles."]} -->

**Question:** Vinegar: density 1.02 g cm⁻³, 4% acetic acid by mass (CH₃COOH = 60). In 500 cm³: (i) mass of solution (ii) mass of acid (iii) molar concentration?

<details><summary>Step 1: Read the question</summary>

Vinegar: density 1.02 g cm⁻³, 4% acetic acid by mass (CH₃COOH = 60). In 500 cm³: (i) mass of solution (ii) mass of acid (iii) molar concentration?

</details>

<details><summary>Step 2: List the data</summary>

ρ = 1.02 g cm⁻³; V = 500 cm³; w/w = 4 %

</details>

<details><summary>Step 3: Find</summary>

m, m_acid, C

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$m = \rho V;\ m_{acid} = m\times\frac{4}{100};\ C = \frac{m_{acid}/M}{V}$

</details>

<details><summary>Step 6: Substitute</summary>

$m = 1.02\times500 = 510;\ m_{acid} = 20.4$

</details>

<details><summary>Step 7: Calculate</summary>

$n = \frac{20.4}{60} = 0.34\ \text{mol}$ → $C = \frac{0.34}{0.5} = 0.68\ \text{mol dm}^{-3}$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**0.68 mol dm⁻³** — 2019 Paper II Q6C type.

</details>

<details><summary>Hints</summary>

- First the mass, using density.
- Then the percentage, then moles.

</details>

---

## CL-ENTH: Heat of reaction

<!-- meta {"type":"calc_type","id":"CL-ENTH","chapter_id":"SC11-08","discipline":"CHE","levels":4} -->

*Heat changes associated with chemical reactions*

**Formula:**

$$q = n|\Delta H|;\ Q = mc\Delta\theta;\ \Delta H = -\frac{Q}{n}$$

| Symbol | Quantity | Unit |
|---|---|---|
| ΔH | enthalpy change | kJ mol⁻¹ |
| n | moles | mol |
| Q | heat | J |

- **When to use:** Heat of combustion and neutralisation.
- **Unit conversions:** J → kJ (÷ 1000); g → kg.
- **Rearranged forms:** $n = \frac{q}{|\Delta H|}$
- **Common mistakes:** Forgetting the sign of ΔH; J/kJ confusion.

### CL-ENTH-1 · Basic

<!-- meta {"type":"worked_example","id":"CL-ENTH-1","level":"Basic","answer":1780,"unit":"kJ","verified":true,"hints":["Moles × ΔH."]} -->

**Question:** Combustion of CH₄ ΔH = −890 kJ mol⁻¹. Heat released when 2 mol burns?

<details><summary>Step 1: Read the question</summary>

Combustion of CH₄ ΔH = −890 kJ mol⁻¹. Heat released when 2 mol burns?

</details>

<details><summary>Step 2: List the data</summary>

n = 2 mol; ΔH = -890 kJ mol⁻¹

</details>

<details><summary>Step 3: Find</summary>

q

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$q = n\times|\Delta H|$

</details>

<details><summary>Step 6: Substitute</summary>

$q = 2\times890$

</details>

<details><summary>Step 7: Calculate</summary>

$q = 1780$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**1780 kJ** — Exothermic — heat is released.

</details>

<details><summary>Hints</summary>

- Moles × ΔH.

</details>

### CL-ENTH-2 · Intermediate

<!-- meta {"type":"worked_example","id":"CL-ENTH-2","level":"Intermediate","answer":700.0,"unit":"kJ","verified":true,"hints":["Moles first."]} -->

**Question:** Combustion of C₂H₄ ΔH = −1400 kJ mol⁻¹. Heat when 14 g of ethene burns? (C₂H₄ = 28)

<details><summary>Step 1: Read the question</summary>

Combustion of C₂H₄ ΔH = −1400 kJ mol⁻¹. Heat when 14 g of ethene burns? (C₂H₄ = 28)

</details>

<details><summary>Step 2: List the data</summary>

m = 14 g; M = 28 g mol⁻¹

</details>

<details><summary>Step 3: Find</summary>

q

</details>

<details><summary>Step 4: Convert units</summary>

$n = \frac{14}{28} = 0.5\ \text{mol}$

</details>

<details><summary>Step 5: Choose the formula</summary>

$q = n|\Delta H|$

</details>

<details><summary>Step 6: Substitute</summary>

$q = 0.5\times1400$

</details>

<details><summary>Step 7: Calculate</summary>

$q = 700$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**700 kJ** — Context of the 2019 Paper I Q30–31 type.

</details>

<details><summary>Hints</summary>

- Moles first.

</details>

### CL-ENTH-3 · Exam level

<!-- meta {"type":"worked_example","id":"CL-ENTH-3","level":"Exam level","answer":2730.0,"unit":"J","verified":true,"hints":["Treat the solution as water."]} -->

**Question:** In a neutralisation the temperature of 100 g of solution rose by 6.5 °C (c = 4200 J kg⁻¹ °C⁻¹). Heat released?

<details><summary>Step 1: Read the question</summary>

In a neutralisation the temperature of 100 g of solution rose by 6.5 °C (c = 4200 J kg⁻¹ °C⁻¹). Heat released?

</details>

<details><summary>Step 2: List the data</summary>

m = 100 g; Δθ = 6.5 °C

</details>

<details><summary>Step 3: Find</summary>

Q

</details>

<details><summary>Step 4: Convert units</summary>

$m = 0.1\ \text{kg}$

</details>

<details><summary>Step 5: Choose the formula</summary>

$Q = mc\Delta\theta$

</details>

<details><summary>Step 6: Substitute</summary>

$Q = 0.1\times4200\times6.5$

</details>

<details><summary>Step 7: Calculate</summary>

$Q = 2730$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**2730 J**

</details>

<details><summary>Hints</summary>

- Treat the solution as water.

</details>

### CL-ENTH-4 · Challenge

<!-- meta {"type":"worked_example","id":"CL-ENTH-4","level":"Challenge","answer":-54.599999999999994,"unit":"kJ mol⁻¹","verified":true,"hints":["J → kJ.","Negative sign for exothermic."]} -->

**Question:** In the reaction above 0.05 mol of water was formed. Enthalpy change of neutralisation (kJ mol⁻¹)?

<details><summary>Step 1: Read the question</summary>

In the reaction above 0.05 mol of water was formed. Enthalpy change of neutralisation (kJ mol⁻¹)?

</details>

<details><summary>Step 2: List the data</summary>

Q = 2730 J; n = 0.05 mol

</details>

<details><summary>Step 3: Find</summary>

ΔH

</details>

<details><summary>Step 4: Convert units</summary>

$Q = 2730\ \text{J} = 2.73\ \text{kJ}$

</details>

<details><summary>Step 5: Choose the formula</summary>

$\Delta H = -\frac{Q}{n}$

</details>

<details><summary>Step 6: Substitute</summary>

$\Delta H = -\frac{2.73}{0.05}$

</details>

<details><summary>Step 7: Calculate</summary>

$\Delta H = -54.6$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**-54.6 kJ mol⁻¹** — Negative sign — exothermic; close to the standard value ≈ −57 kJ mol⁻¹.

</details>

<details><summary>Hints</summary>

- J → kJ.
- Negative sign for exothermic.

</details>

---

## CL-RATE: Average rate of reaction

<!-- meta {"type":"calc_type","id":"CL-RATE","chapter_id":"SC10-17","discipline":"CHE","levels":4} -->

*Rate of reactions*

**Formula:**

$$\text{rate} = \frac{\Delta(\text{amount})}{\Delta t}$$

| Symbol | Quantity | Unit |
|---|---|---|
| ΔV | change in gas volume | cm³ |
| Δm | change in mass | g |
| Δt | time | s |

- **When to use:** Rate of reaction measurements.
- **Unit conversions:** min → s.
- **Rearranged forms:** $\Delta t = \frac{\Delta V}{\text{rate}}$
- **Common mistakes:** Using the total amount for an interval.

### CL-RATE-1 · Basic

<!-- meta {"type":"worked_example","id":"CL-RATE-1","level":"Basic","answer":0.8,"unit":"cm³ s⁻¹","verified":true,"hints":["Change ÷ time."]} -->

**Question:** A reaction gives 48 cm³ of H₂ in 60 s. Average rate?

<details><summary>Step 1: Read the question</summary>

A reaction gives 48 cm³ of H₂ in 60 s. Average rate?

</details>

<details><summary>Step 2: List the data</summary>

V = 48 cm³; t = 60 s

</details>

<details><summary>Step 3: Find</summary>

Rate

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$\text{rate} = \frac{\Delta V}{\Delta t}$

</details>

<details><summary>Step 6: Substitute</summary>

$\frac{48}{60}$

</details>

<details><summary>Step 7: Calculate</summary>

$= 0.8$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**0.8 cm³ s⁻¹**

</details>

<details><summary>Hints</summary>

- Change ÷ time.

</details>

### CL-RATE-2 · Intermediate

<!-- meta {"type":"worked_example","id":"CL-RATE-2","level":"Intermediate","answer":0.5,"unit":"cm³ s⁻¹","verified":true,"hints":["Change over the interval."]} -->

**Question:** 20 cm³ of gas at 30 s, 35 cm³ at 60 s. Average rate between 30 and 60 s?

<details><summary>Step 1: Read the question</summary>

20 cm³ of gas at 30 s, 35 cm³ at 60 s. Average rate between 30 and 60 s?

</details>

<details><summary>Step 2: List the data</summary>

V₁ = 20 cm³; V₂ = 35 cm³; t₁ = 30 s; t₂ = 60 s

</details>

<details><summary>Step 3: Find</summary>

Rate

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$\frac{V_2-V_1}{t_2-t_1}$

</details>

<details><summary>Step 6: Substitute</summary>

$\frac{35-20}{60-30}$

</details>

<details><summary>Step 7: Calculate</summary>

$= 0.5$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**0.5 cm³ s⁻¹** — Lower than the rate in the first 30 s (0.67) — the reactants are decreasing.

</details>

<details><summary>Hints</summary>

- Change over the interval.

</details>

### CL-RATE-3 · Exam level

<!-- meta {"type":"worked_example","id":"CL-RATE-3","level":"Exam level","answer":0.004999999999999952,"unit":"g s⁻¹","verified":true,"hints":["Decrease in mass = gas."]} -->

**Question:** The mass of a CaCO₃ + HCl flask decreased from 150.40 g to 149.80 g in 120 s. Average rate at which CO₂ escaped (g s⁻¹)?

<details><summary>Step 1: Read the question</summary>

The mass of a CaCO₃ + HCl flask decreased from 150.40 g to 149.80 g in 120 s. Average rate at which CO₂ escaped (g s⁻¹)?

</details>

<details><summary>Step 2: List the data</summary>

m₁ = 150.4 g; m₂ = 149.8 g; t = 120 s

</details>

<details><summary>Step 3: Find</summary>

Rate

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$\frac{\Delta m}{\Delta t}$

</details>

<details><summary>Step 6: Substitute</summary>

$\frac{150.40-149.80}{120}$

</details>

<details><summary>Step 7: Calculate</summary>

$= 0.005$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**0.005 g s⁻¹** — Mass lost = CO₂ escaped.

</details>

<details><summary>Hints</summary>

- Decrease in mass = gas.

</details>

### CL-RATE-4 · Challenge

<!-- meta {"type":"worked_example","id":"CL-RATE-4","level":"Challenge","answer":327.27272727272725,"unit":"cm³","verified":true,"hints":["Moles first.","Use the given molar volume."]} -->

**Question:** Volume of the 0.60 g of CO₂ released above (1 mol of gas = 24 000 cm³ at room temperature)? (CO₂ = 44)

<details><summary>Step 1: Read the question</summary>

Volume of the 0.60 g of CO₂ released above (1 mol of gas = 24 000 cm³ at room temperature)? (CO₂ = 44)

</details>

<details><summary>Step 2: List the data</summary>

m = 0.6 g; V_m = 24000 cm³ mol⁻¹

</details>

<details><summary>Step 3: Find</summary>

V

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$n = \frac mM;\ V = nV_m$

</details>

<details><summary>Step 6: Substitute</summary>

$n = \frac{0.60}{44}$

</details>

<details><summary>Step 7: Calculate</summary>

$n = 0.01364\ \text{mol}$ → $V = 0.01364\times24000 = 327.3$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**327.273 cm³** — (Only when the molar volume is given.)

</details>

<details><summary>Hints</summary>

- Moles first.
- Use the given molar volume.

</details>

---

## CL-GENE: Mendelian ratios

<!-- meta {"type":"calc_type","id":"CL-GENE","chapter_id":"SC10-20","discipline":"BIO","levels":4} -->

*Inheritance*

**Formula:**

$$Tt\times Tt \to 3:1;\ Tt\times tt \to 1:1$$

| Symbol | Quantity | Unit |
|---|---|---|
| N | total offspring | — |

- **When to use:** Expected number of offspring.
- **Unit conversions:** —
- **Common mistakes:** Confusing genotype and phenotype ratios.

### CL-GENE-1 · Basic

<!-- meta {"type":"worked_example","id":"CL-GENE-1","level":"Basic","answer":600,"unit":"plants","verified":true,"hints":["Punnett square: 1 TT : 2 Tt : 1 tt."]} -->

**Question:** 800 plants from a Tt × Tt cross. Expected tall plants?

<details><summary>Step 1: Read the question</summary>

800 plants from a Tt × Tt cross. Expected tall plants?

</details>

<details><summary>Step 2: List the data</summary>

N = 800

</details>

<details><summary>Step 3: Find</summary>

Tall

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$\text{tall} = \frac34 N$

</details>

<details><summary>Step 6: Substitute</summary>

$\frac34\times800$

</details>

<details><summary>Step 7: Calculate</summary>

$= 600$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**600 plants** — TT, Tt, Tt → 3/4.

</details>

<details><summary>Hints</summary>

- Punnett square: 1 TT : 2 Tt : 1 tt.

</details>

### CL-GENE-2 · Intermediate

<!-- meta {"type":"worked_example","id":"CL-GENE-2","level":"Intermediate","answer":300,"unit":"offspring","verified":true,"hints":["2 in 4 are Tt."]} -->

**Question:** 600 offspring from Tt × Tt. Heterozygous (Tt) offspring?

<details><summary>Step 1: Read the question</summary>

600 offspring from Tt × Tt. Heterozygous (Tt) offspring?

</details>

<details><summary>Step 2: List the data</summary>

N = 600

</details>

<details><summary>Step 3: Find</summary>

Tt

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$P(Tt) = \frac24$

</details>

<details><summary>Step 6: Substitute</summary>

$\frac12\times600$

</details>

<details><summary>Step 7: Calculate</summary>

$= 300$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**300 offspring**

</details>

<details><summary>Hints</summary>

- 2 in 4 are Tt.

</details>

### CL-GENE-3 · Exam level

<!-- meta {"type":"worked_example","id":"CL-GENE-3","level":"Exam level","answer":120,"unit":"plants","verified":true,"hints":["Tt × tt: Tt, Tt, tt, tt."]} -->

**Question:** Tall (Tt) × dwarf (tt) — 240 offspring. Dwarf plants?

<details><summary>Step 1: Read the question</summary>

Tall (Tt) × dwarf (tt) — 240 offspring. Dwarf plants?

</details>

<details><summary>Step 2: List the data</summary>

N = 240

</details>

<details><summary>Step 3: Find</summary>

Dwarf

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$Tt\times tt \Rightarrow 1:1$

</details>

<details><summary>Step 6: Substitute</summary>

$\frac12\times240$

</details>

<details><summary>Step 7: Calculate</summary>

$= 120$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**120 plants** — Test cross.

</details>

<details><summary>Hints</summary>

- Tt × tt: Tt, Tt, tt, tt.

</details>

### CL-GENE-4 · Challenge

<!-- meta {"type":"worked_example","id":"CL-GENE-4","level":"Challenge","answer":0.125,"unit":"","verified":true,"hints":["Multiply independent events."]} -->

**Question:** Two thalassaemia carriers (Tt). Probability that the next child is a boy with the disease (tt)?

<details><summary>Step 1: Read the question</summary>

Two thalassaemia carriers (Tt). Probability that the next child is a boy with the disease (tt)?

</details>

<details><summary>Step 2: List the data</summary>

P(tt) = 0.25; P(boy) = 0.5

</details>

<details><summary>Step 3: Find</summary>

P

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$P = P(tt)\times P(\text{boy})$

</details>

<details><summary>Step 6: Substitute</summary>

$\frac14\times\frac12$

</details>

<details><summary>Step 7: Calculate</summary>

$= \frac18$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**0.125 ** — The two events are independent — multiply.

</details>

<details><summary>Hints</summary>

- Multiply independent events.

</details>

---

## CL-ECO: Energy transfer in a food chain

<!-- meta {"type":"calc_type","id":"CL-ECO","chapter_id":"SC10-13","discipline":"BIO","levels":4} -->

*Biosphere*

**Formula:**

$$E_{n+1} \approx 0.1\,E_n$$

| Symbol | Quantity | Unit |
|---|---|---|
| E | energy | kJ |

- **When to use:** Energy between trophic levels.
- **Unit conversions:** —
- **Rearranged forms:** $E_n = \frac{E_{n+1}}{0.1}$
- **Common mistakes:** Dividing instead of multiplying (direction confusion).

### CL-ECO-1 · Basic

<!-- meta {"type":"worked_example","id":"CL-ECO-1","level":"Basic","answer":500.0,"unit":"kJ","verified":true,"hints":["× 0.1 for each step."]} -->

**Question:** The producer has 50 000 kJ. By the 10% rule, energy reaching the secondary consumer?

<details><summary>Step 1: Read the question</summary>

The producer has 50 000 kJ. By the 10% rule, energy reaching the secondary consumer?

</details>

<details><summary>Step 2: List the data</summary>

E = 50000 kJ

</details>

<details><summary>Step 3: Find</summary>

E₂

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$E_{n+1} = 0.1\,E_n$

</details>

<details><summary>Step 6: Substitute</summary>

$50000\times0.1\times0.1$

</details>

<details><summary>Step 7: Calculate</summary>

$= 500$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**500 kJ**

</details>

<details><summary>Hints</summary>

- × 0.1 for each step.

</details>

### CL-ECO-2 · Intermediate

<!-- meta {"type":"worked_example","id":"CL-ECO-2","level":"Intermediate","answer":12.5,"unit":"%","verified":true,"hints":["Part/total × 100."]} -->

**Question:** 2400 kJ in the primary consumer, 300 kJ in the secondary. Energy transfer %?

<details><summary>Step 1: Read the question</summary>

2400 kJ in the primary consumer, 300 kJ in the secondary. Energy transfer %?

</details>

<details><summary>Step 2: List the data</summary>

E₁ = 2400 kJ; E₂ = 300 kJ

</details>

<details><summary>Step 3: Find</summary>

%

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$\frac{E_2}{E_1}\times100$

</details>

<details><summary>Step 6: Substitute</summary>

$\frac{300}{2400}\times100$

</details>

<details><summary>Step 7: Calculate</summary>

$= 12.5\%$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**12.5 %**

</details>

<details><summary>Hints</summary>

- Part/total × 100.

</details>

### CL-ECO-3 · Exam level

<!-- meta {"type":"worked_example","id":"CL-ECO-3","level":"Exam level","answer":19999.999999999996,"unit":"kJ","verified":true,"hints":["Three steps backwards: ÷ 0.1 three times."]} -->

**Question:** Energy needed by the producer for the tertiary consumer to receive 20 kJ? (10%)

<details><summary>Step 1: Read the question</summary>

Energy needed by the producer for the tertiary consumer to receive 20 kJ? (10%)

</details>

<details><summary>Step 2: List the data</summary>

E₃ = 20 kJ

</details>

<details><summary>Step 3: Find</summary>

E₀

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$E_0 = \frac{E_3}{0.1^3}$

</details>

<details><summary>Step 6: Substitute</summary>

$\frac{20}{0.001}$

</details>

<details><summary>Step 7: Calculate</summary>

$= 20000$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**20000 kJ**

</details>

<details><summary>Hints</summary>

- Three steps backwards: ÷ 0.1 three times.

</details>

### CL-ECO-4 · Challenge

<!-- meta {"type":"worked_example","id":"CL-ECO-4","level":"Challenge","answer":1000,"unit":"kJ","verified":true,"hints":["Subtract the losses."]} -->

**Question:** A primary consumer eats 10 000 kJ; 60% is lost in respiration and 30% as waste. What remains for its body growth (available to the next level)?

<details><summary>Step 1: Read the question</summary>

A primary consumer eats 10 000 kJ; 60% is lost in respiration and 30% as waste. What remains for its body growth (available to the next level)?

</details>

<details><summary>Step 2: List the data</summary>

E = 10000 kJ

</details>

<details><summary>Step 3: Find</summary>

E_growth

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$E_{growth} = E(1 - 0.6 - 0.3)$

</details>

<details><summary>Step 6: Substitute</summary>

$10000\times0.1$

</details>

<details><summary>Step 7: Calculate</summary>

$= 1000$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**1000 kJ** — This is the reason for the 10% rule.

</details>

<details><summary>Hints</summary>

- Subtract the losses.

</details>

---

## CL-MICRO: Microscope magnification

<!-- meta {"type":"calc_type","id":"CL-MICRO","chapter_id":"SC10-06","discipline":"BIO","levels":4} -->

*Structure and functions of plant and animal cells*

**Formula:**

$$M = M_e\times M_o;\ M = \frac{\text{image size}}{\text{actual size}}$$

| Symbol | Quantity | Unit |
|---|---|---|
| M | magnification | times |

- **When to use:** Cell sizes.
- **Unit conversions:** mm ↔ µm (× 1000).
- **Rearranged forms:** $\text{actual} = \frac{\text{image}}{M}$
- **Common mistakes:** Not matching the units.

### CL-MICRO-1 · Basic

<!-- meta {"type":"worked_example","id":"CL-MICRO-1","level":"Basic","answer":400,"unit":"times","verified":true,"hints":["Multiply the two."]} -->

**Question:** Eyepiece ×10, objective ×40. Total magnification?

<details><summary>Step 1: Read the question</summary>

Eyepiece ×10, objective ×40. Total magnification?

</details>

<details><summary>Step 2: List the data</summary>

M_e = 10; M_o = 40

</details>

<details><summary>Step 3: Find</summary>

M

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$M = M_e\times M_o$

</details>

<details><summary>Step 6: Substitute</summary>

$10\times40$

</details>

<details><summary>Step 7: Calculate</summary>

$M = 400$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**400 times**

</details>

<details><summary>Hints</summary>

- Multiply the two.

</details>

### CL-MICRO-2 · Intermediate

<!-- meta {"type":"worked_example","id":"CL-MICRO-2","level":"Intermediate","answer":20.0,"unit":"µm","verified":true,"hints":["mm → µm (× 1000)."]} -->

**Question:** At ×400 the image of a cell is 8 mm long. Actual length (µm)?

<details><summary>Step 1: Read the question</summary>

At ×400 the image of a cell is 8 mm long. Actual length (µm)?

</details>

<details><summary>Step 2: List the data</summary>

image = 8 mm; M = 400

</details>

<details><summary>Step 3: Find</summary>

actual length

</details>

<details><summary>Step 4: Convert units</summary>

$1\ \text{mm} = 1000\ \mu\text{m}$

</details>

<details><summary>Step 5: Choose the formula</summary>

$\text{actual} = \frac{\text{image}}{M}$

</details>

<details><summary>Step 6: Substitute</summary>

$\frac{8}{400}\ \text{mm}$

</details>

<details><summary>Step 7: Calculate</summary>

$= 0.02\ \text{mm} = 20\ \mu\text{m}$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**20 µm**

</details>

<details><summary>Hints</summary>

- mm → µm (× 1000).

</details>

### CL-MICRO-3 · Exam level

<!-- meta {"type":"worked_example","id":"CL-MICRO-3","level":"Exam level","answer":400.0,"unit":"times","verified":true,"hints":["Same unit."]} -->

**Question:** A cell 30 mm long in a diagram is actually 0.075 mm. Magnification of the diagram?

<details><summary>Step 1: Read the question</summary>

A cell 30 mm long in a diagram is actually 0.075 mm. Magnification of the diagram?

</details>

<details><summary>Step 2: List the data</summary>

image = 30 mm; actual = 0.075 mm

</details>

<details><summary>Step 3: Find</summary>

M

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$M = \frac{\text{image}}{\text{actual}}$

</details>

<details><summary>Step 6: Substitute</summary>

$\frac{30}{0.075}$

</details>

<details><summary>Step 7: Calculate</summary>

$M = 400$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**400 times**

</details>

<details><summary>Hints</summary>

- Same unit.

</details>

### CL-MICRO-4 · Challenge

<!-- meta {"type":"worked_example","id":"CL-MICRO-4","level":"Challenge","answer":400.0,"unit":"µm","verified":true,"hints":["Divide the diameter by the number of cells."]} -->

**Question:** At ×100 the field of view has a diameter of 2 mm; 5 cells fill it across. Actual length of one cell (µm)? (the field diameter is given as the actual size)

<details><summary>Step 1: Read the question</summary>

At ×100 the field of view has a diameter of 2 mm; 5 cells fill it across. Actual length of one cell (µm)? (the field diameter is given as the actual size)

</details>

<details><summary>Step 2: List the data</summary>

field = 2 mm; cells = 5

</details>

<details><summary>Step 3: Find</summary>

length

</details>

<details><summary>Step 4: Convert units</summary>

Not needed (units are already SI / consistent).

</details>

<details><summary>Step 5: Choose the formula</summary>

$\text{length} = \frac{\text{field diameter}}{n}$

</details>

<details><summary>Step 6: Substitute</summary>

$\frac{2}{5}\ \text{mm}$

</details>

<details><summary>Step 7: Calculate</summary>

$= 0.4\ \text{mm} = 400\ \mu\text{m}$

</details>

<details><summary>Step 8: Answer, unit, explanation</summary>

**400 µm**

</details>

<details><summary>Hints</summary>

- Divide the diameter by the number of cells.

</details>
---

## Limitations

- 22 calculation types, 88 worked examples.
- Revealing steps one by one, student answer input and automatic checking must be built on the website; the meta JSON contains the answer and unit.
- The lens formula is for checking only; at O/L the ray diagram is the main method. Teachers should confirm the sign convention (Cartesian / magnitude) with the textbook.
