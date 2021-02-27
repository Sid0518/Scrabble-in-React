import { Component } from "react";
import { v4 as uuid } from "uuid";

const points = {
    A: 1,
    E: 1,
    I: 1,
    O: 1,
    U: 1,
    L: 1,
    N: 1,
    R: 1,
    S: 1,
    T: 1,
    D: 2,
    G: 2,
    B: 3,
    C: 3,
    M: 3,
    P: 3,
    F: 4,
    H: 4,
    V: 4,
    W: 4,
    Y: 4,
    K: 5,
    J: 8,
    X: 8,
    Q: 10,
    Z: 10
};

class Tile extends Component {
    constructor(props) {
        super(props);
        this.id = uuid();
    }

    componentDidMount = () => {
        this.element.addEventListener(
            "remove", 
            () => {
                this.props.removeTile();
            }
        );
    }

    startDrag = (event) => {
        event.dataTransfer.setData("id", this.id);
        event.dataTransfer.setData("letter", this.props.letter);

        setTimeout(() => this.element.style = "display: none;", 0);
    }

    dragOver = (event) => {
        event.stopPropagation();
        event.preventDefault();
    }

    render() {
        let className = "square";
        if(!(this.props.draggable ?? false))
            className += " no-hover";

        return (
            <div
                id={this.id}
                ref={ref => this.element = ref}
                className={className}
                draggable={this.props.draggable ?? false}
                onDragStart={this.startDrag}
                onDragOver={this.dragOver}
            >
                <div className="tile">
                    <div className="tile-letter">
                        {this.props.letter ?? ":("}
                    </div>

                    <div className="tile-points">
                        {points[this.props.letter] ?? ""}
                    </div>
                </div>
            </div>
        )
    }
}

export default Tile;