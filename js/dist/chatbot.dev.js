"use strict";

var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
var canvas2 = document.getElementById("gameCanvas2");
var context2 = canvas2.getContext("2d");
var text;

var loadFile = function loadFile(event) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context2.clearRect(0, 0, canvas.width, canvas.height);
  var image = document.getElementById('file');
  image.src = URL.createObjectURL(event.target.files[0]);
  var htmlTag = "<img id=\"img\" src=\"".concat(image.src, "\" crossorigin='anonymous' width=\"500\" height=\"400\"/>");
  document.getElementById("innerTag").innerHTML = htmlTag;
  var img = document.getElementById('img');
  cocoSsd.load().then(function (model) {
    // detect objects in the image.
    model.detect(img).then(function (predictions) {
      for (var index = 0; index < predictions.length; index++) {
        context.fillStyle = 'rgba(0,225,0,0.1)';
        context2.fillStyle = '#1e4c76';
        context2.font = "25px Arial";
        context2.fillText(predictions[index]["class"], predictions[index].bbox[0], predictions[index].bbox[1] + 14);
        context.strokeRect(predictions[index].bbox[0], predictions[index].bbox[1], predictions[index].bbox[2], predictions[index].bbox[3]);
        context.fillRect(predictions[index].bbox[0], predictions[index].bbox[1], predictions[index].bbox[2], predictions[index].bbox[3]);
      }
    });
  });
  mobilenet.load().then(function (model) {
    text = "Hmmm...I think the image is: ";
    model.classify(img).then(function (predictions) {
      document.getElementById("text").innerHTML = text + predictions[0].className;
    });
  });
};