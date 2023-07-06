class Portal extends Rect{
    constructor(rect, target){
        super(rect);
        this.target = target;
    }

    doEntityCollisions(entities){
        for (let i = 0; i < entities.length; i++){
            if (this.check_collision(entities[i])){
                entities[i].pos[0] = this.target[0];
                entities[i].pos[1] = this.target[1];
            }
        }
    }

    draw(screen){
        draw_rectangle(screen, this.rect, true, 0, "green");
        draw_circle(screen, this.target, 30, true, 0, "green");
    }
}