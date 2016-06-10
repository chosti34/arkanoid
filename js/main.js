grid.generate(20, 60, 20, 'red');
ball.init(player.x + Math.ceil(player.width / 2), player.y - 10, 10, 'black');

var game = function()
{
    fillAll(ctx, '#add8e6');

    grid.draw(ctx);

    ball.collision();
    ball.move();
    ball.draw();

    player.move();
    player.draw(ctx);

    window.requestAnimationFrame(game);
};

game();