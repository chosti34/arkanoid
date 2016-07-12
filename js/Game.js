function Game(canvas, ctx)
{
    this.fieldWidth = canvas.width;
    this.fieldHeight = canvas.height;

    this.graphics = new Graphics(ctx, this.fieldWidth, this.fieldHeight);

    this.platform = new Platform(this.fieldWidth, this.fieldHeight);
    this.grid = new Grid(this.fieldWidth, this.fieldHeight);
    this.ball = new Ball();

    this.showPlayerScore = function() {};
    this.handlerOnEnd = function() {};

    this.setHandlerOnMouseMove();
}

Game.prototype.initialize = function(playerName)
{
    var amountOfBricks = 66;
    var brickWidth = 70;
    var brickHeight = 20;

    this.score = 0;
    this.isWin = false;
    this.isContinue = true;

    this.playerName = playerName;

    this.platform.initialize(this.fieldWidth / 2 - this.platform.width / 2, this.fieldHeight - 30, '#1e90ff', 'blue');
    this.ball.initialize(this.platform.x + Math.ceil(this.platform.width / 2), this.platform.y - 5, '#00bfff', 'blue');
    this.grid.initialize(amountOfBricks, brickWidth, brickHeight, '#1ca9c9', 'blue');

    this.gameLoop();
};

Game.prototype.gameLoop = function()
{
    var thisPtr = this;

    if (this.isContinue)
    {
        this.graphics.clearAll();
        this.showPlayerScore();

        this.processCollisions();
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
    var ballLeftX = ball.x - ball.radius;
    var ballRightX = ball.x + ball.radius;

    var ballTopY = ball.y - ball.radius;
    var ballBottomY = ball.y + ball.radius;

    var rectRightX = rect.x + rect.width;
    var rectBottomY = rect.y + rect.height;

    return ((ballLeftX < rectRightX) && (ballRightX > rect.x) && (ballTopY < rectBottomY) && (ballBottomY > rect.y));
};

Game.prototype.processCollisions = function()
{
    for (var identifier in this.grid.nodes)
    {
        var brick = this.grid.nodes[identifier];

        if (this.collisionBetweenBallAndRect(this.ball, brick))
        {
            if (((this.ball.xVect > 0) && (this.ball.x < brick.x)) || ((this.ball.xVect <= 0) && (this.ball.x > brick.x + brick.width)))
            {
                this.ball.xVect = - this.ball.xVect;
            }
            else
            {
                this.ball.yVect = - this.ball.yVect;
            }
            this.grid.destroy(identifier);
            this.score++;
            break;
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
    for (var identifier in this.grid.nodes)
    {
        var brick = this.grid.nodes[identifier];

        this.graphics.drawRectWithBorderAndGradient(brick.x, brick.y, brick.width, brick.height, brick.fillColor, brick.strokeColor);
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