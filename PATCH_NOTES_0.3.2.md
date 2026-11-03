# J-Fighter 0.3.2 – rigged sprite atlas rebuild (experimental)

This patch replaces both defective pixel-art atlases with complete-frame sprites and explicit independent leg poses.

What changed:
- Exact native Aether Clash layout: 4 columns, 15 rows, 448x288 cells, 1792x4320 canvas.
- Head/torso retained from the earlier pre-0.3.1 artwork; no shared static bottom half.
- Two articulated trouser/boot segments are rendered in every applicable frame, with walking/running stride variation.
- Entirely coherent down/recover frames built without detached anatomical fragments.
- Invalid-frame fallback kept in game renderer and asset version advanced to 032.
- Both arenas and combat special effects unchanged.

Caveat: Reconstructed lower limbs are procedural pixel art, so poses are consistent but are not hand-drawn animation frames. This is a QA prototype to stop invisible limbs and verify the pipeline, not final professional sprite art.

Upload the five files in the patch to existing same paths. Do not delete old folders.
