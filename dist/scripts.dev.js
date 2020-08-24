"use strict";

var photosHeight;
var photosHtml;
var photosReference;
var photosWidth;
var placeId;
var key = 'AIzaSyA2tLUogp1e_tnALcAO1-v_PLhcxdedoxM';
var inputText = "statue of liberty";
var proxyUrl = "https://cors-anywhere.herokuapp.com/";

var reloadQuote = function reloadQuote() {
  var numb = Math.floor(Math.random() * 1643);
  fetch("https://type.fit/api/quotes").then(function (response) {
    return response.json();
  }).then(function (data) {
    document.getElementById("quotes").innerHTML = data[numb].text;
    document.getElementById("author").innerHTML = data[numb].author;
  });
};

var queryUrl = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=".concat(inputText, "&inputtype=textquery&fields=photos,geometry,place_id,type,formatted_address,name,opening_hours,rating&key=").concat(key);
fetch(proxyUrl + queryUrl).then(function (response) {
  return response.json();
}).then(function (data) {
  var photosObject = data.candidates[0].photos[0];
  placeId = "'" + data.candidates[0].place_id + "'"; //console.log(placeId);

  photosHeight = photosObject.height;
  photosHtml = photosObject.html_attributions;
  photosReference = photosObject.photo_reference;
  photosWidth = photosObject.width;
  var text = '<img src = ';
  var imgUrl = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=".concat(photosReference, "&key=").concat(key);
  var text2 = " id=cd alt=".concat(photosReference, "></img>");
  var totalText = text + imgUrl + text2;
  document.getElementById("photo").innerHTML = totalText; // }
}); //}
//var getImage = function () {

placeId = 'ChIJN1t_tDeuEmsRUsoyG83frY4';
var imgUrl = "https://maps.googleapis.com/maps/api/place/details/json?place_id=".concat(placeId, "&fields=icon,photo,name,rating&key=").concat(key);
fetch(proxyUrl + imgUrl).then(function (response) {
  return response.json();
}).then(function (data) {
  //if (!error && response.statusCode == 200) {
  console.log(data); // }
}); //}