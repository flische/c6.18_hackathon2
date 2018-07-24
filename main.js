 /* Listen for the document to load and initialize the application
 * @param {function} initializeApp -
 */
$(document).ready(initializeApp);


/**
 * Define all global variables here (below).
 */
/*****************************
* venueSearchResults = []; - global array to hold search results
* @type {Array}
*/
var venueSearchResults = [];

/***************************************************************************************************
 * initializeApp
 * @params {undefined} none
 * @returns: {undefined} none
 * initializes the application, including adding click handlers and pulling in any data from the server, in later versions
 */
function initializeApp(){
}

/***************************************************************************************************
* addClickHandlers()
* @params {undefined}
* @returns  {undefined}
* using event delegation, adds click handlers to page 1 static elements and future dynamic elements
*/
function addClickHandlers(){
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
function handleSearchClick(){
}

/*************************************************************************************************
* getEvents ajax function
* @param: {number} zip code
* @param: {string} genre
* @returns runs ticketmaster ajax call and stores result into global array
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
function page2DomCreation(){
}

/*************************************************************************************************
* showHidePage function
* @params which page to show, which page to hide
* will have to figure out the specifics for this function once we have skeleton or if we will need different versions of this function at first
*/
function showHidePage(){
}
/*************************************************************************************************
* handlePage3Details
* @params index of page 2 dom element clicked to reference global array
* this function will pull details from global arrya and fill them onto page 3 template, artist name, venue, dates, image etc
* variables for lat and long are stored to be passed later
* this page will have 2 links for searchForBarsNearby and searchForRestuarantsNearby function with lat and long as params
*/
function handlePage3Details(){
}
/*************************************************************************************************
* searchForBarsNearby
* @params lat and long
* @calls hideShowPage function hide page3 show page 4
* @calls run google ajax call and populate data onto page4
* create links on the dropped markers near venue to viewYelpInfo with param of business selected
*/
function searchForBarsNearby(){
}

/*************************************************************************************************
* searchForRestaurantsNearby
* @params lat and long
* @calls hideShowPage function hide page3 show page 4
* @calls run google ajax call and populate data onto page4
* create links on the dropped markers near venue to viewYelpInfo with param of business selected
*/
function searchForRestaurantsNearby(){
}

/*************************************************************************************************
* viewYelpInfo function
* @params businessSelected
* @calls run yelp api, store results and populate data onto page5 template
* @calls showHidePage function hide page 4 show page 5
* @calls button on page to run startOver function
*/
function viewYelpInfo(){
}

/*************************************************************************************************
* startOver function
* basically reset button, go back to page one and empty array
*/
function startOver(){
}

/*************************************************************************************************
* note-back button links/clickhandlers have not been described here yet, but should not be hard to implement
*/