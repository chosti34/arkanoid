function fillAll(ctx, color)
{
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

function clearAll(ctx)
{
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

function drawRect(ctx, x, y, width, height, color)
{
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
};

function drawCircleWithBorder(ctx, x, y, radius, fillColor, strokeColor)
{
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
};

function drawRectWithBorder(ctx, x, y, width, height, fillColor, strokeColor)
{
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
};

function drawPlatform(ctx)
{
    drawRectWithBorder(ctx, g_platform.x, g_platform.y, g_platform.width, g_platform.height, g_platform.fillColor, g_platform.strokeColor);
};

function drawBall(ctx)
{
    drawCircleWithBorder(ctx, g_ball.x, g_ball.y, g_ball.radius, g_ball.fillColor, g_ball.strokeColor);
};

function drawGrid(ctx)
{
    for (var enemy in g_grid.nodes)
    {
        drawRect(ctx, g_grid.nodes[enemy].x, g_grid.nodes[enemy].y, g_grid.nodes[enemy].width, g_grid.nodes[enemy].height, g_grid.nodes[enemy].color);
    }
};

function showGameOver(ctx)
{
    var stringToShow1 = 'Game Over';
    var stringToShow2 = 'Score: ' + g_score;

    clearAll(ctx);
    drawBackground(ctx);

    ctx.fillStyle = '#5d3954';
    ctx.font = '42px Broadway';

    var stringLength1 = ctx.measureText(stringToShow1).width;
    var stringLength2 = ctx.measureText(stringToShow2).width;

    ctx.fillText(stringToShow1, CANVAS_WIDTH / 2 - stringLength1 / 2 + 20, CANVAS_HEIGHT / 2);
    ctx.fillText(stringToShow2, CANVAS_WIDTH / 2 - stringLength2 / 2 + 20, CANVAS_HEIGHT / 2 + 50);
};

function drawBackground(ctx)
{
    g_image.src = 'img/background.jpg';
    ctx.drawImage(g_image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

function showScore(ctx)
{
    var stringOfScore = 'Score: ' + g_score;
    ctx.fillStyle = '#5d3954';
    ctx.font = '30px Arial';
    ctx.fillText(stringOfScore, CANVAS_WIDTH - 160, CANVAS_HEIGHT / 2);
};