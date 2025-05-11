import axios from "axios";

export async function handler(event) {
  const { paymentId } = JSON.parse(event.body || "{}");
  const PI_SERVER_KEY = process.env.PI_SERVER_KEY;
  if (!paymentId || !PI_SERVER_KEY) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing paymentId or server key" })
    };
  }
  try {
    const apiRes = await axios.post(
      "https://api.minepi.com/v2/payments/complete",
      { paymentId },
      { headers: { Authorization: `Bearer ${PI_SERVER_KEY}` } }
    );
    return {
      statusCode: 200,
      body: JSON.stringify(apiRes.data)
    };
  } catch (e) {
    console.error("Error completing payment:", e.response?.data || e.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to complete payment" })
    };
  }
}
