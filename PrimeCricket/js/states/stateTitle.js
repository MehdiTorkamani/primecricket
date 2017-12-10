var StateTitle = {

    preload: function () {


    }
    , create: function () {
        
        sky = game.add.image(-2,-2,"sky");
        sky.scale.setTo(wScale,hScale);
        
        var pitch = game.add.tileSprite(0, game.height - 75,game.width,75,"pitch");  
        
        var titleText = game.add.text(game.world.centerX, game.world.centerY *0.2, "Prime Cricket", {font: "bold 36px Bowlby+One+SC", fill: "#3e9f77", stroke:  "#ffffff", strokeThickness: 8, align: "center"});
        
        titleText.anchor.set(0.5, 0);
        titleText.fontSize = 36*deviceScale;
        

    //    this.btnStart = gameButtons.addButton("start", -1, -1, this.startGame, this);
        this.btnStart = gameButtons.addMyButton("startbuttons",-1,-1,this.startGame, this);
        
        this.btnStart.scale.setTo(deviceScale/2,deviceScale/2);
        
        this.btnSound = gameButtons.addAudioButton("sound", 20, 70, gameButtons.toggleSound, this);
        
        
        batsound = game.add.audio("batsound");
        wicketsound = game.add.audio("wicketsound");
        
        //init the sound buttons
        gameButtons.updateButtons();
        
    }
    ,
    
    startGame: function () 
    {
        game.time.events.add(Phaser.Timer.SECOND * 0.2, this.beginGame, this)  
    },
    
    beginGame: function () {
        game.state.start("StateMain");
    }
    , update: function () {

    }

}