import { useState } from 'react'
import Head from 'next/head'
import seedrandom from 'seedrandom';
import { Cell, CellProps } from './cell'

function generateMaze(width: number, height: number) {
  let r = seedrandom(width * height);
  let result = new Array<Array<number>>();
  for (let y = 0; y < height; y++) {
    result.push(new Array<number>(width).fill(0));
    for (let x = 0; x < width; x++) {
      if (x % 2 == 0 || y % 2 == 0) {
        result[y][x] = 1;
      }
    }
  }

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

    let d = next[Math.floor(r.quick() * next.length)];
    let dx = d[0];
    let dy = d[1];
    result[cy + dy][cx + dx] = 0;
    result[cy + dy * 2][cx + dx * 2] = 2
    stack.push([cx + dx * 2, cy + dy * 2]);
  }

  return result;
}

type MazeProps = {
  width: number,
  height: number,
  colors: Array<string>
}

function Maze(props: MazeProps) {
  let width = props.width;
  width = width * 2 + 1;

  let height = props.height;
  height = height * 2 + 1;

  let maze = generateMaze(width, height)
  let nodes = []
  maze[1][0] = 0;
  maze[height - 2][width - 1] = 0;

  let u = 4;
  let u3 = u * 3;

  let i = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (maze[y][x] == 1) {
        let cp: CellProps = {
          left: 0 <= x - 1 && maze[y][x - 1] == 1,
          right: x + 1 < width && maze[y][x + 1] == 1,
          top: 0 <= y - 1 && maze[y - 1][x] == 1,
          bottom: y + 1 < height && maze[y + 1][x] == 1,
          color: props.colors[i % props.colors.length],
        };
        nodes.push(<g key={i++} transform={`translate(${x * u3},${y * u3})`} y={y * u3}>
          <Cell {...cp}></Cell>
        </g>)
      }
    }

    nodes.push(<text
      fontSize={u3}
      fontFamily="monospace"
      dominantBaseline="central"
      x={u3} y={u3 * 1 + u}
    >Start</text>)
    nodes.push(<text
      fontSize={u3}
      fontFamily="monospace"
      dominantBaseline="central"
      textAnchor="end"
      x={u3 * (width - 1)} y={u3 * (height - 1) - u}
    >Goal</text>)
  }

  return (
    <div key={maze.join('x')} style={{ textAlign: 'center' }}>
      <svg version="1.1"
        width={width * u3} height={height * u3}
        xmlns="http://www.w3.org/2000/svg">
        {nodes}
      </svg>
    </div>
  )
}

export default function Home() {
  const [width, setWidth] = useState(20);
  const [height, setHeight] = useState(20);

  return (
    <div className="container">
      <Head>
        <title>Maze</title>
        <style>{`
          body {padding: 1rem}
          `}
        </style>
      </Head>

      <main>
        <div style={{ textAlign: 'center' }}>
          <form>
            <label>Width:
              <input value={width} type="number" size={5}
                onChange={e => setWidth(parseInt(e.currentTarget.value))} />
            </label>&nbsp;
            <label>Height:
              <input value={height} type="number" size={5}
                onChange={e => setHeight(parseInt(e.currentTarget.value))} />
            </label>
          </form>
          <br />
        </div>
        <Maze
          width={width} height={height}
          colors={['pink', 'red', 'purple', 'blue', 'orange']}
        />
      </main>
    </div>
  )
}
