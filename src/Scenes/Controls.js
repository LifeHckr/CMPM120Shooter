class Controls extends PewPew {

    constructor(){
        super("Controls");
    }

    preload() {
        super.preload();
    }

    create() {
        super.create();

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
        my.sprite.button1.setScale(7, 3);
        my.sprite.button1Text = this.add.text(my.screenCenterX, my.sprite.button1.y, 'Skip Tutorial', { font: '32px Roboto', fill: '#FFFFFF' }).setOrigin(.5);

        my.sprite.button2 = this.add.sprite(1050, 590, "button");
        my.sprite.button2.setScale(7, 3);
        my.sprite.button2Text = this.add.text(my.sprite.button2.x, my.sprite.button2.y, 'Spawn Enemy', { font: '32px Roboto', fill: '#FFFFFF' }).setOrigin(.5);

        my.sprite.cdText = this.add.text(250, 25, "<-- You can shoot when the cooldown bar is full, Use 'Space' to Fire", { font: '32px Roboto', fill: 'Red' });

        my.sprite.moveText = this.add.text(200, 75, "Use 'W' and 'S' \nto move up and down respectively.", { font: '32px Roboto', fill: 'Red' });
        
        my.sprite.moveText = this.add.text(200, 75, "Use 'W' and 'S' \nto move up and down respectively.", { font: '32px Roboto', fill: 'Red' });

        my.sprite.enemText = this.add.text(200, 400, "You don't lose lives when getting hit, \nyou lose lives when an enemy or projectile gets passed you, \nstop them with your body or projectile!", { font: '32px Roboto', fill: 'Red' });
        

        this.input.on("pointerdown", function (event) {
                //console.log(event.x + " " + event.y);
                //Start Button
                if ((Math.abs(event.y - my.sprite.button1.y) < (my.sprite.button1.displayHeight/2)) 
                && (Math.abs(event.x - my.sprite.button1.x) < (my.sprite.button1.displayWidth/2))) {
                    my.initialize();
                    game.scene.stop('Controls');
                    game.scene.start('level1');
                } else if ((Math.abs(event.y - my.sprite.button2.y) < (my.sprite.button2.displayHeight/2))  && (Math.abs(event.x - my.sprite.button2.x) < (my.sprite.button2.displayWidth/2))) {
                        if (my.fastEnemGroup.countActive() == 0) {
                            my.fastEnemGroup.create(game.config.width, 300);
                        }
                }

            
        });


    }

    update() {
        super.update();
        //my.scoreCount = 0;

    }

    gameOver() {
        my.lifeCount = 1;
    }

}