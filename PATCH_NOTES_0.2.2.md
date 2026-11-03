# J-Fighter Alpha 0.2.2 — loading hotfix

This patch changes only `game.js`, `index.html`, and `mobile.html`.

- Only four essential image files gate startup: 2 arena backgrounds and 2 fighter sprite atlases.
- All skill-effect art and decorative artwork are loaded asynchronously after the game starts.
- Missing sprites and script failures appear visibly with exact file paths rather than a permanent loading screen.
- 12-second limit for essential images; 18-second global diagnostic.

## Install
Extract the ZIP and upload `game.js`, `index.html`, `mobile.html` at GitHub repository root (replacing previous versions). Navigate to `mobile.html?v=0222` after publication.

## Known limitations
This is a source-level fix. Browser execution and GitHub Pages network behavior could not be fully tested in the current runtime. If an error message appears, send a screenshot of its exact wording.
