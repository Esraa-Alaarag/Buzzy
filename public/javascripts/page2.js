let baseURL = '/Myevents';
console.log('page2 is here');


function readAllEvents(e) {
  //e.preventDefault();
  console.log("here I'm getting")
  axios.get(baseURL)
   .then(function(res){
      //console.log(res.data);
      // payLoad.innerHTML = "";
      // res.data.data.forEach(function(d, c) {
 
      
    })
    .catch(function(err) {
      console.log(err)
    })
}

function deleteEvent(e) {
  if (event.target.className.toLowerCase() === 'delete') {
    // every id was seperated by _ss# so I can catch it later
    let e_ss = event.target.id;
    let ss = e_ss.split("_")[1];
    console.log(ss);
    if(confirm(`Are you sure you want to delete person with the Social security number of ${ss}`)){
    let string=baseURL+"/"+ss;
    console.log(string);
    axios.delete(string).then(function(res) {
    window.alert(`person with ss ${ss} was deleted successfully`);
    window.location.reload()
  })
.catch(function(err) {
      console.log(err)
    })}
}
}

window.onload=readAllEvents;

