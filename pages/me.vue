<template>
    <div>
        <Header/>
        <div id="container">
            <div class="content">
                <h1>Kazuyoshi Kato / 加藤 和良</h1>
                <p>I'm a software developer, Japanese and Seattle transplant.</p>
                <p>
                I've been woring as a Software Development Engineer at Amazon for 5+ years.
                I work as a Software Development Engineer at <a href="https://www.amazon.com/">Amazon.com</a>.
                I joined Amazon Japan in 2012, and moved to Seattle in 2014.
                Before Amazon, I worked for <a href="https://mixi.co.jp">Mixi</a>.
                The company is now known for mobile games, but I was working on
                its social networking service.
                </p>
                <p>
                <em>But</em>, all opinions expressed here are entirely my own.
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/Header.vue'
    export default {
        head() {
            return {
                title: 'Kazuyoshi Kato / 加藤 和良',
            }
        },
        components: { Header }
    }
</script>
