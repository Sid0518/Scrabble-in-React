import { Component } from "react";

import Cell from "./Cell";

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
                                let letterMultiplier = 1;
                                let wordMultiplier = 1;

                                if(tripleWord.includes(i))
                                    wordMultiplier = 3;
                                else if(doubleWord.includes(i))
                                    wordMultiplier = 2;
                                
                                    if(tripleLetter.includes(i))
                                    letterMultiplier = 3;
                                else if(doubleLetter.includes(i))
                                    letterMultiplier = 2;
                                
                                return (
                                    <Cell 
                                        key={i} index={i} 
                                        letter={cellData.letter}
                                        letterMultiplier={letterMultiplier}
                                        wordMultiplier={wordMultiplier}
                                        placeTile={this.props.placeTile}
                                        removeTile={this.props.removeTile}
                                        droppable={cellData.droppable} 
                                        finalized={cellData.finalized} 
                                    />
                                );
                            })
                        )
                    }
                </div>
            </div>
        );
    }
}

export default Board;
