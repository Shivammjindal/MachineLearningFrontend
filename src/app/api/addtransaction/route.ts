import { NextRequest, NextResponse } from "next/server";
import { Transaction } from "@/models/Transaction";
import connect from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { User } from "@/models/User";

export async function POST(request : NextRequest){

    try{

        const session = await getServerSession()
        if(!session?.user?.email){
            return NextResponse.json('Unauthorised',{
                status:401
            })
        }


        const body = await request.json()

        if(
            !body?.user ||
            !body?.cardno ||
            !body?.CardType ||
            !body?.Time ||
            !body?.Date ||
            !body?.Amount ||
            !body?.TypeOfGoods ||
            !body?.Location
        ){
            return NextResponse.json("Invalid Inputs", { status: 400 })
        }


        const user = await User.findOne({
            email: body.user
        })

        await connect()

        const transaction = await Transaction.create({
            user: user._id,
            cardno: body.cardno,
            CardType: body.CardType,
            Time: body.Time,
            Date: body.Date,
            Amount: body.Amount,
            TypeOfGoods: body.TypeOfGoods,
            Location: body.Location,
        })

        return NextResponse.json(transaction)
        
    }
    catch(error){
        console.log('Error',error)
        return NextResponse.json('Internal Server Error',{ status:500 })
    }
}