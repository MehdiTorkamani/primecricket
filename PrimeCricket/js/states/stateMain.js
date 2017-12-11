var StateMain = {

    preload: function () {

    },
    
    create: function () {
        sky = game.add.image(-2,-2,"sky");
        sky.scale.setTo(wScale,hScale);
        
        game.physics.startSystem(Phaser.Physics.Arcade);
        
        primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];
        nonPrimes = [1,4,6,8,9,10,12,14,15,16,18,20,21,22,24,25,26,27,28,30,32,33,34,35,36,38,39,40,42,44,45,46,48,49,50,51,52,54,55,56,57,58,60,62,63,64,65,66,68,69,70,72,74,75,76,77,78,80,81,82,84,85,86,87,88,90,91,92,93,94,95,96,98,99,100];
        
        score = 0;
        ballSpeed = 360;
        playerAnswer = -1;
        nprime = 3;
        nnonprime = 3;
        this.batAnimationPlaying = false;
        this.wicketAnimationPlaying = false;
        this.decideAnswer = false;
        this.newShotCalled = false;
        
        p1 = new Phaser.Point(game.width, game.height - 180);
        p2 = new Phaser.Point(400, game.height - 75);
        p3 = new Phaser.Point(60, game.height - 125)
        
        ball = game.add.sprite(p1.x, p1.y,"ball");
        ball.scale.setTo(0.5,0.5);
        ball.anchor.set(0.5,1);
        game.physics.arcade.enable(ball);
        ball.body.allowGravity = false;
        
        var pitch = game.add.tileSprite(0, game.height - 75,game.width,75,"pitch");  
        
        character = game.add.sprite(p3.x+ 15, p2.y,"bat");
        character.anchor.set(0,1);
        character.animations.add("hit",[0,1,3,4,2,5,5,5,5,5,5,5,5,2,4,3,1,0],12,false);
        
        wicket = game.add.sprite(p3.x, p2.y, "wicket");
        wicket.anchor.set(1,1);
        wicket.animations.add("out",[0,1,3,4,2,5],12,false);
        
        btnPrime = game.add.image(game.width -2, game.height - 2,"prime");
        btnPrime.anchor.set(1,1);
        btnPrime.bringToTop();
        btnPrime.inputEnabled = true;
        btnPrime.events.onInputDown.add(this.primeClicked,this);
        btnPrime.frame = 1;
        
        btnNotPrime = game.add.image(game.width -204, game.height -2,"notprime");
        btnNotPrime.anchor.set(1,1);
        btnNotPrime.bringToTop();
        btnNotPrime.inputEnabled = true;
        btnNotPrime.events.onInputDown.add(this.primeReleased,this);
        btnNotPrime.frame = 1;
        
        scoreText = game.add.text(game.width*0.95,game.height*0.05, score);
        scoreText.fill = "#ffffff";
        scoreText.fontSize = 36;
        scoreText.anchor.set(1,0);
        
        numberText = game.add.text(game.width/2,game.height*0.4,"0");
        numberText.fill = "#ffffff";
        numberText.fontSize = 36;
        numberText.anchor.set(0.5,0.5);
        
        this.newShot();
    },
    
    primeClicked:function()
    {
        btnPrime.frame = 0;
        btnNotPrime.frame = 1;
        playerAnswer = 1;
    },
    
    primeReleased:function()
    {
        btnPrime.frame = 1;
        btnNotPrime.frame = 0;
        playerAnswer = 0;
    },
    
    newShot:function()
    {
        if(score==60)
            {
                game.state.start("StateOver");
            }
        
        this.batAnimationPlaying = false;
        this.wicketAnimationPlaying = false;
        this.decideAnswer = false;
        this.newShotCalled = true;

        ball.reset(p1.x,p1.y);
        
        isPrime = game.rnd.integerInRange(0,1);
        
        if(score%3==0)
            {
                 nprime+=1;
                 nnonprime+=3;
            }
        
        if(isPrime==1)
        number = primes[game.rnd.integerInRange(0,nprime)];
        else
        number = nonPrimes[game.rnd.integerInRange(0,nnonprime)];
            
        numberText.text = number;

        game.physics.arcade.moveToXY(ball, p2.x, p2.y, ballSpeed);
    },

    update: function () {
        //if ball hits ground head for wicket
        if(ball.y >= p2.y)
            {
                game.physics.arcade.moveToXY(ball, p3.x, p3.y, ballSpeed);
                this.newShotCalled = false;
            }
        
        
        //start player bat animation when ball reaches certain proximity to player
        if(ball.x < p2.x - 80)
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
                        gameMedia.playSound(batsound);
                        game.physics.arcade.moveToXY(ball, game.width, 0, ballSpeed * 4);
                    }
                this.decideAnswer = true;
            }
        
        //if ball reaches wicket start wicket out animation
        if(ball.x < wicket.x+10)
            {
                if(!this.wicketAnimationPlaying)
                            {
                                wicket.animations.play("out");
                                gameMedia.playSound(wicketsound);
                                this.wicketAnimationPlaying = true;
                                
                                game.time.events.add(Phaser.Timer.SECOND * 2, this.restartLevel, this);
                            }
            }
        
        
        // if ball is hit by bat and goes further than game width + 10 then add score and start new shot
        if(ball.x > game.width + 10 && !this.newShotCalled)
            {
                score ++;
                scoreText.text = score;
                this.newShot();
            }
        
    },
    
    restartLevel:function()
    {
        game.state.start("StateOver");
    }

}