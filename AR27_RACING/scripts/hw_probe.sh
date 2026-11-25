#!/usr/bin/env bash
# Prints hardware/software facts. Run it ON YOUR LAPTOP (Linux/WSL/macOS) and paste output into reports/HARDWARE_ASSESSMENT.md
echo "== OS =="; uname -a; cat /etc/os-release 2>/dev/null | head -3
echo "== CPU =="; (nproc || sysctl -n hw.ncpu) 2>/dev/null; lscpu 2>/dev/null | grep -E "Model name"
echo "== RAM =="; free -h 2>/dev/null || vm_stat
echo "== DISK =="; df -h . | tail -2
echo "== GPU =="; (lspci 2>/dev/null | grep -iE "vga|3d") || echo "n/d"
echo "== SOFTWARE =="
for t in python3 git blender freecad simpleFoam blockMesh snappyHexMesh paraview ffmpeg; do printf "%-15s" $t; command -v $t || echo "-"; done
