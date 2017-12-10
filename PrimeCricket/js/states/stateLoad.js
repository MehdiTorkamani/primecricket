var StateLoad = {

    preload: function () {
        
        game.load.image("sky","images/cricket/skysheet.png");
        
        var empty = game.add.image(0, 0, "loadingEmpty");
        var full = game.add.image(0, 0, "loadingFull");

        center(empty);
        full.anchor.set(0, 0.5);
        full.x = game.world.centerX - empty.width / 2;
        full.y = empty.y;

        game.load.setPreloadSprite(full);

        //PRELOAD EVERYTHING HERE
        game.load.spritesheet("buttons", "images/ui/buttons-red.png", 265, 75);
        game.load.spritesheet("startbuttons","images/ui/start.png",284,92);
        game.load.spritesheet("playagainbuttons","images/ui/playagain.png",284,92);
        game.load.spritesheet("prime","images/ui/prime.png",200,71);
        game.load.spritesheet("notprime","images/ui/notprime.png",200,71);
        game.load.spritesheet("audio","images/ui/myaudio.png",32,32);
        game.load.spritesheet("fullscreen","images/ui/fullscreen.png",32,32);
        
        
        game.load.spritesheet("soundButtons", "images/ui/soundButtons-blue.png", 44, 44, 4);
        game.load.audio("backgroundMusic", "audio/background/piano.mp3");
        game.load.audio("elephant", "audio/sfx/elephant.mp3");
        game.load.audio("batsound", "audio/sfx/bat.mp3");
        game.load.audio("wicketsound", "audio/sfx/wicket.mp3");
        
        
        game.load.image("ball","images/cricket/ball.png");
        game.load.image("pitch","images/cricket/pitch.png");
        game.load.image("blue","images/cricket/blocks/blue.png");
        game.load.image("yellow","images/cricket/blocks/yellow.png");
        game.load.image("red","images/cricket/blocks/red.png");
        game.load.image("green","images/cricket/blocks/green.png");
        game.load.image("thought","images/main/thought.png");
        
        game.load.image("hit1","images/cricket/hit1.png");
        game.load.image("hit2","images/cricket/hit2.png");
        game.load.image("hit3","images/cricket/hit3.png");
        game.load.image("hit4","images/cricket/hit4.png");
        game.load.image("hit5","images/cricket/hit5.png");
        game.load.image("hit6","images/cricket/hit6.png");
        game.load.spritesheet("bat","images/cricket/spritesheet.png",200,160,6);
        game.load.spritesheet("wicket","images/cricket/wicketspritesheet.png",120,97,6);
        
        
    },

    create: function () {
        deviceScale = game.width/480;
        
        wScale = game.width / 950;
        hScale = game.height / 598;
        
        sky = game.add.image(-2,-2,"sky");
        sky.scale.setTo(wScale,hScale);
        
        game.state.start("StateTitle");
    },

    update: function () {
        
    }

}