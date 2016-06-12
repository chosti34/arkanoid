function fillAll(g_ctx, color)
{
    this.g_ctx.fillStyle = color;
    this.g_ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

function clearAll(g_ctx)
{
    this.g_ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

function drawRect(g_ctx, x, y, width, height, color)
{
    this.g_ctx.fillStyle = color;
    this.g_ctx.fillRect(x, y, width, height);
};

function drawBall(g_ctx, x, y, radius, fillColor, strokeColor)
{
    this.g_ctx.fillStyle = fillColor;
    this.g_ctx.strokeStyle = strokeColor;
    this.g_ctx.beginPath();
    this.g_ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.g_ctx.closePath();
    this.g_ctx.fill();
    this.g_ctx.stroke();
};