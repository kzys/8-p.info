<template>
    <header>
        <div class="content">
            <div class="column">
                <nuxt-link to="/"><h1 class="home">8-p.info</h1></nuxt-link>
            </div>
            <div class="column menu">
                <nuxt-link to="/me/">Kazuyoshi Kato</nuxt-link>
                <a href="https://blog.8-p.info/">Blog</a>
            </div>
        </div>
    </header>
</template>
<style scoped>
header {
    clear: both;
    float: none;
}

header h1 {
    font-size: 40px;
    font-weight: 800;
    font-style: italic;

    line-height: 1;
    margin: 0;
    padding: 0;
}

header .content {
    max-width: none;
    display: block;
    overflow: hidden;
}

header .menu {
    line-height: 2;
}

header a {
    color: #111 !important;
    text-decoration: none;

    border: none;
    display: block;
    float: left;
    padding: 1rem 0;
}

header .menu a {
    font-weight: bold;
    font-size: 90%;
    margin: 0 1rem 0 0;
}

header .column {
    clear: both;
}

@media only screen and (min-width: 800px) {
    header .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0;
    }

    header .menu a {
        margin: 0 0 0 4rem;
    }
}

@media only screen and (min-width: 1024px) {
    header .content {
        margin: 0 2rem;
    }
}
</style>
