import { useState } from 'react'
import Head from 'next/head'
import { Maze } from '../lib/maze'

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
