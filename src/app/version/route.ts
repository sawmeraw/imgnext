"use server"
import { NextRequest, NextResponse } from "next/server";
import { VersionAPIResponse } from "@/apiTypes/VersionType";
import VersionAPIRequest from "@/apiTypes/VersionType";
import { getCurrentVersion, updateVersion } from "./bucket";

export async function GET(req: NextRequest) {
  const data = await getCurrentVersion();
  if(!data){
    return NextResponse.json({version: 'NA', error: "Couldn't read the data in the server."}, {status: 500})
  }
  const res = NextResponse.json({version: data.version}, {status: 200})
  res.headers.set('Cache-Control', 'public, max-age=172800, stale-while-revalidate=86400')
  return res
}

export async function POST(req: NextRequest) {
  const content: VersionAPIRequest = await req.json();
  if (!content || !content.version) {
    return NextResponse.json({ version: '', error: 'Empty request.' }, { status: 400 });
  }
  
  const {version , error } = await updateVersion(content)
  if(!error){
    return NextResponse.json({version}, {status: 200})
  }
  return NextResponse.json({version: "NA"}, {status: 500})
  
}

