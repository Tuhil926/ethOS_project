class Platform extends Rect{
    constructor(){
        this.pos = [299, 230];
        this.width = 50;
        this.height = 100;
    }

    draw(screen){
        // the player's position is considered as the middle of the rectangle
        draw_rectangle(screen, [750, 740, 350, 40], true, 0, "blue");
    }
}