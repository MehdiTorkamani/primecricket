var StateOver = {

    preload: function () {


    }
    , create: function () {
        sky = game.add.image(-2,-2,"sky");
        sky.scale.setTo(wScale,hScale);
        
        var pitch = game.add.tileSprite(0, game.height - 75,game.width,75,"pitch");  
        
        var overText = game.add.text(game.world.centerX, game.height *0.2, "OUT!");
        overText.fill = "#ffffff";
        overText.anchor.set(0.5, 0);
        overText.fontSize = 32;
        
        var lostText = number + (isPrime == 1 ? " is a prime number" : " is not a prime number");
        
        var infoText = game.add.text(game.world.centerX, game.height *0.3, lostText);
        infoText.fill = "#ffffff";
        infoText.anchor.set(0.5, 0);
        infoText.fontSize = 32;
        
        if(score == 60)
            {
                overText.text = "WELL DONE!";
                infoText.text = "You reached the max score!";
            }
        
        var finalScoreText = game.add.text(game.world.centerX, game.height *0.5, "SCORE: " + score);
        finalScoreText.fill = "#ffffff";
        finalScoreText.anchor.set(0.5, 0.5);
        finalScoreText.fontSize = 40;
        
        this.btnPlayAgain = gameButtons.addMyButton("playagainbuttons",game.world.centerX, game.height * 0.7,this.playAgain, this);
        
        this.btnFullScreen = gameButtons.addFullScreenButton(game.width - 10,10,gameButtons.go_FullScreen,this);
        this.btnFullScreen.anchor.set(1,0);
        
        this.btnSound = gameButtons.addAudioButton("sound", 10, 10, gameButtons.toggleSound, this);
        this.btnSound.anchor.set(0,0);
        
        //init the sound buttons
        gameButtons.updateButtons();
        
        
    }
    , playAgain: function () {
        game.time.events.add(Phaser.Timer.SECOND * 0.2, this.beginGame, this)  
    },
    
    beginGame: function () {
        game.state.start("StateMain");
    }
    , update: function () {

    }

}