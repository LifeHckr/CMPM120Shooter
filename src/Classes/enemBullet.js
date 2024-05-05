class enemBullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {        
        super(scene, x, y, texture, frame);
        this.angle = 90;
        this.setDepth(0);
        this.scene.add.existing(this);
        return this;
    }

    update() {
        this.x -= 5;
        if (this.x < (0 - this.displayWidth/2) && this.active) {
            this.selfEnd();
            my.lifeCount--;
        }

        if (this.x >= 55, this.x <= 135) {
            if (Math.abs(this.y - my.sprite.enemyShip.y) < (this.displayHeight/2 + my.sprite.enemyShip.displayHeight/2)) {
                this.selfEnd();
                my.scoreCount += 5;
            }
        }

        if (my.things.length > 0) {
            for (let bull of my.things) {
                //console.log(bull.displayHeight);
                if (Math.abs(this.x - bull.x) < (this.displayWidth/2 + bull.displayWidth/2)){
                    if (Math.abs(this.y - bull.y) < (this.displayHeight/2 + bull.displayHeight*1.5)) {
                        //console.log("test3");
                        this.selfEnd();
                        my.scoreCount += 5;
                    }
                
                }
            }

        }


    }

    selfEnd() {
        this.active =  false;
        this.destroy();
    }
}


/*

    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }


*/