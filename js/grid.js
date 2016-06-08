var _Enemy = function(x, y, w, h, color)
{
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = color;
}

_Enemy.prototype.draw = function()
{
    drawRect(this.x, this.y, this.width, this.height, this.color);
}

var grid = {
    nodes: [],

    add: function(x, y, w, h, color)
    {
        var temp = new _Enemy(x, y, w, h, color);
        this.nodes.push(temp);
    },

    generate: function(count, w, h, color)
    {
        var dw = 5;
        var dx = dw;
        var xAxisNumber = Math.ceil(CANVAS_WIDTH / (w + dw)) - 1;
        var yAxisNumber = Math.ceil(count / xAxisNumber);
        var dWidth = Math.ceil((CANVAS_WIDTH - (w + dw) * xAxisNumber) / 2)
        var dy = dWidth;

        for (var i = 0; i < yAxisNumber; i++)
        {
            for (var j = 0; j < xAxisNumber; j++)
            {
                if (j == 0)
                {
                    dx += Math.ceil(dWidth - dw / 2);
                }
                this.add(dx, dy, w, h, color);
                dx += w + dw;
            }
            dy += h + dw;
            dx = dw;
        }
    },

    destroy: function(index)
    {
        
    },

    draw: function()
    {
        for (enemy in this.nodes)
        {
            this.nodes[enemy].draw();
        }
    }
};

grid.generate(100, 60, 20, 'red');