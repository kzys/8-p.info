<template>
    <div>
        <Header/>
        <div id="container">
            <div class="content">
                <p>
                    Kazuyoshi Kato is a software developer, Japanese and Seattle transplant.
                </p>
                <h2>Projects</h2>
                <p>
                    <nuxt-link to="/visualizing-crates-io/">Visualizing Crates.io</nuxt-link>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/Header.vue'
    export default {
        head: {
            title: '8-p.info'
        },
        components: { Header }
    }
</script>
<style scoped>
.section {
    margin: 0 auto;
    max-width: 1000px;
}
</style>