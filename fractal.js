let slider = document.getElementById('slider');
let canvas = document.getElementById('canvas');
let angle = Number(slider.value);
let ctx = canvas.getContext('2d');

function setup() {
  slider.addEventListener('input', (event) => {
    angle = Number(slider.value);
    render();
  });

  render();
}

function render() {
  let width = canvas.width;
  let height = canvas.height;

  ctx.moveTo(width, height);
  ctx.clearRect(0, 0, width, height);

  ctx.beginPath();
  ctx.fillStyle = 'grey';
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = 'white';

  let length = 150
  let fromX = width / 2;
  let fromY = height;
  let toX = width / 2;
  let toY = height - length;

  drawLine(fromX, fromY, toX, toY);
  branch(toX, toY, ctx, length, -angle);
  branch(toX, toY, ctx, length, angle + 180);

  ctx.stroke();
}

function branch(fromX, fromY, ctx, length, newAngle) {
  let toX = length * Math.cos(newAngle * Math.PI / 180) + fromX;
  let toY = length * Math.sin(newAngle * Math.PI / 180) + fromY;
  if(length > 4) {
    drawLine(fromX, fromY, toX, toY);
    let newLength = length * 0.67;
    branch(toX, toY, ctx, newLength, newAngle + angle);
    branch(toX, toY, ctx, newLength, newAngle - angle);
  }
}

function drawLine(fromX, fromY, toX, toY) {
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
}

setup();
