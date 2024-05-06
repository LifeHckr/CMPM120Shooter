class PewPew extends Phaser.Scene {



    preload() {


    }

    create() {
        //let my = this.my;
        //my.bullGroup;
        this.wave = -1;
        my.bullGroup = this.add.group({
            defaultKey: 'enemBullet',
            classType: enemBullet,
            maxSize: 100,
            // activate update calls
            runChildUpdate: true,
        });

        my.fastEnemGroup = this.add.group({
            defaultKey: 'fastEnem',
            classType: fastEnem,
            maxSize: 100,
            // activate update calls
            runChildUpdate: true,
        });

        my.slowEnemGroup = this.add.group({
            defaultKey: 'slowEnem',
            classType: slowEnem,
            maxSize: 100,
            // activate update calls
            runChildUpdate: true,
        });

        my.numThings = 0;
        my.things = [];
        my.coolDownMax = 80;
        my.coolDown = 80;
        
        // Define key bindings
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.testKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

        my.sprite.lifeCount = this.add.text(10, 0, 'Lives: ', { font: '32px Roboto', fill: '#FFFFFF' });
        my.sprite.scoreCount = this.add.text(201, 0, 'Score: ', { font: '32px Roboto', fill: '#FFFFFF' });
        my.sprite.sans = this.add.text(0, 30, '.....................................................................................................................................................................................................................................................................', { font: '32px Roboto', fill: '#FFFFFF' });
        my.sprite.coolDown = this.add.text(10, 25, 'Cooldown|           |', { font: '32px Roboto', fill: '#FFFFFF' });
        my.sprite.coolDownFill = this.add.text(147, 25, 'XXXX', { font: '32px Roboto', fill: '#FFFFFF' });

        my.sprite.enemyShip = this.add.sprite(96, 360, "mainShip");
        my.sprite.enemyShip.angle = -90;
        document.getElementById('description').innerHTML = "Don't Die :)";

        
    }

    update() {
        my.coolDown++;
        //let my = this.my;
        my.sprite.lifeCount.setText('Lives: ' + my.lifeCount);
        my.sprite.scoreCount.setText('Score: ' + my.scoreCount);

        if (Phaser.Input.Keyboard.JustDown(this.testKey)) {
            console.log("Easter Egg!");
            //my.scoreCount += 100;
            //close();
        }

        if (my.coolDown <= my.coolDownMax) {
            if ((my.coolDown % (my.coolDownMax/4)) == 0) {
                my.sprite.coolDownFill.text += "X";
            }
        }



        if (this.upKey.isDown && my.sprite.enemyShip.y > (130)) {
            my.sprite.enemyShip.y -= 8;
        }
        if (this.downKey.isDown && my.sprite.enemyShip.y < game.config.height - my.sprite.enemyShip.displayHeight/2 - 20) {
            my.sprite.enemyShip.y += 8;
        }
        if (Phaser.Input.Keyboard.JustDown(this.shootKey) && my.coolDown >= my.coolDownMax) {
            my.sprite.things = this.add.sprite(my.sprite.enemyShip.x + 25, my.sprite.enemyShip.y, "x-mark");
            my.sprite.things.setDepth(0);
            my.sprite.things.angle = -90;
            my.sprite.things.setScale(10.01, 1);
            my.things.push(my.sprite.things);
            my.coolDown = 0;
            my.sprite.coolDownFill.text = "";
            //my.scoreCount += 100;
        }


        for (let i = 0; i < my.things.length; i++) {
            
            my.things[i].x += 10;
            if (my.things[i].x > game.config.width + my.things[i].displayWidth) {
                
                my.things[i].destroy();
                my.things.splice(0, 1);
            }
            
        }
        


        if (my.lifeCount <= 0) {
            if (my.highScore < my.scoreCount) {
                this.setHighScore();

            }
            game.scene.stop(this.key); 
            game.scene.start('GameOver');
        }







        if (this.wave > -1 && my.slowEnemGroup.countActive() == 0 && my.fastEnemGroup.countActive() == 0 && my.bullGroup.countActive() == 0) {
            console.log("Calling Wave end");
            this.waveEnd();
        }







        
    }

    waveEnd() {
        console.log("Default WaveEnd Called");
    }

    gameWin() {
        my.scoreCount += (my.lifeCount * 20);
        my.lifeCount = 0;
        if (my.scoreCount > my.highScore) {
            this.setHighScore();
        }

        game.scene.stop(this.key); 
        game.scene.start('Winner');
    }

    setHighScore() {
        my.highScore = my.scoreCount;
        localStorage.setItem("whateverInamethisgamehighScore", my.highScore);
    }

}

