# Hardware Assessment — AR27 Racing

> **ATTENZIONE:** questi numeri sono della **sandbox cloud** in cui lavora Claude (rilevati il 2026-11-25), **NON** del tuo laptop. Esegui `scripts/hw_probe.sh` sul tuo PC e incolla l'output nella sezione "Laptop utente".

## Sandbox cloud (misurata)
| Voce | Valore |
|---|---|
| OS | Ubuntu 24.04.5 LTS (Linux 6.18) |
| CPU | Intel Xeon 2.1 GHz, 4 vCPU |
| RAM | 15 GB, no swap |
| GPU | nessuna |
| Disco | 60 GB liberi |
| Software | Python 3 (numpy/pandas/matplotlib/PIL ok, **scipy assente**), git, node. **Assenti:** Blender, FreeCAD, OpenFOAM, ParaView |
| Rete | solo host consentiti dal proxy: **fia.com bloccato** |

## Laptop utente (vincolo di progetto)
RAM 8 GB, low-end, GPU/CPU/disco **da misurare** → TODO con `hw_probe.sh`.

## Cosa è realistico su 8 GB (stima, da verificare)
| Attività | Fattibile? |
|---|---|
| Blender modeling low-poly + render Eevee/Cycles basso sample | Sì, con scena leggera |
| FreeCAD geometria semplice | Sì |
| OpenFOAM simpleFoam RANS, mesh ≤ ~300k celle | Probabile (~2–4 GB), da testare |
| Mesh >1M celle, LES/DES, auto completa ad alta fedeltà | **No** |
| Più app pesanti insieme | **No** (regola: una alla volta) |
