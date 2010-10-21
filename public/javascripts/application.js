window.onload = init;
document.onkeydown = onKeyDown;
document.onkeyup = onKeyUp;

var ctx;
var interval;

var WIDTH;
var HEIGHT;

var score = 0;
var x;
var y;
var speed = 3;
var accel = 1.02;
var rand = 0.15;
var angle;
var radius = 3;

var paddlex;
var paddleh = 3;
var paddlew = 75;
var paddlel = 10;
var paddles = 5;

var right = false;
var left = false;

var backColor = '#333333'
var ballColor = '#FF3333'
var paddColor = '#999999'
var textColor = '#30D5C8';

function init()
{
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    x = WIDTH / 2;
    y = HEIGHT / 2;
    paddlex = WIDTH / 2 - paddlew / 2;
    angle = Math.random() > 0.5 ? 3*Math.PI/7 : Math.PI - 3*Math.PI/7;

    interval = setInterval(draw, 10);
}

function drawScore()
{
    ctx.fillText(score,paddleh,HEIGHT-1);
}

function drawBall()
{
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, true);
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

function drawPaddle()
{
    rect(paddlex, HEIGHT-paddleh-paddlel, paddlew, paddleh);
}

function clear()
{
    rect(0, 0, WIDTH, HEIGHT);
}

function onKeyDown(e)
{
    if (window.event)
	keycode = window.event.keyCode;
    else if (e)
	keycode = e.which;

    if (keycode == 37) left = true;
    if (keycode == 39) right = true;
}

function onKeyUp(e)
{
    if (window.event)
	keycode = window.event.keyCode;
    else if (e)
	keycode = e.which;

    if (keycode == 37) left = false;
    if (keycode == 39) right = false;
}

function dx()
{
    return speed * Math.cos(angle);
}

function dy()
{
    return speed * Math.sin(angle);
}

function draw()
{
    ctx.fillStyle = backColor;
    clear();
    ctx.fillStyle = ballColor;
    drawBall();

    if (right && paddlex + paddlew < WIDTH - paddleh)
	paddlex += paddles;
    if (left && paddlex > paddleh)
	paddlex -= paddles;

    ctx.fillStyle = paddColor;
    drawPaddle();

    ctx.fillStyle = textColor;
    drawScore();

    if (y + dy() - radius < 0)
    {
	angle = -angle;
	speed *= accel;
	score += 1;
    }
    if (x + dx() + radius > WIDTH || x + dx() - radius< 0)
    {
	angle = Math.PI - angle;
	speed *= accel;
    }

    if (y + dy() + radius > HEIGHT - paddleh - paddlel &&
	y + dy() + radius <= HEIGHT - paddlel + dy() &&
	x > paddlex && x < paddlex + paddlew)
    {
	angle = -angle;
	a = Math.random()*Math.PI*rand;
	if (left) angle -= a;
	if (right) angle += a;
	speed *= accel;
    }
    if (y + dy() + radius > HEIGHT)
	gameOver();

    x += dx();
    y += dy();
}

function gameOver()
{
    clearInterval(interval);
    fs = ctx.fillStyle;
    ctx.fillStyle = textColor;
    ctx.fillText('GAME OVER',WIDTH/2-30,HEIGHT/2);
    ctx.fillStyle = fs;
    
    var r, url;
    //url = document.getElementById("regpass").value;
    if(window.XMLHttpRequest)
        r = new XMLHttpRequest();
    else
        r = new ActiveXObject("Microsoft.XMLHTTP");
    r.open("POST", "users/5/points/5", true);
    r.onreadystatechange = function() {
        if(r.readyState == 4)
            document.getElementById("authblock").innerHTML = r.responseText;
    }
    r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    r.send("points="+score);
}

