function GameController()
{
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    this.game = new Game(canvas, ctx);
    this.gameInterface = new GameInterface();

    this.setHandlerOnStartButton();
    this.setHandlerOnRenameButton();
    this.setHandlerOnTopPlayerButtons();
    this.setHandlerOnPageLoad();
    this.setHandlerOnGameEnd();

    this.processElementsOnPageLoad();
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

GameController.prototype.processElementsOnPageLoad = function()
{
    this.gameInterface.hideOnPageLoad();
    this.gameInterface.hideTopPlayersBlock();
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

GameController.prototype.setHandlerOnPageLoad = function()
{
    var thisPtr = this;

    this.game.showPlayerName = function()
    {
        thisPtr.gameInterface.changePlayerNameSpan(thisPtr.playerName);
    };

    this.game.showPlayerScore = function()
    {
        thisPtr.gameInterface.changePlayerScoreSpan(thisPtr.game.score);
    };
};

GameController.prototype.setHandlerOnGameEnd = function()
{
    var thisPtr = this;

    this.game.handlerOnEnd = function()
    {
        thisPtr.insertDataIntoDataBase();
        thisPtr.processElementsOnEnd();
    };
};

GameController.prototype.setHandlerOnStartButton = function()
{
    var thisPtr = this;

    this.gameInterface.startButton.bind('click', function()
    {
        thisPtr.start();
        thisPtr.gameInterface.hideEndingMessages();
    });
};

GameController.prototype.setHandlerOnRenameButton = function()
{
    var thisPtr = this;

    this.gameInterface.renameButton.bind('click', function()
    {
        thisPtr.gameInterface.processOnRename();
    });
};

GameController.prototype.setHandlerOnTopPlayerButtons = function()
{
    var thisPtr = this;

    this.gameInterface.showTopButton.bind('click', function()
    {
        thisPtr.changeTopWithDataFromDataBase();
        thisPtr.gameInterface.showTopPlayersBlock();
    });

    this.gameInterface.hideTopButton.bind('click', function()
    {
        thisPtr.gameInterface.hideTopPlayersBlock();
    });
};

GameController.prototype.insertDataIntoDataBase = function()
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
        type: 'POST',
        url: this.gameInterface.insertInformationFileDirectory,
        data: sendingData,
        error: showError
    });
};

GameController.prototype.changeTopWithDataFromDataBase = function()
{
    var thisPtr = this;

    var showError = function()
    {
        alert('An error occurred while receiving data');
    };

    var changeTopPlayersElement = function(data)
    {
        thisPtr.gameInterface.topPlayersParagraph.html(data);
    };

    $.ajax({
        type: 'POST',
        url: this.gameInterface.selectInformationFileDirectory,
        success: changeTopPlayersElement,
        error: showError
    });
};