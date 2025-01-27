"use server"
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";


export async function POST(req: Request){
    const request = new NextRequest(req)
    const versionFilePath = path.join(process.cwd(), 'data', 'hokaVersion.json')

    switch(req.method){
        case "POST":
            const newVersion = request.body
            console.log("new version: ", newVersion)
            const updatedVersion = {version: newVersion}
            fs.writeFileSync(versionFilePath, JSON.stringify(updatedVersion, null, 2), 'utf-8')
            return NextResponse.json(updatedVersion, {status: 200})
        default:
            return NextResponse.json({error: "Bad request!"}, {status: 400})
    }

}