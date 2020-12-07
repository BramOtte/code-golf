let turn = "x";
let html = "";
let board = ["...","...","..."].map((v,y)=>(
    html+="<br>",
    v.split("").map((v,x)=>(
        html += `<button onclick=C(this,${[x,y]})>.</button>`, v
    ) )
));
document.write(html);
C=(element,x,y)=>{
    element.innerHTML = turn;
    element.onclick="";
    board[y][x] = turn;
    c=(x)=>board.reduce((acc,cur)=>acc&(cur[x]==turn), 1);
    r=(y)=>board[y].join("") == turn.repeat(3);
    if ( 
        r(0)|r(1)|r(2)
        |c(0)|c(1)|c(2)
        | (
            board[1][1] == turn &
            (
                (board[0][0]==turn & board[2][2] == turn)
                | (board[0][2]==turn & board[2][0] == turn)
            )
        )
    ) {
        alert(turn+" has won!");
    }
    turn=turn=="x"?"o":"x";
}
