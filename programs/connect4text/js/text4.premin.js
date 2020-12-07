
var t=0,
A=Array,a=A(7).fill().map((v,i)=>A(7).fill(i>0?'.':1)),
n=7;
while(n--)document.write(`<button onclick=c(${6-n})>|</button>`);
c=i=>{
    j = 7-a[0][i];
    if (j){
        a[j][i] = t;
        a[0][i]++;
        s=(x,y,d,D)=>{
            m=0
            n=9;
            while(n--){
                if((b=a[y]) && b[x] != null){
                    m=b[x]==t?m+1:0;
                    if(m>3)return 1
                }
                x+=d;y+=D
            }
        }
        if(s(i-3,j,1,0) || s(i,j-3,0,1)
        || s(i-3,j-3,1,1)|| s(i+3,j-3,-1,1))alert(t+' won');
        t=t?0:'x';
    }
    p.innerHTML= a.join('<br>')
}
