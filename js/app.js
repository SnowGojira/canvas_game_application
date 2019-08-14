//move the process of creating canvas here to fix the ctx 'undefined' problem
(function initCanvas(){
    var doc = window.document,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d');

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    window.canvas = canvas;
    window.ctx = ctx;

})();


// Enemies class
var Enemy = function(x,y,v) {
    // Variables:
    //image resource, start location, start velocity
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.start = x;
    this.x = x;
    this.y = y;
    this.v = v;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
//dt is used in engine.js, here it has no use.
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.v;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    //console.log("enemy character: "+ Resources.get(this.sprite));
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    this.x > canvas.width? this.x = this.start : this.x = this.x;


};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function () {
    this.character = 'images/char-horn-girl.png';
    this.startX = 202;
    this.startY = 405;
    this.x = this.startX;
    this.y = this.startY;
    this.stepX = 0;
    this.stepY = 0;
    this.orient = 0;
}

player.prototype.update = function () {

    //move
    //this.handleInput();
    if(this.orient != 0){
        this.x = this.x + this.stepX*this.orient;
        this.y = this.y + this.stepY*this.orient;

        this.stepX = 0;
        this.stepY = 0;
    }

    //collision

};

player.prototype.render = function () {
    //todo ctx has not defined problem. Resources is undefined
    //console.log("player character: "+ Resources.get(this.character));

    ctx.drawImage(Resources.get(this.character), this.x, this.y);


};

player.prototype.handleInput = function (e) {

    //console.log("this.stepX "+this.x +",this.stepY "+this.y);
    switch (e) {
        case 'left' :
            this.x >= 101? this.stepX = 101 : this.stepX = 0;
            //console.log(this.x >= 55.5? this.x - 55.5 : this.x);
            //this.stepX = 101;
            this.orient = -1;
            break;
        case 'right' :
            this.x <= 303? this.stepX = 101 : this.stepX =0;
            //this.stepX = 101;
            this.orient = 1;
            break;
        case 'up' :
            this.y >= 73? this.stepY = 83 : this.stepY = 0;
            //this.stepY = 83;
            this.orient = -1;
            break;
        case 'down' :
            this.y <= 322? this.stepY = 83: this.stepY = 0;
            //this.stepY = 83;
            this.orient = 1;
            break;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(-10,60,2);
var enemy2 = new Enemy(-100,60,4);
var enemy3 = new Enemy(-60,145,5);
var enemy4 = new Enemy(-200,230,2);

//var allEnemies = [enemy1,enemy2,enemy3,enemy4];
var allEnemies = [enemy3];

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

function checkCollisions() {
    //console.log("Collision zone !" + player.y);
    if (player.y == 239 || player.y == 156 || player.y == 73){

        allEnemies.forEach(function(enemy) {
            if(enemy.x-5<=player.x && player.x<= enemy.x+5){
                console.log("Collision zone !"+enemy.x);
            }

        });
        //console.log("Collision zone !");

    }
}
