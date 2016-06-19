function Game()
{
    var canvas = document.getElementById('canvas');
    var ctx    = canvas.getContext('2d');

    this.fieldWidth  = canvas.width;
    this.fieldHeight = canvas.height;

    this.graphics = new Graphics(ctx, this.fieldWidth, this.fieldHeight);

    this.platform = new Platform();
    this.ball     = new Ball();
    this.grid     = new Grid();
}

Game.prototype.initialize = function()
{
    this.isWin = false;
    this.isContinue = true;
    this.score = 0;

    processElementsOnInitialize();

    this.platform.initialize(this.fieldWidth / 2 - 140, this.fieldHeight - 30, '#1e90ff', 'red');
    this.ball.initialize(this.platform.x + Math.ceil(this.platform.width / 2), this.platform.y - 10, 'blue', '#1e90ff');
    this.grid.initialize(60, 60, 20, '#1ca9c9');

    gameLoop();
};

Game.prototype.end = function(isWin)
{
    insertDataIntoDataBase();
    processElementsOnGameEnd();
    this.grid.nodes = [];
    this.graphics.showGameEnd(isWin);
};

Game.prototype.checkCollisionOfTwoObjects = function(x1, y1, w1, h1, x2, y2, w2, h2)
{
    return (x1 < x2 + w2) && (x1 + w1 > x2) && (y1 < y2 + h2) && (h1 + y1 > y2);
};

Game.prototype.checkBallCollision = function()
{
    var ballTop = this.ball.y - this.ball.radius;
    var ballRight = this.ball.x + this.ball.radius;
    var ballLeft = this.ball.x - this.ball.radius;
    var ballBottom = this.ball.y + this.ball.radius;
    var ballDiametr = 2 * this.ball.radius;

    for (var identifier in this.grid.nodes)
    {
        var enemy = this.grid.nodes[identifier];
        if (this.checkCollisionOfTwoObjects(ballLeft, ballTop, ballDiametr, ballDiametr, enemy.x, enemy.y, enemy.width, enemy.height))
        {
            this.ball.yVect = - this.ball.yVect;
            this.grid.destroy(identifier);
            this.score++;
        }
    }
    if (this.grid.nodes.length == 0)
    {
        this.isContinue = false;
        this.isWin = true;
    }

    if ((ballRight >= this.fieldWidth) || (ballLeft <= 0))
    {
        this.ball.xVect = - this.ball.xVect;
    }

    if (ballTop <= 0)
    {
        this.ball.yVect = - this.ball.yVect;
    }

    if (this.checkCollisionOfTwoObjects(ballLeft, ballTop, ballDiametr, ballDiametr, this.platform.x, this.platform.y, this.platform.width, this.platform.height))
    {
        this.ball.yVect = - this.ball.yVect;
        this.ball.xVect = 10 * (this.ball.x - (this.platform.x + this.platform.width / 2)) / this.platform.width;
    }
    else if (ballBottom >= this.fieldHeight)
    {
        this.isContinue = false;
    }
};