/**
* on ready run initialize app function
* no params or return
*/

/*
area for globals
venueSearchResults = [];
*/
var map;
var service;
var latitude = 33.69
var longitude = -117.83
/*initialize app function
*call addClickHandlers function
*no params or returns
*/

/*addClickHandlers()
*using event delegation, adds click handlers to page 1 static elements and future dynamic elements
*/

/*handleSearchClick()
*store zipcode and genre in local variables
*call getEvents AJAX function with zip and genre variables as parameters
*call page2DomCreation function
*call showHidePage function (hide page1, show page2)
*/

/*getEvents ajax function
*params = zip and genre
* runs ticketmaster ajax call and stores result into global array
* will need to decide data stored ie what details
*/


/* page2DomCreation function
*using search results stored in global will create divs with various info onto the page
*will create a link on each dom element, possible store index number into dom element to be referenced later
*dom element link will call handlePage3Details function with dom index as param, then call hideShowPage function
*/

/*showHidePage function
*params which page to show, which page to hide
* will have to figure out the specifics for this function once we have skeleton or if we will need different versions of this function at first
*/

/* handlePage3Details
*params index of page 2 dom element clicked to reference global array
*this function will pull details from global arrya and fill them onto page 3 template, artist name, venue, dates, image etc
*variables for lat and long are stored to be passed later
*this page will have 2 links for searchForBarsNearby and searchForRestuarantsNearby function with lat and long as params
*/

/*searchForBarsNearby
*params lat and long
*hideshowpage function hide page3 show page 4
*run google ajax call and populate data onto page4
*create links on the dropped markers near venue to viewYelpInfo with param of business selected
*/

/*searchForRestuarantsNearby
*params lat and long
*hideshowpage function hide page3 show page 4
*run google ajax call and populate data onto page4
*create links on the dropped markers near venue to viewYelpInfo with param of business selected
*/

/* initializeMap
*params lat and long
*takes in parameters from search for restaurants / bars / hotels to change type in var request to match what type of place person is searching for
*/

function initializeMap() {
    //defines location we are targeting on the map
    var location = new google.maps.LatLng(latitude, longitude);
    //creates instance of map
    map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 15
    });
    //request contains the radius around given location and the type of facility we are targeting
    var request = {
        location: location,
        radius: '500',
        type: ['restaurant']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    if (place.icon) {
        var image = new google.maps.MarkerImage(
            place.icon, new google.maps.Size(71, 71),
            new google.maps.Point(0, 0), new google.maps.Point(17, 34),
            new google.maps.Size(25, 25));
    } else var image = null;

    var marker = new google.maps.Marker({
        map: map,
        icon: image,
        position: place.geometry.location
    });
    var request = {
        reference: place.reference
    };

    var infowindow = new google.maps.InfoWindow({
        contentStr: ""
    });

    google.maps.event.addListener(marker, 'click', function () {
        service.getDetails(request, function (place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                var contentStr = '<h5>' + place.name + '</h5><p>' + place.formatted_address;
                if (!!place.formatted_phone_number) contentStr += '<br>' + place.formatted_phone_number;
                if (!!place.website) contentStr += '<br><a target="_blank" href="' + place.website +
                    '">' + place.website + '</a>';
                contentStr += '<br>' + '</p>';
                infowindow.setContent(contentStr);
                infowindow.open(map, marker);
            } else {
                var contentStr = "<h5>No Result, status=" + status + "</h5>";
                infowindow.setContent(contentStr);
                infowindow.open(map, marker);
            }
        });
    });
}


/*viewYelpInfo function
*params businessSelected
*run yelp api, store results and populate data onto page5 template
*showHidePage function hide page 4 show page 5
*button on page to run startover function
/*

/* startover function
* basically reset button, go back to page one and empty array
*/



/*note-back button links/clickhandlers have not been described here yet, but should not be hard to implement
*/