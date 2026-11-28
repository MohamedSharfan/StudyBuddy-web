"""Valid shortcuts with machine-checked worked examples, plus exam strategy text (bilingual)."""
from core import T
from fractions import Fraction as Fr

def K(id, name, how, why, when, whennot, exam, q, steps, ans, check):
    assert check(), id
    return dict(id=id, name=T(*name), how=T(*how), why=T(*why), when=T(*when), whennot=T(*whennot), exam=T(*exam), q=T(*q), steps=[(T(a, b), w) for a, b, w in steps], ans=ans)

TRICKS = [
 K("TR-01", ("Squares near a round number", "வட்ட எண்ணுக்கு அண்மையான வர்க்கங்கள்"), ("Write the number as (round ± small) and use (a ± b)² = a² ± 2ab + b².", "எண்ணை (வட்ட எண் ± சிறியது) என எழுதி (a ± b)² பயன்படுத்துக."),
   ("It is just the binomial identity.", "இது ஈருறுப்புச் சர்வசமன்பாடே."), ("Numbers close to 50, 100, 200…", "50, 100, 200… க்கு அண்மையான எண்கள்."), ("Numbers far from a round number — normal multiplication is faster.", "வட்ட எண்ணுக்குத் தொலைவானவை — சாதாரண பெருக்கல் விரைவானது."),
   ("Valid; write the expansion line as working.", "செல்லுபடியானது; விரிவு வரியை வேலையாக எழுதுக."), ("Find 98².", "98² ஐக் காண்க."),
   [("Write 98 = 100 − 2.", "98 = 100 − 2.", r"98^2 = (100-2)^2"), ("Expand.", "விரிக்க.", r"= 10000 - 400 + 4"), ("Calculate.", "கணிக்க.", r"= 9604")], r"9604", lambda: 98 ** 2 == 9604),
 K("TR-02", ("Difference of squares for products", "பெருக்கங்களுக்கு வர்க்க வித்தியாசம்"), ("If two numbers are equally spaced around a middle number m: (m + k)(m − k) = m² − k².", "இரு எண்கள் m ஐச் சுற்றிச் சம இடைவெளியில்: (m + k)(m − k) = m² − k²."),
   ("Expanding (m + k)(m − k) cancels the middle terms.", "(m + k)(m − k) விரிவில் நடு உறுப்புகள் நீங்கும்."), ("53 × 47, 102 × 98 …", "53 × 47, 102 × 98 …"), ("When the middle number is awkward.", "நடு எண் கடினமாக இருக்கும்போது."),
   ("Valid; show m² − k².", "செல்லுபடியானது; m² − k² காட்டுக."), ("Find 53 × 47.", "53 × 47 ஐக் காண்க."),
   [("Middle number 50, distance 3.", "நடு எண் 50, தூரம் 3.", r"53\times47 = (50+3)(50-3)"), ("Use a² − b².", "a² − b².", r"= 2500 - 9"), ("Calculate.", "கணிக்க.", r"= 2491")], "2491", lambda: 53 * 47 == 2491),
 K("TR-03", ("Cancel 7 before multiplying by 22/7", "22/7 ஆல் பெருக்குமுன் 7 ஐ நீக்குக"), ("When r (or r², rh) contains 7, cancel the 7 first.", "r (அல்லது r², rh) இல் 7 இருந்தால் முதலில் 7 ஐ நீக்குக."),
   ("Multiplication order does not matter.", "பெருக்கல் ஒழுங்கு முக்கியமல்ல."), ("Circle, cylinder, cone calculations with π = 22/7.", "π = 22/7 உடன் வட்டம், உருளை, கூம்பு."), ("When the question says π = 3.14.", "π = 3.14 எனக் கேட்கும்போது."),
   ("Valid.", "செல்லுபடியானது."), ("Area of a circle of radius 14 cm (π = 22/7).", "ஆரை 14 cm வட்டப் பரப்பு (π = 22/7)."),
   [("Write the formula.", "சூத்திரம்.", r"\frac{22}{7}\times14\times14"), ("Cancel 7 into 14.", "7 ஐ 14 உடன் நீக்குக.", r"= 22\times2\times14"), ("Multiply.", "பெருக்குக.", r"= 616\ \text{cm}^2")], r"616\ \text{cm}^2", lambda: Fr(22, 7) * 14 * 14 == 616),
 K("TR-04", ("Percentage multipliers", "சதவீதப் பெருக்கிகள்"), ("Increase by p% → multiply by (100 + p)/100; decrease → (100 − p)/100.", "p% அதிகரிப்பு → (100 + p)/100 ஆல் பெருக்கு; குறைவு → (100 − p)/100."),
   ("Original + p% of original = original × (1 + p/100).", "மூலம் + மூலத்தின் p% = மூலம் × (1 + p/100)."), ("VAT, discount, profit, compound interest.", "VAT, கழிவு, இலாபம், கூட்டுவட்டி."), ("When the question asks for the increase itself (not the new total).", "அதிகரிப்பை மட்டும் கேட்கும்போது."),
   ("Valid; write the multiplier step.", "செல்லுபடியானது; பெருக்கிப் படியை எழுதுக."), ("A price of Rs. 2400 increases by 15%. Find the new price.", "ரூ. 2400 விலை 15% அதிகரிக்கிறது. புதிய விலை?"),
   [("Multiplier.", "பெருக்கி.", r"\frac{115}{100}"), ("Multiply.", "பெருக்குக.", r"2400\times\frac{115}{100} = 24\times115"), ("Calculate.", "கணிக்க.", r"= 2760")], r"\text{Rs. }2760", lambda: 2400 * 115 // 100 == 2760),
 K("TR-05", ("Compound interest by repeated multiplier", "மீள்பெருக்கியால் கூட்டுவட்டி"), ("Multiply by (1 + R/100) once for each year.", "ஒவ்வொரு வருடத்துக்கும் (1 + R/100) ஆல் ஒருமுறை பெருக்குக."),
   ("Each year's amount becomes the next year's principal.", "ஒவ்வொரு வருடத் தொகையும் அடுத்த வருட முதலாகும்."), ("2–3 years at a simple rate like 10%.", "10% போன்ற எளிய வீதத்தில் 2–3 வருடங்கள்."), ("If the rate changes each year, use a table.", "வீதம் வருடாவருடம் மாறினால் அட்டவணை."),
   ("Valid; examiners also accept year-by-year tables.", "செல்லுபடியானது; வருடவாரி அட்டவணையும் ஏற்கப்படும்."), ("Rs. 50 000 at 10% compound interest for 2 years: total amount?", "ரூ. 50 000, 10% கூட்டுவட்டி, 2 வருடம்: மொத்தம்?"),
   [("Year 1.", "வருடம் 1.", r"50000\times1.1 = 55000"), ("Year 2.", "வருடம் 2.", r"55000\times1.1 = 60500")], r"\text{Rs. }60\,500", lambda: abs(50000 * 1.1 * 1.1 - 60500) < 1e-6),
 K("TR-06", ("Check factorisation by substituting x = 1", "x = 1 பிரதியிட்டுக் காரணிப்படுத்தலைச் சரிபார்த்தல்"), ("Put x = 1 (or 2) into the original and your factors — the values must match.", "மூலத்திலும் காரணிகளிலும் x = 1 (அல்லது 2) இடுக — பெறுமானங்கள் பொருந்த வேண்டும்."),
   ("Equal expressions give equal values for every x.", "சமமான கோவைகள் எல்லா x க்கும் சம பெறுமானம்."), ("After any factorising or expanding.", "காரணிப்படுத்தல்/விரிவுக்குப் பின்."), ("A match for one x does not prove it — try two values if unsure.", "ஒரு x பொருந்துவது நிறுவலல்ல — சந்தேகமெனில் இரு பெறுமானங்கள்."),
   ("A private check only — do not write it as the answer.", "தனிப்பட்ட சரிபார்ப்பு — விடையாக எழுத வேண்டாம்."), ("Check x² + 5x + 6 = (x + 2)(x + 3).", "x² + 5x + 6 = (x + 2)(x + 3) ஐச் சரிபார்க்க."),
   [("Original at x = 1.", "x = 1 இல் மூலம்.", r"1+5+6 = 12"), ("Factors at x = 1.", "x = 1 இல் காரணிகள்.", r"3\times4 = 12\ \checkmark")], r"\text{consistent}", lambda: 1 + 5 + 6 == 3 * 4),
 K("TR-07", ("Sum of an AP with n/2 (first + last)", "n/2 (முதல் + இறுதி) மூலம் கூ.வி. கூட்டுத்தொகை"), ("If you know the last term, Sₙ = n/2 (a + l).", "இறுதி உறுப்பு தெரிந்தால் Sₙ = n/2 (a + l)."),
   ("Pairing first and last terms gives equal pair sums.", "முதல்–இறுதி சோடிகள் சம கூட்டுத்தொகை தரும்."), ("Last term is given or easy.", "இறுதி உறுப்பு தரப்பட்டது/எளிது."), ("When only a, d, n are known — use the other formula.", "a, d, n மட்டும் தெரிந்தால் மற்றச் சூத்திரம்."),
   ("Valid formula.", "செல்லுபடியான சூத்திரம்."), ("Find 1 + 2 + 3 + … + 100.", "1 + 2 + … + 100 ஐக் காண்க."),
   [("a = 1, l = 100, n = 100.", "a = 1, l = 100, n = 100.", r"S = \frac{100}{2}(1+100)"), ("Calculate.", "கணிக்க.", r"= 50\times101 = 5050")], "5050", lambda: sum(range(1, 101)) == 5050),
 K("TR-08", ("'At least one' using the complement", "நிரப்பியால் 'குறைந்தது ஒன்று'"), ("P(at least one) = 1 − P(none).", "P(குறைந்தது ஒன்று) = 1 − P(எதுவுமில்லை)."),
   ("'At least one' and 'none' are complements.", "'குறைந்தது ஒன்று', 'எதுவுமில்லை' நிரப்பிகள்."), ("Many outcomes are favourable.", "பல விளைவுகள் சாதகமானவை."), ("When 'exactly one' is asked.", "'சரியாக ஒன்று' கேட்கும்போது."),
   ("Valid; write 1 − P(none).", "செல்லுபடியானது; 1 − P(எதுவுமில்லை) எழுதுக."), ("Two fair dice are rolled. P(at least one six)?", "இரு தாயக்கட்டைகள். P(குறைந்தது ஒரு ஆறு)?"),
   [("P(no six on one die).", "ஒரு கட்டையில் ஆறு இல்லை.", r"\frac56"), ("P(no six on both).", "இரண்டிலும் இல்லை.", r"\frac56\times\frac56 = \frac{25}{36}"), ("Complement.", "நிரப்பி.", r"1 - \frac{25}{36} = \frac{11}{36}")], r"\frac{11}{36}", lambda: sum(1 for a in range(1, 7) for b in range(1, 7) if 6 in (a, b)) == 11),
 K("TR-09", ("Spot Pythagorean triples", "பைதகரசு மும்மைகளை இனங்காணல்"), ("3-4-5, 5-12-13, 8-15-17, 7-24-25 and their multiples.", "3-4-5, 5-12-13, 8-15-17, 7-24-25, அவற்றின் மடங்குகள்."),
   ("Multiplying all sides by k keeps a² + b² = c².", "எல்லாப் பக்கங்களையும் k ஆல் பெருக்கினாலும் a² + b² = c²."), ("Right triangles with whole-number sides.", "முழு எண் பக்கங்களுடைய செங்கோண முக்கோணிகள்."), ("Non-right triangles; non-matching ratios.", "செங்கோணமல்லாதவை."),
   ("Still show c² = a² + b² as working in exams.", "பரீட்சையில் c² = a² + b² ஐ வேலையாகக் காட்டுக."), ("Legs 15 cm and 20 cm. Hypotenuse?", "பக்கங்கள் 15 cm, 20 cm. செம்பக்கம்?"),
   [("15 = 5 × 3, 20 = 5 × 4 → 3-4-5 × 5.", "15 = 5 × 3, 20 = 5 × 4.", r"c = 5\times5"), ("Working line.", "வேலை வரி.", r"c^2 = 225 + 400 = 625 \Rightarrow c = 25")], r"25\ \text{cm}", lambda: 15 ** 2 + 20 ** 2 == 25 ** 2),
 K("TR-10", ("Estimate before using log tables", "மடக்கை அட்டவணைக்கு முன் மதிப்பிடல்"), ("Round each number to 1 significant figure and calculate roughly.", "ஒவ்வொரு எண்ணையும் 1 பொ.இ. க்கு மட்டந்தட்டி அண்ணளவாகக் கணிக்க."),
   ("Catches a wrong characteristic (decimal point error).", "பிழையான சிறப்பியல்பைப் பிடிக்கும்."), ("Every log-table calculation.", "ஒவ்வொரு மடக்கைக் கணிப்பும்."), ("Never replace the log working with the estimate.", "மதிப்பீட்டால் மடக்கை வேலையை மாற்ற வேண்டாம்."),
   ("A check only.", "சரிபார்ப்பு மட்டும்."), ("Is 40.5 a sensible value for 3.24 × 12.5?", "3.24 × 12.5 க்கு 40.5 பொருத்தமானதா?"),
   [("Round.", "மட்டந்தட்டல்.", r"3\times 10 = 30\ \text{to}\ 3\times13 = 39"), ("Compare.", "ஒப்பிடுக.", r"40.5 \approx 40\ \checkmark")], r"\text{sensible}", lambda: abs(3.24 * 12.5 - 40.5) < 1e-9),
 K("TR-11", ("Turning point from symmetric table values", "சமச்சீர் அட்டவணையிலிருந்து திரும்பற் புள்ளி"), ("Find two x-values with the same y; the turning point x is halfway.", "ஒரே y உடைய இரு x; திரும்பற் புள்ளியின் x அவற்றின் நடு."),
   ("A parabola is symmetric about its axis.", "பரவளைவு அதன் அச்சு பற்றிச் சமச்சீர்."), ("Quadratic graph questions in Paper II.", "வினாத்தாள் II இருபடி வரைபு வினாக்கள்."), ("Not for straight lines.", "நேர்கோடுகளுக்கல்ல."),
   ("Valid; also checks your table.", "செல்லுபடியானது; அட்டவணையையும் சரிபார்க்கும்."), ("For y = x² − 2x − 3, y = 5 at x = −2 and x = 4. Turning point x?", "y = x² − 2x − 3 இல் x = −2, 4 இல் y = 5. திரும்பற் புள்ளி x?"),
   [("Halfway.", "நடு.", r"x = \frac{-2+4}{2} = 1"), ("Substitute.", "பிரதியிடுக.", r"y = 1 - 2 - 3 = -4")], r"(1,\,-4)", lambda: (lambda f: f(-2) == f(4) == 5 and f(1) == -4)(lambda x: x * x - 2 * x - 3)),
 K("TR-12", ("Back-substitute to verify solutions", "தீர்வுகளை மீளப் பிரதியிட்டுச் சரிபார்த்தல்"), ("Put your answers back into the ORIGINAL equation(s).", "விடைகளை மூலச் சமன்பாடு(களு)க்குள் இடுக."),
   ("A true solution makes both sides equal.", "உண்மையான தீர்வு இருபுறத்தையும் சமமாக்கும்."), ("Linear, simultaneous, quadratic equations.", "நேர்கோட்டு, ஒருங்கமை, இருபடிச் சமன்பாடுகள்."), ("—", "—"),
   ("Recommended; costs 30 seconds.", "பரிந்துரைக்கப்பட்டது; 30 விநாடிகள்."), ("Check x = 2, y = 3 for 2x + 3y = 13 and 3x − 2y = 0.", "2x + 3y = 13, 3x − 2y = 0 க்கு x = 2, y = 3 ஐச் சரிபார்க்க."),
   [("First equation.", "முதல் சமன்பாடு.", r"2(2)+3(3) = 13\ \checkmark"), ("Second equation.", "இரண்டாம் சமன்பாடு.", r"3(2)-2(3) = 0\ \checkmark")], r"\text{correct}", lambda: 2 * 2 + 3 * 3 == 13 and 3 * 2 - 2 * 3 == 0),
]

# Exam-strategy text blocks (bilingual bullet lists)
def B(*pairs): return [T(a, b) for a, b in pairs]

SECTIONS = {
 "P1A": dict(time=("About 1 hour for 25 questions — roughly 2 minutes each.", "25 வினாக்களுக்கு சுமார் 1 மணி — ஒவ்வொன்றுக்கும் சுமார் 2 நிமிடம்."),
   tips=B(("Answer on the paper; write one or two lines of working — 1 of the 2 marks is often for the method.", "வினாத்தாளிலேயே விடை; ஓரிரு வரி வேலை — 2 புள்ளிகளில் 1 முறைக்கு வழங்கப்படுவது வழக்கம்."),
          ("Do the quick ones first (logs, LCM, factorising, probability), mark hard ones and return.", "விரைவானவற்றை முதலில் (மடக்கை, பொ.ம.சி., காரணி, நிகழ்தகவு); கடினமானவற்றைக் குறித்துத் திரும்புக."),
          ("Circle-angle questions: write the theorem name next to each angle.", "வட்டக் கோண வினாக்கள்: ஒவ்வொரு கோணத்துக்கும் தேற்றப் பெயர்."),
          ("Last question has been a locus/construction sketch — draw neat construction lines.", "இறுதி வினா ஒழுக்கு/அமைப்பு வரைபடமாக இருந்துள்ளது — நேர்த்தியான அமைப்புக் கோடுகள்."))),
 "P1B": dict(time=("About 1 hour for 5 questions — 10–12 minutes each.", "5 வினாக்களுக்கு சுமார் 1 மணி — ஒவ்வொன்றுக்கும் 10–12 நிமிடம்."),
   tips=B(("All five are compulsory and follow a stable order in verified papers: fractions → mensuration → finance → statistics → probability (2018 swapped the last two and used a distance–time graph for Q2).", "ஐந்தும் கட்டாயம்; சரிபார்த்த வினாத்தாள்களில் ஒழுங்கு: பின்னம் → அளவீடு → நிதி → புள்ளிவிபரம் → நிகழ்தகவு (2018 இல் இறுதி இரண்டும் மாறின; வினா 2 தூர–நேர வரைபு)."),
          ("Each part (i), (ii), (iii) often uses the previous answer — if one part is wrong, still continue with your value.", "(i), (ii), (iii) முந்திய விடையைப் பயன்படுத்தும் — ஒன்று பிழையெனினும் உங்கள் பெறுமானத்துடன் தொடர்க."),
          ("Graphs and charts: use a sharp pencil and the given scale.", "வரைபுகள்: கூரிய பென்சில், தரப்பட்ட அளவிடை."))),
 "P2A": dict(time=("Paper II: 3 hours for 10 questions → about 17 minutes each; use the 10 minutes reading time to choose.", "வினாத்தாள் II: 10 வினாக்களுக்கு 3 மணி → ஒவ்வொன்றுக்கும் சுமார் 17 நிமிடம்; 10 நிமிட வாசிப்பு நேரத்தில் தெரிவு செய்க."),
   tips=B(("Choose 5 of 6. Verified papers always had: a finance question, a quadratic graph, algebra (simultaneous equations), a quadratic word problem or mensuration, trigonometry/bearings, and a grouped-mean question.", "6 இல் 5. சரிபார்த்த வினாத்தாள்களில்: நிதி, இருபடி வரைபு, அட்சரகணிதம், இருபடிச் சொற்கணக்கு/அளவீடு, திரிகோணகணிதம்/திசைகோள், கூட்டமாக்கிய இடை."),
          ("The grouped-mean and graph questions are method-heavy and reliable for Foundation and Grade Improvement students.", "கூட்டமாக்கிய இடை, வரைபு வினாக்கள் முறை சார்ந்தவை; அடிப்படை, தர மேம்பாட்டு மாணவர்களுக்கு நம்பகமானவை."),
          ("Start each question on a new page; number parts clearly.", "ஒவ்வொரு வினாவையும் புதிய பக்கத்தில்; பகுதிகளைத் தெளிவாக இலக்கமிடுக."))),
 "P2B": dict(time=("About 17 minutes per question; proofs can take longer — keep 15 minutes at the end to check.", "வினாவுக்கு சுமார் 17 நிமிடம்; நிறுவல்கள் கூடுதல் நேரம் — இறுதியில் 15 நிமிடம் சரிபார்க்க."),
   tips=B(("Choose 5 of 6. Verified papers had: progressions (Q7), constructions (Q8), two proof questions, a Venn diagram (Q11), and volume/trigonometry/tangent questions.", "6 இல் 5. சரிபார்த்த வினாத்தாள்களில்: விருத்திகள் (வி7), அமைப்புகள் (வி8), இரு நிறுவல் வினாக்கள், வென் (வி11), கனவளவு/திரிகோணம்/தொடலி."),
          ("Progressions, constructions and Venn diagrams are method-based — practise them until automatic.", "விருத்திகள், அமைப்புகள், வென் — முறை சார்ந்தவை; தன்னியக்கமாகும் வரை பயிற்சி."),
          ("In proofs, every correct statement with a reason can earn marks even if you cannot finish.", "நிறுவல்களில் முடிக்காவிடினும் காரணத்துடனான ஒவ்வொரு சரியான கூற்றுக்கும் புள்ளி கிடைக்கலாம்."))),
}

GENERAL = {
 "partial": B(("Write the formula first, then substitute — method marks are given even if arithmetic slips.", "முதலில் சூத்திரம், பின் பிரதியீடு — கணக்குப் பிழையிருந்தாலும் முறைக்குப் புள்ளி."),
              ("Never leave a question blank: a correct first step (table, diagram, equation) is worth trying.", "வினாவை வெறுமையாக விட வேண்டாம்: சரியான முதற்படி (அட்டவணை, படம், சமன்பாடு) முயற்சிக்கத் தக்கது."),
              ("Carry your own answer forward to later parts.", "உங்கள் விடையை அடுத்த பகுதிகளுக்குக் கொண்டு செல்க."),
              ("Exact mark allocations inside a question come from the official marking scheme; StudyBuddy does not invent them.", "வினாவுக்குள் புள்ளிப் பகிர்வு அதிகாரபூர்வ புள்ளித்திட்டத்திலிருந்தே; StudyBuddy அவற்றை உருவாக்கவில்லை.")),
 "verify": B(("Substitute answers back into equations.", "விடைகளைச் சமன்பாடுகளில் மீளப் பிரதியிடுக."), ("Estimate before log-table work.", "மடக்கைக்கு முன் மதிப்பிடுக."),
             ("Check that probabilities are between 0 and 1, angles in a triangle total 180°, pie angles total 360°.", "நிகழ்தகவு 0–1, முக்கோணக் கோணங்கள் 180°, வட்ட வரைபு 360° எனச் சரிபார்க்க."), ("Check lengths are positive and sensible.", "நீளங்கள் நேரும் பொருத்தமுமானவையா?")),
 "rounding": B(("Round only at the end; keep 4-figure table values in working.", "இறுதியில் மட்டும் மட்டந்தட்டுக; வேலையில் 4 இலக்க அட்டவணைப் பெறுமானங்கள்."), ("Follow the instruction: 'to the nearest whole number', '1 d.p.', '3 s.f.'.", "அறிவுறுத்தலைப் பின்பற்றுக: 'அண்மிய முழு எண்', '1 தசமதானம்', '3 பொ.இ.'."),
               ("Money: two decimal places or whole rupees as the question uses.", "பணம்: வினாவின்படி இரு தசமதானம் அல்லது முழு ரூபாய்.")),
 "units": B(("Area cm², volume cm³, 1 L = 1000 cm³, 1 m = 100 cm.", "பரப்பு cm², கனவளவு cm³, 1 L = 1000 cm³, 1 m = 100 cm."), ("Convert to the same unit before calculating.", "கணிக்குமுன் ஒரே அலகுக்கு மாற்றுக."), ("Write units in the final answer.", "இறுதி விடையில் அலகு.")),
 "graph": B(("Use the scale given; label axes.", "தரப்பட்ட அளவிடை; அச்சுகளுக்குப் பெயர்."), ("Plot with small crosses or dots; join quadratics with a smooth freehand curve.", "சிறு குறுக்குகள்/புள்ளிகள்; இருபடிகளை மென்மையான வளைவால் இணைக்க."),
            ("Show dashed reading lines for every value you read.", "வாசிக்கும் ஒவ்வொரு பெறுமானத்துக்கும் குற்றுக் கோடுகள்."), ("Read to the accuracy of the grid (usually 0.1 or 0.2).", "நெய்யரியின் துல்லியத்துக்கு வாசிக்க (பொதுவாக 0.1 அல்லது 0.2).")),
 "construction": B(("Sharp pencil, firm compass, clean ruler.", "கூரிய பென்சில், இறுக்கமான கவராயம், சுத்தமான அளவுகோல்."), ("Never erase construction arcs.", "அமைப்பு விற்களை அழிக்க வேண்டாம்."),
                   ("Draw a labelled rough sketch first.", "முதலில் பெயரிட்ட வரைபடம்."), ("Measure answers to the nearest mm/degree.", "அண்மிய mm/பாகைக்கு அளக்க.")),
 "proof": B(("Copy the figure and mark the given facts.", "படத்தை நகலெடுத்துத் தரவுகளைக் குறிக்க."), ("One statement per line with its reason in brackets.", "ஒரு வரிக்கு ஒரு கூற்று, அடைப்பில் காரணம்."),
            ("Name theorems (e.g. 'angles in the same segment').", "தேற்றங்களைப் பெயரிடுக (உ-ம் 'ஒரே துண்டக் கோணங்கள்')."), ("End with the exact statement asked for.", "கேட்ட கூற்றுடன் முடிக்க.")),
}

PATHWAY_GUIDE = {
 "F": B(("Master the method-based questions first: Paper I Part B fractions, probability, statistics; Paper II grouped mean, quadratic graph, constructions, AP, Venn.", "முறை சார்ந்த வினாக்களை முதலில்: வினாத்தாள் I பகுதி B பின்னம், நிகழ்தகவு, புள்ளிவிபரம்; வினாத்தாள் II இடை, இருபடி வரைபு, அமைப்புகள், கூ.வி., வென்."),
        ("Practise prerequisite skills daily: fractions, negative numbers, squaring, substitution.", "முன்தேவைத் திறன்கள் தினமும்: பின்னம், மறை எண்கள், வர்க்கம், பிரதியீடு."),
        ("Always write the formula and a first step — this builds partial marks.", "எப்போதும் சூத்திரமும் முதற்படியும் — பகுதிப் புள்ளிகள்."),
        ("Track confidence: aim for steady progress, not perfection. Studying selected topics does not guarantee a pass.", "நம்பிக்கை: முழுமையல்ல, நிலையான முன்னேற்றம். தெரிந்த தலைப்புகளை மட்டும் கற்பது சித்தியை உறுதிப்படுத்தாது.")),
 "G": B(("Aim for consistent accuracy: re-check every calculation line.", "நிலையான துல்லியம்: ஒவ்வொரு கணிப்பு வரியையும் சரிபார்க்க."), ("Learn to recognise question patterns quickly (File 07).", "வினா அமைப்புகளை விரைவாக இனங்காண (கோப்பு 07)."),
        ("Time yourself: 2 min per Part A question, 17 min per Paper II question.", "நேரம்: பகுதி A க்கு 2 நிமி, வினாத்தாள் II க்கு 17 நிமி."), ("Keep an error log and redo wrong questions after a week.", "பிழைப் பதிவேடு; ஒரு வாரத்தின் பின் மீளச் செய்க.")),
 "A": B(("Do full papers under timed conditions; target finishing with 15 minutes to check.", "நேரக் கட்டுப்பாட்டில் முழு வினாத்தாள்கள்; சரிபார்க்க 15 நிமிடம் மிச்சம்."), ("Master proofs and combined-topic questions (logs + volume; tangents + similar triangles).", "நிறுவல்கள், இணைந்த தலைப்பு வினாக்கள்."),
        ("Use efficient methods (multipliers, identities) but keep full working.", "திறமையான முறைகள், ஆனால் முழு வேலையும்."), ("Verify every answer quickly with estimation or substitution.", "மதிப்பீடு/பிரதியீட்டால் ஒவ்வொரு விடையையும் சரிபார்க்க.")),
}

CHECKLIST = B(("I know the four sections and how many questions to answer in each.", "நான்கு பகுதிகளையும் ஒவ்வொன்றிலும் விடையளிக்கும் வினா எண்ணிக்கையையும் அறிவேன்."),
              ("I have practised every pattern in File 07 at least once.", "கோப்பு 07 இன் ஒவ்வொரு அமைப்பையும் குறைந்தது ஒருமுறை பயிற்சி செய்தேன்."),
              ("I can draw a quadratic graph from a table in 15 minutes.", "அட்டவணையிலிருந்து 15 நிமிடத்தில் இருபடி வரைபு வரைவேன்."),
              ("I can do the basic constructions without looking at notes.", "குறிப்புகளின்றி அடிப்படை அமைப்புகளைச் செய்வேன்."),
              ("I can use log tables, including bar characteristics.", "கோட்டுச் சிறப்பியல்பு உட்பட மடக்கை அட்டவணையைப் பயன்படுத்துவேன்."),
              ("I have a geometry-set, calculator-free practice and know the exam instructions.", "கேத்திரகணிதப் பெட்டி உள்ளது; கணிப்பானின்றிப் பயிற்சி; பரீட்சை அறிவுறுத்தல்களை அறிவேன்."),
              ("I have completed at least 3 full timed papers.", "குறைந்தது 3 முழு நேரக்கட்டுப்பாட்டு வினாத்தாள்கள் செய்தேன்."))
