var g_game, g_playerName;

window.onload = function()
{
    g_game = new Game();

    PopUpHide();
    document.getElementById('startButton').onclick = startGame;
    document.getElementById('changeNameButton').onclick = pageReload;
    document.getElementById('showTopButton').onclick = PopUpShow;

    getFromDataBase();
};

function startGame()
{
    g_playerName = document.getElementById('areaForNick').value;
    if ((g_playerName != +g_playerName) && (g_playerName.length > 2))
    {
        g_game.initialize();
    }
    else
    {
        alert('Please, enter your name...');
    }
}

function processElementsOnInitialize()
{
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('changeNameButton').style.display = 'none';
    document.getElementById('areaForNick').style.display = 'none';
    document.getElementById('showTopButton').style.display = 'none';
}

function processElementsOnGameEnd()
{
    document.getElementById('startButton').value = 'Play Again';
    document.getElementById('startButton').style.display = 'block';
    document.getElementById('startButton').style.top = '80px';
    document.getElementById('startButton').style.right = '110px';
    document.getElementById('changeNameButton').style.display = 'block';
    document.getElementById('showTopButton').style.display = 'block';
    document.getElementById('showTopButton').style.left = '30px';
}

function insertDataIntoDataBase()
{
    $.ajax
    ({
        type: 'POST',
        url: '../arkanoid/php/save.php',
        data:
        ({
            user: g_playerName,
            score: g_game.score
        })
    });
}

function getFromDataBase()
{
    $.ajax
    ({
        type: 'POST',
        url: '../arkanoid/php/load.php',
        success: function(html)
        {
            $('#topPlayers').html(html);
        }
    });
}

function pageReload()
{
    document.location.reload();
}

function gameLoop()
{
    if (g_game.isContinue)
    {
        g_game.graphics.drawBackground();
        g_game.graphics.showScore(g_game.score);
        g_game.graphics.showPlayerName(g_playerName);

        g_game.collisions();
        g_game.ball.move();
        g_game.platform.controlBorderMove();
        movePlatform();

        g_game.drawGrid();
        g_game.drawBall();
        g_game.drawPlatform();

        window.requestAnimationFrame(gameLoop);
    }
    else
    {
        g_game.end(g_game.isWin);
    }
}

function changeCoordinatesOnMouseMove(event)
{
    var x = event.offsetX;
    g_game.platform.x = x - g_game.platform.width / 2;
}

function movePlatform()
{
    document.getElementById('mouseVisibilityField').addEventListener('mousemove', changeCoordinatesOnMouseMove);
}

function PopUpShow()
{
    $('#window-popup').show();
}

function PopUpHide()
{
    $('#window-popup').hide();
}