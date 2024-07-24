import { NextRequest, NextResponse } from "next/server";
import { ScrapeRequest, ScrapeResponse } from "@/types/ApiTypes";
import { ScrapeSportitude } from "./scrapeUtil";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: ScrapeRequest = await req.json();
    const productCode = body;

    const result = await ScrapeSportitude(productCode.productCode);

    //Result array is null
    if (!result) {
      return NextResponse.json(
        {
          error: "Product not found!",
        },
        { status: 500 }
      );
    }

    //Result array is not null
    const responseData: ScrapeResponse = {
      success: true,
      data: result,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Invalid request",
      },
      { status: 400 }
    );
  }
}
