class Rect {
    constructor(rect) {
        this.rect = rect;
    }
    update_rect(pos, width, height){
        this.rect[0] = pos[0] - width/2;
        this.rect[1] = pos[1] - height/2;
        this.rect[2] = width;
        this.rect[3] = height;
    }
    check_collision(other_rect) {
        if (other_rect.rect[0] + other_rect.rect[2] >= this.rect[0] &&
            other_rect.rect[0] <= this.rect[0] + this.rect[2] &&
            other_rect.rect[1] + other_rect.rect[3] >= this.rect[1] &&
            other_rect.rect[1] <= this.rect[1] + this.rect[3]) {
            return true;
        }
        else {
            return false;
        }
    }
    check_collision_dir(other_rect){
        return 1;
    }
}