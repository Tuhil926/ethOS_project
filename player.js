// import 'Rect';

class Player extends Entity{
    constructor(){
        super([0, 0], 40, 70, "#FF1122");
        this.on_ground = false;
    }

    draw(screen){
        // the player's position is considered as the middle of the rectangle
        draw_rectangle(screen, [this.pos[0] - this.width/2, this.pos[1] - this.height/2, this.width, this.height], true, 0, "#990099");
    }

    handle_platform_collisions(platforms){
        this.on_ground = false;
        for (let i = 0; i < platforms.length; i++){
            if (platforms[i].check_collision(this)){
                this.pos[1] = platforms[i].rect[1] - this.height/2;
                this.velocity[1] = 0;
                this.on_ground = true;
            }
        }
        // console.log(this.on_ground);
    }

    update(inputs, dt, height){
        // this.pos = inputs.mouse_pos;
        // this.velocity = [0, 0];
        //update the position based on the formula dx = Velocity.dt (dt id the time between frames)
        // this.pos[0] += this.velocity[0]*dt;
        // this.pos[1] += this.velocity[1]*dt;
        this.update_position(dt);

        // collision with floor. Other collisions with objects can also be handled here in the future
        if (this.pos[1] > height - this.height/2){
            this.pos[1] = height - this.height/2;
            this.velocity[1] = 0;
        }

        if (this.pos[1] == height - this.height/2){
            this.on_ground = true;
        }

        // executes this code when the player is touching the floor(he/she can only move when touching the ground)
        if (this.on_ground){
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
                this.pos[1] -= 1;

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
        this.update_rect(this.pos, this.width, this.height);
    }
}