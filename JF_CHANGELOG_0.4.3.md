# J-Fighter Alpha 0.4.3 — Roster migration / independent General H.H.

## Scope
- Two active playable IDs only: `bad-benny`, `general-hh`.
- `general-hh` has its own manifest, METRICS, kit and assets. No native Solan manifest/kit is loaded.
- Legacy Nib / Bad Benny Legacy removed from roster and boot. Assets are *not physically deleted* by this ZIP; deleting them on GitHub requires a commit that deletes files separately.
- General H.H. uses the latest approved art/sprites from 0.4.2 initially, copied into his independent folder. This does **not** fix the remaining anatomical defects.
- Moved essential attack effect resources into each new character folder; preserved battle arenas and tuning.
- Before installing: create a backup commit / tag. Upload preserving exact paths at repository root. Check `assets/general-hh/manifest.js` and its sprite sheet after upload.
- Browser test: `mobile.html?v=043`. Run Bad Benny vs General H.H. and reverse, then hurt/ultimate.

## Remove old character directories?
Do NOT delete `assets/solan` or `assets/nib` until this build has been proven functional online. They are no longer loaded into the game. This is an intentional safety measure to avoid reintroducing missing-asset crashes.

**Internal check:** Tested both fighter orders in Chromium with local injected scripts and real sprite/stage images; match reached `fight` without JS errors. The test could not navigate to localhost due administrator policy.
