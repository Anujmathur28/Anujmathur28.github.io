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
var photosWidth; //var getImage = function () {

var proxyUrl = "https://cors-anywhere.herokuapp.com/";
var url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mongolian%20grill&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=AIzaSyA2tLUogp1e_tnALcAO1-v_PLhcxdedoxM";
fetch(proxyUrl + url).then(function (response) {
  return response.json();
}).then(function (data) {
  //if (!error && response.statusCode == 200) {
  var photosObject = data.candidates[0].photos[0];
  photosHeight = photosObject.height;
  photosHtml = photosObject.html_attributions;
  photosReference = photosObject.photo_reference;
  photosWidth = photosObject.width; // }
}); //}

/*
import * as request from 'request'; //request module
import * as fs from 'fs'; //writing to output 
var png = require('console-png'); */

/*
let picture = {
    url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${photosWidth}&photoreference=${photosReference}&key=AIzaSyA2tLUogp1e_tnALcAO1-v_PLhcxdedoxM`,
    method: 'GET' //export the dashboard specified with the dashboard id in the url above
};

const writeToFile = (body: string) => {
    fs.writeFile(`./image4.png`, body, function(err) { //writing to the json file
        console.log("The file was saved!");
   }); 
}

const image = (error: string, response: { statusCode: number; }, body: string) => {
    //if (!error && response.statusCode == 200) {
         
    writeToFile(body); 
//}
}
request(picture, image); */