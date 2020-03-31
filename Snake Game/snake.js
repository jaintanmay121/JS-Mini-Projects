function init(){
    canvas=document.getElementById('myCanvas');
    W=H=canvas.height=canvas.width=1000;
    pen=canvas.getContext('2d');
    cs=66;
	gameOver=false;
	score=5;
	
	foodImg=new Image();
	foodImg.src="appl.png"

	food=getFood();

    snake = {
        init_length:5,
        color:"yellow",
        cells:[],
		direction:"right",
		
        createSnake:function(){
            for(var i=this.init_length;i>0;i--){
                this.cells.push({x:i,y:0});
            }
        },
		drawSnake: function(){
		    for(let i=0; i<this.cells.length; i++){
				pen.fillStyle=this.color;
				pen.fillRect(this.cells[i].x*cs, this.cells[i].y*cs, cs-3, cs-3) 
			    }
		},
        updateSnake:function(){

			var headY = this.cells[0].y;			//cells[0] contains the latest head which is to be created
			var headX = this.cells[0].x;									
			
			if(headX==food.x && headY==food.y){				//Checks for food.index==Head.index and avoids popping old cell to increase length of snake
				food=getFood();			
				score+=5;
			}
			else											
				this.cells.pop();						//Else removes the last element, i.e. cells[cells.length-1]
            
			if(this.direction=='right'){
				nextX=headX+1;
				nextY=headY;
			}
			if(this.direction=='left'){
				nextX=headX-1;
				nextY=headY;
			}
			if(this.direction=='up'){
				nextX=headX;
				nextY=headY-1;
			}
			if(this.direction=='down'){
				nextX=headX;
				nextY=headY+1;
			}

			for(let i=0; i<snake.cells.length; i++){
				if(nextX==snake.cells[i].x && nextY==snake.cells[i].y)
					gameOver=true;
			}

			console.log(this.cells[0])
			if(this.cells[0].x>this.cs/this.init_length+1 || this.cells[0].y>this.cs/this.init_length+1 || this.cells[0].x<0 || this.cells[0].y<0)
				console.log(this.cells[0])

			this.cells.unshift({x:nextX, y:nextY});			//Adds the position of new node to be created
			
			var lastX=Math.round(W/cs);
			var lastY=Math.round(H/cs);
			
			if(this.cells[0].x>lastX || this.cells[0].y>lastY || this.cells[0].x<0 || this.cells[0].y<0 )
				gameOver=true;
			
		},

	};

	
	snake.createSnake();  

	function keyPressed(e){
		if(e.key=="ArrowUp" && snake.direction!="down")
			snake.direction="up";
		else if(e.key=="ArrowDown" && snake.direction!="up")
			snake.direction="down";
		else if(e.key=="ArrowLeft" && snake.direction!="right")
			snake.direction="left";
		else if(e.key=="ArrowRight" && snake.direction!="left")
			snake.direction="right";
	}

	document.addEventListener('keydown', keyPressed) 
	

}

function draw(){
	pen.clearRect(0,0,W,H)
	snake.drawSnake();
	pen.drawImage(foodImg, food.x*cs, food.y*cs, cs, cs);
	pen.fillStyle='blue';
	pen.font="40px Roboto";
	pen.fillText("Score: "+score, 50, 50)
}

function update(){
	snake.updateSnake();
	
}

function getFood(){
	var foodX=Math.round(Math.random()*(W-cs)/cs);
	var foodY=Math.round(Math.random()*(H-cs)/cs);
	 
	var food={
		x: foodX,
		y: foodY,
		color:'red'
	}
	return food;
}

function gameLoop(){
    if(gameOver==false){
		draw();
		update();
	}
	else{
		clearInterval(f);
		alert("Game Over");
	}

}


init();
var f=setInterval(gameLoop,100)