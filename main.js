/**
* on ready run initialize app function
* no params or return
*/

/*
area for globals
*/
var venueSearchResults = [];


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

function getVenueData(city, genre){
  var custUrl = 'https://app.ticketmaster.com/discovery/v2/events.jsonp?apikey=hNel2sQARoJR6Ac22KIbXszvF728H6e2';
  if (city){
    custUrl+= '&city='+ city;
  }
  if (genre){
    custUrl+= '&keyword=' + genre;
  }
    var ajaxConfig = {
        url: custUrl,
        success: function(result) {
             for(var venueI = 0; venueI < result._embedded.events.length; venueI++){
				venueSearchResults[venueI] = result._embedded.events[venueI];
			}
      	},
        error: console.log('error')
    }
    $.ajax(ajaxConfig);
}
getVenueData('irvine', 'rock'); //function run for testing purposes


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