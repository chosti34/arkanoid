function Ball(x, y, radius, xVect, yVect, fillColor, strokeColor)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xVect = xVect;
    this.yVect = yVect;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
};

Ball.prototype.init = function(x, y, radius)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
};

Ball.prototype.draw = function(ctx)
{
    drawBall(ctx, this.x, this.y, this.radius, this.fillColor, this.strokeColor);
};

Ball.prototype.move = function()
{
    this.x += this.xVect;
    this.y += this.yVect;
};