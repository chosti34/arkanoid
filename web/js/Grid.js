function Grid(fieldWidth, fieldHeight)
{
    this.nodes = [];

    this.fieldWidth = fieldWidth;
    this.fieldHeight = fieldHeight;
}

Grid.prototype.add = function(x, y, width, height, fillColor, strokeColor)
{
    var temp = new Brick(x, y, width, height, fillColor, strokeColor);
    this.nodes.push(temp);
};

Grid.prototype.initialize = function(amount, width, height, fillColor, strokeColor)
{
    var blankDistance = 5;
    var xAxisCoordinate = Math.ceil(this.fieldWidth / (width + blankDistance)) - 1;
    var yAxisCoordinate = Math.ceil(amount / xAxisCoordinate);
    var edgeDistance = Math.ceil((this.fieldWidth - (width + blankDistance) * xAxisCoordinate) / 2);
    var differenceX = blankDistance;
    var differenceY = edgeDistance;

    for (var i = 0; i < yAxisCoordinate; i++)
    {
        for (var j = 0; j < xAxisCoordinate; j++)
        {
            if (j == 0)
            {
                differenceX += Math.ceil(edgeDistance - blankDistance / 2);
            }
            this.add(differenceX, differenceY, width, height, fillColor, strokeColor);
            differenceX += width + blankDistance;
        }
        differenceX = blankDistance;
        differenceY += height + blankDistance;
    }
};

Grid.prototype.destroy = function(identifier)
{
    this.nodes.splice(identifier, 1);
};