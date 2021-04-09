var Start=0;
var Play=1;
var End=2;
var Done=3;
var gameState=Start;
var titleScreen;
var BackgroundIma;
var title;
var button,buttonIma;
var player,playerIma;
var background1;
var obstaclesGroup;

function preload()
{
  titleScreen=loadImage("Images/Title.jpg");
  BackgroundIma=loadImage("Images/track.jpg");
  buttonIma=loadImage("Images/Button.PNG");
  playerIma=loadImage("Images/car2.png");
  obstacle1 = loadImage("Images/Cones.png");
  obstacle2 = loadImage("Images/Barrier.jpg");
}


function setup() 
{
  createCanvas(windowWidth,windowHeight);
  title=createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
  title.addImage("title",titleScreen);
  title.visible=false;

  background1=createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight*4);
  background1.addImage("title",BackgroundIma);
  background1.visible=false;

  button=createSprite(windowWidth/2,windowHeight/2+250,200,30);
  button.addImage("title",buttonIma);
  button.depth=title.depth;
  button.depth+=1

  player=createSprite(680,600,200,100);
  player.addImage("hi",playerIma);
  //player.scale=0.5;

  player.visible=false;

  obstaclesGroup = new Group();
}

function draw() {
  background(0);  

  if(gameState===Start)
  {
    title.visible=true;

    if (mousePressedOver(button))
    {
      gameState=Play;
    }
  }

  else if(gameState===Play)
  {
    button.visible=false;
    title.visible=false;

    background1.visible=true;
    background1.velocityY=8;

    spawnObstacles()

    if(background1.y>background1.height*1/4)
    {
      background1.y=windowHeight/2;
    }
    player.visible=true;

    if (keyDown("LEFT_ARROW") && player.x>455)
    {
      player.x-=10;
    }

    if (keyDown("RIGHT_ARROW") && player.x<910)
    {
      player.x+=10;
    }
  }

  drawSprites();
  fill("white");
  text(mouseX+","+mouseY,mouseX,mouseY);
}

function spawnObstacles() 
{
  if(frameCount % 60 === 0) 
  {
    var obstacle = createSprite(600,0,100,140);
    obstacle.x = Math.round(random(500,850));
    //obstacle.debug = true;
    obstacle.velocityY = 8;
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) 
    {
      case 1: obstacle.addImage(obstacle1);
              obstacle.scale = 0.05;
              break;
      case 2: obstacle.addImage(obstacle2);
              obstacle.scale = 0.25;
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}