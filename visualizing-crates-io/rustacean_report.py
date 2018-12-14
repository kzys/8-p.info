import pandas as pd
import collections

DEP_KINDS = ['build', 'dev', 'normal']

def collect_clients(df):
    clients = {}

    for index, row in df.iterrows():
        for kind in DEP_KINDS:
            deps = row['deps_' + kind]
            if isinstance(deps, collections.Iterable):
                for dep in deps:
                    if not dep in clients:
                        clients[dep] = dict(('clients_' + x, []) for x in DEP_KINDS)
                    clients[dep]['clients_' + kind] += [index]

    df = pd.DataFrame.from_dict(clients, orient = 'index')

    for kind in DEP_KINDS:
        df['clients_count_' + kind] = df['clients_' + kind].str.len()

    return df
