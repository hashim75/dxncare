import { NextResponse } from 'next/server';
import { trackPostExOrder } from '../../../lib/postex';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const trackingNumber = searchParams.get('trackingNumber');

  if (!trackingNumber) {
    return NextResponse.json({ error: "Tracking number is required" }, { status: 400 });
  }

  try {
    const data = await trackPostExOrder(trackingNumber);

    if (data.statusCode === "200") {
      return NextResponse.json({ success: true, trackingData: data.dist });
    } else {
      return NextResponse.json({ success: false, message: data.statusMessage }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}