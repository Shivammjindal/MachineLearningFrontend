import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){

    try {

        const res = await request.json()
        console.log(res)

        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: 'ee',
              password: 'ees'
            })
        })

        const final = await response.json()
        console.log(final)

        return NextResponse.json('go!', { status: 200 })

    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}