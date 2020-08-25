let guessPoint;
let actualPoint;

var reloadQuote = function () {
    var numb = Math.floor(Math.random() * 1643);
    fetch("https://type.fit/api/quotes").then(function (response) {
        return response.json();
    }).then(function (data) {
        document.getElementById("quotes").innerHTML = data[numb].text;
        document.getElementById("author").innerHTML = data[numb].author;
    });
}
/**************************************************************************/
var imageGame = function (text) {
    myMap();
    let photosHeight;
    let photosHtml;
    let photosReference;
    let photosWidth;
    let placeId;
    const key = 'AIzaSyA2tLUogp1e_tnALcAO1-v_PLhcxdedoxM';
   // const inputText = document.getElementById("searchTextField").value;
    const inputText = text;
    //console.log(inputText);
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    let queryUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${inputText}&inputtype=textquery&fields=photos,geometry,place_id,type,formatted_address,name,opening_hours,rating&key=${key}`;

    fetch(proxyUrl + queryUrl).then(function (response) {
            return response.json();
        }).then(function (data) {
            var photosObject = data.candidates[0].photos[0];
            placeId = data.candidates[0].place_id;
            photosHeight = photosObject.height;
            photosHtml = photosObject.html_attributions;
            photosReference = photosObject.photo_reference;
            photosWidth = photosObject.width;
        })
        .then(function (data) {
            let imgUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry,plus_code,photo,name,rating&key=${key}`;

            fetch(proxyUrl + imgUrl).then(function (response) {
                return response.json();

            }).then(function (data) {
                actualPoint = data.result.geometry.location;
               
                let offset = 0;
                let photoArray = data.result.photos;
                for (let index = 0; index < photoArray.length; index++) {
                    let reference = photoArray[index].photo_reference;
                    setTimeout(function () {
                        let text1 = '<img src = ';
                        let imgUrl1 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${reference}&key=${key}`;
                        let text21 = ` id=cd alt=${reference}></img>`;
                        let totalText1 = text1 + imgUrl1 + text21;

                        document.getElementById("photo").innerHTML = totalText1;

                    }, 2000 + offset);
                    offset += 2000;
                }

            });
        });
}

//let imageGames(){
//  console.log()
//}
/* 
                    let text1 = '<img src = ';
                    let imgUrl1 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${reference}&key=${key}`;
                    let text21 = ` id=cd alt=${reference}></img>`;
                    let totalText1 = text1 + imgUrl1 + text21;
                    
                    document.getElementById("photo").innerHTML = totalText1;*/
/*********************************************************************************
function initialize() {
    var input = document.getElementById('searchTextField');
    new google.maps.places.Autocomplete(input);
}

google.maps.event.addDomListener(window, 'load', initialize);

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA2tLUogp1e_tnALcAO1-v_PLhcxdedoxM&libraries=places"></script>

/************************************************************************************
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(51.508742, -0.120850),
        zoom: 5,
        
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

/************************************************************************************/
function theMap() {
    const map = new google.maps.Map(document.getElementById("googleMap"), {
        zoom: 4,
        center: { lat: -25.363882, lng: 131.044922 }
      });
    return map;
}
function myMap() {
    let count = 0; 
    let map = theMap();
    map.addListener("click", e => {
      count = count + 1;
      if(count <= 1){
      placeMarkerAndPanTo(e.latLng, map);
    }else{
        myMap();
    }
    });
  }
  
  function placeMarkerAndPanTo(latLng, map) {
      
    new google.maps.Marker({
      position: latLng,
      map: map
    });
    map.panTo(latLng);
    
    let lat = latLng.lat();
    let long = latLng.lng();
    guessPoint = {lat: lat, lng: long };
 
  }

  function submitGuess(){
    let map = theMap();
    
    if(typeof actualPoint !== 'undefined'){
    var mk1 = new google.maps.Marker({position: actualPoint, map: map});
    //var mk2 = new google.maps.Marker({position: guessPoint, map: map});
    var line = new google.maps.Polyline({path: [actualPoint, guessPoint], map: map});
    }else{
       myMap();
    }
  }
 

async function city () {
    let total = 245;
    const where = encodeURIComponent(JSON.stringify({
        "capital": {
            "$exists": true
        }
    }));
    const response = await fetch(
        `https://parseapi.back4app.com/classes/Continentscountriescities_Country?limit=${total}&order=emoji&excludeKeys=emoji,phone,currency,shape&where=${where}`, {
            headers: {
                'X-Parse-Application-Id': 'g5GddGZX5VkbEL3fuVL1HGrvY8k7BkzcOCAK0UFA', // This is your app's application id
                'X-Parse-REST-API-Key': 'FrSe7oACe16OuMzNGPaDV3np6tzIpl3AZwVgACEG', // This is your app's REST API key
            }
        }
    );

    const data = await response.json();

    var numb = Math.floor(Math.random() * total);
    if (typeof data.results[numb].capital !== 'undefined') {

        imageGame( data.results[numb].capital );
    }


};