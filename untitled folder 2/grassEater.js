class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        let found = []
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }

    move() {
        if (this.energy > -10) {
            this.energy--;
            let emptyCells = this.chooseCell(0) //[[1,2],[2,5]]
            let oneEmptyCell = random(emptyCells) //[1,2]
            if (oneEmptyCell) {
                matrix[this.y][this.x] = 0
                let neighX = oneEmptyCell[0]
                let neighY = oneEmptyCell[1]
                matrix[neighY][neighX] = 2
                this.y = neighY
                this.x = neighX
            }
        }
        else {
            this.die();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);//[[1,2],[2,3]]
                break;
            }
        }
    }

    eat() {
        let allGrasses = this.chooseCell(1)
        let allThickGrass = this.chooseCell(5)
        let all = allGrasses.concat(allThickGrass)
        let oneCharacter = random(all)
        if (oneCharacter) {
            this.energy++;
            let neighX = oneCharacter[0];
            let neighY = oneCharacter[1];
            matrix[neighY][neighX] = 2;

            for (var i in grassArr) {
                if (neighX == grassArr[i].x && neighY == grassArr[i].y) {
                    grassArr.splice(i, 1);//[[1,2],[2,3]]
                    break;
                }
            }
            matrix[this.y][this.x] = 0;
            for (var i in thickGrassArr) {
                if (neighX == thickGrassArr[i].x && neighY == thickGrassArr[i].y) {
                    thickGrassArr.splice(i, 1);//[[1,2],[2,3]]
                    var newGrass = new Grass(oneCharacter[0], oneCharacter[1]);
                    grassArr.push(newGrass);
                    matrix[this.y][this.x] = 1;
                    break;
                }
            }

            this.y = neighY;
            this.x = neighX;

        } else {
            this.move()
        }
    }
    mul() {
        if (this.energy > 10) {
            var newCell = random(this.chooseCell(0)); //newCell-1 datark harevan
            if (newCell) { //[3,4]
                var newGrassEater = new GrassEater(newCell[0], newCell[1]);
                grassEaterArr.push(newGrassEater);
                matrix[newCell[1]][newCell[0]] = 2;
                this.energy = this.energy - 10
            }
        }
    }


}