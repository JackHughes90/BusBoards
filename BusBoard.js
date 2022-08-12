const readline = require('readline-sync');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function getBusStopData(requestStopCode) {
    console.log(requestStopCode);
    stopCode = readline.prompt();
    // apiRequest = "https://api.tfl.gov.uk/StopPoint/"+stopCode+"/Arrivals"
    apiRequest = "https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals"

    // fetches API and creates "data" array to hold them in.
    const busStopResponse = await fetch(apiRequest);
    const busStopData = await busStopResponse.json();

    // creates empty array for top 5 buses.
    var nextBus = [];
    
    // finds first 5 entries on API and returns certain properties of the buses
    for (i = 0; i < 5; i++) {
        let bus = {
            'busName': busStopData[i].lineName,
            'waitTime': busStopData[i].timeToStation,
            'destination': busStopData[i].destionationName,
            'route': busStopData[i].towards
        };
        
        nextBus.push(bus);
    }
    
    console.log(nextBus);
}

function findNearestStops(requestPostCode) {
    console.log(requestPostCode);
    postCode = readline.prompt();
    // pcApiRequest = "api.postcodes.io/postcodes/"+postCode
    pcApiRequest = "api.postcodes.io/postcodes/N129HB"

    

}

getBusStopData("Hello, bus stop code would you like to inspect?");