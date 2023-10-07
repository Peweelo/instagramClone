import { NextResponse } from 'next/server'
import prisma from '../../libs/prismadb'
import bcrypt from 'bcrypt'

export async function POST(req: any, res: any) {
	const body = await req.json()

	const { email, login, password } = body

	if (!email || !login || !password) {
		throw new Error('missing fields!')
	}

	const exist = await prisma.user.findUnique({
		where: {
			email,
		},
	})

	if (exist) {
		// throw new Error('that email is already in our database!')
		return NextResponse.json({ error: 'that email is already in our database!' }, { status: 422 })
	}

	const hashedPassword = await bcrypt.hash(password, 10)

	const user = await prisma.user.create({
		data: {
			email,
			username: login,
			login,
			hashedPassword,
			following: 0,
			followers: 0,
			image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
		},
	})

	return NextResponse.json({ message: 'Successfully created an account!' }, { status: 200 })
}
