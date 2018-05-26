<template>
    <div>
        <Header/>
        <div id="container">
            <div class="content">
                <h1>
                    <div class="english">Kazuyoshi Kato</div>
                    <div class="japanese">加藤 和良</div>
                </h1>
                <p>
                    I'm a software developer, Japanese and Seattle transplant.
                </p>
                    

                <h2>Work</h2>
                <ul class="work">
                    <li>
                        Amazon.com
                        <div class="years">Oct 2014 &dash; present</div>
                    </li>
                    <li>
                        Amazon Japan
                        <div class="years">July 2012 &dash; Sep 2014</div>
                    </li>
                    <li>
                        mixi, Inc.
                        <div class="years">April 2008 &dash; July 2012</div>
                    </li>
                </ul>
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
