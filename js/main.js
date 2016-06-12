var g_ctx, g_canvas, CANVAS_WIDTH, CANVAS_HEIGHT, g_ball, g_player, g_grid, g_gameContinue;
var g_image = new Image();

window.onload = initialize;

function initialize()
{
    g_canvas = document.getElementById('canvas');
    g_ctx = canvas.getContext('2d');

    CANVAS_WIDTH = canvas.width;
    CANVAS_HEIGHT = canvas.height;

    g_player = new Player(50, 440, 100, 20, '#1e90ff', 'red');
    g_ball = new Ball(30, 40, 5, 3, -10, 'blue', '#1e90ff');
    g_grid = new Grid();

    g_player.init(50, CANVAS_HEIGHT - 30, 140, 10);
    g_ball.init(g_player.x + Math.ceil(g_player.width / 2), g_player.y - 10, 5);
    g_grid.generate(20, 60, 20, '#1ca9c9');

    g_gameContinue = true;
    gameLoop();
};

function gameLoop()
{
    if (g_gameContinue)
    {
        clearAll(g_ctx);
        drawBackground();
        // Задание координат
        collision();
        g_ball.move();
        g_player.moveControl();
        // Отрисовка
        g_grid.draw(g_ctx);
        g_ball.draw(g_ctx);
        g_player.draw(g_ctx);
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
    g_player.x = x - g_player.width / 2;
};

document.getElementById('mouseVisibilityField').addEventListener('mousemove', changeCoordinatesOnMouseMove);

function gameOver()
{
    var stringToShow = 'Game Over';

    clearAll(g_ctx);
    drawBackground();

    g_ctx.fillStyle = '#5d3954';
    g_ctx.font = '42px Broadway';

    var stringLength = g_ctx.measureText(stringToShow).width;

    g_ctx.fillText(stringToShow, CANVAS_WIDTH / 2 - stringLength / 2 + 20, CANVAS_HEIGHT / 2);
}

function drawBackground()
{
    g_image.src = 'img/background.jpg';
    g_ctx.drawImage(g_image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}