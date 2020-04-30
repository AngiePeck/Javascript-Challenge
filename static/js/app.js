// assign a descriptive variable to the data in data.js 
var sightings = data;

/////////Lists for the drop down menus//////////////////////
//list of unqiue cities for the drop down
var cities = sightings.map(sighting => sighting.city);
cities = cities.filter(getUnique).sort();
fillSelectList(d3.select('#city'), cities);

//list of unique states for the drop down
var states = sightings.map(sighting => sighting.state);
states = states.filter(getUnique).sort();
fillSelectList(d3.select('#state'), states);

//list of unique countries for the drop down
var countries = sightings.map(sighting => sighting.country);
countries = countries.filter(getUnique).sort();
fillSelectList(d3.select('#country'), countries);

//list of unique shapes for the drop down
var shapes = sightings.map(sighting => sighting.shape);
shapes = shapes.filter(getUnique).sort();
fillSelectList(d3.select('#shape'), shapes);

////////////Selecting and creating event handlers/////////////
// select the button and form
var button = d3.select("button");
var form = d3.select("input");

//create event handlers for the button click or enter press
button.on("click", runEnter);
form.on("submit", runEnter);

//////////Functions for getting unique values and making list////
//get unique values to build drop down filter lists.
function getUnique(value, index, self) {
    return self.indexOf(value) === index;
}

//fill select list
function fillSelectList(element, list){
    list.forEach(item => element.append('option').text(item));
}


/////////Define the runEnter function//////////////////////////
function runEnter() {

    //prevent page refresh
    d3.event.preventDefault();

    //get selected date value
    var inputDateElement = d3.select("#datetime");
    var inputDate = inputDateElement.property("value");

    //get selected city value
    var inputCityElement = d3.select('#city');
    var inputCity = inputCityElement.property("value");

    //get selected state value
    var inputStateElement = d3.select('#state');
    var inputState = inputStateElement.property("value");

    //get selected country value
    var inputCountryElement = d3.select('#country');
    var inputCountry = inputCountryElement.property("value");
    
    //get selected shape value
    var inputShapeElement = d3.select('#shape');
    var inputShape = inputShapeElement.property("value");     
    

    //filter the sightings by the inputValue date
    var filteredSightings = sightings.filter(sightings => (sightings.datetime === inputDate || inputDate === "")
        && (sightings.city === inputCity || inputCity === "(Select)")
        && (sightings.state === inputState || inputState === "(Select)")
        && (sightings.country === inputCountry || inputCountry === "(Select)")
        && (sightings.shape === inputShape || inputShape === "(Select)")
        );
        var noResults = document.getElementById('no-results');
        noResults.setAttribute('style', 'display:none;');
        var ufoTableArea = document.getElementById('table-area');
        ufoTableArea.setAttribute('style', 'display:none;');

        //Shows the results of the search
        console.log(filteredSightings);
        //select the table body using d3
        var tbody = d3.select("#ufo-table").select("tbody"); 
        //clear any existing rows
        tbody.html("");
        if (filteredSightings.length == 0) {
            
            noResults.setAttribute('style', 'display:unset;');
            noResults.scrollIntoView();
        } else {
            //add each filtered sighting to the table by adding a row for each sighting and cells from each detail
            filteredSightings.forEach((sighting) => {
                //append a row to the tbody
                var row = tbody.append("tr");
                Object.entries(sighting).forEach(([key,value]) => {
                    var cell = row.append("td");
                    cell.text(value);
                });
            });

            
            ufoTableArea.setAttribute('style', 'display:unset;');
            ufoTableArea.scrollIntoView();
        }   
}