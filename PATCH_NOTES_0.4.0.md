# J-Fighter 0.4.0 — Bad Benny integration for real game testing

This patch adds **Bad Benny (NEW)** as `bad-benny` in the existing playable roster; **Bad Benny Legacy** (the existing Nib-slot fighter) and General H.H. remain available for comparisons. It adds a separate sprite sheet, full manifest and metrics, combat kit, portrait placeholders, HUD, character selection and AI handling. The current two arenas are **not changed**.

After uploading files with their exact paths, test `Bad Benny (NEW)` as P1 against General H.H., and General H.H. as P1 against the new fighter. Then compare `Bad Benny Legacy` against General H.H. You can inspect sprite animations at `/JF_CHARACTER_QA.html`.

This is a playable **integration / QA build**, not yet the final polished illustration: the new figure is procedurally rigged and is not as visually detailed as the shipped Aether Clash fighters. Portraits and ability icons are temporary copies. Be sure not to replace native `/assets/nib` or `/assets/solan`. No change to the other fighter's sprites.

If you encounter a visual error send a screenshot of both the canvas and browser Console.
