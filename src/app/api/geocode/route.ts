import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address');
  
    if (!address) {
      return new Response(JSON.stringify({ error: 'Address is required' }), { status: 400 });
    }
  
    const apiUrl = `https://rsapi.goong.io/geocode?address=${encodeURIComponent(address)}&api_key=N4YXUrsLHT5OwpSdtocn0CSN7dBkuSKPT0789x6F`;
  
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      console.log(data.results);
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to fetch geocode' }), { status: 500 });
    }
  }