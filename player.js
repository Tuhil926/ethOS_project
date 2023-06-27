class Player{
    constructor(){
        this.pos = [299, 230];
        this.velocity = [0, 0];
        this.width = 50;
        this.height = 100;
    }

    draw(screen){
        // the player's position is considered as the middle of the rectangle
        draw_rectangle(screen, [this.pos[0] - this.width/2, this.pos[1] - this.height/2, this.width, this.height], true, 0, "#990099");
    }

    update(inputs, dt, height){
        //update the position based on the formula dx = Velocity.dt (dt id the time between frames)
        this.pos[0] += this.velocity[0]*dt;
        this.pos[1] += this.velocity[1]*dt;

        // collision with floor. Other collisions with objects can also be handled here in the future
        if (this.pos[1] > height - this.height/2){
            this.pos[1] = height - this.height/2;
            this.velocity[1] = 0;
        }

        // executes this code when the player is touching the floor(he/she can only move when touching the ground)
        if (this.pos[1] == height - this.height/2){
            // drag force
            this.velocity[0] -= this.velocity[0] * 5 * dt;

            // handling inputs
            if (inputs.a){
                this.velocity[0] -= 50;
            }
            if (inputs.d){
                this.velocity[0] += 50;
            }
            if (inputs.space){
                // jump upwards
                this.velocity[1] = -700;

                // here, when the player is jumping while also moveing, he/she gets a slight boost of velocity
                if (inputs.a){
                    this.velocity[0] -= 100;
                }
                if (inputs.d){
                    this.velocity[0] += 100;
                }
            }
        }else{
            // drag force only due to the air, must be lesser than the drag on ground
            this.velocity[0] -= this.velocity[0] * 0.2 * dt;
            // gravity
            this.velocity[1] += dt*2500;
        }
    }
}