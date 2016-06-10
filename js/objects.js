var player = {

    width: 100,
    height: 20,
    color: 'blue',
    speed: 5,
    x: 50,
    y: 440,

    draw: function(ctx)
    {
        drawRect(ctx, this.x, this.y, this.width, this.height, this.color);
    },

    move: function()
    {
        function changeCoordinatesOnMouseMove(event)
        {
            var x = event.offsetX;
            player.x = x - player.width / 2;
        }

        document.getElementById('mouse_visibility_field').addEventListener('mousemove', changeCoordinatesOnMouseMove);

        if (isKeyDown('RIGHT'))
        {
            this.x += this.speed;
        }
        if (isKeyDown('LEFT'))
        {
            this.x -= this.speed;
        }

        if (this.x >= CANVAS_WIDTH - this.width)
        {
            this.x = CANVAS_WIDTH - this.width;
        }
        if (this.x <= 0)
        {
            this.x = 0;
        }
    }

};

var ball = {

    speed: 2,
    xVect: 1,
    yVect: -1,
    color: 'black',
    radius: 5,
    x: 0,
    y: 0,

    draw: function()
    {
        drawBall(ctx, this.x, this.y, this.radius, this.color);
    },

    init: function(x, y, radius, color)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    },

    move: function()
    {
        this.x += this.speed * this.xVect;
        this.y += this.speed * this.yVect;
    },

    collision: function()
    {
        squareLeft = this.x - this.radius;
        squareTop = this.y - this.radius;
        squareLength = 2 * this.radius;

        for (var identifier in grid.nodes)
        {
            var enemy = grid.nodes[identifier];

            if (isCollision(squareLeft, squareTop, squareLength, squareLength, enemy.x, enemy.y, enemy.width, enemy.height))
            {
                this.yVect *= - 1;
                grid.destroy(identifier);
            }

            if (isCollision(squareLeft, squareTop, squareLength, squareLength, player.x, player.y, player.width, player.height))
            {
                this.yVect = - 1;
            }

            if (this.x + this.radius >= CANVAS_WIDTH)
            {
                this.xVect = - 1;
            }

            if (this.x - this.radius <= 0)
            {
                this.xVect = 1;
            }
        }
    }

};