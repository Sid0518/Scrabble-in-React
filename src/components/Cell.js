import { Component } from 'react';

import Tile from "./Tile";

export default class Cell extends Component {
    constructor(props) {
        super(props);

        this.letterMultiplier = 1;
        this.wordMultiplier = 1;

        this.className = "cell";
        this.rewardLabel = "";

        if(props.letterMultiplier === 2) {
            this.className += " double-letter special-cell";
            this.rewardLabel = "DL";
        }

        else if(props.letterMultiplier === 3) {
            this.className += " triple-letter special-cell";
            this.rewardLabel = "TL";
        }
        
        else if(props.wordMultiplier === 2) {
            this.className += " double-word special-cell";
            this.rewardLabel = "DW";
        }
        
        else if(props.wordMultiplier === 3) {
            this.className += " triple-word special-cell";
            this.rewardLabel = "TW";
        }
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
        if(this.props.letter === "") {
            this.removeDragHover(event);

            const id = event.dataTransfer.getData("id");
            const element = document.getElementById(id);
            element.style = "display: block;";
            
            const remove = new Event("remove");
            element.dispatchEvent(remove);

            const letter = event.dataTransfer.getData("letter");
            setTimeout(() => this.props.placeTile(letter, this.props.index), 0);
        }
    }

    removeTile = () => {
        this.props.removeTile(this.props.index);
    }

    render() {
        return (
            <div
                ref={ref => this.element = ref}
                className={"square " + this.props.letter}
                onDragOver={this.props.droppable ? this.dragOver : null}
                onDragLeave={this.props.droppable ? this.removeDragHover : null}
                onDrop={this.props.droppable ? this.drop : null}
            >
                <div className={this.className}>
                    
                    <div className="reward-label">
                        {this.rewardLabel}
                    </div>

                    {
                        (this.props.letter !== "") ?
                            <Tile
                                letter={this.props.letter}
                                draggable={!this.props.finalized}
                                removeTile={this.removeTile}
                                inCell={true}
                            /> : ""
                    }
                </div>
            </div>
        );
    }
}