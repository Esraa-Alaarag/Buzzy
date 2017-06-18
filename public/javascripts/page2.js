let baseURL = '//localhost:3000/events_db';

console.log('page2 is here');
$('#results').on('click', '#saveEvent', function(){
    addEventListener('click', addEvent)
});


function addEvent(e){
  if (event.target.id==='saveEvent' ) {
      Name = event.target.className.split(" ");;
      var information = document.getElementsByClassName(Name[1])
      var image=information[1].currentSrc
      var date=information[2].innerHTML
      var time=information[3].innerHTML
      var title=information[4].firstChild.data
      var address=information[5].innerHTML
      var genre=information[6].firstChild.data
      var segment=information[7].firstChild.data
      var subGenre=information[8].firstChild.data
      console.log(image+date+time+title+address+genre+segment+subGenre);
        } 
}

