function Graphics(ctx)
{
    this.ctx = ctx;
}

Graphics.prototype.fillAll = function(color)
{
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

Graphics.prototype.clearAll = function()
{
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

Graphics.prototype.drawRect = function(x, y, width, height, color)
{
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
}

Graphics.prototype.drawCircleWithBorder = function(x, y, radius, fillColor, strokeColor)
{
    this.ctx.fillStyle = fillColor;
    this.ctx.strokeStyle = strokeColor;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
}

Graphics.prototype.drawRectWithBorder = function(x, y, width, height, fillColor, strokeColor)
{
    this.ctx.fillStyle = fillColor;
    this.ctx.strokeStyle = strokeColor;
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
}

Graphics.prototype.drawPlatform = function()
{
    this.drawRectWithBorder(g_platform.x, g_platform.y, g_platform.width, g_platform.height, g_platform.fillColor, g_platform.strokeColor);
}

Graphics.prototype.drawBall = function()
{
    this.drawCircleWithBorder(g_ball.x, g_ball.y, g_ball.radius, g_ball.fillColor, g_ball.strokeColor);
}

Graphics.prototype.drawGrid = function()
{
    for (var enemy in g_grid.nodes)
    {
        this.drawRect(g_grid.nodes[enemy].x, g_grid.nodes[enemy].y, g_grid.nodes[enemy].width, g_grid.nodes[enemy].height, g_grid.nodes[enemy].color);
    }
}

Graphics.prototype.showGameOver = function()
{
    var stringToShow1 = 'Game Over';
    var stringToShow2 = 'Score: ' + g_score;

    this.clearAll();
    this.drawBackground();

    this.ctx.fillStyle = '#5d3954';
    this.ctx.font = '42px Broadway';

    var stringLength1 = this.ctx.measureText(stringToShow1).width;
    var stringLength2 = this.ctx.measureText(stringToShow2).width;

    this.ctx.fillText(stringToShow1, CANVAS_WIDTH / 2 - stringLength1 / 2 + 20, CANVAS_HEIGHT / 2);
    this.ctx.fillText(stringToShow2, CANVAS_WIDTH / 2 - stringLength2 / 2 + 20, CANVAS_HEIGHT / 2 + 50);
}

Graphics.prototype.drawBackground = function()
{
    g_image.src = 'img/background.jpg';
    this.ctx.drawImage(g_image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

Graphics.prototype.showScore = function()
{
    var stringOfScore = 'Score: ' + g_score;
    this.ctx.fillStyle = '#5d3954';
    this.ctx.font = '30px Arial';
    this.ctx.fillText(stringOfScore, CANVAS_WIDTH - 160, CANVAS_HEIGHT / 2);
}