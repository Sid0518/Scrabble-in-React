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
            firstPlayerLetters: [],
            secondPlayerLetters: [],
        };

        for(let i = 0;i < 7;i++) {
            const letter = this.letterPool.getRandomLetter();
            this.state.firstPlayerLetters.push(letter);
        }

        for(let i = 0;i < 7;i++) {
            const letter = this.letterPool.getRandomLetter();
            this.state.secondPlayerLetters.push(letter);
        }
    }

    addTileToPlayer1 = (letter, index) => {
        let letters = [...this.state.firstPlayerLetters];
        letters.splice(index, 0, letter);
        
        this.setState({
            firstPlayerLetters: letters
        });
    }

    removeTileFromPlayer1 = (index) => {
        let letters = [...this.state.firstPlayerLetters];
        letters.splice(index, 1);
        this.setState({
            firstPlayerLetters: letters
        });
    }

    addTileToPlayer2 = (letter, index) => {
        let letters = [...this.state.secondPlayerLetters];
        letters.splice(index, 0, letter);
        this.setState({
            secondPlayerLetters: letters
        });
    }

    removeTileFromPlayer2 = (index) => {
        let letters = [...this.state.secondPlayerLetters];
        letters.splice(index, 1);
        this.setState({
            secondPlayerLetters: letters
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

        this.setState({
            player: 1 - this.state.player,
            firstPlayerLetters: firstPlayerLetters,
            secondPlayerLetters: secondPlayerLetters
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
                <Board />
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
