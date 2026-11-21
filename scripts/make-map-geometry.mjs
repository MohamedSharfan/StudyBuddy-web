// Builds compact SVG paths for the Sri Lanka and world map-practice bases from Natural Earth (world-atlas).
// Usage: node make-geometry.mjs <out.ts>
import fs from "node:fs";
import { feature, mesh } from "topojson-client";

const out = process.argv[2];
const load = (f) => JSON.parse(fs.readFileSync(new URL(`./node_modules/world-atlas/${f}`, import.meta.url)));

// Douglas–Peucker on projected points
function simplify(pts, tol) {
  if (pts.length < 4) return pts;
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    let max = 0, idx = -1;
    const [ax, ay] = pts[a], [bx, by] = pts[b];
    const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1;
    for (let i = a + 1; i < b; i++) {
      const d = Math.abs(dy * (pts[i][0] - ax) - dx * (pts[i][1] - ay)) / len;
      if (d > max) { max = d; idx = i; }
    }
    if (max > tol && idx > 0) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}

// Sutherland–Hodgman clip of a lon/lat ring to a box (keeps the paths small).
function clipRing(ring, b) {
  const edges = [
    (p) => p[0] >= b.lon0, (p) => p[0] <= b.lon1, (p) => p[1] >= b.lat0, (p) => p[1] <= b.lat1,
  ];
  const cut = [
    (a, c) => [b.lon0, a[1] + ((c[1] - a[1]) * (b.lon0 - a[0])) / (c[0] - a[0])],
    (a, c) => [b.lon1, a[1] + ((c[1] - a[1]) * (b.lon1 - a[0])) / (c[0] - a[0])],
    (a, c) => [a[0] + ((c[0] - a[0]) * (b.lat0 - a[1])) / (c[1] - a[1]), b.lat0],
    (a, c) => [a[0] + ((c[0] - a[0]) * (b.lat1 - a[1])) / (c[1] - a[1]), b.lat1],
  ];
  let pts = ring;
  for (let e = 0; e < 4; e++) {
    const res = [];
    for (let i = 0; i < pts.length; i++) {
      const cur = pts[i], prev = pts[(i + pts.length - 1) % pts.length];
      const ci = edges[e](cur), pi = edges[e](prev);
      if (ci) { if (!pi) res.push(cut[e](prev, cur)); res.push(cur); }
      else if (pi) res.push(cut[e](prev, cur));
    }
    pts = res;
    if (!pts.length) break;
  }
  if (pts.length) pts.push(pts[0]);
  return pts;
}

function ringsOf(geom) {
  if (geom?.type === "FeatureCollection") return geom.features.flatMap((f) => ringsOf(f.geometry));
  if (!geom) return [];
  if (geom.type === "Polygon") return geom.coordinates;
  if (geom.type === "MultiPolygon") return geom.coordinates.flat();
  if (geom.type === "LineString") return [geom.coordinates];
  if (geom.type === "MultiLineString") return geom.coordinates;
  if (geom.type === "GeometryCollection") return geom.geometries.flatMap(ringsOf);
  return [];
}

function toPath(rings, project, { tol, closed, keepRing }) {
  let d = "";
  for (const ring of rings) {
    if (keepRing && !keepRing(ring)) continue;
    let pts = ring.map(([lon, lat]) => project(lon, lat));
    if (closed && pts.length > 4) {
      // A closed ring starts and ends on the same point; split it at the farthest point so each half simplifies.
      let far = 0, best = -1;
      pts.forEach(([x, y], i) => { const d = Math.hypot(x - pts[0][0], y - pts[0][1]); if (d > best) { best = d; far = i; } });
      pts = [...simplify(pts.slice(0, far + 1), tol).slice(0, -1), ...simplify(pts.slice(far), tol)];
    } else pts = simplify(pts, tol);
    if (pts.length < (closed ? 3 : 2)) continue;
    d += "M" + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L") + (closed ? "Z" : "");
  }
  return d;
}

// ── Sri Lanka ──
const LK = { lon0: 79.45, lon1: 82.05, lat0: 5.8, lat1: 9.95 };
const lkCos = Math.cos((7.8 * Math.PI) / 180);
const LK_K = 1000 / ((LK.lon1 - LK.lon0) * lkCos);
const lkProject = (lon, lat) => [(lon - LK.lon0) * lkCos * LK_K, (LK.lat1 - lat) * LK_K];
const c10 = load("countries-10m.json");
const lanka = feature(c10, c10.objects.countries).features.find((f) => f.properties.name === "Sri Lanka");
const india = feature(c10, c10.objects.countries).features.find((f) => f.properties.name === "India");
const lkPath = toPath(ringsOf(lanka.geometry), lkProject, { tol: 0.6, closed: true });
const inBoxLK = (ring) => ring.some(([lon, lat]) => lon > LK.lon0 - 0.5 && lon < LK.lon1 && lat > LK.lat0 && lat < LK.lat1 + 0.5);
const indiaPath = toPath(ringsOf(india.geometry).map((r) => clipRing(r, { lon0: LK.lon0 - 1, lon1: LK.lon1, lat0: LK.lat0, lat1: LK.lat1 + 1 })), lkProject, { tol: 1, closed: true, keepRing: (r) => r.length > 3 });
const lkH = (LK.lat1 - LK.lat0) * LK_K;

// ── World (Europe – Africa – Asia, the part used in O/L map questions) ──
const W = { lon0: -20, lon1: 150, lat0: -38, lat1: 66 };
const wCos = Math.cos((25 * Math.PI) / 180);
const W_K = 1000 / ((W.lon1 - W.lon0) * wCos);
const wProject = (lon, lat) => [(lon - W.lon0) * wCos * W_K, (W.lat1 - lat) * W_K];
const inBoxW = (ring) => ring.some(([lon, lat]) => lon > W.lon0 - 15 && lon < W.lon1 + 15 && lat > W.lat0 - 10 && lat < W.lat1 + 10);
const l50 = load("land-50m.json");
const c50 = load("countries-110m.json");
const wClip = { lon0: W.lon0 - 2, lon1: W.lon1 + 2, lat0: W.lat0 - 2, lat1: W.lat1 + 2 };
const landPath = toPath(ringsOf(feature(l50, l50.objects.land)).filter(inBoxW).map((r) => clipRing(r, wClip)), wProject, { tol: 0.9, closed: true, keepRing: (r) => r.length > 3 });
const borders = mesh(c50, c50.objects.countries, (a, b) => a !== b);
const borderPath = toPath(ringsOf(borders), wProject, { tol: 0.8, closed: false, keepRing: (r) => r.every(([lon, lat]) => lon > W.lon0 - 5 && lon < W.lon1 + 5 && lat > W.lat0 - 5 && lat < W.lat1 + 5) });
const wH = (W.lat1 - W.lat0) * W_K;

const ts = `// Generated by make-geometry.mjs from Natural Earth (world-atlas 2.0.2, public domain). Do not edit by hand.
// Projections are equirectangular, scaled so the map is 1000 units wide.

export const LANKA_BOX = ${JSON.stringify({ ...LK, cos: +lkCos.toFixed(6), k: +LK_K.toFixed(4), width: 1000, height: +lkH.toFixed(1) })};
export const LANKA_PATH = ${JSON.stringify(lkPath)};
export const LANKA_INDIA_PATH = ${JSON.stringify(indiaPath)};

export const WORLD_BOX = ${JSON.stringify({ ...W, cos: +wCos.toFixed(6), k: +W_K.toFixed(4), width: 1000, height: +wH.toFixed(1) })};
export const WORLD_LAND_PATH = ${JSON.stringify(landPath)};
export const WORLD_BORDER_PATH = ${JSON.stringify(borderPath)};
`;
fs.writeFileSync(out, ts);
console.log("lanka", lkPath.length, "india", indiaPath.length, "land", landPath.length, "borders", borderPath.length, "sizes", lkH.toFixed(0), wH.toFixed(0));
