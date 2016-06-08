var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var CANVAS_WIDTH = canvas.width;
var CANVAS_HEIGHT = canvas.height;

var fillAll = function(color)
{
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

var clearAll = function()
{
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

var drawRect = function(x, y, w, h, color)
{
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}