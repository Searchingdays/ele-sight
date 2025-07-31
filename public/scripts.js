let map;
let clickedLocation = null;
let currentmarker = null;

function initMap(){

  map = L.map('map').setView([20.5, 78.9], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  // Ask for user's location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        clickedLocation = position.coords;
        
        console.log(clickedLocation);

        currentmarker = L.marker([userLat, userLng]).addTo(map);
        currentmarker.bindPopup("You are here").openPopup();

        // Zoom to user location
        map.setView([userLat, userLng], 13);
      },
      (error) => {
        console.log("Geolocation permission denied or unavailable", error);
        alert("Location access denied. You can still report a sighting by clicking on the map.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }


  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  
  map.on("click", (e)=>{
  currentmarker = L.marker(e.latlng).addTo(map);
  clickedLocation = e.latlng;
  } );
}



document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  if (!clickedLocation) {
    alert("Click on the map to select location.");
    return;
  }

  const description = document.getElementById("description").value;

  if (clickedLocation.lat){

  fetch("/api/sightings/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    
    body: JSON.stringify({
      latitude: clickedLocation.lat,
      longitude: clickedLocation.lng,
      description,
    }),
  })
    .then((res) => {alert("Sighting reported!");

    document.getElementById("description").value = '';

    currentmarker.remove();

    L.circle(clickedLocation, {color:"red", radius:50}).addTo(map)
  })
}
  else {

  fetch("/api/sightings/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    
    body: JSON.stringify({
      latitude: clickedLocation.latitude,
      longitude: clickedLocation.longitude,
      description,
    }),
  })
    .then((res) => {alert("Sighting reported!");

    document.getElementById("description").value = '';

    currentmarker.remove();

    L.circle([clickedLocation.latitude, clickedLocation.longitude], {color:"red", radius:50}).addTo(map)
  })

}


  
});


//   // Fetch existing sightings

document.getElementById("allsightings").addEventListener("click", () => {
 getsightings()
});



function getsightings(){
  fetch('/api/sightings/all')
    .then(res => res.json())
    .then(sightings => {
        console.log(sightings)
        sightings.forEach(s => {
        L.circle([s.latitude, s.longitude], {color: "red", radius: 50})
          .addTo(map)
          .bindPopup(s.description);
      })
    })
  }


    initMap();
    //});


