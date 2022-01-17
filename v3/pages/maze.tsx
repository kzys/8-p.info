import Head from 'next/head'

function generateMaze(width: number, height: number) {
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

    let d = next[Math.floor(Math.random() * next.length)];
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
}

function Maze(props: MazeProps) {
  let width = props.width;
  let height = props.height;
  let maze = generateMaze(width, height)
  let nodes = []
  maze[1][0] = 0;
  maze[height - 2][width - 1] = 0;

  let u = 4;
  let u2 = u * 2;
  let u3 = u * 3;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (maze[y][x] == 1) {
        nodes.push(<rect x={x * u3 + u} y={y * u3 + u} width={u} height={u}></rect>)

        if (0 <= x - 1 && maze[y][x - 1] == 1) {
          nodes.push(<rect x={x * u3} y={y * u3 + u} width={u} height={u}></rect>)
        }

        if (x + 1 < width && maze[y][x + 1] == 1) {
          nodes.push(<rect x={x * u3 + u2} y={y * u3 + u} width={u} height={u}></rect>)
        }

        if (0 <= y - 1 && maze[y - 1][x] == 1) {
          nodes.push(<rect x={x * u3 + u} y={y * u3} width={u} height={u}></rect>)
        }

        if (y + 1 < height && maze[y + 1][x] == 1) {
          nodes.push(<rect x={x * u3 + u} y={y * u3 + u2} width={u} height={u}></rect>)
        }
      }
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <svg version="1.1"
        width={width * u3} height={height * u3}
        xmlns="http://www.w3.org/2000/svg">
        {nodes}
      </svg>
    </div>
  )
}

export default function Home() {
  let width = 41;
  let height = 91
  let maze = generateMaze(width, height)
  let nodes = []

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (maze[y][x] == 1) {
        nodes.push(<rect x={x * 10} y={y * 10} width={10} height={10}></rect>)
      }
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Maze</title>
      </Head>

      <main>
        <Maze width={81} height={81} />
      </main>
    </div>
  )
}
