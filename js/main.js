function updateGameField()
{
    fillAll(ctx, '#add8e6');
    grid.draw(ctx);
}

function changeObjectCoordinates()
{
    collision();
    ball.move();
    player.moveControl();
}

function redrawObjects()
{
    ball.draw();
    player.draw(ctx);
}

function game()
{
    updateGameField();
    changeObjectCoordinates();
    redrawObjects()
    window.requestAnimationFrame(game);
};

game();

function changeCoordinatesOnMouseMove(event)
{
    var x = event.offsetX;
    player.x = x - player.width / 2;
}

document.getElementById('mouseVisibilityField').addEventListener('mousemove', changeCoordinatesOnMouseMove);