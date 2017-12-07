var StateOver = {

    preload: function () {


    }
    , create: function () {
        
        var wScale = game.width / 800;
        var hScale = game.height / 500;
        
        sky = game.add.image(-2,-2,"sky");
        sky.scale.setTo(wScale,hScale);
        
        var overText = game.add.text(game.world.centerX, game.world.centerY *0.2, "OUT!");
        overText.fill = "#ffffff";
        overText.anchor.set(0.5, 0.5);
        overText.fontSize = 24;
        
        var lostText = "Wrong answer: " + number + (isPrime == 1 ? " is a prime number." : " is not a prime number.");
        
        var infoText = game.add.text(game.world.centerX, game.world.centerY *0.4, lostText);
        infoText.fill = "#ffffff";
        infoText.anchor.set(0.5, 0.5);
        infoText.fontSize = 16;
        
        var finalScoreText = game.add.text(game.world.centerX, game.world.centerY *0.6, "Final score: " + score);
        finalScoreText.fill = "#ffffff";
        finalScoreText.anchor.set(0.5, 0.5);
        finalScoreText.fontSize = 16;

        this.btnPlayAgain = gameButtons.addButton("playAgain", -1, -1, this.playAgain, this);
    }
    , playAgain: function () {
        game.state.start("StateMain");
    }
    , update: function () {

    }

}