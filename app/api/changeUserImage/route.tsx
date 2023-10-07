import { NextResponse } from 'next/server'
import prisma from '../../libs/prismadb'
export async function POST(req: Request) {
	const { userId, imageUrl } = await req.json()

	console.log(userId, imageUrl)

	const response = await fetch(imageUrl).catch(() => {
		return NextResponse.json({ error: 'Error validating image URL' }, { status: 400 })
	})

	if (response.ok === false) {
		return NextResponse.json({ error: 'Error validating image URL' }, { status: 400 })
	}
	const updatingUserImage = await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			image: imageUrl,
		},
	})

	if (!updatingUserImage) {
		return NextResponse.json({ error: 'Something went wrong!' }, { status: 400 })
	}

	return NextResponse.json({ message: 'successfully changed users picture!' }, { status: 200 })
}
