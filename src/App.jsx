import Piece from "./components/Piece"
import Square from "./components/Square"

function App() {
  return (
    <>
      <Square>
        <Piece type="circle" />
      </Square>
      <Square>
        <Piece type="cross" />
      </Square>
      <Square />
    </>
  )
}

export default App
