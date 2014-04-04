
window.addEventListener('load',init,false);//Cuando termina de cargar la página, la escucha empieza a ejecutar init()
var canvas=null,ctx=null;
var lastPress=null;
var pause=true;
var gameover=true;
var dir=0;
var score=0;
var player=new Rectangle(40,40,10,10);
var food=new Rectangle(80,80,10,10);
var wall=new Array();

wall.push(new Rectangle(100,50,10,10));
wall.push(new Rectangle(100,100,10,10));
wall.push(new Rectangle(200,50,10,10));
wall.push(new Rectangle(200,100,10,10));

var KEY_ENTER=13;
var KEY_LEFT=37;
var KEY_UP=38;
var KEY_RIGHT=39;
var KEY_DOWN=40;

function random(max){
    return Math.floor(Math.random()*max);
}
//Comienzo de ejecución del código. Obtiene el canvas donde vamos a pintar 
//y su contexto 2d, equivalente al pincel con el que se va a pintar (ctx)
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

function reset(){
    score=0;
    dir=1;
    player.x=40;
    player.y=40;
    food.x=random(canvas.width/10-1)*10;
    food.y=random(canvas.height/10-1)*10;
    gameover=false;
}

function act(){
    if(!pause){
        // GameOver Reset
        if(gameover)
            reset();
        
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
            player.y-=10;
        if(dir==1)
            player.x+=10;
        if(dir==2)
            player.y+=10;
        if(dir==3)
            player.x-=10;

        // Out Screen
        if(player.x>canvas.width)
            player.x=0;
        if(player.y>canvas.height)
            player.y=0;
        if(player.x<0)
            player.x=canvas.width;
        if(player.y<0)
            player.y=canvas.height;
        
        // Food Intersects
        if(player.intersects(food)){
            score++;
            food.x=random(canvas.width/10-1)*10;
            food.y=random(canvas.height/10-1)*10;
        }
        
        // Wall Intersects
        for(var i=0,l=wall.length;i<l;i++){
            if(food.intersects(wall[i])){
                food.x=random(canvas.width/10-1)*10;
                food.y=random(canvas.height/10-1)*10;
            }
            
            if(player.intersects(wall[i])){
                gameover=true;
                pause=true;
            }
        }
    }
    // Pause/Unpause
    if(lastPress==KEY_ENTER){
        pause=!pause;
        lastPress=null;
    }
}
//CTX funciona como un pincel: primero hay que elegir un color, luego se pinta con él.
function paint(ctx){
    ctx.fillStyle='#000';//asigna un color de relleno a ctx
    ctx.fillRect(0,0,canvas.width,canvas.height); //dibuja un rectangulo con las coordenadas dadas con ctx
    ctx.fillStyle='#0f0';
    player.fill(ctx);
    ctx.fillStyle='#999';
    for(var i=0,l=wall.length;i<l;i++){
        wall[i].fill(ctx);
    }
    ctx.fillStyle='#f00';
    food.fill(ctx);
    
    ctx.fillStyle='#AAA';
    ctx.font="15px AAA";
    //ctx.fillText('Last Press: '+lastPress,0,20);
    ctx.fillText('Score: '+score,0,10);
    if(pause){
        ctx.textAlign='center';
        if(gameover)
            ctx.fillText('GAME OVER',150,75);
        else
            ctx.fillText('PAUSE',150,75);
        ctx.textAlign='left';
    }
}

document.addEventListener('keydown',function(evt){
    lastPress=evt.keyCode;
},false);

function Rectangle(x,y,width,height){
    this.x=(x==null)?0:x;
    this.y=(y==null)?0:y;
    this.width=(width==null)?0:width;
    this.height=(height==null)?this.width:height;
    
    this.intersects=function(rect){
        if(rect!=null){
            return(this.x<rect.x+rect.width&&
                this.x+this.width>rect.x&&
                this.y<rect.y+rect.height&&
                this.y+this.height>rect.y);
        }
    }
    
    this.fill=function(ctx){
        if(ctx!=null){
            ctx.fillRect(this.x,this.y,this.width,this.height);
        }
    }
}

window.requestAnimationFrame=(function(){
    return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        function(callback){window.setTimeout(callback,17);};
})();
