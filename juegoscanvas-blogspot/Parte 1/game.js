window.addEventListener('load',init,false);
var canvas=null,ctx=null;
var x=0, y=0;
var lastPress=null;
var KEY_LEFT=37;
var KEY_UP=38;
var KEY_RIGHT=39;
var KEY_DOWN=40;
var KEY_ENTER=13;
var dir=0;
var pause=false;


function init(){
    canvas=document.getElementById('canvas');
    ctx=canvas.getContext('2d');
    run();
    repaint();
}
function run(){
	setTimeout(run,50);
	act();
    
}

function repaint(){
    requestAnimationFrame(repaint);
    paint(ctx);
}
    
function act(){
        if(!pause){
    	// x+=2;
    	// if(x>canvas.width)
    	// 	x=0;
    	// y+=4;
    	// if(y>canvas.height)
    	// 	y=0;	
        // Change Direction
        if(lastPress==KEY_UP)
            dir=0;
        if(lastPress==KEY_RIGHT)
            dir=1;
        if(lastPress==KEY_DOWN)
            dir=2;
        if(lastPress==KEY_LEFT)
            dir=3;
        // Move Rect
        if(dir==0)
            y-=10;
        if(dir==1)
            x+=10;
        if(dir==2)
            y+=10;
        if(dir==3)
            x-=10;
        // Out Screen
        if(x>canvas.width)
            x=0;
        if(y>canvas.height)
            y=0;
        if(x<0)
            x=canvas.width-10;
        if(y<0)
            y=canvas.height-10;
    }

    // Pause/Unpause
    if(lastPress==KEY_ENTER){
        pause=!pause;
        lastPress=null;
    }
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

    if(pause){
        ctx.textAlign='center';
        ctx.fillText('PAUSE',150,75);
        ctx.textAlign='left';
    }
}
document.addEventListener('keydown',function(evt){
    lastPress=evt.keyCode;
},false);

