#!/usr/bin/env python3
"""Lightweight RAM monitor (stdlib only, Linux). Usage: python3 mem_monitor.py [seconds] [out.csv]
Run it in a second terminal during meshing/CFD to see how close you get to 8 GB."""
import sys, time
def meminfo():
    d={}
    for l in open("/proc/meminfo"):
        k,v=l.split(":"); d[k]=int(v.split()[0])
    return d
iv=float(sys.argv[1]) if len(sys.argv)>1 else 5
out=open(sys.argv[2],"a") if len(sys.argv)>2 else None
while True:
    m=meminfo(); used=(m["MemTotal"]-m["MemAvailable"])/1048576; tot=m["MemTotal"]/1048576
    line=f"{time.strftime('%H:%M:%S')},{used:.2f},{tot:.2f}"
    print(f"RAM used {used:.2f}/{tot:.2f} GB"+("  !! >85%% - STOP HEAVY JOBS"%() if used/tot>0.85 else ""))
    if out: out.write(line+"\n"); out.flush()
    time.sleep(iv)
