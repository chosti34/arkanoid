function Graphics(ctx, fieldWidth, fieldHeight)
{
    this.ctx = ctx;
    this.fieldWidth = fieldWidth;
    this.fieldHeight = fieldHeight;
    this.image = new Image();
}

Graphics.prototype.fillAll = function(color)
{
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.fieldWidth, this.fieldHeight);
};

Graphics.prototype.clearAll = function()
{
    this.ctx.clearRect(0, 0, this.fieldWidth, this.fieldHeight);
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
    this.drawRectWithBorder(g_game.platform.x, g_game.platform.y, g_game.platform.width, g_game.platform.height, g_game.platform.fillColor, g_game.platform.strokeColor);
};

Graphics.prototype.drawBall = function()
{
    this.drawCircleWithBorder(g_game.ball.x, g_game.ball.y, g_game.ball.radius, g_game.ball.fillColor, g_game.ball.strokeColor);
};

Graphics.prototype.drawGrid = function()
{
    for (var enemy in g_game.grid.nodes)
    {
        this.drawRect(g_game.grid.nodes[enemy].x, g_game.grid.nodes[enemy].y, g_game.grid.nodes[enemy].width, g_game.grid.nodes[enemy].height, g_game.grid.nodes[enemy].color);
    }
};

Graphics.prototype.drawBackground = function()
{
    this.image.src = 'img/background.jpg';
    this.ctx.drawImage(this.image, 0, 0, this.fieldWidth, this.fieldHeight);
};

Graphics.prototype.showScore = function()
{
    var stringOfScore = 'Score: ' + g_game.score;
    this.ctx.font = '24px Arial';
    this.ctx.fillStyle = '#5d3954';
    this.ctx.fillText(stringOfScore, this.fieldWidth - 150, this.fieldHeight / 2 + 30);
};

Graphics.prototype.showPlayerName = function()
{
    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = '#5d3954';
    this.ctx.fillText('Player: ' + g_player.value, this.fieldWidth - 150, this.fieldHeight / 2);
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

        this.ctx.fillText(stringToShow1, this.fieldWidth / 2 - stringLength1 / 2 + 20, this.fieldHeight / 2);
    }
    else
    {
        stringToShow1 = 'Game Over';
        stringToShow2 = 'Score: ' + g_game.score;
        stringLength1 = this.ctx.measureText(stringToShow1).width;
        stringLength2 = this.ctx.measureText(stringToShow2).width;

        this.ctx.fillText(stringToShow1, this.fieldWidth / 2 - stringLength1 / 2 + 20, this.fieldHeight / 2 - 50);
        this.ctx.fillText(stringToShow2, this.fieldWidth / 2 - stringLength2 / 2 + 20, this.fieldHeight / 2);
    }
};