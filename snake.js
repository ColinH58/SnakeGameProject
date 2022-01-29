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

//Adjust this to change the difficulty. The higher the number the faster the snake moves
let difficulty = 6;

//Adjust this to change the difficulty. The higher the number the fast the snake grows
let snakeGrowth = 1;

let score = 0;
let highScore = 0;
let snakeBody = [{x: 13, y: 13}];
let moveDirection = {x: 0, y: 0};
let apple = {x: 1, y: 1};

//Creates the snake and removes the trailing cell as it moves
function drawSnake(gameBoard) {
    gameBoard.innerHTML = '';
    snakeBody.forEach(segment => {
        const snakeSection = document.createElement('div')
        snakeSection.style.gridRowStart = segment.y
        snakeSection.style.gridColumnStart = segment.x
        snakeSection.classList.add('snake')
        gameBoard.appendChild(snakeSection)
    })
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

//Creates the apple
function placeFood() {
    const foodPlacement = document.createElement('div')
    foodPlacement.style.gridRowStart = apple.y
    foodPlacement.style.gridColumnStart = apple.x
    foodPlacement.classList.add('apple')
    gameBoard.appendChild(foodPlacement)
};

function randomizeApple() {

};

//Puts all the above logic together and checks for the game's state
function renderGame() {
    setTimeout(renderGame, 1000 / difficulty);
    drawSnake(gameBoard);
    moveSnake();
    placeFood(gameBoard);
    randomizeApple();
};

//Runs the Game!
renderGame();