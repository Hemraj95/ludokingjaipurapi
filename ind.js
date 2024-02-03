const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://ludo-king-room-code-api.p.rapidapi.com/global/checkroom',
  params: {code: 'roomcode'},
  headers: {
    'X-RapidAPI-Key': '679a1295edmsh06a539c0ebb34d3p1bf229jsnf3d26418d766',
    'X-RapidAPI-Host': 'ludo-king-room-code-api.p.rapidapi.com'
  }
};

try {
	const response = axios.request(options);
	console.log("response.data");
	console.log(response.data);
} catch (error) {
	//console.error("error",error);
}