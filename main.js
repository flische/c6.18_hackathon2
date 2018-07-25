/* Listen for the document to load and initialize the application
* @param {function} initializeApp -
*/
$(document).ready(initializeApp);

/*
area for globals
venueSearchResults = [];
*/
var map;
var service;
var latitude = 33.69;
var longitude = -117.83;
/*initialize app function
*call addClickHandlers function
*no params or returns

/**
 * Define all global variables here (below).
 */
/*****************************
* venueSearchResults = []; - global array to hold search results
* @type {Array}

*/
var venueSearchResults = [];
var buyTicketsUrl;
/***************************************************************************************************
 * initializeApp
 * @params {undefined} none
 * @returns: {undefined} none
 * initializes the application, including adding click handlers and pulling in any data from the server, in later versions
 */
function initializeApp() {
    addClickHandlers();
}

/***************************************************************************************************
* addClickHandlers()
* @params {undefined}
* @returns  {undefined}
* using event delegation, adds click handlers to page 1 static elements and future dynamic elements
*/
function addClickHandlers() {
    $('#searchGenre').click(handleSearchClick);
    $('.reset').click(startOver);
    $('.details').on('click', pageTransition2);
    $(".events-body").on("click", ".details", handleDetailsClick)
    $('.results').click(pageTransition3);
    $('.google-maps').click(pageTransition4);
    $('#bar').click(gotoMap);
    $('#restaurant').click(gotoMap);
    $('#lodging').click(gotoMap);
    $('.back-to-map').click(gotoMap);
    $('#tickets').click(buyTicketsLink);

}
/*************************************************************************************************
* handleSearchClick()
* store zipcode and genre in local variables
* @param: {undefined} none
* @returns: {undefined} none
* @calls getEvents AJAX function with zip and genre variables as parameters
* @calls page2DomCreation function
* @calls showHidePage function (hide page1, show page2)
*/
function handleSearchClick() {
    var genreInput = $('#genre :selected');
    var genre = genreInput.val();
    var city = $('#city').val();
    getVenueData(city, genre);


}



/*************************************************************************************************
* getEvents ajax function
* @param: {number} zip code
* @param: {string} genre
* @returns runs ticketmaster ajax call and stores result into global array
* will need to decide data stored ie what details
*/

function getVenueData(city, genre) {
    var custUrl = 'https://app.ticketmaster.com/discovery/v2/events.jsonp?apikey=hNel2sQARoJR6Ac22KIbXszvF728H6e2';
    if (city) {
        custUrl += '&city=' + city;
    }
    if (genre) {
        custUrl += '&classificationName=' + genre;
    }
    var ajaxConfig = {
        url: custUrl,
        success: function (result) {
            for (var venueI = 0; venueI < result._embedded.events.length; venueI++) {
                venueSearchResults[venueI] = result._embedded.events[venueI];
            }
            page2DomCreation(venueSearchResults);
            pageTransition();
        },
        error: function (err) {
            console.log(err);
        }
    }
    $.ajax(ajaxConfig);
}


/* page2DomCreation function
*using search results stored in global will create divs with various info onto the page
*will create a link on each dom element, possible store index number into dom element to be referenced later
*dom element link will call handlePage3Details function with dom index as param, then call hideShowPage function

function getEvents(){
}

/*************************************************************************************************
* page2DomCreation function
* using search results stored in global array, will create html elements with various info and then append the elements onto the page
* will create a link on each dom element, possible store index number into dom element to be referenced later
* dom element link will call handlePage3Details function with dom index as param, then call hideShowPage function
* @param {array} venueSearchResults
* @calls hideShowPage
*/

function page2DomCreation(venueSearchResults) {
    $('.events-body').empty() // maybe used to clear page before rendering new elements???? idk
    //creates a single element that contains the details for the event and appends them to the a single div
    //takes in a parameter called eventDetails thats a single object in the array venueSearchResults
    function createLightElement(eventDetails, index) {
        var eachEventDetailBody = $('<div>', { 'class': 'light' });

        var leftEventDiv = $('<div>', { 'class': 'left-event' });

        var eachArtistName = $('<div>', { 'class': 'artist', text: 'ARTIST: ' });
        var artistObject = $('<span>').text(eventDetails.name);
        eachArtistName.append(artistObject);

        var eachVenueName = $('<div>', { 'class': 'venue', text: 'VENUE: ' });
        var venueObject = $('<span>').text(eventDetails._embedded.venues[0].name);
        eachVenueName.append(venueObject);

        var eachVenueCity = $('<div>', { 'class': 'results-city', text: 'CITY: ' });
        var cityObject = $('<span>').text(eventDetails._embedded.venues[0].city.name);
        eachVenueCity.append(cityObject);

        var centerEventDiv = $('<div>', { 'class': 'center-event' });

        var eachEventDate = $('<div>', { 'class': 'date', text: 'DATE: ' });
        var dateObject = $('<span>').text(eventDetails.dates.start.localDate);
        eachEventDate.append(dateObject);

        var eachEventTime = $('<div>', { 'class': 'time', text: 'TIME: ' });
        var timeObject = $('<span>').text(eventDetails.dates.start.localTime);
        eachEventTime.append(timeObject);

        var rightEventDiv = $('<div>', { 'class': 'right-event' });
        var buttonObject = $('<button>', { 'type': 'button', 'class': 'details', 'arrayindex': index, text: 'DETAILS' });

        rightEventDiv.append(buttonObject);
        leftEventDiv.append(eachArtistName, eachVenueName);
        centerEventDiv.append(eachEventDate, eachEventTime, eachVenueCity);
        eachEventDetailBody.append(leftEventDiv, centerEventDiv, rightEventDiv);
        return eachEventDetailBody;
    }

    function createDarkElement(eventDetails, index) {
        var eachEventDetailBody = $('<div>', { 'class': 'dark' });

        var leftEventDiv = $('<div>', { 'class': 'left-event' });

        var eachArtistName = $('<div>', { 'class': 'artist', text: 'ARTIST: ' });
        var artistObject = $('<span>').text(eventDetails.name);
        eachArtistName.append(artistObject);

        var eachVenueName = $('<div>', { 'class': 'venue', text: 'VENUE: ' });
        var venueObject = $('<span>').text(eventDetails._embedded.venues[0].name);
        eachVenueName.append(venueObject);

        var eachVenueCity = $('<div>', { 'class': 'results-city', text: 'CITY: ' });
        var cityObject = $('<span>').text(eventDetails._embedded.venues[0].city.name);
        eachVenueCity.append(cityObject);

        var centerEventDiv = $('<div>', { 'class': 'center-event' });

        var eachEventDate = $('<div>', { 'class': 'date', text: 'DATE: ' });
        var dateObject = $('<span>').text(eventDetails.dates.start.localDate);
        eachEventDate.append(dateObject);

        var eachEventTime = $('<div>', { 'class': 'time', text: 'TIME: ' });
        var timeObject = $('<span>').text(eventDetails.dates.start.localTime);
        eachEventTime.append(timeObject);

        var rightEventDiv = $('<div>', { 'class': 'right-event' });
        var buttonObject = $('<button>', { 'type': 'button', 'class': 'details', 'arrayindex': index, text: 'DETAILS' });

        rightEventDiv.append(buttonObject);
        leftEventDiv.append(eachArtistName, eachVenueName);
        centerEventDiv.append(eachEventDate, eachEventTime, eachVenueCity);
        eachEventDetailBody.append(leftEventDiv, centerEventDiv, rightEventDiv);
        return eachEventDetailBody;
    }
    //loops through and creates each individual element and appends to the DOM
    for (var resultIndex = 0; resultIndex < venueSearchResults.length; resultIndex++) {
        //rebecca wanted to add 2 different classes to style every other line differnetly
        if (resultIndex % 2 === 0) {
            var temp = createLightElement(venueSearchResults[resultIndex], resultIndex)
            $('.events-body').append(temp);
        } else {
            var temp = createDarkElement(venueSearchResults[resultIndex], resultIndex)
            $('.events-body').append(temp);
        }
    }
}

/*************************************************************************************************
* showHidePage function
* @params which page to show, which page to hide
* will have to figure out the specifics for this function once we have skeleton or if we will need different versions of this function at first
*/
function showHidePage() {
}
/*************************************************************************************************
* handlePage3Details
* @params index of page 2 dom element clicked to reference global array
* this function will pull details from global arrya and fill them onto page 3 template, artist name, venue, dates, image etc
* variables for lat and long are stored to be passed later
* this page will have 2 links for searchForBarsNearby and searchForRestuarantsNearby function with lat and long as params
*/

/************************************************************************************************** 
 * pageTransition
 * hides and shows divs as needed
*/

function pageTransition() {
    $('.home').addClass('hidden');
    $('.event-results').removeClass('hidden');
}
//transition from page 2 to 3
function pageTransition2() {
    $('.event-results').addClass('hidden');
    $('.concert-details').removeClass('hidden');

}
//back to search results
function pageTransition3() {
    $('.event-results').removeClass('hidden');
    $('.concert-details').addClass('hidden');

}
//back to concert details
function pageTransition4() {
    $('.google-maps').addClass('hidden');
    $('.concert-details').removeClass('hidden');

}

function gotoMap() {
    $('.google-maps').removeClass('hidden');
    $('.concert-details').addClass('hidden');
    $('.yelp').addClass('hidden');

}

function handleDetailsClick() {
    var detailsIndex = $(this).attr('arrayindex');
    handlePage3Details(venueSearchResults[detailsIndex]);
    pageTransition2();
}

//passing in the index into this function
function handlePage3Details(singleEvent) {
    //changing the span text to match the details for the event being generated

    //add click handler first
    buyTicketsUrl = singleEvent.url;
    console.log(buyTicketsUrl)
    var artistPicture = singleEvent.images[3].url;
    $('.pageThreeArtistImg').attr('src', artistPicture);
    $('.pageThreeNameSpan').text(singleEvent.name);
    $('.pageThreeVenueAddressSpan').text(singleEvent._embedded.venues[0].address.line1 + ', ' + singleEvent._embedded.venues[0].city.name);
    $('.pageThreeVenueNameSpan').text(singleEvent._embedded.venues[0].name);
    $('.pageThreeDateSpan').text(singleEvent.dates.start.localDate);
    $('.pageThreeTimeSpan').text(singleEvent.dates.start.localTime);
    var longitude1 = singleEvent._embedded.venues[0].location.longitude;
    var latitutde1 = singleEvent._embedded.venues[0].location.latitude;
    console.log(latitutde1,longitude1);
}

function buyTicketsLink(){
	var win = window.open(buyTicketsUrl, '_blank');
  	win.focus();
}
/*************************************************************************************************
* searchForBarsNearby
* @params lat and long
* @calls hideShowPage function hide page3 show page 4
* @calls run google ajax call and populate data onto page4
* create links on the dropped markers near venue to viewYelpInfo with param of business selected
*/
function searchForBarsNearby() {

}

/*************************************************************************************************
* searchForRestaurantsNearby
* @params lat and long
* @calls hideShowPage function hide page3 show page 4
* @calls run google ajax call and populate data onto page4
* create links on the dropped markers near venue to viewYelpInfo with param of business selected
*/
function searchForRestaurantsNearby() {
}

/*************************************************************************************************
* viewYelpInfo function
* @params businessSelected
* @calls run yelp api, store results and populate data onto page5 template
* @calls showHidePage function hide page 4 show page 5
* @calls button on page to run startOver function
*/
function viewYelpInfo() {
}

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
                console.log('place:', place);
                console.log('test place:', place.name, place.address_components[0].short_name, place.address_components[1].short_name, place.address_components[3].short_name);
            } else {
                var contentStr = "<h5>No Result, status=" + status + "</h5>";
                infowindow.setContent(contentStr);
                infowindow.open(map, marker);
            }
        });
    });

    var name = place.name;
    var address = place.formatted_address;
}


/*viewYelpInfo function
*params businessSelected
*run yelp api, store results and populate data onto page5 template
*showHidePage function hide page 4 show page 5
*button on page to run startOver function
*/
function getYelpInfo(name, address1, city) {
     var customURL = "https://yelp.ongandy.com/businesses/matches";
     if(name) {
         customURL+= "?name=" + name;
     }
     if(address1) {
         customURL+= "&address1=" + address1;
     }
     if(city) {
         customURL+= "&city=" + city + "&state=CA&country=US";
     }
     console.log('here is our custom URL', customURL);

     var ajaxConfig = {
        "url": customURL,
        "method": "POST",
        "dataType": "JSON",
        "data": {
            api_key: "JXCOALn0Fdm8EKib4ucfwd_mPjsMzQJ-Zbg8614R3WGF0-805GUkh_jEfxTxkg5MTqzVJVselxNsRYUXXzcLYvd5AGqIc30kmwpDez7TNG-hKZWtRrtA_KDv4aJWW3Yx"
        },
        success: function(response) {
            console.log(response);
        },
        error: function(err) {
            console.log(err);
        }
    };
    $.ajax(ajaxConfig).done(function (response) {
        console.log(response);
    });
}
getYelpInfo('The Oyster Bar SKC', '2626 E Katella Ave', 'Anaheim');


/*************************************************************************************************
* startOver function

* basically reset button, go back to page one and empty array
*/
function startOver() {
    $('.event-results').addClass('hidden');
    $('.concert-details').addClass('hidden');
    $('.home').removeClass('hidden');
}

/*************************************************************************************************
* note-back button links/clickhandlers have not been described here yet, but should not be hard to implement
*/