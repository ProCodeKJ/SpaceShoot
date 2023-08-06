document.body.style.backgroundColor = "aqua"



// GLOBAL
let globalFrame = 0;
let score = 0;


// Setup Canvas
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 1265;
canvas.height = 500;
document.body.appendChild(canvas);

// Images Settings
let backgroundImage,bulletImage,enemyImage,spaceshipImage,gameoverImage;
function loadImages() {
    backgroundImage = new Image();
    backgroundImage.src = "images/background.jpg";

    bulletImage = new Image();
    bulletImage.src = "images/bullet.png";

    enemyImage = new Image();
    enemyImage.src = "images/enemy.png";

    spaceshipImage = new Image();
    spaceshipImage.src = "images/spaceship.png";

    gameoverImage = new Image();
    gameoverImage.src = "images/gameOver.jpg";
}

// Player Settings
    let PlayerX = canvas.width/2 - 66; // Player's X position
    let PlayerY = canvas.height - 66; // Player's Y position
    let sx = 0; // player "Speed X"
    let sy = 0;// player "Speed Y"
    let Health = 100; // Health of Player
    let playerPower = 1; // Player Power #

function render() {

    ctx.drawImage(backgroundImage , 0 , 0 ,canvas.width , canvas.height);
    ctx.drawImage(spaceshipImage,PlayerX,PlayerY);

    // draw
    ctx.fillText(`SCORE : ${score}   |   HEALTH : ${Math.floor(Health)}`,20,30);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial"

    for(let i = 0; i<bulletList.length;i++) {

        if(bulletList[i].alive) {
            ctx.drawImage(bulletImage,bulletList[i].x , bulletList[i].y)
        }
    }
    
    for(let i = 0; i<enemyList.length;i++) {
        //ctx.drawImage(bulletImage,enemyList[i].x , enemyList[i].y)
        ctx.drawImage(enemyImage,enemyList[i].x, enemyList[i].y)
    }
    }

let keysDown = {} // gets keys down
function checkKeys() {
    document.addEventListener("keydown",(e) => {
       keysDown[e.code] = true;
    });
    
    document.addEventListener("keyup",(e) => {
        delete keysDown[e.code]
        if (e.code == "Space") {
             createBullet(); 
        }
     });

}


// Setup Bullet
let bulletList = [];

function Bullet() {
    this.x = 0;
    this.y = 0;
    this.sy = 5;
    this.alive = true;
    this.init = () => {
        this.x = PlayerX + 25;
        this.y = PlayerY;
        bulletList.push(this);
    }
    this.update = function() {
        if (this.sy > 50) {
        this.y += 10;
        this.sy ++
        this.x = canvas.width - 30
        }else {
        this.y -= this.sy;
        this.sy ++
        }
        
            
    }
    this.checkHit = () => {
        for(let i = 0;i<enemyList.length;i++) {
            if(this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x <= enemyList[i].x + 40) {
                score++
                this.alive = false;
                enemyList.splice(i,1);
            }
        }
    }
}

// Setup Enemy
let enemyList = [];

function Enemy() {
    this.x = 0;
    this.y = 0;
    this.init = function() {
        this.y = -50;
        this.x = pickRandom(50,canvas.width-50);
        enemyList.push(this);
    }
    this.update = function() {
       this.y += 2;

       if(this.y >= canvas.height) {
        enemyList.splice(this,1);
       Health -= 10;
       }
    }
}

// random
function pickRandom(min,max) {
    let randNum = Math.floor(Math.random() * (max-min+1));
    return randNum;
}

// Create Bullet 
createBullet = () => {
    let b = new Bullet();
    b.init();
}

createEnemy = () => {
    const interval = setInterval(() => {
        let e = new Enemy();
        e.init();
    },2000)
}


// all screen updates are here!
function update() {
    // 1. arrow / WASD keys
    if ("KeyA" in keysDown || "ArrowLeft" in keysDown) {
        sx -= 0.5;
    }
    
    if ("KeyD" in keysDown || "ArrowRight" in keysDown) {
        sx += 0.5;
    }


    PlayerX += sx;
    PlayerY += sy;
    sy++;



    // 2. Check Touching Wall

    if(PlayerX <= -5) {
        PlayerX = -5;
        sx = 20;
        sy = -20;
    }

    if (PlayerX >= canvas.width - 66) {
        PlayerX = canvas.width - 66;
        sx = -20;
        sy = -20;
    }
    console.log(Math.abs(sx))
    if (Math.abs(sx) < 1.5) {
        console.log(Math.abs(sx))
    }

    if(PlayerY > 430) {
        PlayerY = 430;
    }

    if(PlayerY <= 0) {
        PlayerY = 20;
        sy += 5;
    }
    sx = sx / 1.03;
//     // STOP keys
//     if ("KeyW" in keysDown && PlayerY == 430) {
//          sx = sx / 1.03;
//     }

//     if ("ShiftRight" in keysDown && PlayerY == 430) {
//         sx = sx / 1.03;
//    }

//    if ("ShiftLeft" in keysDown && PlayerY == 430) {
//     sx = sx / 1.03;
// }

    // update bullet
    for(let i = 0; i<bulletList.length;i++) {
        if(bulletList[i].alive) {
            bulletList[i].update();
            bulletList[i].checkHit();
        }
    }

    for(let i = 0; i<enemyList.length;i++) {
        enemyList[i].update();
    }
}

function main() {
    if (Health <= 0) {
        ctx.drawImage(gameoverImage,canvas.width / 2 - 200,50,380,380)
    }else {
        render();
        update();
        requestAnimationFrame(main);
        globalFrame += 1; 
    }
  
}


loadImages();
checkKeys();
createEnemy();
main();
