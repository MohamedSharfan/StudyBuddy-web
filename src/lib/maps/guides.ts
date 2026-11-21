import "server-only";
import fs from "node:fs/promises";
import path from "node:path";

const cache = new Map<string, Record<string, string>>();

/** The map-learning guide from the notes (markdown), per grade. Built by scripts/build-content.mjs. */
export async function loadMapGuides(subjectId: string): Promise<Record<string, string>> {
  if (!/^[a-z0-9-]+$/.test(subjectId)) return {};
  const hit = cache.get(subjectId);
  if (hit) return hit;
  try {
    const data = JSON.parse(await fs.readFile(path.join(process.cwd(), "generated", "map-guides", `${subjectId}.json`), "utf8"));
    cache.set(subjectId, data);
    return data;
  } catch {
    return {};
  }
}
