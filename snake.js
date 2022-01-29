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
const gameBoard = document.getElementById('GameBoard');
let score = 0;
let highScore = 0;
let gameState = true;
let difficulty = 6;
let snakeBody = [{x: 13, y: 13}];
let moveDirection = {x: 0, y: 0};
let apple = {x: 1, y: 1};
let snakeGrowth = 1;

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

function moveSnake(){
    let input = changeDirection()
    for(let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = {...snakeBody[i]}
    }
    snakeBody[0].x += input.x
    snakeBody[0].y += input.y
};

function placeFood() {
    const foodPlacement = document.createElement('div')
    foodPlacement.style.gridRowStart = apple.y
    foodPlacement.style.gridColumnStart = apple.x
    foodPlacement.classList.add('apple')
    gameBoard.appendChild(foodPlacement)
};

function randomizeApple() {

};

function renderGame() {
    setTimeout(renderGame, 1000 / difficulty);
    drawSnake(gameBoard);
    moveSnake();
    placeFood(gameBoard);
    randomizeApple();
};

renderGame();