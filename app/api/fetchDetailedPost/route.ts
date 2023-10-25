import { NextResponse } from 'next/server'
import prisma from '../../libs/prismadb'
type postType = {
	id: string
	likes: number
	image: string
	userId: string
	title: string
	description?: string
}
export async function POST(req: Request) {
	const { postId } = await req.json()
	const post: postType = await prisma.post.findUnique({
		where: {
			id: postId,
		},
	})
	
	if (!post) {
		console.log('test')
		return NextResponse.json({ error: 'Something went wrong!' })
	}

	const user = await prisma.user.findUnique({
		where: {
			id: post.userId,
		},
	})
	if (!user) {
		return NextResponse.json({ error: 'Something went wrong!' })
	}

	return NextResponse.json({
		message: {
			title: post.title,
			likes: post.likes,
			description: post.description,
			image: post.image,
			username: user.username,
			profilePicutre: user.image,
		},
	})
}
