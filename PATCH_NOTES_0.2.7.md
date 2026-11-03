# J-Fighter Alpha 0.2.7 — Visual Update

This incremental patch is based on J-Fighter Alpha 0.2.5 with the complete restored `assets` folder (0.2.6).

## Changes
- General H.H.: new pixel-aircraft artwork for the first special and the Ultimate; new rally aura, explosion, revised effects.
- Bad Benny: improved dash dust, new rally aura, and an 8-projectile machine-gun barrage replacing the previous homing paper-aircraft Ultimate. A machine-gun overlay appears during the barrage.
- Clean pixel-art icons for both characters' moves.
- Arena assets sharpened with architectural details drawn from the two original character concept sheets. These are not fully hand-redrawn scenes; further quality work is still possible.
- English fighter HUD naming fix (opponent's display name is shown, not the engine's internal ID).
- Cache-busting URLs for modified scripts and images.

## How to apply
Extract and drag the files and folders *inside* this ZIP to the root of your GitHub repository, preserving paths. Allow same-name files to be replaced. Do not upload the ZIP itself or create an extra top-level folder.

## Verification and known limits
- JavaScript syntax verified with `node --check`.
- ZIP integrity verified.
- Interactive browser rendering and mobile performance were not verified in this environment.
- Character animation frames are reused from the existing 0.2.6 artwork; the new machine gun is a separate overlay, not yet a fully redrawn character animation.
- The 2 arena backgrounds have been enhanced using available source images, but are not yet newly illustrated, high-resolution stages.
- Keep a backup or a tagged GitHub commit before deploying.
