//  https://teachablemachine.withgoogle.com/models/aFUhY93Qj/
//  &#128076;
//  &#128077;
//  &#9996;
//  &#129310;
//  &#128406;
//  &#129305;

Webcam.set({
    width:350,
    height:300,
    image_format: "png",
    png_quality:90
});

camera = document.getElementById("camera")
Webcam.attach("#camera")

classify = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/aFUhY93Qj/model.json", model_loaded)
console.log("ml5 loaded", ml5.version)

function model_loaded() {
    console.log("model loaded!")
}

function take_snap() {
    Webcam.snap(
        function (uri) {
            document.getElementById("snap").innerHTML = '<img id="result" src=' + uri + '>'
        }
    )
}

function speak() {
    var synth = window.speechSynthesis
    speak1 = "Prediction complete"
    var speech = new SpeechSynthesisUtterance(speak1)
    synth.speak(speech)
}

function start() {
    img = document.getElementById("result")
    classify.classify(img, gotResult)
}

function gotResult(error, result) {
    if(error) {
        console.error(error)
    } else {
        console.log(result)
        pred = result[0].label
        document.getElementById("handsign_name").innerHTML = result[0].label
        
        if (result[0].label == "thumbs up") {
            document.getElementById("handsign").innerHTML = '<span>&#128077;</span>'
        } else if (result[0].label == "phone") {
            document.getElementById("handsign").innerHTML = '<span>&#129305;</span>'
        } else if (result[0].label == "victory") {
            document.getElementById("handsign").innerHTML = '<span>&#9996;</span>'
        } else if (result[0].label == "peace") {
            document.getElementById("handsign").innerHTML = '<span>&#128406;</span>'
        } else if (result[0].label == "awsome") {
            document.getElementById("handsign").innerHTML = '<span>&#128076;</span>'
        } else {
            document.getElementById("handsign").innerHTML = '<span>&#129310;</span>'
        }

        speak()
    }
}