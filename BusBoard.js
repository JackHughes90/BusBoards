const readline = require('readline-sync');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function getBusStopData(stopCode,stopName) {
    
    apiRequest = "https://api.tfl.gov.uk/StopPoint/"+stopCode+"/Arrivals"
    //apiRequest = "https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals"

    // fetches API and creates "data" array to hold them in.
    const busStopResponse = await fetch(apiRequest);
    const busStopData = await busStopResponse.json();

    // creates empty array for top 5 buses.
    var nextBus = [];

    nextBus[0]=stopName;
    
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
    let postCode;
    let postCodeResponse;
    let postCodeData;
    
    //console.log(postCodeData);

    do
    {
        try {
            postCode = readline.prompt();
            pcApiRequest = "https://api.postcodes.io/postcodes/"+postCode
            // pcApiRequest = "https://api.postcodes.io/postcodes/N129HB"
            
            postCodeResponse = await fetch(pcApiRequest);
            postCodeData = await postCodeResponse.json();
            if (postCodeData.status === 404) throw "Invalid post code";
        }
        catch(err) {
            console.log(err);
        }
    } while (postCodeData.status === 404);

    const latitude=postCodeData['result'].latitude;
    const longitude=postCodeData['result'].longitude;

    const busRadiusSearchApi='https://api.tfl.gov.uk/StopPoint/?lat='+latitude+'&lon='+longitude+'&stopTypes=NaptanPublicBusCoachTram';
    const radiusResponse = await fetch(busRadiusSearchApi);
    const radiusData = await radiusResponse.json();
    //console.log(radiusData);

    for(let i=0;i<2;i++){
    const busStop=radiusData.stopPoints[i].naptanId;
    const busStopName=radiusData.stopPoints[i].commonName;
    getBusStopData(busStop,busStopName);
    }
}

// a function to guide the user to the nearest bus stop.
async function journeyPlanner(postCode, busStopCode) {
    
    // request API
    const plannerResponse = await fetch('https://api.tfl.gov.uk/Journey/JourneyResults/n129hb/to/n129hj');
    const plannerData = await plannerResponse.json();

    for (i = 0; i < plannerData.journeys[0].legs[0].instruction.steps.length; i++) {

        // for each step, grab descriptionHeading and description.
        console.log(plannerData.journeys[0].legs[0].instruction.steps[i].descriptionHeading
             + " " + plannerData.journeys[0].legs[0].instruction.steps[i].description + ";");
        
        // move onto next step.
        
    }
    // "you have arrived"
    console.log("You have arrived!");
}


// async function postCodeCheck (postCode) {
//     pcApiRequest = "https://api.postcodes.io/postcodes/"+postCode
//     //pcApiRequest = "https://api.postcodes.io/postcodes/N129HB"
//     const postCodeResponse = await fetch(pcApiRequest);
//     const postCodeData = await postCodeResponse.json();
//     if (postCodeData.status === 404) {
//         return false;
//     }
//     else {
//         return true;
//     }
// }

findNearestStops('Enter the post code to be searched for:');

//journeyPlanner();

