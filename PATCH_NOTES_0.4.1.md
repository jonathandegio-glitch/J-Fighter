# J-Fighter 0.4.1 — Reference Artwork Adaptation

## Source
Two user-supplied original concept sheets: `1000260868.png` (Bad Benny) and `1000260869.png` (General H.H.).

## Changed
- Extracted actual character pose drawings (not procedural stick figures) from both reference sheets.
- New runtime sheets for `assets/bad-benny` and `assets/solan` in the original Aether 4×15 atlas format (448×288 cells; 1792×4320 atlas).
- Matching `MANIFEST` + `METRICS`, measured frame bounds, native playback/emitters retained.
- Portraits, selection art and cut-ins cropped from the supplied references.
- Menu and HUD identifiers cleaned up; cache versions updated.
- `JF_CHARACTER_QA.html` allows playing back each animation for both fighters.
- Existing arena backgrounds, abilities, sounds, and damage are untouched.

## IMPORTANT ART LIMITATION
The concept sheets do not contain 54 DISTINCT full-resolution source sprites. They contain approximately 31 isolated poses per fighter, with fewer poses for certain moves; this patch maps poses to the 54 required runtime frames. It is **not** equivalent to drawing 108 unique production frames with perfect anatomy. The reference panels have small pixel figures, so some parts may appear rough; this build needs in-game testing before it can be called finished. Source mapping is stored separately for development.

## Installation
Apply these 14 files to the root of the EXISTING J-Fighter repository, preserving paths; do not delete anything. Test `mobile.html?v=041` and `JF_CHARACTER_QA.html`. Roll back the commit if needed.
