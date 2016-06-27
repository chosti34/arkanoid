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

Graphics.prototype.drawRectWithBorder = function(x, y, width, height, fillColor, strokeColor)
{
    var grad = this.ctx.createLinearGradient(x, y, x + 50, y + 200);

    grad.addColorStop(0, fillColor);
    grad.addColorStop(1, strokeColor);

    this.ctx.fillStyle = grad;
    this.ctx.strokeStyle = strokeColor;

    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
};

Graphics.prototype.printString = function(str, font, fillStyleOfStr, x, y)
{
    this.ctx.font = font;
    this.ctx.fillStyle = fillStyleOfStr;
    this.ctx.fillText(str, x, y);
};