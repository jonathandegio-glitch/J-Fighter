# J-Fighter Alpha 0.2.9 – Arena & Combat refinement

This package includes the requested visual and gameplay refinements for **Bad Benny** and **General H.H.**

## Included changes
- Replaced both custom arena backgrounds with new higher-definition versions:
  - `Duel Plaza` for Bad Benny
  - `Storm Plaza` for General H.H.
- Adjusted the character ground anchoring for **Bad Benny** and **General H.H.** so their feet sit lower and read better against the floor.
- Refined **General H.H.** ultimate aircraft trajectories so the planes visually converge toward the enemy position before impact.
- Reduced the damage of **Special 2** for both custom fighters to a mid-tier value (20) to better separate it from the ultimate.
- Bumped arena asset versions to reduce stale browser-cache issues.

## Files changed
- `game.js`
- `match.js`
- `nib.js`
- `solan.js`
- `assets/menu/jf-nib-stage.webp`
- `assets/menu/jf-solan-stage.webp`

## Suggested upload method
Upload the whole package over the existing project and allow file replacement. Then hard refresh GitHub Pages / browser cache.
