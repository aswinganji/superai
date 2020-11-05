let status = "";
let objects = [];

function preload() {
    let play = "Alarm.mp3";
}

function setup() {
    canvas = createCanvas(600, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    console.log("detecting");
}

function draw() {
    image(video, 0, 0, 600, 420);
    console.log("image");
    if (status != "") {
        r = random(200);
        g = random(200);
        b = random(200);
        for (i = 0; i < objects.length; i++) {
            console.log("detect");
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == "person") {
                document.getElementById("status").innerHTML = "Status - Baby Detected";
            } else {
                play.play();
            }
        }
    }
}

function modelLoaded() {
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}