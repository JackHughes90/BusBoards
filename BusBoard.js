const readline = require('readline-sync');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function getBusStopData(askForStopCode) {
    console.log(askForStopCode);
    stopCode = readline.prompt();
    // apiRequest = "https://api.tfl.gov.uk/StopPoint/"+stopCode+"/Arrivals"
    apiRequest = "https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals"

    // fetches API and creates "data" array to hold them in.
    const response = await fetch(apiRequest);
    const data = await response.json();

    // creates empty array for top 5 buses.
    var nextBus = [];
    
    // finds first 5 entries on API and returns certain properties of the buses
    for (i = 0; i < 5; i++) {
        let busi = {
            'busName': data[i].lineName,
            'waitTime': data[i].timeToStation,
            'destination': data[i].destionationName,
            'route': data[i].towards
        };
        
        nextBus.push(busi);
    }
    
    console.log(nextBus);
}

getBusStopData("Hello, bus stop code would you like to inspect?");