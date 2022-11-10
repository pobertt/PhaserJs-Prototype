var config = {
    type: Phaser.AUTO,
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    //enable mouse
    disableContextMenu: true,
    physics: {
        default: 'arcade',
        arcade: {
                gravity: { y: 0 },
                debug: false
            }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
//example
var text;
var game = new Phaser.Game(config);
//player properties
var player;
var health = 5;
var healthHit = false;

//bullet
var bullet1 = [];
var bulletTimer = 0;

//enemy 
var enemy = []; 
var enemyGroup;
var beetleList = [];
var maggot;



//movement variables
let keyW;
let keyA;
let keyS;
let keyD;

function preload (){
    //loading player sprite
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 160, frameHeight: 160 });
    //bullet
    this.load.image('bullet1', 'assets/bullet1.png');
    //enemy
    this.load.spritesheet('beetleMove2.0', 'Animated insect enemy assets/beetleMove2.0.png', { frameWidth: 88, frameHeight: 76});
}

function create (){
    //creating a player sprite at x and y position
    player = this.physics.add.sprite(config.width / 2, config.height / 2, 'player');
    //beetle, trying to spawn it at random x and y positions 
    

    //enemy class with beetle being passed into it
    for(let i = 0; i < 10; i++){
        beetleList.push(this.physics.add.sprite(Phaser.Math.Between(0, config.width), Phaser.Math.Between(0, config.height), 'beetleMove2.0'));
        enemy[i] = new Enemy(beetleList[i]);
        console.log(enemy[i]);
    }
    
  
    //allowing keyboard movement
    cursors = this.input.keyboard.createCursorKeys();
    //allowing WASD keycodes to be recognised
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    //restart button
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    
    text = this.add.text(10, 10, 'Move the mouse', { font: '16px Courier', fill: '#00ff00' });  

    //beetle colliding with player and calling the hitPlayer function when colliding
    this.physics.add.collider(player, beetleList, hitPlayer);
    

    //animations for the beetle
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('beetleMove2.0', { start: 8, end: 11 }),
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('beetleMove2.0', { start: 4, end: 7 }),
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('beetleMove2.0', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('beetleMove2.0', { start: 12, end: 15 }),
        frameRate: 8,
        repeat: -1
    });
}

function update (){
    //mouse buttons
    var pointer = this.input.activePointer;

    text.setText([
        'x: ' + pointer.x,
        'y: ' + pointer.y,
        'isDown: ' + pointer.isDown 
    ]);

    
    
    //firing the bullet every half a second
    var currentTime = Date.now();
    if(pointer.isDown == true && currentTime - bulletTimer > 500){
        var bulletGroup = this.physics.add.group({
            key: 'bullet1', 
        });
        //adding a new bullet onto bullet1 array 
        bullet1.push(new Bullet(bulletGroup, player.x, player.y));
        //calling the shoot function from the bullet class and the last bullet will use that function in the bullet1 array
        bullet1[bullet1.length-1].shoot(pointer, player);
        //colliding with the beetle will call the die function
        this.physics.add.collider(bulletGroup, beetleList, die);
        //updating the time for the bullet
        bulletTimer = Date.now();
    }


    //movement of enemy following the player
    for(let i = 0; i < 10; i++){
        enemy[i].move(player);
    }
    

    //movement for W A S and D, they are seperate so they allow diagonal movement
    if(keyW.isDown) {
        player.setVelocityY(-160);
    }else if(keyS.isDown) {
        player.setVelocityY(160);
    }else{
        player.setVelocityY(0);
    }

    if(keyD.isDown) {
        player.setVelocityX(160);
    }else if (keyA.isDown) {
        player.setVelocityX(-160);
    }else{
        player.setVelocityX(0);
    }   

    //if health is 0 calls the game over function
    if(health == 0){
        console.log('goodbye')
        gameOver();
    }

    if(keyR.isDown){
        restart();
    }
}

//function in colliding between player and enemies, reducing health when called.
function hitPlayer(){
    console.log(healthHit)
    healthHit = true;
    if(healthHit == true){
        health = health-1;
        healthHit = false;
        console.log(health)
    }
}

function gameOver(){
    this.physics.pause();
}

function restart(){
    this.scene.restart();
}

var count = 10;

function die(bulletGroup, enemyDead){
    count--;
    enemyDead.disableBody(true, true);
    bulletGroup.disableBody(true, true);
    if(count == 0){
        spawnEnemy()
        count = 10;
    }
}

function spawnEnemy(){
    for(let i = 0; i < 10; i++){
        enemy[i].enemy.enableBody(true, Phaser.Math.Between(0, config.width), Phaser.Math.Between(0, config.height), true, true);
    }
}




//https://sanderfrenken.github.io/Universal-LPC-Spritesheet-Character-Generator/#?body=Body_color_light&head=Human_male_light spritesheet generator

//for temp power up with bullet, lower the dateTime amount
//when time decreases, add more enemies, for loop?
//health timer to reduce the amount of collision and depletion

//counter in die, when counter is 0, add more into the array
