import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Transaction } from "@/models/Transaction";
import connect from "@/app/lib/db";
import { User } from "@/models/User";

export async function GET(){

    try {

        await connect()

        const session = await getServerSession()

        const user = await User.findOne({
            email : session?.user?.email
        })

        if(!session?.user){
            return NextResponse.json('no user fount',{ status: 401 })
        }

        const contributions = await Transaction.find({
            user : user._id
        })

        console.log(contributions)

        return NextResponse.json(contributions)
    } catch (error) {
        console.log(error)
        return NextResponse.json('Internal Server Error',{ status:500 })
    }
}