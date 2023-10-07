import { NextResponse } from 'next/server'
import prisma from '../../libs/prismadb'
export async function POST(req: Request) {
	const { userId, imageUrl } = await req.json()

	console.log(userId, imageUrl)

	const updatingUserImage = await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			image: imageUrl,
		},
	})

	if (!updatingUserImage) {
		return NextResponse.json({ error: 'something went wrong' }, { status: 400 })
	}

	return NextResponse.json({ message: 'Successfully changed users profile picture!' }, { status: 200 })
}
