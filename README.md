<a name="goback">

# Project 4 Buzzy

## Live:[Buzzy](https://buzzy-nyc.herokuapp.com/)

![app-logo](./images/logo.png)

</a> 

### Esraa Alaarag 

## Table of Contents

1. [App description](#appdescription)
2. [User Stories](#userstories)
3. [Wireframes Web Version](#wireframesweb)
4. [Visual representation of the database](#database)
5. [Pseudocode](#pseudocode)
6. [APP flowChart](#workflow)
7. [ERD or other visual representation of your database](#database)
8. [Technologies used](#technologies)
9. [Live deployment](#project)


<a name="appdescription">

## APP DESCRIPTION:

An app that connects user to activities available on ticket masters around his location or any other location.

Step 1: The user enters an address or click to let the app finds his location. 

Step 2: The app displays a map with user's location and the surrounding events around that location. 

Step 3: The user can click on save event to save the event that he is interested in.

Step 4: The user can see the saved events in my events page.


Step 5:The user can adjust the radius of the area that he wants to find out about.

Step 6:The user can search the events based on event's Category.

</a>

<a name="userstories">

## USER STORIES:

- As a user, I want the app to get my location without entering it in the app.

- As a user, I want the app to display the events around certain location.
- As a user, to see a link that i can click to take me where I can buy a ticket.
- As a user I want to see the events in order.
- As a user, I want to search the events according to the events location.
- As a user, I want to see events information
- As a user, I want to be see the events location on map.
- As a user, I want to click on the marker on the map to take me to the event information .
- As a user, I want to my location comparing to event's location.
- As a user, I want to be able to adjust the searched area.

- As a user, I want to be able to save the events that I'm interested in.

- As a user, I want to be able to delete the events that I'm no longer interested in.

- As a user, I want to be able to search the any city with out specifying the address.

- As a user, I want to be able to search the event based on their category.

- As a user, I want to be able to search the events based on their date.

- As a user, I want to be able to share the events on social media.
- As a user, I want to know how many events the search generates for me.
- As a user , I want to be able the events arranged in pages where the maximum number of events in one page = 15 events.
- As s user , I want the app to tell me if I want to add already added event

<a name="wireframesweb"> 

## WIREFRAMES:
## (Web/Browser Version)


### Homepage:
![my-places](./images/mpvhomepage2.png)

### Search Result: 
![search-result](./images/result.png)

### My Events:
![my-places](./images/events.png)


### Homepage options:

</a>

<a name="pseudocode">

## PSEUDOCODE:

1. The user enters the address that he wants to find the events around.

	#### or
	
1. Get the user address automatically
2. disable the input field 
3. send it to Geocoder to get the coordinate  
4. display the user current address in the input field
5. display the user location on the map

#### then
6. The user will fill the form and hit enter. 
7. if the user entered the address by himself send it to google coding to get the address coordinate.
8. if the address is incorrect tell the user to enter a valid address.
9. Send the coordinate to API to get the events around that area
10. display the user location on the map with the other events location.
11. display number of events found
12. display events in card grid. max number of activities = 15 per page
13. If the user clicked “save events” the events will be saved in the database.
14. if the event is already saved in the database , display error msg
15. If the user clicked my events . 
16. load all the saved events in the databse. display it as a table
17. if the user clicked delete , delete the evant from the database reload the database.

<a name="database"> 

## ERD/VISUAL REPRESENTATION OF DATABASE:

## Events_db
myEvents  | 
------------- | 
ID (PK)  | 
event  | 
date |
time|
location|
catergory|
picture|




</a>

<a name="technologies"> 

## TECHNOLOGIES USED:

### Core Stack:

- Node.js
- Express
- HTML
- CSS
- JavaScript
- jQuery
- Heroku
- Git

### Middleware:

- Ajax
- [materialize](http://materializecss.com/)
- bluebird
- Postgresql
- pg-promise
- dotenv
- morgan
- nodeman
- [Geolocation](https://www.w3schools.com/html/html5_geolocation.asp)
- [Sweetalert](http://t4t5.github.io/sweetalert/)

### APIs:
- [Google map Geocoding](https://developers.google.com/maps/documentation/javascript/geocoding)
- [Ticket Master](http://developer.ticketmaster.com/
)
### Also

- [Zenhub](https://github.com/Esraa-Alaarag/Buzzy#boards?repos=94136891)
- Balsamiq (wireframes)
- Postman (API and DB testing)

</a>

<a name="project">

## SEE THE PROJECT:

### Live Deployment of App: 


### Download Project & Install


![app-logo](./images/logo.png)

</a>

[Go Back to the Table of Content](#goback)
