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
            other_rect.rect[0] < this.rect[0] + this.rect[2] &&
            other_rect.rect[1] + other_rect.rect[3] >= this.rect[1] &&
            other_rect.rect[1] < this.rect[1] + this.rect[3]) {
            return true;
        }
        else {
            return false;
        }
    }
    check_collision_dir(other_rect){
        if (this.check_collision(other_rect)){
            let dist_top = (other_rect.rect[1] + other_rect.rect[3]) - (this.rect[1]);
            let dist_bottom = (this.rect[1] + this.rect[3]) - (other_rect.rect[1]);
            let dist_left = (other_rect.rect[0] + other_rect.rect[2]) - (this.rect[0]);
            let dist_right = (this.rect[0] + this.rect[2]) - (other_rect.rect[0]);
            let distances = [dist_top, dist_right, dist_bottom, dist_left];
            let min_index = 0;
            let min = distances[0];
            for (let i = 1; i < 4; i++){
                if (distances[i] < min){
                    min = distances[i];
                    min_index = i;
                }
            }
            return min_index + 1;
        }
        return 0;
    }
}