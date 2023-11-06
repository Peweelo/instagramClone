import { NextResponse } from 'next/server'
import prisma from '../../libs/prismadb'
import { authOptions } from '@/app/authOptions'
import { getServerSession } from 'next-auth'

export async function POST(req: Request) {
	const { postId, comment, authorId, author } = await req.json()

	const session = await getServerSession(authOptions)
	const userId = session?.user?.id
	const username = session?.user.username

	console.log(username)

	const postCreate = await prisma.comment.create({
		data: {
			postId,
			text: comment,
			author,
			authorId,
		},
	})

	if (!postCreate) {
		return NextResponse.json({ error: 'Something went wrong! Please try again' }, { status: 400 })
	}

	return NextResponse.json({ error: 'errorxpp' })
}
