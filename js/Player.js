function Player(x, y, width, height, color)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
}

Player.prototype.init = function(x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Player.prototype.draw = function(ctx)
{
    drawRect(ctx, this.x, this.y, this.width, this.height, this.color);
}

Player.prototype.moveControl = function()
{
    if (this.x >= CANVAS_WIDTH - this.width)
    {
        this.x = CANVAS_WIDTH - this.width;
    }
    if (this.x <= 0)
    {
        this.x = 0;
    }
}