const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const { name, email, phone, plan, amount } = JSON.parse(event.body);

  const response = await fetch("https://api.cashfree.com/pg/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-version": "2022-09-01",
      "x-client-id": process.env.CF_CLIENT_ID,
      "x-client-secret": process.env.CF_CLIENT_SECRET
    },
    body: JSON.stringify({
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: email,
        customer_email: email,
        customer_phone: phone
      },
      order_meta: {
        return_url: "https://akshitbhatia2004.github.io/akshitbot-vps/thankyou.html"
      }
    })
  });

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
