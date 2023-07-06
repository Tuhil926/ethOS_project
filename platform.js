class Platform extends Rect{
    constructor(pos, width, height){
        super([0, 0, 0, 0]);
        this.pos = pos;
        this.width = width;
        this.height = height;
        this.update_rect(pos, width, height);
    }

    draw(screen){
        // the player's position is considered as the middle of the rectangle
        draw_rectangle(screen, this.rect, true, 0, "blue");
    }
}