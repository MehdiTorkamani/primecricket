var StateTitle = {

    preload: function () {


    }
    , create: function () {
        
        var wScale = game.width / 800;
        var hScale = game.height / 500;
        
        sky = game.add.image(-2,-2,"sky");
        sky.scale.setTo(wScale,hScale);
        
        var titleText = game.add.text(game.world.centerX, game.world.centerY - 100, "Prime Cricket");
        titleText.fill = "#ffffff";
        titleText.anchor.set(0.5, 0.5);

        this.btnStart = gameButtons.addButton("start", -1, -1, this.startGame, this);
        
        
    }
    , startGame: function () {
        game.state.start("StateMain");
    }
    , update: function () {

    }

}