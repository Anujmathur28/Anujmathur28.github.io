"use strict";

var randomNumberGenerator = function randomNumberGenerator(maxRange) {
  var numbGenerated = Math.floor(Math.random() * maxRange);
  return numbGenerated;
};

var reloadQuote = function reloadQuote() {
  var numberQuote = randomNumberGenerator(1643);
  fetch("https://type.fit/api/quotes").then(function (response) {
    return response.json();
  }).then(function (data) {
    document.getElementById("quotes").innerHTML = data[numberQuote].text;
    document.getElementById("author").innerHTML = data[numberQuote].author;
  });
};