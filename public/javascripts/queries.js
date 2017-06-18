var promise = require('bluebird');
var options = { promiseLib: promise };
var pgp = require('pg-promise')(options)

var connectionString = process.env.DATABASE_URL;
var db = pgp(connectionString);


function AddEvent(req,res, next) {
     let body = req.body;
     console.log(body);
     console.log(connectionString);
      var rrr= db.none('insert into myevents(id ,event, eventdate, eventtime, address, category, image)' +
      'values(${id} , ${event}, ${date}, ${time}, ${address}, ${category}, ${image})',body)

      .then(data => {
        console.log(`The record id=${body.id} was inserted successfully`);// print error;
        res.status(200)
        .json({
          status:'success',
          data:data,
          message:"inserted sucessfully"
        })
    })
    .catch(error => {
    console.log(`The record id=${body.id} was not inserted sucessfully`);// print error;
    res.json({
      status:'failed',
      message: error
    })

    return false;
    });
  }



function getAllEvents(req, res, next){
  db.any('select * from myevents order by eventdate')
  .then(function(data){
    console.log(data);
    res.render( 'MyEvents', { title:"My Events", data:data })
    res.status(200)
    console.log('getting all the data was sucessful')
    })
    .catch(error => {
    console.log('error');// print error;
    res.json({
      status:'failed',
      message:'unable to load your database'
    })

    return false;
    });  
}

function removeEvent(req, res, next) {
  console.log("=================>inside removeEvent", req.params.id)
  
  console.log(req.params.id)
   db.result('delete from myevents where id = $1', req.params.id)
   .then(function(data){
    //console.log(data)
    res.status(200)
    .json({
          status:'success',
          data:data,
          message:"deleted sucessfully"
        })
    })
    .catch(error => {
    console.log(error);
    console.log('record with id:'+req.params.id+' was not deleted');// print error;
    res.json({
      status:'failed',
      message: error
    })
    });
}

module.exports = {
  getAllEvents: getAllEvents,
  removeEvent: removeEvent,
  AddEvent: AddEvent,
}