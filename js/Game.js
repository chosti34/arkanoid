function Game(canvas, ctx)
{
    this.fieldWidth  = canvas.width;
    this.fieldHeight = canvas.height;

    this.graphics = new Graphics(ctx, this.fieldWidth, this.fieldHeight);

    this.platform = new Platform(this.fieldWidth, this.fieldHeight);
    this.ball = new Ball();
    this.grid = new Grid(this.fieldWidth, this.fieldHeight);

    this.handlerOnMouseMove();
}

Game.prototype.initialize = function(name)
{
    this.isWin = false;
    this.isContinue = true;
    this.score = 0;
    this.name = name;

    this.platform.initialize(this.fieldWidth / 2 - this.platform.width / 2, this.fieldHeight - 30, '#1e90ff', 'blue');
    this.ball.initialize(this.platform.x + Math.ceil(this.platform.width / 2), this.platform.y - 5, 'blue', '#1e90ff');
    this.grid.initialize(60, 70, 20, '#1ca9c9', 'blue');
};

Game.prototype.end = function()
{
    this.grid.nodes = [];
    this.graphics.clearAll();
};

Game.prototype.isCollised = function(x1, y1, w1, h1, x2, y2, w2, h2)
{
    return (x1 < x2 + w2) && (x1 + w1 > x2) && (y1 < y2 + h2) && (h1 + y1 > y2);
};

Game.prototype.collisions = function()
{
    var ballTop = this.ball.y - this.ball.radius;
    var ballRight = this.ball.x + this.ball.radius;
    var ballLeft = this.ball.x - this.ball.radius;
    var ballBottom = this.ball.y + this.ball.radius;
    var ballDiametr = 2 * this.ball.radius;

    for (var identifier in this.grid.nodes)
    {
        var enemy = this.grid.nodes[identifier];
        if (this.isCollised(ballLeft, ballTop, ballDiametr, ballDiametr, enemy.x, enemy.y, enemy.width, enemy.height))
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

    if (this.isCollised(ballLeft, ballTop, ballDiametr, ballDiametr, this.platform.x, this.platform.y, this.platform.width, this.platform.height))
    {
        this.ball.yVect = - this.ball.yVect;
        this.ball.xVect = 10 * (this.ball.x - (this.platform.x + this.platform.width / 2)) / this.platform.width;
    }
    else if (ballBottom >= this.fieldHeight)
    {
        this.isContinue = false;
    }
};

Game.prototype.drawPlatform = function()
{
    this.graphics.drawRectWithBorder(this.platform.x, this.platform.y, this.platform.width, this.platform.height, this.platform.fillColor, this.platform.strokeColor);
};

Game.prototype.drawBall = function()
{
    this.graphics.drawCircleWithBorder(this.ball.x, this.ball.y, this.ball.radius, this.ball.fillColor, this.ball.strokeColor);
};

Game.prototype.drawGrid = function()
{
    for (var enemy in this.grid.nodes)
    {
        this.graphics.drawRectWithBorder(this.grid.nodes[enemy].x, this.grid.nodes[enemy].y, this.grid.nodes[enemy].width, this.grid.nodes[enemy].height, this.grid.nodes[enemy].fillColor, this.grid.nodes[enemy].strokeColor);
    }
};

Game.prototype.showScore = function()
{
    var stringToPrint = 'Score: ' + this.score;
    var fontOfString = '30px Broadway';
    var fillStyleOfString = '#531a5f';

    this.graphics.printString(stringToPrint, fontOfString, fillStyleOfString, 40, this.fieldHeight / 2 + 30);
};

Game.prototype.showName = function()
{
    var stringToPrint = 'Player: ' + this.name;
    var fontOfString = '18px Broadway';
    var fillStyleOfString = '#531a5f';

    this.graphics.printString(stringToPrint, fontOfString, fillStyleOfString, 40, this.fieldHeight / 2);
};

Game.prototype.showEnd = function()
{
    var stringToPrint = this.name + ' has earned ' + this.score + ' points!';
    var stringLength = this.graphics.getStringLength(stringToPrint);
    var fontOfString = '30px Times New Roman';
    var fillStyleOfString = '#fff';

    this.graphics.clearAll();

    this.graphics.printString(stringToPrint, fontOfString, fillStyleOfString, this.fieldWidth / 2 - stringLength / 2, this.fieldHeight / 2 - 110);
    
    /*if (this.isWin)
    {
        var stringToShow = 'Congratulations!';
        var stringLength = this.graphics.getStringLength(stringToShow);

        this.graphics.printString(stringToShow, fontOfString, fillStyleOfString, this.fieldWidth / 2 - stringLength / 2, this.fieldHeight / 2);*/
    /*}
    else
    {
        /*var stringToShow1 = 'Game Over!';
        var stringToShow2 = 'Player: ' + this.name;
        var stringToShow3 = 'Score: ' + this.score;

        var stringLength1 = this.graphics.getStringLength(stringToShow1);
        var stringLength2 = this.graphics.getStringLength(stringToShow2);
        var stringLength3 = this.graphics.getStringLength(stringToShow3);

        this.graphics.printString(stringToShow1, fontOfString, fillStyleOfString, this.fieldWidth / 2 - stringLength1 / 2 - 100, this.fieldHeight / 2 - 50);
        this.graphics.printString(stringToShow2, fontOfString, fillStyleOfString, this.fieldWidth / 2 - stringLength2 / 2 - 100, this.fieldHeight / 2);
        this.graphics.printString(stringToShow3, fontOfString, fillStyleOfString, this.fieldWidth / 2 - stringLength3 / 2 - 100, this.fieldHeight / 2 + 50);*/
        
    //}
};

Game.prototype.handlerOnMouseMove = function()
{
    var thisPtr = this;
    document.getElementById('mouseVisibilityField').addEventListener('mousemove', function() {
        var x = event.offsetX;
        thisPtr.platform.changeCoordinate(x);
    });
};