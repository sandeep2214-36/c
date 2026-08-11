import { NextResponse } from "next/server";
import { DemoSourceAdapter } from "@/lib/sources/demo/demo-provider";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Search query parameter 'q' is required." }, { status: 400 });
  }

  try {
    // Instantiate available adapters (Demo + Real configured adapters)
    const demoAdapter = new DemoSourceAdapter();
    const results = await demoAdapter.searchProducts(query);

    return NextResponse.json({
      query,
      count: results.length,
      results
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error during search execution." }, { status: 500 });
  }
}
