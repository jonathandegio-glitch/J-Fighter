# J-FIGHTER Alpha 0.2 — test bundle

Prima versione unificata: branding, due personaggi giocabili (BAD BENNY e GENERAL H.H.), 14 animazioni per ciascuno con 50 slot, 2 speciali + ultimate e due ambientazioni originali.

## Installazione su GitHub Pages

1. Apri il tuo repository **J-Fighter** su GitHub.
2. Carica **il contenuto della cartella ZIP**, non la cartella stessa e non il file ZIP. Nella root di GitHub deve esserci `index.html`.
3. GitHub → Settings → Pages → Deploy from a branch → `main` / `/ (root)`.
4. Avvia `https://jonathandegio-glitch.github.io/J-Fighter/` o la sottocartella `/test/` se hai caricato tutto in `test/`.

## Controlli

WASD = movimento / salto / abbassamento; spazio = combo 3 colpi; I = speciale 1; O = speciale 2; P = Ultimate; ESC = pausa. Su smartphone usa i pulsanti touch.

## Abilità implementate

BAD BENNY: MARCIA SU ROMA (carica e colpo); DISCORSO ALLA NAZIONE (buff offensivo di durata 6 s); DUCE BOMBER (3 proiettili guidati con effetto esplosivo).

GENERAL H.H.: LUFTWAFFE (proiettile aereo); REICH RALLY (buff offensivo di durata 6 s); WELTKRIEG (3 onde ad area con effetti artiglieria).

Le abilità sono implementate adattando le rispettive routine dei kit NIB e SOLAN di Aether Clash: questo è **un primo pass giocabile**, non simulazioni fisiche indipendenti di aerei e carri.

## Qualità grafica e limiti

Le tavole fornite sono immagini composite a risoluzione 1536×1024, non sprite trasparenti originali. Per preservare l'estetica sono state estratte direttamente le pose e create sprite sheet compatibili, ma diversi fotogrammi sono duplicati/interpolati tramite riuso di pose. Le pose/texture possono richiedere pulizia manuale e ulteriore animazione. Le due arene sono dipinte proceduralmente e non ricostruiscono 1:1 gli screenshot di riferimento.

**Verifica automatica**: sintassi JS, struttura di manifest, integrità degli asset e avvio locale. Il gameplay andrà valutato sul dispositivo dopo caricamento. Non dichiarare questa versione come finale.

## Crediti e licenze

Motore e gameplay basati su Aether Clash. Conservati i file `LICENSE`, `LICENSE-ASSETS.md`, `README.md` e documentazione originale. Le risorse originali sono soggette alle relative licenze e restrizioni; l'uso commerciale va valutato separatamente.
Le immagini dei personaggi sono tratte esclusivamente dalle concept sheet fornite dall'utente; diritti da verificare separatamente.
