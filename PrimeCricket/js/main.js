var game;
var score;
var highScore;
var soundOn = true;
var musicOn = true;
var wrongTag = "";
var gameButtons
var gameMedia

//Cricket Variables
var p1;
var p2;
var p3;
var p4;

var wScale;
var hScale;

var ball;
var ballSpeed;

var player;
var character;
var primeButton;
var playerAnswer;
var wicket;

var scoreText;
var number;
var numberText;

var primes;
var nonPrimes;
var isPrime;

var sky;

var batsound;
var wicketsound;


//portrait or landscape

var useLandscape = true;
//place your globals here


window.onload = function () {
    if (screen.width > 1500) {
        //desktop laptop
        if (useLandscape == true) {
            game = new Phaser.Game(960, 540, Phaser.AUTO, "ph_game",null,true);
        } else {

            game = new Phaser.Game(540, 960, Phaser.AUTO, "ph_game",null,true);
        }

    } else {
        //mobile device
        if (useLandscape == true) {
     //      game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO,"ph_game");
            
            game = new Phaser.Game(960, 540, Phaser.AUTO, "ph_game",null,true);
        } else {

            game = new Phaser.Game(540, 960, Phaser.AUTO, "ph_game",null,true);
        }
        
 //     Alternative Method  
        //game = new Phaser.Game(window.innerWidth>window.innerHeight ? window.innerWidth : window.innerHeight, window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth, Phaser.AUTO, "ph_game",null,true);
    }
    if (screen.width < 1500) {
        if (useLandscape == true) {
            wrongTag = "wrongWayLandscape";
        } else {
            wrongTag = "wrongWayPortrait";
        }
    }


    gameMedia = new GameMedia();
    gameButtons = new GameButtons();


    //add a state or screen to the game
    game.state.add("StateMain", StateMain);
    game.state.add("StateLoad", StateLoad);
    game.state.add("StateInit", StateInit);
    game.state.add("StateTitle", StateTitle);
    game.state.add("StateOver", StateOver);

    game.state.start("StateInit");
}