"use strict";
function snake(width=16, height=9, scale=30){ 
    let w = width, h = height, s = scale,
    currentDir = 0,
    nextDirs = [],
    // dir 0=r 1=d 2=l 3=u
    input = dir =>{
        let lastInput = nextDirs[0] ?? currentDir;
        if (
            nextDirs.length < 2 && (
                dir === (lastInput+1)%4 ||
                dir === (lastInput+3)%4
            )
        ){
            nextDirs.push(dir);
        }
    },
    canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    
    drawPixel = (x, y) => ctx.fillRect(x,y,1,1),

    pi05 = Math.PI/2,
    fillStyle="fillStyle",
    field = new Array(w*h),
    tail = [],

    score = 3,
    highScore = score, 
    
    playerX = 0,
    playerY = 0,
    appleI = 0,
    addDir = (x,dir,size)=> (x+Math.cos(dir*pi05)+size)%size,

    step = () => {
        // draw the apple
        ctx[fillStyle] = "red";
        drawPixel(appleI%w, 0| appleI/w);

        // draw new tail segment
        ctx[fillStyle] = "darkgreen";
        drawPixel(playerX, playerY);

        // get the next input
        currentDir = nextDirs.shift()??currentDir;

        // move the head
        playerX = addDir(playerX, currentDir, w);
        playerY = addDir(playerY, currentDir+3, h);

        // draw the head
        ctx[fillStyle] = "green";
        drawPixel(playerX, playerY);
        
        // get the player index for in the field array
        let playerI = playerX+playerY*w;
        tail.push(playerI);
        
        // check if player collided with its tail
        if (field[playerI]){
            score = 3;
        }
        // set new tail segment in field array
        field[playerI] = 1;
        
        // if the player collided with the apple
        // then add 1 to the score and move the apple 
        // to a random location not on top of the snake
        if (playerI === appleI){
            score++;
            while(field[appleI]){
                appleI = 0|Math.random()*field.length
            }
            if (score > highScore)highScore=score;
        }

        // clear the extra tail
        while (tail.length > score){
            // get the last tail segment
            let segment = tail.shift();
            // remove it from the field and canvas
            field[segment] = 0;
            ctx.clearRect(segment%w, 0| segment/w, 1, 1);
        }
    };
    canvas.width = w*s; canvas.height = h*s;
    canvas.style.background = "wheat";
    ctx.scale(s, s);
    return {canvas:canvas, step, input, score:() => `${score}/${highScore}`};
}
