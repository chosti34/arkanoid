function GameController()
{
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    this.game = new Game(canvas, ctx);
    this.gameInterface = new GameInterface();

    this.handlerOnStartButton();
    this.handlerOnRenameButton();
    this.handlerOnTopPlayerButtons();
    this.handlerOnEnd();

    this.processElementsOnload();

    this.getData();
}

GameController.prototype.start = function()
{
    this.playerName = this.gameInterface.getPlayerName();

    if ((this.playerName.length > 0) && (this.playerName.length <= 12))
    {
        this.game.initialize(this.playerName);
        this.processElementsOnStart();
    }
    else if (this.playerName.length == 0)
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
    this.gameInterface.backgroundImage.css('opacity', '1');
};

GameController.prototype.processElementsOnEnd = function()
{
    this.gameInterface.showAllOnEnd();
    if (this.game.isWin)
    {
        this.gameInterface.showYouWin(this.playerName, this.game.score);
    }
    else
    {
        this.gameInterface.showGameOver(this.playerName, this.game.score);
    }
    this.gameInterface.backgroundImage.css('opacity', '0.5');
};

GameController.prototype.handlerOnEnd = function()
{
    var thisPtr = this;

    this.game.handlerOnEnd = function()
    {
        thisPtr.insertData();
        thisPtr.processElementsOnEnd();
        thisPtr.getData();
        thisPtr.getData();
    };
};

GameController.prototype.handlerOnStartButton = function()
{
    var thisPtr = this;

    this.gameInterface.startButton.bind('click', function()
    {
        thisPtr.gameInterface.startButton.bind = thisPtr.start();
    });
};

GameController.prototype.handlerOnRenameButton = function()
{
    var thisPtr = this;

    this.gameInterface.renameButton.bind('click', function()
    {
        thisPtr.gameInterface.processOnRename();
    });
};

GameController.prototype.handlerOnTopPlayerButtons = function()
{
    var thisPtr = this;

    this.gameInterface.showTopButton.bind('click', function()
    {
        thisPtr.gameInterface.popUpShow();
    });

    this.gameInterface.hideTopButton.bind('click', function()
    {
        thisPtr.gameInterface.popUpHide();
    });
};

GameController.prototype.insertData = function()
{
    var sendingData = {
        user: this.playerName,
        score: this.game.score
    };

    var showError = function()
    {
        alert('An error occurred when sending data');
    };

    $.ajax({
        url: '/arkanoid/php/insert.php',
        type: 'POST',
        data: sendingData,
        error: showError
    });
};

GameController.prototype.getData = function()
{
    var showError = function()
    {
        alert('An error occurred while receiving data');
    };

    var changeTopPlayersElement = function(data)
    {
        $('#topPlayersParagraph').html(data);
    };

    $.ajax({
        url: '/arkanoid/php/select.php',
        success: changeTopPlayersElement,
        error: showError
    });
};