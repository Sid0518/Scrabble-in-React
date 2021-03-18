import  { Component } from "react";

import './App.css';

import Board from "./components/Board";
import PlayerTiles from "./components/PlayerTiles";

import LetterPool from "./LetterPool";

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

const points = {
    A: 1,
    E: 1,
    I: 1,
    O: 1,
    U: 1,
    L: 1,
    N: 1,
    R: 1,
    S: 1,
    T: 1,
    D: 2,
    G: 2,
    B: 3,
    C: 3,
    M: 3,
    P: 3,
    F: 4,
    H: 4,
    V: 4,
    W: 4,
    Y: 4,
    K: 5,
    J: 8,
    X: 8,
    Q: 10,
    Z: 10
};

export default class App extends Component {
    constructor(props) {
        super(props);
        this.letterPool = new LetterPool();

        this.state = {
            player: 0,
            board: [],

            firstPlayerLetters: [],
            firstPlayerScore: 0,
            
            secondPlayerLetters: [],
            secondPlayerScore: 0,
            
            movesMade: [],
        };

        for(let i = 0;i < 225;i++) {
            let letterMultiplier = 1;
            let wordMultiplier = 1;

            if(tripleWord.includes(i))
                wordMultiplier = 3;
            else if(doubleWord.includes(i))
                wordMultiplier = 2;
            
            if(tripleLetter.includes(i))
                letterMultiplier = 3;
            else if(doubleLetter.includes(i))
                letterMultiplier = 2;

            this.state.board.push({
                letter: "",
                
                letterMultiplier: letterMultiplier,
                wordMultiplier: wordMultiplier,
                
                droppable: true,
                finalized: false
            });
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

    getScoreForCurrentTurn = () => {
        const board = this.state.board;
        const words = [];
        for(const index of this.state.movesMade) {
            let r, c;
            let start, end;
            let score, wordMultiplier;

            //------------------------------------------//
            // Horizontal word
            score = (board[index].letterMultiplier * points[board[index].letter]);
            wordMultiplier = board[index].wordMultiplier;

            start = index;

            r = Math.floor((start - 1) / 15);
            c = (start - 1) % 15;
            
            // Moving left
            while(c >= 0) {
                const i = 15*r + c;
                if(board[i].letter !== "") {
                    score += (board[i].letterMultiplier * points[board[i].letter]);
                    wordMultiplier *= board[i].wordMultiplier;

                    start = i;
                }
                else
                    break;
                c--;
            }

            end = index;
            
            r = Math.floor((end + 1) / 15);
            c = (end + 1) % 15;
            
            // Moving right
            while(c < 15) {
                const i = 15*r + c;
                if(board[i].letter !== "") {
                    score += (board[i].letterMultiplier * points[board[i].letter]);
                    wordMultiplier *= board[i].wordMultiplier;

                    end = i;
                }
                else
                    break;
                c++;
            }

            if(end > start) {
                score *= wordMultiplier;
                words.push({
                    type: "horizontal",
                    start: start,
                    end: end,
                    score: score
                });
            }
            //------------------------------------------//

            //------------------------------------------//
            // Vertical word
            score = (board[index].letterMultiplier * points[board[index].letter]);
            wordMultiplier = board[index].wordMultiplier;

            start = index;

            r = Math.floor((start - 15) / 15);
            c = (start - 15) % 15;
            
            // Moving up
            while(r >= 0) {
                const i = 15*r + c;
                if(board[i].letter !== "") {
                    score += (board[i].letterMultiplier * points[board[i].letter]);
                    wordMultiplier *= board[i].wordMultiplier;

                    start = i;
                }
                else
                    break;
                r--;
            }

            end = index;
            
            r = Math.floor((end + 15) / 15);
            c = (end + 15) % 15;
            
            // Moving down
            while(r < 15) {
                const i = 15*r + c;
                if(board[i].letter !== "") {
                    score += (board[i].letterMultiplier * points[board[i].letter]);
                    wordMultiplier *= board[i].wordMultiplier;

                    end = i;
                }
                else
                    break;
                r++;
            }

            if(end > start) {
                score *= wordMultiplier;
                words.push({
                    type: "vertical",
                    start: start,
                    end: end,
                    score: score
                });
            }
            //-------------------------------------------//
        }
        
        const uniq = new Set(words.map(wordData => JSON.stringify(wordData)));
        const scores = Array.from(uniq).map(wordJson => JSON.parse(wordJson).score);
        return scores.reduce((a, b) => a + b);
    }

    toggle = () => {
        //------------------------------------------------------------//
        // Re-fill letters for the first player
        let firstPlayerLetters = [...this.state.firstPlayerLetters];
        for(let i = firstPlayerLetters.length;i < 7;i++) {
            const letter = this.letterPool.getRandomLetter();
            if(letter === null)
                break;
            firstPlayerLetters.push(letter);
        }
        //------------------------------------------------------------//

        //------------------------------------------------------------//
        // Re-fill letters for the second player
        let secondPlayerLetters = [...this.state.secondPlayerLetters];
        for(let i = secondPlayerLetters.length;i < 7;i++) {
            const letter = this.letterPool.getRandomLetter();
            if(letter === null)
                break;
            secondPlayerLetters.push(letter);
        }
        //------------------------------------------------------------//

        //------------------------------------------------------//
        // Update score
        const scoreIncrement = this.getScoreForCurrentTurn();
        let firstPlayerScore = this.state.firstPlayerScore;
        if(this.state.player === 0)
            firstPlayerScore += scoreIncrement;

        let secondPlayerScore = this.state.secondPlayerScore;
        if(this.state.player === 1)
            secondPlayerScore += scoreIncrement;
        //------------------------------------------------------//

        //--------------------------------------------//
        /*
            Finalize the letters placed in this turn, 
            so they cannot be moved in a future turn
        */
        const board = [...this.state.board];
        for(const index of this.state.movesMade)
            board[index] = {
                ...board[index],
                finalized: true
            };
        //--------------------------------------------//

        this.setState((prevState) => {
            return {
                ...prevState,
                board: board,
                player: 1 - this.state.player,
                
                firstPlayerLetters: firstPlayerLetters,
                firstPlayerScore: firstPlayerScore,

                secondPlayerLetters: secondPlayerLetters,
                secondPlayerScore: secondPlayerScore,
                
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
        element.classList.remove("collapsed-tile");
        // element.style = "display: block;";
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
