var g_ctx, g_ball, g_platform, g_grid, g_gameContinue, CANVAS_WIDTH, CANVAS_HEIGHT;
var g_image = new Image();
var g_score = 0;
var graphics;

window.onload = initialize;

function initialize()
{
    var canvas = document.getElementById('canvas');
    g_ctx = canvas.getContext('2d');

    CANVAS_WIDTH = canvas.width;
    CANVAS_HEIGHT = canvas.height;

    g_platform = new Platform();
    g_ball = new Ball();
    g_grid = new Grid();
    graphics = new Graphics(g_ctx);

    g_platform.initialize(50, CANVAS_HEIGHT - 30, '#1e90ff', 'red');
    g_ball.initialize(g_platform.x + Math.ceil(g_platform.width / 2), g_platform.y - 10, 'blue', '#1e90ff');
    g_grid.initialize(60, 60, 20, '#1ca9c9');

    g_gameContinue = true;
    gameLoop();
};

function gameLoop()
{
    if (g_gameContinue)
    {
        // Очистка игрового поля
        graphics.drawBackground();
        graphics.showScore();
        // Задание координат
        checkCollisions();
        g_ball.move();
        g_platform.checkScopes();
        // Отрисовка
        graphics.drawGrid();
        graphics.drawBall();
        graphics.drawPlatform();
        // Игровой цикл
        window.requestAnimationFrame(gameLoop);
    }
    else
    {
        graphics.showGameOver();
    }
};

function changeCoordinatesOnMouseMove(event)
{
    var x = event.offsetX;
    g_platform.x = x - g_platform.width / 2;
};

document.getElementById('mouseVisibilityField').addEventListener('mousemove', changeCoordinatesOnMouseMove);