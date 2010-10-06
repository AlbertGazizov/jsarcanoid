window.onload = init;
window.onkeydown = gameOver;

var score = 0;
var ctx;
var interval;

var x = 150;
var y = 150;
var dx = 2;
var dy = 4;
var WIDTH;
var HEIGHT;
var textColor = '#30D5C8';

function init()
{
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    WIDTH = canvas.width;
    HEIGHT = canvas.height;

    interval = setInterval(draw, 10);
}

function circle(x,y,r)
{
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

function rect(x,y,w,h)
{
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
}

function clear()
{
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function drawScore()
{
    fs = ctx.fillStyle;
    ctx.fillStyle = textColor;
    ctx.fillText(score,0,HEIGHT);
    ctx.fillStyle = fs;
}

function draw()
{
    clear();
    drawScore();
    circle(x, y, 10);

    if (x + dx > WIDTH || x + dx < 0)
    {
	score += 1;
	dx = -dx;
    }
    if (y + dy > HEIGHT || y + dy < 0)
    {
	score += 1;
	dy = -dy;
    }

    x += dx;
    y += dy;
}

function gameOver()
{
    draw();
    clearInterval(interval);
    fs = ctx.fillStyle;
    ctx.fillStyle = textColor;
    ctx.fillText('GAME OVER',WIDTH/2-30,HEIGHT/2);
    ctx.fillStyle = fs;
}

