window.addEventListener('load',init,false);
var canvas=null,ctx=null;
var x=0, y=50;

function init(){
    canvas=document.getElementById('canvas');
    ctx=canvas.getContext('2d');
    run();
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
}

function run(){
	requestAnimationFrame(run);
	act();
	paint(ctx);
}

function act(){
	x+=8;
	if(x>canvas.width)
		x=0;
	y+=32;
	if(y>canvas.width)
		y=0;
	
}