import { Component } from "react";

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

class Board extends Component {
    render() {
        return (
            <div className="board-wrapper">
                <div className="board">
                    {
                        Array.from(
                            this.props.board.map((cellData, i) => {
                                if(tripleWord.includes(i))
                                    return<TripleWordCell key={i} droppable={true} finalized={false}/>
                                else if(doubleWord.includes(i))
                                    return <DoubleWordCell key={i} droppable={true} finalized={false}/>
                                else if(tripleLetter.includes(i))
                                    return <TripleLetterCell key={i} droppable={true} finalized={false}/>
                                else if(doubleLetter.includes(i))
                                    return <DoubleLetterCell key={i} droppable={true} finalized={false}/>
                                else
                                    return <Cell key={i} droppable={true} finalized={false}/>
                            })
                        )
                    }
                </div>
            </div>
        );
    }
}

export default Board;
