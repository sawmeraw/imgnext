"use server"
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { VersionAPIResponse } from "@/apiTypes/VersionType";
import { NextApiRequest, NextApiResponse } from "next";
import VersionAPIRequest from "@/apiTypes/VersionType";
import VersionData from "@/apiTypes/VersionType";

const versionFilePath = path.join(process.cwd(), 'data', 'hokaVersion.json');

export async function GET(req: NextRequest) {
    const data = await getCurrentVersion(versionFilePath);
    if (data) {
      const response = NextResponse.json({ version: data.version }, { status: 200 });
      response.headers.set('Cache-Control', 'public, max-age=3600');
      return response;
    }
    return NextResponse.json({ version: 'NA', error: 'Error reading the version from the server.' }, { status: 500 });
  }
  
  export async function POST(req: NextRequest) {
    const content: VersionAPIRequest = await req.json();
    if (!content || !content.version) {
      return NextResponse.json({ version: '', error: 'Empty request.' }, { status: 400 });
    }
  
    const updateResult = await updateVersion(versionFilePath, content);
    if (updateResult.error) {
      return NextResponse.json({ version: updateResult.version, error: 'Error updating the version.' }, { status: 500 });
    }
  
    return NextResponse.json({ version: updateResult.version }, { status: 200 });
  }
  
  async function getCurrentVersion(filePath: string): Promise<VersionData | null> {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContent) as VersionData;
    } catch (error) {
      console.error('Error reading version from the file.');
      return null;
    }
  }
  
  async function updateVersion(filePath: string, content: VersionData): Promise<{ version: string; error: boolean }> {
    try {
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');
      const newVersion = await getCurrentVersion(filePath);
      if (newVersion) {
        return { version: newVersion.version, error: false };
      }
    } catch (error) {
      console.error('Error writing the version to the file.');
    }
    return { version: 'NA', error: true };
  }