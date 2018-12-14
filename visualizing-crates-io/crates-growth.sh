#! /bin/sh
set -eu

for rev in $(python daily-snapshot.py "$@" | cut -d ' ' -f2)
do
    count=$(git ls-tree --full-tree -r "$rev" | wc -l | tr -d ' ')
    git log -1 --pretty=format:%aI,%h,$count "$rev"
    echo
done
