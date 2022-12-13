import Maze from "./maze.svelte";
import Clock from "./clock.svelte";

let components = { maze: Maze, clock: Clock };

let xs = document.querySelectorAll("[data-svelte]");
xs.forEach((x) => {
  let klass = components[x.dataset.svelte];
  new klass({ target: x, props: x.dataset });
});
