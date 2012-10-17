function Vector(x, y) {
    this.x = x;
    this.y = y;
    this.magnitude = function() {
        return Math.sqrt(x * x + y * y);
    }
}

function Fsh(color, tank) {
    this.color = color;
    this.x = 10;
    this.y = 10;
    this.velocity = new Vector(1, 1);
    this.tank = tank;
    this.age = 0;

    this.move = function() {
        var lx = this.x + this.velocity.x;
        var ly = this.y + this.velocity.y;
        if (lx > this.tank.width - 40 || lx < 0) this.velocity.x *= -1;
        if (ly > this.tank.height - 20 || ly < 0) this.velocity.y *= -1;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.velocity.x += Math.random() * 0.2 - 0.1;
        this.velocity.y += Math.random() * 0.2 - 0.1;
        this.age++;
    }

    this.draw = function(context) {
        context.save();
        context.translate(this.x, this.y);
        if (this.velocity.x < 0) {
            context.translate(20, 10);
            context.scale(-1, 1);
            context.translate(-20, -10);
        }
        var gradient = context.createLinearGradient(0, 0, 0, 20);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "white");
        context.fillStyle = gradient;
        context.beginPath();
        context.moveTo(0, 2);
        context.lineTo(3, 10);
        context.lineTo(0, 18);
        context.lineTo(10, 12);
        context.bezierCurveTo(20, 20, 30, 20, 40, 10);
        context.bezierCurveTo(30, 0, 20, 0, 10, 8);
        context.fill();
        context.globalCompositeOperation = 'destination-out';
        context.beginPath();
        context.arc(32, 8, 2, 0, Math.PI * 2, true);
        context.fill();
        context.globalCompositeOperation = 'destination-over';
        context.restore();
    }
}

var canvas;
var fishies = new Array();

function animate() {
    var ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    for (i = 0; i < fishies.length; i++) {
        var fishie = fishies[i];
        fishie.move();
        fishie.draw(ctx);
        if (fishie.age > 2000) {
            fishies.splice(i, 1);
            i--;
        }
    }
}

function addFish() {
    fishies.push(new Fsh("black", canvas));
    fishies.push(new Fsh("red", canvas));
    fishies.push(new Fsh("green", canvas));
    fishies.push(new Fsh("yellow", canvas));
    fishies.push(new Fsh("purple", canvas));
    fishies.push(new Fsh("pink", canvas));
}

function init() {
    canvas = document.getElementById('tutorial');
    canvas.onclick = addFish;
    setInterval(animate, 30);
}

window.onload=init;
