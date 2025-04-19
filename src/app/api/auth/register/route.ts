import { NextRequest,NextResponse } from "next/server";
import connect from "@/app/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request : NextRequest, response: NextResponse){

    try {

        const { name, email, password } = await request.json()

        if(!name || !email || !password){
            return new NextResponse('Insufficient Data',{ status: 400 })
        }

        await connect()

        const existingUser = await User.findOne({
            email : email
        })

        if(existingUser){
            return new NextResponse('User Alreagy Exists Kindly Login', { status:400 })
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = await User.create({
            name : name,
            email : email,
            password : hashedPassword
        })
        
        return NextResponse.json(newUser, { status: 201 })

    } catch (error) {
        return new NextResponse('Internal Server Error',{ status: 500 })
    }

}