function Graphics(ctx, fieldWidth, fieldHeight, image)
{
    this.ctx = ctx;
    this.fieldWidth = fieldWidth;
    this.fieldHeight = fieldHeight;
    this.image = image;
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

Graphics.prototype.drawBackground = function()
{
    this.ctx.drawImage(this.image, 0, 0, this.fieldWidth, this.fieldHeight);
};

Graphics.prototype.printString = function(str, font, fillStyleOfStr, x, y)
{
    this.ctx.font = font;
    this.ctx.fillStyle = fillStyleOfStr;
    this.ctx.fillText(str, x, y);
};

Graphics.prototype.getStringLength = function(str)
{
    return this.ctx.measureText(str).width;
};