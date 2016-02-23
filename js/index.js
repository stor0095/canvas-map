// Geemakun Storey - Canvas Geolocation Map
"use strict";

let c1, ctx1;

let canvas = document.createElement("canvas");
document.querySelector("body").appendChild(canvas);
document.body.style.backgroundColor = "#A0B5C4";
let div = document.getElementById("location");


if( navigator.geolocation ){ 
  let params = {enableHighAccuracy: true, timeout: 25000, maximumAge: 30000};
  navigator.geolocation.getCurrentPosition( displayPostion, locationError, params);
}
else {
    alert("Update your old broswer");
}

function displayPostion(position){
    // Function declarations
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let dateTime = new Date(position.timestamp);
    let format = dateTime.toISOString();
    
    c1 = document.querySelector("canvas");
    c1.width = 1500;
    c1.height = 1500;
    ctx1 = c1.getContext("2d");
   let userMap = "http://maps.googleapis.com/maps/api/staticmap?center="+lat+ ','+long+"&zoom=14&size=400x300&sensor=false&markers=color:red%7Clabel:U%7C"+lat+','+long;
   let imageObj = new Image();
            imageObj.src = userMap;
            imageObj.onload = function(){
              ctx1.drawImage(imageObj, 400, 50, 400, 300); // Map is 400x300 because it doesn't look distorted when compared to 400x400.
            }
    // Text for the map        
    ctx1.beginPath();
    ctx1.font = "bold 14pt Arial";
    ctx1.fillText("Your Current Location", 500, 25);
    ctx1.font = "bold 10pt Arial";
    ctx1.fillText("Your latitude is: " + lat, 145, 65 );
    ctx1.fillText("Your longitude is: " + long, 145, 85 );
    ctx1.fillText("Accuracy: " + Math.floor(position.coords.accuracy * 3.28084) + " feet", 145, 105); // Math floor accuracy from http://codepen.io/CaptainBedpan/pen/mJdXVp?editors=1010
    ctx1.fillText("Timestamp: " + format , 145, 125 );
    ctx1.fillText(div.style.display = "none");
    ctx1.closePath();     
}       

function locationError(error){
    let errors = {1:'Permision Denied', 2: 'Position Unavailable', 3: 'Timeout Error'};
    alert("Error: " + errors[error.code]);
}