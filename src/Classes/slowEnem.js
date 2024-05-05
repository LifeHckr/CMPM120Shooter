class slowEnem extends Phaser.GameObjects.PathFollower {
    constructor(scene, x, y, texture, frame) {        
        super(scene, 'Path', x, y, texture, frame);
        this.visible = true;
        this.active = true;
        this.timer = 0;
        this.cooldown = 100;
        this.colliding = false;
        this.setDepth(0);


        this.startFollowOBJ1 = {
            
            from: 0,
            to: 1,
            delay: 0,
            duration: 2000,
            ease: 'x^2',
            repeat: 0,
            yoyo: false,
            rotateToPath: true,
            rotationOffset: 0
            
        };
        this.startFollowOBJ2 = {
            
            from: 0,
            to: 1,
            delay: 0,
            duration: 5000,
            ease: 'x^2',
            repeat: 0,
            yoyo: false,
            rotateToPath: true,
            rotationOffset: 0
            
        };


        this.points1 = [
            game.config.width + 60, this.y,
            game.config.width - 40, this.y,
        ];
        /*console.log(this.points2[2]);
        console.log(this.points2[3]);
        console.log(this.points2[4]);
        console.log(this.points2[5]);*/
        this.curve1 = new Phaser.Curves.Spline(this.points1);
        this.setPath(this.curve1);
        



        //this.group.create(Phaser.Math.RND.between(50, 200), 0);


        this.scene.add.existing(this);

        if (this.curve1.points[0] !== undefined) {
            //console.log("NOT UNDEF");
            this.x = this.curve1.points[0].x;
            this.y = this.curve1.points[0].y;
            this.startFollow(this.startFollowOBJ1);
        };

        return this;
    }

    update() {

        if (this.timer > -1) {
            
            this.timer++;
        }
        if (this.timer > 100) {
            this.timer = -2;
            //console.log("egh?");
            this.setPath(this.secondPath());
            this.startFollow(this.startFollowOBJ2);
        }
        
        if (this.x < (0 - this.displayWidth/2) && this.active) {
            this.selfEnd();
            my.lifeCount--;
        }

        if (this.cooldown <= 0 && this.active && this.x > 200) {
            my.bullGroup.create(this.x, this.y);
            //this.bullet = new enemBullet(this.scene, this.x, this.y, "enemBullet", null);
            this.cooldown = 200;
        } else if (this.active) {
            this.cooldown--;
        }

        if (this.x >= 55, this.x <= 135) {
            if (Math.abs(this.y - my.sprite.enemyShip.y) < (this.displayHeight/2 + my.sprite.enemyShip.displayHeight/2)) {
                this.selfEnd();
                my.scoreCount += 15;
            }
        }

        if (my.things.length > 0 && this.colliding == false) {
            for (let bull of my.things) {
                //console.log(bull.displayHeight);
                if (Math.abs(this.x - bull.x) < (this.displayWidth/3 + bull.displayWidth/3)){
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
            if (this.x >= game.config.width + 50) {
                this.colliding = false;
                this.setPath(this.secondPath());
                this.startFollow(this.startFollowOBJ2);

            }
        }


    }


    selfEnd() {
        this.stopFollow();
        this.active =  false;
        this.destroy();
    }

    secondPath(){
        let curve2 = new Phaser.Curves.Spline([
            this.x, this.y,
            Math.floor(Math.random() * (1100 - 900 + 1) + 900), Math.max(130, this.y - 200),
            Math.floor(Math.random() * (900 - 700 + 1) + 700), Math.min(game.config.height - this.displayHeight/2, this.y + 169),
            Math.floor(Math.random() * (700 - 500 + 1) + 500), Math.max(130, this.y - 69),
            Math.floor(Math.random() * (500 - 300 + 1) + 300), Math.min(game.config.height - this.displayHeight/2, this.y + 269),


            -90, this.y,
        ]);
        return (curve2);
    }
}

