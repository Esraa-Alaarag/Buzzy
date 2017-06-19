let baseURL = '/';
// this flag to show the user his location on the map if he clicked that option
var isitclicked = false;

// this function Initialize the map to new york with zoom = 10
function mapInitialize() {
    myMap(40.7400245, -73.9897259, 10);
}

var infoArr = []

// attaching the btn to the function
//I did not make it inline function 
//because I need to call the function 
//again after changing the btn to loading
//and viseversa
$("#getAddress").click(getTheAddress)

function getTheAddress() {
    $( "#enteredAddress" ).prop('disabled', true);
    //replace the btn with loading image
    $("#getAddress").replaceWith("<img class='loading' src='/images/loading.gif' alt='loading' />").fadeIn();
    //get the user IP address, upon success call a function to get lat and lng
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    } 
    // error msg
    else {
        console.log("Geolocation is not supported by this browser.");
    }
}

// $("#getAddress").click(function () {
//     document.getElementById("mainForm").reset();
// });

// initlize global variable
var latlng ={}

// getting latitute and longitude
function showPosition(position) {
    // set the flag to true which means that the btn was clicked
    isitclicked = true;
    var geocoder = new google.maps.Geocoder;
    console.log("Latitude: " + position.coords.latitude +
        "Longitude: " + position.coords.longitude);
    // display the user location on the map
    myMap(position.coords.latitude, position.coords.longitude, 15)
    // stringify the object
    stringifycoord(position.coords.latitude,position.coords.longitude)
    // object of user location
    latlng = {
        lat: parseFloat(position.coords.latitude),
        lng: parseFloat(position.coords.longitude)
    };
    geocoder.geocode({
        'location': latlng
    }, function (results, status) {
        // after getting the address successfuly
        if (status === 'OK') {
            // change the pictre back to btn
            $(".loading").replaceWith("<a class='waves-effect waves-light btn-large' id='getAddress'>Use my location</a>").fadeIn();
            // save the address is we write it
            // display the address in the input field
            $('#enteredAddress').val(results[0].formatted_address)
            // 
            $("#getAddress").click(getTheAddress)
        } 
        else {
            // when error
            console.log(`This address not exist, status: ${status}`);
        }
    });
}

// after submitting the form function
$('.submit').on('click', function () {
    
    event.preventDefault();
    if(event.target.id==="submit"){
    // get the dates values from input field
    var address= $("#enteredAddress").val();
    var startDate = $("#StartDate").val();
    var endDate = $("#EndDate").val();
    var radius= $('#radius').val();

    $('html, body').animate({
        scrollTop: $( $('.try').attr('href') ).offset().top
    }, 1500);

    // validate start and end dates
    // setting default value if the user did not enter start date get todays date converted
    // to the API required format
    startDate ? startDate=FormatDate(startDate) : startDate=today();
    
    // if the user did not enter End date get the date after 10 days and convert
    // convert to the API required format
    endDate ? endDate=FormatDate(endDate) : endDate=""
    // getting the required category from selection if not entered select music
    var categories = $("#Category").val();
    console.log(startDate,endDate, categories);
    infoArr[2]=startDate
    infoArr[3]=endDate
    infoArr[1]=categories
    infoArr[4]=radius
    infoArr[5]=0
    if(!isitclicked){
        getcoordinate(address)
    }// calling the API for data
    else getevents(infoArr[5])
}
        
});

// change the date format to the format that API requested
function FormatDate(date) {
    datestring = date+"T00:00:00Z";
    console.log(datestring);
    return datestring;
}

// get todays date converted to API required format
function today() {
    var temp=""
    var date = new Date();
    var year = date.getYear();
    var month = date.getMonth()+1;
    month > 9 ? month: month="0" + month;
    var day = date.getDate();
    day>9? day : day="0"+day
    temp += 1900+year+"-";
    temp += month+"-";
    temp += day+"T00:00:00Z";
    return temp;
}

function stringifycoord(lat,lng){
    var latlonstring=lat + "," + lng;
    infoArr[0]=(latlonstring)
    return latlonstring
}

function getcoordinate(address){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            latlng = {
            lat: results[0].geometry.viewport.f.b,
            lng: results[0].geometry.viewport.b.b
            };
            stringifycoord(latlng.lat,latlng.lng)
            getevents(infoArr[5])
            } 
        else{
            swal({
              title: "Oops...",
              text: "This address is invalid Enter a valid address and try again.",
              type: "error",
              confirmButtonText: "Cool"
            });
        }
    });
}

function getevents(page) {
    infoArr[5]=page;
    infoArr[3]? EndDate=`&endDateTime=${infoArr[3]}` : EndDate="";
    infoArr[1]? category=`&classificationId=${infoArr[1]}` : category="";
    console.log("searched data",infoArr[0],category,infoArr[2],EndDate,infoArr[4],infoArr[5]);
    $.ajax({
      type:"GET",
      url:`https://app.ticketmaster.com/discovery/v2/events.json?apikey=QFYXssyZdIBdLhFpDQCE0p40bZxNM4Ib${category}&latlong=${infoArr[0]}&startDateTime=${infoArr[2]}${EndDate}&radius=${infoArr[4]}&unit=miles&sort=date,asc&page=${infoArr[5]}&size=30`,
      async:true,
      dataType: "json",
      success: function(json) {
                   console.log(json);
                var e = document.getElementById("result-title");
                if(json.page.totalElements>0){
                    var pages=json.page.totalPages
                    e.innerHTML =  `<h5> ${json.page.totalElements} events were found.<h5>`;
                    showEvents(json,pages);
                    initMap(latlng, json);
                    }
                else
                {
                    e.innerHTML =  `<h5> Sorry , No event was found. Change the date or the category and try again. <h5>`;   
                }
           },
      error: function(xhr, status, err) {
                  console.log(err);
                  swal({
                  title: "Oops...",
                  text: "Something went off, Check your information and try again.",
                  type: "error",
                  confirmButtonText: "Ok"
                });

               }
    });
}

function showEvents(json,pages) {
    var obj={},sn;
    obj=json._embedded.events;
    //console.log(obj);
    $("#results").html(" ")
    sn=infoArr[5]*30;
    console.log("=====>"+sn);
    obj.forEach( function (arrayItem,i){ 
    arrayItem.name? title=arrayItem.name : title=" ";
    arrayItem.classifications[0].genre? genre=arrayItem.classifications[0].genre.name : genre=" ";
    arrayItem.classifications[0].segment?segment=arrayItem.classifications[0].segment.name: segment=" ";
    arrayItem.classifications[0].subGenre?subGenre=arrayItem.classifications[0].subGenre.name:subGenre=" ";
    arrayItem._embedded.venues[0].address? street=arrayItem._embedded.venues[0].address.line1 : street=" "
    arrayItem._embedded.venues[0].city.name? city= arrayItem._embedded.venues[0].city.name : city=" "
    arrayItem._embedded.venues[0].country.countryCode? country=arrayItem._embedded.venues[0].country.countryCode : country=" "
    arrayItem._embedded.venues[0].postalCode?zip=arrayItem._embedded.venues[0].postalCode:zip=" "
    arrayItem.priceRanges? max = arrayItem.priceRanges[0].max+" $ -" : max="Not specified"
    arrayItem.priceRanges? min = arrayItem.priceRanges[0].min+" $" : min=""
    arrayItem.info? info=arrayItem.info : info= "Not available"
    arrayItem.dates.start.localTime? time=arrayItem.dates.start.localTime : time ="Not specified"
    arrayItem.dates.start.localDate? date=arrayItem.dates.start.localDate: date="Not specified"
    var id=arrayItem.id;
    if (genre==="Undefined")
        genre=" ";;
    if (segment==="Undefined")
        segment=" ";
    if (subGenre==="Undefined")
        subGenre=" ";
    ++sn
    console.log("=====>"+sn);
    $("#results").append(
        `<div id=card${i} class="card hoverable z-depth-5 col s6">
            <div class="fixed-action-btn   horizontal">
                <a class="btn-floating  btn-large pulse red">
                    <i class="large material-icons">shop</i>
                </a>
                <ul>
                  <li><a class="btn-floating waves-effect waves-light teal lighten-2 " target="_blank" href=${arrayItem.url} ><i class="material-icons">shopping_cart</i></a></li>
                  <li><a class="btn-floating waves-effect waves-light teal lighten-2 "><i class="material-icons info_${id}" id ="saveEvent" >playlist_add</i></a></li>
                </ul>
            </div>
            <div class="card-image waves-effect waves-block waves-light">
                <iframe src="https://www.facebook.com/plugins/share_button.php?href=${arrayItem.url}&layout=button&size=large&mobile_iframe=true&width=73&height=28&appId" width="73" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>
                <img class="activator info_${id} cardimage"  src=${arrayItem.images[5].url}>
            
            </div>
            <div class="card-content">
                <span class="card-title activator grey-text text-darken-4" >${sn}.${title}<i class="material-icons right">more_vert</i></span>
                <ul>
                    <li class="info_${id}" >Date: ${arrayItem.dates.start.localDate}</li>
                    <li class="info_${id}" >Time: ${time}</li>
                </ul>
            </div>                
            <div class=" grey lighten-3 card-reveal">
                <span class="card-title grey-text text-darken-4 info_${id} " >${title}<i class="material-icons right">close</i></span>
                <table>
                    <tr>
                        <th >Address:</th>
                        <td class="info_${id}" >${street},${city},${zip}</td>
                    </tr>
                    <tr>
                        <th>Information:</th>
                        <td>${info}</td>
                    </tr>
                    <tr>
                        <th>Price:</th>
                        <td>${max}${min}</td>
                    </tr>
                    <tr>
                        <th>Category:</th>
                        <td ><div class="chip info_${id}">${genre}</div><div class="chip info_${id}">${segment}</div><div class="chip info_${id}">${subGenre}</div></td>
                    </tr>
                </table>
            </div>
        </div> `)});
     var block=Pagination(pages)
    
     $("#pagination").html(block)
    }
    
  


function Pagination(pages){
    let i,blocks;
    blocks=`<br><ul class="pagination">
    <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_left</i></a></li>`
    for(i=0;i<pages;i++)
        blocks+=`<li class="waves-effect"><a onclick="getevents(${i})" href="#!">${i+1}</a></li>`
    blocks+=`<li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
  </ul>`
  return blocks;

}
                // 





function myMap(latitude, longitude, zoom) {
    console.log(latitude, longitude, zoom);
    var map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: zoom,
        scrollwheel: false,
        center: {
            lat: latitude,
            lng: longitude
        }
    });

    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;

    var latlng = {
        lat: latitude,
        lng: longitude
    }
    if (isitclicked) {
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            //draggable: true,
            animation: google.maps.Animation.DROP,
        });
        marker.addListener('click', toggleBounce);
        marker.setIcon('/images/micli.png');
    }

    function toggleBounce() {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }

};

function myFunction() {
    document.getElementById("mainForm").reset();
}


function initMap(position, json) {
    var count;
    console.log(position);
  var mapDiv = document.getElementById('googleMap');
  var map = new google.maps.Map(mapDiv, {
    center: {lat: position.lat, lng: position.lng},
    zoom: 10,
     scrollwheel: false,
  });
  json.page.totalElements>json.page.size? count=json.page.size : count=json.page.totalElements;
  for(var i=0; i<count; i++) {
    addMarker(map, json._embedded.events[i],i);
  }
    userlocation(map);
}

function addMarker(map, event,i) {
console.log(event);
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
    animation: google.maps.Animation.DROP,
    map: map
  });
  marker.addListener('click', function() {
          map.setZoom(10);
          map.setCenter(marker.getPosition());
          window.location.href = `#card${i}`;
          $(`#card${i}`).effect( "shake" );
        });

  marker.setIcon('https://maps.google.com/mapfiles/ms/icons/red-dot.png');

}

function userlocation(map) {
console.log(latlng);
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(latlng.lat, latlng.lng),
    animation: google.maps.Animation.DROP,
    map: map
  });
  marker.setIcon('/images/micli.png');
}

$('#results').on('click', '#saveEvent', function(){
    addEventListener('click', addEvent)
});


function addEvent(e){
  if (event.target.id==='saveEvent' ) {
      id = event.target.className.split(" ");
      var pk=id[1].split("_");
      pk=pk[1];
      var information = document.getElementsByClassName(id[1])
      var image=information[1].currentSrc
      var date=information[2].innerHTML;
      var time=information[3].innerHTML;
      date=date.split(": ");
      time=time.split(": ");
      var title=information[4].firstChild.data
      var address=information[5].innerHTML
      var genre=information[6].firstChild.data
      var segment=information[7].firstChild.data
      var subGenre=information[8].firstChild.data
      console.log(pk+image+date+time+title+address+genre+segment+subGenre);
      
      axios.post(baseURL, {
        "id" : pk,
        "event" : title,
        "date": date[1],
        "time": time[1],
        "address": address,
        "category": `${genre} ${segment} ${subGenre}`,
        "image": image
      })
      // coming back from the post axios call
      .then(function(res){
        if(res.data.status=='failed') 
          swal("Oops...","This event is already exist!", "error")
        else      
            swal("Good job!", "An event was added successfully ", "success")
      })
      // catching the post call error
      .catch(function(err) {
        console.log(err);
        return(err)
      })
      }    
} 




