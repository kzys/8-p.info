<template>
    <div>
        <Header/>
        <div id="hello">
            <div class="content">
                <blockquote>
                    <p>I am emphasizing the self-service nature of these platforms because it’s important for a reason I think is somewhat non-obvious: even well-meaning gatekeepers slow innovation. When a platform is self-service, even the improbable ideas can get tried, because there’s no expert gatekeeper ready to say “that will never work!” And guess what – many of those improbable ideas do work, and society is the beneficiary of that diversity.</p>
                    <footer><a href="https://www.sec.gov/Archives/edgar/data/1018724/000119312512161812/d329990dex991.htm">Jeff Bezos</a></footer>
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
