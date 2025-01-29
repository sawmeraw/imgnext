"use server"
import { NextRequest, NextResponse } from "next/server";
import { VersionAPIResponse } from "@/apiTypes/VersionType";
import VersionAPIRequest from "@/apiTypes/VersionType";
import VersionData from "@/apiTypes/VersionType";
import { Storage } from "@google-cloud/storage";
import { error } from "console";
import path from "path";

const projectId = process.env.PROJECT_ID!
const bucketName = process.env.BUCKET_NAME!
const hokaVersionPath = process.env.HOKA_VERSION_PATH!
const encodedKey = process.env.PRIVATE_KEY!
const decodedKey = Buffer.from(encodedKey, 'base64').toString('utf-8')
const keyFileObject = JSON.parse(decodedKey)

const storage = new Storage({projectId, credentials: keyFileObject})

export async function GET(req: NextRequest) {
  const data = await getCurrentVersion();
  if(!data){
    return NextResponse.json({version: 'NA', error: "Couldn't read the data in the server."}, {status: 500})
  }
  const res = NextResponse.json({version: data.version}, {status: 200})
  res.headers.set('Cache-Control', 'public, max-age=172800, stale-while-revalidate=86400')
  return res
}

export async function getCurrentVersion(): Promise<VersionData | null> {
  try{

    if(!bucketName || ! hokaVersionPath){
      throw new Error("Bucket name or file path is not defined.")
    }
    const bucket = storage.bucket(bucketName)
    const file = bucket.file(hokaVersionPath)
    const data = await file.download()
    const config : VersionData = JSON.parse(data.toString())
    return config
  } catch(error){
    console.error('Error fetching config file: ', error)
    return null
  }
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

async function updateVersion(content: VersionData): Promise<{ version: string; error: boolean }> {

  try{
    const bucket = storage.bucket(bucketName)
    const file = bucket.file(hokaVersionPath)
    await file.save(JSON.stringify(content), {
      resumable: false,
      contentType: "application/json"
    })
    return {version: content.version, error:false}
  } catch(error){
    console.error("Error updating config file.")
    return { version: 'NA', error: true };
  }
}