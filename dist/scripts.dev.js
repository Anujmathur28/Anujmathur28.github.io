"use strict";

var reloadQuote = function reloadQuote() {
  var numb = Math.floor(Math.random() * 1643);
  fetch("https://type.fit/api/quotes").then(function (response) {
    return response.json();
  }).then(function (data) {
    document.getElementById("quote").innerHTML = data[numb].text;
    document.getElementById("author").innerHTML = data[numb].author;
  });
};