function Ball()
{
    this.radius = 5;
    this.speedX = 0;
    this.speedY = -7;
}

Ball.prototype.initialize = function(x, y, fillColor, strokeColor)
{
    this.x = x;
    this.y = y;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;

    this.xVect = this.speedX;
    this.yVect = this.speedY;
};

Ball.prototype.move = function()
{
    this.x += this.xVect;
    this.y += this.yVect;
};