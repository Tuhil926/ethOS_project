function draw_line(context, point1, point2, color="#000000"){
    context.moveTo(point1[0], point1[1]);
    context.lineTo(point2[0], point2[1]);
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
var screen = canvas.getContext("2d");

const img = document.getElementById("demo");

// lines
draw_line(screen, [0, 0], [200, 200]);
// circles
draw_circle(screen, [200, 200], 100, false, 10, "#FE3418");
// rects
draw_rectangle(screen, [300, 400, 100, 200], true, 0, "#F34723");
// images
screen.drawImage(img, 100, 150);