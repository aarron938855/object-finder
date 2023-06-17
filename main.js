song = "";
img = "";
status_1 = "";
objects = [];
item = "";
function preload() {
    song = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide()
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status  : detecting objects";
    item = document.getElementById("obj").value;
}
function draw() {
    image(video, 0, 0, 380, 380);
    if (status_1 != "") {
        objectDetector.detect(video, gotResult);
        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status : object Detected";
            if (objects[i].label == item) {
                song.play();
                document.getElementById("num_of_objects").innerHTML = objects[i].label;
            }
            percent = floor(objects[i].confidence * 100);
            fill(r, g, b);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function modelLoaded() {
    console.log("modelLoaded");
    status_1 = true;
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}