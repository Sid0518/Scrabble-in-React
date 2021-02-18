import React, { Component } from "react";
import {v4 as uuid} from "uuid";

import Tile from "./Tile";
import letterPool from "../LetterPool";

class PlayerTiles extends Component {
    constructor(props) {
        super(props);

        this.id = uuid();
        
        let tiles = [];
        let tileRefs = [];

        for(let i = 0;i < 7;i++) {
            const tileId = uuid();
            const letter = letterPool.getRandomLetter();
            
            const tile = <Tile
                ref={ref => this.insertRef(ref, i)} 
                key={tileId} id={tileId} 
                letter={letter} index={i}
                draggable={props.enabled}
                expandCallback={() => this.updateExpandState(i)}
                removeTile={this.removeTile}
            />;
            tiles.push(tile);
        }

        this.state = {
            enabled: props.enabled,
            dragOverIndex: null,
            tiles: tiles,
            tileRefs: tileRefs
        };
    }

    toggle = (event) => {
        event.stopPropagation();
        this.state.tileRefs.forEach(ref => ref.toggle());
    }

    removeTile = (i) => {
        this.setState((state) => {
           let tiles = [...state.tiles];
           tiles.splice(i, 1);
           
           let tileRefs = [...state.tileRefs];
           tileRefs.splice(i, 1);

           return {
               tiles: tiles,
               tileRefs: tileRefs
           };
        });
    }

    addTile = (letter, i) => {
        this.setState((state) => {
            const tileId = uuid();
            const tile = <Tile
                ref={ref => this.insertRef(ref, i)} 
                key={tileId} id={tileId}
                letter={letter} index={i} 
                draggable={this.state.enabled}
                expandCallback={() => this.updateExpandState(i)}
                removeTile={this.removeTile}
            />;
            
            let tiles = [...state.tiles];
            tiles.splice(i, 0, tile);
 
            return {
                tiles: tiles
            };
         });
    }

    insertRef = (ref, i) => {
        if(ref !== null && ref !== undefined) {
            this.setState((state) => {
                let tileRefs = [...state.tileRefs];
                tileRefs.splice(i, 0, ref);

                return {
                    tileRefs: tileRefs
                };
            });
        }
    }

    getTileIndexFromEvent(event) {
        const dropY = event.clientY;
        const dropTarget = event.currentTarget;

        const rect = dropTarget.getBoundingClientRect();
        const ratio = (dropY - rect.top) / (rect.bottom - rect.top);
        const index = Math.floor(this.state.tiles.length * ratio);
        
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
        
        if(element !== undefined && element !== null) {
            element.classList.remove("collapsed-tile");
            
            const removalEvent = new Event("removeTile");
            element.dispatchEvent(removalEvent);
            
            const letter = element.querySelector(".tile-letter").innerHTML;
            const index = this.getTileIndexFromEvent(event);
            this.setState(
                {},
                () => this.addTile(letter, index)
            );
        }
    }

    render() {
        return (
            <div className="player">
                <div 
                    key={this.id}
                    className="player-tiles"
                    onDragOver={this.state.enabled ? this.dragOver : null}
                    onDrop={this.state.enabled ? this.drop : null}
                >
                    {this.state.tiles}
                </div>

                <div className={`confirm-turn ${!this.state.enabled ? "no-hover" : ""}`}>
                    CONFIRM TURN
                </div>
            </div>
        );
    }
}

export default PlayerTiles;