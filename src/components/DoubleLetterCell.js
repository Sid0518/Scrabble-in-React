import Cell from "./Cell";

export default class DoubleLetterCell extends Cell {
    constructor(props) {
        super(props);
        
        this.className = "cell double-letter special-cell";
        this.letterMultiplier = 2;
    }
}