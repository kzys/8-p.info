import os
import json

for root, subdirs, files in os.walk('repos/crates.io-index'):
    if '.git' in subdirs:
        subdirs.remove('.git')

    if 'config.json' in files:
        files.remove('config.json')

    for f in files:
        io = open(os.path.join(root, f))
        lines = [ json.loads(x) for x in io.readlines() ]

        result = { 'package': f, 'revisions': len(lines)}
        last_rev = lines[-1]
        for dep in last_rev['deps']:

            key = None
            if 'kind' in dep:
                if dep['kind'] == None:
                    key = 'deps__none'
                else:
                    key = 'deps_' + dep['kind']
            else:
                key = 'deps__missing'

            result[key] = result.get(key, []) + [dep['name']]
        print json.dumps(result)
