import Board from "./components/Board"

function App() {
  const tiles = [
    [null, null, null],
    [null, 'cross', null],
    [null, null, 'circle']
  ];

  return <Board tiles={tiles}/>
}

export default App
