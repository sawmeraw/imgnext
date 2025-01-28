import { NextRequest, NextResponse } from "next/server";
import FetchImages from "./fetchImages";
import { NextApiRequest, NextApiResponse } from "next";


interface ImageResponse {
    images?: string[];
    error?: string;
}
  
export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const queryParams = url.searchParams;
    const brand = queryParams.get('brand');
    const productCode = queryParams.get('productCode');
  
    if (!brand || !productCode) {
      return NextResponse.json({ error: 'Provide all details.' }, { status: 400 });
    }
  
    try {
      const imageUrls = await FetchImages({ brand, productCode });
      if (imageUrls.length > 0) {
        const response = NextResponse.json({ images: imageUrls }, { status: 200 });
        response.headers.set('Cache-Control', 'public, max-age=119');
        response.headers.append('Set-Cookie', `previousFetch=${brand},${productCode}; Max-Age=3599; Path=/search`);
        return response;
      } else {
        const errorResponse = NextResponse.json({ error: 'No images found' }, { status: 403 });
        errorResponse.headers.set('Cache-Control', 'no-store');
        return errorResponse;
      }
    } catch (error) {
      const previousFetchCookie = req.cookies.get('previousFetch');
      if (previousFetchCookie) {
        const prevFetch = String(previousFetchCookie);
        const [prevBrand, prevProductCode] = prevFetch.split(',');
        const urls = await FetchImages({ brand: prevBrand, productCode: prevProductCode });
  
        return NextResponse.json({ error: 'Server error. Reverting to previous search.', images: urls }, { status: 500 });
      }
      return NextResponse.json({ error: 'Server error.' }, { status: 500 });
    }
  }