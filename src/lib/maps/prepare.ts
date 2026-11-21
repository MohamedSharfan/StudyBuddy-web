import { LANKA_BOX } from "./lanka-geometry";
import { getPlace, toleranceKm } from "./places";
import type { MapBase, MapSet } from "./sets";

// Kept here (not imported from world-geometry) so the large world outline only loads on world maps.
const WORLD_BOX = { lon0: -20, lat1: 66, cos: 0.906308, k: 6.4905, width: 1000, height: 675 };

export type MapPoint = [number, number];

export type PreparedPlace = {
  id: string;
  name: string;
  kind: string;
  note?: string;
  at: MapPoint;
  line?: MapPoint[];
  /** Tap tolerance, in map units. */
  r: number;
};

export type PreparedMap = {
  base: MapBase;
  width: number;
  height: number;
  /** Map units per kilometre (for "12 km away"). */
  unitsPerKm: number;
  places: PreparedPlace[];
};

function projector(base: MapBase) {
  const b = base === "lanka" ? LANKA_BOX : WORLD_BOX;
  return {
    width: b.width,
    height: b.height,
    unitsPerKm: b.k / 111.2,
    project: ([lat, lon]: [number, number]): MapPoint => [
      +((lon - b.lon0) * b.cos * b.k).toFixed(1),
      +((b.lat1 - lat) * b.k).toFixed(1),
    ],
  };
}

/** Places of a set, projected onto its base map and named in the student's language. */
export function prepareMap(set: MapSet, lang: string): PreparedMap {
  const p = projector(set.base);
  const en = lang === "en";
  return {
    base: set.base,
    width: p.width,
    height: p.height,
    unitsPerKm: p.unitsPerKm,
    places: set.places.map((id) => {
      const place = getPlace(id);
      return {
        id,
        name: en ? place.en : place.ta,
        kind: place.kind,
        note: (en ? place.noteEn : place.noteTa) || undefined,
        at: p.project(place.at),
        line: place.line?.map(p.project),
        r: +(toleranceKm(place, set.base) * p.unitsPerKm).toFixed(1),
      };
    }),
  };
}
