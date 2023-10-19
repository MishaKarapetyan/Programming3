let livingCreature = require('./livingCreature')
let random = require("./random");
module.exports = class thickGrass extends livingCreature {
    constructor(x, y, energy) {
        super(x, y, energy)
        this.multiply = 3;
        this.energy = 5;

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
