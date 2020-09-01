"use strict";

var data = {
  "intents": [{
    "tag": "greeting",
    "patterns": ["Hi", "How are you", "Is anyone there?", "Hello", "Good day"],
    "responses": ["Hello, thanks for visiting", "Good to see you again", "Hi there, how can I help?"],
    "context_set": ""
  }, {
    "tag": "goodbye",
    "patterns": ["Bye", "See you later", "Goodbye"],
    "responses": ["See you later, thanks for visiting", "Have a nice day", "Bye! Come back again soon."]
  }, {
    "tag": "thanks",
    "patterns": ["Thanks", "Thank you", "That's helpful"],
    "responses": ["Happy to help!", "Any time!", "My pleasure"]
  }, {
    "tag": "hours",
    "patterns": ["What hours are you open?", "What are your hours?", "When are you open?"],
    "responses": ["We're open every day 9am-9pm", "Our hours are 9am-9pm every day"]
  }, {
    "tag": "payments",
    "patterns": ["Do you take credit cards?", "Do you accept Mastercard?", "Are you cash only?"],
    "responses": ["We accept VISA, Mastercard and AMEX", "We accept most major credit cards"]
  }, {
    "tag": "opentoday",
    "patterns": ["Are you open today?", "When do you open today?", "What are your hours today?"],
    "responses": ["We're open every day from 9am-9pm", "Our hours are 9am-9pm every day"]
  }]
};
var textArray = "";

var loadFile = function loadFile(event) {
  var image = document.getElementById('file');
  image.src = URL.createObjectURL(event.target.files[0]);
  var htmlTag = "<img id=\"img\" src=\"".concat(image.src, "\" crossorigin='anonymous' width=\"500\" height=\"400\"/>");
  console.log(htmlTag);
  document.getElementById("l").innerHTML = htmlTag;
  var img = document.getElementById('img');
  console.log(img); // Load the model.

  setTimeout(function () {
    cocoSsd.load().then(function (model) {
      // detect objects in the image.
      model.detect(img).then(function (predictions) {
        console.log('Predictions: ');
        textArray = "Hmmm...I can only find: ";

        for (var index = 0; index < predictions.length; index++) {
          textArray += predictions[index]["class"] + ", ";
        }

        document.getElementById("text").innerHTML = textArray;
      });
    });
  }, 1000);
};