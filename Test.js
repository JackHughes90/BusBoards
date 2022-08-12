const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function test() {

    const postCodeResponse = await fetch('https://api.tfl.gov.uk/Journey/JourneyResults/n129hb/to/n129hj');
    const postCodeData = await postCodeResponse.json();

    console.log(postCodeData);

}

test();