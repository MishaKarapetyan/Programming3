let livingCreature = require('./livingCreature')
let random = require("./random");
module.exports = class Predator extends livingCreature {
    constructor(x, y, energy) {
        super(x, y, energy)
        this.energy = 30;
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
            this.energy--;
            this.getNewCoordinates();
            let emptyCells = this.chooseCell(0) //[[1,2],[2,5]]
            let oneEmptyCell = random(emptyCells) //[1,2]
            if (oneEmptyCell) {
                let neighX = oneEmptyCell[0]
                let neighY = oneEmptyCell[1]
                matrix[this.y][this.x] = 0
                matrix[neighY][neighX] = 3
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
        for (var i in PredatorArr) {
            if (this.x == PredatorArr[i].x && this.y == PredatorArr[i].y) {
                PredatorArr.splice(i, 1);//[[1,2],[2,3]]
                break;
            }
        }
    }

    eat() {
        this.getNewCoordinates()
        let allGrasses = this.chooseCell(1)
        let allGrassEaters = this.chooseCell(2)
        let allThickGrass = this.chooseCell(5)
        let all = allGrasses.concat(allGrassEaters && allThickGrass)
        let oneCharacter = random(all)
        if (oneCharacter) {
            this.energy++;
            let neighX = oneCharacter[0];
            let neighY = oneCharacter[1];
            matrix[neighY][neighX] = 3;
            matrix[this.y][this.x] = 0;

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
            matrix[this.y][this.x] = 0;
            for (var i in thickGrassArr) {
                if (neighX == thickGrassArr[i].x && neighY == thickGrassArr[i].y) {
                    thickGrassArr.splice(i, 1);//[[1,2],[2,3]]
                    var newGrass = new Grass(oneCharacter[0], oneCharacter[1]);
                    grassArr.push(newGrass);
                    matrix[this.y][this.x] = 1;
                    break;
                }
            } this.y = neighY;
            this.x = neighX;
        }

        else {
            this.move()
        }
    }
}