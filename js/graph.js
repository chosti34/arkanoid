var fillAll = function(ctx, color)
{
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

var clearAll = function(ctx)
{
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

var drawRect = function(ctx, x, y, width, height, color)
{
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
};

var drawBall = function(ctx, x, y, radius, color)
{
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
};

var isCollision = function(x1, y1, w1, h1, x2, y2, w2, h2)
{
    return ((x1 < x2 + w2) && (x1 + w1 > x2) && (y1 < y2 + h2) && (h1 + y1 > y2));
};