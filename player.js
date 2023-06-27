// import { draw_line, draw_circle, draw_rectangle } from "./game";

class Player{
    constructor(){
        this.pos = [299, 230];
        this.velocity = [0, 0];
        this.width = 50;
        this.height = 100;
    }

    draw(screen){
        draw_rectangle(screen, [this.pos[0] - this.width/2, this.pos[1] - this.height/2, this.width, this.height], true, 0, "#990099");
    }

    update(inputs, dt, height){
        this.pos[0] += this.velocity[0]*dt;
        this.pos[1] += this.velocity[1]*dt;
        if (this.pos[1] > height - this.height/2){
            this.pos[1] = height - this.height/2;
            this.velocity[1] = 0;
        }


        if (this.pos[1] == height - this.height/2){
            this.velocity[0] -= this.velocity[0] * 5 * dt;
            if (inputs.a){
                this.velocity[0] -= 50;
                // console.log(this.velocity[0]);
                // console.log(inputs);
            }
            if (inputs.d){
                this.velocity[0] += 50;
                // console.log(this.velocity[0]);
            }
            if (inputs.space){
                this.velocity[1] = -700;
                if (inputs.a){
                    this.velocity[0] -= 100;
                    // console.log(this.velocity[0]);
                    // console.log(inputs);
                }
                if (inputs.d){
                    this.velocity[0] += 100;
                    // console.log(this.velocity[0]);
                }
            }
        }else{
            this.velocity[0] -= this.velocity[0] * 0.2 * dt;
            this.velocity[1] += dt*2500;
        }
    }
}