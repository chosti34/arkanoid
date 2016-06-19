var g_game, g_player;

window.onload = function()
{
    g_game = new Game();

    document.getElementById('startButton').onclick = startGame;
    document.getElementById('changeNameButton').onclick = pageReload;
};

function startGame()
{
    g_player = document.getElementById('areaForNick');
    if ((g_player.value != +g_player.value) && (g_player.value.length > 2))
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
}

function processElementsOnGameEnd()
{
    document.getElementById('startButton').value = 'Play again';
    document.getElementById('startButton').style.display = 'block';
    document.getElementById('startButton').style.top = '80px';
    document.getElementById('startButton').style.right = '110px';
    document.getElementById('changeNameButton').style.display = 'block';
}

function insertDataIntoDataBase()
{
    $.ajax({
        type: 'POST',
        url: '../arkanoid/php/save.php',
        data: ({
            user: g_player.value,
            score: g_game.score
        })
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
        g_game.graphics.showScore();
        g_game.graphics.showPlayerName();

        g_game.checkBallCollision();
        g_game.ball.move();
        g_game.platform.checkScopes();
        movePlatform();

        g_game.graphics.drawGrid();
        g_game.graphics.drawBall();
        g_game.graphics.drawPlatform();

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