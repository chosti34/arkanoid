function Player(x, y, width, height, fillColor, strokeColor)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
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
    drawRect(ctx, this.x, this.y, this.width, this.height, this.fillColor);
    ctx.strokeStyle = this.strokeColor;
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height)
    ctx.closePath();
    ctx.stroke();
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