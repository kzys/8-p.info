#!/bin/sh
set -eu

npm run dev generate
find dist -type l | xargs rm
cp -LR static/* dist/
