// GLOBAL
let globalFrame = 0;


// Setup Canvas
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 1265;
canvas.height = 500;
document.body.appendChild(canvas);

// Images Settings
let backgroundImage,bulletImage,enemyImage,spaceshipImage;
function loadImages() {
    backgroundImage = new Image();
    backgroundImage.src = "images/background.jpg";

    bulletImage = new Image();
    bulletImage.src = "images/bullet.png";

    enemyImage = new Image();
    enemyImage.src = "images/enemy.png";

    spaceshipImage = new Image();
    spaceshipImage.src = "images/spaceship.png";
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

    for(let i = 0; i<bulletList.length;i++) {
        ctx.drawImage(bulletImage,bulletList[i].x , bulletList[i].y)
    }
    }

let keysDown = {} // gets keys down
function checkKeys() {
    document.addEventListener("keydown",(e) => {
       keysDown[e.code] = true;
       console.log(keysDown);
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
    this.init = () => {
        this.x = PlayerX + 25;
        this.y = PlayerY;
        bulletList.push(this);
    }
    this.update = () => {
        if (this.sy > 50) {
        this.y += 10;
        this.sy ++
        }else {
        this.y -= this.sy;
        this.sy ++
        }
        
            
    }
}

// Create Bullet 
createBullet = () => {
    let b = new Bullet();
    b.init();
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
       bulletList[i].update();
    }
}



function main() {
    render();
    update();
    requestAnimationFrame(main);
    globalFrame += 1;
}

loadImages();
checkKeys();
main();