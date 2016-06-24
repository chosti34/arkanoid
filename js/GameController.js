function GameController()
{
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    this.game = new Game(canvas, ctx);
    this.pageElements = new PageElements();

    this.handlerOnStartButton();
    this.handlerOnRenameButton();
    this.handlerOnTopPlayerButtons();

    this.processElementsOnload();

    this.getData();
}

GameController.prototype.start = function()
{
    this.name = this.pageElements.areaForName[0].value;

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
    this.pageElements.hideOnload();
    this.pageElements.popUpHide();
};

GameController.prototype.processElementsOnStart = function()
{
    this.pageElements.hideAllOnStart();
    this.pageElements.backgroundImage[0].style.opacity = '1';
};

GameController.prototype.processElementsOnEnd = function()
{
    this.pageElements.showAllOnEnd();
    this.pageElements.showGameOver(this.name, this.game.score);
    this.pageElements.backgroundImage[0].style.opacity = '0.5';
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

    this.pageElements.startButton[0].addEventListener('click', function()
    {
        thisPtr.pageElements.startButton[0].onclick = thisPtr.start();
    });
};

GameController.prototype.handlerOnRenameButton = function()
{
    var thisPtr = this;

    this.pageElements.renameButton[0].addEventListener('click', function()
    {
        thisPtr.pageElements.processOnRename();
    });
};

GameController.prototype.handlerOnTopPlayerButtons = function()
{
    var thisPtr = this;

    this.pageElements.showTopButton[0].addEventListener('click', function()
    {
        thisPtr.pageElements.popUpShow();
    });

    this.pageElements.hideTopButton[0].addEventListener('click', function()
    {
        thisPtr.pageElements.popUpHide();
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
        })
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