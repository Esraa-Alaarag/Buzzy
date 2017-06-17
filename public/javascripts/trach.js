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

// function getevents(date, Category) {
//     var location ,title,start_time,stop_time,url,address,vname,description,latitude,longitude;
//     latlng.lat?location = `${latlng.lat},${latlng.lng}`: location= "new york";
     
//     var oArgs = {

//         app_key: "c8k7HD8DxtLXZswH",

//         location: location || "new york",

//         within: 10,

//         date:  date || "2011-10-26 00:00:00",

//         page_size: 10,

//         sort_order: "date",

//         category: Category || " ",
//     };
//     console.log(oArgs);
//     // EVDB.API.call("/categories/list", oArgs, function(oData) {
//     EVDB.API.call("/events/search", oArgs, function (oData) {
//         var obj=oData.events.event
//         console.log(obj);
//         var events = " ";
//         obj.forEach( function (arrayItem,i)
//         { 
//             arrayItem.title? title = arrayItem.title : title=false;
//             arrayItem.start_time? startDate = arrayItem.start_time : startDate =false;
//             arrayItem.stop_time?stopDate = arrayItem.stop_time : stopDate =false
//             arrayItem.url?url=arrayItem.url: url=false
//             arrayItem.venue_address?address=arrayItem.venue_address:address=false
//             arrayItem.image?image=arrayItem.image:image=false;
//             arrayItem.venue_name?vname=arrayItem.venue_name:vname=false
//             arrayItem.description?description=arrayItem.description:description=false
//             arrayItem.latitude?latitude=arrayItem.latitude:latitude=false
//             arrayItem.longitude?longitude=arrayItem.longitude:longitude=false
//             if(startDate!==false && stopDate!==false){
//             console.log(i);
//             console.log(title) ;
//             console.log(startDate);
//             console.log(stopDate);
//             console.log(url);
//             console.log(address);
//             console.log(vname);
//             console.log(description);
//             console.log(latitude);
//             console.log(longitude);
//             events+=`<div class='section white'><h5>${i}.${title}.</h5>
//                     <p>From: ${startDate}</br>
//                         To: ${stopDate}</br>
//                     Url: <a href="${url}">Click here to visit the Event website</a></br>
//                     Address: ${address}</br>
//                     Venue name: ${vname}</br>
//                     Description: ${description}<br>
//                     <hr>
//                     </p></div><div class="transparent" ></div> `}
//         });

//         document.getElementById("results").innerHTML = events;

//     });

// }
// edpborder500 instead of medium