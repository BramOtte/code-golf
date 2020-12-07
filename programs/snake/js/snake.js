const math = Math;
const pi05 = Math.PI/2;
const size = 12;
const rand = ()=>0|math.random()*size;
const scale = 30;
const canvasSize=size*scale;
const keys = {d:0,s:1,a:2,w:3};
const fillStyle = "fillStyle";

const inputs=[];
let input=0;

let playerX = 0;
let playerY = 0;

let appleX = 0;
let appleY = 0;

const field= new Array(size*size);
const tail=[];
let tailLength=3;
let highScore=3;

const canvas = document.createElement("canvas");
canvas.width=canvasSize;
canvas.height=canvasSize;
canvas.style.background="wheat";
const ctx = canvas.getContext("2d");
ctx.scale(scale, scale);
const pixel = (x,y)=>ctx.fillRect(x, y, 1, 1);


onkeydown=e=>{
    lastInput = inputs[0] ?? input;
    let k = keys[e.key];
    if (
        k+1 &&
        k != lastInput &&
        k != (lastInput+2)%4
    ){
        inputs.push(k);
    }
}

setInterval(e=>{
    document.body.append(canvas);

    ctx[fillStyle]="darkgreen";
    pixel(playerX, playerY);

    input = inputs.shift()??input;
    playerX=(playerX+math.cos(input*pi05)+size)%size;
    playerY=(playerY+math.sin(input*pi05)+size)%size;
    const playerIndex = playerX+playerY*size
    tail.push([playerX,playerY]);
    

    while (tail.length > tailLength){
        const segment = tail.shift();
        field[segment[0]+segment[1]*size] = 0;
        ctx.clearRect(...segment, 1, 1);
    }
    if (field[playerIndex] == 1){
        tailLength = 3;
        S.innerText=3;
        console.log("hi");
    }
    field[playerIndex] = 1;
    if (playerX == appleX && playerY== appleY){
        tailLength++;
        while (field[appleX+appleY*size]){
            appleY = rand();
            appleX = rand();
        }
        if(tailLength>highScore)highScore=tailLength;
    }

    ctx[fillStyle]="green";
    pixel(playerX, playerY);
    ctx[fillStyle]="red";
    pixel(appleX,appleY);
    S.innerText=tailLength+"/"+highScore;
}, 200);
