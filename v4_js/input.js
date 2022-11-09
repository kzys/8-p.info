import Maze from './maze.svelte'

let xs = document.querySelectorAll('.maze');
console.log(xs)
xs.forEach(x => {
    new Maze({ target: x, props: x.dataset });
});
