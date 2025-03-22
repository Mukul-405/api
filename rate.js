const axios = require('axios');

const url = 'http://35.200.185.69:8000/v3/autocomplete?query=a';
let requestCount = 0;

async function sendRequests() {
  while (true) {
    try {
      const response = await axios.get(url);
      requestCount++;
      console.log(`Request #${requestCount} - Status Code: ${response.status}`);

      if (response.status === 429) {
        console.log('Rate limit reached!');
        break;
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.log(`Request #${requestCount + 1} - Status Code: 429`);
        console.log('Rate limit reached!');
        break;
      } else {
        console.error('Error making request:', error.message);
      }
    }
    await new Promise(resolve => setTimeout(resolve, 1));
  }
  console.log(`Total requests made before rate limiting: ${requestCount}`);
}

sendRequests();