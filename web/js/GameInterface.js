function GameInterface()
{
    this.allGameElements = $('#gameElements');
    this.backgroundImage = $('#canvasContainer');

    this.areaForName = $('#areaForName');
    this.startButton = $('#startButton');
    this.showTopButton = $('#showTopButton');
    this.hideTopButton = $('#hideTopButton');
    this.renameButton = $('#renameButton');

    this.startAlertMessage = $('#startAlertMessage');
    this.topInfoLeftMessage = $('#topInfoLeftMessage');
    this.topInfoRightMessage = $('#topInfoRightMessage');

    this.topPlayersBlock = $('#topPlayersBlock');
    this.topPlayersParagraph = $('#topPlayersParagraph');

    this.insertInformationFileDirectory = $('#insertInfo').val();
    this.selectInformationFileDirectory = $('#selectInfo').val();
}

GameInterface.prototype.processAllOnStart = function()
{
    this.allGameElements.hide();

    this.topInfoLeftMessage.show();
    this.topInfoRightMessage.show();
    this.startAlertMessage.hide();
};

GameInterface.prototype.processAllOnEnd = function()
{
    this.allGameElements.show();

    this.renameButton.show();
    this.areaForName.hide();

    this.startButton.val('Play again');
};

GameInterface.prototype.processOnRename = function()
{
    this.renameButton.hide();
    this.areaForName.show();

    this.startButton.val('Play')
    this.areaForName.val('');

    this.topInfoLeftMessage.hide();
    this.topInfoRightMessage.hide();
    this.startAlertMessage.show();
};

GameInterface.prototype.showGameOver = function(name, score)
{
    this.topInfoLeftMessage.text('Game Over, ' + name + '!');
    this.topInfoRightMessage.text('Score: ' + score);
};

GameInterface.prototype.showYouWin = function(name, score)
{
    this.topInfoLeftMessage.text('You Win, ' + name + '!');
    this.topInfoRightMessage.text('Score: ' + score);
};

GameInterface.prototype.hideOnPageLoad = function()
{
    this.renameButton.hide();

    this.topInfoLeftMessage.hide();
    this.topInfoRightMessage.hide();
};

GameInterface.prototype.showTopPlayersBlock = function()
{
    this.topPlayersBlock.show();
};

GameInterface.prototype.hideTopPlayersBlock = function()
{
    this.topPlayersBlock.hide();
};

GameInterface.prototype.getPlayerName = function()
{
    return this.areaForName.val();
};

GameInterface.prototype.changePlayerNameSpan = function(playerName)
{
    this.topInfoLeftMessage.text('Player: ' + playerName);
};

GameInterface.prototype.changePlayerScoreSpan = function(score)
{
    this.topInfoRightMessage.text('Score: ' + score);
};