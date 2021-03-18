import  { Component } from "react";

import './App.css';

import Board from "./components/Board";
import PlayerTiles from "./components/PlayerTiles";

import LetterPool from "./LetterPool";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.letterPool = new LetterPool();

        this.state = {
            player: 0,
            board: [],
            firstPlayerLetters: [],
            secondPlayerLetters: [],
            movesMade: [],
        };

        for(let i = 0;i < 225;i++)
            this.state.board.push({
                letter: "",
                droppable: true,
                finalized: false
            });

        for(let i = 0;i < 7;i++) {
            const letter = this.letterPool.getRandomLetter();
            this.state.firstPlayerLetters.push(letter);
        }

        for(let i = 0;i < 7;i++) {
            const letter = this.letterPool.getRandomLetter();
            this.state.secondPlayerLetters.push(letter);
        }
    }

    placeTileOnBoard = (letter, index) => {
        this.setState((prevState) => {
            const board = [...prevState.board];
            board[index] = {
                ...board[index],
                letter: letter
            };

            const movesMade = [...prevState.movesMade];
            movesMade.push(index);

            return {
                ...prevState,
                board: board,
                movesMade: movesMade
            };
        });
    }

    removeTileFromBoard = (index) => {
        this.setState((prevState) => {
            const board = [...prevState.board];
            board[index] = {
                ...board[index],
                letter: ""
            };

            const movesMade = [...prevState.movesMade];
            const idx = movesMade.indexOf(index);
            if(idx !== -1)
                movesMade.splice(idx, 1);

            return {
                ...prevState,
                board: board,
                movesMade: movesMade,
            };
        });
    }

    addTileToPlayer1 = (letter, index) => {
        let letters = [...this.state.firstPlayerLetters];
        letters.splice(index, 0, letter);
        
        this.setState((prevState) => {
            return {
                ...prevState,
                firstPlayerLetters: letters
            };
        });
    }

    removeTileFromPlayer1 = (index) => {
        let letters = [...this.state.firstPlayerLetters];
        letters.splice(index, 1);
        this.setState((prevState) => {
            return {
                ...prevState,
                firstPlayerLetters: letters
            };
        });
    }

    addTileToPlayer2 = (letter, index) => {
        let letters = [...this.state.secondPlayerLetters];
        letters.splice(index, 0, letter);
        this.setState((prevState) => {
            return {
                ...prevState,
                secondPlayerLetters: letters
            };
        });
    }

    removeTileFromPlayer2 = (index) => {
        let letters = [...this.state.secondPlayerLetters];
        letters.splice(index, 1);
        this.setState((prevState) => {
            return {
                ...prevState,
                secondPlayerLetters: letters
            };
        });
    }

    toggle = () => {
        let firstPlayerLetters = [...this.state.firstPlayerLetters];
        for(let i = firstPlayerLetters.length;i < 7;i++) {
            const letter = this.letterPool.getRandomLetter();
            if(letter === null)
                break;
            firstPlayerLetters.push(letter);
        }

        let secondPlayerLetters = [...this.state.secondPlayerLetters];
        for(let i = secondPlayerLetters.length;i < 7;i++) {
            const letter = this.letterPool.getRandomLetter();
            if(letter === null)
                break;
            secondPlayerLetters.push(letter);
        }

        const board = [...this.state.board];
        for(const index of this.state.movesMade)
            board[index] = {
                ...board[index],
                finalized: true
            };

        this.setState((prevState) => {
            return {
                ...prevState,
                board: board,
                player: 1 - this.state.player,
                firstPlayerLetters: firstPlayerLetters,
                secondPlayerLetters: secondPlayerLetters,
                movesMade: [],
            };
        });
    }

    dragOver = (event) => {
        event.stopPropagation();
        event.preventDefault();
    }

    drop = (event) => {
        /*
            The default drop event handler:
                Handles the case when a dragged element is 
                dropped in a place that's not a drop target.

            This function is called when an element which was 
            being dragged is dropped on an element which did 
            not have its own drop handler.
        */
        event.preventDefault();

        const id = event.dataTransfer.getData("id");
        const element = document.getElementById(id);
        element.style = "display: block;";
        // TODO: Add code here to fix letter drop bug
    }

    render() {
        return (
            <div className="app" onDragOver={this.dragOver} onDrop={this.drop}>
                <PlayerTiles
                    letters={this.state.firstPlayerLetters}
                    enabled={this.state.player === 0}
                    addTile={this.addTileToPlayer1}
                    removeTile={this.removeTileFromPlayer1}
                    toggle={this.toggle}
                />
                <Board 
                    board={this.state.board} 
                    placeTile={this.placeTileOnBoard}
                    removeTile={this.removeTileFromBoard}
                />
                <PlayerTiles
                    letters={this.state.secondPlayerLetters}
                    enabled={this.state.player === 1}
                    addTile={this.addTileToPlayer2}
                    removeTile={this.removeTileFromPlayer2}
                    toggle={this.toggle}
                />
            </div>
        );
    }
}
