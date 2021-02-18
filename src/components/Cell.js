import React, { Component } from 'react';
import {v4 as uuid} from "uuid";

import Tile from "./Tile";

export default class Cell extends Component {
    constructor(props) {
        super(props);
        this.id = uuid();

        this.className = "cell";
        this.letterMultiplier = 1;
        this.wordMultiplier = 1;
        this.rewardLabel = "";

        this.state = {
            droppable: props.droppable,
            letter: null
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
        this.removeDragHover(event);

        const id = event.dataTransfer.getData("id");
        const element = document.getElementById(id);

        if(element !== undefined && element !== null) {
            element.classList.remove("no-display");
            element.classList.remove("collapsed-tile");

            const letter = element.querySelector(".tile-letter").innerHTML;
            const removalEvent = new Event("removeTile");
            element.dispatchEvent(removalEvent);

            this.setState((state) => {
                return {
                    letter: letter
                };
            });
        }
    }

    disableDrop = () => {
        this.setState({
            droppable: false
        });
    }

    removeTile = (index) => {
        this.setState((state) => {
            return {
                letter: null
            };
        });
    }

    render() {
        return (
            <div
                ref={ref => this.element = ref}
                className={"square " + this.state.letter}
                onDragOver={this.state.droppable ? this.dragOver : null}
                onDragLeave={this.state.droppable ? this.removeDragHover : null}
                onDrop={this.state.droppable ? this.drop : null}
            >
                <div className={this.className}>
                    
                    <div className="reward-label">
                        {this.rewardLabel}
                    </div>

                    {
                        (this.state.letter !== undefined && this.state.letter !== null) ?
                            <Tile 
                                key={this.id} id={this.id}
                                letter={this.state.letter} index={0}
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