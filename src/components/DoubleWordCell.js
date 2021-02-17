import Cell from "./Cell";

export default class DoubleWordCell extends Cell {
    constructor(props) {
        super(props);
        
        this.className = "cell double-word special-cell";
        this.wordMultiplier = 2;    
    }
}