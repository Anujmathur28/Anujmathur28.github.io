let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");
var loadFile = function (event) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  let image = document.getElementById('file');
  image.src = URL.createObjectURL(event.target.files[0]);

  let htmlTag = `<img id="img" src="${image.src}" crossorigin='anonymous' width="500" height="400"/>`;
  document.getElementById("innerTag").innerHTML = htmlTag;

  const img = document.getElementById('img');
  cocoSsd.load().then(model => {
    // detect objects in the image.
    model.detect(img).then(predictions => {
      textArray = "Hmmm...I can find: ";
      console.log(predictions);
      
      for (let index = 0; index < predictions.length; index++) {
        console.log(predictions[index].bbox[0], predictions[index].bbox[1]);
        context.fillStyle ='rgba(0,225,0,0.2)';
        
        //context.fillRect(predictions[index].bbox[0], predictions[index].bbox[1], predictions[index].bbox[2], predictions[index].bbox[3]);       
        context.strokeRect(predictions[index].bbox[0], predictions[index].bbox[1], predictions[index].bbox[2], predictions[index].bbox[3]);       
        context.fillRect(predictions[index].bbox[0], predictions[index].bbox[1], predictions[index].bbox[2], predictions[index].bbox[3]);       
      
        textArray += predictions[index].class;
        index === predictions.length - 1 ? textArray += " " : textArray += ", ";
      }
      document.getElementById("text").innerHTML = textArray;
    });
  });

  mobilenet.load().then(model => {
    // Classify the image.
    model.classify(img).then(predictions => {
      console.log('Predictions: ');
      console.log(predictions);
    });
  });
};