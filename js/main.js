var game, player;

window.onload = function()
{
    game = new Game();
};

function startGame()
{
    player = document.getElementById('areaForNick');
    if (player.value != '' && player.value != ' ')
    {
        game.initialize();
    }
    else
    {
        alert('Please, enter your name...');
    }
}