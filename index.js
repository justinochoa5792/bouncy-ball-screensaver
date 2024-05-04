let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let balls = [];
let ballCount = 50;

const options = {
  width: window.innerWidth,
  height: window.innerHeight,
};

function setUp() {
  canvas.width = options.width;
  canvas.height = options.height;

  for (let i = 0; i <= ballCount; i++) {
    let randomSize = randomInt(20, 100);
    let randomVX = randomFloat(-1, 1);
    let randomVY = randomFloat(-1, 1);
    let randomColor = `rgb(${randomInt(0, 255)},${randomInt(
      0,
      255
    )},${randomInt(0, 255)})`;
    let randomX = randomFloat(
      0 + randomSize / 2,
      options.width - randomSize / 2
    );
    let randomY = randomFloat(
      0 + randomSize / 2,
      options.height - randomSize / 2
    );

    balls.push(
      new Ball(randomX, randomY, randomSize, randomVX, randomVY, randomColor)
    );
  }

  requestAnimationFrame(loop);
}

function randomInt(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloat(max, min) {
  return Math.random() * (max - min + 1) + min;
}

function update() {
  for (let ball of balls) {
    ball.update();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let ball of balls) {
    ball.draw(ctx);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

// Events
window.addEventListener("load", setUp);

//Class
class Ball {
  constructor(x, y, size, vx, vy, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.vx = vx;
    this.vy = vy;
    this.radius = size / 2;
  }
  update() {
    if (this.x - this.radius < 0 || this.x + this.radius > options.width) {
      this.vx *= -1;
    }

    if (this.y - this.radius < 0 || this.y + this.radius > options.height) {
      this.vy *= -1;
    }
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(_ctx) {
    _ctx.beginPath();
    _ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    _ctx.closePath();
    _ctx.fillStyle = this.color;
    _ctx.fill();
  }
}
