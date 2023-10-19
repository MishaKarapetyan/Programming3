
let random = require("./random");
let livingCreature = require('./livingCreature')
module.exports = class Grass extends livingCreature {
  constructor(x, y, energy) {
    super(x, y, energy)
    delete this.energy
    this.multiply = 3
  }



  mul() {

    this.multiply++; //1
    var newCell = random(this.chooseCell(0)); //newCell-1 datark harevan
    if (this.multiply >= 8 && newCell) { //[3,4]
      var newGrass = new Grass(newCell[0], newCell[1]);
      grassArr.push(newGrass);
      matrix[newCell[1]][newCell[0]] = 1;
      this.multiply = 0;
    }
  }
}




