'use strict';
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
//Selector
//1. Selector UI logic
//2. Selector event logic

var Selector = function () {
    this.selectorSprite = 'images/Selector.png';
    this.step = 0;
    this.orient = 0;
    this.x = 101;
};

Selector.prototype.renderUI = function () {
    //draw canvas
    ctx.drawImage(Resources.get(this.selectorSprite), this.x , 150);

    //update
    if(this.orient != 0){
        this.x = this.x + this.orient * this.step;
        this.step = 0;
    }
};

Selector.prototype.handleInput = function (e) {

    switch (e) {
        case 'left' :
            this.x >= 101 ? this.step = 101 : this.step = 0;
            this.orient = -1;
            break;
        case 'right' :
            this.x <= 303 ? this.step = 101 : this.step = 0;
            this.orient = 1;
            break;
        case 'enter':
            if(this.x == 0){
                url ='images/char-boy.png';
            }else if(this.x == 101){
                url ='images/char-cat-girl.png';
            }else if(this.x == 202){
                url ='images/char-horn-girl.png';
            }else if(this.x == 303){
                url ='images/char-pink-girl.png';
            }else if(this.x == 404){
                url ='images/char-princess-girl.png';
            }

            return player = new Player(url);
    }
};

//Enemy
class Enemy {
    constructor(){
        this.sprite = 'images/enemy-bug.png';
        this.x = -1000+Math.round(Math.random() * 10)*100;
        this.start = this.x;
        let locY = [62,145,228];
        this.y = locY[Math.round(Math.random() * 2)];
        this.v = 1+Math.round(Math.random() * 4);
        this.width;
    }

    update(dt){
        //move with a velocity
        this.x > canvas.width? this.x = this.start : this.x = this.x + this.v/(50*dt);
    }

    renderUI(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        this.width = Resources.get(this.sprite).width;
    }
}

//Gem
var Crystal = function (sprite,score) {
    this.sprite = sprite;
    this.score = score;

    let locY = [97,180,263];
    this.y = locY[Math.round(Math.random() * 2)];
    let locX = [9,110,211,312,413];
    this.x = locX[Math.round(Math.random() * 4)];
};

Crystal.prototype.renderUI = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y,80,120);
};

var Gem = function(){
    Crystal.call(this);
    this.gem;
};

Gem.prototype = Object.create(Crystal.prototype);

Gem.prototype.update = function () {
    //add gems every two seconds
    setInterval(() => {
        let BlueGem = new Crystal('images/Gem-Blue.png',100),
            GreenGem = new Crystal('images/Gem-Green.png',200),
            RedGem = new Crystal('images/Gem-Blue.png',300),
            gemArr = [BlueGem,GreenGem,RedGem];
        this.gem = gemArr[Math.round(Math.random() * 2)];
        allGems.push(this.gem);
    },2000);

};


// Player
var Player = function (url_str) {
    this.characterSprite = url_str;
    this.heartSprite = 'images/Heart.png';

    this.count = 0;
    this.heart = 3;

    this.width;

    this.startX = 202;
    this.startY = 405;
    this.x = this.startX;
    this.y = this.startY;
    this.stepX = 0;
    this.stepY = 0;
    this.orient = 0;
};

Player.prototype.update = function () {

    if(this.orient != 0){
        //this.x = this.x + this.stepX*this.orient;
        this.x = this.x + this.stepX*this.orient;
        this.y = this.y + this.stepY*this.orient;
        //empty the container for next move
        this.stepX = 0;
        this.stepY = 0;
    }
};

Player.prototype.renderUI = function () {
    //draw the character
    if(this.characterSprite){
        ctx.drawImage(Resources.get(this.characterSprite), this.x, this.y);
        this.width = Resources.get(this.characterSprite).width;
    }

    //draw life hearts
    for(let i = this.heart; i>=1 ; i--){
        ctx.drawImage(Resources.get(this.heartSprite), 500-i*35, 5,32,50);
    }

    //renderUI the counter
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
// var url,
// var url = 'images/char-boy.png',
var url = '',
    level = 3;

var selector = new Selector(),
    player,
    allEnemies = enemyEntries(level),
    gem = new Gem(),
    allGems = [];

    gem.update();



////////////////////////////////////////function to reference/////////////////////////////
//random generator
function enemyEntries(level) {
    let arr = [];
    for(let i=0;i<level;i++){
        arr.push(new Enemy());
    }
    return arr;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', (e) => {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };



    if(url){
        player.handleInput(allowedKeys[e.keyCode]);
    }

    selector.handleInput(allowedKeys[e.keyCode]);

});

//collisions event logic
var checkCollisions = function (){
    //enemies collisions
    allEnemies.forEach(function (enemy) {
        if (player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y == enemy.y + 11) {
            //combine hit enemy and delete heart logic
            if (player.heart > 1) {
                player.count > 0 ? player.count -= 400 : player.count = 0;
                player.heart -= 1;
                player.reset();
            } else {
                player = new Player(url);
                level = 3;
                allEnemies = enemyEntries(level);
            }
        }
    });

    //hit the gems
    if(allGems.length >0){
        if(player.y == allGems[0].y - 24 &&
            player.x == allGems[0].x - 9
          ){
            player.count = player.count + allGems[0].score;
            allGems = [];
        }
    }

    //hit the goal
    if(player.y == -10){
        player.count += 1000;
        player.reset();
        //level up, enemies become more
        level += 1;
        allEnemies = enemyEntries(level);
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
