import Maze from './maze.svelte'

let el = document.getElementById('maze');
if (el) {
    new Maze({
        target: el,
        props: el.dataset,
    });
}
