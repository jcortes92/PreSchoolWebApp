(function(){
        'use strict';
        window.addEventListener('load',instrucciones,false);

//Animación Instrucciones
    function instrucciones() {
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width=900;
        canvas.height=700;
        var w = canvas.width, h = canvas.height;
        var i = 0;
        var controls = document.getElementById("controls");
        var titulo = document.getElementById('titulo');
        var player=new Rectangle(110,0,80,80);
        var meta=new Rectangle(800,500,100,100);
        controls.style.display="none";
        titulo.style.display="none";
            ctx.fillStyle='#000';
            ctx.fillRect(0,0,canvas.width,canvas.height);

            //A base de retrasos (setTimeout) aparecen en pantalla las instrucciones del juego
            setTimeout(function(){
                ctx.font="120px Courier";
                ctx.fillStyle="#FFFFFF";
                ctx.textAlign='center';
                ctx.fillText('LABERINTO',450,400);
                ctx.fillStyle="#000";
                ctx.strokeText('LABERINTO',450,400);
                setTimeout(function(){
                    ctx.fillStyle='#000';
                    ctx.fillRect(0,0,canvas.width,canvas.height);
                    setTimeout(function(){
                        ctx.fillStyle='#000';
                        ctx.fillRect(0,0,canvas.width,canvas.height);
                        setTimeout(function(){
                            ctx.fillStyle='#FF1300';
                            player.fill(ctx);
                            player.stroke(ctx);
                            setTimeout(function(){
                                ctx.fillStyle='#00C618';
                                meta.fill(ctx);
                                setTimeout(function(){
                                    ctx.fillStyle='#000';
                                    ctx.fillRect(0,0,canvas.width,canvas.height);
                                    setTimeout(function(){
                                        controls.style.display="inline";
                                        titulo.style.display="inline";
                                        window.location.href="laberinto.html";
                                    },2000);
                                },2000)
                            },2000);
                        },1000);
                    },1000);
                },1000);
            },1000);
    }

    

    //Deshabilita el scroll en pantalla
    window.addEventListener("touchmove", function(event) {
      if (!event.target.classList.contains('scrollable')) {
        // no more scrolling
        event.preventDefault();
    }
    }, false);

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