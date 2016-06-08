var game = function()
{
    fillAll('#add8e6');

    grid.draw();

    player.move();
    player.draw();
};

startGame(game);