
const canvas = document.getElementById('canvas')
canvas.height = window.innerHeight
canvas.width = window.innerWidth
const ctx = canvas.getContext('2d')

export function Circle(x, y, size, vx, vy, color) {
  this.x = x
  this.y = y
  this.size = size
  this.vx = vx
  this.vy = vy
  this.randomColor = function () {
    const R = Math.floor(Math.random() * 200) + 55
    const G = Math.floor(Math.random() * 200) + 55
    const B = Math.floor(Math.random() * 200) + 55
    this.color = `rgb(${R}, ${G}, ${B})`
    return this.color
  }
  this.color = color ? color : this.randomColor()
  this.intersects = function (that) {
    const x1 = this.x
    const y1 = this.y
    const r1 = this.size
    const x2 = that.x
    const y2 = that.y
    const r2 = that.size

    const xNotIntersects = x2 > r1 + x1 || x1 > r2 + x2
    const yNotIntersects = y2 > r1 + y1 || y1 > r2 + y2

    return !(xNotIntersects || yNotIntersects)
  }
  this.draw = function () {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true)
    ctx.fill()
  }
}
export function animate(arr) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (const circle of arr) {
    for (const c of arr) {
      if (circle !== c && circle.intersects(c)) {
        circle.vx *= -1
        circle.vy *= -1
        c.vx *= -1
        c.vy *= -1

        circle.randomColor()
      }
    }
    circle.draw()
    circle.x += circle.vx
    circle.y += circle.vy

    const bottom = (canvas.height - circle.size) 
    const top = circle.size
    const right = (canvas.width - circle.size) 
    const left = top

    const bottomOverflows = circle.y > bottom
    const topOverflows = circle.y < top
    const yOverflows = topOverflows || bottomOverflows

    const rightOverflows = circle.x > right
    const leftOVerflows = circle.x < left
    const xOverflows = rightOverflows || leftOVerflows

    if (yOverflows) {
      circle.y = bottomOverflows ? bottom : top
      circle.vy *= -1
    }
    if (xOverflows) {
      circle.x = rightOverflows ? right : left
      circle.vx *= -1
    }

  }
  requestAnimationFrame(() => { animate(arr) })
}