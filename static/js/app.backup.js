// assign a descriptive variable to the data in data.js 
var sightings = data;

//list of unqiue cities for the drop down
var cities = sightings.map(sighting => sighting.city);
cities = cities.filter(getUnique).sort();
fillSelectList(d3.select('#city'), cities);
//console.log(cities);


// select the button and form
var button = d3.select("button");
var form = d3.select("input");

//create event handlers for the button click or enter press
button.on("click", runEnter);
form.on("submit", runEnter);

//get unique values to build drop down filter lists.
function getUnique(value, index, self) {
    return self.indexOf(value) === index;
}

//fill select list
function fillSelectList(element, list){
    list.forEach(item => element.append('option').text(item));
}

//define the runEnter function
function runEnter() {
    //alert('runEnter');
    //prevent page refresh
    d3.event.preventDefault();
    //select the input element and get raw HTML node
    var inputElement = d3.select("#datetime");
    //console.log(inputElement);
    //now get the value property from the inputElement and log it to the console
    var inputValue = inputElement.property("value");
    console.log(inputValue);
    //filter the sightings by the inputValue date
    var filteredSightings = sightings.filter(sightings => sightings.datetime === inputValue);
    console.log(filteredSightings);
        if (filteredSightings.length == 0) {
            alert('There were no sightings on this date.');
        } else {
            //add each filtered sighting to the table by adding a row for each sighting and cells from each detail
            filteredSightings.forEach((sighting) => {
                //select the table body using d3
                var tbody = d3.select("#ufo-table").select("tbody"); 
                //append a row to the tbody
                var row = tbody.append("tr");
                Object.entries(sighting).forEach(([key,value]) => {
                    var cell = row.append("td");
                    cell.text(value);
                });
            });
        }   
}