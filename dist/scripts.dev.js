"use strict";

var reloadQuote = function reloadQuote() {
  var numb = Math.floor(Math.random() * 1643);
  fetch("https://type.fit/api/quotes").then(function (response) {
    return response.json();
  }).then(function (data) {
    document.getElementById("quotes").innerHTML = data[numb].text;
    document.getElementById("author").innerHTML = data[numb].author;
  });
};

var photosHeight;
var photosHtml;
var photosReference;
var photosWidth;
var key = 'AIzaSyA2tLUogp1e_tnALcAO1-v_PLhcxdedoxM';
var inputText = "canada"; //var getImage = function () {

var proxyUrl = "https://cors-anywhere.herokuapp.com/";
var queryUrl = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=\"".concat(inputText, "\"&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&key=").concat(key);
fetch(proxyUrl + queryUrl).then(function (response) {
  return response.json();
}).then(function (data) {
  //if (!error && response.statusCode == 200) {
  var photosObject = data.candidates[0].photos[0];
  photosHeight = photosObject.height;
  photosHtml = photosObject.html_attributions;
  photosReference = photosObject.photo_reference;
  photosWidth = photosObject.width;
  console.log(data);
  /*    
      let text = '<img src = ';
      let imgUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photosReference}&key=${key}`;
      let text2 = ` id=cd alt=${photosReference}></img>`;
      let totalText = text + imgUrl + text2;
      document.getElementById("photo").innerHTML = totalText;
  */
  // }
}); //}