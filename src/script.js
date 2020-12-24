

function random(min, max) {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



class Stage {
    constructor(canvas, img) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.square = new Square(0,this.canvas.width, 0, this.canvas.height);
        this.snowflakes = [];
        this.img = img;
        this.text = ['M', 'e', 'r', 'r', 'y',' C', 'h', 'r', 'i', 's', 't', 'm', 'a', 's', ' M', 'o', 'm'];
        this.interval = 0;
        for(let i=0; i < 170; i++) {
            let x =  random(0, this.canvas.width);
            let y = random(0, this.canvas.height);
            let snowflake = new Snowflake(x, y, Math.random() * 5 + 1, this);
            this.snowflakes.push(snowflake);
        }
    }

    draw() {
        var context = this.canvas.getContext('2d');
        context.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.square.draw(context);
        var msg = "";
        for(let i=0; i < this.snowflakes.length; i++) {
            this.snowflakes[i].draw(context);
        }
        if(this.interval < 340) {
            for(let i=0; i < this.interval; i += 20) {
                msg += this.text[i/20];
            }
        }
        else {
            msg = "Merry Christmas Mom";
        }
        console.log(msg);
        context.font = "100px Brush Script Std";
        context.fillStyle = "red";
        context.textAlign = "center";
        context.lineWidth = 10;
        context.strokeText(msg,this.canvas.width/2, this.canvas.height/2);
        context.fillText(msg, this.canvas.width/2, this.canvas.height/2);
    }


    step() {
        for(let i=0; i < this.snowflakes.length; i++) {
            this.snowflakes[i].step();
        }
        this.interval = (1 + this.interval) % 450;
        this.draw();
    }
}

class Square {
    constructor(x1, x2, y1, y2) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
    }

    draw(context) {
        context.fillStyle = "black";
        context.fillRect(this.x1, this.y1, this.x2, this.y2);
    }
}

class Snowflake {
    constructor(x, y, size, stage) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.stage = stage;
    }

    draw(context) {
        context.fillStyle = "white";
        // context.beginPath();
        // context.arc(this.x, this.y, this.size, 0, 2 *Math.PI);
        // context.fill();
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.stage.interval*Math.PI/180);
        context.drawImage(this.stage.img, 0, 0, this.size * 5, this.size * 5);
        context.restore();
    }

    step() {
        if(this.y > this.stage.canvas.height) {
            this.y = -80;
            this.x = random(0, this.stage.canvas.width);
        }
        else {
            this.y = this.y + 2;
        }
    }
}




export default Stage