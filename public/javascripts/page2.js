let baseURL = '/Myevents';
console.log('page2 is here');


function readAllEvents(e) {
    //e.preventDefault();
    console.log("here I'm getting")
    axios.get(baseURL)
        .then(function(res) {
            //console.log(res.data);
            // payLoad.innerHTML = "";
            // res.data.data.forEach(function(d, c) {
        })
        .catch(function(err) {
            console.log(err)
        })
}

$(".delete").click(function() {
    addEventListener('click', deleteEvent)
});

function deleteEvent(e) {
    if (event.target.className === "material-icons delete") {
        console.log('deleteing is ready');
        let e_id = event.target.id;
        let id = e_id.split("_")[1];
        console.log(id);
        swal({
                title: "Are you sure?",
                text: "You will not be able to recover this event!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
            function() {
                swal("Deleted!", "Your event has been deleted.", "success");
                let string = baseURL + "/" + id;
                console.log(string);
                axios.delete(string)
                    .then(function(res) {
                        window.location.reload()
                    })
                    .catch(function(err) {
                        console.log(err)
                    })
            }
        );
    }
}


window.onload = readAllEvents;