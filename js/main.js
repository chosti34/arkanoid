var g_arkanoid, g_player;

var g_canvas = document.getElementById('canvas');
var g_ctx = g_canvas.getContext('2d');

var g_image = new Image();
g_image.src = 'img/background.jpg';

window.onload = function()
{
    g_arkanoid = new Game(g_canvas, g_ctx, g_image);
    g_arkanoid.graphics.drawBackground();

    popUpHide();

    document.getElementById('startButton').onclick = startGame;
    document.getElementById('showTopButton').onclick = popUpShow;
    document.getElementById('hideButtonBlock').onclick = popUpHide;

    getFromDataBase();
};

function startGame()
{
    g_player = document.getElementById('areaForNick').value;

    if (g_player.length > 0)
    {
        g_arkanoid.initialize(g_player);
        processElementsOnInitialize();
        g_arkanoid.loop();
    }
    else
    {
        alert('Please, enter your name...');
    }
}

function processElementsOnInitialize()
{
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('areaForNick').style.display = 'none';
    document.getElementById('showTopButton').style.display = 'none';
}

function processElementsOnGameEnd()
{
    var start = document.getElementById('startButton');
    var top = document.getElementById('showTopButton');
    
    start.value = 'RESTART';
    start.style.display = 'block';
    start.style.top = '250px';
    start.style.right = '180px';
    start.onclick = pageReload;

    top.style.display = 'block';
    top.style.top = '250px';
    top.style.left = '270px';
}

function insertIntoDataBase()
{
    $.ajax
    ({
        type: 'POST',
        url: 'php/insert.php',
        data:
        ({
            user: g_player,
            score: g_arkanoid.score
        })
    })
}

function getFromDataBase()
{
    $.ajax
    ({
        type: 'POST',
        url: 'php/select.php',
        success: function(html)
        {
            $('#topPlayersParagraph').html(html);
        }
    })
}

function pageReload()
{
    document.location.reload();
}

function popUpShow()
{
    $('#windowPopup').show();
}

function popUpHide()
{
    $('#windowPopup').hide();
}