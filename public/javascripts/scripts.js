


$( "#getAddress" ).click(function() {
 if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
});


function showPosition(position) {
	var geocoder = new google.maps.Geocoder;
   console.log("Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude);
   var latlng = {lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude)};
   geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
       			console.log(results)
              $('#enteredAddress').val(results[0].formatted_address)
             //document.getElementById('enteredAddress').value = results[1].formatted_address;
            } else {
              window.alert('No results found');
            }
        });
}
function getevents(){
$.ajax({url: "https://api.cityofnewyork.us/calendar/v1/search.htm?app_id=50d4593b&app_key=53d1241d31d9ddf5a0f1ed73708f05f9&categories=Kids+and+family&zip=10001",
     jsonp: "callback",
      dataType: "jsonp",
       success: function(response) {
     console.log(response);
  }
})
      }

var queryString = $('#mainForm').serialize();
console.log(queryString)


// works
// $('#mainForm').on('submit', function() {
// 	event.preventDefault();
//     var arr = new Array();
// $(':input').each(function() {
//  arr.push($(this).val());
// });
// console.log(arr);
// });


$(document).ready(function(){
  $("#mainForm").submit(function(event){
    event.preventDefault();
    var name = $("input[name='name']",this).val();
    var email = $("input[name='email']",this).val();
  });
});




