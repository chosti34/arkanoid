function isCollision(x1, y1, w1, h1, x2, y2, w2, h2)
{
    return (x1 < x2 + w2) && (x1 + w1 > x2) && (y1 < y2 + h2) && (h1 + y1 > y2);
};

function collision()
{
    squareLeft = ball.x - ball.radius;
    squareTop = ball.y - ball.radius;
    squareLength = 2 * ball.radius;

    for (var identifier in grid.nodes)
    {
        var enemy = grid.nodes[identifier];

        if (isCollision(squareLeft, squareTop, squareLength, squareLength, enemy.x, enemy.y, enemy.width, enemy.height))
        {
            ball.yVect *= - 1;
            grid.destroy(identifier);
        }

        if (isCollision(squareLeft, squareTop, squareLength, squareLength, player.x, player.y, player.width, player.height))
        {
             ball.yVect = - 1;
        }

        if (ball.x + ball.radius >= CANVAS_WIDTH)
        {
            ball.xVect = - 1;
        }

        if (ball.x - ball.radius <= 0)
        {
            ball.xVect = 1;
        }
    }
}