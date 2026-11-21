/**
 * Map-marking practice sets for O/L History. Client-safe.
 * Past-paper sets are Part II, Question 1 (a) of each year's O/L History paper:
 * (i) places on the outline map of Sri Lanka, (ii) places on the outline world map.
 * Textbook sets follow the maps in each Grade 10 / 11 unit and are linked from that chapter.
 */

export type MapBase = "lanka" | "world";

export type MapSet = {
  id: string;
  base: MapBase;
  kind: "past" | "textbook";
  en: string;
  ta: string;
  year?: number;
  marks?: number;
  /** Textbook sets: the chapter they belong to. */
  grade?: number;
  chapter?: number;
  places: string[];
};

const past = (year: number, lanka: string[], world: string[]): MapSet[] => [
  {
    id: `${year}-sri-lanka`,
    base: "lanka",
    kind: "past",
    year,
    marks: lanka.length,
    en: `${year} paper · Sri Lanka map`,
    ta: `${year} வினாத்தாள் · இலங்கைப் படம்`,
    places: lanka,
  },
  {
    id: `${year}-world`,
    base: "world",
    kind: "past",
    year,
    marks: world.length,
    en: `${year} paper · World map`,
    ta: `${year} வினாத்தாள் · உலகப் படம்`,
    places: world,
  },
];

export const PAST_MAP_SETS: MapSet[] = [
  ...past(
    2025,
    ["colombo", "kandy", "galle", "kalpitiya", "gal-oya-res", "jaffna", "deduru", "nuwara-wewa", "mannar", "trincomalee", "kumbukkan", "padaviya"],
    ["burma", "calicut", "spain", "hiroshima", "malacca-strait", "baltic-sea"],
  ),
  ...past(
    2024,
    ["walawe", "mahaweli", "huruluwewa", "randenigala", "minneriya", "minihagalkanda", "mantai", "kandy", "point-pedro", "puttalam", "seethawaka", "kottiyar"],
    ["germany", "lisbon", "malay-peninsula", "madras", "nagasaki", "north-sea"],
  ),
  ...past(
    2023,
    ["kirindi", "kelani", "pomparippu", "kayts", "parakrama-samudra", "victoria", "deegavapi", "minipe", "matara", "tissa-wewa", "elephant-pass", "fort-frederick"],
    ["great-britain", "java", "black-sea", "tokyo", "calcutta", "italy"],
  ),
  ...past(
    2022,
    ["jambukola", "iranamadu", "magama", "anuradhapura", "gampola", "negombo", "galle", "kala-wewa", "yan-oya", "gal-oya", "batticaloa", "yoda-wewa"],
    ["constantinople", "suez", "bombay", "france", "arabian-sea", "japan"],
  ),
  ...past(
    2021,
    ["kalutara", "nachchaduwa", "menik", "polonnaruwa", "gannoruwa", "dondra", "kantharodai", "sorabora", "trincomalee", "kala-oya", "chilaw", "kotte"],
    ["bay-of-bengal", "taiwan", "rome", "portugal", "london", "red-sea"],
  ),
  ...past(
    2020,
    ["maduru-oya", "kandy", "nallur", "lankapattana", "mihintale", "kurunegala", "kataragama", "iranamadu", "kotmale", "mannar-island", "kelaniya", "horton-plains"],
    ["java", "mediterranean", "goa", "korea", "madras", "venice"],
  ),
  ...past(
    2019,
    ["deduru", "kumbukkan", "gal-oya-res", "parakrama-samudra", "nagadeepa", "kayts", "godawaya", "panduwasnuwara", "koneswaram", "polgolla", "mantai", "colombo"],
    ["persian-gulf", "lisbon", "malacca-strait", "italy", "calcutta", "sumatra"],
  ),
  ...past(
    2018,
    ["gal-oya", "yan-oya", "padaviya", "minipe", "gampola", "puttalam", "kayts", "negombo", "thiruketheeswaram", "kalutara", "jambukola", "minihagalkanda"],
    ["vatican", "burma", "calicut", "batavia", "hiroshima", "suez"],
  ),
  ...past(
    2017,
    ["yoda-wewa", "kalu", "polonnaruwa", "jambukola", "kataragama", "mahakanadarawa", "mahiyangana", "ritigala", "kirinda", "batticaloa"],
    ["persian-gulf", "tamralipti", "himalaya", "rome", "java", "red-sea", "lisbon", "jerusalem"],
  ),
  ...past(
    2016,
    ["deduru", "gal-oya", "lankapattana", "chilaw", "kataragama", "kandy", "bundala", "ibbankatuwa", "yoda-wewa", "nallur", "kala-wewa", "kayts"],
    ["madras", "persian-gulf", "java", "italy", "calicut", "constantinople"],
  ),
];

const tb = (grade: number, chapter: number, id: string, base: MapBase, en: string, ta: string, places: string[]): MapSet => ({
  id: `g${grade}-${id}`,
  base,
  kind: "textbook",
  grade,
  chapter,
  en,
  ta,
  places,
});

export const TEXTBOOK_MAP_SETS: MapSet[] = [
  // Grade 10
  tb(10, 2, "prehistoric", "lanka", "Map 2.1 · Pre-historic sites", "தேசப்படம் 2.1 · வரலாற்றுக்கு முற்பட்ட கால இடங்கள்", [
    "pahiyangala", "batadombalena", "kitulgala", "bellanbandi", "aligala", "ravana-ella", "bundala", "pathirajawela", "minihagalkanda", "mantai", "horton-plains",
  ]),
  tb(10, 2, "early-settlements", "lanka", "Maps 2.2–2.4 · Burial grounds and early settlements", "தேசப்படம் 2.2–2.4 · மயானங்களும் ஆரம்பக் குடியிருப்புகளும்", [
    "ibbankatuwa", "pomparippu", "anuradhapura", "polonnaruwa", "magama", "kirindi", "kirinda", "kantharodai",
  ]),
  tb(10, 3, "political-power", "lanka", "Political power · Places in the inscriptions", "அரசியல் அதிகாரம் · கல்வெட்டுகளிலுள்ள இடங்கள்", [
    "anuradhapura", "magama", "nagadeepa", "kandalama", "sithulpawwa", "mihintale", "polonnaruwa",
  ]),
  tb(10, 4, "ports", "lanka", "Map 4.1 · Ancient ports and trade", "தேசப்படம் 4.1 · பண்டைய துறைமுகங்களும் வர்த்தகமும்", [
    "mantai", "jambukola", "kayts", "trincomalee", "lankapattana", "chilaw", "kalutara", "galle", "godawaya", "kirinda", "magama", "kantharodai",
  ]),
  tb(10, 5, "irrigation", "lanka", "Ancient tanks and irrigation", "பண்டைய குளங்களும் நீர்ப்பாசனமும்", [
    "kala-wewa", "yoda-wewa", "minneriya", "giritale", "kaudulla", "kantale", "padaviya", "huruluwewa", "nachchaduwa", "nuwara-wewa", "tissa-wewa", "mahakanadarawa", "parakrama-samudra", "minipe", "sorabora", "sigiriya",
  ]),
  tb(10, 7, "kingdoms", "lanka", "Map 7.1 · Capitals after 1215", "தேசப்படம் 7.1 · 1215 இன் பின் இராசதானிகள்", [
    "anuradhapura", "polonnaruwa", "dambadeniya", "yapahuwa", "kurunegala", "gampola", "kotte", "raigama", "seethawaka", "kandy", "jaffna", "dedigama",
  ]),
  tb(10, 8, "kandyan", "lanka", "Kandyan kingdom · Battles and ports", "கண்டி இராச்சியம் · போர்களும் துறைகளும்", [
    "kandy", "danture", "gannoruwa", "randeniwela", "mulleriyawa", "seethawaka", "delgamuwa", "kalpitiya", "chilaw", "trincomalee", "batticaloa",
  ]),
  tb(10, 9, "renaissance", "world", "Renaissance and the new sea routes", "மறுமலர்ச்சியும் புதிய கடல் வழிகளும்", [
    "florence", "venice", "genoa", "rome", "constantinople", "lisbon", "cape", "calicut", "goa", "malacca", "batavia",
  ]),
  tb(10, 10, "forts", "lanka", "Map 10.1 · Portuguese and Dutch forts", "தேசப்படம் 10.1 · போர்த்துக்கேய, ஒல்லாந்தர் கோட்டைகள்", [
    "jaffna", "point-pedro", "kayts", "mannar", "kalpitiya", "chilaw", "negombo", "colombo", "kalutara", "galle", "matara", "batticaloa", "trincomalee",
  ]),

  // Grade 11
  tb(11, 1, "railways", "lanka", "Railways and new towns", "புகையிரதப் பாதைகளும் புதிய நகரங்களும்", [
    "colombo", "kandy", "peradeniya", "gampola", "nawalapitiya", "bandarawela", "badulla", "matale", "ratnapura",
  ]),
  tb(11, 1, "industrial", "world", "Industrial Revolution · Europe and Asia", "கைத்தொழிற் புரட்சி · ஐரோப்பாவும் ஆசியாவும்", [
    "great-britain", "london", "france", "belgium", "germany", "austria", "japan",
  ]),
  tb(11, 2, "british", "lanka", "Map 2.1 · British conquest and resistance", "தேசப்படம் 2.1 · பிரித்தானியர் ஆதிக்கமும் எதிர்ப்பும்", [
    "trincomalee", "fort-frederick", "colombo", "galle", "jaffna", "mannar", "batticaloa", "mullaitivu", "point-pedro", "kandy", "medamahanuwara", "badulla", "matale", "dambulla", "kurunegala", "wariyapola",
  ]),
  tb(11, 2, "india", "world", "British and French centres in India", "இந்தியாவில் பிரித்தானிய, பிரெஞ்சு நிலையங்கள்", [
    "bombay", "calcutta", "madras", "pondicherry", "bay-of-bengal",
  ]),
  tb(11, 5, "tea", "lanka", "Map 5.1 · Tea-growing areas", "தேசப்படம் 5.1 · தேயிலை பயிரிடப்படும் இடங்கள்", [
    "nuwara-eliya", "kandy", "badulla", "ratnapura", "galle", "matara", "talawakele",
  ]),
  tb(11, 5, "coconut", "lanka", "Map 5.2 · Coconut-growing areas", "தேசப்படம் 5.2 · தெங்குப் பயிர்ச்செய்கை இடங்கள்", [
    "kurunegala", "puttalam", "gampaha", "chilaw", "lunuwila",
  ]),
  tb(11, 5, "rubber", "lanka", "Map 5.3 · Rubber-growing areas", "தேசப்படம் 5.3 · இறப்பர் பயிரிடப்பட்ட இடங்கள்", [
    "kalutara", "ratnapura", "kegalle", "agalawatta",
  ]),
  tb(11, 6, "settlements", "lanka", "Map 6.1 · Farming settlement schemes", "தேசப்படம் 6.1 · விவசாயக் குடியேற்றத் திட்டங்கள்", [
    "iranamadu", "vavunikulam", "yoda-wewa", "padaviya", "kantale", "gal-oya-res", "minneriya", "giritale", "parakrama-samudra", "minipe", "udawalawe", "nachchaduwa",
  ]),
  tb(11, 6, "mahaweli", "lanka", "Map 6.2 · Accelerated Mahaweli scheme", "தேசப்படம் 6.2 · துரித மகாவலித் திட்டம்", [
    "mahaweli", "kotmale", "victoria", "randenigala", "rantambe", "polgolla", "bowatenna", "ulhitiya", "maduru-oya-res", "minipe", "kala-wewa", "parakrama-samudra",
  ]),
  tb(11, 6, "industry", "lanka", "Industrial and export zones", "கைத்தொழில், ஏற்றுமதி வலயங்கள்", ["ekala", "ratmalana", "katunayake", "biyagama", "koggala"]),
  tb(11, 7, "revolutions", "world", "Revolutions in the world", "உலகப் புரட்சிகள்", ["paris", "france", "russia", "moscow", "great-britain"]),
  tb(11, 8, "world-war-1", "world", "Map 8.1 · World War I", "தேசப்படம் 8.1 · முதலாம் உலக மகாயுத்தம்", [
    "germany", "austria", "turkey", "bulgaria", "great-britain", "france", "russia", "italy", "serbia", "romania", "greece", "belgium", "sarajevo",
  ]),
  tb(11, 8, "world-war-2", "world", "World War II and the peace", "இரண்டாம் உலக மகாயுத்தமும் சமாதானமும்", [
    "germany", "italy", "japan", "great-britain", "france", "russia", "poland", "hiroshima", "nagasaki", "tokyo", "the-hague",
  ]),
];

export const MAP_SETS = [...PAST_MAP_SETS, ...TEXTBOOK_MAP_SETS];

export function getMapSet(id: string) {
  return MAP_SETS.find((s) => s.id === id) ?? null;
}

export function mapSetsForChapter(grade: number, chapter: number) {
  return TEXTBOOK_MAP_SETS.filter((s) => s.grade === grade && s.chapter === chapter);
}

/** Subjects that have map practice. */
export function hasMaps(subjectId: string) {
  return subjectId.startsWith("history-");
}
