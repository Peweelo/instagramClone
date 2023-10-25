import { NextResponse } from 'next/server'
import prisma from '../../libs/prismadb'
import { authOptions } from '@/app/authOptions'
import { getServerSession } from 'next-auth'

export async function POST(req: Request) {
	const session = await getServerSession(authOptions)
	const { postId } = await req.json()
	console.log(postId)

	const post = await prisma.post.findUnique({
		where: {
			id: postId,
		},
	})

	if (post.likedBy.length === 0) {
		const post = await prisma.post.update({
			where: {
				id: postId,
			},
			data: {
				likedBy: [session?.user.id],
				likes: { increment: 1 },
			},
		})
		return NextResponse.json({ message: post })
	}
	if (post.likedBy.includes(session?.user.id)) {
		return NextResponse.json({ error: 'user already liked that post!' })
	}

	const followedBy = await post.likedBy

	followedBy.push(session?.user.id)

	await prisma.post.update({
		where: {
			id: postId,
		},
		data: {
			likedBy: followedBy,
			likes: { increment: 1 },
		},
	})

	return NextResponse.json({ meesage: postId })
}
