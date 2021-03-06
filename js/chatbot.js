let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");
let canvas2 = document.getElementById("gameCanvas2");
let context2 = canvas2.getContext("2d");
let text;
var loadFile = function (event) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context2.clearRect(0, 0, canvas.width, canvas.height);
  let image = document.getElementById('file');
  image.src = URL.createObjectURL(event.target.files[0]);

  let htmlTag = `<img id="img" style="text-align:center" src="${image.src}" crossorigin='anonymous' width="1000" height="800"/>`;
  document.getElementById("innerTag").innerHTML = htmlTag;

  const img = document.getElementById('img');
  cocoSsd.load().then(model => {
    // detect objects in the image.
    model.detect(img).then(predictions => {
      for (let index = 0; index < predictions.length; index++) {
        
        context.fillStyle = 'rgba(0,225,0,0.05)';
        context2.fillStyle = '#1e4c76';

        context2.font = "25px Arial";
        context2.fillText(predictions[index].class, predictions[index].bbox[0], predictions[index].bbox[1] + 14);

        context.strokeRect(predictions[index].bbox[0], predictions[index].bbox[1], predictions[index].bbox[2], predictions[index].bbox[3]);
        context.fillRect(predictions[index].bbox[0], predictions[index].bbox[1], predictions[index].bbox[2], predictions[index].bbox[3]);
      }

    });
  });
}