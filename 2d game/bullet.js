class Bullet {
    constructor(bulletGroup, x, y){
        this.bulletGroup = bulletGroup;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.speed = 1000;
        this.x = x;
        this.y = y;
        this.bulletGroup.children.iterate(function (child) {
            //it can go off the screen
            child.setPosition(x, y);
        });
    }
    
    //shoot function for bullet
    shoot(pointer, player){
        //if mouse buttons down then create bullet
        //at the moment only one bullet can be created and will reset the position of the bullet everytime the mouse is pressed
            var self = this;
            this.bulletGroup.children.iterate(function (child) {
                //it can go off the screen
                child.setCollideWorldBounds(false);
                child.setPosition(player.x, player.y);

                //calculates the direction the bullet should go based on pointer x and y position relative to the player
                var direction = Math.atan( (pointer.x-player.x) / (pointer.y-player.y));

                //if pointer is below then sets a pos speed for the bullet, else neg speed
                if (pointer.y >= player.y)
                {
                    self.xSpeed = self.speed*Math.sin(direction);
                    self.ySpeed = self.speed*Math.cos(direction);
                }
                else
                {
                    self.xSpeed = -self.speed*Math.sin(direction);
                    self.ySpeed = -self.speed*Math.cos(direction);
                }

                //speed in x and y direction 
                child.setVelocity(self.xSpeed, self.ySpeed);
            });
        
    }

}