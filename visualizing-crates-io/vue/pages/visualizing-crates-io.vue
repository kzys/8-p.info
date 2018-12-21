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

            <h2><span class="n">32.90%</span> of crates only have one release</h2>
            <p>
                While there are a lot of crates out there, 
                many crates have only one or two releases.
                The ecosystem is still faily young.
                This histogram shows the distribution of the number of releases.
            </p>
            <div class="chart" id="package-age"><div/></div>
            <p>
                On the other hand, 1.43% of crates have more than 100 releases.
                Crates with "rustc-ap-" prefix are automatically published by
                <a href="https://github.com/alexcrichton/rustc-auto-publish">alexcrichton/rustc-auto-publish</a> though.
            </p>
            <div class="chart" id="mature-packages"><div/></div>

            <h2>Dependencies</h2>
            <p>
                Normal, development and build dependencies are declared on
                <a href="https://doc.rust-lang.org/cargo/reference/specifying-dependencies.html">Cargo.toml</a>.
                Normal dependencies are dependencies used by crates themselves.
                Development dependencies are dependencies used by crates' tests and benchmarks.
                Build dependencies are dependencies used by creates' build scripts.
            </p>
            <div class="row">
                <div class="col">
                    <h3>Normal</h3>
                    <div id="dep-normal-histogram"><canvas/></div>
                </div>
                <div class="col">
                    <h3>Development</h3>
                    <div id="dep-dev-histogram"><canvas/></div>
                </div>
                <div class="col">
                    <h3>Build</h3>
                    <div id="dep-build-histogram"><canvas/></div>
                </div>
            </div>

            <h2>Popular Crates: serde is used by over <span class="n">3,000</span> crates</h2>
            <p>
                The below charts show the popularity of crates, based on the number of their dependents.
            </p>
            <div class="row">
                <div class="col">
                    <h3>Normal</h3>
                    <div id="popular-normal-packages"><div/></div>
                </div>
                <div class="col">
                    <h3>Development</h3>
                    <div id="popular-dev-packages"><div/></div>
                </div>
                <div class="col">
                    <h3>Build</h3>
                    <div id="popular-build-packages"><div/></div>
                </div>
            </div>
        </div>
        <div id="about">
            <div class="inner">
                <p>
                    Created by Kazuyoshi Kato | <a href="http://8-p.info/">8-p.info</a><br/>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import Chart from 'chart.js';
    import axios from 'axios';
    import vegaEmbed from 'vega-embed';

    const AXIS = {
        ticks: {
            callback: function(value, index, values) {
                return value.toLocaleString();
            }
        }
    };

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
            // this.renderMaturePackages();
            this.renderPopularPackages('normal');
            this.renderPopularPackages('dev');
            this.renderPopularPackages('build');
          },

        data() {
            return { };
        },
        methods: {
            getCanvas(id) {
                return document.getElementById(id).getElementsByTagName('canvas')[0];
            },

            async renderPackageCount() {
                let spec = {
                    width: 800,
                    height: 400,
                    "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
                    "description": "A simple bar chart with embedded data.",
                    "data": {
                        url: '/_visualizing-crates-io/package-count.json',
                    },
                    "mark": {type: "line" },
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
                    width: 800,
                    height: 400,
                    "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
                    "data": {
                        url: '/_visualizing-crates-io/package-revisions.json',
                    },
                    "encoding": {
                        "x": {
                            field: "revisions",
                            type: "quantitative",
                            title: "Number of Releases",
                            bin: { maxbins: 50 },
                        },
                        "y": {
                            aggregate: "count",
                            type: "quantitative",
                            title: 'Number of Crates',
                            scale: {"type": "log"},
                        }
                    },
                    layer: [ { mark: 'bar' } ]
                };
                vegaEmbed('#package-age div', spec, {actions: false});
            },

            async renderMaturePackages0() {
                let spec = {
                    width: 400,
                    height: 600,
                    "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
                    "data": {
                        url: '/_visualizing-crates-io/all-packages.json',
                    },
                    transform: [
                        {"filter": {"field": "revisions", "gt": 100}},
                        {"sample": 10},
                    ],
                    "encoding": {
                        "x": {
                            field: "revisions",
                            type: "quantitative",
                            title: "Number of Releases",
                        },
                        "y": {
                            field: "package",
                            type: "ordinal",
                            sort: {field: 'revisions', op:'max',order:'descending'},
                            title: 'Name'
                        }
                    },
                    layer: [ { mark: 'bar' } ]
                };
                vegaEmbed('#mature-packages div', spec, {actions: false});
            },

            async renderPopularPackages(kind) {
                let key = 'clients_count_' + kind;
                let spec = {
                    width: 200,
                    height: 400,
                    $schema: "https://vega.github.io/schema/vega-lite/v3.json",
                    data: { url: '/_visualizing-crates-io/popular-packages.json' },
                    transform: [
                        {
                            window: [{ op: 'rank', as: 'rank' }],
                            sort: [{ field: key, order: 'descending' }]
                        },
                        { filter: 'datum.rank <= 20' },
                    ],
                    encoding: {
                        x: {
                            field: key,
                            type: "quantitative",
                            title: "Number of Dependents",
                        },
                        y: {
                            field: "index",
                            type: "ordinal",
                            sort: { field: key, op: 'max', order: 'descending' },
                            title: 'Name'
                        }
                    },
                    layer: [ { mark: 'bar' } ],
                };
                vegaEmbed(`#popular-${kind}-packages`, spec, {actions: false});
            },

            async renderDependencyHistogram() {
                let res = await axios.get(`/_visualizing-crates-io/deps-histogram.json`);
                var el = this.getCanvas(`dep-normal-histogram`);

                let labels = [...Array(res.data['normal'].length).keys()];

                var myChart = new Chart(el, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                            label: '# of dependents',
                            data: res.data['normal'],
                            backgroundColor: 'rgba(227,74,51,0.6)',
                            borderWidth: 0,
                        }
                        ]
                    },
                    options: {
                        maintainAspectRatio: false,
                        legend: { display: false },
                        scales: { xAxes: [ AXIS ] },
                        tooltips: {
                            callbacks: {
                                label: function(item, data) {
                                    return item.yLabel.toLocaleString();
                                }
                            }
                        }
                    }
                });            
            }
        }
    }
</script>
<style scoped>
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
    height: 100px;
}
#about .inner {
    position: fixed;
    bottom: 0;
    font-size: 90%;
    width: 100%;
    padding: 100px 40px 10px 40px;
    background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
}

.row {
    display: flex;
    justify-content: space-between;
}

.chart {
    text-align: center;
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
