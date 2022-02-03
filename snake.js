/* 
1 start the game by pressing a Start button
X 2 use my arrow keys to change the direction of the snake
X 3 have the snake grow correctly when it eats the apple
X 4 have the game end if the snake tries to eat itself
X 5 have the game end if the snake runs into a wall
X 6 see how long my snake was when the game ended
7 start the game over without having to reset the browser
BONUS
X 8 can set the difficulty (speed of snake)
9 can keep track of my stats (maximum points, average points, etc.) between games
*/

//Hooks into the GameBoard div
const gameBoard = document.getElementById('GameBoard');

//Used to check if the game is active or over
let gameState = true;

//Adjust this to change the difficulty. The higher the number the faster the snake moves, 10 is the default
let difficulty = document.getElementById("DifficultySlider");

//Adjust this to change the difficulty. The higher the number the fast the snake grows
let snakeGrowthRate = 1;
let bodyGrowth = 0;

let score = document.getElementById('Score');
let newScore = 0;
let highScore = document.getElementById('HighScore');
let newHighScore = 0;

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
        apple.x = Math.floor(Math.random() * 23) + 1,
        apple.y = Math.floor(Math.random() * 23) + 1
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

//Function to check if the snake and food intersect
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

//Helper function
function snakeHeadLocation() {
    return snakeBody[0]
};

//Helper function
function hitWall(check) {
    if (check.x < 0 || check.x > 25 || check.y < 0 || check.y > 25) {
        return true;
    }
};

//Helper function
function snakeIntersection() {
    return snakeEat(snakeBody[0], {ignoreHead: true})
};

//Handles the game over logic with the help of the above functions
function gameOver() {
    if(hitWall(snakeHeadLocation()) || snakeIntersection()) {
        gameState = false;
    }
}

//Handles the game reset
function gameRestart() {
    if (gameState === false) {
        if (confirm(`Your score was ${newScore}! Press "OK" to try again!`)) {
            window.location = '/'
            newHighScore = newHighScore
        }
        return
    }
}

//Handles the check, growth, and calls the randomization of the apple
function updateGame() {
    if (snakeEat(apple)) {
        snakeGrow(snakeGrowthRate)
        randomizeApple()
    }
}

//Puts all the above logic together and checks for the game's state
function renderGame() {
    if (gameState) {
        setTimeout(renderGame, 1000 / difficulty.value);
        drawSnake(gameBoard);
        placeFood(gameBoard);
        moveSnake();
        updateGame();
        gameOver();
    }
    gameRestart();
};

//Runs the Game!
renderGame();