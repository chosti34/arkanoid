function GameController()
{
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    this.game = new Game(canvas, ctx);
    this.gameInterface = new GameInterface();

    this.handlerOnStartButton();
    this.handlerOnRenameButton();
    this.handlerOnTopPlayerButtons();

    this.processElementsOnload();

    this.getData();
}

GameController.prototype.start = function()
{
    this.name = this.gameInterface.areaForName[0].value;

    if ((this.name.length > 0) && (this.name.length <= 12))
    {
        this.game.initialize(this.name);
        this.processElementsOnStart();
        this.handlerOnEnd();
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

GameController.prototype.processElementsOnload = function()
{
    this.gameInterface.hideOnload();
    this.gameInterface.popUpHide();
};

GameController.prototype.processElementsOnStart = function()
{
    this.gameInterface.hideAllOnStart();
    this.gameInterface.backgroundImage[0].style.opacity = '1';
};

GameController.prototype.processElementsOnEnd = function()
{
    this.gameInterface.showAllOnEnd();
    this.gameInterface.showGameOver(this.name, this.game.score);
    this.gameInterface.backgroundImage[0].style.opacity = '0.5';
};

GameController.prototype.handlerOnEnd = function()
{
    var thisPtr = this;

    this.game.handlerOnEnd = function()
    {
        thisPtr.processElementsOnEnd();
        thisPtr.insertData();
        thisPtr.getData();
    };
};

GameController.prototype.handlerOnStartButton = function()
{
    var thisPtr = this;

    this.gameInterface.startButton[0].addEventListener('click', function()
    {
        thisPtr.gameInterface.startButton[0].onclick = thisPtr.start();
    });
};

GameController.prototype.handlerOnRenameButton = function()
{
    var thisPtr = this;

    this.gameInterface.renameButton[0].addEventListener('click', function()
    {
        thisPtr.gameInterface.processOnRename();
    });
};

GameController.prototype.handlerOnTopPlayerButtons = function()
{
    var thisPtr = this;

    this.gameInterface.showTopButton[0].addEventListener('click', function()
    {
        thisPtr.gameInterface.popUpShow();
    });

    this.gameInterface.hideTopButton[0].addEventListener('click', function()
    {
        thisPtr.gameInterface.popUpHide();
    });
};

GameController.prototype.insertData = function()
{
    $.ajax({
        type: 'POST',
        url: '/arkanoid/php/insert.php',
        data: ({
            user: this.name,
            score: this.game.score
        }),
    });
};

GameController.prototype.getData = function()
{
    $.ajax({
        type: 'POST',
        url: '/arkanoid/php/select.php',
        success: function(html) {
            $('#topPlayersParagraph').html(html);
        }
    });
};