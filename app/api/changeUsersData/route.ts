import { NextResponse } from 'next/server'
import prisma from '../../libs/prismadb'

export async function POST(req: Request) {
	let { newUsername, newEmail, id } = await req.json()
	const user = await prisma.user.findUnique({
		where: {
			id,
		},
	})
    
	if (newUsername === '') {
		newUsername = user.username
	}
	if (newEmail === '') {
		newEmail = user.email
	}
	if (!user) {
		return NextResponse.json({ error: 'couldnt find a user!' })
	}

	const userWithNewData = await prisma.user.update({
		where: {
			id,
		},
		data: {
			username: newUsername,
			email: newEmail,
		},
	})

	if (!userWithNewData) {
		return NextResponse.json({ error: 'couldnt change users data, please try again later!' })
	}

	return NextResponse.json({ message: 'succesfully changed users data!' })
}
