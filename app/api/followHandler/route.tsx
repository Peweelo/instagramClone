import { NextResponse } from 'next/server'
import prisma from '../../libs/prismadb'

export async function POST(req: Request) {
	const body = await req.json()

	const { usersEmail, followedEmail } = body

	const addingFollowerToUser = await prisma.user.update({
		where: {
			email: followedEmail,
		},
		data: {
			followers: { increment: 1 },
		},
	})

	if (!addingFollowerToUser) {
		return NextResponse.json({ error: 'Something went wrong!' }, { status: 400 })
	}
	const addingFollowingToUser = await prisma.user.update({
		where: {
			email: usersEmail,
		},
		data: {
			following: { increment: 1 },
		},
	})

	if (!addingFollowerToUser || !addingFollowingToUser) {
		return NextResponse.json({ error: 'Something went wrong!' }, { status: 400 })
	}
	const addingtolist = await prisma.ListOfFollowing.create({
		data: {
			FollowingId: addingFollowerToUser.id,
			user: {
				connect: {
					id: addingFollowingToUser.id,
				},
			},
		},
	})

	const tolist = await prisma.ListOfFollowers.create({
		data: {
			FollowersId: addingFollowingToUser.id,
			user: {
				connect: {
					id: addingFollowerToUser.id,
				},
			},
		},
	})
	

	if (!addingtolist) {
		return NextResponse.json({ error: 'Something went wrong!' }, { status: 400 })
	}
	return NextResponse.json({ message: 'Successfully followed an user!' }, { status: 200 })
}
