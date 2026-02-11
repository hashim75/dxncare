import { Safepay } from '@sfpy/node-sdk';
import { NextResponse } from 'next/server';

// 1. Initialize Safepay securely on the server
// 1. Initialize Safepay securely on the server
const safepay = new Safepay({
  environment: (process.env.SAFEPAY_ENVIRONMENT || 'sandbox') as any,
  apiKey: process.env.NEXT_PUBLIC_SAFEPAY_API_KEY as string,
  v1Secret: process.env.SAFEPAY_SECRET_KEY as string,
  webhookSecret: process.env.SAFEPAY_WEBHOOK_SECRET || 'temporary_dummy_secret_to_satisfy_typescript', // <--- Add this line
});

export async function POST(req: Request) {
  try {
    // 2. Receive the doctor details from your frontend button
    const body = await req.json();
    const { doctorId, fee } = body;

    // 3. Create a Payment Tracker Token with Safepay
    // Note: Safepay calculates amounts in paisas, so we multiply the Rupee amount by 100
    const { token } = await safepay.payments.create({
      amount: fee , 
      currency: 'PKR',
    });

    // 4. Generate the actual Checkout URL
// 4. Generate the actual Checkout URL
    const checkoutUrl = safepay.checkout.create({
      token,
      orderId: `ORD-${Date.now()}`, 
      // Hardcoded local URLs for testing:
      cancelUrl: `http://localhost:3000/doctors/${doctorId}`,
      redirectUrl: `http://localhost:3000/doctors/${doctorId}?payment=success`,
      source: 'custom',
      webhooks: false,
    });
    // 5. Send the URL back to the frontend so the user can be redirected
    return NextResponse.json({ url: checkoutUrl });

  } catch (error) {
    console.error("Safepay Error:", error);
    return NextResponse.json({ error: "Failed to generate checkout link" }, { status: 500 });
  }
}