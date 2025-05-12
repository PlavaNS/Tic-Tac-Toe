// netlify/functions/complete-payment.js
const axios = require('axios');

exports.handler = async function(event, context) {
  try {
    const { paymentId } = JSON.parse(event.body);

    // Pošalji zahtev na Pi Network server
    const response = await axios.post(
      'https://core.minepi.com/v2/payments/approve',
      { paymentId },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-pi-server-key': process.env.PI_SERVER_KEY
        }
      }
    );

    // Vrati klijentu rezultat
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Payment approval error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
