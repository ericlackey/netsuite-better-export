#! /bin/bash

echo "Building Chrome version $1"

mkdir -p versions/betterexport_0_$1/chrome/build
cp -r css versions/betterexport_0_$1/chrome/build
cp -r scripts versions/betterexport_0_$1/chrome/build
cp manifest_chrome.json versions/betterexport_0_$1/chrome/build/manifest.json
cd versions/betterexport_0_$1/chrome/build/
zip -r ../../betterexport_0_$1_chrome.zip *
cd ../../
rm -rf chrome
echo "Done"