import { Component } from "react";
import {v4 as uuid} from "uuid";

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

        this.id = (props.id !== undefined) ? 
            props.id : 
            uuid();

        this.index = props.index;
        
        this.state = {
            letter: props.letter,
            inCell: (props.inCell !== undefined) ?
                props.inCell :
                false,
            draggable: (props.draggable !== undefined) ? 
                props.draggable : 
                false
        }
    }

    componentDidMount() {
        this.element.addEventListener(
            "removeTile", 
            () => {
                this.props.removeTile(this.index);
            }
        );
    }

    toggle = () => this.setState({
        draggable: !this.state.draggable
    });

    startDrag = (event) => {
        let target = event.target;
        event.dataTransfer.setData("id", target.id);
        if(this.state.inCell)
            setTimeout(() => {
                target.classList.add("no-display");
            }, 0);
        else
            setTimeout(() => {
                target.classList.add("collapsed-tile");
            }, 0);
    }

    dragOver = (event) => {
        event.stopPropagation();
        event.preventDefault();
    }

    render() {
        return (
            <div
                ref={ref => this.element = ref}
                className={`square ${!this.state.draggable ? "no-hover" : ""}`} 
                id={this.id} 
                draggable={this.state.draggable}
                onDragStart={this.startDrag}
                onDragOver={this.dragOver}
            >
                <div className="tile">
                    <div className="tile-letter">
                        {this.state.letter !== null ? 
                            this.state.letter : ""}
                    </div>

                    <div className="tile-points">
                    {
                        this.state.letter != null ? 
                            (points[this.state.letter] ?? "") : 
                            ""
                    }
                    </div>

                </div>
            </div>
        )
    }
}

export default Tile;