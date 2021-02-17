import Cell from "./Cell";

export default class TripleLetterCell extends Cell {
    constructor(props) {
        super(props);
        
        this.className = "cell triple-letter special-cell";
        this.letterMultiplier = 3;
    }
}