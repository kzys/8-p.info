<template>
    <div id="body">
        <div class="intro">
            <div class="warn">[BETA - PLEASE DON'T SHARE]</div>
            <h1>Visualizing Crates.io</h1>
            <p>
                Rust's packages are called "crates". The central registry &mdash; 
                <a href="https://crates.io">crates.io</a> stores its entire history as
                <a href="https://github.com/rust-lang/crates.io-index">a Git repository</a>.
                This visualization uses the Git repository to show Rust's growing ecosystem. 
            </p>
        </div>
        <div class="section crates-io">
            <h2>More than <span class="n">20,000</span> crates</h2>
            <p>
                In October 2018, the number of crates on the registry exceeded 20,000.
            </p>
            <div class="chart" id="package-count"><div/></div>
            <p>
                Another interesting moment was happening in September.
                Due to the growth, the Rust team decided to
                <a href="https://internals.rust-lang.org/t/cargos-crate-index-upcoming-squash-into-one-commit/8440">squash all commits on the repository</a>
                as one commit. Cargo, Rust's package manager was designed and prepared for this squash commit.
                So, most of developers didn't notice the moment.
            </p>

            <h2>But, a lot of them have less than <span class="n">6</span> releases</h2>
            <p>
                While there are a lot of crates out there, 
                many crates have less than 6 releases.
                The ecosystem is still faily young.
                This histogram shows the distribution of the number of releases.
            </p>
            <div class="chart" id="package-age"><div/></div>
            <p>
                On the other hand, 1.43% of crates have more than 100 releases.
                Please note that crates with "rustc-ap-" prefix are automatically published by
                <a href="https://github.com/alexcrichton/rustc-auto-publish">alexcrichton/rustc-auto-publish</a>.
            </p>
            <div class="chart" id="aged-packages"><div/></div>

            <h2>Zero Dependencies is Good Dependencies?</h2>
            <p>
                Normal, development and build dependencies are declared on
                <a href="https://doc.rust-lang.org/cargo/reference/specifying-dependencies.html">Cargo.toml</a>.
                Normal dependencies are dependencies used by crates themselves.
                Development dependencies are dependencies used by crates' tests and benchmarks.
                Build dependencies are dependencies used by creates' build scripts.
            </p>
            <div class="row">
                <div id="deps" class="chart"><div/></div>
            </div>

            <h2>Popular Crates: serde is used by over <span class="n">3,000</span> crates</h2>
            <p>
                The below charts show the popularity of crates, based on the number of their dependents.
            </p>
            <div id="popular-packages"><div/></div>
        </div>
        <div id="about">
            <div class="row">
                <div class="col">
                    Created by Kazuyoshi Kato | <a href="http://8-p.info/">8-p.info</a>
                </div>
                <div class="col">
                    Made in Seattle, Washington
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import vegaEmbed from 'vega-embed';

    export default {
        head: {
            title: 'Visualizing Crates.io',
            link: [
                { href: 'https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700', rel: 'stylesheet'}
            ]
        },

        async mounted() {
            this.renderPackageCount();
            this.renderPackageAge();
            this.renderAgedPackages();
            this.renderPopularPackages();
            this.renderDeps();
        },

        data() {
            return { };
        },

        methods: {
            async renderPackageCount() {
                let spec = {
                    width: 800,
                    height: 400,
                    "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
                    "description": "A simple bar chart with embedded data.",
                    "data": {
                        url: '/_visualizing-crates-io/package-count.json',
                    },
                    mark: 'area',
                    "encoding": {
                        "x": {
                            field: "author_date_time",
                            type: "temporal",
                            title: "Date",
                        },
                        "y": {
                            field: "package_count",
                            type: "quantitative",
                            title: 'Number of Crates',
                            scale: { domain: [12000, 22000] }
                        }
                    }
                };
                vegaEmbed('#package-count div', spec, {actions: false});
            },

            async renderPackageAge() {
                let spec = {
                    $schema: "https://vega.github.io/schema/vega-lite/v3.json",
                    data: {
                        url: '/_visualizing-crates-io/package-revisions.json',
                    },
                    width: 800,
                    height: 400,
                    mark: 'bar',
                    "encoding": {
                        "x": {
                            field: "revisions",
                            type: "quantitative",
                            title: "Number of Releases",
                            bin: { maxbins: 100 },
                        },
                        "y": {
                            aggregate: "count",
                            type: "quantitative",
                            title: 'Number of Crates',
                            scale: {"type": "log"},
                        }
                    }
                };
                vegaEmbed('#package-age div', spec, {actions: false});
            },

            async renderAgedPackages() {
                let spec = {
                    $schema: "https://vega.github.io/schema/vega-lite/v3.json",
                    width: 400,
                    height: 600,
                    data: { url: '/_visualizing-crates-io/aged-packages.json' },
                    transform: [
                        {
                            window: [{ op: 'rank', as: 'rank' }],
                            sort: [{ field: 'revisions', order: 'descending' }]
                        },
                        { filter: 'datum.rank <= 40' },
                        {calculate: 'test(/rustc-ap/, datum.package)', as: 'is_rustc_ap'},
                    ],
                    mark: 'bar',
                    encoding: {
                        "x": {
                            field: 'revisions',
                            type: "quantitative",
                            title: 'Number of Releases',
                        },
                        "y": {
                            field: 'package',
                            type: 'ordinal',
                            title: 'Name',
                            sort: { field: 'revisions', op: 'max', order: 'descending' },
                        },
                        "color": {
                            field: 'is_rustc_ap',
                            title: 'Auto Publish',
                        },
                    },
                };
                vegaEmbed('#aged-packages div', spec, {actions: false});
            },

            async renderPopularPackages() {
                let kinds = ['normal', 'dev', 'build'];
                let concat = kinds.map(kind => {
                    let key = `clients_count_${kind}`;
                    return {
                        transform: [
                            {
                                window: [{ op: 'rank', as: 'rank' }],
                                sort: [{ field: key, order: 'descending' }]
                            },
                            { filter: 'datum.rank <= 20' },
                        ],
                        encoding: {
                            color: {
                                field: 'revisions',
                                type: "quantitative",
                                title: "Number of Releases",
                            },
                            x: {
                                field: key,
                                type: "quantitative",
                                title: `Number of Dependents (${kind})`,
                            },
                            y: {
                                field: "index",
                                type: "ordinal",
                                sort: { field: key, op: 'max', order: 'descending' },
                                title: 'Name'
                            }
                        },
                        mark: 'bar',
                    };
                });

                let spec = {
                    width: 200,
                    height: 400,
                    $schema: "https://vega.github.io/schema/vega-lite/v3.json",
                    data: { url: '/_visualizing-crates-io/popular-packages.json' },
                    hconcat: concat,
                };
                vegaEmbed(`#popular-packages div`, spec, {actions: false});
            },

            async renderDeps() {
                let kinds = ['normal', 'dev', 'build'].map(k => `deps_count_${k}`);
                let spec = {
                    width: 200,
                    height: 200,
                    $schema: "https://vega.github.io/schema/vega-lite/v3.json",
                    data: { url: '/_visualizing-crates-io/package-deps.json' },
                    repeat: { 'column': kinds },
                    spec: {
                        mark: 'bar',
                        encoding: {
                            "x": {
                                field: { repeat: 'column' },
                                type: "quantitative",
//                                title: "Number of Dependencies",
                            },
                            "y": {
                                aggregate: "count",
                                type: "quantitative",
                                title: 'Number of Crates',
                                scale: {"type": "log"},
                            }
                        }
                    }
                };
                vegaEmbed(`#deps div`, spec, {actions: false});
            }
        }
    }
</script>
<style scoped>
* {
    box-sizing: border-box;
}

#body {
    font-family: 'Roboto Condensed', sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 20px;
    font-weight: 400;
    margin: 10px 0;
}

.warn {
    color: red;
}

h1 {
    font-weight: 700;
    font-size: 40px;
    margin: 0;
    padding: 0;
}

h2, h3 {
    font-weight: 400;
}

p {
    line-height: 1.4;
}

.n {
    font-weight: 700;
}

.intro, .section {
    max-width: 1000px;
    margin: 0 auto;
    padding: 10px;
}

#about {
    height: 40px;
}
#about .row {
    position: fixed;
    bottom: 0;
    font-size: 15px;
    width: 100%;
    padding: 10px 20px;
    background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
}

.row {
    display: flex;
    justify-content: space-between;
}

.chart {
    margin: 0 auto;
}

#popular-normal-packages,
#popular-dev-packages,
#popular-build-packages {
    height: 400px;
}

h2 {
    font-size: 40px;
    margin: 10px 0;
    padding: 0;
}

h3 {
    font-size: 20px;
}
</style>
<!--
https://www.jetbrains.com/research/devecosystem-2018/
https://octoverse.github.com/
-->
