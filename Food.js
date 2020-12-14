class Food {
    constructor() {
        var foodStock;
        var lastFed;
        this.image = loadImage("Milk.png");
        
}




getFoodStock() {
 var foodStock = database.ref('Food');
 foodStock.on("value",function(data){
    foodStock = data.val();
})
}

updateFoodStock(x){
    database.ref('/').update({
    Food: x 
})
    
 
}

deductFood() {
if(x<=0) {
    x=0;
  } else {
    x=x-1;
  }
}

display() {
    var x=80, y=100;

    imageMode(CENTER);
    image(this.image,720,220,70,70);
    
    if(this.foodStock!=0) {
        for(var i=0; i<this.foodStock;i++){
            if(i%10==0) {
                x=80;
                y=y+50;
            }
            this.image(this.image,x,y,70,70);
            x=x+30;
        }
    }






}



}