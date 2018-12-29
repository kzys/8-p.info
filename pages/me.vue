<template>
    <div>
        <Header/>
        <div id="container">
            <div class="content">
                <h2>
                    <div class="english">Kazuyoshi Kato</div>
                    <div class="japanese">加藤 和良</div>
                </h2>
                <p>
                    I'm a software developer, Japanese and Seattle transplant.
                </p>
                <p>
                    I love open source software and occasionally contribute back to the community.
                    You can find my name on
                    <a href="https://github.com/rust-lang/rust/commits?author=kzys">Rust</a>,
                    <a href="https://github.com/scala/scala/commits?author=kzys">Scala</a>,
                    Firefox's <a href="https://www.mozilla.org/credits/">about:credits</a> and
                    <a href="https://github.com/git/git/commits?author=kzys">Git</a>.
                    Those are mostly small contributions on the big projects though.
                </p>
                <p>
                    While I've been doing that for almost a decade,
                    it is still fascinating to see that I can work with people all over the world through code.
                </p>
                <p class="see-also">
                    <a href="https://github.com/kzys"><i class="fab fa-github"></i> GitHub</a>
                    <a href="https://www.linkedin.com/in/kazuyoshi/"><i class="fab fa-linkedin"></i> LinkedIn</a>
                </p>

                <h3>Work Experience</h3>
                <ul class="work">
                    <li>
                        <div class="row">
                            <div class="company">Amazon.com</div>
                            <div class="location">Seattle, Washington</div>
                        </div>
                        <div class="years">Oct 2014 &dash; present</div>
                    </li>
                    <li>
                        <div class="row">
                            <div class="company">Amazon Japan</div>
                            <div class="location">Meguro, Tokyo</div>
                        </div>
                        <div class="years">July 2012 &dash; Sep 2014</div>
                    </li>
                    <li>
                        <div class="row">
                            <div class="company">mixi</div>
                            <div class="location">Harajuku, Tokyo / Shibuya, Tokyo</div>
                        </div>
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
<style scoped>
h2, h3 {
    font-size: 20px;
    font-weight: 800;
    margin: 20px 0 10px 0;
}

.family {
    font-weight: normal;
}

.japanese {
    font-weight: normal;
}

ul.work {
    margin: 0;
    padding: 0;
    list-style: none;

}

li {
    margin-bottom: 1rem;
}

.row {
    display: flex;
    justify-content: space-between;
    line-height: 1.5rem;
}

.location {
    font-size: 90%;
}

.years {
    font-size: 90%;
    color: #666;
}

.see-also a {
    text-decoration: none;
    margin-right: 1rem;
    color: #000;
}
</style>