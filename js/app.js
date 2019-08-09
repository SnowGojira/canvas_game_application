//start the canvas
(function initCanvas(){
    var doc = window.document,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d');

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);
    //make the canvas and ctx to be global variables
    window.canvas = canvas;
    window.ctx = ctx;

})();

/////////////////////////////////////////Class/////////////////////////////////////
//Enemy
var Enemy = function(x,y,v) {
    this.sprite = 'images/enemy-bug.png';
    this.start = x;
    this.x = x;
    this.y = y;
    this.v = v;
};

Enemy.prototype.update = function(dt) {
    //move with a velocity
    this.x > canvas.width? this.x = this.start : this.x = this.x + this.v;
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Gem
var Gem = function(){};

// Player
var Player = function () {
    this.characterSprite = 'images/char-horn-girl.png';
    this.heartSprite = 'images/Heart.png';

    this.count = 0;
    this.heart = 3;

    this.startX = 202;
    this.startY = 405;
    this.x = this.startX;
    this.y = this.startY;
    this.stepX = 0;
    this.stepY = 0;
    this.orient = 0;
};

Player.prototype.update = function () {
    //move
    if(this.orient != 0){
        this.x = this.x + this.stepX*this.orient;
        this.y = this.y + this.stepY*this.orient;
        //empty the container for next move
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
            this.orient = -1;
            break;
        case 'right' :
            this.x <= 303? this.stepX = 101 : this.stepX =0;
            this.orient = 1;
            break;
        case 'up' :
            this.y >= 73? this.stepY = 83 : this.stepY = 0;
            this.orient = -1;
            break;
        case 'down' :
            this.y <= 322? this.stepY = 83: this.stepY = 0;
            this.orient = 1;
            break;
    }
};

Player.prototype.reset = function () {
    this.x = this.startX;
    this.y = this.startY;
};



///////////////////////////////////////////////Instantiate Objects///////////////////////////
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var level = 3;

var allEnemies = randomEnemies(level);
var player = new Player();


////////////////////////////////////////function to reference/////////////////////////////
//random generator
function randomEnemies(num) {
    let enemyArr = [];
    for(i=0;i<num;i++){
        enemyArr.push(randomEnemy());
    }
    return enemyArr;
}
function randomEnemy(){
    let randomx,randomy,randomv;
    //start X
    let Rand = Math.random();
    randomx = -1000+Math.round(Rand * 10)*100;
    //start Y
    let locY = [62,145,228];
    randomy = locY[Math.round(Rand * 2)];
    //start v
    randomv = 1+Math.round(Rand * 4);

    let enemy = new Enemy(randomx,randomy,randomv);
    console.log(enemy);
    return enemy;
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//collisions event logic
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
                    level = 3;
                    //allEnemies = randomEnemies(level);
                }
            }

        });
    }

    //reach the goal
    if(player.y == -10){
        //player = new Player();
        player.count += 1000;
        player.reset();
        level += 1;
        //allEnemies = randomEnemies(level);

    }

};

//Counter logic
function drawCount(str) {
    ctx.fillStyle = "#000";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    ctx.fillText(str,10,45);
}
