var Brick = function(x, y, width, height, color)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
};

Brick.prototype.draw = function(ctx)
{
    drawRect(ctx, this.x, this.y, this.width, this.height, this.color);
};