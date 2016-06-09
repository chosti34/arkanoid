var engine = function()
{
    console.log('Игровой движок не инициализирован');
};

var gameLoop = function(game)
{
    if (typeof game == 'function')
    {
        engine = game;
    }
    engine();
    window.requestAnimationFrame(gameLoop);
};