var g_ctx, g_ball, g_platform, g_grid, g_gameContinue, CANVAS_WIDTH, CANVAS_HEIGHT;
var g_image = new Image();
var g_score = 0;

window.onload = initialize;

function initialize()
{
    var canvas = document.getElementById('canvas');
    g_ctx = canvas.getContext('2d');

    CANVAS_WIDTH = canvas.width;
    CANVAS_HEIGHT = canvas.height;

    g_platform = new Platform(50, 440, 100, 20, '#1e90ff', 'red');
    g_ball = new Ball(30, 40, 5, 3, -10, 'blue', '#1e90ff');
    g_grid = new Grid();

    g_platform.init(50, CANVAS_HEIGHT - 30, 140, 10);
    g_ball.init(g_platform.x + Math.ceil(g_platform.width / 2), g_platform.y - 10, 5);
    g_grid.generate(60, 60, 20, '#1ca9c9');

    g_gameContinue = true;
    gameLoop();
};

function gameLoop()
{
    if (g_gameContinue)
    {
        clearAll(g_ctx);
        drawBackground(g_ctx);
        showScore(g_ctx);
        // Задание координат
        checkCollisions();
        g_ball.move();
        g_platform.moveControl();
        // Отрисовка
        g_grid.draw(g_ctx);
        g_ball.draw(g_ctx);
        g_platform.draw(g_ctx);
        // Игровой цикл
        window.requestAnimationFrame(gameLoop);
    }
    else
    {
        gameOver();
    }
};

function changeCoordinatesOnMouseMove(event)
{
    var x = event.offsetX;
    g_platform.x = x - g_platform.width / 2;
};

document.getElementById('mouseVisibilityField').addEventListener('mousemove', changeCoordinatesOnMouseMove);

function gameOver()
{
    var stringToShow1 = 'Game Over';
    var stringToShow2 = 'Score: ' + g_score;

    clearAll(g_ctx);
    drawBackground(g_ctx);

    g_ctx.fillStyle = '#5d3954';
    g_ctx.font = '42px Broadway';

    var stringLength1 = g_ctx.measureText(stringToShow1).width;
    var stringLength2 = g_ctx.measureText(stringToShow2).width;

    g_ctx.fillText(stringToShow1, CANVAS_WIDTH / 2 - stringLength1 / 2 + 20, CANVAS_HEIGHT / 2);
    g_ctx.fillText(stringToShow2, CANVAS_WIDTH / 2 - stringLength2 / 2 + 20, CANVAS_HEIGHT / 2 + 50);
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