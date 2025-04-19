import ImageKit from "imagekit";
import { NextResponse } from "next/server";

export const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKET_PRIVATE_KEY as string,
    urlEndpoint : process.env.NEXT_PUBLIC_URL_ENDPOINT as string,
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string
})

export async function GET() {
    try{
        return NextResponse.json(imageKit.getAuthenticationParameters(), { status: 200 })
    }
    catch(error){
        return NextResponse.json({
            message: "Image kit failure"
        },{
            status: 500
        })
    }
}