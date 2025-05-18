import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(request:NextRequest){

    try {

        const session = await getServerSession()
        if(!session?.user?.email){
          return NextResponse.json('Unauthorised',{status:401})
        }

        const body = await request.json()

        if(
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

        const data = {
          "cardno": body.cardno,
          "CardType": body.CardType,
          "Time": body.Time,
          "Date": body.Date,
          "Amount": body.Amount,
          "TypeOfGoods": body.TypeOfGoods,
          "Location": body.Location
        }

        console.log(data)

        const response = await fetch('https://machine-learning-ks4n.onrender.com/predict', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const final = await response.json()

        return NextResponse.json(final, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json(error, { status: 500 })
    }
}