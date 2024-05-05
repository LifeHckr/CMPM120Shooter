// Jarod Spangler
// Created: 5/3/24
// Phaser: 3.70.0
//
// The gallery shooter game I had to make in Phaser
//
// Using Kenny asset packs: Space Shooter Redux
// and Space Shooter Extension

"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: false  // prevent pixel art from getting blurred when scaled
    },
    fps: { forceSetTimeOut: true, target: 60 },
    width: 1200,
    height: 640,
    scene: [Start, level1, GameOver, Winner] //[Start, PewPew, Over]
}

var my = {sprite: {}};
my.lifeCount;
my.scoreCount;
my.highScore;
my.initialize = (param) => {
    my.lifeCount = 5;
    my.scoreCount = 0;
}


const game = new Phaser.Game(config);