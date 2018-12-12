#! /bin/sh
set -eu

for rev in $(python ../../daily-snapshot.py "$@" | cut -d ' ' -f2)
do
    git checkout $rev
    git log -1 \
        "--pretty=format:%aI,%h,$(find . -not -path '*/\.*' -type f | wc -l | tr -d ' ')"
    echo
done
