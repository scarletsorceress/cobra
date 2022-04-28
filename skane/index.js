const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart{

    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}


//velocidade da cobra
let speed = 7;
//o tanto de espaços que ela pode se locomover
let tileCount = 20;
//tamanho da grid
let tileSize = canvas.width / tileCount - 2;

//posição x e y da cabeça da cobra quando se inicia o jogo
let headX = 10;
let headY = 10;

const snakeParts = [];
//define quantos segmentos tem o corpo da cobra
let tailLength = 2;

//posição x e y da maçã
let appleX = 5;
let appleY = 5;

//define a direção que a cobra esta se movendo
let xVelocity = 0;
let yVelocity = 0;

let score = 0;

//loop no jogo
function drawGame(){
    changeSnakePosition();

    //quando perde o jogo mostra a ultima tela exibida
    let result = isGameOver();
    if (result){
        return;
    }

    clearScreen();


    checkAppleCollision()
    drawApple();
    drawSnake();

    drawScore();

    if(score > 2){
        speed = 11;
    }
    if(score > 5){
        speed = 15;
    }
    setTimeout(drawGame, 1000 / speed);
}

function isGameOver(){    
    let gameOver = false;

    if(yVelocity === 0 && xVelocity === 0){
        return false;
    }

    //walls
    if(headX < 0){
        gameOver = true;
    }
    else if(headX === tileCount){
        gameOver = true;
    }
    else if(headY < 0){
        gameOver = true;
    }
    else if(headY === tileCount){
        gameOver = true;
    }

    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i]
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }

    if(gameOver){

        ctx.fillStyle = "white";
        ctx.font = "50 Verdana";

        if (gameOver) {
            ctx.fillStyle = "white";
            ctx.font = "50px Verdana";
      
            ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
          }

        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }

    return gameOver;
}

function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = '10px Verdana'
    ctx.fillText("Score " + score, canvas.width - 50, 10);
}

//é justamente a tela por onde a cobra se move
function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//codigo para exibir a cobra na tela
function drawSnake(){
    ctx.fillStyle = "green";
    for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY)); //put an item at the end of the list next to the head
     while (snakeParts.length > tailLength) {
    snakeParts.shift(); // remove the furthet item from the snake parts if have more than our tail size.
    }

    ctx.fillStyle = "red";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

//como o nome ja sugere, é o que faz a cobra se mover
function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

//codigo da maça, fillrect cria um quadrado nas posicoes x e y da maça e o tilesize é o tamanho do quadrado
function drawApple(){
    ctx.fillStyle = 'cyan';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision(){
    if(appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
    }

}

document.body.addEventListener('keydown', keyDown);

//controles
function keyDown(event){
    //up
    if(event.keyCode == 38){
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }

    //down
    if(event.keyCode == 40){
        if(yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }

    //left
    if(event.keyCode == 37){
        if(xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }

    //right
    if(event.keyCode == 39){
        if(xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();