"use server"
import VersionData from "@/apiTypes/VersionType";
import { Storage } from "@google-cloud/storage";


const projectId = process.env.PROJECT_ID!
const bucketName = process.env.BUCKET_NAME!
const hokaVersionPath = process.env.HOKA_VERSION_PATH!
const encodedKey = process.env.PRIVATE_KEY!
const decodedKey = Buffer.from(encodedKey, 'base64').toString('utf-8')
const keyFileObject = JSON.parse(decodedKey)

const storage = new Storage({projectId, credentials: keyFileObject})

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

export async function updateVersion(content: VersionData): Promise<{ version: string; error: boolean }> {

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