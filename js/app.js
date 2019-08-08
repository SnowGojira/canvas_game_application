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
var Player = function () {
    this.characterSprite = 'images/char-horn-girl.png';
    this.heartSprite = 'images/Heart.png';
    this.startX = 202;
    this.startY = 405;
    this.x = this.startX;
    this.y = this.startY;
    this.stepX = 0;
    this.stepY = 0;
    this.orient = 0;

    this.count = 0;
    this.heart = 3;
};

Player.prototype.update = function () {

    //move
    //this.handleInput();
    if(this.orient != 0){

        this.x = this.x + this.stepX*this.orient;
        this.y = this.y + this.stepY*this.orient;

        this.stepX = 0;
        this.stepY = 0;
    }

};

Player.prototype.render = function () {
    //draw the character
    ctx.drawImage(Resources.get(this.characterSprite), this.x, this.y);

    //draw the heart symbol for life
    for(let i = this.heart; i>=1 ; i--){
        ctx.drawImage(Resources.get(this.heartSprite), 500-i*35, 5,32,50);
    }
    
    //render the counter
    drawCount(this.count);
};

Player.prototype.handleInput = function (e) {

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

Player.prototype.reset = function () {
    this.x = this.startX;
    this.y = this.startY;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(-10,62,2);
var enemy2 = new Enemy(-100,62,4);
var enemy3 = new Enemy(-60,145,5);
var enemy4 = new Enemy(-200,228,2);

var allEnemies = [enemy1,enemy2,enemy3,enemy4];
//var allEnemies = [enemy1];

var player = new Player();



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

//collisions event logic
var count = 0;
var checkCollisions = function (){

    //collisions
    if(player.y == 239 ||
        player.y == 156 ||
        player.y == 73){

        allEnemies.forEach(function(enemy){
            if(player.x >= enemy.x-5 &&
                player.x <= enemy.x +5 &&
                player.y == enemy.y + 11
                //player.y <= enemy.x +30
              ){
                console.log("collisions!" + player.heart);
                if(player.heart > 1){
                    player.count>0? player.count-= 400 : player.count=0;
                    player.heart -= 1;
                    player.reset();
                }else {
                    player = new Player();
                }
            }

        });
    }

    //reach the goal
    if(player.y == -10){
        //player = new Player();
        player.count += 1000;
        player.reset();

    }

};

//todo draw Text cannot be displayed. Because of in background.
function drawCount(str) {
    ctx.fillStyle = "#000";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    ctx.fillText(str,10,45);
}
//drawCount("start");