import { NextRequest, NextResponse } from "next/server";
import { Transaction } from "@/models/Transaction";
import connect from "@/app/lib/db";

export async function POST(request : NextRequest){

    try{

        const body = await request.json()

        if(!body?.user || !body?.cardno || !body?.type || !body?.device){
            return NextResponse.json('Invalid Inputs',{ status: 400 })
        }

        await connect()

        const transaction = await Transaction.create({
            user : body.user,
            cardno : body.cardno,
            type : body.type,
            device : body.device
        })

        return NextResponse.json(transaction)
    }
    catch(error){
        console.log('Error',error)
        return NextResponse.json('Internal Server Error',{ status:500 })
    }
}