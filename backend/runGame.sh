#!/bin/bash

FILE_PATH="$1"
PLATFORM_NAME="$2"

# Check if the file path and platform name are provided
if [ -z "$FILE_PATH" ] || [ -z "$PLATFORM_NAME" ]; then
  echo "Usage: $0 <FILE_PATH> <PLATFORM_NAME>"
  exit 1
fi

# Mapping of platform names to emulator paths
get_emulator_path() {
  case "$1" in
    "Nintendo 3DS")
      echo "/Applications/UniCade/Emulators/Nintendo 3DS/Citra/canary/citra-qt.app/Contents/MacOS/citra-qt"
      ;;
    "Nintendo 64")
      echo "/Applications/UniCade/Emulators/OpenEmu/OpenEmu.app/Contents/MacOS/OpenEmu"
      ;;
    "Nintendo DS")
      echo "/Applications/UniCade/Emulators/Nintendo DS/DeSmuME/DeSmuME.app/Contents/MacOS/DeSmuME"
      ;;
    "Nintendo GBA")
      echo "/Applications/UniCade/Emulators/Nintendo GBA/mGBA/mGBA.app/Contents/MacOS/mGBA"
      ;;
    "Nintendo Gamecube" | "Nintendo Wii")
      echo "/Applications/UniCade/Emulators/Nintendo GC & Wii/Dolphin/Dolphin.app/Contents/MacOS/Dolphin"
      ;;
    "Nintendo NES")
      echo "/Applications/UniCade/Emulators/OpenEmu/OpenEmu.app/Contents/MacOS/OpenEmu"
      ;;
    "Nintendo SNES")
      echo "/Applications/UniCade/Emulators/OpenEmu/OpenEmu.app/Contents/MacOS/OpenEmu"
      ;;
    "Nintendo Switch")
      echo "/Applications/UniCade/Emulators/Nintendo Switch/Ryujinx/Ryujinx.app/Contents/MacOS/Ryujinx"
      ;;
    "Sega Dreamcast")
      echo "/Applications/UniCade/Emulators/Sega Dreamcast/Redream/Redream.app/Contents/MacOS/Redream"
      ;;
    "Sony Playstation 1")
      echo "/Applications/UniCade/Emulators/Sony Playstation 1/DuckStation/DuckStation.app/Contents/MacOS/DuckStation"
      ;;
    "Sony Playstation 2")
      echo "/Applications/UniCade/Emulators/Sony Playstation 2/PCSX2/PCSX2.app/Contents/MacOS/PCSX2"
      ;;
    "Sony Playstation 3")
      echo "/Applications/UniCade/Emulators/Sony Playstation 3/RPCS3/RPCS3.app/Contents/MacOS/RPCS3"
      ;;
    "Sony PSP")
      echo "/Applications/UniCade/Emulators/Sony PSP/PPSSPP/PPSSPP.app/Contents/MacOS/PPSSPP"
      ;;
    *)
      echo "Emulator not found for platform: $1"
      exit 1
      ;;
  esac
}

# Get the emulator path for the platform name
EMULATOR_PATH=$(get_emulator_path "$PLATFORM_NAME")

# Check if the emulator path exists
if [ ! -f "$EMULATOR_PATH" ]; then
  echo "Emulator not found for platform: $PLATFORM_NAME"
  exit 1
fi

# Run the emulator with the file path
echo "Running $FILE_PATH on $PLATFORM_NAME using $EMULATOR_PATH"
"$EMULATOR_PATH" "$FILE_PATH"