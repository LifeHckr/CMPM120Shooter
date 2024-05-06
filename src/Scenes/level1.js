class level1 extends PewPew {

    constructor(){
        super("level1");
        this.key = "level1";
    }

    preload() {
        super.preload();
    }

    create() {
        super.create();
        my.firstPlay = false;

        my.sprite.meteors = this.add.group({
            active: true,
            defaultKey: "meteor1",
            maxSize: 7,
            runChildUpdate: true
            }
        )

        my.sprite.meteors.createMultiple({
            classType: screenLoop,
            active: true,
            key: my.sprite.meteors.defaultKey,
            repeat: my.sprite.meteors.maxSize-1
        });


        
        

    }

    update() {
        super.update();
        if (this.wave == -1) {
            this.wave1();
        }


    }
        

    wave1() {
        my.fastEnemGroup.create(game.config.width, 300);
        my.slowEnemGroup.create(game.config.width, 500);
        my.slowEnemGroup.create(game.config.width, 100);
        this.wave = 1;
    }

    wave2() {
        my.fastEnemGroup.create(game.config.width, 300);

        this.time.addEvent({
            delay: 1000,
            callback: ()=>{
                my.fastEnemGroup.create(game.config.width, 500);
            },
            loop: false
        })

        this.time.addEvent({
            delay: 1500,
            callback: ()=>{
                my.fastEnemGroup.create(game.config.width, 100);
            },
            loop: false
        })

        this.wave = 2;
    }

    
    waveEnd() {
        //this.wave = -1;
        console.log("New WaveEnd Called");
        if (this.wave == 1) {
            this.wave2();
        } else if (this.wave == 2) {
            console.log("test");
            this.gameWin();
        }
    }


        

}