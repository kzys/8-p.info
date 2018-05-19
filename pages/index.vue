<template>
    <div>
        <header>
            <div class="content">
                <nuxt-link to="/">8-p.info</nuxt-link>
                <div id="menu">
                    <nuxt-link to="/me/">Kazuyoshi Kato</nuxt-link>
                </div>
            </div>
        </header>
        <div id="container">
            <div id="hello">
                <blockquote>
                    <p>This led me to suggest that the null value is a member of every type, and a null check is required on every use of that reference variable, and it may be perhaps a billion dollar mistake.</p>
                    <footer><a href="https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare">Tony Hoare</a></footer>
                </blockquote>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        head() {
            return {
                title: '8-p.info'
            }
        }
    }
</script>
