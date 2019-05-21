<template>
    <div class="v1">
        <Header/>
        <div id="container">
            <div class="content">
                <p>[I'm on Paternity Leave]</p>
                <p>
                    Kazuyoshi Kato is a software developer in Seattle, Washington.
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
#index {
    margin: 0;
    padding: 0;
}

#index blockquote {
    margin: 1rem 0;
    padding: 0;
}

#quote .content {
    border-bottom: 1px solid #ddd;
    margin-bottom: 1rem;
}

#index blockquote p {
    font-size: 150%;
    line-height: 1.5;
}

#blog {
    padding: 1rem 0;
}
</style>