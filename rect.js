class Rect {
    constructor(rect) {
        this.rect = rect;
    }
    check_collision(other_rect) {
        if (other_rect.rect[0] + other_rect.rect[2] > this.rect[0] &&
            other_rect.rect[0] < this.rect[0] + this.rect[2] &&
            other_rect.rect[1] + other_rect.rect[3] > this.rect[1] &&
            other_rect.rect[1] < this.rect[1] + this.rect[3]) {
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