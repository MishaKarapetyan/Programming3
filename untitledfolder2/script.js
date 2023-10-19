
let side = 10;
let sideX = 50;
let sideY = 50;
let socket = io();


function setup() {
    createCanvas(sideX * side, sideY * side)
    background(43)
}

function drawful(matrix) {
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

}
socket.emit('update matrix',drawful)



