const readline = require('readline-sync');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// Stop trying to make "fetch" happen.

function getBusStopData(askForStopCode) {
    console.log(askForStopCode);
    stopCode = readline.prompt();
    // apiRequest = "https://api.tfl.gov.uk/StopPoint/"+stopCode+"/Arrivals"
    apiRequest = "https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals"
    //console.log(stopCode);
    arrayOfBus = fetch(apiRequest)
    .then(response => response.json());
    // .then(body => console.log(body));

    console.log(arrayOfBus);
}

getBusStopData("Hello, bus stop code would you like to inspect?");

// person.name