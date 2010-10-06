window.onload = init;
document.onkeydown = gameover;

var score = 0;
var ctx;
var interval;

function init()
{
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    interval = setInterval(drawScore, 1000);
}

function draw(s)
{
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.rect(0,0,400,300);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#30D5C8';
    ctx.fillText(s,170,150);
}

function drawScore()
{
    draw(score);
    score += 1;
}

function gameover()
{
    clearInterval(interval);
    draw('GAME OVER');
}

