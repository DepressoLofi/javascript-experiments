const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = 'pink';


//this is the particles itself
class Particle {
    constructor(effect){
        this.effect = effect;
        this.radius = 15;
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
        this.vx = (Math.random() < 0.5 ? -1 : 1) * (1 + Math.random());

    }

    draw(context){
        context.fillStyle = 'hsl(' + this.x * 0.5 + ', 100%, 50%)';
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.stroke();
    }

    update(){
        this.x += this.vx;
        if(this.x > this.effect.width - this.radius || this.x < this.radius) this.vx *= -1;
        
    }

}

// this is the effect that controlls the particles
class Effect {
    constructor(canvas){
        this.canvas =  canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 100;
        this.createParticles();
    }

    createParticles(){
        for(let i = 0; i < this.numberOfParticles; i++){
            this.particles.push(new Particle(this));
        }
    }

    handleParticles(context){
        this.particles.forEach(particle => {
            particle.draw(context);
            particle.update();
        })
    }
}

const effect = new Effect(canvas);

console.log(effect);

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);

}
animate()