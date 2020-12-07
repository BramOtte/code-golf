function snake(width=16, height=9, scale=30){
    let currentDir = 0;
    const nextDirs = [];
    // dir 0=r 1=d 2=l 3=u
    const input = dir =>{
        const lastInput = nextDirs[0] ?? currentDir;
        if (
            nextDirs.length < 2 && (
                dir === (lastInput+1)%4 ||
                dir === (lastInput+3)%4
            )
        ){
            nextDirs.push(dir);
        }
    }
    
    const canvas = document.createElement('canvas');
    canvas.width = width*scale; canvas.height = height*scale;
    canvas.style.background = "wheat";
    
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);
    const drawPixel = (x, y) => ctx.fillRect(x,y,1,1);

    const pi05 = Math.PI/2;
    const field = new Array(width*height);
    const tail = [];

    let score = 3;
    let highScore = score; 
    
    let playerX = 0;
    let playerY = 0;
    let appleI = 0;
    const addDir = (x,dir,size)=> (x+Math.cos(dir*pi05)+size)%size;
    const step = () => {
        // draw the apple
        ctx.fillStyle = "red";
        drawPixel(appleI%width, 0| appleI/width);

        // draw new tail segment
        ctx.fillStyle = "darkgreen";
        drawPixel(playerX, playerY);

        // get the next input
        currentDir = nextDirs.shift()??currentDir;

        // move the head
        playerX = addDir(playerX, currentDir, width);
        playerY = addDir(playerY, currentDir+3, height);

        // draw the head
        ctx.fillStyle = "green";
        drawPixel(playerX, playerY);
        
        // get the player index for in the field array
        const playerI = playerX+playerY*width;
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
            const segment = tail.shift();
            // remove it from the field and canvas
            field[segment] = 0;
            ctx.clearRect(segment%width, 0| segment/width, 1, 1);
        }
    };
    return {canvas:canvas, step, input, score:() => `${score}/${highScore}`};
}
