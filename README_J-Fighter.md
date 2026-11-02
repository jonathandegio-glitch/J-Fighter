# 🥊 J-Fighter

**J-Fighter** è un progetto di picchiaduro arcade 2D personalizzabile, giocabile nel browser da PC e smartphone. Nasce come adattamento di **Grupon Fighter**, con l'obiettivo di introdurre personaggi originali, scenari dedicati e, in seguito, nuove mosse speciali.

> 🚧 **Progetto in sviluppo.** La prima versione utilizza il motore e le funzionalità di Grupon Fighter. Le personalizzazioni descritte nella roadmap non sono ancora tutte implementate.

## 🎮 Funzionalità attuali della base

- Combattimenti contro la CPU e multiplayer locale su tastiera.
- Controlli touch su smartphone.
- Pugni, calci e una mossa speciale.
- Grafica arcade retrò ed effetti CRT.
- HTML, CSS e JavaScript senza framework.

## 🕹️ Comandi

| Azione | Giocatore 1 | Giocatore 2 | Smartphone |
| --- | --- | --- | --- |
| Movimento | A / D | ← / → | ◀ / ▶ |
| Salto | W | ↑ | ▲ / B |
| Pugno | F | K | A |
| Calcio | G | L | X |
| Speciale | H | ; | Y |
| Conferma | Invio | — | Start |
| Selezione / CPU | Spazio | — | Select |

*I comandi sono quelli documentati dal progetto originale e potranno cambiare durante lo sviluppo.*

## 🚀 Giocare online

Quando GitHub Pages sarà attivo, J-Fighter sarà raggiungibile all'indirizzo:

**https://jonathandegio-glitch.github.io/J-Fighter/**

La pubblicazione va verificata: questo link non implica che il gioco sia già online.

## 🎨 Personalizzazione

### Aggiungere un personaggio

Il README originale indica di modificare l'oggetto `characters` in `js/game.js`, definendo nome, dimensioni, velocità, mosse e animazioni. La struttura effettiva del codice va verificata prima di applicare modifiche.

**Obiettivo J-Fighter:** supportare sprite PNG e sprite sheet animati, per sostituire facilmente l'aspetto dei combattenti. Questo supporto è **da sviluppare**.

### Aggiungere uno scenario

Gli scenari sono definiti nei file di `js/stages/` e richiamati tramite `js/stages.js`. Possono utilizzare immagini e livelli di sfondo con velocità di scorrimento diverse.

### Nuove mosse speciali

La base include una mossa speciale. La seconda mossa per personaggio e i relativi effetti visivi sono previsti in una fase successiva.

## 🧭 Roadmap

- [ ] Verificare la versione originale su GitHub Pages e smartphone.
- [ ] Analizzare due combattenti e le loro animazioni.
- [ ] Integrare il caricamento di sprite PNG animati.
- [ ] Creare un personaggio campione e collaudarlo.
- [ ] Creare due personaggi completi e uno scenario personalizzato.
- [ ] Implementare una seconda mossa speciale per personaggio.
- [ ] Preparare l'architettura per il futuro multiplayer online.

## 🛠️ Sviluppo locale

Il progetto utilizza moduli JavaScript: per eseguirlo in locale occorre un server web, per esempio dalla cartella del progetto:

```bash
python3 -m http.server 8000
```

Poi aprire `http://localhost:8000/` nel browser.

## 🤝 Crediti e progetto originale

**J-Fighter è un adattamento indipendente di [Grupon Fighter](https://github.com/fogolin/js-fighter)**, progetto originale creato per il gruppo di amici Grupon, ambientato a Brasília, Brasile.

Tutti i meriti per il motore e le risorse originali spettano ai rispettivi autori. J-Fighter non è un progetto ufficiale di Grupon Fighter e non è affiliato ai suoi creatori.

**Nota su licenza e riutilizzo:** nello ZIP originale esaminato non risulta un file `LICENSE`. L'invito dell'autore a creare versioni proprie nel README non equivale automaticamente a una licenza open source completa. Prima di pubblicare modifiche o redistribuire codice e risorse originali, è opportuno verificare i termini applicabili o ottenere il permesso dell'autore. I crediti non sostituiscono l'autorizzazione.

---

*J-Fighter — un progetto arcade personalizzato, in evoluzione.* 🦈
