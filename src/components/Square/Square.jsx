import './square.css';

function Square({ children, onClick }) {
    return <div className="square" onClick={onClick}>{ children }</div>
}

export default Square;