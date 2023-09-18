status = 0;
objects = [];

function preload() {

}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("ModelLoaded");
    status = true;
    objectDetector.detect(video, gotResults);
}


function gotResults(error, results) {
    if (error) {
        console.log(error);
    }

    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML + "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;

            fill(r, g, b)
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            object_found = document.getElementById("object").value;
            if(objects[i].label == object_found)
            {
                document.getElementById("number_of_objects").innerHTML = "object found";
            }
            else
            {
                document.getElementById("number_of_objects").innerHTML = "object not found";
            }
        }
    }
}
