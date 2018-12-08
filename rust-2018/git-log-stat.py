import re
import subprocess
import sys
import json

# git config diff.renameLimit 9999

lines = subprocess.check_output([ 'git', 'log', '--format=commit %aI %h', '--numstat' ] + sys.argv[1:]).split('\n')

record = {}

print '['
for line in lines:
    if line == '':
        continue
    columns = re.split('\s+', line)
    if columns[0] == 'commit':
        record = {}
        record['author_date_time'] = columns[1]
        record['commit'] = columns[2]
    else:
        xs = columns[2].split('/')
        xs = xs[0:-1][0:3]
        path = '/'.join(xs)
        if len(path) == 0:
            path = 'root'

        if columns[0] == '-':
            # binary files
            pass
        else:
            record['path'] = path
            record['add'] = int(columns[0])
            record['del'] = int(columns[1])
            print json.dumps(record), ","

print '{}]'
