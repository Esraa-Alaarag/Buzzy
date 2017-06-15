
$("#getAddress").click(getTheAddress)

function getTheAddress(){
    $('#enteredAddress').val(" ")
   $("#getAddress").replaceWith("<img class='loading' src='/images/loading.gif' alt='loading' />").fadeIn();  
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
};

$("#getAddress").click(function () {
   document.getElementById("mainForm").reset();
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
            $(".loading").replaceWith("<a class='waves-effect waves-light btn-large' id='getAddress'> or Click here to get your location</a>").fadeIn();
            $('#enteredAddress').val(results[0].formatted_address)
            $("#getAddress").click(getTheAddress)
            //document.getElementById('enteredAddress').value = results[1].formatted_address;
        } else {
            window.alert('No results found');
        }
    });
}

// $( document ).ready(function() {
//     var now = new Date();
//     document.getElementById("StartDate").defaultValue = "2017-06-16";
//     document.getElementById("EndDate").defaultValue = "2017-06-17";
// });

$('#mainForm').on('submit', function () {
    event.preventDefault();
    var userPref = new Array();
    $(':input').each(function () {
        userPref.push($(this).val());
    });
    console.log(userPref);
    var address= userPref[0];
    var startDate=userPref[1];
    var endDate=userPref[2];
    startDate=FormatDate(startDate)
    endDate=FormatDate(endDate)
    // var startDate="06%2F14%2F2017+12%3A00+am";
    // var endDate="06%2F16%2F2017+12%3A00+am";
    var Boroughs=$("#borough").val().join('+');
    var categories=$("#Category").val().join('+');
    
    console.log(zip , startDate , endDate , Boroughs, categories )
    //for()
    getevents()
    
});

function FormatDate(date){
    date=date.split("-")
    console.log(date);
    var Day=date[2];
    var Month=date[1];
    var Year=date[0];
    datestring=Month+"%2F"+Day+"%2F"+Year+"+"+"12"+"%3A"+"00"+"+"+"am";
    console.log(datestring);
    console.log("06%2F14%2F2017+12%3A00+am");
    return datestring;
}

// function getevents(zip , startDate , endDate , Boroughs, categories,pageNumber) {
//     console.log(`https://api.cityofnewyork.us/calendar/v1/search.htm?app_id=50d4593b&app_key=53d1241d31d9ddf5a0f1ed73708f05f9&startDate=${startDate}&endDate=${endDate}&boroughs=${Boroughs}&categories=${categories}&pageNumber=${pageNumber}`);
//     $.ajax({ url: `https://api.cityofnewyork.us/calendar/v1/search.htm?app_id=50d4593b&app_key=53d1241d31d9ddf5a0f1ed73708f05f9&startDate=${startDate}&endDate=${endDate}&boroughs=${Boroughs}&categories=${categories}&pageNumber=${pageNumber}`,
//         jsonp: "callback",
//         dataType: "jsonp",
//         success: function (response) {
//             var events = " "
//             console.log(response);
//             for(var i=0;i<10;i++){
//                 if(response.items[i].geometry!==undefined){
//                 var description =response.items[i].desc.split("\\n",1);
//                 var description =description[0].split("<a",1);
//                 var description =description[0].split("<\\",1);
//                 var date = response.items[i].startDate.split("T",1);
//             events +=`<div class="section white">
//             <p>Event's name:${response.items[i].name}</p>
//             <p>boroughs :${response.items[i].boroughs[0]}</p>
//             <p>discription: ${description}</p>
//             <p>Date: ${date}</p>
//             <p>location lat: ${response.items[i].geometry[0].lat} lng ${response.items[i].geometry["0"].lng} </p>
//             <p>Location: ${response.items[i].address}</p>
//             <p>Time: ${response.items[i].timePart}</p>
//             <p>Event Website: <a href=${response.items[i].permalink}>${response.items[i].permalink}</a></p>
//             </div>`}
//             }
//             document.getElementById("results").innerHTML=events;
//         }
//     })

    
// }

function getevents (){
    var oArgs = {

      app_key: "c8k7HD8DxtLXZswH",

      q: "kids",

      where: "New York", 

      "date": "2017061000-2017062000",

      page_size: 20,

      sort_order: "popularity",

      id: "family_fun_kids"

   };
   // EVDB.API.call("/categories/list", oArgs, function(oData) {
   EVDB.API.call("/events/search", oArgs, function(oData) {

      console.log(oData);
      console.log(oData.events.event["0"].title); 
      var events = " "
            for(var i=0;i<10;i++){
            events +=`<div class="section white">
            <p>Event's name:${oData.events.event[i].title}</p>
            <img class='eventpic' src=${oData.events.event[i].image.medium.url} alt='event picture' />
            <p>Event website: <a href=${oData.events.event[i].url}>Click here</a></p>`}
            document.getElementById("results").innerHTML=events;

    });

}


   
// <p>discription: ${description}</p>
//             <p>Date: ${date}</p>
//             <p>location lat: ${response.items[i].geometry[0].lat} lng ${response.items[i].geometry["0"].lng} </p>
//             <p>Location: ${response.items[i].address}</p>
//             <p>Time: ${response.items[i].timePart}</p>
//             <p>Event Website: <a href=${response.items[i].permalink}>${response.items[i].permalink}</a></p>
//             </div>







