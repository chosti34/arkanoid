function Grid()
{
    this.nodes = [];
}

Grid.prototype.add = function(x, y, width, height, color)
{
    var temp = new Brick(x, y, width, height, color);
    this.nodes.push(temp);
}

Grid.prototype.initialize = function(amount, width, height, color)
{
    var blankDistance = 5;
    var xAxisCoordinate = Math.ceil(CANVAS_WIDTH / (width + blankDistance)) - 1;
    var yAxisCoordinate = Math.ceil(amount / xAxisCoordinate);
    var edgeDistance = Math.ceil((CANVAS_WIDTH - (width + blankDistance) * xAxisCoordinate) / 2);
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
            this.add(differenceX, differenceY, width, height, color);
            differenceX += width + blankDistance;
        }
        differenceX = blankDistance;
        differenceY += height + blankDistance;
    }
}

Grid.prototype.destroy = function(identifier)
{
    this.nodes.splice(identifier, 1);
}