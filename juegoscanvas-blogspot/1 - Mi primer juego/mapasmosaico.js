(function(){
    'use strict';
    window.addEventListener('load',init,false);
    var KEY_ENTER=13;
    var KEY_LEFT=37;
    var KEY_UP=38;
    var KEY_RIGHT=39;
    var KEY_DOWN=40;

    var canvas=null,ctx=null;
    var lastPress=null;
    var pressing=[];
    var pause;
    var gamewin;

    var player=new Rectangle(100,0,60,60);
    var meta=new Rectangle(800,500,100,100);
    var wall=[];
    var line= [];
    var text= [];
    var iWall=new Image();

    iWall.src='media/legobrick100.png';

    //Creación laberinto
    function maze(x,y) {
        var n=x*y-1;
        if (n<0) {alert("illegal maze dimensions");return;}
        var horiz =[]; for (var j= 0; j<x+1; j++) horiz[j]= [];
        var  verti =[]; for (var j= 0; j<y+1; j++) verti[j]= [];
            var here = [Math.floor(Math.random()*x), Math.floor(Math.random()*y)];
            var path = [here];
            var unvisited = [];
            var next = [];
        for (var j = 0; j<x+2; j++) {
            unvisited[j] = [];
            for (var k= 0; k<y+1; k++)
                unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
        }
        while (0<n) {
            var potential = [[here[0]+1, here[1]], [here[0],here[1]+1],
                [here[0]-1, here[1]], [here[0],here[1]-1]];
            var neighbors = [];
            for (var j = 0; j < 4; j++)
                if (unvisited[potential[j][0]+1][potential[j][1]+1])
                    neighbors.push(potential[j]);
            if (neighbors.length) {
                n = n-1;
                next= neighbors[Math.floor(Math.random()*neighbors.length)];
                unvisited[next[0]+1][next[1]+1]= false;
                if (next[0] == here[0])
                    horiz[next[0]][(next[1]+here[1]-1)/2]= true;
                else 
                    verti[(next[0]+here[0]-1)/2][next[1]]= true;
                path.push(here = next);
            } else 
                here = path.pop();
        }
        return {x: x, y: y, horiz: horiz, verti: verti};
    }
     //Dibujar laberinto ASCII
    function display(m) {
        for (var j= 0; j<m.x*2+1; j++) {
            
            if (0 == j%2)
                for (var k=0; k<m.y*4+1; k++)
                    if (0 == k%4) 
                        line[k]= '+';
                    else
                        if (j>0 && m.verti[j/2-1][Math.floor(k/4)])
                            line[k]= ' ';
                        else
                            line[k]= '-';
            else
                for (var k=0; k<m.y*4+1; k++)
                    if (0 == k%4)
                        if (k>0 && m.horiz[(j-1)/2][k/4-1])
                            line[k]= ' ';
                        else
                            line[k]= '|';
                    else
                        line[k]= ' ';
            if (0 == j) line[1]= line[2]= line[3]= ' ';
            if (m.x*2-1 == j) line[4*m.y]= ' ';
            text.push(line.join('')+'\r\n');
        }
        return text.join('');
    }

    function setMap(map,columns,blockSize){
        var col=0;
        var row=0;
        wall.length=0;
        for(var i=0;i<text.length;i++){
            for(var j=0; j<text[i].length;j++){
                if((text[i][j]=='+')||(text[i][j]=='|')||(text[i][j]=='-'))
                    wall.push(new Rectangle(col*blockSize*2.5,row*blockSize*5,blockSize*5,blockSize*5));
                col++;
                if(col>=columns){
                    row++;
                    col=0;
                }
            }
        }
    }

    function init(){
        canvas=document.getElementById('canvas2');
        ctx=canvas.getContext('2d');
        canvas.width=900;
        canvas.height=700;
        /*document.getElementById('out').innerHTML = */display(maze(3,4));
        setMap(text,19,20);
        run();
        repaint();
    }

    function run(){
        setTimeout(run,20);
        act();
    }

    function repaint(){
        requestAnimationFrame(repaint);
        paint(ctx);
    }

    function reset(){
    }

    function act(){
        if(!pause){
            
            // if(gamewin)
                //reset();
            
            // Move Rect
            if(pressing[KEY_UP]){
                player.y-=10;
                for(var i=0;i<wall.length;i++){
                    if(player.intersects(wall[i])){
                        player.y+=10;
                    }
                }
            }
            if(pressing[KEY_RIGHT]){
                player.x+=10;
                for(var i=0;i<wall.length;i++){
                    if(player.intersects(wall[i])){
                        player.x-=10;
                    }
                }
            }
            if(pressing[KEY_DOWN]){
                player.y+=10;
                for(var i=0;i<wall.length;i++){
                    if(player.intersects(wall[i])){
                        player.y-=10;
                    }
                }
            }
            if(pressing[KEY_LEFT]){
                player.x-=10;
                for(var i=0;i<wall.length;i++){
                    if(player.intersects(wall[i])){
                        player.x+=10;
                    }
                }
            }
            
            // Out Screen
            if(player.x>canvas.width)
                player.x -= 10;
            if(player.y>canvas.height)
                player.y -= 10;
            if(player.x<0)
                player.x += 10;
            if(player.y<0)
                player.y += 10;

            if(player.intersects(meta)){
                gamewin=true;
                setTimeout(function() {location.reload();},1250);
            }
            
                
        }
        // Pause/Unpause
        if(lastPress==KEY_ENTER){
            pause=!pause;
            lastPress=null;
        }
    }

    function paint(ctx){
        
        ctx.fillStyle='#FFE200';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle='#FF1300';
        player.fill(ctx);
        player.stroke(ctx);
        
        ctx.fillStyle='#00C618';
        meta.fill(ctx);
        meta.stroke(ctx);
        ctx.fillStyle='#1379FC';
        for(var i=0;i<wall.length;i++)
            // wall[i].fill(ctx);
            ctx.drawImage(iWall,wall[i].x,wall[i].y);
        if(gamewin){
            ctx.font="100px Arial";
            ctx.fillStyle="#FF1300";
            ctx.textAlign='center';
            ctx.fillText('WIN',400,400);
        } else if(pause){
            ctx.textAlign='center';
            ctx.fillText('PAUSE',200,75);
        }
    }

    document.addEventListener('keydown',function(evt){
        lastPress=evt.keyCode;
        pressing[evt.keyCode]=true;
    },false);

    document.addEventListener('keyup',function(evt){
        pressing[evt.keyCode]=false;
    },false);
  
window.addEventListener('load', function(){ // on page load
 
 document.getElementById('up_arrow').addEventListener('touchstart', function(e){
  pressing[KEY_UP]=true;
 }, false)

 document.getElementById('up_arrow').addEventListener('touchend', function(e){
  pressing[KEY_UP]=false;
 }, false)


 document.getElementById('down_arrow').addEventListener('touchstart', function(e){
  pressing[KEY_DOWN]=true;
 }, false)

 document.getElementById('down_arrow').addEventListener('touchend', function(e){
  pressing[KEY_DOWN]=false;
 }, false)

 document.getElementById('left_arrow').addEventListener('touchstart', function(e){
  pressing[KEY_LEFT]=true;
 }, false)

 document.getElementById('left_arrow').addEventListener('touchend', function(e){
  pressing[KEY_LEFT]=false;
 }, false)

 document.getElementById('right_arrow').addEventListener('touchstart', function(e){
  pressing[KEY_RIGHT]=true;
 }, false)

 document.getElementById('right_arrow').addEventListener('touchend', function(e){
  pressing[KEY_RIGHT]=false;
 }, false)
 
 
}, false)

    
    function Rectangle(x,y,width,height){
        this.x=(x==null)?0:x;
        this.y=(y==null)?0:y;
        this.width=(width==null)?0:width;
        this.height=(height==null)?this.width:height;
    }

    Rectangle.prototype.intersects=function(rect){
        if(rect!=null){
            return(this.x<rect.x+rect.width&&
                this.x+this.width>rect.x&&
                this.y<rect.y+rect.height&&
                this.y+this.height>rect.y);
        }
    }

    Rectangle.prototype.fill=function(ctx){
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
    Rectangle.prototype.stroke=function(ctx){
        ctx.strokeRect(this.x,this.y,this.width,this.height);
    }

})();