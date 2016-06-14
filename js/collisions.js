function collision(x1, y1, w1, h1, x2, y2, w2, h2)
{
    return (x1 < x2 + w2) && (x1 + w1 > x2) && (y1 < y2 + h2) && (h1 + y1 > y2);
};

function checkCollisions()
{
    ballTop = g_ball.y - g_ball.radius;
    ballRight = g_ball.x + g_ball.radius;
    ballLeft = g_ball.x - g_ball.radius;
    ballBottom = g_ball.y + g_ball.radius;
    ballDiametr = 2 * g_ball.radius;

    // Столкновение с кирпичиками
    for (var identifier in g_grid.nodes)
    {
        var enemy = g_grid.nodes[identifier];
        if (collision(ballLeft, ballTop, ballDiametr, ballDiametr, enemy.x, enemy.y, enemy.width, enemy.height))
        {
            g_ball.yVect = - g_ball.yVect;
            g_grid.destroy(identifier);
            g_score++;
        }
    }
    if (g_grid.nodes.length == 0)
    {
        g_gameContinue = false;
    }

    // Столкновение с боковой стенкой игрового поля
    if ((ballRight >= CANVAS_WIDTH) || (ballLeft <= 0))
    {
        g_ball.xVect = - g_ball.xVect;
    }

    // Столкновение с верхней стенкой игрового поля
    if (ballTop <= 0)
    {
        g_ball.yVect = - g_ball.yVect;
    }

    // Столкновение с платформой
    if (collision(ballLeft, ballTop, ballDiametr, ballDiametr, g_platform.x, g_platform.y, g_platform.width, g_platform.height))
    {
        g_ball.yVect = - g_ball.yVect;
        g_ball.xVect = 10 * (g_ball.x - (g_platform.x + g_platform.width / 2)) / g_platform.width;
    }
    else if (ballBottom >= CANVAS_HEIGHT)
    {
        g_gameContinue = false;
    }
};