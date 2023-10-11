import { NextResponse } from 'next/server'
import prisma from '../../libs/prismadb'
import { authOptions } from '@/app/authOptions'
import { getServerSession } from 'next-auth'

export async function POST(req: Request) {
	const { title, url } = await req.json()
	const session = await getServerSession(authOptions)
	const userId = session?.user?.id
	const postCreate = await prisma.post.create({
		data: {
			title,
			image: url,
			likes: 0,
			userId,
		},
	})

	if (!postCreate) {
		return NextResponse.json({ error: 'Something went wrong! Please try again' }, { status: 400 })
	}

	return NextResponse.json({ error: 'errorxpp' })
}
