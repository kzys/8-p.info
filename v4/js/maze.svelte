<script lang="ts">
  let width = 20;
  let height = 20;
  export let showcontrol;

  function init(width: number, height: number) {
    let result = new Array<Array<number>>();
    for (let y = 0; y < height; y++) {
      result.push(new Array<number>(width).fill(0));
      for (let x = 0; x < width; x++) {
        if (x % 2 == 0 || y % 2 == 0) {
          result[y][x] = 1;
        }
      }
    }
    return result;
  }

  function generateMaze(r: () => number, width: number, height: number) {
    let result = init(width, height);

    let stack: Array<[number, number]> = new Array();
    let pos: [number, number] = [1, 1];
    result[pos[1]][pos[0]] = 2;
    stack.push(pos);

    let directions: Array<[number, number]> = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    while (stack.length > 0) {
      let c = stack.pop();
      if (c == undefined) {
        break;
      }
      let cx = c[0];
      let cy = c[1];

      let next: Array<[number, number]> = [];
      for (let i = 0; i < directions.length; i++) {
        let d = directions[i];

        let x2 = cx + d[0] * 2;
        let y2 = cy + d[1] * 2;

        if (
          0 <= x2 &&
          x2 < width &&
          0 <= y2 &&
          y2 < height &&
          result[y2][x2] == 0
        ) {
          next.push(d);
        }
      }
      if (next.length == 0) {
        continue;
      }
      stack.push([cx, cy]);

      let d = next[Math.floor(r() * next.length)];
      let dx = d[0];
      let dy = d[1];
      result[cy + dy][cx + dx] = 0;
      result[cy + dy * 2][cx + dx * 2] = 2;
      stack.push([cx + dx * 2, cy + dy * 2]);
    }

    return result;
  }

  let u3 = 5;
  let rows;
  $: {
    rows = generateMaze(Math.random, width * 2 + 1, height * 2 + 1);
  }
  let tileSize = 5;
  let viewBox = [
    -tileSize,
    -tileSize,
    tileSize * 2 * (width+1),
    tileSize * 2 * (height+1),
  ].join(' ')
</script>

<div style="width:90%">
  {#if showcontrol}
    <div>
      {width} x {height}
    </div>
    <div>
      Width:
      <input id="width" type="range" bind:value={width} min="3" max="100" />

      Height:
      <input type="range" bind:value={height} min="3" max="100" />
    </div>
  {/if}
  <svg width="100%" viewBox="{viewBox}">
    {#each rows as row, y}
      {#each row as col, x}
        {#if col == 1}
          <g>
          {#if rows[y-1] && rows[y-1][x] == 1}
            <line stroke="#000"
              x1="{x * tileSize}" y1="{y * tileSize}"
              x2="{x * tileSize}" y2="{(y-1) * tileSize}"
            />
          {/if}
          {#if rows[y+1] && rows[y+1][x] == 1}
          <line stroke="#000"
            x1="{x * tileSize}" y1="{y * tileSize}"
            x2="{x * tileSize}" y2="{(y+1) * tileSize}"
          />
          {/if}
          {#if rows[y] && rows[y][x-1] == 1}
          <line stroke="#000"
            x1="{x * tileSize}" y1="{y * tileSize}"
            x2="{(x-1) * tileSize}" y2="{y * tileSize}"
          />
          {/if}
          {#if rows[y] && rows[y][x+1] == 1}
          <line stroke="#000"
            x1="{x * tileSize}" y1="{y * tileSize}"
            x2="{(x+1) * tileSize}" y2="{y * tileSize}"
          />
          {/if}
        </g>
        {/if}
      {/each}
    {/each}
  </svg>
</div>
