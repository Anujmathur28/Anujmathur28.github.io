let guessPoint;
let actualPoint;
let markers = [];
let count;

let photosHeight;
let photosHtml;
let photosReference;
let photosWidth;
let placeId;

/**************************************************************************/
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

                //let offset = 0;
                let photoArray = data.result.photos;
                let totalText1 = "";
                for (let index = 0; index < photoArray.length; index++) {
                    let reference = photoArray[index].photo_reference;
                    // setTimeout(function () {
                    totalText1 += '<img src = ';
                    totalText1 += `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${reference}&key=${key}`;
                    totalText1 += ` id=cd alt=maps width="600" height="500"></img>`;
                    totalText1 += "    ";


                    //<div class="container">    <img src="images/bhutan1.jpg" alt="Bhutan">    <img src="images/bhutan2.jpg" alt="Bhutan">    <img src="images/bhutan3.jpg" alt="Bhutan">    <img src="images/bhutan4.jpg" alt="Bhutan">    <img src="images/bhutan5.jpg" alt="Bhutan">    <img src="images/bhutan6.jpg" alt="Bhutan">    <img src="images/bhutan7.jpg" alt="Bhutan"></div>

                    document.getElementById("photo").innerHTML = totalText1;


                    //  }, 2000 + offset);
                    // offset += 2000;
                }

            });
        });
}

/**************************************************************************/

function theMap() {
    const map = new google.maps.Map(document.getElementById("googleMap"), {
        zoom: 2.7,
        center: {
            lat: 20,
            lng: 10
        }
    });
    return map;
}

/**************************************************************************/
function myMap() {
    count = 0;
    let map = theMap();
    // var marker = new google.maps.Marker({
    //   map:map
    //});
    map.addListener("click", e => {
        count++;
        placeMarkerAndPanTo(e.latLng, map);
    });
}

/**************************************************************************/
function clearMarkers() {
    setMapOnAll(null);
}

function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}


function placeMarkerAndPanTo(latLng, map) {

    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
    if (count > 1) {
        clearMarkers();
    }

    markers.push(marker);

    map.panTo(latLng);

    let lat = latLng.lat();
    let long = latLng.lng();
    guessPoint = {
        lat: lat,
        lng: long
    };
}


/**************************************************************************/

function haversine_distance(mk1, mk2) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1.position.lat() * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2.position.lat() * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (mk2.position.lng() - mk1.position.lng()) * (Math.PI / 180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
}

/**************************************************************************/
function submitGuess() {
    let map = theMap();
    
    if (typeof actualPoint !== 'undefined') {
        

        var mk1 = new google.maps.Marker({
            position: actualPoint,
            map: map
        });
        var mk2 = new google.maps.Marker({
            position: guessPoint,
            map: map
        });
        var distM = haversine_distance(mk1, mk2);
        var distKm = distM * 1.60934;
        document.getElementById("distance").innerHTML = distKm;
        var line = new google.maps.Polyline({
            path: [actualPoint, guessPoint],
            map: map
        });
        
        
    } else {
        myMap();
    }
}


/**************************************************************************/

async function city() {
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

        imageGame(data.results[numb].capital);
    }


};

/**************************************************************************/