import { Component } from "react";

class Board extends Component {
    render() {
        return (
            <div className="board-wrapper">
                <div className="board">
                    {this.props.board}
                </div>
            </div>
        );
    }
}

export default Board;
