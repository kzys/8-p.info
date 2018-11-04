<template>
    <div id="index">
        <Header/>
        <div>
            <div class="content">
                <p>
                    Kazuyoshi Kato is a software developer, Japanese and Seattle transplant.
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
