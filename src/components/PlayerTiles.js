import { Component } from "react";
import { v4 as uuid } from "uuid";

import Tile from "./Tile";

class PlayerTiles extends Component {
    addTile = (letter, index) => {
        setTimeout(() => this.props.addTile(letter, index), 0);
    }

    removeTile = (index) => {
        setTimeout(() => this.props.removeTile(index), 0);
    }

    getTileIndexFromEvent = (event) => {
        const dropY = event.clientY;
        const dropTarget = event.currentTarget;

        const rect = dropTarget.getBoundingClientRect();
        const ratio = (dropY - rect.top) / (rect.bottom - rect.top);
        const index = Math.round((this.props.letters.length - 1) * ratio);
        
        return index;
    }

    dragOver = (event) => {
        event.stopPropagation();
        event.preventDefault();
    }

    drop = (event) => {
        event.stopPropagation();
        event.preventDefault();

        const id = event.dataTransfer.getData("id");
        const element = document.getElementById(id);
        // element.style = "display: block;";
        
        const remove = new Event("remove");
        element.dispatchEvent(remove);

        const letter = event.dataTransfer.getData("letter");
        const index = this.getTileIndexFromEvent(event);
        this.addTile(letter, index);
    }

    render() {
        return (
            <div className="player">
                <div
                    className="player-tiles"
                    onDragOver={this.props.enabled ? this.dragOver : null}
                    onDrop={this.props.enabled ? this.drop : null}
                >
                    {
                        this.props.letters.map((letter, index) => {
                            const key = uuid();
                            return <Tile
                                key={key}
                                letter={letter}
                                draggable={this.props.enabled}
                                removeTile={() => this.removeTile(index)}
                            />
                        })
                    }
                </div>

                <div 
                    className={`confirm-turn ${!this.props.enabled ? "no-hover" : ""}`}
                    onClick={this.props.toggle}
                >
                    CONFIRM TURN
                </div>
            </div>
        );
    }
}

export default PlayerTiles;