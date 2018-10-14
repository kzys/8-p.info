<style>
h1 { font-size: 150% }
.bar {
    border: 1px solid #000;
}
.bar .inner {
    background: #000;
}
#about {
    position: absolute;
    bottom: 0;
}
</style>
<template>
    <div>
        <div class="content">
            <h1>{{ message }}</h1>
            <div class="bar"><div class="inner" v-bind:style="{ width: barWidth }">&nbsp;</div></div>
        </div>
        <div id="about">
            <div class="content">
                <p>
                    Heavily inspired by <a href="https://twitter.com/year_progress">@year_progress</a>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/Header.vue'
    export default {
        head: {
            title: 'This Year'
        },
        mounted() {
            let d = new Date()
            let firstDay = new Date(d.getFullYear(), 0, 1);
            let lastDay = new Date(d.getFullYear()+1, 0, 1);
            window.setInterval(() => {
                let elapsed = d - firstDay;
                let duration = lastDay - firstDay;
                let percentage = elapsed / duration * 100;

                this.message = `This year, ${ d.getFullYear() } is ${percentage.toFixed(2)}% complete.`;
                this.barWidth = percentage + '%';
            }, 1000)
        },
        data() {
            return { message: '', barWidth: '0%' };
        },
        components: { Header }
    }
</script>
