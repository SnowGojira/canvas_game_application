//create a global canvas to fix the "ctx undefined problem
var doc = window.document,
    canvas = doc.createElement('canvas'),
    ctx = canvas.getContext('2d');

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    window.canvas = canvas;
    window.ctx = ctx;

// Enemies class
var Enemy = function(loc,v) {
    // Variables:
    //image resource, start location, start velocity
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.loc = loc;
    this.v = v;
    //this.ctx = ctx;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    //todo ctx has not defined problem.
    //let image = Resources.get(this.sprite);

    ctx.drawImage(Resources.get(this.sprite), 150, 150);
    //ctx.drawImage(Resources.get(this.sprite), this.x, this.y);


};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function () {

}

player.prototype.update = function () {

}

player.prototype.render = function () {

}

player.prototype.handleInput = function () {

}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

var enemy1 = new Enemy();

allEnemies.push(enemy1);

var player = new player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
