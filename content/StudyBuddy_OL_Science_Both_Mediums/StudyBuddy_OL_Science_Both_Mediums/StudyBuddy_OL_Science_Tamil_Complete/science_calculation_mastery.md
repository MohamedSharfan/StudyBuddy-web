# StudyBuddy — விஞ்ஞானக் கணிப்புத் தேர்ச்சி

> ஒவ்வொரு கணிப்பு வகைக்கும் நான்கு மட்டங்கள் (அடிப்படை, இடைநிலை, பரீட்சைத் தரம், சவால்). ஒவ்வொரு தீர்வும் 8 படிகள்; ஒவ்வொரு படியும் `<details>` இல் — ஒவ்வொன்றாக விரித்துப் பார்க்கலாம். எல்லா விடைகளும் Python இல் கணிக்கப்பட்டு, மூலச் சூத்திரத்தில் மீளப் பிரதியிட்டுச் சரிபார்க்கப்பட்டன. g = 10 m s⁻².

## எட்டுப் படி முறை

1. வினாவை வாசித்தல்
2. தரவுகளைப் பட்டியலிடல்
3. காண வேண்டியது
4. அலகு மாற்றம்
5. சூத்திரத் தெரிவு
6. பிரதியீடு
7. கணிப்பு
8. விடை, அலகு, விளக்கம்

## உள்ளடக்கம்

- CL-SPEED — சராசரிக் கதி (Average speed) (SC10-02, பௌதிகவியல்)
- CL-ACCEL — ஆர்முடுகல் (Acceleration) (SC10-02, பௌதிகவியல்)
- CL-FMA — நியூற்றனின் இரண்டாம் விதி (SC10-04, பௌதிகவியல்)
- CL-WMOM — நிறையும் உந்தமும் (SC10-04, பௌதிகவியல்)
- CL-RESULT — விளையுள் விசை (SC10-09, பௌதிகவியல்)
- CL-MOMENT — விசையின் திருப்பம் (SC10-11, பௌதிகவியல்)
- CL-PRESS — அமுக்கம், திரவ அமுக்கம், பஸ்கால் (SC10-15, பௌதிகவியல்)
- CL-WORK — வேலை, சக்தி, வலு, வினைத்திறன் (SC10-18, பௌதிகவியல்)
- CL-OHM — ஓமின் விதியும் தடைச் சேர்க்கைகளும் (SC10-19, பௌதிகவியல்)
- CL-EPOWER — மின்வலு, சக்தி, கட்டணம் (SC11-10, பௌதிகவியல்)
- CL-HEAT — தன்வெப்பக் கொள்ளளவும் மறைவெப்பமும் (SC11-09, பௌதிகவியல்)
- CL-WAVE — அலைச் சமன்பாடு (SC11-04, பௌதிகவியல்)
- CL-OPTICS — முறிவுச் சுட்டியும் வில்லைகளும் (SC11-05, பௌதிகவியல்)
- CL-TRANS — நிலைமாற்றி (SC11-13, பௌதிகவியல்)
- CL-TEMP — வெப்பநிலை அளவுத்திட்ட மாற்றம் (SC11-09, பௌதிகவியல்)
- CL-MOLE — மூல், மூலர்த் திணிவு, துணிக்கைகள் (SC10-07, இரசாயனவியல்)
- CL-CONC — கரைசற் செறிவு, அடர்த்தி (SC11-03, இரசாயனவியல்)
- CL-ENTH — தாக்க வெப்பம் (SC11-08, இரசாயனவியல்)
- CL-RATE — சராசரித் தாக்கவீதம் (SC10-17, இரசாயனவியல்)
- CL-GENE — மென்டல் விகிதங்கள் (SC10-20, உயிரியல்)
- CL-ECO — உணவுச் சங்கிலியில் சக்திக் கடத்தல் (SC10-13, உயிரியல்)
- CL-MICRO — நுணுக்குக்காட்டி உருப்பெருக்கம் (SC10-06, உயிரியல்)

---

## CL-SPEED: சராசரிக் கதி (Average speed)

<!-- meta {"type":"calc_type","id":"CL-SPEED","chapter_id":"SC10-02","discipline":"PHY","levels":4} -->

*நேர்கோட்டு இயக்கம் (Motion in a straight line)*

**சூத்திரம்:**

$$v = \frac{s}{t}$$

| குறியீடு | கணியம் | அலகு |
|---|---|---|
| v | கதி | m s⁻¹ |
| s | தூரம் | m |
| t | நேரம் | s |

- **எப்போது பயன்படும்:** தூரமும் நேரமும் தரப்படும்போது.
- **அலகு மாற்றங்கள்:** km → m (× 1000); min → s (× 60); km h⁻¹ → m s⁻¹ (÷ 3.6).
- **மாற்றியமைத்த வடிவங்கள்:** $s = vt,\quad t = \frac{s}{v}$
- **பொதுத் தவறுகள்:** அலகுகளை மாற்றாமை; கதிகளின் சராசரியை எடுத்தல்.

### CL-SPEED-1 · அடிப்படை

<!-- meta {"type":"worked_example","id":"CL-SPEED-1","level":"அடிப்படை","answer":8.0,"unit":"m s⁻¹","verified":true,"hints":["தூரத்தை நேரத்தால் வகுக்க.","அலகு m s⁻¹."]} -->

**வினா:** ஒரு சைக்கிளோட்டி 120 m தூரத்தை 15 s இல் கடக்கிறார். சராசரிக் கதியைக் காண்க.

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

ஒரு சைக்கிளோட்டி 120 m தூரத்தை 15 s இல் கடக்கிறார். சராசரிக் கதியைக் காண்க.

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

s = 120 m; t = 15 s

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

v

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$v = \frac{s}{t}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$v = \frac{120}{15}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$v = 8$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**8 m s⁻¹** — ஒவ்வொரு செக்கனிலும் 8 m கடக்கிறார்.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- தூரத்தை நேரத்தால் வகுக்க.
- அலகு m s⁻¹.

</details>

### CL-SPEED-2 · இடைநிலை

<!-- meta {"type":"worked_example","id":"CL-SPEED-2","level":"இடைநிலை","answer":10.0,"unit":"m s⁻¹","verified":true,"hints":["முதலில் km ஐ m ஆகவும் min ஐ s ஆகவும் மாற்றுக.","1 km = 1000 m; 1 min = 60 s."]} -->

**வினா:** ஒரு பேருந்து 9 km தூரத்தை 15 நிமிடத்தில் செல்கிறது. சராசரிக் கதியை m s⁻¹ இல் காண்க.

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

ஒரு பேருந்து 9 km தூரத்தை 15 நிமிடத்தில் செல்கிறது. சராசரிக் கதியை m s⁻¹ இல் காண்க.

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

s = 9 km; t = 15 min

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

v

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

$s = 9\ \text{km} = 9000\ \text{m}$ ; $t = 15\ \text{min} = 900\ \text{s}$

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$v = \frac{s}{t}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$v = \frac{9000}{900}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$v = 10$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**10 m s⁻¹** — km h⁻¹ இல் இது 36 km h⁻¹.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- முதலில் km ஐ m ஆகவும் min ஐ s ஆகவும் மாற்றுக.
- 1 km = 1000 m; 1 min = 60 s.

</details>

### CL-SPEED-3 · பரீட்சைத் தரம்

<!-- meta {"type":"worked_example","id":"CL-SPEED-3","level":"பரீட்சைத் தரம்","answer":1000,"unit":"m","verified":true,"hints":["v = s/t ஐ s க்கு மாற்றுக.","s = vt."]} -->

**வினா:** ஒரு கார் 25 m s⁻¹ சீரான கதியில் 40 s செல்கிறது. கடந்த தூரம்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

ஒரு கார் 25 m s⁻¹ சீரான கதியில் 40 s செல்கிறது. கடந்த தூரம்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

v = 25 m s⁻¹; t = 40 s

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

s

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$s = v \times t$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$s = 25 \times 40$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$s = 1000$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**1000 m**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- v = s/t ஐ s க்கு மாற்றுக.
- s = vt.

</details>

### CL-SPEED-4 · சவால்

<!-- meta {"type":"worked_example","id":"CL-SPEED-4","level":"சவால்","answer":5.0,"unit":"m s⁻¹","verified":true,"hints":["மொத்தத் தூரமும் மொத்த நேரமும் தேவை.","கதிகளின் சராசரியை எடுக்க வேண்டாம்."]} -->

**வினா:** ஒருவர் 600 m ஐ 100 s இலும், பின் 900 m ஐ 200 s இலும் ஓடுகிறார். முழுப் பயணத்தின் சராசரிக் கதி?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

ஒருவர் 600 m ஐ 100 s இலும், பின் 900 m ஐ 200 s இலும் ஓடுகிறார். முழுப் பயணத்தின் சராசரிக் கதி?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

s₁ = 600 m; t₁ = 100 s; s₂ = 900 m; t₂ = 200 s

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

சராசரிக் கதி

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$v_{avg} = \frac{\text{மொத்தத் தூரம்}}{\text{மொத்த நேரம்}}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$v = \frac{600+900}{100+200}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$v = \frac{1500}{300} = 5$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**5 m s⁻¹** — இரு கதிகளின் சராசரி (6 + 4.5)/2 = 5.25 அல்ல!

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- மொத்தத் தூரமும் மொத்த நேரமும் தேவை.
- கதிகளின் சராசரியை எடுக்க வேண்டாம்.

</details>

---

## CL-ACCEL: ஆர்முடுகல் (Acceleration)

<!-- meta {"type":"calc_type","id":"CL-ACCEL","chapter_id":"SC10-02","discipline":"PHY","levels":4} -->

*நேர்கோட்டு இயக்கம் (Motion in a straight line)*

**சூத்திரம்:**

$$a = \frac{v-u}{t}$$

| குறியீடு | கணியம் | அலகு |
|---|---|---|
| a | ஆர்முடுகல் | m s⁻² |
| v | இறுதி வேகம் | m s⁻¹ |
| u | ஆரம்ப வேகம் | m s⁻¹ |
| t | நேரம் | s |

- **எப்போது பயன்படும்:** வேக மாற்றமும் நேரமும் தெரிந்தால்.
- **அலகு மாற்றங்கள்:** km h⁻¹ ÷ 3.6 = m s⁻¹.
- **மாற்றியமைத்த வடிவங்கள்:** $v = u + at,\ t = \frac{v-u}{a}$
- **பொதுத் தவறுகள்:** u, v ஐ மாற்றி எழுதுதல்; அமர்முடுகலில் மறைக் குறியை விடுதல்.

### CL-ACCEL-1 · அடிப்படை

<!-- meta {"type":"worked_example","id":"CL-ACCEL-1","level":"அடிப்படை","answer":3.0,"unit":"m s⁻²","verified":true,"hints":["ஓய்விலிருந்து → u = 0.","வேக மாற்றம் ÷ நேரம்."]} -->

**வினா:** ஓய்விலிருந்து தொடங்கிய கார் 6 s இல் 18 m s⁻¹ வேகத்தை அடைகிறது. ஆர்முடுகல்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

ஓய்விலிருந்து தொடங்கிய கார் 6 s இல் 18 m s⁻¹ வேகத்தை அடைகிறது. ஆர்முடுகல்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

u = 0 m s⁻¹; v = 18 m s⁻¹; t = 6 s

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

a

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$a = \frac{v-u}{t}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$a = \frac{18-0}{6}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$a = 3$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**3 m s⁻²** — ஒவ்வொரு செக்கனிலும் வேகம் 3 m s⁻¹ கூடுகிறது.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- ஓய்விலிருந்து → u = 0.
- வேக மாற்றம் ÷ நேரம்.

</details>

### CL-ACCEL-2 · இடைநிலை

<!-- meta {"type":"worked_example","id":"CL-ACCEL-2","level":"இடைநிலை","answer":-3.0,"unit":"m s⁻²","verified":true,"hints":["km h⁻¹ ஐ m s⁻¹ ஆக்க 3.6 ஆல் வகுக்க.","இறுதி வேகம் 0."]} -->

**வினா:** 54 km h⁻¹ இல் செல்லும் மோட்டார் சைக்கிள் 5 s இல் நிறுத்தப்படுகிறது. ஆர்முடுகல்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

54 km h⁻¹ இல் செல்லும் மோட்டார் சைக்கிள் 5 s இல் நிறுத்தப்படுகிறது. ஆர்முடுகல்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

u = 54 km h⁻¹; v = 0 m s⁻¹; t = 5 s

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

a

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

$u = 54 \div 3.6 = 15\ \text{m s}^{-1}$

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$a = \frac{v-u}{t}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$a = \frac{0-15}{5}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$a = -3$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**-3 m s⁻²** — மறைக் குறி — அமர்முடுகல் (வேகம் குறைகிறது).

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- km h⁻¹ ஐ m s⁻¹ ஆக்க 3.6 ஆல் வகுக்க.
- இறுதி வேகம் 0.

</details>

### CL-ACCEL-3 · பரீட்சைத் தரம்

<!-- meta {"type":"worked_example","id":"CL-ACCEL-3","level":"பரீட்சைத் தரம்","answer":24.0,"unit":"m s⁻¹","verified":true,"hints":["a = (v − u)/t ஐ v க்கு மாற்றுக.","v = u + at."]} -->

**வினா:** 4 m s⁻¹ இல் செல்லும் பொருள் 2.5 m s⁻² இல் 8 s ஆர்முடுகுகிறது. இறுதி வேகம்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

4 m s⁻¹ இல் செல்லும் பொருள் 2.5 m s⁻² இல் 8 s ஆர்முடுகுகிறது. இறுதி வேகம்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

u = 4 m s⁻¹; a = 2.5 m s⁻²; t = 8 s

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

v

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$v = u + at$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$v = 4 + 2.5\times8$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$v = 4 + 20 = 24$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**24 m s⁻¹**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- a = (v − u)/t ஐ v க்கு மாற்றுக.
- v = u + at.

</details>

### CL-ACCEL-4 · சவால்

<!-- meta {"type":"worked_example","id":"CL-ACCEL-4","level":"சவால்","answer":160.0,"unit":"m","verified":true,"hints":["வரைபின் கீழுள்ள வடிவம் சரிவகம்.","படித்திறன் = ஆர்முடுகல்."]} -->

**வினா:** வேக–நேர வரைபில் 0–8 s இல் வேகம் 10 இலிருந்து 30 m s⁻¹ ஆகச் சீராகக் கூடுகிறது. ஆர்முடுகலும் இடப்பெயர்ச்சியும்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

வேக–நேர வரைபில் 0–8 s இல் வேகம் 10 இலிருந்து 30 m s⁻¹ ஆகச் சீராகக் கூடுகிறது. ஆர்முடுகலும் இடப்பெயர்ச்சியும்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

u = 10 m s⁻¹; v = 30 m s⁻¹; t = 8 s

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

a, s

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$a = \frac{v-u}{t},\quad s = \text{சரிவகப் பரப்பு} = \frac{(u+v)}{2}t$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$a = \frac{30-10}{8},\ s = \frac{10+30}{2}\times8$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$a = 2.5\ \text{m s}^{-2}$ → $s = 160\ \text{m}$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**160 m** — பரப்பு = இடப்பெயர்ச்சி; படித்திறன் = ஆர்முடுகல்.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- வரைபின் கீழுள்ள வடிவம் சரிவகம்.
- படித்திறன் = ஆர்முடுகல்.

</details>

---

## CL-FMA: நியூற்றனின் இரண்டாம் விதி

<!-- meta {"type":"calc_type","id":"CL-FMA","chapter_id":"SC10-04","discipline":"PHY","levels":4} -->

*நியூற்றனின் இயக்க விதிகள் (Newton's laws of motion)*

**சூத்திரம்:**

$$F = ma$$

| குறியீடு | கணியம் | அலகு |
|---|---|---|
| F | விளையுள் விசை | N |
| m | திணிவு | kg |
| a | ஆர்முடுகல் | m s⁻² |

- **எப்போது பயன்படும்:** விசை, திணிவு, ஆர்முடுகல் தொடர்பு.
- **அலகு மாற்றங்கள்:** g → kg (÷ 1000).
- **மாற்றியமைத்த வடிவங்கள்:** $a = \frac{F}{m},\ m = \frac{F}{a}$
- **பொதுத் தவறுகள்:** விளையுள் விசைக்குப் பதிலாகப் பிரயோக விசை; g ஐ kg ஆக்காமை.

### CL-FMA-1 · அடிப்படை

<!-- meta {"type":"worked_example","id":"CL-FMA-1","level":"அடிப்படை","answer":2400,"unit":"N","verified":true,"hints":["F = ma.","அலகு N."]} -->

**வினா:** 1200 kg கார் 2 m s⁻² இல் ஆர்முடுக தேவையான விளையுள் விசை?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

1200 kg கார் 2 m s⁻² இல் ஆர்முடுக தேவையான விளையுள் விசை?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

m = 1200 kg; a = 2 m s⁻²

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

F

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$F = ma$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$F = 1200\times2$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$F = 2400$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**2400 N**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- F = ma.
- அலகு N.

</details>

### CL-FMA-2 · இடைநிலை

<!-- meta {"type":"worked_example","id":"CL-FMA-2","level":"இடைநிலை","answer":8.0,"unit":"m s⁻²","verified":true,"hints":["g ஐ kg ஆக்குக (÷ 1000).","a = F/m."]} -->

**வினா:** 500 g பந்தில் 4 N விளையுள் விசை தாக்குகிறது. ஆர்முடுகல்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

500 g பந்தில் 4 N விளையுள் விசை தாக்குகிறது. ஆர்முடுகல்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

m = 500 g; F = 4 N

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

a

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

$m = 500\ \text{g} = 0.5\ \text{kg}$

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$a = \frac{F}{m}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$a = \frac{4}{0.5}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$a = 8$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**8 m s⁻²**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- g ஐ kg ஆக்குக (÷ 1000).
- a = F/m.

</details>

### CL-FMA-3 · பரீட்சைத் தரம்

<!-- meta {"type":"worked_example","id":"CL-FMA-3","level":"பரீட்சைத் தரம்","answer":4.0,"unit":"m s⁻²","verified":true,"hints":["முதலில் விளையுள் விசை.","உராய்வு எதிர்த் திசை."]} -->

**வினா:** 50 kg பெட்டியை 300 N விசையால் இழுக்கிறார்கள்; உராய்வு 100 N. ஆர்முடுகல்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

50 kg பெட்டியை 300 N விசையால் இழுக்கிறார்கள்; உராய்வு 100 N. ஆர்முடுகல்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

m = 50 kg; F = 300 N; உராய்வு = 100 N

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

a

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$F_{net} = F - f,\quad a = \frac{F_{net}}{m}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$F_{net} = 300-100 = 200\ \text{N};\ a = \frac{200}{50}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$a = 4$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**4 m s⁻²** — விளையுள் விசையையே பயன்படுத்த வேண்டும்.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- முதலில் விளையுள் விசை.
- உராய்வு எதிர்த் திசை.

</details>

### CL-FMA-4 · சவால்

<!-- meta {"type":"worked_example","id":"CL-FMA-4","level":"சவால்","answer":1600.0,"unit":"N","verified":true,"hints":["முதலில் a ஐக் காண்க.","பின் F = ma."]} -->

**வினா:** 800 kg வாகனம் 10 s இல் 5 இலிருந்து 25 m s⁻¹ க்கு வேகம் கூடுகிறது. சராசரி விளையுள் விசை?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

800 kg வாகனம் 10 s இல் 5 இலிருந்து 25 m s⁻¹ க்கு வேகம் கூடுகிறது. சராசரி விளையுள் விசை?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

m = 800 kg; u = 5 m s⁻¹; v = 25 m s⁻¹; t = 10 s

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

F

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$a = \frac{v-u}{t},\ F = ma$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$a = \frac{25-5}{10} = 2;\ F = 800\times2$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$F = 1600$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**1600 N** — இரு படிகள்: ஆர்முடுகல், பின் விசை.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- முதலில் a ஐக் காண்க.
- பின் F = ma.

</details>

---

## CL-WMOM: நிறையும் உந்தமும்

<!-- meta {"type":"calc_type","id":"CL-WMOM","chapter_id":"SC10-04","discipline":"PHY","levels":4} -->

*நியூற்றனின் இயக்க விதிகள் (Newton's laws of motion)*

**சூத்திரம்:**

$$W = mg,\quad p = mv$$

| குறியீடு | கணியம் | அலகு |
|---|---|---|
| W | நிறை | N |
| m | திணிவு | kg |
| g | ஈர்ப்பு ஆர்முடுகல் | m s⁻² |
| p | உந்தம் | kg m s⁻¹ |

- **எப்போது பயன்படும்:** நிறை–திணிவு மாற்றம்; உந்தக் கணிப்பு.
- **அலகு மாற்றங்கள்:** g → kg.
- **மாற்றியமைத்த வடிவங்கள்:** $m = \frac{W}{g},\ v = \frac{p}{m}$
- **பொதுத் தவறுகள்:** நிறையையும் திணிவையும் குழப்புதல்.

### CL-WMOM-1 · அடிப்படை

<!-- meta {"type":"worked_example","id":"CL-WMOM-1","level":"அடிப்படை","answer":450,"unit":"N","verified":true,"hints":["W = mg.","g = 10."]} -->

**வினா:** 45 kg மாணவனின் நிறை? (g = 10 m s⁻²)

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

45 kg மாணவனின் நிறை? (g = 10 m s⁻²)

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

m = 45 kg; g = 10 m s⁻²

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

W

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$W = mg$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$W = 45\times10$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$W = 450$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**450 N** — நிறை ஒரு விசை (N); திணிவு kg.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- W = mg.
- g = 10.

</details>

### CL-WMOM-2 · இடைநிலை

<!-- meta {"type":"worked_example","id":"CL-WMOM-2","level":"இடைநிலை","answer":6.0,"unit":"kg m s⁻¹","verified":true,"hints":["p = mv.","அலகு kg m s⁻¹."]} -->

**வினா:** 0.15 kg கிரிக்கெற் பந்து 40 m s⁻¹ இல் செல்கிறது. உந்தம்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

0.15 kg கிரிக்கெற் பந்து 40 m s⁻¹ இல் செல்கிறது. உந்தம்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

m = 0.15 kg; v = 40 m s⁻¹

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

p

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$p = mv$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$p = 0.15\times40$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$p = 6$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**6 kg m s⁻¹**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- p = mv.
- அலகு kg m s⁻¹.

</details>

### CL-WMOM-3 · பரீட்சைத் தரம்

<!-- meta {"type":"worked_example","id":"CL-WMOM-3","level":"பரீட்சைத் தரம்","answer":96.0,"unit":"N","verified":true,"hints":["முதலில் திணிவைக் காண்க.","திணிவு இடத்தைச் சாராது."]} -->

**வினா:** புவியில் 600 N நிறையுடைய வீரர் சந்திரனுக்குச் செல்கிறார் (g = 1.6 m s⁻²). அவரது திணிவும் சந்திர நிறையும்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

புவியில் 600 N நிறையுடைய வீரர் சந்திரனுக்குச் செல்கிறார் (g = 1.6 m s⁻²). அவரது திணிவும் சந்திர நிறையும்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

W = 600 N; g(சந்திரன்) = 1.6 m s⁻²

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

m, W_moon

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$m = \frac{W}{g},\ W_{moon} = m\,g_{moon}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$m = \frac{600}{10} = 60;\ W = 60\times1.6$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$m = 60\ \text{kg}$ → $W_{moon} = 96\ \text{N}$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**96 N** — திணிவு மாறாது; நிறை மட்டும் குறையும்.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- முதலில் திணிவைக் காண்க.
- திணிவு இடத்தைச் சாராது.

</details>

### CL-WMOM-4 · சவால்

<!-- meta {"type":"worked_example","id":"CL-WMOM-4","level":"சவால்","answer":2.0,"unit":"m s⁻¹","verified":true,"hints":["மோதலுக்கு முன்னும் பின்னும் மொத்த உந்தம் சமம்.","இணைந்த திணிவு = m₁ + m₂."]} -->

**வினா:** 2 kg தள்ளுவண்டி 3 m s⁻¹ இல் வந்து ஓய்விலுள்ள 1 kg வண்டியுடன் இணைந்து ஒன்றாக நகர்கிறது. பொது வேகம்? (உந்தக் காப்பு)

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

2 kg தள்ளுவண்டி 3 m s⁻¹ இல் வந்து ஓய்விலுள்ள 1 kg வண்டியுடன் இணைந்து ஒன்றாக நகர்கிறது. பொது வேகம்? (உந்தக் காப்பு)

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

m₁ = 2 kg; u₁ = 3 m s⁻¹; m₂ = 1 kg

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

v

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$m_1u_1 + m_2u_2 = (m_1+m_2)v$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$2\times3 + 1\times0 = 3\,v$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$v = \frac{6}{3} = 2$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**2 m s⁻¹** — மொத்த உந்தம் மாறாது.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- மோதலுக்கு முன்னும் பின்னும் மொத்த உந்தம் சமம்.
- இணைந்த திணிவு = m₁ + m₂.

</details>

---

## CL-RESULT: விளையுள் விசை

<!-- meta {"type":"calc_type","id":"CL-RESULT","chapter_id":"SC10-09","discipline":"PHY","levels":4} -->

*விளையுள் விசை (Resultant force)*

**சூத்திரம்:**

$$R = F_1 \pm F_2;\ R = \sqrt{F_1^2+F_2^2}$$

| குறியீடு | கணியம் | அலகு |
|---|---|---|
| R | விளையுள் | N |
| F | விசைகள் | N |

- **எப்போது பயன்படும்:** ஒரே கோடு அல்லது செங்குத்து விசைகள்.
- **அலகு மாற்றங்கள்:** —
- **மாற்றியமைத்த வடிவங்கள்:** $F_2 = \sqrt{R^2 - F_1^2}$
- **பொதுத் தவறுகள்:** திசையைக் கருதாமல் கூட்டுதல்.

### CL-RESULT-1 · அடிப்படை

<!-- meta {"type":"worked_example","id":"CL-RESULT-1","level":"அடிப்படை","answer":7,"unit":"N","verified":true,"hints":["எதிர்த் திசை — கழிக்க.","திசையைக் கூறுக."]} -->

**வினா:** ஒரு பொருளில் 12 N கிழக்கும் 5 N மேற்கும் தாக்குகின்றன. விளையுள்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

ஒரு பொருளில் 12 N கிழக்கும் 5 N மேற்கும் தாக்குகின்றன. விளையுள்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

F₁ = 12 N; F₂ = 5 N

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

R

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$R = F_1 - F_2$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$R = 12-5$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$R = 7\ \text{N (கிழக்கு)}$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**7 N** — பெரிய விசையின் திசை.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- எதிர்த் திசை — கழிக்க.
- திசையைக் கூறுக.

</details>

### CL-RESULT-2 · இடைநிலை

<!-- meta {"type":"worked_example","id":"CL-RESULT-2","level":"இடைநிலை","answer":15.0,"unit":"N","verified":true,"hints":["பைதகரசு.","√(81 + 144)."]} -->

**வினா:** 9 N உம் 12 N உம் செங்குத்தாகத் தாக்குகின்றன. விளையுள்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

9 N உம் 12 N உம் செங்குத்தாகத் தாக்குகின்றன. விளையுள்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

F₁ = 9 N; F₂ = 12 N

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

R

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$R = \sqrt{F_1^2+F_2^2}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$R = \sqrt{9^2+12^2} = \sqrt{225}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$R = 15$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**15 N**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- பைதகரசு.
- √(81 + 144).

</details>

### CL-RESULT-3 · பரீட்சைத் தரம்

<!-- meta {"type":"worked_example","id":"CL-RESULT-3","level":"பரீட்சைத் தரம்","answer":3.0,"unit":"m s⁻²","verified":true,"hints":["விளையுள் முதலில்.","F = ma."]} -->

**வினா:** 4 kg பொருளில் 20 N வலதும் 8 N இடதும். ஆர்முடுகல்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

4 kg பொருளில் 20 N வலதும் 8 N இடதும். ஆர்முடுகல்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

m = 4 kg; F₁ = 20 N; F₂ = 8 N

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

a

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$a = \frac{F_1-F_2}{m}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$a = \frac{20-8}{4}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$a = 3$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**3 m s⁻²** — வலது திசையில்.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- விளையுள் முதலில்.
- F = ma.

</details>

### CL-RESULT-4 · சவால்

<!-- meta {"type":"worked_example","id":"CL-RESULT-4","level":"சவால்","answer":50.0,"unit":"N","verified":true,"hints":["3–4–5 மும்மை.","கோணத்துக்கு tan."]} -->

**வினா:** படகு 30 N விசையால் கிழக்கேயும் காற்று 40 N விசையால் வடக்கேயும் தள்ளுகின்றன. விளையுளின் பருமனும் கிழக்கிலிருந்தான கோணமும்? (tan 53.1° ≈ 1.333)

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

படகு 30 N விசையால் கிழக்கேயும் காற்று 40 N விசையால் வடக்கேயும் தள்ளுகின்றன. விளையுளின் பருமனும் கிழக்கிலிருந்தான கோணமும்? (tan 53.1° ≈ 1.333)

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

F₁ = 30 N; F₂ = 40 N

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

R, θ

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$R = \sqrt{F_1^2+F_2^2},\ \tan\theta = \frac{F_2}{F_1}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$R = \sqrt{30^2+40^2};\ \tan\theta = \frac{40}{30}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$R = 50\ \text{N}$ → $\theta \approx 53.1^\circ$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**50 N** — அளவிடைப் படத்தாலும் சரிபார்க்கலாம் (இணைகர விதி).

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- 3–4–5 மும்மை.
- கோணத்துக்கு tan.

</details>

---

## CL-MOMENT: விசையின் திருப்பம்

<!-- meta {"type":"calc_type","id":"CL-MOMENT","chapter_id":"SC10-11","discipline":"PHY","levels":4} -->

*விசையின் திரும்பல் விளைவு (Turning effect of a force)*

**சூத்திரம்:**

$$M = F \times d$$

| குறியீடு | கணியம் | அலகு |
|---|---|---|
| M | திருப்பம் | N m |
| F | விசை | N |
| d | செங்குத்துத் தூரம் | m |

- **எப்போது பயன்படும்:** சுழற்சி, சமநிலை, நெம்புகோல்.
- **அலகு மாற்றங்கள்:** cm → m (÷ 100).
- **மாற்றியமைத்த வடிவங்கள்:** $F = \frac{M}{d},\ d = \frac{M}{F}$
- **பொதுத் தவறுகள்:** செங்குத்தல்லாத தூரம்; கோலின் சொந்த நிறையை விடுதல்.

### CL-MOMENT-1 · அடிப்படை

<!-- meta {"type":"worked_example","id":"CL-MOMENT-1","level":"அடிப்படை","answer":10.0,"unit":"N m","verified":true,"hints":["M = Fd.","d செங்குத்துத் தூரம்."]} -->

**வினா:** குறடின் முனையில் 25 N விசை சுழல்மையத்திலிருந்து 0.4 m தூரத்தில் செங்குத்தாகத் தாக்குகிறது. திருப்பம்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

குறடின் முனையில் 25 N விசை சுழல்மையத்திலிருந்து 0.4 m தூரத்தில் செங்குத்தாகத் தாக்குகிறது. திருப்பம்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

F = 25 N; d = 0.4 m

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

M

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$M = F\times d$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$M = 25\times0.4$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$M = 10$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**10 N m**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- M = Fd.
- d செங்குத்துத் தூரம்.

</details>

### CL-MOMENT-2 · இடைநிலை

<!-- meta {"type":"worked_example","id":"CL-MOMENT-2","level":"இடைநிலை","answer":18.0,"unit":"N m","verified":true,"hints":["cm → m.","M = Fd."]} -->

**வினா:** கதவின் சுழல்மையத்திலிருந்து 60 cm இல் 30 N செங்குத்து விசை. திருப்பம்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

கதவின் சுழல்மையத்திலிருந்து 60 cm இல் 30 N செங்குத்து விசை. திருப்பம்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

F = 30 N; d = 60 cm

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

M

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

$d = 60\ \text{cm} = 0.6\ \text{m}$

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$M = Fd$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$M = 30\times0.6$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$M = 18$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**18 N m**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- cm → m.
- M = Fd.

</details>

### CL-MOMENT-3 · பரீட்சைத் தரம்

<!-- meta {"type":"worked_example","id":"CL-MOMENT-3","level":"பரீட்சைத் தரம்","answer":1.5,"unit":"m","verified":true,"hints":["திருப்பக் கொள்கை.","வலஞ்சுழி = இடஞ்சுழி."]} -->

**வினா:** சீசோவில் 300 N பிள்ளை மையத்திலிருந்து 2 m இல். 400 N பிள்ளை சமநிலைக்கு எங்கு அமர வேண்டும்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

சீசோவில் 300 N பிள்ளை மையத்திலிருந்து 2 m இல். 400 N பிள்ளை சமநிலைக்கு எங்கு அமர வேண்டும்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

W₁ = 300 N; d₁ = 2 m; W₂ = 400 N

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

d₂

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$W_1d_1 = W_2d_2$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$300\times2 = 400\times d_2$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$d_2 = \frac{600}{400} = 1.5$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**1.5 m** — மறுபக்கத்தில், மையத்துக்கு அருகில்.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- திருப்பக் கொள்கை.
- வலஞ்சுழி = இடஞ்சுழி.

</details>

### CL-MOMENT-4 · சவால்

<!-- meta {"type":"worked_example","id":"CL-MOMENT-4","level":"சவால்","answer":1.0,"unit":"N","verified":true,"hints":["கோலின் நிறை 50 cm இல் தாக்கும்.","ஒவ்வொரு விசையின் தூரத்தையும் சுழல்மையத்திலிருந்து அளக்க."]} -->

**வினா:** 1.0 N நிறையுடைய சீரான மீற்றர் கோல் 40 cm குறியில் சுழல்மையத்தில். 10 cm குறியில் 2.0 N தொங்குகிறது. 90 cm குறியில் தொங்கவிட வேண்டிய நிறை?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

1.0 N நிறையுடைய சீரான மீற்றர் கோல் 40 cm குறியில் சுழல்மையத்தில். 10 cm குறியில் 2.0 N தொங்குகிறது. 90 cm குறியில் தொங்கவிட வேண்டிய நிறை?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

சுழல்மையம் = 40 cm; கோல் நிறை = 1 N (50 cm இல்); W_A = 2 N (10 cm)

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

W_B (90 cm)

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

$\text{தூரங்களை cm இலேயே வைக்கலாம் (இருபுறமும் ஒரே அலகு)}$

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$\sum M_{\text{இடஞ்சுழி}} = \sum M_{\text{வலஞ்சுழி}}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$2.0\times(40-10) = 1.0\times(50-40) + W_B\times(90-40)$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$60 = 10 + 50W_B$ → $W_B = 1$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**1 N** — கோலின் சொந்த நிறையை மறக்கக்கூடாது.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- கோலின் நிறை 50 cm இல் தாக்கும்.
- ஒவ்வொரு விசையின் தூரத்தையும் சுழல்மையத்திலிருந்து அளக்க.

</details>

---

## CL-PRESS: அமுக்கம், திரவ அமுக்கம், பஸ்கால்

<!-- meta {"type":"calc_type","id":"CL-PRESS","chapter_id":"SC10-15","discipline":"PHY","levels":4} -->

*நீர்நிலையியல் அமுக்கமும் அதன் பிரயோகங்களும் (Hydrostatic pressure and its applications)*

**சூத்திரம்:**

$$P = \frac{F}{A};\ P = h\rho g;\ \frac{F_1}{A_1} = \frac{F_2}{A_2}$$

| குறியீடு | கணியம் | அலகு |
|---|---|---|
| P | அமுக்கம் | Pa |
| F | விசை | N |
| A | பரப்பு | m² |
| h | ஆழம் | m |
| ρ | அடர்த்தி | kg m⁻³ |

- **எப்போது பயன்படும்:** திண்ம, திரவ அமுக்கம்; நீரியல் இயந்திரங்கள்.
- **அலகு மாற்றங்கள்:** cm² → m² (÷ 10 000).
- **மாற்றியமைத்த வடிவங்கள்:** $F = PA,\ h = \frac{P}{\rho g}$
- **பொதுத் தவறுகள்:** cm² ஐ m² ஆக்காமை (விகிதமல்லாதபோது); ஆழத்துக்குப் பதிலாக உயரம்.

### CL-PRESS-1 · அடிப்படை

<!-- meta {"type":"worked_example","id":"CL-PRESS-1","level":"அடிப்படை","answer":20000.0,"unit":"Pa","verified":true,"hints":["P = F/A.","அலகு Pa."]} -->

**வினா:** 800 N நிறையுடைய பெட்டி 0.04 m² பரப்பில் நிற்கிறது. அமுக்கம்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

800 N நிறையுடைய பெட்டி 0.04 m² பரப்பில் நிற்கிறது. அமுக்கம்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

F = 800 N; A = 0.04 m²

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

P

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$P = \frac{F}{A}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$P = \frac{800}{0.04}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$P = 20000$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**20000 Pa**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- P = F/A.
- அலகு Pa.

</details>

### CL-PRESS-2 · இடைநிலை

<!-- meta {"type":"worked_example","id":"CL-PRESS-2","level":"இடைநிலை","answer":120000,"unit":"Pa","verified":true,"hints":["P = hρg.","நீர் ρ = 1000."]} -->

**வினா:** நீர்த் தொட்டியின் 12 m ஆழத்திலுள்ள திரவ அமுக்கம்? (ρ = 1000 kg m⁻³)

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

நீர்த் தொட்டியின் 12 m ஆழத்திலுள்ள திரவ அமுக்கம்? (ρ = 1000 kg m⁻³)

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

h = 12 m; ρ = 1000 kg m⁻³; g = 10 m s⁻²

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

P

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$P = h\rho g$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$P = 12\times1000\times10$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$P = 120000$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**120000 Pa**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- P = hρg.
- நீர் ρ = 1000.

</details>

### CL-PRESS-3 · பரீட்சைத் தரம்

<!-- meta {"type":"worked_example","id":"CL-PRESS-3","level":"பரீட்சைத் தரம்","answer":6000.0,"unit":"N","verified":true,"hints":["பஸ்காலின் விதி.","அமுக்கம் இருபுறமும் சமம்."]} -->

**வினா:** நீரியல் தூக்கியில் சிறிய முசலம் 5 cm², பெரியது 200 cm². சிறியதில் 150 N பிரயோகித்தால் பெரியதில் விசை?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

நீரியல் தூக்கியில் சிறிய முசலம் 5 cm², பெரியது 200 cm². சிறியதில் 150 N பிரயோகித்தால் பெரியதில் விசை?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

F₁ = 150 N; A₁ = 5 cm²; A₂ = 200 cm²

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

F₂

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

$\text{விகிதம் என்பதால் cm}^2\text{ ஐ மாற்ற வேண்டியதில்லை}$

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$\frac{F_1}{A_1} = \frac{F_2}{A_2}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$\frac{150}{5} = \frac{F_2}{200}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$F_2 = 150\times\frac{200}{5} = 6000$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**6000 N** — விசை 40 மடங்கு பெருகுகிறது (பஸ்கால்).

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- பஸ்காலின் விதி.
- அமுக்கம் இருபுறமும் சமம்.

</details>

### CL-PRESS-4 · சவால்

<!-- meta {"type":"worked_example","id":"CL-PRESS-4","level":"சவால்","answer":800.0,"unit":"kg m⁻³","verified":true,"hints":["P = hρg ஐ ρ க்கு மாற்றுக.","மொத்தம் = வளிமண்டலம் + திரவம்."]} -->

**வினா:** ஒரு திரவத்தின் 3 m ஆழத்தில் திரவ அமுக்கம் 24000 Pa. (i) திரவத்தின் அடர்த்தி? (ii) வளிமண்டல அமுக்கம் 1.0 × 10⁵ Pa எனின் அவ்வாழத்திலுள்ள மொத்த அமுக்கம்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

ஒரு திரவத்தின் 3 m ஆழத்தில் திரவ அமுக்கம் 24000 Pa. (i) திரவத்தின் அடர்த்தி? (ii) வளிமண்டல அமுக்கம் 1.0 × 10⁵ Pa எனின் அவ்வாழத்திலுள்ள மொத்த அமுக்கம்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

P = 24000 Pa; h = 3 m

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

ρ, P_total

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$\rho = \frac{P}{hg};\ P_{total} = P_{atm} + h\rho g$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$\rho = \frac{24000}{3\times10};\ P = 100000 + 24000$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$\rho = 800\ \text{kg m}^{-3}$ → $P_{total} = 124000\ \text{Pa}$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**800 kg m⁻³** — அடர்த்தி நீரைவிடக் குறைவு — எண்ணெய் போன்ற திரவம்.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- P = hρg ஐ ρ க்கு மாற்றுக.
- மொத்தம் = வளிமண்டலம் + திரவம்.

</details>

---

## CL-WORK: வேலை, சக்தி, வலு, வினைத்திறன்

<!-- meta {"type":"calc_type","id":"CL-WORK","chapter_id":"SC10-18","discipline":"PHY","levels":4} -->

*வேலை, சக்தி, வலு (Work, energy and power)*

**சூத்திரம்:**

$$W = Fs;\ E_k = \tfrac12mv^2;\ E_p = mgh;\ P = \frac{W}{t}$$

| குறியீடு | கணியம் | அலகு |
|---|---|---|
| W | வேலை | J |
| E_k | இயக்கசக்தி | J |
| E_p | அழுத்தசக்தி | J |
| P | வலு | W |
| η | வினைத்திறன் | % |

- **எப்போது பயன்படும்:** விசை–இடப்பெயர்ச்சி; உயரம்–வேகம்; நேரத்துடனான சக்தி.
- **அலகு மாற்றங்கள்:** kJ ↔ J; நிமிடம் → s.
- **மாற்றியமைத்த வடிவங்கள்:** $v = \sqrt{\frac{2E_k}{m}},\ h = \frac{E_p}{mg}$
- **பொதுத் தவறுகள்:** v² ஐ மறத்தல்; வினைத்திறனைப் பெருக்குவதா வகுப்பதா எனக் குழப்பம்.

### CL-WORK-1 · அடிப்படை

<!-- meta {"type":"worked_example","id":"CL-WORK-1","level":"அடிப்படை","answer":240,"unit":"J","verified":true,"hints":["W = Fs.","அலகு J."]} -->

**வினா:** 40 N விசை பெட்டியை விசைத் திசையில் 6 m நகர்த்துகிறது. வேலை?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

40 N விசை பெட்டியை விசைத் திசையில் 6 m நகர்த்துகிறது. வேலை?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

F = 40 N; s = 6 m

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

W

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$W = Fs$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$W = 40\times6$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$W = 240$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**240 J**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- W = Fs.
- அலகு J.

</details>

### CL-WORK-2 · இடைநிலை

<!-- meta {"type":"worked_example","id":"CL-WORK-2","level":"இடைநிலை","answer":300.0,"unit":"kJ","verified":true,"hints":["v ஐ வர்க்கிக்க.","1 kJ = 1000 J."]} -->

**வினா:** 1500 kg கார் 20 m s⁻¹ இல் செல்கிறது. இயக்கசக்தி (kJ இல்)?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

1500 kg கார் 20 m s⁻¹ இல் செல்கிறது. இயக்கசக்தி (kJ இல்)?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

m = 1500 kg; v = 20 m s⁻¹

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

E_k

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$E_k = \frac12 mv^2$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$E_k = \frac12\times1500\times20^2$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$E_k = 300000\ \text{J} = 300\ \text{kJ}$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**300 kJ**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- v ஐ வர்க்கிக்க.
- 1 kJ = 1000 J.

</details>

### CL-WORK-3 · பரீட்சைத் தரம்

<!-- meta {"type":"worked_example","id":"CL-WORK-3","level":"பரீட்சைத் தரம்","answer":20.0,"unit":"m s⁻¹","verified":true,"hints":["சக்திக் காப்பு.","m இருபுறமும் நீங்கும்."]} -->

**வினா:** ஒரு கல் 20 m உயரத்திலிருந்து ஓய்விலிருந்து விழுகிறது (வளித் தடை புறக்கணிப்பு). நிலத்தை அடையும் வேகம்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

ஒரு கல் 20 m உயரத்திலிருந்து ஓய்விலிருந்து விழுகிறது (வளித் தடை புறக்கணிப்பு). நிலத்தை அடையும் வேகம்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

h = 20 m; g = 10 m s⁻²

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

v

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$mgh = \frac12 mv^2 \Rightarrow v = \sqrt{2gh}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$v = \sqrt{2\times10\times20}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$v = \sqrt{400} = 20$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**20 m s⁻¹** — திணிவு நீங்குவதால் தேவையில்லை.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- சக்திக் காப்பு.
- m இருபுறமும் நீங்கும்.

</details>

### CL-WORK-4 · சவால்

<!-- meta {"type":"worked_example","id":"CL-WORK-4","level":"சவால்","answer":666.6666666666666,"unit":"W","verified":true,"hints":["பயனுள்ள வேலை = mgh.","உள்ளீடு = வெளியீடு ÷ வினைத்திறன்."]} -->

**வினா:** ஒரு நீர்ப் பம்பி 200 kg நீரை 15 m உயரத்துக்கு 60 s இல் ஏற்றுகிறது. வினைத்திறன் 75% எனின் பம்பியின் உள்ளீட்டு வலு?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

ஒரு நீர்ப் பம்பி 200 kg நீரை 15 m உயரத்துக்கு 60 s இல் ஏற்றுகிறது. வினைத்திறன் 75% எனின் பம்பியின் உள்ளீட்டு வலு?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

m = 200 kg; h = 15 m; t = 60 s; η = 75 %

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

P_in

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$P_{out} = \frac{mgh}{t},\ P_{in} = \frac{P_{out}}{\eta}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$P_{out} = \frac{200\times10\times15}{60} = 500\ \text{W};\ P_{in} = \frac{500}{0.75}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$P_{in} = 666.6667$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**666.667 W** — 25% சக்தி வெப்பம், ஒலியாக வீணாகிறது.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- பயனுள்ள வேலை = mgh.
- உள்ளீடு = வெளியீடு ÷ வினைத்திறன்.

</details>

---

## CL-OHM: ஓமின் விதியும் தடைச் சேர்க்கைகளும்

<!-- meta {"type":"calc_type","id":"CL-OHM","chapter_id":"SC10-19","discipline":"PHY","levels":4} -->

*ஓட்ட மின்னியல் (Current electricity)*

**சூத்திரம்:**

$$V = IR;\ R_s = R_1+R_2;\ \frac1{R_p} = \frac1{R_1}+\frac1{R_2}$$

| குறியீடு | கணியம் | அலகு |
|---|---|---|
| V | அழுத்த வேறுபாடு | V |
| I | மின்னோட்டம் | A |
| R | தடை | Ω |

- **எப்போது பயன்படும்:** சுற்றுக் கணிப்புகள்.
- **அலகு மாற்றங்கள்:** mA → A (÷ 1000); kΩ → Ω (× 1000).
- **மாற்றியமைத்த வடிவங்கள்:** $I = \frac VR,\ R = \frac VI$
- **பொதுத் தவறுகள்:** சமாந்தரத்தில் 1/R ஐ R எனக் கொள்ளல்.

### CL-OHM-1 · அடிப்படை

<!-- meta {"type":"worked_example","id":"CL-OHM-1","level":"அடிப்படை","answer":3.0,"unit":"A","verified":true,"hints":["V = IR.","I = V/R."]} -->

**வினா:** 9 V மின்கலத்துடன் 3 Ω தடை. மின்னோட்டம்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

9 V மின்கலத்துடன் 3 Ω தடை. மின்னோட்டம்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

V = 9 V; R = 3 Ω

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

I

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$I = \frac{V}{R}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$I = \frac{9}{3}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$I = 3$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**3 A**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- V = IR.
- I = V/R.

</details>

### CL-OHM-2 · இடைநிலை

<!-- meta {"type":"worked_example","id":"CL-OHM-2","level":"இடைநிலை","answer":8.0,"unit":"Ω","verified":true,"hints":["முதலில் சமாந்தரப் பகுதி.","பின் தொடராகக் கூட்டுக."]} -->

**வினா:** 6 Ω, 12 Ω சமாந்தரமாக; அச்சேர்க்கையுடன் 4 Ω தொடராக. மொத்தத் தடை?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

6 Ω, 12 Ω சமாந்தரமாக; அச்சேர்க்கையுடன் 4 Ω தொடராக. மொத்தத் தடை?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

R₁ = 4 Ω; R₂ = 6 Ω; R₃ = 12 Ω

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

R

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$\frac1{R_p} = \frac1{R_2}+\frac1{R_3};\ R = R_1 + R_p$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$\frac1{R_p} = \frac1{6}+\frac1{12} = \frac{3}{12}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$R_p = 4\ \Omega$ → $R = 4 + 4 = 8$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**8 Ω**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- முதலில் சமாந்தரப் பகுதி.
- பின் தொடராகக் கூட்டுக.

</details>

### CL-OHM-3 · பரீட்சைத் தரம்

<!-- meta {"type":"worked_example","id":"CL-OHM-3","level":"பரீட்சைத் தரம்","answer":8.0,"unit":"V","verified":true,"hints":["தொடரில் மின்னோட்டம் ஒன்றே.","V = IR ஒவ்வொரு தடைக்கும்."]} -->

**வினா:** 12 V கலத்துடன் 2 Ω, 4 Ω தொடராக. மின்னோட்டமும் 4 Ω இன் அழுத்த வேறுபாடும்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

12 V கலத்துடன் 2 Ω, 4 Ω தொடராக. மின்னோட்டமும் 4 Ω இன் அழுத்த வேறுபாடும்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

V = 12 V; R₁ = 2 Ω; R₂ = 4 Ω

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

I, V₂

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$I = \frac{V}{R_1+R_2};\ V_2 = IR_2$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$I = \frac{12}{2+4};\ V_2 = 2\times4$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$I = 2\ \text{A}$ → $V_2 = 8\ \text{V}$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**8 V** — அழுத்த வேறுபாடுகள் 4 V + 8 V = 12 V.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- தொடரில் மின்னோட்டம் ஒன்றே.
- V = IR ஒவ்வொரு தடைக்கும்.

</details>

### CL-OHM-4 · சவால்

<!-- meta {"type":"worked_example","id":"CL-OHM-4","level":"சவால்","answer":3.0,"unit":"A","verified":true,"hints":["சமாந்தரத்தில் V ஒன்றே.","கிளை மின்னோட்டங்களைக் கூட்டுக."]} -->

**வினா:** 6 V கலத்துடன் 3 Ω உம் 6 Ω உம் சமாந்தரமாக. கலத்திலிருந்து பெறப்படும் மொத்த மின்னோட்டம்? இரு முறைகளில் சரிபார்க்க.

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

6 V கலத்துடன் 3 Ω உம் 6 Ω உம் சமாந்தரமாக. கலத்திலிருந்து பெறப்படும் மொத்த மின்னோட்டம்? இரு முறைகளில் சரிபார்க்க.

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

V = 6 V; R₁ = 3 Ω; R₂ = 6 Ω

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

I

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$I = \frac{V}{R_1} + \frac{V}{R_2}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$I = \frac{6}{3} + \frac{6}{6} = 2 + 1$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$I = 3$ → $\text{மாற்று முறை: } R_p = 2\ \Omega,\ I = 6/2 = 3$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**3 A** — இரு முறைகளும் 3 A.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- சமாந்தரத்தில் V ஒன்றே.
- கிளை மின்னோட்டங்களைக் கூட்டுக.

</details>

---

## CL-EPOWER: மின்வலு, சக்தி, கட்டணம்

<!-- meta {"type":"calc_type","id":"CL-EPOWER","chapter_id":"SC11-10","discipline":"PHY","levels":4} -->

*மின் சாதனங்களின் வலுவும் சக்தியும் (Power and energy of electric appliances)*

**சூத்திரம்:**

$$P = VI;\ E = Pt;\ \text{kWh} = \text{kW}\times\text{h}$$

| குறியீடு | கணியம் | அலகு |
|---|---|---|
| P | வலு | W |
| E | சக்தி | J / kWh |
| t | நேரம் | s / h |

- **எப்போது பயன்படும்:** மின் கட்டணம், உருகித் தெரிவு, சாதன ஒப்பீடு.
- **அலகு மாற்றங்கள்:** W → kW (÷ 1000); min → h (÷ 60); 1 kWh = 3.6 × 10⁶ J.
- **மாற்றியமைத்த வடிவங்கள்:** $I = \frac PV,\ t = \frac EP$
- **பொதுத் தவறுகள்:** kWh கணிப்பில் W ஐப் பயன்படுத்தல்; s/h குழப்பம்.

### CL-EPOWER-1 · அடிப்படை

<!-- meta {"type":"worked_example","id":"CL-EPOWER-1","level":"அடிப்படை","answer":1150,"unit":"W","verified":true,"hints":["P = VI.","அலகு W."]} -->

**வினா:** 230 V இல் 5 A மின்னோட்டம் பெறும் சூடாக்கியின் வலு?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

230 V இல் 5 A மின்னோட்டம் பெறும் சூடாக்கியின் வலு?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

V = 230 V; I = 5 A

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

P

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$P = VI$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$P = 230\times5$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$P = 1150$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**1150 W**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- P = VI.
- அலகு W.

</details>

### CL-EPOWER-2 · இடைநிலை

<!-- meta {"type":"worked_example","id":"CL-EPOWER-2","level":"இடைநிலை","answer":2880.0,"unit":"ரூ.","verified":true,"hints":["W ஐ kW ஆக்குக.","மொத்த மணிநேரம் = 2 × 30."]} -->

**வினா:** 1500 W மின் அழுத்தி (iron) நாளொன்றுக்கு 2 மணிநேரம், 30 நாட்கள். அலகு ஒன்று ரூ. 32 எனின் கட்டணம்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

1500 W மின் அழுத்தி (iron) நாளொன்றுக்கு 2 மணிநேரம், 30 நாட்கள். அலகு ஒன்று ரூ. 32 எனின் கட்டணம்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

P = 1500 W; t = 60 h

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

செலவு

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

$P = 1500\ \text{W} = 1.5\ \text{kW}$

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$E = Pt\ (\text{kWh});\ \text{செலவு} = E\times\text{விலை}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$E = 1.5\times60$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$E = 90\ \text{kWh}$ → $\text{செலவு} = 90\times32 = 2880$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**2880 ரூ.**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- W ஐ kW ஆக்குக.
- மொத்த மணிநேரம் = 2 × 30.

</details>

### CL-EPOWER-3 · பரீட்சைத் தரம்

<!-- meta {"type":"worked_example","id":"CL-EPOWER-3","level":"பரீட்சைத் தரம்","answer":94.89999999999999,"unit":"kWh","verified":true,"hints":["வலு வேறுபாடு × நேரம்.","W → kW."]} -->

**வினா:** 60 W இழைக் குமிழுக்குப் பதிலாக அதே ஒளி தரும் 8 W LED. நாளுக்கு 5 மணிநேரம் எனின் ஒரு வருடத்தில் (365 நாள்) சேமிக்கப்படும் சக்தி?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

60 W இழைக் குமிழுக்குப் பதிலாக அதே ஒளி தரும் 8 W LED. நாளுக்கு 5 மணிநேரம் எனின் ஒரு வருடத்தில் (365 நாள்) சேமிக்கப்படும் சக்தி?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

P₁ = 60 W; P₂ = 8 W; t = 1825 h

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

சேமிப்பு (kWh)

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$\Delta E = (P_1 - P_2)\,t$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$\Delta E = \frac{60-8}{1000}\times1825$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$\Delta E = 94.9$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**94.9 kWh** — LED பயன்பாடு சக்தியையும் பணத்தையும் சேமிக்கும் (2019 வினாத்தாள் II வி7B வகை).

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- வலு வேறுபாடு × நேரம்.
- W → kW.

</details>

### CL-EPOWER-4 · சவால்

<!-- meta {"type":"worked_example","id":"CL-EPOWER-4","level":"சவால்","answer":4.0,"unit":"A","verified":true,"hints":["P = VI ஐ I க்கு மாற்றுக.","உருகி > இயல்பு மின்னோட்டம்."]} -->

**வினா:** 230 V, 920 W கேத்தல். (i) மின்னோட்டம் (ii) தடை (iii) 10 நிமிடத்தில் நுகரும் சக்தி (J) (iv) பொருத்தமான உருகி (3 A, 5 A, 13 A இலிருந்து)?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

230 V, 920 W கேத்தல். (i) மின்னோட்டம் (ii) தடை (iii) 10 நிமிடத்தில் நுகரும் சக்தி (J) (iv) பொருத்தமான உருகி (3 A, 5 A, 13 A இலிருந்து)?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

V = 230 V; P = 920 W; t = 10 min

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

I, R, E, உருகி

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

$t = 10\ \text{min} = 600\ \text{s}$

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$I = \frac PV;\ R = \frac VI;\ E = Pt$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$I = \frac{920}{230};\ R = \frac{230}{4};\ E = 920\times600$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$I = 4\ \text{A}$ → $R = 57.5\ \Omega$ → $E = 552000\ \text{J} = 5.52 \times 10^{5}\ \text{J}$ → $\text{உருகி: 5 A (4 A ஐ விடச் சற்றுக் கூடியது)}$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**4 A** — உருகி இயல்பு மின்னோட்டத்தை விடச் சற்றுக் கூடியதாக இருக்க வேண்டும்.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- P = VI ஐ I க்கு மாற்றுக.
- உருகி > இயல்பு மின்னோட்டம்.

</details>

---

## CL-HEAT: தன்வெப்பக் கொள்ளளவும் மறைவெப்பமும்

<!-- meta {"type":"calc_type","id":"CL-HEAT","chapter_id":"SC11-09","discipline":"PHY","levels":4} -->

*வெப்பம் (Heat)*

**சூத்திரம்:**

$$Q = mc\Delta\theta;\ Q = mL$$

| குறியீடு | கணியம் | அலகு |
|---|---|---|
| Q | வெப்பம் | J |
| m | திணிவு | kg |
| c | தன்வெப்பக் கொள்ளளவு | J kg⁻¹ °C⁻¹ |
| L | தன்மறைவெப்பம் | J kg⁻¹ |

- **எப்போது பயன்படும்:** வெப்பநிலை மாற்றம்; நிலை மாற்றம்.
- **அலகு மாற்றங்கள்:** g → kg; kJ → J; K மாற்றம் Δθ க்குத் தேவையில்லை.
- **மாற்றியமைத்த வடிவங்கள்:** $c = \frac{Q}{m\Delta\theta},\ \Delta\theta = \frac{Q}{mc}$
- **பொதுத் தவறுகள்:** நிலை மாற்றத்தின்போது Δθ ஐப் பயன்படுத்தல்.

### CL-HEAT-1 · அடிப்படை

<!-- meta {"type":"worked_example","id":"CL-HEAT-1","level":"அடிப்படை","answer":252000,"unit":"J","verified":true,"hints":["Q = mcθ.","Δθ = வெப்பநிலை மாற்றம்."]} -->

**வினா:** 2 kg நீரை 30 °C ஆல் சூடாக்கத் தேவையான வெப்பம்? (c = 4200 J kg⁻¹ °C⁻¹)

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

2 kg நீரை 30 °C ஆல் சூடாக்கத் தேவையான வெப்பம்? (c = 4200 J kg⁻¹ °C⁻¹)

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

m = 2 kg; c = 4200 J kg⁻¹ °C⁻¹; Δθ = 30 °C

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

Q

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$Q = mc\Delta\theta$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$Q = 2\times4200\times30$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$Q = 252000\ \text{J} = 252\ \text{kJ}$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**252000 J**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- Q = mcθ.
- Δθ = வெப்பநிலை மாற்றம்.

</details>

### CL-HEAT-2 · இடைநிலை

<!-- meta {"type":"worked_example","id":"CL-HEAT-2","level":"இடைநிலை","answer":27000.0,"unit":"J","verified":true,"hints":["g → kg.","Δθ = இறுதி − ஆரம்பம்."]} -->

**வினா:** 500 g அலுமினியப் பாத்திரம் 25 °C இலிருந்து 85 °C க்குச் சூடாக்கப்படுகிறது. (c = 900 J kg⁻¹ °C⁻¹) உறிஞ்சிய வெப்பம்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

500 g அலுமினியப் பாத்திரம் 25 °C இலிருந்து 85 °C க்குச் சூடாக்கப்படுகிறது. (c = 900 J kg⁻¹ °C⁻¹) உறிஞ்சிய வெப்பம்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

m = 500 g; c = 900 J kg⁻¹ °C⁻¹; θ₁ = 25 °C; θ₂ = 85 °C

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

Q

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

$m = 0.5\ \text{kg},\ \Delta\theta = 85-25 = 60\ ^\circ\text{C}$

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$Q = mc\Delta\theta$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$Q = 0.5\times900\times60$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$Q = 27000$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**27000 J**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- g → kg.
- Δθ = இறுதி − ஆரம்பம்.

</details>

### CL-HEAT-3 · பரீட்சைத் தரம்

<!-- meta {"type":"worked_example","id":"CL-HEAT-3","level":"பரீட்சைத் தரம்","answer":10.0,"unit":"°C","verified":true,"hints":["Q = mcθ ஐ θ க்கு மாற்றுக.","c கூடியது குறைவாகச் சூடாகும்."]} -->

**வினா:** ஒரே திணிவுடைய (2 kg) இரு திரவங்கள் A (c = 4200), B (c = 2100) க்கு ஒவ்வொன்றுக்கும் 84000 J வெப்பம். வெப்பநிலை உயர்வுகள்? சிறந்த குளிர்விப்பான் எது?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

ஒரே திணிவுடைய (2 kg) இரு திரவங்கள் A (c = 4200), B (c = 2100) க்கு ஒவ்வொன்றுக்கும் 84000 J வெப்பம். வெப்பநிலை உயர்வுகள்? சிறந்த குளிர்விப்பான் எது?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

Q = 84000 J; m = 2 kg; c_A = 4200; c_B = 2100

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

Δθ_A, Δθ_B

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$\Delta\theta = \frac{Q}{mc}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$\Delta\theta_A = \frac{84000}{2\times4200};\ \Delta\theta_B = \frac{84000}{2\times2100}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$\Delta\theta_A = 10\ ^\circ\text{C}$ → $\Delta\theta_B = 20\ ^\circ\text{C}$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**10 °C** — A — உயர் c; குறைந்த வெப்பநிலை உயர்வுடன் அதிக வெப்பத்தை உறிஞ்சும் (2019 வினாத்தாள் II வி8B வகை).

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- Q = mcθ ஐ θ க்கு மாற்றுக.
- c கூடியது குறைவாகச் சூடாகும்.

</details>

### CL-HEAT-4 · சவால்

<!-- meta {"type":"worked_example","id":"CL-HEAT-4","level":"சவால்","answer":84000.0,"unit":"J","verified":true,"hints":["இரு கட்டங்கள்: உருகல், சூடாதல்.","உருகலில் வெப்பநிலை மாறாது."]} -->

**வினா:** 0 °C இலுள்ள 0.2 kg பனிக்கட்டியை 20 °C நீராக்கத் தேவையான மொத்த வெப்பம்? (L = 336 000 J kg⁻¹, c = 4200 J kg⁻¹ °C⁻¹)

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

0 °C இலுள்ள 0.2 kg பனிக்கட்டியை 20 °C நீராக்கத் தேவையான மொத்த வெப்பம்? (L = 336 000 J kg⁻¹, c = 4200 J kg⁻¹ °C⁻¹)

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

m = 0.2 kg; L = 336000 J kg⁻¹; c = 4200 J kg⁻¹ °C⁻¹

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

Q

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$Q = mL + mc\Delta\theta$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$Q = 0.2\times336000 + 0.2\times4200\times20$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$Q = 67200 + 16800$ → $Q = 84000$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**84000 J** — முதலில் உருகல் (வெப்பநிலை மாறாது), பின் சூடாதல்.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- இரு கட்டங்கள்: உருகல், சூடாதல்.
- உருகலில் வெப்பநிலை மாறாது.

</details>

---

## CL-WAVE: அலைச் சமன்பாடு

<!-- meta {"type":"calc_type","id":"CL-WAVE","chapter_id":"SC11-04","discipline":"PHY","levels":4} -->

*அலைகளும் அவற்றின் பயன்பாடுகளும் (Waves and their applications)*

**சூத்திரம்:**

$$v = f\lambda;\ T = \frac1f$$

| குறியீடு | கணியம் | அலகு |
|---|---|---|
| v | அலைவேகம் | m s⁻¹ |
| f | மீடிறன் | Hz |
| λ | அலைநீளம் | m |

- **எப்போது பயன்படும்:** அலை, ஒலி, எதிரொலிக் கணிப்புகள்.
- **அலகு மாற்றங்கள்:** kHz → Hz (× 1000); cm → m.
- **மாற்றியமைத்த வடிவங்கள்:** $\lambda = \frac vf,\ f = \frac v\lambda$
- **பொதுத் தவறுகள்:** எதிரொலியில் 2 ஆல் வகுக்காமை.

### CL-WAVE-1 · அடிப்படை

<!-- meta {"type":"worked_example","id":"CL-WAVE-1","level":"அடிப்படை","answer":332.8,"unit":"m s⁻¹","verified":true,"hints":["v = fλ."]} -->

**வினா:** மீடிறன் 256 Hz, அலைநீளம் 1.3 m உடைய ஒலியின் வேகம்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

மீடிறன் 256 Hz, அலைநீளம் 1.3 m உடைய ஒலியின் வேகம்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

f = 256 Hz; λ = 1.3 m

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

v

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$v = f\lambda$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$v = 256\times1.3$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$v = 332.8$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**332.8 m s⁻¹**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- v = fλ.

</details>

### CL-WAVE-2 · இடைநிலை

<!-- meta {"type":"worked_example","id":"CL-WAVE-2","level":"இடைநிலை","answer":2.0,"unit":"cm","verified":true,"hints":["kHz → Hz.","m → cm (× 100)."]} -->

**வினா:** வளியில் ஒலி 340 m s⁻¹. 17 kHz ஒலியின் அலைநீளம் (cm இல்)?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

வளியில் ஒலி 340 m s⁻¹. 17 kHz ஒலியின் அலைநீளம் (cm இல்)?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

v = 340 m s⁻¹; f = 17 kHz

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

λ

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

$f = 17\ \text{kHz} = 17000\ \text{Hz}$

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$\lambda = \frac{v}{f}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$\lambda = \frac{340}{17000}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$\lambda = 0.02\ \text{m} = 2\ \text{cm}$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**2 cm**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- kHz → Hz.
- m → cm (× 100).

</details>

### CL-WAVE-3 · பரீட்சைத் தரம்

<!-- meta {"type":"worked_example","id":"CL-WAVE-3","level":"பரீட்சைத் தரம்","answer":1360,"unit":"m","verified":true,"hints":["ஒலியின் கதியைப் பயன்படுத்துக.","d = vt."]} -->

**வினா:** மின்னல் தெரிந்து 4 s இன் பின் இடி கேட்கிறது (ஒளி நேரம் புறக்கணிப்பு). மின்னலின் தூரம்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

மின்னல் தெரிந்து 4 s இன் பின் இடி கேட்கிறது (ஒளி நேரம் புறக்கணிப்பு). மின்னலின் தூரம்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

t = 4 s; v = 340 m s⁻¹

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

d

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$d = vt$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$d = 340\times4$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$d = 1360$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**1360 m** — ஒளி கிட்டத்தட்டக் கணநேரத்தில் வரும்.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- ஒலியின் கதியைப் பயன்படுத்துக.
- d = vt.

</details>

### CL-WAVE-4 · சவால்

<!-- meta {"type":"worked_example","id":"CL-WAVE-4","level":"சவால்","answer":450.0,"unit":"m","verified":true,"hints":["மொத்த நேரம் போகவும் வரவும்.","2 ஆல் வகுக்க."]} -->

**வினா:** கப்பலின் SONAR மீயொலித் துடிப்பு கடலடியிலிருந்து தெறித்து 0.6 s இல் திரும்புகிறது. நீரில் ஒலி 1500 m s⁻¹. கடலின் ஆழம்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

கப்பலின் SONAR மீயொலித் துடிப்பு கடலடியிலிருந்து தெறித்து 0.6 s இல் திரும்புகிறது. நீரில் ஒலி 1500 m s⁻¹. கடலின் ஆழம்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

t (போய் வர) = 0.6 s; v = 1500 m s⁻¹

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

ஆழம்

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$d = \frac{vt}{2}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$d = \frac{1500\times0.6}{2}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$d = 450$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**450 m** — ஒலி போய்த் திரும்புவதால் 2 ஆல் வகுக்க.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- மொத்த நேரம் போகவும் வரவும்.
- 2 ஆல் வகுக்க.

</details>

---

## CL-OPTICS: முறிவுச் சுட்டியும் வில்லைகளும்

<!-- meta {"type":"calc_type","id":"CL-OPTICS","chapter_id":"SC11-05","discipline":"PHY","levels":4} -->

*கேத்திரகணித ஒளியியல் (Geometrical optics)*

**சூத்திரம்:**

$$n = \frac{\sin i}{\sin r} = \frac cv;\ \frac1f = \frac1u + \frac1v$$

| குறியீடு | கணியம் | அலகு |
|---|---|---|
| n | முறிவுச் சுட்டி | — |
| f | குவியத் தூரம் | cm |
| u | பொருள் தூரம் | cm |
| v | விம்பத் தூரம் | cm |

- **எப்போது பயன்படும்:** முறிவு; விம்பத் தானம் (சரிபார்ப்பு).
- **அலகு மாற்றங்கள்:** cm இலேயே வைக்கலாம் (ஒரே அலகு).
- **மாற்றியமைத்த வடிவங்கள்:** $\sin r = \frac{\sin i}{n}$
- **பொதுத் தவறுகள்:** கோணங்களையே வகுத்தல் (sin எடுக்காமை); மாய விம்பக் குறி.

### CL-OPTICS-1 · அடிப்படை

<!-- meta {"type":"worked_example","id":"CL-OPTICS-1","level":"அடிப்படை","answer":1.532,"unit":"(அலகு இல்லை)","verified":true,"hints":["n = sin i / sin r.","அலகு இல்லை."]} -->

**வினா:** ஒளி வளியிலிருந்து கண்ணாடிக்குள் 50° படுகோணத்தில் சென்று 30° இல் முறிகிறது. முறிவுச் சுட்டி? (sin 50° = 0.766, sin 30° = 0.5)

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

ஒளி வளியிலிருந்து கண்ணாடிக்குள் 50° படுகோணத்தில் சென்று 30° இல் முறிகிறது. முறிவுச் சுட்டி? (sin 50° = 0.766, sin 30° = 0.5)

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

sin i = 0.766; sin r = 0.5

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

n

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$n = \frac{\sin i}{\sin r}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$n = \frac{0.766}{0.5}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$n = 1.532$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**1.532 (அலகு இல்லை)**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- n = sin i / sin r.
- அலகு இல்லை.

</details>

### CL-OPTICS-2 · இடைநிலை

<!-- meta {"type":"worked_example","id":"CL-OPTICS-2","level":"இடைநிலை","answer":200000000.0,"unit":"m s⁻¹","verified":true,"hints":["n = c/v.","v = c/n."]} -->

**வினா:** முறிவுச் சுட்டி 1.5 உடைய கண்ணாடியில் ஒளியின் வேகம்? (வளியில் 3 × 10⁸ m s⁻¹)

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

முறிவுச் சுட்டி 1.5 உடைய கண்ணாடியில் ஒளியின் வேகம்? (வளியில் 3 × 10⁸ m s⁻¹)

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

c = 300000000 m s⁻¹; n = 1.5

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

v

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$n = \frac{c}{v} \Rightarrow v = \frac{c}{n}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$v = \frac{3\times10^8}{1.5}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$v = 2 \times 10^{8}$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**2 × 10⁸ m s⁻¹**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- n = c/v.
- v = c/n.

</details>

### CL-OPTICS-3 · பரீட்சைத் தரம்

<!-- meta {"type":"worked_example","id":"CL-OPTICS-3","level":"பரீட்சைத் தரம்","answer":14.999999999999996,"unit":"cm","verified":true,"hints":["சூத்திரம் சரிபார்ப்புக்கு; O/L இல் கதிர் வரிப்படமே பிரதானம்.","1/v = 1/f − 1/u."]} -->

**வினா:** குவியத் தூரம் 10 cm உடைய குவிவு வில்லைக்கு முன் 30 cm இல் பொருள். விம்பத் தூரமும் உருப்பெருக்கமும்? (பருமன்களைப் பயன்படுத்தும் வடிவம்: 1/f = 1/u + 1/v, உண்மை விம்பம் நேர்)

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

குவியத் தூரம் 10 cm உடைய குவிவு வில்லைக்கு முன் 30 cm இல் பொருள். விம்பத் தூரமும் உருப்பெருக்கமும்? (பருமன்களைப் பயன்படுத்தும் வடிவம்: 1/f = 1/u + 1/v, உண்மை விம்பம் நேர்)

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

f = 10 cm; u = 30 cm

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

v, m

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$\frac1f = \frac1u + \frac1v;\ m = \frac vu$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$\frac1v = \frac1{10} - \frac1{30} = \frac{2}{30}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$v = 15\ \text{cm}$ → $m = \frac{15}{30} = 0.5$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**15 cm** — விம்பம் உண்மை, தலைகீழ், சிறியது (பொருள் 2F க்கு அப்பால்) — கதிர் வரிப்படத்துடன் ஒத்துப்போகும்.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- சூத்திரம் சரிபார்ப்புக்கு; O/L இல் கதிர் வரிப்படமே பிரதானம்.
- 1/v = 1/f − 1/u.

</details>

### CL-OPTICS-4 · சவால்

<!-- meta {"type":"worked_example","id":"CL-OPTICS-4","level":"சவால்","answer":2.9999999999999996,"unit":"(மடங்கு)","verified":true,"hints":["u < f — மாய விம்பம்.","மறை v = மாய விம்பம்."]} -->

**வினா:** f = 12 cm குவிவு வில்லையை உருப்பெருக்கியாகப் பயன்படுத்த பொருள் 8 cm இல். விம்பத் தூரமும் உருப்பெருக்கமும்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

f = 12 cm குவிவு வில்லையை உருப்பெருக்கியாகப் பயன்படுத்த பொருள் 8 cm இல். விம்பத் தூரமும் உருப்பெருக்கமும்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

f = 12 cm; u = 8 cm

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

v, m

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$\frac1v = \frac1f - \frac1u$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$\frac1v = \frac1{12} - \frac1{8} = -\frac{1}{24}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$v = -24\ \text{cm (மறை → மாய விம்பம், பொருளின் பக்கம்)}$ → $m = \frac{24}{8} = 3$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**3 (மடங்கு)** — மாய, நேரான, 3 மடங்கு பெரிய விம்பம்.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- u < f — மாய விம்பம்.
- மறை v = மாய விம்பம்.

</details>

---

## CL-TRANS: நிலைமாற்றி

<!-- meta {"type":"calc_type","id":"CL-TRANS","chapter_id":"SC11-13","discipline":"PHY","levels":4} -->

*மின் காந்தவியலும் தூண்டலும் (Electromagnetism and electromagnetic induction)*

**சூத்திரம்:**

$$\frac{V_s}{V_p} = \frac{N_s}{N_p};\ V_pI_p = V_sI_s\ (\text{இலட்சியம்})$$

| குறியீடு | கணியம் | அலகு |
|---|---|---|
| V | அழுத்தம் | V |
| N | சுற்றுகள் | — |
| I | மின்னோட்டம் | A |

- **எப்போது பயன்படும்:** AC அழுத்த மாற்றம்.
- **அலகு மாற்றங்கள்:** kV → V (× 1000).
- **மாற்றியமைத்த வடிவங்கள்:** $N_s = N_p\frac{V_s}{V_p}$
- **பொதுத் தவறுகள்:** விகிதத்தைத் தலைகீழாக எழுதுதல்; வினைத்திறனை மறத்தல்.

### CL-TRANS-1 · அடிப்படை

<!-- meta {"type":"worked_example","id":"CL-TRANS-1","level":"அடிப்படை","answer":12.0,"unit":"V","verified":true,"hints":["விகிதச் சூத்திரம்."]} -->

**வினா:** நிலைமாற்றியில் Np = 1150, Ns = 60, Vp = 230 V. Vs?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

நிலைமாற்றியில் Np = 1150, Ns = 60, Vp = 230 V. Vs?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

Vp = 230 V; Np = 1150; Ns = 60

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

Vs

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$\frac{V_s}{V_p} = \frac{N_s}{N_p}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$V_s = 230\times\frac{60}{1150}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$V_s = 12$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**12 V** — இறக்கும் நிலைமாற்றி.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- விகிதச் சூத்திரம்.

</details>

### CL-TRANS-2 · இடைநிலை

<!-- meta {"type":"worked_example","id":"CL-TRANS-2","level":"இடைநிலை","answer":92.0,"unit":"சுற்றுகள்","verified":true,"hints":["kV → V.","விகிதம்."]} -->

**வினா:** 11 kV ஐ 230 V ஆக்கும் நிலைமாற்றியின் முதன்மைச் சுற்றுகள் 4400. துணைச் சுற்றுகள்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

11 kV ஐ 230 V ஆக்கும் நிலைமாற்றியின் முதன்மைச் சுற்றுகள் 4400. துணைச் சுற்றுகள்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

Vp = 11 kV; Vs = 230 V; Np = 4400

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

Ns

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

$V_p = 11\ \text{kV} = 11000\ \text{V}$

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$N_s = N_p\frac{V_s}{V_p}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$N_s = 4400\times\frac{230}{11000}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$N_s = 92$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**92 சுற்றுகள்**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- kV → V.
- விகிதம்.

</details>

### CL-TRANS-3 · பரீட்சைத் தரம்

<!-- meta {"type":"worked_example","id":"CL-TRANS-3","level":"பரீட்சைத் தரம்","answer":10.0,"unit":"A","verified":true,"hints":["இலட்சியம்: உள்ளீட்டு வலு = வெளியீட்டு வலு."]} -->

**வினா:** இலட்சிய நிலைமாற்றி: Vp = 240 V, Ip = 0.5 A, Vs = 12 V. Is?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

இலட்சிய நிலைமாற்றி: Vp = 240 V, Ip = 0.5 A, Vs = 12 V. Is?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

Vp = 240 V; Ip = 0.5 A; Vs = 12 V

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

Is

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$V_pI_p = V_sI_s$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$240\times0.5 = 12\times I_s$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$I_s = 10$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**10 A** — அழுத்தம் குறைய மின்னோட்டம் கூடும்.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- இலட்சியம்: உள்ளீட்டு வலு = வெளியீட்டு வலு.

</details>

### CL-TRANS-4 · சவால்

<!-- meta {"type":"worked_example","id":"CL-TRANS-4","level":"சவால்","answer":22.5,"unit":"A","verified":true,"hints":["முதலில் வெளியீட்டு வலு.","I = P/V."]} -->

**வினா:** நிலைமாற்றியின் முதன்மை வலு 500 W, வினைத்திறன் 90%, Vs = 20 V. துணை மின்னோட்டம்? வீணாகும் வலு?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

நிலைமாற்றியின் முதன்மை வலு 500 W, வினைத்திறன் 90%, Vs = 20 V. துணை மின்னோட்டம்? வீணாகும் வலு?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

Pp = 500 W; η = 90 %; Vs = 20 V

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

Is, இழப்பு

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$P_s = \eta P_p;\ I_s = \frac{P_s}{V_s}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$P_s = 0.9\times500 = 450;\ I_s = \frac{450}{20}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$I_s = 22.5\ \text{A}$ → $\text{இழப்பு} = 500 - 450 = 50\ \text{W}$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**22.5 A** — இழப்பு அகணியில் வெப்பமாக (2019 வினாத்தாள் I வி23 வகை).

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- முதலில் வெளியீட்டு வலு.
- I = P/V.

</details>

---

## CL-TEMP: வெப்பநிலை அளவுத்திட்ட மாற்றம்

<!-- meta {"type":"calc_type","id":"CL-TEMP","chapter_id":"SC11-09","discipline":"PHY","levels":4} -->

*வெப்பம் (Heat)*

**சூத்திரம்:**

$$T(K) = \theta(^\circ C) + 273$$

| குறியீடு | கணியம் | அலகு |
|---|---|---|
| T | கெல்வின் வெப்பநிலை | K |
| θ | செல்சியசு | °C |

- **எப்போது பயன்படும்:** அளவுத்திட்ட மாற்றம்.
- **அலகு மாற்றங்கள்:** —
- **மாற்றியமைத்த வடிவங்கள்:** $\theta = T - 273$
- **பொதுத் தவறுகள்:** மாற்றத்துக்கு (Δ) 273 ஐக் கூட்டுதல்.

### CL-TEMP-1 · அடிப்படை

<!-- meta {"type":"worked_example","id":"CL-TEMP-1","level":"அடிப்படை","answer":310,"unit":"K","verified":true,"hints":["+273."]} -->

**வினா:** மனித உடல் வெப்பநிலை 37 °C ஐக் கெல்வினில்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

மனித உடல் வெப்பநிலை 37 °C ஐக் கெல்வினில்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

θ = 37 °C

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

T

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$T = \theta + 273$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$T = 37+273$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$T = 310$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**310 K**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- +273.

</details>

### CL-TEMP-2 · இடைநிலை

<!-- meta {"type":"worked_example","id":"CL-TEMP-2","level":"இடைநிலை","answer":-23,"unit":"°C","verified":true,"hints":["−273."]} -->

**வினா:** 250 K ஐ °C இல்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

250 K ஐ °C இல்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

T = 250 K

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

θ

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$\theta = T - 273$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$\theta = 250-273$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$\theta = -23$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**-23 °C** — 0 °C க்குக் கீழே.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- −273.

</details>

### CL-TEMP-3 · பரீட்சைத் தரம்

<!-- meta {"type":"worked_example","id":"CL-TEMP-3","level":"பரீட்சைத் தரம்","answer":60,"unit":"K","verified":true,"hints":["வேறுபாடு இரு அளவுத்திட்டத்திலும் ஒன்றே."]} -->

**வினா:** நீர் 20 °C இலிருந்து 80 °C ஆகிறது. வெப்பநிலை மாற்றம் கெல்வினில்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

நீர் 20 °C இலிருந்து 80 °C ஆகிறது. வெப்பநிலை மாற்றம் கெல்வினில்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

θ₁ = 20 °C; θ₂ = 80 °C

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

ΔT

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$\Delta T = \Delta\theta$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$\Delta T = 80-20$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$\Delta T = 60$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**60 K** — 1 °C மாற்றம் = 1 K மாற்றம்.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- வேறுபாடு இரு அளவுத்திட்டத்திலும் ஒன்றே.

</details>

### CL-TEMP-4 · சவால்

<!-- meta {"type":"worked_example","id":"CL-TEMP-4","level":"சவால்","answer":126000.0,"unit":"J","verified":true,"hints":["கெல்வின் வேறுபாட்டை நேரடியாகப் பயன்படுத்தலாம்."]} -->

**வினா:** 0.5 kg நீர் 293 K இலிருந்து 353 K ஆகச் சூடாக்கப்படுகிறது. தேவையான வெப்பம்? (c = 4200 J kg⁻¹ K⁻¹)

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

0.5 kg நீர் 293 K இலிருந்து 353 K ஆகச் சூடாக்கப்படுகிறது. தேவையான வெப்பம்? (c = 4200 J kg⁻¹ K⁻¹)

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

m = 0.5 kg; T₁ = 293 K; T₂ = 353 K

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

Q

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

$\Delta T = 353-293 = 60\ \text{K} = 60\ ^\circ\text{C}$

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$Q = mc\Delta T$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$Q = 0.5\times4200\times60$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$Q = 126000$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**1.26 × 10⁵ J**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- கெல்வின் வேறுபாட்டை நேரடியாகப் பயன்படுத்தலாம்.

</details>

---

## CL-MOLE: மூல், மூலர்த் திணிவு, துணிக்கைகள்

<!-- meta {"type":"calc_type","id":"CL-MOLE","chapter_id":"SC10-07","discipline":"CHE","levels":4} -->

*மூலகங்களினதும் சேர்வைகளினதும் அளவறிதல் (Quantification of elements and compounds)*

**சூத்திரம்:**

$$n = \frac mM;\ N = nN_A$$

| குறியீடு | கணியம் | அலகு |
|---|---|---|
| n | மூல் | mol |
| m | திணிவு | g |
| M | மூலர்த் திணிவு | g mol⁻¹ |
| N_A | அவகாதரோ மாறிலி | 6.022 × 10²³ mol⁻¹ |

- **எப்போது பயன்படும்:** திணிவு ↔ மூல் ↔ துணிக்கைகள்; தாக்கத் திணிவுகள்.
- **அலகு மாற்றங்கள்:** kg → g (× 1000).
- **மாற்றியமைத்த வடிவங்கள்:** $m = nM,\ n = \frac{N}{N_A}$
- **பொதுத் தவறுகள்:** மூலக்கூறுகளையும் அணுக்களையும் குழப்புதல்; சமன்செய்யாத சமன்பாடு.

### CL-MOLE-1 · அடிப்படை

<!-- meta {"type":"worked_example","id":"CL-MOLE-1","level":"அடிப்படை","answer":2.0,"unit":"mol","verified":true,"hints":["n = m/M."]} -->

**வினா:** 36 g நீரிலுள்ள மூல் எண்ணிக்கை? (H₂O = 18 g mol⁻¹)

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

36 g நீரிலுள்ள மூல் எண்ணிக்கை? (H₂O = 18 g mol⁻¹)

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

m = 36 g; M = 18 g mol⁻¹

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

n

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$n = \frac{m}{M}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$n = \frac{36}{18}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$n = 2$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**2 mol**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- n = m/M.

</details>

### CL-MOLE-2 · இடைநிலை

<!-- meta {"type":"worked_example","id":"CL-MOLE-2","level":"இடைநிலை","answer":0.25,"unit":"mol","verified":true,"hints":["முதலில் மூலர்த் திணிவைக் கணிக்க."]} -->

**வினா:** 25 g CaCO₃ இலுள்ள மூல்? (Ca = 40, C = 12, O = 16)

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

25 g CaCO₃ இலுள்ள மூல்? (Ca = 40, C = 12, O = 16)

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

m = 25 g

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

n

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

$M(\text{CaCO}_3) = 40 + 12 + 3\times16 = 100$

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$n = \frac{m}{M}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$n = \frac{25}{100}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$n = 0.25$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**0.25 mol**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- முதலில் மூலர்த் திணிவைக் கணிக்க.

</details>

### CL-MOLE-3 · பரீட்சைத் தரம்

<!-- meta {"type":"worked_example","id":"CL-MOLE-3","level":"பரீட்சைத் தரம்","answer":1.5055e+23,"unit":"மூலக்கூறுகள்","verified":true,"hints":["N = n × N_A.","அணுக்களுக்கு மூலக்கூற்றிலுள்ள எண்ணால் பெருக்குக."]} -->

**வினா:** 0.25 mol CO₂ இல் உள்ள மூலக்கூறுகளும் ஒட்சிசன் அணுக்களும்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

0.25 mol CO₂ இல் உள்ள மூலக்கூறுகளும் ஒட்சிசன் அணுக்களும்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

n = 0.25 mol; N_A = 602200000000000027262976 mol⁻¹

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

N

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$N = nN_A$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$N = 0.25\times6.022\times10^{23}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$N = 1.506 \times 10^{23}\ \text{மூலக்கூறுகள்}$ → $\text{O அணுக்கள்} = 2\times 1.506 \times 10^{23} = 3.011 \times 10^{23}$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**1.506 × 10²³ மூலக்கூறுகள்** — ஒவ்வொரு CO₂ இலும் 2 O அணுக்கள்.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- N = n × N_A.
- அணுக்களுக்கு மூலக்கூற்றிலுள்ள எண்ணால் பெருக்குக.

</details>

### CL-MOLE-4 · சவால்

<!-- meta {"type":"worked_example","id":"CL-MOLE-4","level":"சவால்","answer":0.5,"unit":"g","verified":true,"hints":["சமன்செய்த சமன்பாட்டின் மூல் விகிதம்.","H₂ = 2 g mol⁻¹."]} -->

**வினா:** Mg + 2HCl → MgCl₂ + H₂. 6 g Mg முழுமையாகத் தாக்கமடைந்தால் உருவாகும் H₂ திணிவு? (Mg = 24, H = 1)

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

Mg + 2HCl → MgCl₂ + H₂. 6 g Mg முழுமையாகத் தாக்கமடைந்தால் உருவாகும் H₂ திணிவு? (Mg = 24, H = 1)

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

m(Mg) = 6 g

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

m(H₂)

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$n = \frac mM;\ \text{மூல் விகிதம் Mg : H}_2 = 1:1$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$n(\text{Mg}) = \frac{6}{24} = 0.25$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$n(\text{H}_2) = 0.25$ → $m(\text{H}_2) = 0.25\times2 = 0.5$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**0.5 g**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- சமன்செய்த சமன்பாட்டின் மூல் விகிதம்.
- H₂ = 2 g mol⁻¹.

</details>

---

## CL-CONC: கரைசற் செறிவு, அடர்த்தி

<!-- meta {"type":"calc_type","id":"CL-CONC","chapter_id":"SC11-03","discipline":"CHE","levels":4} -->

*கலவை (Mixtures)*

**சூத்திரம்:**

$$C = \frac nV;\ \rho = \frac mV;\ w/w\% = \frac{m_{solute}}{m_{solution}}\times100$$

| குறியீடு | கணியம் | அலகு |
|---|---|---|
| C | செறிவு | mol dm⁻³ |
| V | கனவளவு | dm³ |
| ρ | அடர்த்தி | g cm⁻³ |

- **எப்போது பயன்படும்:** கரைசல் தயாரிப்பு, கரைசல் பகுப்பாய்வு.
- **அலகு மாற்றங்கள்:** cm³ → dm³ (÷ 1000).
- **மாற்றியமைத்த வடிவங்கள்:** $n = CV,\ V = \frac nC$
- **பொதுத் தவறுகள்:** cm³ ஐ நேரடியாகப் பயன்படுத்தல்; கரைப்பான் திணிவால் வகுத்தல்.

### CL-CONC-1 · அடிப்படை

<!-- meta {"type":"worked_example","id":"CL-CONC-1","level":"அடிப்படை","answer":0.4,"unit":"mol dm⁻³","verified":true,"hints":["cm³ → dm³ (÷ 1000)."]} -->

**வினா:** 0.2 mol NaCl, 500 cm³ கரைசலில். செறிவு?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

0.2 mol NaCl, 500 cm³ கரைசலில். செறிவு?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

n = 0.2 mol; V = 500 cm³

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

C

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

$V = 500\ \text{cm}^3 = 0.5\ \text{dm}^3$

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$C = \frac nV$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$C = \frac{0.2}{0.5}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$C = 0.4$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**0.4 mol dm⁻³**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- cm³ → dm³ (÷ 1000).

</details>

### CL-CONC-2 · இடைநிலை

<!-- meta {"type":"worked_example","id":"CL-CONC-2","level":"இடைநிலை","answer":5.0,"unit":"g","verified":true,"hints":["n = CV.","m = nM."]} -->

**வினா:** 0.5 mol dm⁻³ NaOH கரைசல் 250 cm³ தயாரிக்கத் தேவையான NaOH திணிவு? (NaOH = 40)

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

0.5 mol dm⁻³ NaOH கரைசல் 250 cm³ தயாரிக்கத் தேவையான NaOH திணிவு? (NaOH = 40)

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

C = 0.5 mol dm⁻³; V = 250 cm³; M = 40 g mol⁻¹

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

m

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

$V = 0.25\ \text{dm}^3$

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$n = CV;\ m = nM$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$n = 0.5\times0.25 = 0.125;\ m = 0.125\times40$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$m = 5$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**5 g** — 2019 வினாத்தாள் I வி14 வகை.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- n = CV.
- m = nM.

</details>

### CL-CONC-3 · பரீட்சைத் தரம்

<!-- meta {"type":"worked_example","id":"CL-CONC-3","level":"பரீட்சைத் தரம்","answer":7.5,"unit":"%","verified":true,"hints":["கரைசல் = கரையம் + கரைப்பான்."]} -->

**வினா:** 185 g நீரில் 15 g சீனி கரைக்கப்பட்டது. திணிவுப் பின்ன %?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

185 g நீரில் 15 g சீனி கரைக்கப்பட்டது. திணிவுப் பின்ன %?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

கரையம் = 15 g; கரைப்பான் = 185 g

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

w/w %

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

$\text{கரைசல் திணிவு} = 185 + 15 = 200\ \text{g}$

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$w/w\% = \frac{m_{\text{கரையம்}}}{m_{\text{கரைசல்}}}\times100$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$\frac{15}{200}\times100$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$= 7.5\%$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**7.5 %** — கரைப்பானால் அல்ல, கரைசலால் வகுக்க.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- கரைசல் = கரையம் + கரைப்பான்.

</details>

### CL-CONC-4 · சவால்

<!-- meta {"type":"worked_example","id":"CL-CONC-4","level":"சவால்","answer":0.6799999999999999,"unit":"mol dm⁻³","verified":true,"hints":["முதலில் அடர்த்தியால் திணிவு.","பின் சதவீதம், பின் மூல்."]} -->

**வினா:** வினாகிரி: அடர்த்தி 1.02 g cm⁻³, திணிவின்படி 4% அசற்றிக்கமிலம் (CH₃COOH = 60). 500 cm³ இல் (i) கரைசல் திணிவு (ii) அமிலத் திணிவு (iii) மூலர்ச் செறிவு?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

வினாகிரி: அடர்த்தி 1.02 g cm⁻³, திணிவின்படி 4% அசற்றிக்கமிலம் (CH₃COOH = 60). 500 cm³ இல் (i) கரைசல் திணிவு (ii) அமிலத் திணிவு (iii) மூலர்ச் செறிவு?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

ρ = 1.02 g cm⁻³; V = 500 cm³; w/w = 4 %

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

m, m_acid, C

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$m = \rho V;\ m_{acid} = m\times\frac{4}{100};\ C = \frac{m_{acid}/M}{V}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$m = 1.02\times500 = 510;\ m_{acid} = 20.4$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$n = \frac{20.4}{60} = 0.34\ \text{mol}$ → $C = \frac{0.34}{0.5} = 0.68\ \text{mol dm}^{-3}$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**0.68 mol dm⁻³** — 2019 வினாத்தாள் II வி6C வகை.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- முதலில் அடர்த்தியால் திணிவு.
- பின் சதவீதம், பின் மூல்.

</details>

---

## CL-ENTH: தாக்க வெப்பம்

<!-- meta {"type":"calc_type","id":"CL-ENTH","chapter_id":"SC11-08","discipline":"CHE","levels":4} -->

*இரசாயனத் தாக்கங்களின் வெப்ப விளைவு (Heat changes associated with chemical reactions)*

**சூத்திரம்:**

$$q = n|\Delta H|;\ Q = mc\Delta\theta;\ \Delta H = -\frac{Q}{n}$$

| குறியீடு | கணியம் | அலகு |
|---|---|---|
| ΔH | வெப்பவுள்ளுறை மாற்றம் | kJ mol⁻¹ |
| n | மூல் | mol |
| Q | வெப்பம் | J |

- **எப்போது பயன்படும்:** தகன, நடுநிலையாக்க வெப்பம்.
- **அலகு மாற்றங்கள்:** J → kJ (÷ 1000); g → kg.
- **மாற்றியமைத்த வடிவங்கள்:** $n = \frac{q}{|\Delta H|}$
- **பொதுத் தவறுகள்:** ΔH குறியை மறத்தல்; J/kJ குழப்பம்.

### CL-ENTH-1 · அடிப்படை

<!-- meta {"type":"worked_example","id":"CL-ENTH-1","level":"அடிப்படை","answer":1780,"unit":"kJ","verified":true,"hints":["மூல் × ΔH."]} -->

**வினா:** CH₄ தகனம் ΔH = −890 kJ mol⁻¹. 2 mol எரியும்போது வெளியேறும் வெப்பம்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

CH₄ தகனம் ΔH = −890 kJ mol⁻¹. 2 mol எரியும்போது வெளியேறும் வெப்பம்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

n = 2 mol; ΔH = -890 kJ mol⁻¹

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

q

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$q = n\times|\Delta H|$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$q = 2\times890$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$q = 1780$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**1780 kJ** — புறவெப்பம் — வெப்பம் வெளியேறும்.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- மூல் × ΔH.

</details>

### CL-ENTH-2 · இடைநிலை

<!-- meta {"type":"worked_example","id":"CL-ENTH-2","level":"இடைநிலை","answer":700.0,"unit":"kJ","verified":true,"hints":["முதலில் மூல்."]} -->

**வினா:** C₂H₄ தகனம் ΔH = −1400 kJ mol⁻¹. 14 g எதீன் எரியும்போது வெப்பம்? (C₂H₄ = 28)

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

C₂H₄ தகனம் ΔH = −1400 kJ mol⁻¹. 14 g எதீன் எரியும்போது வெப்பம்? (C₂H₄ = 28)

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

m = 14 g; M = 28 g mol⁻¹

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

q

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

$n = \frac{14}{28} = 0.5\ \text{mol}$

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$q = n|\Delta H|$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$q = 0.5\times1400$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$q = 700$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**700 kJ** — 2019 வினாத்தாள் I வி30–31 வகைச் சூழல்.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- முதலில் மூல்.

</details>

### CL-ENTH-3 · பரீட்சைத் தரம்

<!-- meta {"type":"worked_example","id":"CL-ENTH-3","level":"பரீட்சைத் தரம்","answer":2730.0,"unit":"J","verified":true,"hints":["கரைசலை நீராகக் கருதுக."]} -->

**வினா:** நடுநிலையாக்கத்தில் 100 g கரைசலின் வெப்பநிலை 6.5 °C கூடியது (c = 4200 J kg⁻¹ °C⁻¹). வெளியேறிய வெப்பம்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

நடுநிலையாக்கத்தில் 100 g கரைசலின் வெப்பநிலை 6.5 °C கூடியது (c = 4200 J kg⁻¹ °C⁻¹). வெளியேறிய வெப்பம்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

m = 100 g; Δθ = 6.5 °C

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

Q

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

$m = 0.1\ \text{kg}$

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$Q = mc\Delta\theta$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$Q = 0.1\times4200\times6.5$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$Q = 2730$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**2730 J**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- கரைசலை நீராகக் கருதுக.

</details>

### CL-ENTH-4 · சவால்

<!-- meta {"type":"worked_example","id":"CL-ENTH-4","level":"சவால்","answer":-54.599999999999994,"unit":"kJ mol⁻¹","verified":true,"hints":["J → kJ.","புறவெப்பத்துக்கு மறைக் குறி."]} -->

**வினா:** மேலுள்ள தாக்கத்தில் 0.05 mol நீர் உருவானது. நடுநிலையாக்க வெப்பவுள்ளுறை மாற்றம் (kJ mol⁻¹)?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

மேலுள்ள தாக்கத்தில் 0.05 mol நீர் உருவானது. நடுநிலையாக்க வெப்பவுள்ளுறை மாற்றம் (kJ mol⁻¹)?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

Q = 2730 J; n = 0.05 mol

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

ΔH

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

$Q = 2730\ \text{J} = 2.73\ \text{kJ}$

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$\Delta H = -\frac{Q}{n}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$\Delta H = -\frac{2.73}{0.05}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$\Delta H = -54.6$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**-54.6 kJ mol⁻¹** — மறைக் குறி — புறவெப்பம்; நியமப் பெறுமானம் ≈ −57 kJ mol⁻¹ க்கு அண்மை.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- J → kJ.
- புறவெப்பத்துக்கு மறைக் குறி.

</details>

---

## CL-RATE: சராசரித் தாக்கவீதம்

<!-- meta {"type":"calc_type","id":"CL-RATE","chapter_id":"SC10-17","discipline":"CHE","levels":4} -->

*தாக்கவீதம் (Rate of reactions)*

**சூத்திரம்:**

$$\text{வீதம்} = \frac{\Delta(\text{அளவு})}{\Delta t}$$

| குறியீடு | கணியம் | அலகு |
|---|---|---|
| ΔV | வாயுக் கனவளவு மாற்றம் | cm³ |
| Δm | திணிவு மாற்றம் | g |
| Δt | நேரம் | s |

- **எப்போது பயன்படும்:** தாக்கவீத அளவீடுகள்.
- **அலகு மாற்றங்கள்:** min → s.
- **மாற்றியமைத்த வடிவங்கள்:** $\Delta t = \frac{\Delta V}{\text{வீதம்}}$
- **பொதுத் தவறுகள்:** மொத்த அளவை இடைவெளிக்குப் பயன்படுத்தல்.

### CL-RATE-1 · அடிப்படை

<!-- meta {"type":"worked_example","id":"CL-RATE-1","level":"அடிப்படை","answer":0.8,"unit":"cm³ s⁻¹","verified":true,"hints":["மாற்றம் ÷ நேரம்."]} -->

**வினா:** ஒரு தாக்கம் 60 s இல் 48 cm³ H₂ ஐத் தருகிறது. சராசரி வீதம்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

ஒரு தாக்கம் 60 s இல் 48 cm³ H₂ ஐத் தருகிறது. சராசரி வீதம்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

V = 48 cm³; t = 60 s

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

வீதம்

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$\text{வீதம்} = \frac{\Delta V}{\Delta t}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$\frac{48}{60}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$= 0.8$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**0.8 cm³ s⁻¹**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- மாற்றம் ÷ நேரம்.

</details>

### CL-RATE-2 · இடைநிலை

<!-- meta {"type":"worked_example","id":"CL-RATE-2","level":"இடைநிலை","answer":0.5,"unit":"cm³ s⁻¹","verified":true,"hints":["இடைவெளி மாற்றம்."]} -->

**வினா:** 30 s இல் 20 cm³, 60 s இல் 35 cm³ வாயு. 30–60 s இடையிலான சராசரி வீதம்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

30 s இல் 20 cm³, 60 s இல் 35 cm³ வாயு. 30–60 s இடையிலான சராசரி வீதம்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

V₁ = 20 cm³; V₂ = 35 cm³; t₁ = 30 s; t₂ = 60 s

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

வீதம்

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$\frac{V_2-V_1}{t_2-t_1}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$\frac{35-20}{60-30}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$= 0.5$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**0.5 cm³ s⁻¹** — முதல் 30 s வீதத்தை (0.67) விடக் குறைவு — தாக்கிகள் குறைகின்றன.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- இடைவெளி மாற்றம்.

</details>

### CL-RATE-3 · பரீட்சைத் தரம்

<!-- meta {"type":"worked_example","id":"CL-RATE-3","level":"பரீட்சைத் தரம்","answer":0.004999999999999952,"unit":"g s⁻¹","verified":true,"hints":["திணிவுக் குறைவு = வாயு."]} -->

**வினா:** CaCO₃ + HCl குடுவையின் திணிவு 120 s இல் 150.40 g இலிருந்து 149.80 g ஆகக் குறைந்தது. CO₂ வெளியேறிய சராசரி வீதம் (g s⁻¹)?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

CaCO₃ + HCl குடுவையின் திணிவு 120 s இல் 150.40 g இலிருந்து 149.80 g ஆகக் குறைந்தது. CO₂ வெளியேறிய சராசரி வீதம் (g s⁻¹)?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

m₁ = 150.4 g; m₂ = 149.8 g; t = 120 s

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

வீதம்

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$\frac{\Delta m}{\Delta t}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$\frac{150.40-149.80}{120}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$= 0.005$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**0.005 g s⁻¹** — திணிவு இழப்பு = வெளியேறிய CO₂.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- திணிவுக் குறைவு = வாயு.

</details>

### CL-RATE-4 · சவால்

<!-- meta {"type":"worked_example","id":"CL-RATE-4","level":"சவால்","answer":327.27272727272725,"unit":"cm³","verified":true,"hints":["மூல் முதலில்.","தரப்பட்ட மூலர்க் கனவளவைப் பயன்படுத்துக."]} -->

**வினா:** மேலே வெளியேறிய 0.60 g CO₂ இன் கனவளவு (அறை வெப்பநிலையில் 1 mol வாயு = 24 000 cm³)? (CO₂ = 44)

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

மேலே வெளியேறிய 0.60 g CO₂ இன் கனவளவு (அறை வெப்பநிலையில் 1 mol வாயு = 24 000 cm³)? (CO₂ = 44)

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

m = 0.6 g; V_m = 24000 cm³ mol⁻¹

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

V

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$n = \frac mM;\ V = nV_m$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$n = \frac{0.60}{44}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$n = 0.01364\ \text{mol}$ → $V = 0.01364\times24000 = 327.3$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**327.273 cm³** — (மூலர்க் கனவளவு தரப்படும்போது மட்டும்.)

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- மூல் முதலில்.
- தரப்பட்ட மூலர்க் கனவளவைப் பயன்படுத்துக.

</details>

---

## CL-GENE: மென்டல் விகிதங்கள்

<!-- meta {"type":"calc_type","id":"CL-GENE","chapter_id":"SC10-20","discipline":"BIO","levels":4} -->

*தலைமுறையுரிமை (Inheritance)*

**சூத்திரம்:**

$$Tt\times Tt \to 3:1;\ Tt\times tt \to 1:1$$

| குறியீடு | கணியம் | அலகு |
|---|---|---|
| N | மொத்தச் சந்ததி | — |

- **எப்போது பயன்படும்:** எதிர்பார்க்கும் சந்ததி எண்ணிக்கை.
- **அலகு மாற்றங்கள்:** —
- **பொதுத் தவறுகள்:** பிறப்புரிமையமைப்பு, தோற்றவமைப்பு விகிதங்களைக் குழப்புதல்.

### CL-GENE-1 · அடிப்படை

<!-- meta {"type":"worked_example","id":"CL-GENE-1","level":"அடிப்படை","answer":600,"unit":"தாவரங்கள்","verified":true,"hints":["புனெற் சதுரம்: 1 TT : 2 Tt : 1 tt."]} -->

**வினா:** Tt × Tt கலப்பில் 800 தாவரங்கள். எதிர்பார்க்கும் உயரத் தாவரங்கள்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

Tt × Tt கலப்பில் 800 தாவரங்கள். எதிர்பார்க்கும் உயரத் தாவரங்கள்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

N = 800

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

உயரம்

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$\text{உயரம்} = \frac34 N$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$\frac34\times800$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$= 600$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**600 தாவரங்கள்** — TT, Tt, Tt → 3/4.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- புனெற் சதுரம்: 1 TT : 2 Tt : 1 tt.

</details>

### CL-GENE-2 · இடைநிலை

<!-- meta {"type":"worked_example","id":"CL-GENE-2","level":"இடைநிலை","answer":300,"unit":"சந்ததிகள்","verified":true,"hints":["4 இல் 2 Tt."]} -->

**வினா:** Tt × Tt இலிருந்து 600 சந்ததிகள். பல்லினநுக (Tt) சந்ததிகள்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

Tt × Tt இலிருந்து 600 சந்ததிகள். பல்லினநுக (Tt) சந்ததிகள்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

N = 600

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

Tt

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$P(Tt) = \frac24$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$\frac12\times600$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$= 300$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**300 சந்ததிகள்**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- 4 இல் 2 Tt.

</details>

### CL-GENE-3 · பரீட்சைத் தரம்

<!-- meta {"type":"worked_example","id":"CL-GENE-3","level":"பரீட்சைத் தரம்","answer":120,"unit":"தாவரங்கள்","verified":true,"hints":["Tt × tt: Tt, Tt, tt, tt."]} -->

**வினா:** உயரம் (Tt) × குட்டை (tt) — 240 சந்ததிகள். குட்டைத் தாவரங்கள்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

உயரம் (Tt) × குட்டை (tt) — 240 சந்ததிகள். குட்டைத் தாவரங்கள்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

N = 240

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

குட்டை

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$Tt\times tt \Rightarrow 1:1$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$\frac12\times240$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$= 120$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**120 தாவரங்கள்** — சோதனைக் கலப்பு.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- Tt × tt: Tt, Tt, tt, tt.

</details>

### CL-GENE-4 · சவால்

<!-- meta {"type":"worked_example","id":"CL-GENE-4","level":"சவால்","answer":0.125,"unit":"","verified":true,"hints":["சாராத நிகழ்வுகளைப் பெருக்குக."]} -->

**வினா:** இரு தலசீமியா காவிகள் (Tt). அடுத்த பிள்ளை நோயுள்ள (tt) ஆண் பிள்ளையாக இருக்கும் நிகழ்தகவு?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

இரு தலசீமியா காவிகள் (Tt). அடுத்த பிள்ளை நோயுள்ள (tt) ஆண் பிள்ளையாக இருக்கும் நிகழ்தகவு?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

P(tt) = 0.25; P(ஆண்) = 0.5

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

P

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$P = P(tt)\times P(\text{ஆண்})$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$\frac14\times\frac12$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$= \frac18$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**0.125 ** — இரு நிகழ்வுகளும் சாராதவை — பெருக்குக.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- சாராத நிகழ்வுகளைப் பெருக்குக.

</details>

---

## CL-ECO: உணவுச் சங்கிலியில் சக்திக் கடத்தல்

<!-- meta {"type":"calc_type","id":"CL-ECO","chapter_id":"SC10-13","discipline":"BIO","levels":4} -->

*உயிர்க்கோளம் (Biosphere)*

**சூத்திரம்:**

$$E_{n+1} \approx 0.1\,E_n$$

| குறியீடு | கணியம் | அலகு |
|---|---|---|
| E | சக்தி | kJ |

- **எப்போது பயன்படும்:** போசணை மட்டங்களுக்கிடையே சக்தி.
- **அலகு மாற்றங்கள்:** —
- **மாற்றியமைத்த வடிவங்கள்:** $E_n = \frac{E_{n+1}}{0.1}$
- **பொதுத் தவறுகள்:** பெருக்கலுக்குப் பதிலாக வகுத்தல் (திசைக் குழப்பம்).

### CL-ECO-1 · அடிப்படை

<!-- meta {"type":"worked_example","id":"CL-ECO-1","level":"அடிப்படை","answer":500.0,"unit":"kJ","verified":true,"hints":["ஒவ்வொரு படிக்கும் × 0.1."]} -->

**வினா:** உற்பத்தியாளரிடம் 50 000 kJ. 10% விதிப்படி இரண்டாம் நிலை நுகர்வோருக்குக் கிடைப்பது?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

உற்பத்தியாளரிடம் 50 000 kJ. 10% விதிப்படி இரண்டாம் நிலை நுகர்வோருக்குக் கிடைப்பது?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

E = 50000 kJ

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

E₂

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$E_{n+1} = 0.1\,E_n$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$50000\times0.1\times0.1$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$= 500$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**500 kJ**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- ஒவ்வொரு படிக்கும் × 0.1.

</details>

### CL-ECO-2 · இடைநிலை

<!-- meta {"type":"worked_example","id":"CL-ECO-2","level":"இடைநிலை","answer":12.5,"unit":"%","verified":true,"hints":["பகுதி/மொத்தம் × 100."]} -->

**வினா:** முதல் நிலை நுகர்வோரில் 2400 kJ, இரண்டாம் நிலையில் 300 kJ. சக்திக் கடத்தல் %?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

முதல் நிலை நுகர்வோரில் 2400 kJ, இரண்டாம் நிலையில் 300 kJ. சக்திக் கடத்தல் %?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

E₁ = 2400 kJ; E₂ = 300 kJ

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

%

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$\frac{E_2}{E_1}\times100$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$\frac{300}{2400}\times100$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$= 12.5\%$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**12.5 %**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- பகுதி/மொத்தம் × 100.

</details>

### CL-ECO-3 · பரீட்சைத் தரம்

<!-- meta {"type":"worked_example","id":"CL-ECO-3","level":"பரீட்சைத் தரம்","answer":19999.999999999996,"unit":"kJ","verified":true,"hints":["மூன்று படிகள் பின்னோக்கி: ÷ 0.1 மூன்று முறை."]} -->

**வினா:** மூன்றாம் நிலை நுகர்வோருக்கு 20 kJ கிடைக்க உற்பத்தியாளரிடம் தேவையான சக்தி? (10%)

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

மூன்றாம் நிலை நுகர்வோருக்கு 20 kJ கிடைக்க உற்பத்தியாளரிடம் தேவையான சக்தி? (10%)

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

E₃ = 20 kJ

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

E₀

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$E_0 = \frac{E_3}{0.1^3}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$\frac{20}{0.001}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$= 20000$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**20000 kJ**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- மூன்று படிகள் பின்னோக்கி: ÷ 0.1 மூன்று முறை.

</details>

### CL-ECO-4 · சவால்

<!-- meta {"type":"worked_example","id":"CL-ECO-4","level":"சவால்","answer":1000,"unit":"kJ","verified":true,"hints":["இழப்புகளைக் கழிக்க."]} -->

**வினா:** முதல் நிலை நுகர்வோர் 10 000 kJ உண்கிறது; 60% சுவாசத்தில், 30% கழிவாக இழக்கப்படுகிறது. அதன் உடல் வளர்ச்சிக்கு (அடுத்த மட்டத்துக்குக் கிடைக்கக்கூடியது) எஞ்சுவது?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

முதல் நிலை நுகர்வோர் 10 000 kJ உண்கிறது; 60% சுவாசத்தில், 30% கழிவாக இழக்கப்படுகிறது. அதன் உடல் வளர்ச்சிக்கு (அடுத்த மட்டத்துக்குக் கிடைக்கக்கூடியது) எஞ்சுவது?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

E = 10000 kJ

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

E_growth

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$E_{growth} = E(1 - 0.6 - 0.3)$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$10000\times0.1$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$= 1000$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**1000 kJ** — இதுவே 10% விதியின் காரணம்.

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- இழப்புகளைக் கழிக்க.

</details>

---

## CL-MICRO: நுணுக்குக்காட்டி உருப்பெருக்கம்

<!-- meta {"type":"calc_type","id":"CL-MICRO","chapter_id":"SC10-06","discipline":"BIO","levels":4} -->

*தாவரக்கலங்களினதும் விலங்குக்கலங்களினதும் கட்டமைப்பும் தொழிற்பாடும் (Structure and functions of plant and animal cells)*

**சூத்திரம்:**

$$M = M_e\times M_o;\ M = \frac{\text{விம்ப அளவு}}{\text{உண்மை அளவு}}$$

| குறியீடு | கணியம் | அலகு |
|---|---|---|
| M | உருப்பெருக்கம் | மடங்கு |

- **எப்போது பயன்படும்:** கல அளவுகள்.
- **அலகு மாற்றங்கள்:** mm ↔ µm (× 1000).
- **மாற்றியமைத்த வடிவங்கள்:** $\text{உண்மை} = \frac{\text{விம்பம்}}{M}$
- **பொதுத் தவறுகள்:** அலகுகளைப் பொருத்தாமை.

### CL-MICRO-1 · அடிப்படை

<!-- meta {"type":"worked_example","id":"CL-MICRO-1","level":"அடிப்படை","answer":400,"unit":"மடங்கு","verified":true,"hints":["இரண்டையும் பெருக்குக."]} -->

**வினா:** பார்வைத்துண்டு ×10, பொருள்வில்லை ×40. மொத்த உருப்பெருக்கம்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

பார்வைத்துண்டு ×10, பொருள்வில்லை ×40. மொத்த உருப்பெருக்கம்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

M_e = 10; M_o = 40

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

M

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$M = M_e\times M_o$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$10\times40$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$M = 400$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**400 மடங்கு**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- இரண்டையும் பெருக்குக.

</details>

### CL-MICRO-2 · இடைநிலை

<!-- meta {"type":"worked_example","id":"CL-MICRO-2","level":"இடைநிலை","answer":20.0,"unit":"µm","verified":true,"hints":["mm → µm (× 1000)."]} -->

**வினா:** ×400 இல் ஒரு கலத்தின் விம்ப நீளம் 8 mm. உண்மை நீளம் (µm)?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

×400 இல் ஒரு கலத்தின் விம்ப நீளம் 8 mm. உண்மை நீளம் (µm)?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

விம்பம் = 8 mm; M = 400

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

உண்மை நீளம்

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

$1\ \text{mm} = 1000\ \mu\text{m}$

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$\text{உண்மை} = \frac{\text{விம்பம்}}{M}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$\frac{8}{400}\ \text{mm}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$= 0.02\ \text{mm} = 20\ \mu\text{m}$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**20 µm**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- mm → µm (× 1000).

</details>

### CL-MICRO-3 · பரீட்சைத் தரம்

<!-- meta {"type":"worked_example","id":"CL-MICRO-3","level":"பரீட்சைத் தரம்","answer":400.0,"unit":"மடங்கு","verified":true,"hints":["ஒரே அலகு."]} -->

**வினா:** படத்தில் 30 mm நீளமுள்ள கலம் உண்மையில் 0.075 mm. படத்தின் உருப்பெருக்கம்?

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

படத்தில் 30 mm நீளமுள்ள கலம் உண்மையில் 0.075 mm. படத்தின் உருப்பெருக்கம்?

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

விம்பம் = 30 mm; உண்மை = 0.075 mm

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

M

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$M = \frac{\text{விம்பம்}}{\text{உண்மை}}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$\frac{30}{0.075}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$M = 400$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**400 மடங்கு**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- ஒரே அலகு.

</details>

### CL-MICRO-4 · சவால்

<!-- meta {"type":"worked_example","id":"CL-MICRO-4","level":"சவால்","answer":400.0,"unit":"µm","verified":true,"hints":["விட்டத்தைக் கல எண்ணால் வகுக்க."]} -->

**வினா:** ×100 இல் பார்வைப் புலத்தின் விட்டம் 2 mm; அதைக் குறுக்காக 5 கலங்கள் நிரப்புகின்றன. ஒரு கலத்தின் உண்மை நீளம் (µm)? (புல விட்டம் உண்மை அளவாகத் தரப்பட்டுள்ளது)

<details><summary>படி 1: வினாவை வாசித்தல்</summary>

×100 இல் பார்வைப் புலத்தின் விட்டம் 2 mm; அதைக் குறுக்காக 5 கலங்கள் நிரப்புகின்றன. ஒரு கலத்தின் உண்மை நீளம் (µm)? (புல விட்டம் உண்மை அளவாகத் தரப்பட்டுள்ளது)

</details>

<details><summary>படி 2: தரவுகளைப் பட்டியலிடல்</summary>

புலம் = 2 mm; கலங்கள் = 5

</details>

<details><summary>படி 3: காண வேண்டியது</summary>

நீளம்

</details>

<details><summary>படி 4: அலகு மாற்றம்</summary>

தேவையில்லை (அலகுகள் ஏற்கனவே SI / பொருந்துகின்றன).

</details>

<details><summary>படி 5: சூத்திரத் தெரிவு</summary>

$\text{நீளம்} = \frac{\text{புல விட்டம்}}{n}$

</details>

<details><summary>படி 6: பிரதியீடு</summary>

$\frac{2}{5}\ \text{mm}$

</details>

<details><summary>படி 7: கணிப்பு</summary>

$= 0.4\ \text{mm} = 400\ \mu\text{m}$

</details>

<details><summary>படி 8: விடை, அலகு, விளக்கம்</summary>

**400 µm**

</details>

<details><summary>குறிப்புகள் (hints)</summary>

- விட்டத்தைக் கல எண்ணால் வகுக்க.

</details>
---

## வரையறைகள் (Limitations)

- 22 கணிப்பு வகைகள், 88 தீர்க்கப்பட்ட உதாரணங்கள்.
- படிகளை ஒவ்வொன்றாக வெளிப்படுத்தல், மாணவர் விடை உள்ளீடு, தானியங்கிச் சரிபார்ப்பு ஆகியவை இணையத்தளத்தில் உருவாக்கப்பட வேண்டும்; meta JSON இல் விடையும் அலகும் உள்ளன.
- வில்லைச் சூத்திரம் சரிபார்ப்புக்காக மட்டும்; O/L இல் கதிர் வரிப்படமே பிரதானம். குறியீட்டு மரபு (கார்ட்டீசியன் / பருமன்) பாடநூலுடன் ஆசிரியர் உறுதிப்படுத்துக.
