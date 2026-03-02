import { NextResponse } from 'next/server';
import { createPostExOrder, PostExOrderPayload } from '../../../lib/postex';

export async function POST(request: Request) {
  try {
    const body: PostExOrderPayload = await request.json();

    // Validate minimum required fields based on PostEx Doc
    if (!body.customerName || !body.customerPhone || !body.deliveryAddress || !body.cityName) {
      return NextResponse.json({ error: "Missing required customer details" }, { status: 400 });
    }

    const postexResponse = await createPostExOrder(body);

    if (postexResponse.statusCode === "200") {
      return NextResponse.json({ 
        success: true, 
        trackingNumber: postexResponse.dist.trackingNumber,
        statusMessage: postexResponse.statusMessage 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: postexResponse.statusMessage 
      }, { status: 400 });
    }

  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}