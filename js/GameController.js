function GameController()
{
    this.canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    this.game = new Game(this.canvas, ctx);

    this.areaForName = document.getElementById('areaForName');
    this.startButton = document.getElementById('startButton');
    this.showTopButton = document.getElementById('showTopButton');
    this.renameButton = document.getElementById('renameButton');
    this.hideButton = document.getElementById('hideButtonBlock');
    this.backgroundImage = document.getElementById('canvasContainer');
    this.gameOverMessage = document.getElementById('gameOverMessage');
    this.endScoreMessage = document.getElementById('endScoreMessage');

    this.setHandlerOnStartButton();
    this.setHandlerOnRenameButton();

    this.showTopButton.onclick = this.popUpShow;
    this.hideButton.onclick = this.popUpHide;

    this.popUpHide();
    this.getData();
}

GameController.prototype.start = function()
{
    this.name = areaForName.value;

    if (this.name.length > 0 && this.name.length <= 12)
    {
        this.game.initialize(this.name);
        this.hideElementsOnStart();
        this.gameLoop();
    }
    else if (this.name.length == 0)
    {
        alert('Please, enter your name...');
    }
    else
    {
        alert('Please, write less characters...');
    }
};

GameController.prototype.gameLoop = function()
{
    var thisPtr = this;

    if (this.game.isContinue)
    {
        this.game.graphics.clearAll();
        this.game.showScore();
        this.game.showName();

        this.game.collisions();
        this.game.ball.move();
        this.game.platform.controlBorderMove();

        this.game.drawGrid();
        this.game.drawBall();
        this.game.drawPlatform();

        window.requestAnimationFrame(function() {
            thisPtr.gameLoop();
        });
    }
    else
    {
        this.game.end();
        this.showElementsOnEnd();
        this.insertData();
        this.getData();
    }
};

GameController.prototype.hideElementsOnStart = function()
{
    this.areaForName.style.display = 'none';
    this.startButton.style.display = 'none';
    this.showTopButton.style.display = 'none';
    this.renameButton.style.display = 'none';
    this.gameOverMessage.style.display = 'none';
    this.endScoreMessage.style.display = 'none';

    this.backgroundImage.style.opacity = '1';
};

GameController.prototype.showElementsOnEnd = function()
{
    this.startButton.style.display = 'block';
    this.showTopButton.style.display = 'block';
    this.renameButton.style.display = 'block';

    this.startButton.value = 'Play again';

    this.backgroundImage.style.opacity = '0.5';

    this.gameOverMessage.innerHTML = 'Game Over, ' + this.name + '!';
    this.gameOverMessage.style.display = 'block';
    this.endScoreMessage.innerHTML = 'Score: ' + this.game.score;
    this.endScoreMessage.style.display = 'block';
};

GameController.prototype.setHandlerOnStartButton = function()
{
    var thisPtr = this;
    this.startButton.addEventListener('click', function() {
        thisPtr.startButton.onclick = thisPtr.start();
    });
};

GameController.prototype.setHandlerOnRenameButton = function()
{
    var thisPtr = this;
    this.renameButton.addEventListener('click', function() {
        thisPtr.renameButton.style.display = 'none';
        thisPtr.gameOverMessage.style.display = 'none';
        thisPtr.endScoreMessage.style.display = 'none';

        thisPtr.areaForName.style.display = 'block';

        thisPtr.startButton.value = 'Play';
        thisPtr.areaForName.value = '';
    });
};

GameController.prototype.popUpShow = function()
{
    $('#windowPopup').show();
};

GameController.prototype.popUpHide = function()
{
    $('#windowPopup').hide();
};

GameController.prototype.insertData = function()
{
    $.ajax ({
        type: 'POST',
        url: 'php/insert.php',
        data: ({
            user: this.name,
            score: this.game.score
        })
    });
};

GameController.prototype.getData = function()
{
    $.ajax ({
        type: 'POST',
        url: 'php/select.php',
        success: function(html) {
            $('#topPlayersParagraph').html(html);
        }
    });
};