class Credits extends Phaser.Scene {

    constructor(){
        super("Credits");
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


        my.sprite.button1 = this.add.sprite(my.screenCenterX, 590, "button");
        my.sprite.button1.setScale(3);
        my.sprite.button1Text = this.add.text(my.screenCenterX, my.sprite.button1.y, 'Back', { font: '32px Roboto', fill: '#FFFFFF' }).setOrigin(.5);

        my.sprite.CreditsText1 = this.add.text(my.screenCenterX, 320, "Coding: Me\nExcept for anything that actually works well, that was all repurposed from class examples\nArt: Kenney assets: \nSpace Shooter Extension https://kenney.nl/assets/space-shooter-extension", { font: '32px Roboto', fill: '#FFFFFF' }).setOrigin(.5);
        

        this.input.on("pointerdown", function (event) {
                //console.log(event.x + " " + event.y);
                //Start Button
                if ((Math.abs(event.y - my.sprite.button1.y) < (my.sprite.button1.displayHeight/2)) 
                && (Math.abs(event.x - my.sprite.button1.x) < (my.sprite.button1.displayWidth/2))) {
                    my.initialize();
                    game.scene.stop('Credits');
                    game.scene.start('Start');
                }

            
        });


    }

    update() {
        //my.sprite.meteorThang.update();
        
    }

}