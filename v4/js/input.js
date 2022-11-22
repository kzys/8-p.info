import Maze from "./maze.svelte";
import Clock from "./clock.svelte";

let components = { maze: Maze, clock: Clock };

let xs = document.querySelectorAll(".maze, .svelte");
xs.forEach((x) => {
  let klass = components[x.dataset.c];
  new klass({ target: x, props: x.dataset });
});
