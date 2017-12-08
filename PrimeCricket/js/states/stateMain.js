var StateMain = {

    preload: function () {

    },
    
    create: function () {
        
        sky = game.add.image(-2,-2,"sky");
        sky.scale.setTo(wScale,hScale);
        
        game.physics.startSystem(Phaser.Physics.Arcade);
        
        primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47];
        nonPrimes = [1,4,6,8,9,10,12,14,15,16,18,20,21,22,24,25,26,27,28,30,32,33,34,35,36,38,39,40,42,44,45,46,48,49,50];
        
        //reset the score
        score = 0;
        ballSpeed = 200 * deviceScale;
        playerAnswer = 0;
        this.batAnimationPlaying = false;
        this.wicketAnimationPlaying = false;
        this.decideAnswer = false;
        
        p1 = new Phaser.Point(game.width, game.height - (deviceScale * 80 + 30 > 180 ? 180 : deviceScale * 80 + 30));
        
        p2 = new Phaser.Point(400, game.height - 75);
        p3 = new Phaser.Point(60, game.height - 125)
        
        thought = game.add.image(p3.x + 50, p2.y - 162, "thought");
        thought.anchor.set(0.7,1);
        thought.scale.setTo(1,0.6);
        
        player = game.add.image(p3.x +20 ,p3.y - 172,"yellow");
        player.anchor.set(0.5,0.5);
        player.scale.setTo(0.5,0.2);
        
        
        ball = game.add.sprite(p1.x, p1.y,"ball");
        ball.scale.setTo(0.5,0.5);
        ball.anchor.set(0.5,1);
        game.physics.arcade.enable(ball);
        
        var pitch = game.add.tileSprite(0, game.height - 75,game.width,75,"pitch");  
        
        character = game.add.sprite(p3.x+ 15, p2.y,"bat");
        character.anchor.set(0,1);
        character.animations.add("hit",[0,1,3,4,2,5,5,5,5,5,5,5,5,2,4,3,1,0],12,false);
        
        wicket = game.add.sprite(p3.x, p2.y, "wicket");
        wicket.anchor.set(1,1);
        wicket.animations.add("out",[0,1,3,4,2,5],12,false);
        
        primeButton = game.add.image(game.width,game.height,"blue");
        primeButton.anchor.set(1,1);
        primeButton.bringToTop();
        primeButton.inputEnabled = true;
        primeButton.events.onInputDown.add(this.primeClicked,this);
        primeButton.events.onInputUp.add(this.primeReleased,this);
        
        scoreText = game.add.text(game.world.width*0.95,game.world.height*0.05,"score: " + score);
        scoreText.fill = "#ffffff";
        scoreText.fontSize = 18 * deviceScale;
        scoreText.anchor.set(1,0);
        
        numberText = game.add.text(game.world.centerX,game.world.height*0.4,"0");
        numberText.fill = "#ffffff";
        numberText.fontSize = 45 * deviceScale;
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
        this.decideAnswer = false;
        
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
        //if ball hits ground head for wicket
        if(ball.y >= p2.y)
            {
                game.physics.arcade.moveToXY(ball, p3.x, p3.y, ballSpeed);
            }
        
        //start player bat animation when ball reaches certain proximity to player
        if(ball.x < p2.x - 50)
            {
                if(!this.batAnimationPlaying)
                    {
                        character.animations.play("hit");
                        this.batAnimationPlaying = true;
                    }
            }
        
        //deciding moment when answer is accepted. Ball is hit by bat or ball will continue to wicket
        if(ball.x < p2.x - 180 && !this.decideAnswer)
            {   
                if(playerAnswer == isPrime)
                    {
                        game.physics.arcade.moveToXY(ball, game.width, 0, ballSpeed*5);
                    }
                this.decideAnswer = true;
            }
        
        //if ball reaches wicket start wicket out animation
        if(ball.x < wicket.x+10)
            {
                if(!this.wicketAnimationPlaying)
                            {
                                wicket.animations.play("out");
                                this.wicketAnimationPlaying = true;
                                
                                game.time.events.add(Phaser.Timer.SECOND * 2, this.restartLevel, this);
                            }
                
            }
        
        
        // if ball is hit by bat and goes heigher than game height start new shot
        if(ball.x > game.width + 10)
            {
                score += 6;
                scoreText.text = "score: " + score;
            //    ball.body.velocity = 0;
                this.newShot();
            }
        
    },
    
    restartLevel:function()
    {
        game.state.start("StateOver");
    }

}