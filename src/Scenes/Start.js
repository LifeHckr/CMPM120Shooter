class Start extends Phaser.Scene {

    constructor(){
        super("Start");
    }

    preload() {
        this.load.image("button", "./assets/PNG/Sprites/Station/spaceStation_003.png");
        this.load.image("meteor1", "./assets/PNG/Sprites/Meteors/spaceMeteors_001.png");



        this.load.image("mainShip", "./assets/PNG/Sprites/Ships/spaceShips_001.png");
        this.load.image("x-mark", "./assets/PNG/Sprites/Effects/spaceEffects_018.png");
        this.load.image("fastEnem", "./assets/PNG/Sprites/Parts/spaceParts_012.png");
        this.load.image("slowEnem", "./assets/PNG/Sprites/Parts/spaceParts_010.png");
        this.load.image("enemBullet", "./assets/PNG/Sprites/Effects/spaceEffects_008.png");//


    }

    create() {
        my.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
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
        my.sprite.button2 = this.add.sprite(1100, 580, "button");
        my.sprite.button1.setScale(3);
        my.sprite.button2.setScale(4, 3);

        my.sprite.button1Text = this.add.text(my.screenCenterX, my.sprite.button1.y, 'Start', { font: '32px Roboto', fill: '#FFFFFF' }).setOrigin(0.5);
        my.sprite.button2Text = this.add.text(my.sprite.button2.x, my.sprite.button2.y, 'Reset HS', { font: '32px Roboto', fill: '#FFFFFF' }).setOrigin(0.5);;
        my.sprite.title = this.add.text(my.screenCenterX, 267, 'Whatever I Decide to Name This Game', { font: '32px Roboto', fill: '#FFFFFF' }).setOrigin(0.5);;
        my.sprite.highScore = this.add.text(my.screenCenterX, 320, 'High Score: ' + my.highScore, { font: '32px Roboto', fill: '#FFFFFF' }).setOrigin(0.5);;
        

        this.input.on("pointerdown", function (event) {
                console.log(event.x + " " + event.y);
                //Start Button
                if ((Math.abs(event.y - my.sprite.button1.y) < (my.sprite.button1.displayHeight/2)) 
                && (Math.abs(event.x - my.sprite.button1.x) < (my.sprite.button1.displayWidth/2))) {
                    my.initialize();
                    game.scene.stop('Start');
                    game.scene.start('level1');
                }
                else if ((Math.abs(event.y - my.sprite.button2.y) < (my.sprite.button2.displayHeight/2)) 
                && (Math.abs(event.x - my.sprite.button2.x) < (my.sprite.button2.displayWidth/2))) {
                    localStorage.setItem("whateverInamethisgamehighScore", 0);
                    my.highScore = 0;
                    my.sprite.highScore.text = 'High Score: ' + my.highScore;
                }

            
        });


    }

    update() {
        //my.sprite.meteorThang.update();
        
    }

}