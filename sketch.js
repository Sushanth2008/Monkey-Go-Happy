var monkey;

var mon;

var monke;

var banana;

var stone;

var back;

var ground;

var serve=0;

var play=1;

var end=2;

gamestate=0;

var banana1=0;

var score=0;

var monks=0;

function preload(){
  
monkeyimage=loadAnimation("Monkey1.png","Monkey2.png","Monkey3.png","Monkey4.png","Monkey5.png","Monkey6.png","Monkey7.png","Monkey8.png","Monkey9.png","Monkey10.png");
 
monimage=loadImage("Monkey6.png") 
  
monkssound=loadSound("monkey1.mp3")  
  
monkeimage=loadImage("Monkey5.png") 
  
bananaimage=loadImage("Banana.png");
                      
stoneimage=loadImage("stone.png");
  
backimage=loadImage("jungle.jpg");
  
groundimage=loadImage("ground.jpg");
  

  
}

function setup(){
  
createCanvas(700,400);
  
back=createSprite(200,50,10,10);
back.addAnimation("back",backimage);
back.scale=1.4
back.x=back.width/2;
  
monk=createSprite(70,300,10,10);
monk.addAnimation("jumper",monkeimage) 
monk.addAnimation("jump",monimage);
monk.addAnimation("running",monkeyimage);
monk.scale=0.12;
  
invisible=createSprite(350,330,700,10);
invisible.visible=false;  
  
bananaGroup=createGroup();
  
stone1Group=createGroup();

}

function draw(){
  
  background("white");
 
  monk.collide(invisible);
  
  
 
  if(gamestate==0){ 
    
    monk.visible=true;
    
    back.velocityX=0;

    drawSprites();
    
    textSize(49);
    fill("red");
    text("PRESS ENTER TO START",0,200) 
  
  
  if(keyDown("ENTER") && gamestate==0){
  gamestate=1;
  //monkssound.play();
     }
  }
  
  if(monk.isTouching(bananaGroup)){
banana1=banana1+1;
bananaGroup.destroyEach();
} 
  
  if(gamestate==1){
    
monk.changeAnimation("running",monkeyimage);
    
back.velocityX=-8
  
if(keyDown("space") && monk.y>288){
monk.velocityY=-12;
}

if(monk.y<288){
  
monk.changeAnimation("jump",monimage)
}
  
monk.velocityY=monk.velocityY+0.5;
  
if(back.x<0){
 back.x=back.width/2; 
}
    
score=score+3*Math.round(World.frameRate/60);
  
  food();
  
  stone1();
    
  drawSprites();
    
  textSize(20);
  fill("red");
  text("SCORE:"+score,450,30);
    
  textSize(20);
  fill("red");
  text("BANANA:"+ banana1,450,55);    
    
}

  if(monk.isTouching(stone1Group)){
gamestate=end;
  }
  
  if(gamestate==end){
    reset();
  textSize(20);
  fill("red");
  text("SCORE:0",450,30);
  
  textSize(20);
  fill("red");
  text("BANANA:0",450,55);    
    
  }
  
 if(keyDown("r")){
   
   gamestate=0;
   stone1Group.destroyEach();
   bananaGroup.destroyEach();
   
 }
  
}

function reset(){
  
score=0;  
banana1=0;
back.velocityX=0;
stone1Group.setLifetimeEach(-1);
stone1Group.setVelocityXEach(0);
bananaGroup.setVelocityXEach(0);
bananaGroup.setLifetimeEach(-1);
monk.collide(stone1Group);
monk.visible=false;
monk.changeAnimation("jumper",monkeimage) ;
drawSprites();
textSize(40);
fill("red");
text("YOU LOSE",200,150);
text("PRESS R TO RESTART",100,200);
}

function food(){

  if(frameCount%120==0){
  banana=createSprite(700,700,10,10);
  banana.addAnimation("food",bananaimage);
  banana.scale=0.04
  banana.velocityX=-8;
  var rand=Math.round(random(130,180));
  banana.y=rand; 
  banana.setLifetime=300
  bananaGroup.add(banana);
  }
}

function stone1(){
  
 if(frameCount%180==0){ 
   
var stone1=createSprite(600,290,10,10);
stone1.addAnimation("stone.png",stoneimage);
stone1.scale=0.3
stone1.velocityX=-8;
stone1.setCollider("circle",0,0,170);
stone1.setLifetime=300
stone1Group.add(stone1);  
   
 } 
}

