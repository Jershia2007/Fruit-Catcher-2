class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x = 100;
        var y = 200;
        var index =0;
        drawSprites();

        for(var plr in allPlayers){
        
            index = index+1;
            x = 500 - allPlayers[plr].distance;
            y = 500;
            
            players[index -1].x = x;
            players[index - 1].y = y;

            // Differentiate the main player by printing
            // the name of the player on the basket. 
            if(index === player.index){
                stroke("yellow");
                strokeWeight(1.5);
                textAlign(CENTER);
                fill("black");
                textSize(25);
                text(allPlayers[plr].name ,x-25,y+25);

                /*  if(fruitGroup.isTouching(players[index - 1])){
                            for (var i = 0; i < fruitGroup.length; i++){
                                if(fruitGroup.get(i).isTouching(players[index-1])){
                                    fruitGroup.get(i).remove();
                                    player.score++;
                                    player.update();
                                }
                            }
                }*/
          }
                stroke("yellow");
                strokeWeight(1.5);
                textAlign(CENTER);
                textSize(24);
                fill("white");
                text(allPlayers.player1.name + " : " + allPlayers.player1.score,100,200);
                text(allPlayers.player2.name + " : " + allPlayers.player2.score,100,230);
        }
        // Give movements for the players using arrow keys
           if(keyIsDown(RIGHT_ARROW) && player.index !== null){
               player.distance -= 10
               player.update();
           }
          
            if(keyIsDown(LEFT_ARROW) && player.index !== null){
                player.distance += 10
                player.update();
            }

        // Create and spawn fruits randomly
        if(frameCount % 20 === 0){

            fruits = createSprite(random(100,1000),0,100,100);
            fruits.velocityY = 6;

            var r = Math.round(random(1,5));
            if(r === 1){
                fruits.addImage(fruit1_img);
            } else if (r === 2){
                fruits.addImage(fruit2_img);
            } else if (r === 3){
                fruits.addImage(fruit3_img);
            } else if (r === 4){
                fruits.addImage(fruit4_img);
            } else {
                fruits.addImage(fruit5_img);
            }

            fruitGroup.add(fruits);

        }
            if(player.index !== null){
                for (var i = 0; i < fruitGroup.length; i++){
                    if(fruitGroup.get(i).isTouching(players)){
                        fruitGroup.get(i).destroy();
                        player.score = player.score+1;
                        player.update();
                    }
                }
            }

            if(player.score >= 10){
                this.end();
            }
    }
    end(){
       console.log("Game Ended");
       game.update(2);
       clear();
       background("green");
       fill("blue");
       textSize(100);
       text("Game Over",400,300);
    }
}