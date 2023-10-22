
let socket = io();
var summer = document.getElementById('p1')
var winter = document.getElementById('p2')
const SIDE = 10;

function setup() {
    socket.on('draw', ({matrix, season}) => {
        const WIDTH = matrix[0].length;
        const HEIGHT = matrix.length;
        createCanvas(WIDTH * SIDE, HEIGHT * SIDE);
        background(43)

        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                switch (matrix[y][x]) {
                    case 0:
                        fill(43);
                        break;
                    case 1:
                        fill("green");
                        break;
                    case 2:
                        fill("yellow");
                        break;
                    case 3:
                        fill("red");
                        break;
                    case 4:
                        fill("purple");
                        break;
                    case 5:
                        fill(season === "winter" ? "white" : "#1c4a0a");
                        break;
                }

                rect(x * SIDE, y * SIDE, SIDE, SIDE);
            }
        }

    })
}

function changeWeather(weather) {
    return function () {
        socket.emit('event-weather', { weather })
        console.log('event-weather', { weather })
    }
}

summer.addEventListener('click', changeWeather("summer"))
winter.addEventListener('click', changeWeather("winter"))







