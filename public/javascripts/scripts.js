function getUserAddress(e){
	console.log("I was clicked")
}

$('#getAddress').on('click', function(){
    addEventListener('click', getUserAddress)
	getLocation();
});

$('#enteredAddress').keydown( function( event ) {
    if ( event.which === 13 ) {
    	alert(event.currentTarget.value)
        event.preventDefault();
        return false;
    }
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
   console.log("Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude);
   getevents();
}
function getevents(){
$.ajax({url: "https://api.cityofnewyork.us/calendar/v1/search.htm?app_id=50d4593b&app_key=53d1241d31d9ddf5a0f1ed73708f05f9&categories=Kids+and+family&zip=10001",
     json: "callback",
      dataType: "json",
       success: function(response) {
     console.log(response);
  }
})
      }


