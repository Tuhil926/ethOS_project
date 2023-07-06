function draw_line(context, point1, point2, line_width=1, color="#000000"){
    context.moveTo(point1[0], point1[1]);
    context.lineTo(point2[0], point2[1]);
    context.lineWidth = line_width;
    context.strokeStyle = color;
    context.stroke();
}
function draw_circle(context, center, radius, filled=true, line_width=1, color="#000000"){
    context.beginPath();
    context.arc(center[0], center[1], radius, 0, 2 * Math.PI);
    if (filled){
        context.fillStyle = color;
        context.fill();
    }else{
        context.strokeStyle = color;
        context.lineWidth = line_width;
        context.stroke();
    }
}
function draw_rectangle(context, rect, filled=false, line_width=1, color="#000000"){
    context.beginPath();
    context.rect(rect[0], rect[1], rect[2], rect[3]);
    if (filled){
        context.fillStyle = color;
        context.fill();
    }else{
        context.strokeStyle = color;
        context.lineWidth = line_width;
        context.stroke();
    }
}
var canvas = document.getElementById("screen");
var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;
canvas.width = WIDTH;
canvas.height = HEIGHT;

var screen = canvas.getContext("2d");

var inputs = {w:false, a:false, s:false, d:false, space:false, mouse_pos:[0, 0]};
onmousemove = function(e){inputs["mouse_pos"] = [e.x, e.y]};

document.addEventListener('keydown', (event)=> {    
    switch (event.key){
        case "w": {inputs.w = true;break};
        case "a": {inputs.a = true;break};
        case "s": {inputs.s = true;break};
        case "d": {inputs.d = true;break};
        case " ": {inputs.space = true;break};
    }
});
document.addEventListener('keyup', (event)=> {    
    switch (event.key){
        case "w": {inputs.w = false;break};
        case "a": {inputs.a = false;break};
        case "s": {inputs.s = false;break};
        case "d": {inputs.d = false;break};
        case " ": {inputs.space = false;break};
    }
});

// Player class is in player.js
player = new Player();

platforms = [];
platforms.push(new Platform([100, HEIGHT - 90], 150, 10));
platforms.push(new Platform([450, HEIGHT - 180], 150, 10));
platforms.push(new Platform([800, HEIGHT - 270], 150, 10));
platforms.push(new Platform([1150, HEIGHT - 360], 150, 10));
platforms.push(new Platform([800, HEIGHT - 460], 150, 10));
platforms.push(new Platform([400, HEIGHT - 460], 150, 10));


function update(){
    // update the canvas size when window is resized
    if (window.innerWidth != WIDTH || window.innerHeight != HEIGHT){
        WIDTH  = window.innerWidth;
        HEIGHT = window.innerHeight;
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
    }
    // fill the screen with a color
    draw_rectangle(screen, [0, 0, canvas.width, canvas.height], true, 0, "#505050");

    player.update(inputs, 20/1000, canvas.height);
    player.handle_platform_collisions(platforms);

    for (let i = 0; i < platforms.length; i++){
        platforms[i].draw(screen);
    }
    player.draw(screen);

}

setInterval(update, 20);