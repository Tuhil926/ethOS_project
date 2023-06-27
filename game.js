// import { Player } from "./player";

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

const img = document.getElementById("demo");

var inputs = {w:false, a:false, s:false, d:false, space:false, mouse_pos:[0, 0]}
onmousemove = function(e){inputs["mouse_pos"] = [e.x, e.y]}

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


player = new Player();


let pos = [100, 100];
dir = 1;

function update(){
    if (window.innerWidth != WIDTH || window.innerHeight != HEIGHT){
        WIDTH  = window.innerWidth;
        HEIGHT = window.innerHeight;
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
    }
    draw_rectangle(screen, [0, 0, canvas.width, canvas.height], true, 0, "#505050");

    // lines
    draw_line(screen, [0, 0], [200, 200]);
    // circles
    draw_circle(screen, pos, 100, false, 10, "#FE3418");
    draw_circle(screen, inputs.mouse_pos, 20, true, 0, "#00FFFF");
    // rects
    draw_rectangle(screen, [300, 400, 100, 200], true, 0, "#F34723");
    // images
    screen.drawImage(img, 100, 150);
    if (inputs.w){
        pos[0] += 9*dir;
    }
    // pos[1] += 3*dir;
    if (pos[0] > WIDTH){
        dir = -1;
    } else if (pos[0] < 0){
        dir = 1;
    }

    player.update(inputs, 20/1000, canvas.height);

    player.draw(screen);

}

setInterval(update, 20);