<template>
    <div class="v1">
        <Header/>
        <div id="container">
            <div class="content">
                <p>
                    Hello! My name is <nuxt-link to="/me/">Kazuyoshi Kato</nuxt-link>.
                    I'm a software developer in Seattle, Washington.
                </p>
                <p>
                    I am also on
                    <a href="https://github.com/kzys">GitHub</a>,
                    <a href="https://twitter.com/kzys">Twitter</a> and
                    <a href="https://note.mu/kzys_">note</a>.
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