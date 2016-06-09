var EnemyBlock = function(x, y, width, height, color)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
};

EnemyBlock.prototype.draw = function(ctx)
{
    drawRect(ctx, this.x, this.y, this.width, this.height, this.color);
};

var grid = {
    nodes: [],
    
    add: function(x, y, width, height, color)
    {
        var temp = new EnemyBlock(x, y, width, height, color);
        this.nodes.push(temp);
    },
    
    generate: function(amount, width, height, color)
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
    },

    draw: function(ctx)
    {
        for (var enemy in this.nodes)
        {
            this.nodes[enemy].draw(ctx);
        }
    }
};

grid.generate(20, 60, 20, 'red');