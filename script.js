let inputDir = { x: 0, y: 0};
let foodSound = new Audio('./music/food.mp3');
let gameOverSound = new Audio('./music/gameOver.mp3');
let moveSound = new Audio('./music/move.mp3');
let musicSound = new Audio('./music/music.mp3');
let snakeArr = [{ x: 13, y: 15 }];
food={x:6,y:7};
let speed = 15;
let score=0;

// Get the board element
const board = document.querySelector('.board');

// Initialize lastPaintTime
let lastPaintTime = 0;

// Game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}


//function if the snake has been collided
function isCollide(snake){
    // if you bump in yourself
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }

    }
    //if you  bump into the wall
    if(snake[0].x>=18 || snake[0].x<=0|| snake[0].y>=18 || snake[0].y<=0){
        
        return true;

    }
    
    

}
function gameEngine() {
    // Rendering the snake and food

    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};

        alert("game over press any key to restatrt");
        snakeArr= [{ x: 13, y: 15 }];
        score=0;
        musicSound.play();


    }

    //if we have eaten the food increment the food and regenerate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=2;
        let b=16;
        score+=1;
        scoreBox.innerHTML="Score  "+score;
        food={x:Math.round(a+(b-1)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
        foodSound.play();


    }


    //moving the snake
    for(let i=snakeArr.length-2;i>=0;i--){
        const element=snakeArr[i];
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    //display the snake
    // First, empty the board
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){

        }
        snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    });


    //display the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Main logic
window.requestAnimationFrame(main);
// main();
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1};//start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            console.log("up");
            
            break;
        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            console.log("down");    
            break;
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            console.log("Left");
            break;
        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            console.log("right");
            break;
    
        default:
            break;
    }
})


