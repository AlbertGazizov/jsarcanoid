window.onload = init;
document.onkeydown = onKeyDown;
document.onkeyup = onKeyUp;

var ctx;
var interval;

var WIDTH;
var HEIGHT;

var score;
var x;
var y;
var speed;
var accel = 0.06;
var frict = 0.07;
var paddlecurv = 0.7;
var angle;
var radius = 3;

var paddlex;
var paddleh = 3;
var paddlew = 75;
var paddlel = 14;
var paddles = 5;

var right = false;
var left = false;

var backColor = '#333333'
var ballColor = '#FF3333'
var paddColor = '#999999'
var textColor = '#A7B1B7';

function init()
{
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.textAlign = 'left';
    ctx.font = "bold 15px sans-serif";
    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    x = WIDTH / 2;
    y = HEIGHT / 2;
    paddlex = WIDTH / 2 - paddlew / 2;
    angle = Math.random() > 0.5 ? 3*Math.PI/7 : Math.PI - 3*Math.PI/7;
    score = 0;
    speed = 3;

    interval = setInterval(draw, 10);
}

function drawScore()
{
    ctx.fillText(score,paddleh,HEIGHT-2);
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
    if (keycode == 78)
    {
	clearInterval(interval);
	init();
    }
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
	speed += accel;
	score += 1;
    }
    if (x + dx() + radius > WIDTH || x + dx() - radius< 0)
    {
	angle = Math.PI - angle;
    }

    if (y + dy() + radius > HEIGHT - paddleh - paddlel &&
	y + dy() + radius <= HEIGHT - paddlel + dy() &&
	x > paddlex && x < paddlex + paddlew)
    {
	angle = -angle;
	if (left) angle -= Math.PI*frict;
	if (right) angle += Math.PI*frict;
	angle += paddlecurv*((x-(paddlex+paddlew/2))/paddlew);
	speed += accel;
    }
    if (y + dy() + radius > HEIGHT)
	gameOver();

    x += dx();
    y += dy();
}

function gameOver()
{
    clearInterval(interval);
    // fs = ctx.fillStyle;
    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.fillText('Game over. To start a new game, press N.',WIDTH/2,HEIGHT/2);
    // ctx.fillStyle = fs;

    var r, user_id;
    user_id = document.getElementById("user_id").innerHTML;
    if(window.XMLHttpRequest)
        r = new XMLHttpRequest();
    else
        r = new ActiveXObject("Microsoft.XMLHTTP");

    r.open("POST", "/users/"+user_id+"/update_points/", true);
    r.onreadystatechange = function() {
        if(r.readyState == 4)
            document.getElementById("authblock").innerHTML = r.responseText;
    }
    r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    r.send("points="+score);
}

