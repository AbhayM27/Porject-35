//Create variables here
var dog, happyDog, database, foodS, foodStock; 
var feed, addFood, fedTime, lastFed, foodObj;
function preload()
{
  //load images here
  dog = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {
  createCanvas(900, 900);
  database = firebase.database(); 
  console.log(database);
  dogSprite = createSprite(550,250,50,50);
  dogSprite.addImage(dog);
  dog.resize(100,100);
  happyDog.resize(100,100);

  foodObj = new Food();

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);



  
  
  foodStock=database.ref('Food');
  foodStock.on("value", readStock); 
}


function draw() {  
background(46,139,87);

foodObj.display();

fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
});


  drawSprites();
  
  textSize(20);
  fill("black");
  text("Food Remaining " + foodS,40,80);
 

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12) {
    text("Last Feed : "+lastFed%12+ " PM",350,30);
  } else if(lastFed==0) {
    text("Last Feed : 12 AM", 350,30);
  } else {
    text("Last Feed : "+ lastFed + " AM",350,30);
  }

  }


function readStock(data) {
  foodS=data.val();




}

function writeStock(x) {

  if(x<=0) {
    x=0;
  } else {
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })


}

function addFoods() {
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

}

function feedDog() {
  dogSprite.addImage(happyDog);
    if(food !== undefined) {
      foodObj.updateFoodStock(foodObj.getFoodStock()-1);
      database.ref('Food').update({
        Food:foodObj.getFoodStock(),
        fedTime:hour() /// something is wrong with updateFoodStock fix it.
      })
    }
  




}


