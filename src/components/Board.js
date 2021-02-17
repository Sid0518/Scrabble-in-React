import Cell from "./Cell";
import DoubleLetterCell from "./DoubleLetterCell";
import DoubleWordCell from "./DoubleWordCell";
import TripleLetterCell from "./TripleLetterCell";
import TripleWordCell from "./TripleWordCell";

const tripleWord = [
    0, 7, 14, 105, 119, 210, 217, 224
];
const doubleWord = [
    16, 32, 48, 64, 160, 176, 192, 208, 
    28, 42, 56, 70, 154, 168, 182, 196
];
const tripleLetter = [
    20, 24, 76, 80, 84, 88, 136, 140, 
    144, 148, 200, 204
];
const doubleLetter = [
    3, 11, 36, 38, 45, 52, 59, 92, 96, 
    98, 102, 108, 116, 122, 126, 128, 
    132, 165, 172, 179, 186, 188, 213, 
    221
];

const Board = () => {
    const board = [];
    
    for(let i = 0;i < 225;i++) {
        if(tripleWord.includes(i))
            board.push(<TripleWordCell key={i} droppable={true}/>)
        else if(doubleWord.includes(i))
            board.push(<DoubleWordCell key={i} droppable={true}/>)
        else if(tripleLetter.includes(i))
            board.push(<TripleLetterCell key={i} droppable={true}/>)
        else if(doubleLetter.includes(i))
            board.push(<DoubleLetterCell key={i} droppable={true}/>)
        else
            board.push(<Cell key={i} droppable={true}/>)
    }

    return (
        <div className="board-wrapper">
            <div className="board">
                {board}
            </div>
        </div>
    )
}

export default Board;
