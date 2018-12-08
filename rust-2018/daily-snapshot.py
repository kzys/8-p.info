import re
import subprocess
import sys

argv = [ 'git', 'log', '--format=%aI %h' ] + sys.argv[1:]
lines = subprocess.check_output(argv).split('\n')

visited = {}

for line in lines:
    if line == '':
        continue
    date, _ = line.split('T')
    if not date in visited:
        visited[date] = True
        print line
