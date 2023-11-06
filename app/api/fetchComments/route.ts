import { NextResponse } from 'next/server'
import prisma from '../../libs/prismadb'

export async function POST(req: Request) {
	const { postId } = await req.json()

	const comments = await prisma.comment.findMany({
		where: {
			postId,
		},
	})

	if (!comments) {
		return NextResponse.json({ error: 'something went wrong' })
	}

	return NextResponse.json({ message: comments })
}
