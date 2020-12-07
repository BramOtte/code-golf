let t = "x";
h = "";
b = ["...","...","..."].map((v,y)=>(
    h+="<br>",
    v.split("").map((v,x)=>(
        h += `<button onclick=C(this,${[x,y]})>.</button>`, v
    ) )
)),
C=(e,x,y)=>{
    e.innerHTML = t;
    e.onclick="";
    b[y][x] = t;
    c=(x)=>b.reduce((acc,cur)=>acc&(cur[x]==t), 1);
    r=(y)=>b[y].join("") == t.repeat(3);
    if ( 
        r(0)|r(1)|r(2)
        |c(0)|c(1)|c(2)
        | (
            b[1][1] == t &
            (
                (b[0][0]==t & b[2][2] == t)
                | (b[0][2]==t & b[2][0] == t)
            )
        )
    ) {
        alert(t+" has won!");
    }
    t=t=="x"?"o":"x";
}
document.write(h);
