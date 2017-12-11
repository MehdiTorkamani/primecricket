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
        game.load.spritesheet("startbuttons","images/ui/start.png",284,92);
        game.load.spritesheet("playagainbuttons","images/ui/playagain.png",284,92);
        game.load.spritesheet("prime","images/ui/prime.png",200,71);
        game.load.spritesheet("notprime","images/ui/notprime.png",200,71);
        game.load.spritesheet("audio","images/ui/myaudio.png",32,32);
        game.load.spritesheet("fullscreen","images/ui/fullscreen.png",32,32);
        
        game.load.audio("batsound", "audio/sfx/bat.mp3");
        game.load.audio("wicketsound", "audio/sfx/wicket.mp3");
        
        game.load.image("ball","images/cricket/ball.png");
        game.load.image("pitch","images/cricket/pitch.png");
        
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