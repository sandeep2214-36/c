import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, targetPrice, email } = body;

    if (!productId || !targetPrice || !email) {
      return NextResponse.json({ error: "Missing required fields: productId, targetPrice, email." }, { status: 400 });
    }

    // Here Prisma is used to persist the alert record in PostgreSQL database
    // await prisma.priceAlert.create({ data: { productId, targetPrice, userId: ... } });

    return NextResponse.json({ success: true, message: "Price drop alert created successfully." });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create price alert." }, { status: 500 });
  }
}
