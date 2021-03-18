import { Component } from 'react';

import Tile from "./Tile";

export default class Cell extends Component {
    constructor(props) {
        super(props);

        this.className = "cell";
        this.letterMultiplier = 1;
        this.wordMultiplier = 1;
        this.rewardLabel = "";

        this.state = {
            droppable: props.droppable,
            letter: 
                (props.letter === undefined) ? 
                    null : props.letter
        };
    }

    dragOver = (event) => {
        event.stopPropagation();
        event.preventDefault();

        this.element.classList.add("cell-drag-over");
    }

    removeDragHover = (event) => {
        event.stopPropagation();
        event.preventDefault();

        this.element.classList.remove("cell-drag-over");
    }

    drop = (event) => {
        if(this.state.letter === null) {
            this.removeDragHover(event);

            const id = event.dataTransfer.getData("id");
            const element = document.getElementById(id);
            element.style = "display: block;";
            
            const remove = new Event("remove");
            element.dispatchEvent(remove);

            const letter = event.dataTransfer.getData("letter");
            setTimeout(() => this.setState({
                letter: letter
            }), 0);
        }
    }

    removeTile = () => {
        this.setState({
            letter: null
        });
    }

    render() {
        return (
            <div
                ref={ref => this.element = ref}
                className={"square " + this.state.letter}
                onDragOver={this.props.droppable ? this.dragOver : null}
                onDragLeave={this.props.droppable ? this.removeDragHover : null}
                onDrop={this.props.droppable ? this.drop : null}
            >
                <div className={this.className}>
                    
                    <div className="reward-label">
                        {this.rewardLabel}
                    </div>

                    {
                        (this.state.letter !== undefined && this.state.letter !== null) ?
                            <Tile
                                letter={this.state.letter}
                                draggable={true}
                                removeTile={this.removeTile}
                                inCell={true}
                            /> : ""
                    }
                </div>
            </div>
        );
    }
}