const express = require("express");
const axios = require('axios');
const router = express.Router();
const qs = require('qs');
router.get('/', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://ludo-king-room-code-api.p.rapidapi.com/roomcode/c',
        headers: {
          'X-RapidAPI-Key': '679a1295edmsh06a539c0ebb34d3p1bf229jsnf3d26418d766',
          'X-RapidAPI-Host': 'ludo-king-room-code-api.p.rapidapi.com'
        }
      };
  
    try {
      const response = await axios.request(options);
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
 
});
router.post('/payment', async (req, res) => {
  const url = 'https://payment.marwadicollaction.shop/api/create-order';

  const data = qs.stringify(req.body);
  
  const config = {
    method: 'post',
    url: url,
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    res.send(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });


});
router.post('/payment/check', async (req, res) => {

  const url = 'https://payment.marwadicollaction.shop/api/check-order-status';

  const data = qs.stringify(req.body);

  const config = {
    method: 'post',
    url: url,
    data : data
  };
  
  // Making the request
  axios(config)
  .then(function (response) {
    console.log("JSON.stringify(response.data)",response.data);
    res.send(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });


});
module.exports = router
