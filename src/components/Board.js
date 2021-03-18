import { Component } from "react";
import Cell from "./Cell";

class Board extends Component {
    render() {
        return (
            <div className="board-wrapper">
                <div className="board">
                    {
                        Array.from(
                            this.props.board.map((cellData, i) => {
                                return (
                                    <Cell 
                                        key={i} index={i} 
                                        letter={cellData.letter}
                                        letterMultiplier={cellData.letterMultiplier}
                                        wordMultiplier={cellData.wordMultiplier}
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
