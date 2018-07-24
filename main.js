/**
* on ready run initialize app function
* no params or return
*/

/*
area for globals
venueSearchResults = [];
*/

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
function page2DomCreation(venueSearchResults){
    $('#dummyBodyTag').empty() // maybe used to clear page before rendering new elements???? idk
    //creates a single element that contains the details for the event and appends them to the a single div
    //takes in a parameter called eventDetails thats a single object in the array venueSearchResults
    function createEventElement(eventDetails){
        let eachEventDetailBody = $('<div>')
        let eachArtistName = $('<div>').text(eventDetails.artist);
        let eachVenueName = $('<div>').text(eventDetails.venue);
        let eachVenueCity = $('<div>').text(eventDetails.city);
        let eachEventDate = $('<div>').text(eventDetails.date);
        let eachEventTime = $('<div>').text(eventDetails.time);
        eachEventDetailBody.append(eachArtistName, eachVenueName,eachVenueCity,eachEventDate,eachEventTime);
    }
    //loops through and creates each individual element and appends to the DOM
    for (var resultIndex = 0; resultIndex < venueSearchResults.length; resultIndex++){
        let singleDomElement = createEventElement(venueSearchResults[resultIndex]);
        //rebecca wanted to add 2 different classes to style every other line differnetly
        if(resultIndex % 2 === 0){
            singleDomElement.addClass('dark');
            $('#dummyBodyTag').append(singleDomElement);
        } else {
            singleDomElement.addClass('light');
            $('#dummyBodyTag').append(singleDomElement);
        }
    }
}


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