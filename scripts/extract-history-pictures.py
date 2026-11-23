"""Extracts the History pictures into /public as web-sized WebP files. Run once after the sources change:

    python scripts/extract-history-pictures.py      (needs Pillow: pip install pillow)

Sources (kept out of git, see .gitignore):
  content/history-sources/Grade_<10|11>_Assets_Catalogue_<Tamil|English>.docx
      Word copies of the picture catalogues. Their images are in the same order as the
      "### n. Chapter_01_Figure_01" entries of content/<subject>/pictures/Grade_<g>_Picture_Notes.md.
  content/history-sources/Past_Paper_Assets/Original/<year>/Q1_b_*.png
      The Part II Q1 (b) picture questions, the same pictures in every medium.

Output:
  public/history/pictures/<ta|en>/<grade>/<Chapter_01_Figure_01>.webp
  public/history/past-papers/<year>/<Q1_b_ii_Picture_A>.webp
  content/history-pictures.json   – { "<path under public>": [width, height] }, read by build-content.mjs
"""

import io
import json
import re
import sys
import zipfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "content" / "history-sources"
PUBLIC = ROOT / "public"
MAX_W = 1100

SUBJECTS = {"ta": ("Tamil", "history-ol"), "en": ("English", "history-ol-english")}


def save(img: Image.Image, rel: str, sizes: dict) -> None:
    img = img.convert("RGB")
    if img.width > MAX_W:
        img = img.resize((MAX_W, round(img.height * MAX_W / img.width)), Image.LANCZOS)
    out = PUBLIC / rel
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, "WEBP", quality=80, method=6)
    sizes[rel] = [img.width, img.height]


def docx_images(path: Path) -> list[bytes]:
    """Image bytes in the order they appear in the document."""
    with zipfile.ZipFile(path) as z:
        doc = z.read("word/document.xml").decode("utf8")
        rels = dict(re.findall(r'Id="(rId\d+)"[^>]*Target="(media/[^"]+)"', z.read("word/_rels/document.xml.rels").decode("utf8")))
        return [z.read("word/" + rels[r]) for r in re.findall(r'r:embed="([^"]+)"', doc)]


def main() -> None:
    sizes: dict = {}
    for lang, (medium, subject) in SUBJECTS.items():
        for grade in (10, 11):
            notes = (ROOT / "content" / subject / "pictures" / f"Grade_{grade}_Picture_Notes.md").read_text("utf8")
            ids = re.findall(r"^### \d+\.\s+(\S+)", notes, flags=re.M)
            images = docx_images(SRC / f"Grade_{grade}_Assets_Catalogue_{medium}.docx")
            if len(ids) != len(images):
                sys.exit(f"{medium} grade {grade}: {len(ids)} catalogue entries but {len(images)} images")
            for fid, data in zip(ids, images):
                if "_Map_" in fid:  # textbook maps are practised on the interactive map instead
                    continue
                save(Image.open(io.BytesIO(data)), f"history/pictures/{lang}/{grade}/{fid}.webp", sizes)
            print(f"{medium} grade {grade}: {len(ids)} pictures")

    papers = sorted((SRC / "Past_Paper_Assets" / "Original").glob("*/Q1_b_*.png"))
    for p in papers:
        save(Image.open(p), f"history/past-papers/{p.parent.name}/{p.stem}.webp", sizes)
    print(f"past papers: {len(papers)} pictures")

    (ROOT / "content" / "history-pictures.json").write_text(json.dumps(sizes, indent=0, sort_keys=True) + "\n", "utf8")


if __name__ == "__main__":
    main()
