function Graphics(ctx, fieldWidth, fieldHeight)
{
    this.ctx = ctx;
    this.fieldWidth = fieldWidth;
    this.fieldHeight = fieldHeight;
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

Graphics.prototype.drawRectWithBorderAndGradient = function(x, y, width, height, fillColor, strokeColor)
{
    this.addGradient(x, y, x + 50, y + 200, fillColor, strokeColor);

    this.ctx.fillStyle = this.grad;
    this.ctx.strokeStyle = strokeColor;

    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
};

Graphics.prototype.addGradient = function(x1, y1, x2, y2, color1, color2)
{
    this.grad = this.ctx.createLinearGradient(x1, y1, x2, y2);

    this.grad.addColorStop(0, color1);
    this.grad.addColorStop(1, color2);
};

Graphics.prototype.printString = function(str, font, fillStyleOfStr, x, y)
{
    this.ctx.font = font;
    this.ctx.fillStyle = fillStyleOfStr;
    this.ctx.fillText(str, x, y);
};