<template>
    <div>
        <Header/>
        <div id="hello">
            <div class="content">
                <blockquote>
                    <p>We're against complexity. We believe designing systems is a fight against
                    complexity. We'll accept to fight the complexity when it's worthwhile but
                    we'll try hard to recognize when a small feature is not worth 1000s of lines
                    of code. Most of the time the best way to fight complexity is by not
                    creating it at all.</p>
                    <footer><a href="https://github.com/antirez/redis/blob/unstable/MANIFESTO">The Redis Manifesto</a></footer>
                </blockquote>
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
