window.addEventListener('load',init,false);
var canvas=null,ctx=null;

function init(){
    canvas=document.getElementById('canvas');
    ctx=canvas.getContext('2d');
    paint(ctx);
}

function paint(ctx){
    ctx.fillStyle='#0f0';
    ctx.fillRect(100,50,100,50);
    ctx.strokeRect(0,0,50,50);
    ctx.strokeRect(250,0,50,50);
    ctx.strokeRect(250,100,50,50);
    ctx.strokeRect(0,100,50,50);
}