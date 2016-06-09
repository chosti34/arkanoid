var player = {
    x: 50,
    y: 440,
    width: 100,
    height: 20,
    color: 'blue',
    speed: 5,

    draw: function(ctx)
    {
        drawRect(ctx, this.x, this.y, this.width, this.height, this.color);
    },

    move: function()
    {
        document.addEventListener('mousemove', function(event)
        {
            var x = event.offsetX;
            player.x = x - player.width / 2;
        });

        if (isKeyDown('RIGHT'))
        {
            this.x += this.speed;
        }
        if (isKeyDown('LEFT'))
        {
            this.x -= this.speed;
        }
    }
}