// let matrix = [
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,2,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,1]
//     ]
let matrix = [];

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
side = 10;
let grassArr = [];
let grassEaterArr = [];
let PredatorArr = [];
let blackHoleArr = [];
let thickGrassArr = [];
function setup() {
    frameRate(10);
    matrixGenerator(100, 0, 100, 50, 1, 100) //1- matrixSize, 2,3
    createCanvas(matrix[0].length * side, matrix.length * side)
    background(43)
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

        }
    }

}


function draw() {
    for (let y = 0; y < 100; y++) {
        for (let x = 0; x < 100; x++) {
            if (matrix[y][x] == 0) {
                fill(43)
            } else if (matrix[y][x] == 1) {
                fill('green')
            } else if (matrix[y][x] == 2) {
                fill('yellow')
            } else if (matrix[y][x] == 3) {
                fill('red')
            }
            else if (matrix[y][x] == 4) {
                fill('purple')
            }
            else if (matrix[y][x] == 5) {
                fill('#1c4a0a')
            }
            rect(x * side, y * side, side, side)
        }
    }
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
    for(let i = 0; i<blackHoleArr.length; i++){
        blackHoleArr[i].mul()
    }
    for(let i = 0; i<blackHoleArr.length; i++){
       blackHoleArr[i].eat()
    }
    for (let i = 0; i < thickGrassArr.length; i++) {
        thickGrassArr[i].mul()
    }

}



