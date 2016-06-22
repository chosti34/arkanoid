function GameController()
{
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    this.game = new Game(canvas, ctx);

    this.areaForName = document.getElementById('areaForName');
    this.startButton = document.getElementById('startButton');
    this.showTopButton = document.getElementById('showTopButton');
    this.hideButton = document.getElementById('hideButtonBlock');

    this.setHandlerOnStartClick();
    this.showTopButton.onclick = this.popUpShow;
    this.hideButton.onclick = this.popUpHide;

    this.popUpHide();
    this.getData();
}

GameController.prototype.start = function()
{
    this.name = areaForName.value;

    if (this.name.length > 0)
    {
        this.game.initialize(this.name);
        this.hideElementsOnStart();
        this.loop();
    }
    else
    {
        alert('Please, enter your name...');
    }
};

GameController.prototype.loop = function()
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
            thisPtr.loop();
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
};

GameController.prototype.showElementsOnEnd = function()
{
    this.startButton.value = 'RESTART';
    this.startButton.style.display = 'block';
    this.startButton.style.top = '250px';
    this.startButton.style.right = '250px';

    this.startButton.onclick = document.location.reload;

    this.showTopButton.style.display = 'block';
    this.showTopButton.style.top = '250px';
    this.showTopButton.style.left = '250px';
};

GameController.prototype.setHandlerOnStartClick = function()
{
    var thisPtr = this;
    this.startButton.addEventListener('click', function() {
        thisPtr.startButton.onclick = thisPtr.start();
    });
};

GameController.prototype.reloadPage = function()
{
    location.reload();
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