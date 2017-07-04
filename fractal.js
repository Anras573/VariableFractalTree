let slider = document.getElementById('slider');
let canvas = document.getElementById('canvas');
let angle = Number(slider.value) - 135;
let ctx = canvas.getContext('2d');

function setup() {
  slider.addEventListener('change', (event) => {
    angle = Number(slider.value) -135;
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

  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  branch(toX, toY, ctx, length, angle);

  ctx.stroke();
}

function branch(fromX, fromY, ctx, length, newAngle) {
  ctx.moveTo(fromX, fromY);
  let toX = length * Math.cos(newAngle * Math.PI / 180) + fromX;
  let toY = length * Math.sin(newAngle * Math.PI / 180) + fromY;
  ctx.lineTo(toX, toY);
  if(length > 4) {
    let newLength = length * 0.67;
    ctx.save();
    branch(toX, toY, ctx, newLength, newAngle + angle);
    ctx.restore();
    ctx.save();
    branch(toX, toY, ctx, newLength, newAngle - angle);
    ctx.restore();
  }
}

setup();
