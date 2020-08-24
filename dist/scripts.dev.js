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
/**************************************************************************/


var imageGame = function imageGame() {
  var photosHeight;
  var photosHtml;
  var photosReference;
  var photosWidth;
  var placeId;
  var key = 'AIzaSyA2tLUogp1e_tnALcAO1-v_PLhcxdedoxM';
  var inputText = document.getElementById("searchTextField").value;
  var proxyUrl = "https://cors-anywhere.herokuapp.com/";
  var queryUrl = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=".concat(inputText, "&inputtype=textquery&fields=photos,geometry,place_id,type,formatted_address,name,opening_hours,rating&key=").concat(key);
  fetch(proxyUrl + queryUrl).then(function (response) {
    return response.json();
  }).then(function (data) {
    var photosObject = data.candidates[0].photos[0];
    placeId = data.candidates[0].place_id;
    photosHeight = photosObject.height;
    photosHtml = photosObject.html_attributions;
    photosReference = photosObject.photo_reference;
    photosWidth = photosObject.width;
    var text = '<img src = ';
    var imgUrl = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=".concat(photosReference, "&key=").concat(key);
    var text2 = " id=cd alt=".concat(photosReference, "></img>");
    var totalText = text + imgUrl + text2;
    document.getElementById("photo").innerHTML = totalText;
  }).then(function (data) {
    var imgUrl = "https://maps.googleapis.com/maps/api/place/details/json?place_id=".concat(placeId, "&fields=icon,photo,name,rating&key=").concat(key);
    fetch(proxyUrl + imgUrl).then(function (response) {
      return response.json();
    }).then(function (data) {
      var offset = 0;
      var photoArray = data.result.photos;

      var _loop = function _loop(index) {
        var reference = photoArray[index].photo_reference;
        setTimeout(function () {
          console.log(reference);
          var text1 = '<img src = ';
          var imgUrl1 = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=".concat(reference, "&key=").concat(key);
          var text21 = " id=cd alt=".concat(reference, "></img>");
          var totalText1 = text1 + imgUrl1 + text21;
          document.getElementById("photo").innerHTML = totalText1;
        }, 2000 + offset);
        offset += 2000;
      };

      for (var index = 0; index < photoArray.length; index++) {
        _loop(index);
      }
    });
  });
}; //let imageGames(){
//  console.log()
//}

/* 
                    let text1 = '<img src = ';
                    let imgUrl1 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${reference}&key=${key}`;
                    let text21 = ` id=cd alt=${reference}></img>`;
                    let totalText1 = text1 + imgUrl1 + text21;
                    
                    document.getElementById("photo").innerHTML = totalText1;*/

/*********************************************************************************/


function initialize() {
  var input = document.getElementById('searchTextField');
  new google.maps.places.Autocomplete(input);
}

google.maps.event.addDomListener(window, 'load', initialize);