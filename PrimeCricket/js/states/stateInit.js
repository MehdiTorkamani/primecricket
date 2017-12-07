var StateInit = {

    preload: function () {
        var wScale = game.width / 800;
        var hScale = game.height / 500;
        
        sky = game.add.image(-2,-2,"sky");
        sky.scale.setTo(wScale,hScale);
        
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        
        game.stage.backgroundColor = "#6ad352"
        
        game.load.image("loadingEmpty", "images/loading/progress_none.png");
        game.load.image("loadingFull", "images/loading/progress_all.png");
       

        if (screen.width < 1500) {
            if (useLandscape == true) {
                game.scale.forceOrientation(true, false);
            } else {
                game.scale.forceOrientation(false, true);
            }


            game.scale.enterIncorrectOrientation.add(this.wrongWay, this);
            game.scale.leaveIncorrectOrientation.add(this.rightWay, this);
        }

    }
    , create: function () {
        game.state.start("StateLoad");
    }
    , update: function () {

    }
    , rightWay: function () {
        document.getElementById(wrongTag).style.display = "none";
    }
    , wrongWay: function () {
        document.getElementById(wrongTag).style.display = "block";
    }

}