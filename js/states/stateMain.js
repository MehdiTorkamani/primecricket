var StateMain = {

    preload: function () {

    },
    
    create: function () {
        
        var wScale = game.width / 800;
        var hScale = game.height / 500;
        
        sky = game.add.image(-2,-2,"sky");
        sky.scale.setTo(wScale,hScale);
        
        game.physics.startSystem(Phaser.Physics.Arcade);
        
        primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47];
        nonPrimes = [1,4,6,8,9,10,12,14,15,16,18,20,21,22,24,25,26,27,28,30,32,33,34,35,36,38,39,40,42,44,45,46,48,49,50];
        
        //reset the score
        score = 0;
        ballSpeed = 200;
        playerAnswer = 0;
        this.batAnimationPlaying = false;
        this.wicketAnimationPlaying = false;
        
        p1 = new Phaser.Point(game.width*1.5,game.height*0.4);
        p2 = new Phaser.Point(game.width/2,game.height - 75);
        p3 = new Phaser.Point(game.width/4,p2.y - 30)
        p4 = new Phaser.Point(game.width,0);
        
        
        player = game.add.image(p3.x,p3.y,"yellow");
        player.anchor.set(0.5,0.5);
        
        ball = game.add.sprite(p1.x, p1.y,"ball");
        ball.scale.setTo(0.05,0.05);
        ball.anchor.set(0.5,1);
        game.physics.arcade.enable(ball);
        
        var pitch = game.add.tileSprite(0, game.height - 75,game.width,75,"pitch");  
        
        character = game.add.sprite(p3.x-20, p2.y,"bat");
        character.scale.setTo(0.2,0.2);
        character.anchor.set(0.5,1);
        character.animations.add("hit",[0,1,3,4,2,5,5,2,4,3,1,0],12,false);
        
        wicket = game.add.sprite(p3.x - 100, p2.y, "wicket");
        wicket.scale.setTo(0.12,0.12);
        wicket.anchor.set(1,1);
        wicket.animations.add("out",[0,1,3,4,2,5],12,false);
        
        primeButton = game.add.image(game.width,game.height,"blue");
        primeButton.anchor.set(1,1);
        primeButton.bringToTop();
        primeButton.inputEnabled = true;
        primeButton.events.onInputDown.add(this.primeClicked,this);
        primeButton.events.onInputUp.add(this.primeReleased,this);
        
        scoreText = game.add.text(game.world.centerX,game.world.height*0.1,"score: " + score);
        scoreText.fill = "#ffffff";
        scoreText.fontSize = 16;
        scoreText.anchor.set(0.5,0.5);
        
        numberText = game.add.text(game.world.centerX,game.world.height*0.2,"0");
        numberText.fill = "#ffffff";
        numberText.fontSize = 16;
        numberText.anchor.set(0.5,0.5);
        
        this.newShot();
    },
    
    primeClicked:function()
    {
        player.loadTexture("blue",0);
        playerAnswer = 1;
    },
    
    primeReleased:function()
    {
        player.loadTexture("yellow",0);
        playerAnswer = 0;
    },
    
    newShot:function()
    {
        this.batAnimationPlaying = false;
        this.wicketAnimationPlaying = false;
        isPrime = game.rnd.integerInRange(0,1);
        
        if(isPrime==1)
        number = primes[game.rnd.integerInRange(0,14)];
        else
        number = nonPrimes[game.rnd.integerInRange(0,34)];
            
        numberText.text = number;
        
        ball.x = p1.x;
        ball.y = p1.y;
        game.physics.arcade.moveToXY(ball, p2.x, p2.y, ballSpeed);
        
    },

    update: function () {
        if(ball.y >= p2.y)
            {
                game.physics.arcade.moveToXY(ball, p3.x, p3.y, ballSpeed);
            }
        
        if(ball.x < (p2.x+p3.x)/2*0.8)
            {
                if(!this.batAnimationPlaying)
                    {
                        character.animations.play("hit");
                        this.batAnimationPlaying = true;
                    }
            }
        
        if(ball.x < p3.x)
            {   
                if(playerAnswer == isPrime)
                    {
                        game.physics.arcade.moveToXY(ball, p4.x, p4.y, ballSpeed*5);
                    }
            }
        
        if(ball.x < wicket.x+10)
            {
                if(!this.wicketAnimationPlaying)
                            {
                                wicket.animations.play("out");
                                this.wicketAnimationPlaying = true;
                                
                                game.time.events.add(Phaser.Timer.SECOND * 2, this.restartLevel, this);
                            }
                if(ball.x<-10)
                    {
                        ball.body.velocity = 0;
                    }
            }
        
        
        if(ball.y < p4.y)
            {
                score += 6;
                scoreText.text = "score: " + score;
                this.newShot();
            }
        
    },
    
    restartLevel:function()
    {
        game.state.start("StateOver");
    }

}