/* 
01 start the game by pressing a Start button
02 use my arrow keys to change the direction of the snake
03 have the snake grow correctly when it eats the apple
04 have the game end if the snake tries to eat itself
05 have the game end if the snake runs into a wall
06 see how long my snake was when the game ended
07 start the game over without having to reset the browser
08 As a user playing the game I would be delighted if I:
BONUS
09 can set the difficulty (speed of snake)
10 can keep track of my stats (maximum points, average points, etc.) between games
*/

//Hooks into the GameBoard div
const gameBoard = document.getElementById('GameBoard');

//Used to check if the game is active or over
let gameState = true;

//Adjust this to change the difficulty. The higher the number the faster the snake moves, 6 is the default
let difficulty = 6;

//Adjust this to change the difficulty. The higher the number the fast the snake grows
let snakeGrowthRate = 1;
let bodyGrowth = 0;

let score = 0;
let highScore = 0;
let snakeBody = [{x: 13, y: 13}];
let moveDirection = {x: 0, y: 0};
let apple = {x: 5, y: 5};

//Creates the snake and removes the trailing cell as it moves
function drawSnake(gameBoard) {
    gameBoard.innerHTML = '';
    snakeBody.forEach(body => {
        const snakeSection = document.createElement('div')
        snakeSection.style.gridRowStart = body.y
        snakeSection.style.gridColumnStart = body.x
        snakeSection.classList.add('snake')
        gameBoard.appendChild(snakeSection)
    })
};

//Creates the apple and checks if it has been eaten
function placeFood() {
    const foodPlacement = document.createElement('div')
    foodPlacement.style.gridRowStart = apple.y
    foodPlacement.style.gridColumnStart = apple.x
    foodPlacement.classList.add('apple')
    gameBoard.appendChild(foodPlacement)
};

//Handles controlling the snake's direction with user input
function changeDirection() {
    window.addEventListener('keydown', function(e) {
        if (e.key === 'w' || e.key === 'ArrowUp') {
            if (moveDirection.y === 0) {
            moveDirection = {x: 0, y: -1}
            } 
        }
        if (e.key === 's' || e.key === 'ArrowDown') {
            if (moveDirection.y === 0) {
            moveDirection = {x: 0, y: 1}
            }
        }
        if (e.key === 'a' || e.key === 'ArrowLeft') {
            if (moveDirection.x === 0) {
            moveDirection = {x: -1, y: 0}
            }
        }
        if (e.key === 'd' || e.key === 'ArrowRight') {
            if (moveDirection.x === 0) {
            moveDirection = {x: 1, y: 0}
            }
        }
    })
    return moveDirection
};

//Takes in the ChangeDirection function and shifts the snake array
function moveSnake(){
    let input = changeDirection()
    for(let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = {...snakeBody[i]}
    }
    snakeBody[0].x += input.x
    snakeBody[0].y += input.y
};

//Randomizes where the apple spawns
function randomizeApple() {
    apple.x = Math.floor(Math.random() * 26)
    apple.y = Math.floor(Math.random() * 26)
};

//Helper function to check if the snake and food intersect
function check(food, snake) {
    return food.x === snake.x && food.y === snake.y
};

//Function to check if the snake and food intersect
function snakeEat(position) {
    return snakeBody.some(segment => {
        return check(segment, position)
    })
};

//Sets the growth rate for the snake
function snakeGrow(rate) {
    bodyGrowth += rate
};

//Handles the check, growth, and calls the randomization of the apple
function updateGame() {
    if (snakeEat(apple)) {
        snakeGrow(snakeGrowthRate)
        randomizeApple()
    }
}

//Puts all the above logic together and checks for the game's state
function renderGame() {
    setTimeout(renderGame, 1000 / difficulty);
    drawSnake(gameBoard);
    placeFood(gameBoard);
    moveSnake();
    updateGame()
};

//Runs the Game!
renderGame();