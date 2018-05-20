<template>
    <div>
        <Header/>
        <div id="hello">
            <div class="content">
                <blockquote>
                    <p>This led me to suggest that the null value is a member of every type, and a null check is required on every use of that reference variable, and it may be perhaps a billion dollar mistake.</p>
                    <footer><a href="https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare">Tony Hoare</a></footer>
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
