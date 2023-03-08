import './piece.css';
import circle from '../../assets/circle.png';
import cross from '../../assets/cross.png';

function Piece({ type }) {
    const imageSrc = type == 'cross'? cross : circle;

    return <img className='piece' src={imageSrc} alt="game piece" />
}

export default Piece;