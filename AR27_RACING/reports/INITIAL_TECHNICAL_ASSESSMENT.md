# Initial Technical Assessment — AR27-01
Data: 2026-11-25 · Scadenza: 2027-01-31 (67 giorni)

## 1. Onestà sul contesto
- Claude lavora in una **sandbox cloud Linux**, non sul tuo laptop. Posso creare file/script/modelli procedurali nel repo; **non** posso installare né eseguire software sul tuo PC.
- Blender, FreeCAD, OpenFOAM, ParaView **non sono installati** qui. Posso valutare se installarli nella sandbox (richiede la tua approvazione e verifica della rete) per generare geometrie/CFD di prova, ma i risultati su 15 GB/4 vCPU **non** dimostrano che girino sul tuo 8 GB.
- Il progetto vive in `AR27_RACING/` dentro il repo `aryax7ari/portfolio`, branch `claude/jolly-galileo-5puhw7`.

## 2. Fattibile
- Repo, dashboard, piani, documentazione, checklist regolamento.
- Geometria procedurale low-poly (script Python/Blender `bpy`) con componenti separati, versione visual + versione CFD semplificata.
- CFD **RANS stazionario** su geometria semplificata a mesh grossolana (obiettivo 100–300k celle) — un caso verificato valgono più di molti falliti.
- Post-processing Cd/Cl con Python, grafici, report.
- Piano TikTok 9:16, livery con logo AR.

## 3. Non fattibile
- CFD ad alta fedeltà di una F1 completa su 8 GB.
- Conformità regolamentare "certificata": possiamo solo documentare un controllo dimensionale rispetto ai PDF.
- Stima di prestazioni reali (tempi sul giro): i risultati sono confronti **relativi** su geometria semplificata.

## 4. Scelte software
Blender (visual/render) · FreeCAD (STEP) · OpenFOAM + snappyHexMesh + ParaView · Python/NumPy/Pandas/Matplotlib (scipy da installare) · Git. Tutto gratuito; niente API a pagamento.

## 5. Strategia CFD e memoria
Livelli 1→4 come da brief. Mesh: blockMesh + snappyHexMesh con refinement locale, mezzo modello (simmetria), `simpleFoam` + k-ω SST con wall functions, mesh 100–300k; `mem_monitor.py` in parallelo; stop se RAM >85%. Un solo run alla volta, `writeInterval` alto, niente salvataggio di campi inutili.

## 6. Regolamenti
Ricerca avviata: esistono issue 2026 del Section C (ultima indicata: Iss 19, 2026-06-25) e una prima issue 2027 ratificata dal WMSC con modifiche soprattutto alla power unit e aero "minore". **PDF non letti** (fia.com bloccato dal proxy): **azione per te** — scarica da https://www.fia.com/regulation/category/2182 il Section C (e il 2027 Technical Regulations) e mettili in `research/regulations/`. Vedi `COMPLIANCE_CHECKLIST.md`.

## 7. Priorità di sviluppo
1. Hardware laptop reale (`hw_probe.sh`) → 2. PDF FIA → 3. installare Blender/OpenFOAM sul laptop (con tua approvazione) → 4. test Livello 1 → 5. modello baseline → 6. CFD Livello 2.

## 7b. Rischi principali
| Rischio | Mitigazione |
|---|---|
| RAM 8 GB insufficiente per mesh | mesh più grossa, mezzo modello, geometria più semplice |
| OpenFOAM su Windows (WSL2 consuma RAM) | verificare setup; alternativa macchina/VM leggera |
| Tempi stretti (67 gg) | priorità: modello visual + 1 CFD verificata |
| Regole 2027 ancora in evoluzione | checklist con stato OFFICIAL/UNVERIFIED, controllo issue |
| Ambienti diversi (sandbox ≠ laptop) | ogni risultato annota dove è stato prodotto |

## 8. Schedule realistico
Vedi `documentation/SCHEDULE.md`.
