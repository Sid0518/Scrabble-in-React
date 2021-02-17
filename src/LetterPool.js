const counts = {
    E: 12,
    A: 9,
    I: 9,
    O: 8,
    N: 6,
    R: 6,
    T: 6,
    L: 4,
    S: 4,
    U: 4,
    D: 4,
    G: 3,
    B: 2,
    C: 2,
    M: 2,
    P: 2,
    F: 2,
    H: 2,
    V: 2,
    W: 2,
    Y: 2,
    K: 1,
    J: 1,
    X: 1,
    Q: 1,
    Z: 1
};

class LetterPool {
    constructor() {
        this.populate();
    }

    populate() {
        this.pool = [];
        for(let letter of Object.keys(counts)) {
            let count = counts[letter];
            while(count--)
                this.pool.push(letter);
        }
    }

    getRandomLetter() {
        if(this.pool.length === 0)
            return null;

        let idx = Math.floor(Math.random() * this.pool.length);
        let letter = this.pool[idx];
        this.pool.splice(idx, 1);
        
        return letter;
    }
}

const letterPool = new LetterPool();
export default letterPool;