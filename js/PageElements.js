function PageElements()
{
    this.areaForName = $('#areaForName');
    this.startButton = $('#startButton');
    this.showTopButton = $('#showTopButton');
    this.hideTopButton = $('#hideButtonBlock');
    this.renameButton = $('#renameButton');

    this.gameOverMessage = $('#gameOverMessage');
    this.endScoreMessage = $('#endScoreMessage');

    this.topPlayersBlock = $('#windowPopup');

    this.allElements = $('#pageElements');

    this.backgroundImage = $('#canvasContainer');
}

PageElements.prototype.hideAllOnStart = function()
{
    this.allElements.hide();
};

PageElements.prototype.showAllOnEnd = function()
{
    this.allElements.show();
    this.renameButton.show();

    this.areaForName.hide();

    this.startButton[0].value = 'Play again';
};

PageElements.prototype.processOnRename = function()
{
    this.renameButton.hide();
    this.gameOverMessage.hide();
    this.endScoreMessage.hide();

    this.areaForName.show();

    this.startButton[0].value = 'Play';
    this.areaForName[0].value = '';
};

PageElements.prototype.showGameOver = function(name, score)
{
    this.gameOverMessage[0].innerHTML = 'Game Over, ' + name + '!';
    this.endScoreMessage[0].innerHTML = 'Score: ' + score;
    this.gameOverMessage.show();
    this.endScoreMessage.show();
};

PageElements.prototype.hideOnload = function()
{
    this.renameButton.hide();
};

PageElements.prototype.popUpShow = function()
{
    this.topPlayersBlock.show();
};

PageElements.prototype.popUpHide = function()
{
    this.topPlayersBlock.hide();
};