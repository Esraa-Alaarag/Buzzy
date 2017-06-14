$("#getAddress").click(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
});

var zip=" ";
function showPosition(position) {
    var geocoder = new google.maps.Geocoder;
    console.log("Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude);
    var latlng = {
        lat: parseFloat(position.coords.latitude),
        lng: parseFloat(position.coords.longitude)
    };
    geocoder.geocode({
        'location': latlng
    }, function (results, status) {
        if (status === 'OK') {
            console.log(results)
            zip=parseInt(results[1].address_components[6].long_name , 10)
            console.log(zip)
            $('#enteredAddress').val(results[0].formatted_address)
            //document.getElementById('enteredAddress').value = results[1].formatted_address;
        } else {
            window.alert('No results found');
        }
    });
}

$( document ).ready(function() {
    var now = new Date();
    document.getElementById("StartDate").defaultValue = "2017-06-14T14:42:13.510";
    document.getElementById("EndDate").defaultValue = "2017-06-16T14:42:13.510";
});

$('#mainForm').on('submit', function () {
    event.preventDefault();
    var userPref = new Array();
    $(':input').each(function () {
        userPref.push($(this).val());
    });
    console.log(userPref);
    var address= userPref[0];
    /*var startDate=userPref[1];
    var endDate=userPref[2];*/
    var startDate="06%2F14%2F2017+12%3A00+am";
    var endDate="06%2F16%2F2017+12%3A00+am";
    var Boroughs=$("#borough").val().join('+');
    // var categories=$("#Category").val().join('+');
    var categories=5
    console.log(zip , startDate , endDate , Boroughs, categories )
    console.log(categories);
    //for()
    getevents(zip , startDate , endDate , Boroughs, categories,1)
    
});

function getevents(zip , startDate , endDate , Boroughs, categories,pageNumber) {
    $.ajax({ url: `https://api.cityofnewyork.us/calendar/v1/search.htm?app_id=50d4593b&app_key=53d1241d31d9ddf5a0f1ed73708f05f9&startDate=${startDate}&endDate=${endDate}&boroughs=${Boroughs}&categories=${categories}&pageNumber=${pageNumber}`,
        jsonp: "callback",
        dataType: "jsonp",
        success: function (response) {
            var events = " "
            console.log(response);
            for(var i=0;i<10;i++){
                var description =response.items[i].desc.split("\\n",1);
                var description =description[0].split("<a",1);
                var description =description[0].split("<\\",1);
                var date = response.items[i].startDate.split("T",1);
            events +=`<div class="section white">
            <p>Event's name:${response.items[i].name}</p>
            <p>boroughs :${response.items[i].boroughs["0"]}</p>
            <p>discription: ${description}</p>
            <p>Date: ${date}</p>
            <p>Location: ${response.items[i].address}</p>
            <p>Time: ${response.items[i].timePart}</p>
            <p>Event Website: <a href=${response.items[i].permalink}>${response.items[i].permalink}</a></p>
            </div>`
            }
            document.getElementById("results").innerHTML=events;
        }
    })

    
}









