var player = {
    level: 1,
    hp: 5,
    x: 50,
    y: 440,
    width: 100,
    height: 20,
    color: 'blue',
    speed: 1,

    draw: function()
    {
        drawRect(this.x, this.y, this.width, this.height, this.color);
    },

    move: function()
    {
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