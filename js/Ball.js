function Ball()
{
    this.radius = 5;
}

Ball.prototype.initialize = function(x, y, fillColor, strokeColor)
{
    this.x = x;
    this.y = y;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;

    this.xVect = 0;
    this.yVect = -7;
};

Ball.prototype.move = function()
{
    this.x += this.xVect;
    this.y += this.yVect;
};