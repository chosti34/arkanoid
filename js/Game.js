function Game(canvas, ctx)
{
    this.fieldWidth = canvas.width;
    this.fieldHeight = canvas.height;

    this.graphics = new Graphics(ctx, this.fieldWidth, this.fieldHeight);

    this.platform = new Platform(this.fieldWidth, this.fieldHeight);
    this.grid = new Grid(this.fieldWidth, this.fieldHeight);
    this.ball = new Ball();

    this.setHandlerOnMouseMove();
}

Game.prototype.initialize = function(playerName)
{
    this.score = 0;
    this.isWin = false;
    this.isContinue = true;

    this.playerName = playerName;

    this.platform.initialize(this.fieldWidth / 2 - this.platform.width / 2, this.fieldHeight - 30, '#1e90ff', 'blue');
    this.ball.initialize(this.platform.x + Math.ceil(this.platform.width / 2), this.platform.y - 5, '#00bfff', 'blue');
    this.grid.initialize(66, 70, 20, '#1ca9c9', 'blue');

    this.gameLoop();
};

Game.prototype.gameLoop = function()
{
    var thisPtr = this;

    if (this.isContinue)
    {
        this.graphics.clearAll();
        this.showPlayerScore();
        this.showPlayerName();

        this.collisions();
        this.ball.move();
        this.platform.controlBorderMove();

        this.drawGrid();
        this.drawBall();
        this.drawPlatform();

        window.requestAnimationFrame(function() {
            thisPtr.gameLoop();
        });
    }
    else
    {
        this.end();
        this.handlerOnEnd();
    }
};

Game.prototype.end = function()
{
    this.grid.nodes = [];
    this.graphics.clearAll();
};

Game.prototype.collisionBetweenBallAndRect = function(ball, rect)
{
    var ballTop = this.ball.y - this.ball.radius;
    var ballLeft = this.ball.x - this.ball.radius;
    var ballDiametr = 2 * this.ball.radius;

    return ((ballLeft < rect.x + rect.width) && (ballLeft + ballDiametr > rect.x) && (ballTop < rect.y + rect.height) && (ballDiametr + ballTop > rect.y));
};

Game.prototype.collisions = function()
{
    for (var identifier in this.grid.nodes)
    {
        var enemy = this.grid.nodes[identifier];

        if (this.collisionBetweenBallAndRect(this.ball, enemy))
        {
            if (((this.ball.xVect > 0) && (this.ball.x < enemy.x)) || ((this.ball.xVect <= 0) && (this.ball.x > enemy.x + enemy.width)))
            {
                this.ball.xVect = - this.ball.xVect;
            }
            else
            {
                this.ball.yVect = - this.ball.yVect;
            }
            this.grid.destroy(identifier);
            this.score++;
        }
    }

    if (this.grid.nodes.length == 0)
    {
        this.isContinue = false;
        this.isWin = true;
    }

    if (this.collisionBetweenBallAndRect(this.ball, this.platform))
    {
        this.ball.yVect = - this.ball.yVect;
        this.ball.xVect = 10 * (this.ball.x - (this.platform.x + this.platform.width / 2)) / this.platform.width;
    }

    if ((this.ball.x + this.ball.radius >= this.fieldWidth) || (this.ball.x - this.ball.radius <= 0))
    {
        this.ball.xVect = - this.ball.xVect;
    }

    if (this.ball.y - this.ball.radius <= 0)
    {
        this.ball.yVect = - this.ball.yVect;
    }

    if (this.ball.y + this.ball.radius >= this.fieldHeight)
    {
        this.isContinue = false;
    }
};

Game.prototype.drawPlatform = function()
{
    this.graphics.drawRectWithBorderAndGradient(this.platform.x, this.platform.y, this.platform.width, this.platform.height, this.platform.fillColor, this.platform.strokeColor);
};

Game.prototype.drawBall = function()
{
    this.graphics.drawCircleWithBorder(this.ball.x, this.ball.y, this.ball.radius, this.ball.fillColor, this.ball.strokeColor);
};

Game.prototype.drawGrid = function()
{
    for (var enemy in this.grid.nodes)
    {
        this.graphics.drawRectWithBorderAndGradient(this.grid.nodes[enemy].x, this.grid.nodes[enemy].y, this.grid.nodes[enemy].width, this.grid.nodes[enemy].height, this.grid.nodes[enemy].fillColor, this.grid.nodes[enemy].strokeColor);
    }
};

Game.prototype.setHandlerOnMouseMove = function()
{
    var thisPtr = this;

    document.getElementById('mouseVisibilityField').addEventListener('mousemove', function(event) {
        var currentCoordinateOnX = event.offsetX;
        thisPtr.platform.changeCoordinate(currentCoordinateOnX);
    });
};