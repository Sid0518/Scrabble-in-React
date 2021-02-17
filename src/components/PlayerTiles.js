import React, { Component } from "react";
import {v4 as uuid} from "uuid";

import Tile from "./Tile";
import letterPool from "../LetterPool";

class PlayerTiles extends Component {
    constructor(props) {
        super(props);

        this.id = uuid();
        
        let letters = [];
        for(let i = 0;i < 7;i++) {
            let letter = letterPool.getRandomLetter();
            letters.push(letter);
        }

        this.ids = [];
        this.generateIds(letters.length);
            
        this.state = {
            letters: letters,
            enabled: props.enabled
        };
    }

    generateIds = (count) => {
        this.ids = [];
        for(let i = 0;i < count;i++)
            this.ids.push(uuid());
    }

    toggle = () => this.setState((state) => {
        return {
            enabled: !state.enabled
        };
    });

    removeTile = (index) => {
        this.setState((state) => {
            let newLetters = [...state.letters];
            newLetters.splice(index, 1);
            this.generateIds(newLetters.length);

            return {
                letters: newLetters
            };
        });
    }

    addTile = (letter, index) => {
        this.setState((state) => {
            let newLetters = [...state.letters];
            newLetters.splice(index, 0, letter);
            this.generateIds(newLetters.length);

            return {
                letters: newLetters
            };
        });
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
        
        if(element !== undefined && element !== null) {
            const removalEvent = new Event("removeTile");
            element.dispatchEvent(removalEvent);

            element.classList.remove("collapsed-tile");

            const dropY = event.clientY;
            const dropTarget = event.currentTarget;

            this.setState(
                () => {}, 
                () => {
                    const letter = element.querySelector(".tile-letter").innerHTML;

                    const rect = dropTarget.getBoundingClientRect();
                    const ratio = (dropY - rect.top) / (rect.bottom - rect.top);
                    const index = Math.floor(this.state.letters.length * ratio + 0.5);

                    this.addTile(letter, index);
                }
            );
        }
    }

    render() {
        return (
            <div 
                key={this.id}
                className="player-tiles"
                onDragOver={this.state.enabled ? this.dragOver : null}
                onDrop={this.state.enabled ? this.drop : null}
            >
            {
                this.ids.map((id, index) => {
                    const letter = this.state.letters[index];
                    return (
                        <Tile 
                            key={id} id={id} 
                            letter={letter} index={index} 
                            draggable={this.state.enabled}
                            removeTile={this.removeTile}
                        />
                    )
                })
            }
            </div>
        );
    }
}

export default PlayerTiles;