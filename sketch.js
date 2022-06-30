var towerImg, tower;
var doorImg, doorsGroup;
var climberImg, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;

  ghost.debug = true;
}


function draw() {
  background(200);
  
  if(gameState == "play"){
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x +2;
    }
    if(keyDown("left_arrow")){
      ghost.x = ghost.x -2;
    }
    ghost.velocityY = ghost.velocityY + 1;

    if(tower.y > 400){
        tower.y = 300
      }
    spawnDoors();
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
      tower.destroy();
      doorsGroup.destroyEach();
      climbersGroup.destroyEach();
      invisibleBlockGroup.destroyEach();
    }
    if(ghost.isTouching(climbersGroup)){
      ghost.destroy();
      gameState = "win";
      tower.destroy();
      doorsGroup.destroyEach();
      climbersGroup.destroyEach();
      invisibleBlockGroup.destroyEach();
    }
  }
  if(gameState == "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
  if(gameState == "win"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Você Venceu", 210,250)
  }
  drawSprites();
}

function spawnDoors(){
  if(frameCount %240 == 0){
     var door = createSprite(200,-50);
     var climber = createSprite(200,10);
     var invisibleBlock = createSprite(200,15);

     climber.setCollider("rectangle",0,-2,100,10);

     door.addImage(doorImg);
     climber.addImage(climberImg);

     invisibleBlock.width = climber.width + 2;
     invisibleBlock.height = 2;

     invisibleBlock.visible = true;

     door.x = Math.round(random(120,400));

     climber.x = door.x;
     invisibleBlock.x = door.x;

    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    ghost.depth = door.depth +1;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

    climber.debug = true;
    
  }
}