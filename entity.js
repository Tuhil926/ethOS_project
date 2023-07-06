class Entity extends Rect
{
    constructor(position,width,height,color)
    {
        super([0,0,0,0]);
        this.pos=position;
        this.velocity=[0,0];
        this.width=width;
        this.height=height;
        this.color=color;
    }
    update_position(dt)
    {
        this.pos[0]+=this.velocity[0]*dt;
        this.pos[1]+=this.velocity[1]*dt;
    }
}