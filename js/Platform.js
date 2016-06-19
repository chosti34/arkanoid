function Platform()
{
    this.width = 140;
    this.height = 10;
}

Platform.prototype.initialize = function(x, y, fillColor, strokeColor)
{
    this.x = x;
    this.y = y;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
};

Platform.prototype.checkScopes = function()
{
    if (this.x >= g_game.fieldWidth - this.width)
    {
        this.x = g_game.fieldWidth - this.width;
    }
    else if (this.x <= 0)
    {
        this.x = 0;
    }
};