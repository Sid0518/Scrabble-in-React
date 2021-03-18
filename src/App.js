import  { Component } from "react";

import './App.css';

import Board from "./components/Board";
import PlayerTiles from "./components/PlayerTiles";

import LetterPool from "./LetterPool";

import Cell from "./components/Cell";
import DoubleLetterCell from "./components/DoubleLetterCell";
import DoubleWordCell from "./components/DoubleWordCell";
import TripleLetterCell from "./components/TripleLetterCell";
import TripleWordCell from "./components/TripleWordCell";

const tripleWord = [
    0, 7, 14, 105, 119, 210, 217, 224
];
const doubleWord = [
    16, 32, 48, 64, 160, 176, 192, 208, 
    28, 42, 56, 70, 154, 168, 182, 196
];
const tripleLetter = [
    20, 24, 76, 80, 84, 88, 136, 140, 
    144, 148, 200, 204
];
const doubleLetter = [
    3, 11, 36, 38, 45, 52, 59, 92, 96, 
    98, 102, 108, 116, 122, 126, 128, 
    132, 165, 172, 179, 186, 188, 213, 
    221
];

export default class App extends Component {
    constructor(props) {
        super(props);
        this.letterPool = new LetterPool();

        this.state = {
            player: 0,
            board: [],
            firstPlayerLetters: [],
            secondPlayerLetters: [],
        };

        for(let i = 0;i < 225;i++) {
            if(tripleWord.includes(i))
                this.state.board.push(<TripleWordCell key={i} droppable={true}/>)
            else if(doubleWord.includes(i))
                this.state.board.push(<DoubleWordCell key={i} droppable={true}/>)
            else if(tripleLetter.includes(i))
                this.state.board.push(<TripleLetterCell key={i} droppable={true}/>)
            else if(doubleLetter.includes(i))
                this.state.board.push(<DoubleLetterCell key={i} droppable={true}/>)
            else
                this.state.board.push(<Cell key={i} droppable={true}/>)
        }

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
                <Board board={this.state.board}/>
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
