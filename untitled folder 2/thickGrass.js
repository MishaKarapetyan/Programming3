class thickGrass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 3;
        this.energy = 5;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]];
    }
    chooseCell(character) { // empty cells array [[1,2], [2,4]]
        let found = [] //
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) { //
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }


    mul() {

        this.multiply++; //1
        var newCell = random(this.chooseCell(1)); //newCell-1 datark harevan
        if (this.multiply >= 8 && newCell) { //[3,4]
            var newThickGrass = new thickGrass(newCell[0], newCell[1]);
            thickGrassArr.push(newThickGrass);
            matrix[newCell[1]][newCell[0]] = 5;
            this.multiply = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in thickGrassArr) {
            if (this.x == thickGrassArr[i].x && this.y == thickGrassArr[i].y) {
                thickGrassArr.splice(i, 1);//[[1,2],[2,3]]
                break;
            }
        }
    }
}
