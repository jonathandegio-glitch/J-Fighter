# J-Fighter 0.4.5 — Complete Sprite Cleanup

This patch is a targeted corrective update for **Bad Benny** and **General H.H.**

## What was corrected
- cleaned the two runtime sprite sheets frame-by-frame
- removed detached ghost fragments and stray body pieces left in several frames
- reinforced lower-leg / boot silhouettes where extraction had made them look too thin or partially cut
- regenerated per-frame measured bounds in the character metrics so runtime alignment follows the cleaned silhouettes
- updated cache-busting version references from `v=043`/`v=044` to `v=045`

## Files included
- `game.js`
- `index.html`
- `assets/bad-benny/manifest.js`
- `assets/bad-benny/run/sprite-sheet-alpha.webp`
- `assets/general-hh/manifest.js`
- `assets/general-hh/run/sprite-sheet-alpha.webp`
- `JF_SPRITE_AUDIT_0.4.5.json`

## Intent
This is a **visual integrity patch**. No move list, balance, combat logic or UI layout was intentionally changed.

## Install
Replace the files in your current J-Fighter installation with the contents of this package.
