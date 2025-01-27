"use server"
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";


export async function GET(req: Request){
    const request = new NextRequest(req)
    const versionFilePath = path.join(process.cwd(), 'data', 'hokaVersion.json')

    switch(req.method){
        case "GET":
            const fileContent =  fs.readFileSync(versionFilePath, 'utf-8');
            const versionData = JSON.parse(fileContent)
            return NextResponse.json(versionData, {status: 200})
        default:
            return NextResponse.json({error: "Bad request!"}, {status: 400})

    }

}