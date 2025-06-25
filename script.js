
function order(plan, amount) {
  document.getElementById('payment-section').classList.remove('hidden');
  document.getElementById('summary-text').innerText = `You selected the ${plan} plan for ₹${amount}`;
  document.getElementById('selected-plan').value = plan;
  document.getElementById('selected-amount').value = amount;
}

document.getElementById('payment-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const form = e.target;
  const data = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    plan: form.plan.value,
    amount: form.amount.value
  };

  const paymentUrl = `https://sandbox.cashfree.com/pg/orders`; // Use live URL in production
  const headers = {
    'Content-Type': 'application/json',
    'x-api-version': '2022-09-01',
    'x-client-id': CF_CLIENT_ID,
    'x-client-secret': CF_CLIENT_SECRET
  };

  try {
    const res = await fetch(paymentUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        order_amount: data.amount,
        order_currency: 'INR',
        customer_details: {
          customer_id: data.email,
          customer_email: data.email,
          customer_phone: data.phone
        },
        order_meta: {
          return_url: 'https://yourdomain.com/thankyou.html'
        }
      })
    });

    const result = await res.json();
    if (result.payment_link) {
      window.location.href = result.payment_link;
    } else {
      alert('Failed to generate payment link. Check API keys.');
    }
  } catch (err) {
    console.error(err);
    alert('Payment error. Try again.');
  }
});
