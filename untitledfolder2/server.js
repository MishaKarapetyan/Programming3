var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get("/", function (req, res) {
   res.redirect("index.html");
});
server.listen(3000, ()=> {
   console.log("ashxatum em mi anhangstaciii")
});


let livingCreature = require('./livingCreature')
let grass = require('./grass')
let grassEater = require('./grassEater')
let predator = require('./predator')
let blackHole = require('./blackHole')
let thickGrass = require('./thickGrass')
let random = require("./random");
lmatrix = [];

function matrixGenerator(size, countGrass, countGrassEater, countPredator, countBlackHole, countThickGrass) {
    for (let i = 0; i < size; i++) {
        matrix.push([])
        for (let j = 0; j < size; j++) {
            matrix[i].push(0)
        }

    }
    for (let k = 0; k < countGrass; k++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        matrix[y][x] = 1
    }
    for (let k = 0; k < countGrassEater; k++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        matrix[y][x] = 2
    }
    for (let k = 0; k < countPredator; k++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        matrix[y][x] = 3
    }
    for (let k = 0; k < countBlackHole; k++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        matrix[y][x] = 4
    }
    for (let k = 0; k < countThickGrass; k++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        matrix[y][x] = 5
    }
}
grassArr = [];
grassEaterArr = [];
PredatorArr = [];
blackHoleArr = [];
thickGrassArr = [];


function setupGame(){
   matrixGenerator(100, 0, 100, 50, 1, 100)
   for (let y = 0; y < 100; y++) {
      for (let x = 0; x < 100; x++) {
          if (matrix[y][x] == 1) {
              let gr = new Grass(x, y)
              grassArr.push(gr)
          } else if (matrix[y][x] == 2) {
              let grE = new GrassEater(x, y)
              grassEaterArr.push(grE)
          } else if (matrix[y][x] == 3) {
              let pre = new Predator(x, y)
              PredatorArr.push(pre)
          }
          else if (matrix[y][x] == 4) {
              let bl = new blackHole(x, y)
              blackHoleArr.push(bl)
          }
          else if (matrix[y][x] == 5) {
              let th = new thickGrass(x, y)
              thickGrassArr.push(th)
          }
          io.emit('update matrix',matrix)

      }
  }
}

io.on('connection', function (socket){
   socket.emit('update matrix',matrix)
   playGame()
   startPlaying()
})

function playGame(){
   for (let i = 0; i < grassArr.length; i++) {
      grassArr[i].mul()
  }
  for (let i = 0; i < grassEaterArr.length; i++) {
      grassEaterArr[i].eat()
  }
  for (let i = 0; i < grassEaterArr.length; i++) {
      grassEaterArr[i].mul()
  }
  for (let i = 0; i < PredatorArr.length; i++) {
      PredatorArr[i].eat()
  }
  for (let i = 0; i < blackHoleArr.length; i++) {
      blackHoleArr[i].mul()
  }
  for (let i = 0; i < blackHoleArr.length; i++) {
      blackHoleArr[i].eat()
  }
  for (let i = 0; i < thickGrassArr.length; i++) {
      thickGrassArr[i].mul()
  }
}
let int = 1000;
let intervalID;

function startPlaying(){
   clearInterval(intervalID)
   intervalID = setInterval(()=>{
      playGame()
   },int);
}

