var StateTitle = {

    preload: function () {


    }
    , create: function () {
        
        sky = game.add.image(-2,-2,"sky");
        sky.scale.setTo(wScale,hScale);
        
        var pitch = game.add.tileSprite(0, game.height - 75,game.width,75,"pitch");  
        
        var titleText = game.add.text(game.world.centerX, game.world.centerY *0.2, "Prime Cricket", {font: "bold 36px Bowlby+One+SC", fill: "#3e9f77", stroke:  "#ffffff", strokeThickness: 8, align: "center"});
        
        titleText.anchor.set(0.5, 0);
        titleText.fontSize = 72;
        
        var instructionText = game.add.text(game.world.centerX, game.height -77, "Click 'Prime' or 'Not Prime' to decide if the number is a Prime number" , {font: "bold 36px Bowlby+One+SC", fill: "#ffffff", stroke:  "#ffffff", strokeThickness: 0, align: "center"});
        
        instructionText.anchor.set(0.5, 1);
        instructionText.fontSize = 24;
        
        this.btnStart = gameButtons.addMyButton("startbuttons",-1,-1,this.startGame, this);
        
        this.btnFullScreen = gameButtons.addFullScreenButton(game.width - 10,10,gameButtons.go_FullScreen,this);
        this.btnFullScreen.anchor.set(1,0);
        
        this.btnSound = gameButtons.addAudioButton("sound", 10, 10, gameButtons.toggleSound, this);
        this.btnSound.anchor.set(0,0);
        
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