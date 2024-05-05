class fastEnem extends Phaser.GameObjects.PathFollower {
    constructor(scene, x, y, texture, frame) {        
        super(scene, 'Path', x, y, texture, frame);
        this.visible = true;
        this.active = true;
        //this.stepX = this.x;
        this.timer = 0;
        this.colliding = false;
        this.setDepth(0);


        this.startFollowOBJ = {
            
            from: 0,
            to: 1,
            delay: 0,
            duration: 2000,
            rotateToPath: true,
            rotationOffset: 0
            
        };
        this.points1 = [
            game.config.width + 60, this.y,
            game.config.width - 40, this.y
        ];
        this.curve1 = new Phaser.Curves.Spline(this.points1);
        this.setPath(this.curve1);











        if (this.curve1.points[0] !== undefined) {
            //console.log("NOT UNDEF");
            this.x = this.curve1.points[0].x;
            this.y = this.curve1.points[0].y;
            this.startFollow(this.startFollowOBJ);
        };
        this.scene.add.existing(this);
        return this;
    }

    update() {

        if (this.timer > -1) {
            
            this.timer++;
        }

        if (this.timer > 200) {
            this.timer = -2;
            //console.log("egh?");
            this.stopFollow();
            this.setPath(this.secondPath());
            this.startFollow(this.startFollowOBJ);
        }
        
        if (this.x < (0 - this.displayWidth/2) && this.active) {
            this.selfEnd();
            my.lifeCount--;
        }

        if (this.x >= 55, this.x <= 135) {
            if (Math.abs(this.y - my.sprite.enemyShip.y) < (this.displayHeight/2 + my.sprite.enemyShip.displayHeight/2)) {
                this.selfEnd();
                my.scoreCount += 15;
            }
        }

        if (my.things.length > 0 && this.colliding == false) {
            for (let bull of my.things) {
                //console.log("bull exists");
                if (Math.abs(this.x - bull.x) < (this.displayWidth/3 + bull.displayWidth/3)){
                    //console.log("X check passed");
                    if (Math.abs(this.y - bull.y) < (this.displayHeight/2 + bull.displayHeight*1.5)) {

                        this.setPath(this.secondPath());
                        this.stopFollow();
                        this.timer = -2;
                        this.colliding = true;



                    }
                
                }
            }

        }

        if (this.colliding == true) {
            this.x += 10;
            //console.log("O_O");
            if (this.x > game.config.width + 50) {
                this.setPath(this.secondPath());
                this.startFollow(this.startFollowOBJ);
                this.colliding = false;
            }
        }


    }

    secondPath(){
        let curve2 = new Phaser.Curves.Spline([
            this.x, this.y,
            -300, this.y
        ]);
        return (curve2);
    }

    selfEnd() {
        this.stopFollow();
        this.active =  false;
        this.destroy();
    }
}

