import { Reel } from "@/models/Reel";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connect from "@/app/lib/db";

export async function GET() {
    try {

        const session = await getServerSession()
        if(!session?.user){
            return NextResponse.json('Unauthorised',{ status:401 })
        }

        await connect()

        const reels = await Reel.find({})

        return NextResponse.json(reels,{ status:200 })
    } catch (error) {
        return NextResponse.json('Internal Server Error', { status:500 })
    }
}