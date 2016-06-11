function fillAll(ctx, color)
{
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

function clearAll(ctx)
{
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

function drawRect(ctx, x, y, width, height, color)
{
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
};

function drawBall(ctx, x, y, radius, color)
{
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.ctx.closePath();
    this.ctx.fill();
};