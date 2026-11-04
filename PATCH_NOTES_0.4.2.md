# J-Fighter 0.4.2 — Sprite/Hit Reaction Repair

Base: installed 0.4.1 patch. **Only changed files in this ZIP.**

- **Confirmed JS rendering crash:** `drawHero()` used `(hero.action||'').includes('ultimate')`, but `hero.action` is an OBJECT. This throws `TypeError: .includes is not a function` during Bad Benny attacks, after the canvas background has been drawn and before the opponent is drawn, making General H.H. disappear. Replaced with a safe `hero.action?.type === 'ultimate'` test.
- Inspected the actual 0.4.1 sprite atlases (15 rows each), including all hurt frames.
- 54 required atlas frames per custom character are populated. Jump/doublejump intentionally leave 3 unused cells each.
- Enlarged *existing pose-specific* lower-leg edges minimally (1 source pixel). No copy/paste of static legs. A small 12% consistent draw scale increase for both new fighters improves readability without changing hitbox/HP/speed.
- Removed tiny orphaned image components only when separated from the body and sufficiently far away; cleared invisible RGB outside alpha.
- In hit-stun, General H.H. uses a complete first hurt frame to avoid the visibly unstable reaction sequence. Recover also uses a stable frame. This is an interim animation safeguard, not a fully redrawn hurt animation.
- Replaced General H.H. Ultimate cut-in with a crop of the aircraft-bombing scene from the supplied design sheet.
- Cache-busted the updated art and JS to `?v=042`.
- Arena art, balance, machine gun, abilities, the current roster and legacy characters have NOT been modified.

## Known limitations / QA status
- Every required atlas frame has nonempty visible pixels; manifests have 15 rows and metric data.
- Full live match browser QA could not be run here: local Chromium navigation returned `ERR_BLOCKED_BY_ADMINISTRATOR`.
- A 1px lower-leg widening and a 12% scale change improve thickness but do not redraw anatomically missing legs or re-author the entire animation; do not claim otherwise.
- The confirmed render exception was repaired statically. Full in-browser verification is still blocked in the current environment; residual visibility problems would require a console log or recorded state.

## Upload
From repository root, upload the paths in ZIP unchanged. Do NOT delete `assets` or existing folders.
Testing URL: `mobile.html?v=042`.
