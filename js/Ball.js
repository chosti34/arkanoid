function Ball(x, y, radius, speed, xVect, yVect, color)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.xVect = xVect;
    this.yVect = yVect;
    this.color = color;
}

Ball.prototype.init = function(x, y, radius)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
}

Ball.prototype.draw = function(ctx)
{
    drawBall(ctx, this.x, this.y, this.radius, this.color);
}

Ball.prototype.move = function()
{
    this.x += this.speed * this.xVect;
    this.y += this.speed * this.yVect;
}