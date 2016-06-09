var game = function()
{
    fillAll(ctx, '#add8e6');
    grid.draw(ctx);
    player.move();
    player.draw(ctx);
};

gameLoop(game);