import { NextRequest, NextResponse } from "next/server";
import { imageKit } from "../imagekit-auth/route";

export async function POST(request:NextRequest){

    try {      

        const { fileId } = await request.json()

        if(!fileId){
            return NextResponse.json(
                {
                    message : 'Invalid File Id'
                },
                {
                    status: 400
                }
            )
        }

        imageKit.deleteFile(fileId, (error, result) => {
            if(error){
                console.log(error)
                return NextResponse.json({
                    message: "invalid file choosen"
                },{
                    status: 400
                })
            }
        })

        return NextResponse.json({"message" : 'File Removed Successfully'},{status: 200})

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            'message':'Internal server error'
        },{
            status: 500
        })
    }
}