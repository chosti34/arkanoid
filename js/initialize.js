var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var CANVAS_WIDTH = canvas.width;
var CANVAS_HEIGHT = canvas.height;

var player = new Player(50, 440, 100, 20, 'blue');
var ball = new Ball(30, 40, 5, 3, 1, -1, 'black');
var grid = new Grid();

player.init(50, 440, 100, 20);
ball.init(player.x + Math.ceil(player.width / 2), player.y - 10, 10);
grid.generate(20, 60, 20, 'red');