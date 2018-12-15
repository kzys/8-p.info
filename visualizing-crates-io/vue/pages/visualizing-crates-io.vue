<template>
    <div id="body">
        <div class="intro">
            <h1>Visualizing Crates.io</h1>
            <p>
                Rust's packages are called "crates", and its central registry is 
                <a href="https://crates.io">crates.io</a> that stores its history on
                <a href="https://github.com/rust-lang/crates.io-index">rust-lang/creates.io-index</a>.
                This visualization uses the Git repository to show (one aspect of) Rust's growing ecosystem. 
            </p>
        </div>
        <div class="section crates-io">
            <h2>More than <span class="n">20,000</span> crates</h2>
            <p>
                In November 2018, the number of crates on the registry exceeded 20,000.
            </p>
            <div id="package-count"><canvas/></div>
            <p>
                Another histric moment was happening in September.
                Due to the growth, the Rust team decided to
                <a href="https://internals.rust-lang.org/t/cargos-crate-index-upcoming-squash-into-one-commit/8440">squash all commits on the repository</a>
                as one commit. Cargo, Rust's package manager was designed and prepared for this squash commit.
                So, most of us didn't notice the moment.
            </p>

            <h2>Popular Crates: serde is used by over <span class="n">3,000</span> crates</h2>
            <p>
                The below charts show the popularity of crates, based on the number of their dependents.
            </p>
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
                    <div id="popular-normal-packages"><canvas/></div>
                </div>
                <div class="col">
                    <h3>Development</h3>
                    <div id="popular-dev-packages"><canvas/></div>
                </div>
                <div class="col">
                    <h3>Build</h3>
                    <div id="popular-build-packages"><canvas/></div>
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

    export default {
        head: {
            title: 'Visualizing Crates.io',
            link: [
                { href: 'https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700', rel: 'stylesheet'}
            ]
        },

        async mounted() {
            this.renderPackageCount();
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
                let res = await axios.get(`/_visualizing-crates-io/package-count.json`);
                var el = this.getCanvas('package-count');

                let data = res.data;
                let labels = data.map(x => x.author_date_time)
                let values = data.map(x => x.package_count)

                var myChart = new Chart(el, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: '# of packages',
                            data: values
                        }],
                    },
                    options: {
                        maintainAspectRatio: false,
                        legend: { display: false },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    callback: function(value, index, values) {
                                        return value.toLocaleString();
                                    }
                                }
                            }]
                        },
                        tooltips: {
                            callbacks: {
                                label: function(item, data) {
                                    return item.yLabel.toLocaleString();
                                }
                            }
                        }
                    },
                });            
            },

            async renderPopularPackages(kind) {
                let res = await axios.get(`/_visualizing-crates-io/popular-${kind}-packages.json`);
                var el = this.getCanvas(`popular-${kind}-packages`);

                let labels = res.data.map(x => x.index)
                let data = res.data.map(x => x.count)

                var myChart = new Chart(el, {
                    type: 'horizontalBar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: '# of dependents',
                            data: data
                        }]
                    },
                    options: {
                        maintainAspectRatio: false,
                        legend: { display: false },
                        scales: {
                            xAxes: [{
                                ticks: {
                                    callback: function(value, index, values) {
                                        return value.toLocaleString();
                                    }
                                }
                            }]
                        },
                        tooltips: {
                            callbacks: {
                                label: function(item, data) {
                                    return item.xLabel.toLocaleString();
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
    font-size: 20px;
    font-weight: 400;
}

h1, h2, h3 {
    font-weight: 400;
}

p {
    line-height: 1.4;
}

.n {
    font-weight: 700;
}

.intro, .section {
    padding: 10px 40px;
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

h1 { 
    font-size: 30px;
    margin: 0;
    padding: 0;
}

.row {
    display: flex;
    justify-content: space-between;
}

#popular-normal-packages,
#popular-dev-packages,
#popular-build-packages {
    height: 40vw;
}

h2 {
    font-size: 40px;
    margin: 10px 0;
    padding: 0;
}

h3 {
    font-size: 20px;
}

.chart {
    width: 100%;
    height: 20vw;
}

.crates-io {
    background: #f0f0f0;
}
</style>
<!--
https://www.jetbrains.com/research/devecosystem-2018/
https://octoverse.github.com/
-->
