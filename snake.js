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
let difficulty = 2;

function renderGame() {

};