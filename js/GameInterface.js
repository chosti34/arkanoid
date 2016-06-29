function GameInterface()
{
    this.areaForName = $('#areaForName');
    this.startButton = $('#startButton');
    this.showTopButton = $('#showTopButton');
    this.hideTopButton = $('#hideTopButton');
    this.renameButton = $('#renameButton');
    this.gameOverMessage = $('#gameOverMessage');
    this.endScoreMessage = $('#endScoreMessage');
    this.topPlayersBlock = $('#topPlayersBlock');
    this.allGameElements = $('#gameElements');
    this.backgroundImage = $('#canvasContainer');
}

GameInterface.prototype.hideAllOnStart = function()
{
    this.allGameElements.hide();
};

GameInterface.prototype.showAllOnEnd = function()
{
    this.allGameElements.show();

    this.renameButton.show();
    this.areaForName.hide();

    this.startButton.val('Play again');
};

GameInterface.prototype.processOnRename = function()
{
    this.renameButton.hide();
    this.gameOverMessage.hide();
    this.endScoreMessage.hide();

    this.areaForName.show();

    this.startButton.val('Play')
    this.areaForName.val('');
};

GameInterface.prototype.showGameOver = function(name, score)
{
    this.gameOverMessage.html('Game Over, ' + this.escapeHtmlTags(name) + '!');
    this.endScoreMessage.html('Score: ' + this.escapeHtmlTags(score));
    this.showEndingMessages();
};

GameInterface.prototype.showYouWin = function(name, score)
{
    this.gameOverMessage.html('You Win, ' + this.escapeHtmlTags(name) + '!');
    this.endScoreMessage.html('Score: ' + this.escapeHtmlTags(score));
    this.showEndingMessages();
};

GameInterface.prototype.showEndingMessages = function()
{
    this.gameOverMessage.show();
    this.endScoreMessage.show();
};

GameInterface.prototype.hideOnPageLoad = function()
{
    this.renameButton.hide();
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

GameInterface.prototype.escapeHtmlTags = function(str)
{
    return str.toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};