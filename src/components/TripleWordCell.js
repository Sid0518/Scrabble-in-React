import Cell from "./Cell";

export default class TripleWordCell extends Cell {
    constructor(props) {
        super(props);
    
        this.className = "cell triple-word special-cell";
        this.wordMultiplier = 3;
    }
}