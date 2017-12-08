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
        overText.fontSize = 16 * deviceScale;
        
        var lostText = number + (isPrime == 1 ? " is a prime number" : " is not a prime number");
        
        var infoText = game.add.text(game.world.centerX, game.height *0.3, lostText);
        infoText.fill = "#ffffff";
        infoText.anchor.set(0.5, 0);
        infoText.fontSize = 16 * deviceScale;
        
        var finalScoreText = game.add.text(game.world.centerX, game.height *0.5, "FINAL SCORE: " + score);
        finalScoreText.fill = "#ffffff";
        finalScoreText.anchor.set(0.5, 0.5);
        finalScoreText.fontSize = 20 * deviceScale;

        this.btnPlayAgain = gameButtons.addButton("playAgain", game.world.centerX, game.height * 0.7, this.playAgain, this);
        
        this.btnPlayAgain.scale.setTo(deviceScale/2,deviceScale/2);
    }
    , playAgain: function () {
        game.state.start("StateMain");
    }
    , update: function () {

    }

}