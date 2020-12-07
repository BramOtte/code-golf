let turn = 0;
let w;
let h;
let field
onload=()=>{
    field = document.getElementById("field");
    w = Number(field.getAttribute('width'));
    h = Number(field.getAttribute('height'));
    field.style.gridTemplateColumns = `repeat(${w}, 1fr)`;
    for (let i = 0; i < w; i++){
        let b = document.createElement('button');
        b.i = i;
        b.onclick=click;
        field.appendChild(b);
    }
    for (let i = 0; i < w*h; i++){
        let d = document.createElement('div');
        d.id = i;
        d.style.background = 'grey';
        field.appendChild(d);
    }
}
let click=e=>{
    drop(e.target.i);
}
let drop=i=>{
    let d = document.getElementById(i);
    if (i < w*h && d.style.backgroundColor == 'grey'){
        drop(i+w);
    } else {
        d = document.getElementById(i-w);
        d.style.background = turn%2?'red':'blue';
        if (check(i)){
            alert ((turn%2?'red':'blue') + ' won');
        };
        turn++;
        document.body.style.background = turn%2?'red':'blue';
    }
}
let check=i=>{
    let x = i%w;
    let y = Math.trunc(i/w)-1;
    let c = turn%2?'red':'blue';
    return subCheck(x-3,y,1,0, c)
            || subCheck(x,y-3,0,1, c)
            || subCheck(x-3,y-3,1,1, c)
            || subCheck(x+3,y-3,-1,1, c);
}
let subCheck=(x,y,dx,dy, c)=>{
    let n = 0;
    for (let i = 0; i < 7; i++,x+=dx,y+=dy){
        if (x < 0 || x >= w || y < 0 || y >= h){continue;}
        let d = document.getElementById(x+y*w);
        if (d.style.backgroundColor == c){
            n++;
            if (n >= 4){return true;}
        } else {
            n=0;
        }
    }
    return false;
}
