// create variables here

var gameState=0;
var playerCount;
var database;
var form,player,game;
var allPlayers;

var player, playerImage;
var ground;
var brickImage,brickGroup;
var brick;
var playerImage1;

var title;
var onlinePlay,Survivel,upgradeGun;
var onlinePlayImage;

var survivelImage;
var play1,play2;

var coin,coinImage;
var bomb,bombImage;
var coinText=0

var greeting1,greeting2;
var bombExploding;

var groundImage;
var invisibleGround;
var index;

var bombSound,playerJumpSound;
var gunSound,greeting1Sound;
var backGroundSound;

var leftPlayer,leftPlayerStanding;
var goBack,back;

var gun,bullet;
var upWall,leftWall;

var ground;

// function preload for adding images

function preload(){

   leftPlayer=loadAnimation("images/leftPlayer1.png","images/leftPlayer2.png","images/leftPlayer3.png","images/leftPlayer4.png","images/leftPlayer5.png","images/leftPlayer6.png")

   leftPlayerStanding=loadAnimation("images/leftPlayer1.png")

    /*bombSound=loadSound("sounds/bombSound.")

    playerJumpSound=loadSound("sounds/bombSound.")

    gunSound=loadSound("sounds/gunSound.")

    greeting1Sound=loadSound("sounds/greeting1Sound.")

    backGroundSound=loadSound("sounds/backGroundSound.")*/
    

    bombExploding=loadImage("images/bombExploding.png")
    
    coinImage=loadImage("images/coin.png")

    bombImage=loadImage("images/bomb.png")

    onlinePlayImage=loadImage("images/onlineplay.png")

    playerImage1=loadAnimation("images/player1.png")

    brickImage=loadImage("images/brick.png")

    playerImage=loadAnimation("images/player1.png","images/player2.png","images/player3.png","images/player4.png","images/player5.png","images/player6.png")

    survivelImage=loadImage("images/playsurvivel.png")

    groundImage=loadImage("images/ground.png")
}

// functionpreload ending

// function setup for creating sprites and repeating code at once

function setup(){
 canvas=createCanvas(displayWidth,displayHeight)

database=firebase.database()

ground=createSprite(width*100000000000,height,width*10000000000000000000,displayHeight)
ground.x=ground.width1/2
ground.addImage(groundImage)

play1=createSprite()

onlinePlay=createSprite(700,450)
onlinePlay.addImage(onlinePlayImage)

Survivel=createSprite(700,200)
Survivel.addImage(survivelImage)

survivel=createGroup()
survivel.add(play1)
survivel.add(Survivel)

player=createSprite(500,400,10,10)
player.addAnimation("standing",playerImage1)
player.addAnimation("running",playerImage)
player.addAnimation("explode",bombExploding)
player.addAnimation("back",leftPlayerStanding)
player.addAnimation("backRunning",leftPlayer)

coin=createSprite(500,500)
coin.addImage(coinImage)

bomb=createSprite(800,520)
bomb.addImage(bombImage)


}

// function setup ending

// function draw for repeating code

function draw(){
    background("white")
    rectMode(CENTER)
    
    
    play1.visible=false
    coin.visible=false
    bomb.visible=false
    player.visible=false

    // starting gameState 0

if(gameState===0){
    if(mousePressedOver(Survivel)){
        gameState=play1
        Survivel.visible=false
        onlinePlay.visible=false
    }

    if(mousePressedOver(onlinePlay)){
        gameState=1
        onlinePlay.visible=false
        Survivel.visible=false
    }
}

// gameState 0 if condition ending

// starting gameState 1
   if(gameState===1){
    game=new Game()
    game.getState()
    game.start()
    
    }

    // gameState 1 ending
   
    // starting gameState play

    if(gameState===play1){
    background("white")
 
     ground.visible=true

     camera.position.x = player.x;

    ground.depth=player.depth
    player.depth+=1
    
    invisibleGround=createSprite(700,600,100000000000000000000000000000000000000000000000000000000000000000,30)

    invisibleGround.visible=false

    player.collide(invisibleGround)

    bomb.visible=true
    coin.visible=true
    player.visible=true
    player.setCollider("rectangle",0,0,50,90)
    player.velocityY=player.velocityY+4
   
    upWall=createSprite(100000,40,10000000000000000000000000000000000000000000000000000000000000000000000,40)
    upWall.visible=false

    leftWall=createSprite(-435,400,340,100000000000000000000000000000)
    leftWall.visible=false

    player.collide(leftWall)
    player.collide(upWall)

    if(keyDown("space")){
        player.velocityY=-30
    }

   else if(keyWentUp("left")){
       player.changeAnimation("back",leftPlayerStanding)
   }

    else if(keyDown("left")){
        player.x=player.x-15
        player.changeAnimation("backRunning",leftPlayer)
    }

    else if(keyDown("right")){
        player.x=player.x+15
        player.changeAnimation("running",playerImage)
    }

    else if (keyWentUp("right")){
        player.changeAnimation("standing",playerImage1)
     }

     
     else if(player.isTouching(coin)){
         coinText+=1
         coin.visible=false
    }

else if(player.x>=displayWidth){
    ground.x+=400
}

    player.collide(ground)

    
    
    if(player.isTouching(bomb)){
        player.changeAnimation("explode",bombExploding,3000)
            bomb.visible=false
            gameState=greeting1
         }

          if(keyDown("enter")){
       bullet=createSprite(player.x+70,player.y-17,10,2)
       bullet.velocityX=70
         }
  
   
}

// gameState play1 ending

// gameState greeting1 starting
if(gameState===greeting1){
//enemy.visible=false
coin.visible=false
bomb.visible=false
ground.visible=false

}
// gameState greeting 1 ending

    drawSprites()
}

// function draw ending
function spawnBricks(){
    if(frameCount% 300===0){
    brick=createSprite(800,180,20,20)
    brick.addImage(brickImage)
    brick.y=Math.round(random(180,400))
    brick.x=Math.round(random(1300,1350))
    brick.velocityX=-10
    player.collide(brick)
    } 
}


    

