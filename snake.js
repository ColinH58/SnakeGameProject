/* 
X 1 start the game by pressing a Start button
X 2 use my arrow keys to change the direction of the snake
X 3 have the snake grow correctly when it eats the apple
X 4 have the game end if the snake tries to eat itself
X 5 have the game end if the snake runs into a wall
X 6 see how long my snake was when the game ended
X 7 start the game over without having to reset the browser
BONUS
X 8 can set the difficulty (speed of snake)
9 can keep track of my stats (maximum points, average points, etc.) between games
*/

//Hooks into the gameboard
const gameBoard = document.getElementById('GameBoard');

//Used to check if the game is active or over
let gameState = false;

//Hooks into the difficulty slider to divide by in the render function
let difficulty = document.getElementById("DifficultySlider");

//Used to set the snake growth rate. The higher the number the faster the snake grows
let snakeGrowthRate = 1;
let bodyGrowth = 0;

//Hooks into the score elements and allows for updates
let score = document.getElementById('Score');
let newScore = 0;
let highScore = document.getElementById('HighScore');
let newHighScore = 0;

let infoText = document.getElementById("info");

//Creates the snake and apple and sets them to a default location
let snakeBody = [{x: 12, y: 12}];
let moveDirection = {x: 0, y: 0};
let apple = {x: 4, y: 4};

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

//Creates the new apple location, to be used after eating with helper functions
function placeFood() {
    const foodPlacement = document.createElement('div')
    foodPlacement.style.gridRowStart = apple.y
    foodPlacement.style.gridColumnStart = apple.x
    foodPlacement.classList.add('apple')
    gameBoard.appendChild(foodPlacement)
};

//Handles controlling the snake's direction guided by user input
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
    addLength()
    let input = changeDirection()
    for(let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = {...snakeBody[i]}
    }
    snakeBody[0].x += input.x
    snakeBody[0].y += input.y
};

//Helper function to make sure the apple doesn't spawn outside the grid or in the snake
function safeLocation() {
    return (
        apple.x = Math.floor(Math.random() * 22) + 1,
        apple.y = Math.floor(Math.random() * 22) + 1
    )
};

//Randomizes where the apple spawns with the help of the helper function
function randomizeApple() {
    let randomizedApple
    while (randomizedApple == null || snakeEat(randomizedApple)) {
        randomizedApple = safeLocation()
    }
    return randomizedApple;
};

//Helper function to check if the snake and food intersect
function check(food, snake) {
    return food.x === snake.x && food.y === snake.y
};

//Function to check if the snake's head and food intersect
function snakeEat(position, {ignoreHead = false} = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead === true && index === 0) return false
        return check(segment, position)
    })
};

//Helper function that sets the growth rate for the snake
function snakeGrow(rate) {
    bodyGrowth += rate
};

//Updates the score and high score when the snake eats an apple
function updateScore() {
    newScore++
    score.innerText = ("Score: " + newScore)
    if (newScore > newHighScore) {
        newHighScore = newScore
        highScore.innerText = ("High Score: " + newHighScore)
    }
};

//Handles the actual growth logic for the snake
function addLength() {
    for (let i = 0; i < bodyGrowth; i++) {
        updateScore()
        snakeBody.push({...snakeBody[snakeBody.length - 1]})
    }
    bodyGrowth = 0
};

//Helper function to tell the game where the snake's head is
function snakeHeadLocation() {
    return snakeBody[0]
};

//Helper function to tell the game where the boundaries of the game are
function hitWall(check) {
    if (check.x < 1 || check.x > 24 || check.y < 1 || check.y > 24) {
        return true;
    }
};

//Helper function to make sure the game knows the snakes head isn't intersecting itself
function snakeIntersection() {
    return snakeEat(snakeBody[0], {ignoreHead: true})
};

//Handles the game over logic with the help of the above functions
function gameOver() {
    if(hitWall(snakeHeadLocation()) || snakeIntersection()) {
        gameBoard.style.borderColor = "red"
        infoText.textContent = `💣 Game Over! 💣`
        gameState = false;
        gameRestart();
    }
}

//Handles the game reset
function gameRestart() {
    gameBoard.style.borderColor = "darkgray"
    snakeBody = [{x: 12, y: 12}]
    moveDirection = {x: 0, y: 0}
    apple = {x: 4, y: 4}
};

//Handles the check, growth, and calls the randomization of the apple everytime the apple is eaten
function updateGame() {
    if (snakeEat(apple)) {
        snakeGrow(snakeGrowthRate)
        randomizeApple()
    }
}

//Puts all the above logic together and checks for the game's state
function renderGame() {
    if (gameState == true) {
        infoText.textContent = "🐍 Good Luck! 🐍"
        setTimeout(renderGame, 1000 / difficulty.value);
        drawSnake(gameBoard);
        placeFood(gameBoard);
        moveSnake();
        updateGame();
    }
    gameOver();
};

let startGame = document.getElementById("StartGame").addEventListener("click", () => {
    if (gameState == false) {
        score.innerText = "Score: 0"
        newScore = 0
        gameState = true
        renderGame();
    }
});