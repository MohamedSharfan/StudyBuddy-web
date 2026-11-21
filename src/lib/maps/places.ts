/**
 * Places used in History map-marking practice. Client-safe.
 *
 * `at` is [latitude, longitude]. Rivers also have `line` (source → mouth, through known towns and reservoirs),
 * so a tap anywhere near the river counts. `r` is how close (km) a tap must be to count as correct.
 * Coordinates come from Wikipedia / OpenStreetMap records; rivers follow their recorded course and mouth.
 */

export type PlaceKind =
  | "city"
  | "port"
  | "temple"
  | "fort"
  | "battle"
  | "site"
  | "tank"
  | "dam"
  | "river"
  | "area"
  | "island"
  | "country"
  | "sea"
  | "mountain";

export type Place = {
  id: string;
  en: string;
  ta: string;
  kind: PlaceKind;
  at: [number, number];
  line?: [number, number][];
  r?: number;
  noteEn?: string;
  noteTa?: string;
};

const L = (
  id: string,
  en: string,
  ta: string,
  kind: PlaceKind,
  at: [number, number],
  extra: Partial<Place> = {},
): Place => ({ id, en, ta, kind, at, ...extra });

/** Sri Lanka */
export const LANKA_PLACES: Place[] = [
  // Cities, capitals and towns
  L("colombo", "Colombo", "கொழும்பு", "city", [6.934, 79.843], { noteEn: "Main port; Portuguese and Dutch fort.", noteTa: "பிரதான துறைமுகம்; போர்த்துக்கேய, ஒல்லாந்தர் கோட்டை." }),
  L("kandy", "Kandy (Senkadagala)", "கண்டி (செங்கடகல)", "city", [7.293, 80.635], { noteEn: "Capital of the Kandyan kingdom.", noteTa: "கண்டி இராச்சியத்தின் தலைநகர்." }),
  L("galle", "Galle (Gimhathittha)", "காலி (கிம்ஹதித்த)", "port", [6.033, 80.216], { noteEn: "Ancient port; Dutch fort.", noteTa: "பண்டைய துறைமுகம்; ஒல்லாந்தர் கோட்டை." }),
  L("jaffna", "Jaffna", "யாழ்ப்பாணம்", "city", [9.665, 80.017]),
  L("nallur", "Nallur", "நல்லூர்", "city", [9.667, 80.033], { noteEn: "Capital of the Jaffna kingdom.", noteTa: "யாழ்ப்பாண இராச்சியத்தின் தலைநகர்." }),
  L("mannar", "Mannar town", "மன்னார் நகரம்", "city", [8.977, 79.904], { noteEn: "Portuguese and Dutch fort.", noteTa: "போர்த்துக்கேய, ஒல்லாந்தர் கோட்டை." }),
  L("mannar-island", "Mannar Island", "மன்னார் தீவு", "island", [9.05, 79.833], { r: 20 }),
  L("trincomalee", "Trincomalee (Gokanna)", "திருகோணமலை (கோகண்ண)", "port", [8.567, 81.233], { noteEn: "Gokanna, the great ancient harbour of the east coast.", noteTa: "கோகண்ண – கிழக்குக் கரையின் பண்டைய பெருந்துறைமுகம்." }),
  L("fort-frederick", "Fort Frederick (Trincomalee)", "பெட்ரிக் கோட்டை (திருகோணமலை)", "fort", [8.578, 81.236], { noteEn: "First Dutch fort taken by the British (1795).", noteTa: "1795 இல் ஒல்லாந்தரிடமிருந்து பிரித்தானியர் கைப்பற்றிய முதல் கோட்டை." }),
  L("koneswaram", "Koneswaram temple", "கோணேஸ்வரம் கோவில்", "temple", [8.582, 81.246]),
  L("batticaloa", "Batticaloa", "மட்டக்களப்பு", "city", [7.717, 81.7], { noteEn: "Dutch fort; taken from the Portuguese in 1638.", noteTa: "ஒல்லாந்தர் கோட்டை; 1638 இல் கைப்பற்றப்பட்டது." }),
  L("anuradhapura", "Anuradhapura", "அநுராதபுரம்", "city", [8.335, 80.411], { noteEn: "First great capital (Rajarata).", noteTa: "முதல் நகராக்கம்; இராசரட்டைத் தலைநகர்." }),
  L("polonnaruwa", "Polonnaruwa (Pulathisipura)", "பொலன்னறுவை (புலதிசிபுர)", "city", [7.94, 81.0], { noteEn: "Capital of Vijayabahu I and Parakramabahu I.", noteTa: "முதலாம் விஜயபாகு, முதலாம் பராக்கிரமபாகு ஆகியோரின் தலைநகர்." }),
  L("mihintale", "Mihintale", "மிகிந்தலை", "site", [8.351, 80.517], { noteEn: "Where Arahat Mahinda met King Devanampiyatissa.", noteTa: "மகிந்த தேரர் தேவநம்பியதீசனைச் சந்தித்த இடம்." }),
  L("kurunegala", "Kurunegala", "குருணாகல்", "city", [7.483, 80.367], { noteEn: "Capital from 1293 (Buvanekabahu II).", noteTa: "1293 இலிருந்து தலைநகர் (இரண்டாம் புவனேகபாகு)." }),
  L("gampola", "Gampola", "கம்பளை", "city", [7.165, 80.577], { noteEn: "Capital in the 14th century (Buvanekabahu IV, 1341).", noteTa: "14ஆம் நூற்றாண்டுத் தலைநகர் (நான்காம் புவனேகபாகு, 1341)." }),
  L("kotte", "Kotte (Sri Jayawardhanapura)", "கோட்டை (ஸ்ரீ ஜயவர்த்தனபுர)", "city", [6.903, 79.905], { noteEn: "Capital of Parakramabahu VI (1415–1467).", noteTa: "ஆறாம் பராக்கிரமபாகுவின் தலைநகர் (1415–1467)." }),
  L("seethawaka", "Seethawaka", "சீதாவாக்கை", "city", [6.953, 80.218], { noteEn: "Kingdom of Mayadunne and Rajasinghe I.", noteTa: "மாயாதுன்னை, முதலாம் இராஜசிங்கனின் இராச்சியம்." }),
  L("raigama", "Raigama", "றைகம", "city", [6.72, 80.01]),
  L("dambadeniya", "Dambadeniya", "தம்பதெனியா", "city", [7.367, 80.15], { noteEn: "First capital after 1215 (Vijayabahu III, Parakramabahu II).", noteTa: "1215 இன் பின் முதல் தலைநகர்." }),
  L("yapahuwa", "Yapahuwa", "யாப்பகுவ", "city", [7.817, 80.311], { noteEn: "Capital of Buvanekabahu I.", noteTa: "முதலாம் புவனேகபாகுவின் தலைநகர்." }),
  L("dedigama", "Dedigama", "தெதிகம", "site", [7.2, 80.26]),
  L("kelaniya", "Kelaniya", "களனி", "temple", [6.957, 79.921], { noteEn: "Kelaniya temple; Kotte kingdom.", noteTa: "களனி விகாரை; கோட்டை இராச்சியம்." }),
  L("negombo", "Negombo", "நீர்கொழும்பு", "port", [7.211, 79.839], { noteEn: "Dutch fort.", noteTa: "ஒல்லாந்தர் கோட்டை." }),
  L("chilaw", "Chilaw (Salawatota)", "சிலாபம் (சலவத்தொட்ட)", "port", [7.583, 79.8], { noteEn: "Port on the west coast; pearl fishing.", noteTa: "மேற்குக் கரைத் துறை; முத்துக்குளித்தல்." }),
  L("puttalam", "Puttalam", "புத்தளம்", "city", [8.034, 79.835]),
  L("kalpitiya", "Kalpitiya", "கல்பிட்டி", "fort", [8.233, 79.764], { noteEn: "Port held by Rajasinghe II; Dutch fort.", noteTa: "இரண்டாம் இராஜசிங்கன் கைப்பற்றிய துறை; ஒல்லாந்தர் கோட்டை." }),
  L("kalutara", "Kalutara (Kalatittha)", "களுத்துறை (காலதித்த)", "port", [6.587, 79.96], { noteEn: "Kalatittha, ancient port at the mouth of the Kalu Ganga.", noteTa: "காலதித்த – களு கங்கை முகத்துவாரத்திலுள்ள பண்டைய துறை." }),
  L("matara", "Matara", "மாத்தறை", "city", [5.95, 80.533], { noteEn: "Dutch fort.", noteTa: "ஒல்லாந்தர் கோட்டை." }),
  L("dondra", "Devinuwara (Dondra)", "தேவேந்திர முனை (தேவுந்தர)", "temple", [5.923, 80.59], { noteEn: "Southern tip; Devinuwara devalaya.", noteTa: "தென் முனை; தேவுந்தர தேவாலயம்." }),
  L("point-pedro", "Point Pedro", "பருத்தித்துறை", "port", [9.817, 80.233]),
  L("kayts", "Kayts (Urathota, Sukaratittha)", "ஊர்காவற்றுறை (ஊராத்தோட்டை, சுகரதித்த)", "port", [9.667, 79.867], { noteEn: "Ancient port Sukaratittha; Dutch fort.", noteTa: "பண்டைய சுகரதித்த துறை; ஒல்லாந்தர் கோட்டை." }),
  L("mantai", "Mathota (Mahatittha / Mantai)", "மாதோட்டம் (மகாதித்த / மாந்தை)", "port", [8.952, 79.952], { noteEn: "Greatest ancient port, the gateway from India.", noteTa: "இந்தியாவிலிருந்து வரும் பிரதான பண்டைய துறைமுகம்." }),
  L("thiruketheeswaram", "Thiruketheeswaram", "திருக்கேதீஸ்வரம்", "temple", [8.958, 79.963]),
  L("jambukola", "Jambukolapattana", "ஜம்புகோளப்பட்டினம்", "port", [9.81, 80.06], { noteEn: "Northern port where the Sri Maha Bodhi sapling arrived.", noteTa: "புனித வெள்ளரசுக்கிளை வந்திறங்கிய வடக்குத் துறை." }),
  L("lankapattana", "Lankapattana (Ilankaithurai)", "இலங்கைத்துறை (லங்காபட்டினம்)", "port", [8.357, 81.39], { noteEn: "East-coast port where the Tooth Relic arrived.", noteTa: "புனித தந்ததாது வந்திறங்கிய கிழக்குத் துறை." }),
  L("godawaya", "Godawaya", "கொடவாய", "port", [6.115, 81.03], { noteEn: "Ancient port at the mouth of the Walawe Ganga.", noteTa: "வளவை கங்கை முகத்துவாரத்திலுள்ள பண்டைய துறை." }),
  L("kirinda", "Kirinda", "கிரிந்த", "port", [6.215, 81.33], { noteEn: "Port of the Ruhuna (Magama) kingdom.", noteTa: "உருகுணை (மாகம) இராச்சியத்தின் துறை." }),
  L("magama", "Magama (Tissamaharama)", "மாகம (திஸ்ஸமகாராமை)", "city", [6.283, 81.283], { noteEn: "Capital of Ruhuna.", noteTa: "உருகுணையின் தலைநகர்." }),
  L("kataragama", "Kataragama (Kajaragama)", "கதிர்காமம் (காஜரகாம)", "temple", [6.417, 81.333], { noteEn: "Ancient city on the Menik Ganga.", noteTa: "மாணிக்க கங்கைக் கரையிலுள்ள பண்டைய நகரம்." }),
  L("kantharodai", "Kantharodai (Kadurugoda)", "கந்தரோடை (கந்துருகொட)", "site", [9.75, 80.017], { noteEn: "Early Buddhist and trading town in Jaffna.", noteTa: "யாழ்ப்பாணத்தின் ஆரம்பகால பௌத்த, வர்த்தக நகரம்." }),
  L("nagadeepa", "Nagadeepa (Nainativu)", "நகதீப (நயினாதீவு)", "island", [9.6, 79.767], { noteEn: "Ruled by a minister under King Vasabha (Vallipuram gold plate).", noteTa: "வசப மன்னன் காலத்தில் அமைச்சர் ஒருவரால் ஆளப்பட்டது (வல்லிபுரம் பொற்சாசனம்)." }),
  L("ritigala", "Ritigala", "ரிட்டிகல", "site", [8.112, 80.653]),
  L("mahiyangana", "Mahiyangana", "மகியங்கனை", "temple", [7.317, 80.983]),
  L("sigiriya", "Sigiriya", "சீகிரியா", "site", [7.957, 80.76], { noteEn: "Water gardens and fountains (Kashyapa).", noteTa: "நீர்ப் பூங்காக்கள், நீரூற்றுகள் (காசியப்பன்)." }),
  L("dambulla", "Dambulla", "தம்புள்ளை", "temple", [7.858, 80.653]),
  L("kandalama", "Kandalama", "கந்தளம", "site", [7.885, 80.705]),
  L("sithulpawwa", "Sithulpawwa", "சித்துல்பவ்வ", "site", [6.387, 81.45]),
  L("hambantota", "Hambantota", "அம்பாந்தோட்டை", "city", [6.124, 81.123]),
  L("medamahanuwara", "Medamahanuwara", "மெதமகா நுவர", "site", [7.29, 80.85], { r: 18, noteEn: "Where King Sri Wickrama Rajasinghe was captured (1815).", noteTa: "ஸ்ரீ விக்கிரம இராஜசிங்கன் கைதுசெய்யப்பட்ட இடம் (1815)." }),
  L("panduwasnuwara", "Panduwasnuwara", "பண்டுவஸ்நுவர", "site", [7.6, 80.103]),
  L("kottiyar", "Kottiyar fort", "கொட்டியாரக் கோட்டை", "fort", [8.46, 81.26]),
  L("elephant-pass", "Elephant Pass", "ஆனையிறவு", "fort", [9.53, 80.41], { noteEn: "Gateway to the Jaffna peninsula; colonial fort.", noteTa: "யாழ்ப்பாணக் குடாநாட்டு வாயில்; காலனித்துவக் காலக் கோட்டை." }),
  L("mullaitivu", "Mullaitivu", "முல்லைத்தீவு", "fort", [9.283, 80.8]),
  L("deegavapi", "Deegavapi", "தீகவாபி", "temple", [7.29, 81.77]),
  L("matale", "Matale", "மாத்தளை", "city", [7.47, 80.62]),
  L("badulla", "Badulla", "பதுளை", "city", [6.985, 81.056]),
  L("wariyapola", "Wariyapola", "வாரியபொல", "city", [7.633, 80.233]),
  L("peradeniya", "Peradeniya", "பேராதனை", "city", [7.267, 80.6]),
  L("nawalapitiya", "Nawalapitiya", "நாவலப்பிட்டி", "city", [7.05, 80.533]),
  L("bandarawela", "Bandarawela", "பண்டாரவளை", "city", [6.833, 80.983]),
  L("ratnapura", "Ratnapura", "இரத்தினபுரி", "city", [6.681, 80.402]),
  L("nuwara-eliya", "Nuwara Eliya", "நுவரெலியா", "city", [6.967, 80.767]),
  L("kegalle", "Kegalle", "கேகாலை", "city", [7.253, 80.345]),
  L("gampaha", "Gampaha", "கம்பஹா", "city", [7.092, 80.0]),
  L("talawakele", "Talawakele (Tea Research Institute)", "தலவாக்கலை (தேயிலை ஆராய்ச்சி நிலையம்)", "site", [6.933, 80.65]),
  L("lunuwila", "Lunuwila (Coconut Research Institute)", "லுணுவில (தெங்கு ஆராய்ச்சி நிலையம்)", "site", [7.344, 79.862]),
  L("agalawatta", "Agalawatta (Rubber Research Institute)", "அகலவத்தை (இறப்பர் ஆராய்ச்சி நிலையம்)", "site", [6.533, 80.15]),
  L("ekala", "Ekala", "ஏக்கல", "city", [7.101, 79.91]),
  L("ratmalana", "Ratmalana", "இரத்மலானை", "city", [6.822, 79.886]),
  L("katunayake", "Katunayake", "கட்டுநாயக்க", "city", [7.167, 79.867]),
  L("biyagama", "Biyagama", "பியகம", "city", [6.933, 79.983]),
  L("koggala", "Koggala", "கொக்கல", "city", [5.99, 80.323]),
  L("delgamuwa", "Delgamuwa temple", "தெல்கமுவ விகாரை", "temple", [6.776, 80.356], { noteEn: "Temple where the Tooth Relic was hidden.", noteTa: "புனித தந்ததாது மறைத்து வைக்கப்பட்ட விகாரை." }),

  // Battles
  L("danture", "Danture (1594)", "தந்துறை (1594)", "battle", [7.282, 80.541], { noteEn: "Kandyan victory over the Portuguese, 1594.", noteTa: "1594 – போர்த்துக்கேயருக்கு எதிரான கண்டியின் வெற்றி." }),
  L("gannoruwa", "Gannoruwa (1638)", "கன்னொருவ (1638)", "battle", [7.28, 80.602], { noteEn: "Rajasinghe II defeated the Portuguese, 1638.", noteTa: "1638 – இரண்டாம் இராஜசிங்கன் போர்த்துக்கேயரைத் தோற்கடித்தான்." }),
  L("randeniwela", "Randeniwela (1630)", "ரந்தெனிவெல (1630)", "battle", [6.75, 81.08], { r: 20, noteEn: "Battle in Uva near Wellawaya, 1630.", noteTa: "1630 – ஊவாவில் வெல்லவாய அருகே நடந்த போர்." }),
  L("mulleriyawa", "Mulleriyawa (1562)", "முல்லேரியா (1562)", "battle", [6.936, 79.948], { noteEn: "Seethawaka army defeated the Portuguese, 1562.", noteTa: "1562 – சீதாவாக்கைப் படை போர்த்துக்கேயரைத் தோற்கடித்தது." }),

  // Pre-historic and proto-historic sites
  L("pahiyangala", "Pahiyangala (Fa-Hien cave)", "பாகியன்கல", "site", [6.602, 80.218], { noteEn: "Cave used about 38 000 years ago (Bulathsinhala).", noteTa: "சுமார் 38 000 ஆண்டுகளுக்கு முற்பட்ட குகை (புளத்சிங்கள)." }),
  L("batadombalena", "Batadombalena", "பட்டதொம்பலென", "site", [6.8, 80.367]),
  L("kitulgala", "Kitulgala Belilena", "கித்துள்கல பெலிலென", "site", [7.002, 80.436], { noteEn: "Cave with wild breadfruit seeds (about 12 500 years).", noteTa: "காட்டு ஈரப்பலா விதைகள் கிடைத்த குகை." }),
  L("bellanbandi", "Bellanbandi Palassa", "பெல்லன்பந்தி பலஸ்ஸ", "site", [6.45, 80.82], { r: 22, noteEn: "Open-air site of Balangoda Man (Uda Walawe).", noteTa: "பலாங்கொடை மனிதனின் வெட்டவெளி வாழ்விடம் (உடவளவை)." }),
  L("aligala", "Aligala (Sigiriya)", "அலிகல (சீகிரியா)", "site", [7.953, 80.752]),
  L("ravana-ella", "Rawana Ella cave", "இராவண எல்ல", "site", [6.841, 81.054], { noteEn: "Skull painted with red ochre – early ritual.", noteTa: "சிவப்பு மண் பூசப்பட்ட மண்டையோடு – சடங்கு." }),
  L("bundala", "Bundala", "பூந்தல", "site", [6.214, 81.225], { noteEn: "Coastal open-air prehistoric site.", noteTa: "கரையோர வெட்டவெளி வரலாற்றுக்கு முற்பட்ட வாழ்விடம்." }),
  L("pathirajawela", "Pathirajawela", "பதிராஜவெல", "site", [6.19, 81.2], { r: 18 }),
  L("minihagalkanda", "Minihagalkanda", "மினிகாகல்கந்த", "site", [6.4, 81.55], { r: 30, noteEn: "Coastal prehistoric site in the south-east (Yala).", noteTa: "தென்கிழக்குக் கரையோர வரலாற்றுக்கு முற்பட்ட இடம் (யால)." }),
  L("horton-plains", "Horton Plains", "ஹோட்டன் சமவெளி", "area", [6.8, 80.8], { r: 18, noteEn: "Evidence of prehistoric people in the hills.", noteTa: "மலைநாட்டில் வரலாற்றுக்கு முற்பட்ட மனிதச் சான்றுகள்." }),
  L("ibbankatuwa", "Ibbankatuwa", "இப்பன்கட்டுவ", "site", [7.837, 80.63], { noteEn: "Megalithic burial ground near Dambulla.", noteTa: "தம்புள்ளைக்கு அருகிலுள்ள பெருங்கற் புதைகுழி." }),
  L("pomparippu", "Pomparippu", "பொம்பரிப்பு", "site", [8.47, 79.87], { r: 18, noteEn: "Proto-historic burial ground (urn burials).", noteTa: "முன் வரலாற்றுக் கால மயானம் (தாழிப் புதைகுழிகள்)." }),

  // Tanks, anicuts and reservoirs
  L("kala-wewa", "Kala Wewa", "கலாவாவி", "tank", [8.0, 80.53], { noteEn: "Built by King Dhatusena.", noteTa: "தாதுசேனன் கட்டிய குளம்." }),
  L("yoda-wewa", "Yoda Wewa (Giant's Tank)", "யோதவாவி", "tank", [8.85, 80.04], { noteEn: "Great tank in Mannar fed by a river bend (Malwathu Oya).", noteTa: "மன்னாரிலுள்ள பெருங்குளம் (மல்வத்து ஓயா)." }),
  L("padaviya", "Padaviya Wewa", "பதவியா வாவி", "tank", [8.82, 80.76]),
  L("minneriya", "Minneriya Wewa", "மின்னேரியா வாவி", "tank", [8.03, 80.89], { noteEn: "Built by King Mahasen.", noteTa: "மகாசேனன் கட்டிய குளம்." }),
  L("giritale", "Giritale Wewa", "கிரித்தலை வாவி", "tank", [7.99, 80.93]),
  L("kaudulla", "Kaudulla Wewa", "கவுடுல்ல வாவி", "tank", [8.15, 80.91]),
  L("kantale", "Kantale Wewa", "கந்தளாய் வாவி", "tank", [8.35, 80.99]),
  L("parakrama-samudra", "Parakrama Samudra", "பராக்கிரம சமுத்திரம்", "tank", [7.92, 80.975], { noteEn: "Great tank of Parakramabahu I at Polonnaruwa.", noteTa: "பொலன்னறுவையில் முதலாம் பராக்கிரமபாகுவின் பெருங்குளம்." }),
  L("huruluwewa", "Hurulu Wewa", "ஹுருளு வாவி", "tank", [8.19, 80.7]),
  L("nachchaduwa", "Nachchaduwa Wewa", "நாச்சதுவ வாவி", "tank", [8.26, 80.47]),
  L("iranamadu", "Iranamadu Tank", "இரணைமடுக் குளம்", "tank", [9.33, 80.44]),
  L("vavunikulam", "Vavunikulam", "வவுனிக்குளம்", "tank", [9.07, 80.32], { r: 15 }),
  L("mahakanadarawa", "Mahakanadarawa Wewa", "மஹகனதராவ வாவி", "tank", [8.4, 80.55], { r: 15 }),
  L("nuwara-wewa", "Nuwara Wewa", "நுவர வாவி", "tank", [8.34, 80.44]),
  L("tissa-wewa", "Tissa Wewa (Anuradhapura)", "திஸ்ஸ வாவி (அநுராதபுரம்)", "tank", [8.35, 80.39]),
  L("sorabora", "Sorabora Wewa", "சொரபொர வாவி", "tank", [7.29, 81.01]),
  L("minipe", "Minipe anicut", "மினிப்பே அணைக்கட்டு", "dam", [7.225, 81.0], { noteEn: "Ancient anicut on the Mahaweli; canal towards Polonnaruwa.", noteTa: "மகாவலியின் மீது பழைய அணைக்கட்டு; பொலன்னறுவை நோக்கிய கால்வாய்." }),
  L("polgolla", "Polgolla barrage", "பொல்கொல்ல அணைக்கட்டு", "dam", [7.32, 80.645], { noteEn: "First barrage of the Mahaweli scheme.", noteTa: "மகாவலித் திட்டத்தின் முதல் அணைக்கட்டு." }),
  L("victoria", "Victoria reservoir", "விக்டோரியா நீர்த்தேக்கம்", "dam", [7.24, 80.79]),
  L("kotmale", "Kotmale reservoir", "கொத்மலை நீர்த்தேக்கம்", "dam", [7.06, 80.6]),
  L("randenigala", "Randenigala reservoir", "ரந்தெனிகல நீர்த்தேக்கம்", "dam", [7.2, 80.93]),
  L("rantambe", "Rantambe reservoir", "ரந்தெம்பே நீர்த்தேக்கம்", "dam", [7.21, 80.96]),
  L("ulhitiya", "Ulhitiya reservoir", "உல்ஹிட்டிய நீர்த்தேக்கம்", "dam", [7.43, 81.05], { r: 15 }),
  L("maduru-oya-res", "Maduru Oya reservoir", "மாதுறு ஓயா நீர்த்தேக்கம்", "dam", [7.62, 81.18], { r: 15 }),
  L("gal-oya-res", "Gal Oya reservoir (Senanayake Samudra)", "கல் ஓயா நீர்த்தேக்கம் (சேனநாயக்க சமுத்திரம்)", "dam", [7.22, 81.52], { noteEn: "First multi-purpose scheme after independence.", noteTa: "சுதந்திரத்தின் பின் முதலாவது பல்நோக்குத் திட்டம்." }),
  L("bowatenna", "Bowatenna reservoir", "பொவதென்ன நீர்த்தேக்கம்", "dam", [7.67, 80.68], { r: 15 }),
  L("udawalawe", "Uda Walawe reservoir", "உடவளவை நீர்த்தேக்கம்", "dam", [6.45, 80.85]),

  // Rivers (source → mouth)
  L("mahaweli", "Mahaweli Ganga", "மகாவலி கங்கை", "river", [7.92, 81.08], {
    line: [[6.88, 80.6], [7.05, 80.533], [7.165, 80.58], [7.27, 80.6], [7.32, 80.645], [7.3, 80.72], [7.24, 80.79], [7.2, 80.93], [7.225, 81.0], [7.32, 80.99], [7.55, 81.03], [7.92, 81.08], [8.12, 81.17], [8.3, 81.22], [8.46, 81.26]],
    noteEn: "Longest river; flows from the hills to Koddiyar Bay near Trincomalee.",
    noteTa: "மிக நீண்ட ஆறு; மலைநாட்டிலிருந்து திருகோணமலை அருகே கொட்டியாரக் குடாவில் கலக்கிறது.",
  }),
  L("kelani", "Kelani Ganga", "களனி கங்கை", "river", [6.95, 80.22], { line: [[6.81, 80.5], [7.0, 80.43], [6.953, 80.22], [6.91, 80.08], [6.957, 79.93], [6.98, 79.87]], noteEn: "Reaches the sea just north of Colombo.", noteTa: "கொழும்புக்கு வடக்கே கடலில் கலக்கிறது." }),
  L("kalu", "Kalu Ganga", "களு கங்கை", "river", [6.66, 80.25], { line: [[6.8, 80.5], [6.7, 80.42], [6.681, 80.402], [6.66, 80.25], [6.62, 80.12], [6.587, 79.97]], noteEn: "From the hills past Ratnapura to the sea at Kalutara.", noteTa: "இரத்தினபுரி வழியாகக் களுத்துறையில் கடலில் கலக்கிறது." }),
  L("walawe", "Walawe Ganga", "வளவை கங்கை", "river", [6.45, 80.85], { line: [[6.75, 80.75], [6.66, 80.8], [6.45, 80.85], [6.28, 80.88], [6.115, 81.03]] }),
  L("deduru", "Deduru Oya", "தெதுரு ஓயா", "river", [7.6, 80.15], { line: [[7.55, 80.5], [7.52, 80.35], [7.6, 80.15], [7.6, 79.8]], noteEn: "North-western river reaching the sea at Chilaw.", noteTa: "சிலாபத்தில் கடலில் கலக்கும் வடமேற்கு ஆறு." }),
  L("kala-oya", "Kala Oya", "கலா ஓயா", "river", [8.1, 80.3], { line: [[7.98, 80.55], [8.0, 80.53], [8.1, 80.3], [8.22, 80.05], [8.3, 79.87]], noteEn: "Feeds Kala Wewa; flows to the Puttalam lagoon.", noteTa: "கலாவாவிக்கு நீர் தரும் ஆறு; புத்தளம் கடனீரேரியில் கலக்கிறது." }),
  L("malwathu", "Malwathu Oya", "மல்வத்து ஓயா", "river", [8.5, 80.22], { line: [[8.1, 80.6], [8.335, 80.42], [8.5, 80.22], [8.7, 80.05], [8.8, 79.93]] }),
  L("yan-oya", "Yan Oya", "யான் ஓயா", "river", [8.45, 80.82], { line: [[7.98, 80.62], [8.19, 80.7], [8.45, 80.82], [8.7, 80.95], [8.92, 81.02]], noteEn: "Flows north-east to the sea at Pulmoddai.", noteTa: "வடகிழக்காக ஓடிப் புல்மோட்டையில் கடலில் கலக்கிறது." }),
  L("gal-oya", "Gal Oya", "கல் ஓயா", "river", [7.24, 81.62], { line: [[7.15, 81.35], [7.22, 81.52], [7.25, 81.7], [7.28, 81.86]], noteEn: "Eastern river; Gal Oya scheme, the first multi-purpose project.", noteTa: "கிழக்கு ஆறு; கல் ஓயா திட்டம் – முதலாவது பல்நோக்குத் திட்டம்." }),
  L("maduru-oya", "Maduru Oya", "மாதுறு ஓயா", "river", [7.8, 81.35], { line: [[7.5, 81.1], [7.62, 81.18], [7.8, 81.35], [7.93, 81.55]] }),
  L("kumbukkan", "Kumbukkan Oya", "கும்புக்கன் ஓயா", "river", [6.7, 81.5], { line: [[6.92, 81.25], [6.87, 81.35], [6.7, 81.5], [6.49, 81.71]], noteEn: "South-eastern river between Yala and Kumana.", noteTa: "யால, குமண இடையே ஓடும் தென்கிழக்கு ஆறு." }),
  L("menik", "Menik Ganga", "மாணிக்க கங்கை", "river", [6.417, 81.333], { line: [[6.85, 81.1], [6.62, 81.25], [6.417, 81.333], [6.28, 81.48]], noteEn: "Flows past Kataragama.", noteTa: "கதிர்காமம் வழியாக ஓடுகிறது." }),
  L("kirindi", "Kirindi Oya", "கிரிந்தி ஓயா", "river", [6.4, 81.2], { line: [[6.86, 81.05], [6.73, 81.1], [6.4, 81.2], [6.283, 81.275], [6.2, 81.29]], noteEn: "Magama settlements; King Ilanaga's anicut.", noteTa: "மாகமக் குடியிருப்புகள்; இளநாக மன்னனின் அணைக்கட்டு." }),
];

/** Europe, Africa and Asia (the "part of the world map" used in the exam). */
export const WORLD_PLACES: Place[] = [
  L("madras", "Madras (Chennai)", "சென்னை (மதராஸ்)", "city", [13.08, 80.27], { noteEn: "British trading centre in India.", noteTa: "இந்தியாவில் பிரித்தானிய வர்த்தக நிலையம்." }),
  L("bombay", "Bombay (Mumbai)", "பம்பாய்", "city", [19.08, 72.88], { noteEn: "British trading centre in India.", noteTa: "இந்தியாவில் பிரித்தானிய வர்த்தக நிலையம்." }),
  L("calcutta", "Calcutta (Kolkata)", "கல்கத்தா", "city", [22.57, 88.36], { noteEn: "British trading centre in India.", noteTa: "இந்தியாவில் பிரித்தானிய வர்த்தக நிலையம்." }),
  L("pondicherry", "Pondicherry", "பாண்டிச்சேரி", "city", [11.93, 79.83], { noteEn: "French centre in India.", noteTa: "இந்தியாவில் பிரெஞ்சு நிலையம்." }),
  L("calicut", "Calicut (Kozhikode)", "கள்ளிக்கோட்டை (கோழிக்கோடு)", "city", [11.25, 75.78], { noteEn: "Vasco da Gama landed here in 1498.", noteTa: "1498 இல் வாஸ்கோ ட காமா வந்திறங்கிய இடம்." }),
  L("goa", "Goa", "கோவா", "city", [15.4, 73.9], { noteEn: "Portuguese centre in India.", noteTa: "இந்தியாவில் போர்த்துக்கேய மையம்." }),
  L("tamralipti", "Tamralipti", "தாம்ரலிப்தி", "port", [22.3, 87.92], { noteEn: "Ancient port at the mouth of the Ganges.", noteTa: "கங்கை முகத்துவாரத்திலுள்ள பண்டைய துறைமுகம்." }),
  L("himalaya", "Himalaya mountains", "இமய மலை", "mountain", [28.5, 84.0], { r: 550 }),
  L("bay-of-bengal", "Bay of Bengal", "வங்காள விரிகுடா", "sea", [15.0, 88.0], { r: 600 }),
  L("arabian-sea", "Arabian Sea", "அரபிக்கடல்", "sea", [15.0, 64.0], { r: 700 }),
  L("persian-gulf", "Persian Gulf", "பாரசீக வளைகுடா", "sea", [26.8, 51.5], { r: 450, noteEn: "Arab sea trade route.", noteTa: "அரபு வர்த்தகப் பாதை." }),
  L("red-sea", "Red Sea", "செங்கடல்", "sea", [20.0, 38.5], { r: 450, noteEn: "East–west trade route.", noteTa: "கிழக்கு–மேற்கு வர்த்தகப் பாதை." }),
  L("suez", "Suez Canal", "சுயெஸ் கால்வாய்", "port", [30.6, 32.33], { r: 300, noteEn: "Joins the Mediterranean and the Red Sea.", noteTa: "மத்தியதரைக் கடலையும் செங்கடலையும் இணைக்கிறது." }),
  L("mediterranean", "Mediterranean Sea", "மத்திய தரைக்கடல்", "sea", [35.0, 18.0], { r: 700 }),
  L("black-sea", "Black Sea", "கருங்கடல்", "sea", [43.3, 34.5], { r: 400 }),
  L("north-sea", "North Sea", "வடகடல்", "sea", [56.0, 3.0], { r: 400 }),
  L("baltic-sea", "Baltic Sea", "பால்டிக் கடல்", "sea", [57.5, 19.5], { r: 400 }),
  L("jerusalem", "Jerusalem", "ஜெருசலம்", "city", [31.78, 35.22]),
  L("constantinople", "Constantinople (Istanbul)", "கொன்ஸ்தாந்திநோபிள்", "city", [41.01, 28.98], { noteEn: "Taken by the Turks in 1453.", noteTa: "1453 இல் துருக்கியர் வசமானது." }),
  L("rome", "Rome", "உரோமாபுரி", "city", [41.9, 12.5]),
  L("vatican", "Vatican", "வத்திக்கான்", "city", [41.9, 12.45], { noteEn: "Headquarters of the Catholic Church.", noteTa: "கத்தோலிக்கத் திருச்சபையின் தலைமையகம்." }),
  L("venice", "Venice", "வெனிஸ்", "city", [45.44, 12.33], { noteEn: "Renaissance trading city.", noteTa: "மறுமலர்ச்சிக் கால வர்த்தக நகரம்." }),
  L("florence", "Florence", "புளோரன்ஸ்", "city", [43.77, 11.25], { noteEn: "Birthplace of the Renaissance.", noteTa: "மறுமலர்ச்சியின் பிறப்பிடம்." }),
  L("genoa", "Genoa", "ஜெனோவா", "city", [44.41, 8.93]),
  L("lisbon", "Lisbon", "லிஸ்பன்", "city", [38.72, -9.14], { noteEn: "Capital of Portugal; start of the sea route to the East.", noteTa: "போர்த்துக்கலின் தலைநகர்." }),
  L("london", "London", "இலண்டன்", "city", [51.51, -0.13]),
  L("paris", "Paris (Versailles, Bastille)", "பாரிஸ்", "city", [48.86, 2.35], { noteEn: "French Revolution, 1789.", noteTa: "பிரெஞ்சுப் புரட்சி, 1789." }),
  L("the-hague", "The Hague", "ஹேக்", "city", [52.08, 4.3], { noteEn: "International Court of Justice.", noteTa: "சர்வதேச நீதிமன்றம்." }),
  L("sarajevo", "Sarajevo", "சரஜேவோ", "city", [43.86, 18.41], { noteEn: "Assassination that began World War I (1914).", noteTa: "முதலாம் உலகப் போரைத் தொடக்கிய கொலை (1914)." }),
  L("moscow", "Moscow", "மொஸ்கோ", "city", [55.76, 37.62]),
  L("cape", "Cape of Good Hope", "நன்னம்பிக்கை முனை", "area", [-34.36, 18.47], { r: 400 }),
  L("malacca", "Malacca", "மலாக்கா", "port", [2.19, 102.25]),
  L("malacca-strait", "Strait of Malacca", "மலாக்கா நீரிணை", "sea", [3.6, 99.8], { r: 350 }),
  L("malay-peninsula", "Malay Peninsula", "மலாயா தீபகற்பம்", "area", [4.5, 102.0], { r: 400 }),
  L("sumatra", "Sumatra", "சுமாத்திரா தீவு", "island", [-0.5, 101.5], { r: 500 }),
  L("java", "Java", "ஜாவா தீவு", "island", [-7.4, 110.0], { r: 400, noteEn: "Dutch eastern centre (Batavia).", noteTa: "ஒல்லாந்தரின் கிழக்கு மையம் (பத்தேவியா)." }),
  L("batavia", "Batavia (Jakarta)", "பத்தேவியா", "city", [-6.13, 106.83], { noteEn: "Dutch headquarters in the East.", noteTa: "கிழக்கில் ஒல்லாந்தரின் தலைமையகம்." }),
  L("taiwan", "Taiwan", "தாய்வான்", "island", [23.7, 121.0], { r: 300 }),
  L("korea", "Korean Peninsula", "கொரியா குடாநாடு", "area", [37.5, 127.5], { r: 400 }),
  L("japan", "Japan islands", "ஜப்பான் தீவுகள்", "island", [36.5, 138.5], { r: 600 }),
  L("tokyo", "Tokyo", "டோக்கியோ", "city", [35.68, 139.69]),
  L("hiroshima", "Hiroshima", "ஹிரோஷிமா", "city", [34.39, 132.45], { noteEn: "Atomic bomb, 6 August 1945.", noteTa: "1945 இல் அணுகுண்டு வீசப்பட்ட நகரம்." }),
  L("nagasaki", "Nagasaki", "நாகசாகி", "city", [32.75, 129.88], { noteEn: "Atomic bomb, 9 August 1945.", noteTa: "1945 இல் அணுகுண்டு வீசப்பட்ட நகரம்." }),
  L("burma", "Burma (Myanmar)", "பர்மா", "country", [21.0, 96.0], { r: 500 }),
  L("italy", "Italy", "இத்தாலி", "country", [42.8, 12.5], { r: 400, noteEn: "Birthplace of the Renaissance.", noteTa: "மறுமலர்ச்சியின் பிறப்பிடம்." }),
  L("portugal", "Portugal", "போர்த்துக்கல்", "country", [39.6, -8.0], { r: 300, noteEn: "First European power to reach Sri Lanka.", noteTa: "இலங்கையை முதலில் வந்தடைந்த ஐரோப்பிய நாடு." }),
  L("spain", "Spain", "ஸ்பெயின்", "country", [40.2, -3.7], { r: 450 }),
  L("france", "France", "பிரான்ஸ்", "country", [46.6, 2.4], { r: 450 }),
  L("great-britain", "Great Britain", "பெரிய பிரித்தானியா", "island", [53.5, -1.8], { r: 400, noteEn: "Home of the Industrial Revolution.", noteTa: "கைத்தொழிற் புரட்சி தோன்றிய நாடு." }),
  L("germany", "Germany", "ஜேர்மனி", "country", [51.2, 10.4], { r: 400 }),
  L("belgium", "Belgium", "பெல்ஜியம்", "country", [50.6, 4.6], { r: 200 }),
  L("austria", "Austria–Hungary", "ஆஸ்திரியா–ஹங்கேரி", "country", [47.5, 17.0], { r: 450 }),
  L("poland", "Poland", "போலந்து", "country", [52.0, 19.4], { r: 350 }),
  L("russia", "Russia", "ரஷ்யா", "country", [57.0, 45.0], { r: 1000 }),
  L("turkey", "Turkey (Ottoman Empire)", "துருக்கி", "country", [39.0, 35.0], { r: 500 }),
  L("bulgaria", "Bulgaria", "பல்கேரியா", "country", [42.7, 25.3], { r: 220 }),
  L("serbia", "Serbia", "சேர்பியா", "country", [44.0, 20.9], { r: 200 }),
  L("romania", "Romania", "ருமேனியா", "country", [45.9, 24.9], { r: 280 }),
  L("greece", "Greece", "கிரீஸ்", "country", [39.3, 22.0], { r: 280 }),
];

const ALL = new Map([...LANKA_PLACES, ...WORLD_PLACES].map((p) => [p.id, p]));

export function getPlace(id: string) {
  const p = ALL.get(id);
  if (!p) throw new Error(`Unknown map place: ${id}`);
  return p;
}

/** Default tap tolerance in km, by base map and kind. */
export function toleranceKm(p: Place, base: "lanka" | "world") {
  if (p.r) return p.r;
  if (base === "world") return p.kind === "city" || p.kind === "port" ? 280 : 450;
  if (p.kind === "river") return 12;
  return 14;
}
