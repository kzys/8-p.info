import Maze from './maze.svelte'

let el = document.getElementById('maze');
if (el) {
    new Maze({
        target: el,
        props: {
            width: 51,
            height: 21,
        }
    });
}
