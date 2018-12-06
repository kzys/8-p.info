import re
import subprocess
import sys
import json

lines = subprocess.check_output([ 'git', 'log', '--format=commit %aI %h', '--numstat' ] + sys.argv[1:]).split('\n')

record = {}

print '['
for line in lines:
    if line == '':
        continue
    columns = re.split('\s+', line)
    if columns[0] == 'commit':
        if len(record) > 2:
            print json.dumps(record), ','
        record = {}
        record['author_date_time'] = columns[1]
        record['commit'] = columns[2]
    else:
        xs = columns[2].split('/')
        xs = xs[0:-1][0:3]
        path = '/'.join(xs)
        if len(path) == 0:
            path = 'root'
        if not path in record:
            record[path + ' added'] = 0
            record[path + ' deleted'] = 0
        record[path + ' added'] += int(columns[0])
        record[path + ' deleted'] += int(columns[1])
print '{}]'
