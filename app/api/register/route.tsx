import { NextResponse } from 'next/server'
import prisma from '../../libs/prismadb'
import bcrypt from 'bcrypt'

export async function POST(req: any, res: any) {

    const body = await req.json()

    const {email,login,password} = body

    if(!email || !login || !password) {
        throw new Error('missing fields!')
    }

    const exist = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(exist) {
        throw new Error('that email is already in our database!')
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await prisma.user.create({
        data: {
            email,
            username: login,
            login,
            hashedPassword,
        }
    })
    console.log(await prisma.user.findMany({
        include: {
            comment: true
        }
    }));
    return new NextResponse(JSON.stringify(body), {status: 200})

}
