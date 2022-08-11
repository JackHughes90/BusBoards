const readline = require('readline-sync');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function getBusStopData(askForStopCode) {
    console.log(askForStopCode);
    stopCode = readline.prompt();
    // apiRequest = "https://api.tfl.gov.uk/StopPoint/"+stopCode+"/Arrivals"
    apiRequest = "https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals"
    //console.log(stopCode);

    
    const response = await fetch(apiRequest);
    const data = await response.json();

    var nextBus = [];
    
    for (i = 0; i < 5; i++) {
        
        nextBus['Bus name'][i]=data[i].lineName;
        nextBus['Wait Time'][i]=data[i].timeToStation;
        nextBus['Destination'][i]=data[i].destionationName;
        nextBus['Route'][i]=data[i].towards;
        //push new array
    }
    
    console.log(nextBus);
    


    // arrayOfBus[0].lineName
    
    /*
    arrayOfBus = fetch(apiRequest)
    .then(response => response.json())
    .then(body => console.log(body));

    //console.log(arrayOfBus);

    */
}

getBusStopData("Hello, bus stop code would you like to inspect?");

// person.name