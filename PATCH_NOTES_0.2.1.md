# J-Fighter Alpha 0.2.1 — Fix notes

- English UI for fighter selection, arena setup, match HUD, settings, pause and error messages.
- Both fighters selected: synchronize player atlas before starting each match.
- Stage fallback: use loaded plaza art if the requested stage image is missing; prevents silent failure.
- Lightweight preload: removes old bulk asset download and clears obsolete Aether Clash cache.
- Load only active fighter textures (Bad Benny and General H.H.) plus essential runtime art; unused legacy Fenr fighter sprites no longer load on mobile.
- Canvas render exceptions are logged rather than ending the animation loop silently.

## Test on GitHub

Replace all files in this patch at repository root (not in a nested folder). For browser cache, open `mobile.html?v=0211`. Test both matchups and both arenas. If the arena remains blank, please send browser console error details.

## Limitations

Not verified end-to-end in Chromium; the runtime browser in this environment blocks file:// and localhost navigation. This is a source-level correction. The original fighters' animation frames remain an early reference extraction and still require detailed refinement.
