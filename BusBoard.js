const readline = require('readline-sync');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function getBusStopData(requestStopCode) {
    console.log(requestStopCode);
    stopCode = readline.prompt();
    apiRequest = "https://api.tfl.gov.uk/StopPoint/"+stopCode+"/Arrivals"
    //apiRequest = "https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals"

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

async function findNearestStops(requestPostCode) {
    console.log(requestPostCode);
    postCode = readline.prompt();
    pcApiRequest = "https://api.postcodes.io/postcodes/"+postCode
    //pcApiRequest = "https://api.postcodes.io/postcodes/N129HB"
    const postCodeResponse = await fetch(pcApiRequest);
    const postCodeData = await postCodeResponse.json();
    //console.log(postCodeData);

    const latitude=postCodeData['result'].latitude;
    const longitude=postCodeData['result'].longitude;

    const busRadiusSearchApi='https://api.tfl.gov.uk/StopPoint/?lat='+latitude+'&lon='+longitude+'&stopTypes=NaptanPublicBusCoachTram';
    const radiusResponse = await fetch(busRadiusSearchApi);
    const radiusData = await radiusResponse.json();
    //console.log(radiusData);

    
    const busStop1=radiusData.stopPoints[0].naptanId;
    const busStop2=radiusData.stopPoints[1].naptanId;
    
    

}

//getBusStopData("Hello, bus stop code would you like to inspect?");
findNearestStops('Enter the post code to be searched for:');
