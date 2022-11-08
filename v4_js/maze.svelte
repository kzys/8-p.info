<script lang="ts">
    let width = 11
    let height = 11
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
    let result = init(width, height)

    let stack: Array<[number, number]> = new Array();
    let pos: [number, number] = [1, 1];
    result[pos[1]][pos[0]] = 2;
    stack.push(pos);

    let directions: Array<[number, number]> = [[-1, 0], [1, 0], [0, -1], [0, 1]];
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

            if (0 <= x2 && x2 < width && 0 <= y2 && y2 < height && result[y2][x2] == 0) {
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
        result[cy + dy * 2][cx + dx * 2] = 2
        stack.push([cx + dx * 2, cy + dy * 2]);
    }

    return result;
}

let u3 = 5;
let rows;
$: {
    rows = generateMaze(Math.random, width*2+1, height*2+1);
}
</script>

<div style="width:90%">
    {#if showcontrol}
    <div>
        Width: <input type=range bind:value={width} min=5 max=21/>
        Height: <input type=range bind:value={height} min=5 max=21/>
    </div>
    {/if}
<svg width="100%" viewBox="0 0 {width*2+1} {height*2+1}">
        {#each rows as row, y}
            {#each row as col, x}
            {#if col == 1}
            <rect fill="#000" x={x} y={y} width=1 height=1></rect>
            {/if}
            {/each}
        {/each}
    </svg>
</div>