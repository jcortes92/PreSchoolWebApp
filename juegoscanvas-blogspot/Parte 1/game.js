window.addEventListener('load',init,false);
var canvas=null,ctx=null;
var x=0, y=0;
var lastPress=null;
var KEY_LEFT=37;
var KEY_UP=38;
var KEY_RIGHT=39;
var KEY_DOWN=40;
var dir=0;


function init(){
    canvas=document.getElementById('canvas');
    ctx=canvas.getContext('2d');
    run();
}
function run(){
	requestAnimationFrame(run);
	act();
	paint(ctx);
}
function act(){
	x+=0.5;
	if(x>canvas.width)
		x=0;
	y+=2;
	if(y>canvas.height)
		y=0;
	
}
function paint(ctx){
    ctx.fillStyle='#0f0';
    ctx.fillRect(100,50,100,50);
    ctx.strokeRect(0,0,50,50);
    ctx.strokeRect(250,0,50,50);
    ctx.strokeRect(250,100,50,50);
    ctx.strokeRect(0,100,50,50);
    ctx.fillStyle='#FF0000';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#000';
    ctx.fillRect(x,y,10,10);
    ctx.fillText('Last Press: ' + lastPress,0,20);
}
document.addEventListener('keydown',function(evt){
    lastPress=evt.keyCode;
},false);

