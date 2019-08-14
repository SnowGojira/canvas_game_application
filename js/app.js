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
var Selector = function () {
    //this.url = '';
    //this.isStart = true;
    //this.isStart = false;

    this.step = 0;
    this.orient = 0;
    this.x = 101;
    this.selectorSprite = 'images/Selector.png';
};

Selector.prototype.render = function () {
    ctx.drawImage(Resources.get(this.selectorSprite), this.x , 150);
};

Selector.prototype.update = function () {
    if(this.orient != 0){
        this.x = this.x + this.orient * this.step;
        this.step = 0;
    }
};

Selector.prototype.handleInput = function (e) {
    console.log( "selector handler");
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
            isStart = true;
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
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = -1000+Math.round(Math.random() * 10)*100;
    this.start = this.x;
    let locY = [62,145,228];
    this.y = locY[Math.round(Math.random() * 2)];
    this.v = 1+Math.round(Math.random() * 4);
};

Enemy.prototype.update = function(dt) {
    //move with a velocity
    this.x > canvas.width? this.x = this.start : this.x = this.x + this.v/(50*dt);
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Gem
var Gem = function(){
    var blueGem = {
        sprite : 'images/Gem-Blue.png',
        score : 100
    };

    var greenGem = {
        sprite : 'images/Gem-Green.png',
        score : 200
    };

    var orangeGem = {
        sprite : 'images/Gem-Orange.png',
        score : 300
    };

    let gemArr = [blueGem,greenGem,orangeGem];
    this.gem = gemArr[Math.round(Math.random() * 2)];
    let locY = [97,180,263];
    this.y = locY[Math.round(Math.random() * 2)];
    let locX = [9,110,211,312,413];
    this.x = locX[Math.round(Math.random() * 4)];
};

Gem.prototype.render = function () {
    ctx.drawImage(Resources.get(this.gem.sprite), this.x, this.y,80,120);
};


// Player
var Player = function (url_str) {
// var Player = function () {
    this.characterSprite = url_str;
    // this.characterSprite = 'images/char-boy.png';
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
    console.log("player position: "+this.x + " "+ this.y + " " + this.orient);
    //move
    //this.x = this.x + 1;
    if(this.orient != 0){
        //this.x = this.x + this.stepX*this.orient;
        this.x = this.x + this.stepX*this.orient;
        this.y = this.y + this.stepY*this.orient;
        //empty the container for next move
        this.stepX = 0;
        this.stepY = 0;
    }
};

Player.prototype.render = function () {
    //draw the character
    // console.log("character Sprite "+this.characterSprite);
    if(this.characterSprite){
        ctx.drawImage(Resources.get(this.characterSprite), this.x, this.y);
    }

    //ctx.drawImage(Resources.get(this.characterSprite), this.x, this.y);
    //draw life hearts
    for(let i = this.heart; i>=1 ; i--){
        ctx.drawImage(Resources.get(this.heartSprite), 500-i*35, 5,32,50);
    }

    //render the counter
    drawCount(this.count);
};

Player.prototype.handleInput = function (e) {

    //console.log("this.stepX "+this.x +",this.stepY "+this.y);
    switch (e) {
        case 'left' :
            this.x >= 101? this.stepX = 101 : this.stepX = 0;
            this.orient = -1;
            console.log("player handle input: left"+ this.stepX + " " +this.orient);
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
    // isStart = false;
    isStart = true;
var selector = new Selector(),
    //player = new Player('images/char-boy.png'),
    // player = new Player(url),
    // player = new Player(),
    player,
    level = 3,
    allEnemies = enemyEntries(3),
    allGems = [];
//initiate a gem object every 2 seconds
setInterval(function (){
    var gem = new Gem();
    allGems.push(gem);
},2000);


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
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };



    if(url){
        console.log("player: "+ player);
        player.handleInput(allowedKeys[e.keyCode]);
    }

    // player.handleInput(allowedKeys[e.keyCode]);

    if(selector){
        console.log("selector: "+ selector);
        selector.handleInput(allowedKeys[e.keyCode]);
    }

    //startLogic(allowedKeys[e.keyCode]);

});

//collisions event logic
var checkCollisions = function (){
    //enemies collisions
    if(player.y == 239 ||
        player.y == 156 ||
        player.y == 73){
        //collision zone
        allEnemies.forEach(function(enemy){
            if(player.x >= enemy.x-5 &&
                player.x <= enemy.x +5 &&
                player.y == enemy.y + 11
              ){
                //enemy and heart combine logic
                if(player.heart > 1){
                    player.count>0? player.count-= 400 : player.count=0;
                    player.heart -= 1;
                    player.reset();
                }else {
                    player = new Player();
                    level = 3;
                    allEnemies = enemyEntries(level);
                }
            }
        });
    }

    //gems collisions
    if(allGems.length >0){
        if(player.y == allGems[0].y - 24 &&
            player.x == allGems[0].x - 9
          ){
            console.log("gem collisions!"+allGems[0].gem.score);
            player.count = player.count + allGems[0].gem.score;
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
