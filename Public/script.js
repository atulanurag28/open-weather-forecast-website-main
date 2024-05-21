if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    alert("Geolocation is not supported by this browser.");
  }

  
  function successCallback(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
  
    // Send a reverse geocoding request to OpenCage API
    var apiKey = '4b6b68bd8dbc47338a54f928dc502ba2';
    var url = 'https://api.opencagedata.com/geocode/v1/json?q=' + lat + '+' + lng + '&key=' + apiKey;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status.code == 200 && data.results.length > 0) {
          var components = data.results[0].components;
          document.getElementById("current_city").innerHTML=components.state+", "+components.country;
        
          document.getElementById('current_city_value').value = components.state;
        } else {
          console.log('Error occurred while retrieving geolocation data: ' + data.status.message);
        }
      })
      .catch(error => {
        console.log('Error occurred while retrieving geolocation data: ' + error.message);
      });
  }
  
  function errorCallback(error) {
    alert("Error occurred while retrieving geolocation data: " + error.message);
  }


