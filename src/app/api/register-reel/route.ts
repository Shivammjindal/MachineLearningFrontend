import { NextResponse, NextRequest } from "next/server";
import { Reel } from "@/models/Reel";
import { getServerSession } from "next-auth";
import connect from "@/app/lib/db";

export async function POST(request: NextRequest){
    try {

        const session = await getServerSession()

        if(!session?.user){
            return NextResponse.json({
                'message':'method not allowed'
            },{
                status: 401
            })
        }

        await connect()

        const { title, description, fileId, fileUrl } = await request.json()

        if(!title || !description || !fileId){
            return NextResponse.json('Invalid Data', { status : 400 })
        }

        const existingReel = await Reel.findOne({
            reelUrl : fileId
        })

        if(existingReel){
            return NextResponse.json('Reel Already Exists', { status: 400 })
        }

        //creating new one
        await Reel.create({
            title: title,
            reelUrl: fileUrl,
            fileId: fileId,
            description: description,
            email: session.user.email,
            transformation: {
                height : 1920,
                width : 1080,
                quality : 100
            }
        })

        return NextResponse.json({
            message : 'created'
        },{
            status: 201
        })

    } catch (error) {
        return NextResponse.json({
            message:'Internal server error'
        },{
            status: 500
        })
    }
}