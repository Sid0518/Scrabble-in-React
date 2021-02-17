import React from "react";

import './App.css';

import Board from "./components/Board";
import Player from "./components/Player";

const App = () => {
    const dragOver = (event) => {
        event.stopPropagation();
        event.preventDefault();
    }

    const drop = (event) => {
        event.stopPropagation();
        event.preventDefault();

        let id = event.dataTransfer.getData("id");
        let element = document.getElementById(id);

        if(element !== undefined && element !== null) {
            element.classList.remove("collapsed-tile");
            element.classList.remove("no-display");
        }
    }

    return (
        <div className="app" onDragOver={dragOver} onDrop={drop}>
            <Player turn={true}/>
            <Board />
            <Player turn={false}/>
        </div>
    );
}

export default App;
