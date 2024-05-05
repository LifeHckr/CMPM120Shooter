class Winner extends Phaser.Scene {

    constructor(){
        super("Winner");
    }

    preload() {

    }

    create() {
       
        if (localStorage) {
            my.highScore = localStorage.getItem("whateverInamethisgamehighScore");
            if (my.highScore == null) {
                my.highScore = 0;
                localStorage.setItem("whateverInamethisgamehighScore", 0);
            }
        }

        //my.sprite.meteorThang = new screenLoop(this, 420, 420, "meteor1", null);
        //my.sprite.meteorThang.setDepth(-1);
       my.sprite.meteors = this.add.group({
            active: true,
            defaultKey: "meteor1",
            maxSize: 4,
            runChildUpdate: true
            }
        )

        my.sprite.meteors.createMultiple({
            classType: screenLoop,
            active: true,
            key: my.sprite.meteors.defaultKey,
            repeat: my.sprite.meteors.maxSize-1
        });
        //my.sprite.meteorThang2 = this.add.sprite(420, 420, "meteor1");
        //my.sprite.meteorThang.makeActive();


        my.sprite.button1 = this.add.sprite(my.screenCenterX, 420, "button");
        my.sprite.button1.setScale(3);
        my.sprite.button2 = this.add.sprite(my.screenCenterX, 520, "button");
        my.sprite.button2.setScale(4, 3);
        my.sprite.button1Text = this.add.text(my.screenCenterX, my.sprite.button1.y, 'Restart?', { font: '32px Roboto', fill: '#FFFFFF' }).setOrigin(.5);
        my.sprite.gO = this.add.text(my.screenCenterX, 167, 'You won!', { font: '32px Roboto', fill: '#FFFFFF' }).setOrigin(.5);
        my.sprite.title = this.add.text(my.screenCenterX, 267, 'Score: ' + my.scoreCount, { font: '32px Roboto', fill: '#FFFFFF' }).setOrigin(.5);
        my.sprite.highScore = this.add.text(my.screenCenterX, 320, 'High Score: ' + my.highScore, { font: '32px Roboto', fill: '#FFFFFF' }).setOrigin(.5);
        my.sprite.button2Text = this.add.text(my.screenCenterX, my.sprite.button2.y, 'Main Menu', { font: '32px Roboto', fill: '#FFFFFF' }).setOrigin(.5);
        

        this.input.on("pointerdown", function (event) {
                //console.log(event.x + " " + event.y);
                //Start Button
                if ((Math.abs(event.y - my.sprite.button1.y) < (my.sprite.button1.displayHeight/2)) 
                && (Math.abs(event.x - my.sprite.button1.x) < (my.sprite.button1.displayWidth/2))) {
                    my.initialize();
                    game.scene.stop('Winner');
                    game.scene.start('level1');
                }
                else if ((Math.abs(event.y - my.sprite.button2.y) < (my.sprite.button2.displayHeight/2)) && (Math.abs(event.x - my.sprite.button2.x) < (my.sprite.button2.displayWidth/2))) {
                    my.initialize();
                    game.scene.stop('Winner');
                    game.scene.start('Start');
                }

            
        });


    }

    update() {
        //my.sprite.meteorThang.update();
        
    }

}