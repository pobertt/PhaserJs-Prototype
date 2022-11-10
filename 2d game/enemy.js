class Enemy {
    constructor(enemy){
        this.enemy = enemy;
        this.previousX;
        this.previousY;
    }

    //enemy moving towards the player
    move(player){   
        if(this.enemy.x < player.x){
            this.enemy.x += 1;
        }else{
            this.enemy.x -= 1;  
        }
        if(this.enemy.y < player.y){
            this.enemy.y += 1;
        }else{
            this.enemy.y -= 1;
        }
        

        var xMove = this.enemy.x - this.previousX;
        var yMove = this.enemy.y - this.previousY;

        //console.log('this is x: ', xMove, 'this is y: ', yMove)
        //this doesn't work yet
        if(Math.abs(xMove) > Math.abs(yMove)){
            if(xMove == 1){
                this.enemy.anims.play('right');
                console.log("moving right")
            }else{
                this.enemy.anims.play('left');
                console.log("moving left")
            }
        }

        this.previousX = this.enemy.x
        this.previousY = this.enemy.y
    }
}

// 

// 

// this.enemy.anims.play('down');

// enemy1.anims.play('up');
