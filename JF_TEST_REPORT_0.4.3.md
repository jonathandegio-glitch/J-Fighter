# J-Fighter 0.4.3 — local test report

## Passed
- `node --check`: `game.js`, `menu.js`, `general-hh.js` (no syntax errors).
- Chromium 2D game logic test using injected local source and actual image data URIs (the environment blocks localhost web navigation): game boot reports `ready=true`, fighter sprites and stage decode.
- Menu player select shows precisely `bad-benny` and `general-hh`.
- Bad Benny P1 vs General H.H. CPU: match enters `fight`, inputs/damage flow, zero uncaught JavaScript errors.
- General H.H. P1 vs Bad Benny CPU: match enters `fight`, inputs/damage flow, zero uncaught JavaScript errors.
- Runtime `playable` includes new `general-hh` and `bad-benny`, not original `nib` nor `solan`.

## Not certified
- The screenshot harness did not load external CSS / menu portraits; it tests game logic and asset decoding, not exact final mobile UI.
- The older copied character art still has some visual defects. This patch is an **independent-character/roster migration**, not an artistic rebuild of sprite frames.
- Live GitHub Pages still needs user-side upload verification.

## Deployment
Upload only this patch at the repository root, preserving paths; **do not delete old assets yet**. Once the new build works, legacy `/assets/nib`, `/assets/solan`, `nib.js`, `solan.js` may be deleted in a separate commit. Those legacy files are no longer loaded into the match.
