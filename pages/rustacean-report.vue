<template>
    <div id="body">
        <div class="intro">
            <h1>[BETA; DON'T SHARE] The Rustacean Report &#x1F980;</h1>
            <p>
                In 2018, Rust has been growing steadly. This report compiles
                the numbers from
                <a href="https://crates.io">crates.io</a>,
                <a href="https://github.com/rust-lang/rust">rust-lang/rust</a>
                and
                <a href="https://rust-lang.github.io/rfcs/">Rust RFCs</a>
                to show the progress the Rust community is making throught the year.
            </p>
        </div>
        <div class="section crates-io">
            <h2>crates.io</h2>
            <div class="chart"><canvas id="myChart"/></div>
        </div>
        <h2>The Rust compiler</h2>
        <h2>RFCs</h2>
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
            title: "[BETA; DON'T SHARE] The Rustacean Report - Visualizing Rust's growth in 2018",
            link: [
                { href: 'https://fonts.googleapis.com/css?family=Fira+Sans:300,400', rel: 'stylesheet'}
            ]
        },

        async mounted() {
            let res = await axios.get(`/data/rustacean-report/package-count.json`);
            var el = document.getElementById("myChart");

            let labels = res.data.map(x => x.author_date_time)
            let data = res.data.map(x => x.package_count)

            var myChart = new Chart(el, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '# of Packages',
                        data: data,
                        borderWidth: 1
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    legend: { display: false }
                }
            });            
        },

        data() {
            return { commits: [], barWidth: '0%' };
        },
        methods: {
            render() {
                },

            async loadRust() {
            }
        }
    }
</script>
<style scoped>
#body {
    font-family: 'Fira Sans', sans-serif;
}

h1 { 
    font-weight: 300;
    font-size: 50px;
    margin: 0;
    padding: 0;
}

.intro, .section {
    padding: 1rem 4rem;
}

.intro p {
    font-size: 20px;
    font-weight: 300;
}

.row {
    display: flex;
}

.col {
    margin: .2rem;
}

h2 {
    font-size: 200%;
    font-weight: 300;
}

.chart {
    width: 100%;
    height: 20vw;
}

.crates-io {
    background: #f0f0f0;
}

#about {
    height: 100px;
}
#about .inner {
    position: fixed;
    bottom: 0;
    font-size: 90%;
    width: 100%;
    background: linear-gradient(rgba(255, 255, 255, 0.5), 10%, rgba(255, 255, 255, 1));
}
#about p {
    line-height: 1.4;
}
</style>
<!--
https://www.jetbrains.com/research/devecosystem-2018/
https://octoverse.github.com/
-->
