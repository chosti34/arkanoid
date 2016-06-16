function Game()
{
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');

    this.fieldWidth = this.canvas.width;
    this.fieldHeight = this.canvas.height;

    this.graphics = new Graphics(this.ctx);

    this.platform = new Platform();
    this.ball = new Ball();
    this.grid = new Grid();

    this.image = new Image();
    this.image.src = 'img/background.jpg';
}

Game.prototype.initialize = function()
{
    this.сontinue = true;
    this.score = 0;
    document.getElementById('startButton').style.display = 'none';

    game.platform.initialize(game.fieldWidth / 2 - 50, game.fieldHeight - 30, '#1e90ff', 'red');
    game.ball.initialize(game.platform.x + Math.ceil(game.platform.width / 2), game.platform.y - 10, 'blue', '#1e90ff');
    game.grid.initialize(60, 60, 20, '#1ca9c9');

    game.loop();
}

Game.prototype.loop = function()
{
    if (game.сontinue)
    {
        // Отрисовка игрового поля
        game.graphics.drawBackground();
        game.graphics.showScore();
        // Задание координат
        game.checkBallCollision();
        game.ball.move();
        game.platform.checkScopes();
        game.movePlatform();
        // Отрисовка объектов игры
        game.graphics.drawGrid();
        game.graphics.drawBall();
        game.graphics.drawPlatform();
        // Игровой цикл
        window.requestAnimationFrame(game.loop);
    }
    else
    {
        game.over();
    }
}

Game.prototype.changeCoordinatesOnMouseMove = function(event)
{
    var x = event.offsetX;
    game.platform.x = x - game.platform.width / 2;
}

Game.prototype.movePlatform = function()
{
    document.getElementById('mouseVisibilityField').addEventListener('mousemove', game.changeCoordinatesOnMouseMove);
}

Game.prototype.checkCollisionOfTwoObjects = function(x1, y1, w1, h1, x2, y2, w2, h2)
{
    return (x1 < x2 + w2) && (x1 + w1 > x2) && (y1 < y2 + h2) && (h1 + y1 > y2);
}

Game.prototype.checkBallCollision = function()
{
    var ballTop = game.ball.y - game.ball.radius;
    var ballRight = game.ball.x + game.ball.radius;
    var ballLeft = game.ball.x - game.ball.radius;
    var ballBottom = game.ball.y + game.ball.radius;
    var ballDiametr = 2 * game.ball.radius;

    // Столкновение с кирпичиками
    for (var identifier in game.grid.nodes)
    {
        var enemy = game.grid.nodes[identifier];
        if (game.checkCollisionOfTwoObjects(ballLeft, ballTop, ballDiametr, ballDiametr, enemy.x, enemy.y, enemy.width, enemy.height))
        {
            game.ball.yVect = - game.ball.yVect;
            game.grid.destroy(identifier);
            game.score++;
        }
    }
    if (game.grid.nodes.length == 0)
    {
        game.сontinue = false;
    }

    // Столкновение с боковой стенкой игрового поля
    if ((ballRight >= game.fieldWidth) || (ballLeft <= 0))
    {
        game.ball.xVect = - game.ball.xVect;
    }

    // Столкновение с верхней стенкой игрового поля
    if (ballTop <= 0)
    {
        game.ball.yVect = - game.ball.yVect;
    }

    // Столкновение с платформой
    if (game.checkCollisionOfTwoObjects(ballLeft, ballTop, ballDiametr, ballDiametr, game.platform.x, game.platform.y, game.platform.width, game.platform.height))
    {
        game.ball.yVect = - game.ball.yVect;
        game.ball.xVect = 10 * (game.ball.x - (game.platform.x + game.platform.width / 2)) / game.platform.width;
    }
    else if (ballBottom >= game.fieldHeight)
    {
        game.сontinue = false;
    }
}

Game.prototype.over = function()
{
    game.grid.nodes = [];
    game.graphics.showGameOver();
    document.getElementById('startButton').style.display = 'block';
    document.getElementById('startButton').style.top += '100px';
    document.getElementById('startButton').style.left += '30px';
}