let livingCreature = require('./livingCreature')
let random = require("./random");
module.exports = class blackHole extends livingCreature {
    constructor(x, y, energy) {
        super(x, y, energy)
        this.energy = 3;
        this.directions = [];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
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
    move() {
        if (this.energy > 0) {
            this.energy++;
            this.getNewCoordinates();
            let emptyCells = this.chooseCell(0) //[[1,2],[2,5]]
            let oneEmptyCell = random(emptyCells) //[1,2]
            if (oneEmptyCell) {
                let neighX = oneEmptyCell[0]
                let neighY = oneEmptyCell[1]
                matrix[this.y][this.x] = 0
                matrix[neighY][neighX] = 4
                this.y = neighY
                this.x = neighX
            }
        }

    }

    eat() {
        this.getNewCoordinates()
        let allGrasses = this.chooseCell(1)
        let allGrassEaters = this.chooseCell(2)
        let allPredators = this.chooseCell(3)
        let allThickGrass = this.chooseCell(5)
        let all = allGrasses.concat(allGrassEaters && allPredators && allThickGrass)
        let oneCharacter = random(all)
        if (oneCharacter) {
            this.energy++;
            let neighX = oneCharacter[0];
            let neighY = oneCharacter[1];
            matrix[neighY][neighX] = 4;
            matrix[this.y][this.x] = 0;
            this.y = neighY;
            this.x = neighX;
            for (var i in grassArr) {
                if (neighX == grassArr[i].x && neighY == grassArr[i].y) {
                    grassArr.splice(i, 1);//[[1,2],[2,3]]
                    break;
                }
            }
            for (var i in grassEaterArr) {
                if (neighX == grassEaterArr[i].x && neighY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);//[[1,2],[2,3]]
                    break;
                }
            }
            for (var i in PredatorArr) {
                if (neighX == PredatorArr[i].x && neighY == PredatorArr[i].y) {
                    PredatorArr.splice(i, 1);//[[1,2],[2,3]]
                    break;
                }
            }
            for (var i in thickGrassArr) {
                if (neighX == thickGrassArr[i].x && neighY == thickGrassArr[i].y) {
                    thickGrassArr.splice(i, 1);//[[1,2],[2,3]]
                    break;
                }
            }
        } else {
            this.move()
        }
    }
    mul() {
        if (this.energy > 50) {
            var newCell = random(this.chooseCell(0)); //newCell-1 datark harevan
            if (newCell) { //[3,4]
                var newBlackHole = new blackHole(newCell[0], newCell[1]);
                blackHoleArr.push(newBlackHole);
                matrix[newCell[1]][newCell[0]] = 4;
                this.energy = this.energy - 10

            }
        }
    }
}
