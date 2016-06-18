function Graphics(ctx)
{
    this.ctx = ctx;
    this.image = new Image();
}

Graphics.prototype.fillAll = function(color)
{
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, game.fieldWidth, game.fieldHeight);
};

Graphics.prototype.clearAll = function()
{
    this.ctx.clearRect(0, 0, game.fieldWidth, game.fieldHeight);
};

Graphics.prototype.drawRect = function(x, y, width, height, color)
{
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
};

Graphics.prototype.drawCircleWithBorder = function(x, y, radius, fillColor, strokeColor)
{
    this.ctx.fillStyle = fillColor;
    this.ctx.strokeStyle = strokeColor;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
};

Graphics.prototype.drawRectWithBorder = function(x, y, width, height, fillColor, strokeColor)
{
    this.ctx.fillStyle = fillColor;
    this.ctx.strokeStyle = strokeColor;
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
};

Graphics.prototype.drawPlatform = function()
{
    this.drawRectWithBorder(game.platform.x, game.platform.y, game.platform.width, game.platform.height, game.platform.fillColor, game.platform.strokeColor);
};

Graphics.prototype.drawBall = function()
{
    this.drawCircleWithBorder(game.ball.x, game.ball.y, game.ball.radius, game.ball.fillColor, game.ball.strokeColor);
};

Graphics.prototype.drawGrid = function()
{
    for (var enemy in game.grid.nodes)
    {
        this.drawRect(game.grid.nodes[enemy].x, game.grid.nodes[enemy].y, game.grid.nodes[enemy].width, game.grid.nodes[enemy].height, game.grid.nodes[enemy].color);
    }
};

Graphics.prototype.drawBackground = function()
{
    this.image.src = 'img/background.jpg';
    this.ctx.drawImage(this.image, 0, 0, game.fieldWidth, game.fieldHeight);
};

Graphics.prototype.showScore = function()
{
    var stringOfScore = 'Score: ' + game.score;
    this.ctx.font = '24px Arial';
    this.ctx.fillStyle = '#5d3954';
    this.ctx.fillText(stringOfScore, game.fieldWidth - 150, game.fieldHeight / 2);
};

Graphics.prototype.showGameEnd = function(isWin)
{
    var stringToShow1, stringToShow2;
    var stringLength1, stringLength2;

    this.clearAll();
    this.drawBackground();

    this.ctx.fillStyle = '#5d3954';
    this.ctx.font = '42px Broadway';

    if (isWin)
    {
        stringToShow1 = 'Congratulations!';
        stringLength1 = this.ctx.measureText(stringToShow1).width;

        this.ctx.fillText(stringToShow1, game.fieldWidth / 2 - stringLength1 / 2 + 20, game.fieldHeight / 2);
    }
    else
    {
        stringToShow1 = 'Game Over';
        stringToShow2 = 'Score: ' + game.score;
        stringLength1 = this.ctx.measureText(stringToShow1).width;
        stringLength2 = this.ctx.measureText(stringToShow2).width;

        this.ctx.fillText(stringToShow1, game.fieldWidth / 2 - stringLength1 / 2 + 20, game.fieldHeight / 2 - 50);
        this.ctx.fillText(stringToShow2, game.fieldWidth / 2 - stringLength2 / 2 + 20, game.fieldHeight / 2);
    }
};