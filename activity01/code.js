// Constants
const NUM_LINES = 10
const HEIGHT = 50
const WIDTH = 5
const BASE_COLOR = 'grey'
const SELECTED_COLOR = 'black'

// Get canvas element and context
const canvas = document.getElementById('canvas')
canvas.width = WIDTH*NUM_LINES*2
canvas.height = HEIGHT
const ctx = canvas.getContext('2d')

// Function to draw a rectangle
function createRectangle(x, y, w, h, color) {
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.fillRect(x, y, w, h)
  ctx.closePath()
}

// Draw N lines every 0.1s giving them a special color one at a time
let index = 0
var tmp = setInterval(() => {
  index = (index + 1) % NUM_LINES
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < NUM_LINES; i++) {
    const COLOR = index == i ? SELECTED_COLOR : BASE_COLOR
    createRectangle(WIDTH * i * 2, WIDTH, WIDTH, HEIGHT, COLOR)
  }
}, 100)