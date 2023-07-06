class Entity extends Rect
{
    constructor(position,width,height,color)
    {
        super([0,0,0,0]);
        this.position=position;
        this.velocity=[0,0];
        this.width=width;
        this.height=height;
        this.color=color;
    }
    update_position(dt)
    {
        this.position[0]+=this.velocity[0]*dt;
        this.position[1]+=this.velocity[1]*dt;
    }
}