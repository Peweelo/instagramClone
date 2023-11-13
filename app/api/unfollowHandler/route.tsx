import { NextResponse } from 'next/server'
import prisma from '../../libs/prismadb'

export async function POST(req: Request) {
	const body = await req.json()

	const { usersId, followedId } = body

	const addingFollowerToUser = await prisma.user.update({
		where: {
			id: followedId,
		},
		data: {
			followers: { decrement: 1 },
		},
	})

	if (!addingFollowerToUser) {
		return NextResponse.json({ error: 'Something went wrong!' }, { status: 400 })
	}
	const addingFollowingToUser = await prisma.user.update({
		where: {
			id: usersId,
		},
		data: {
			following: { decrement: 1 },
		},
	})

	if (!addingFollowerToUser || !addingFollowingToUser) {
		return NextResponse.json({ error: 'Something went wrong!' }, { status: 400 })
	}
	await prisma.ListOfFollowing.delete({
		where: {
			FollowingId: followedId,
			userId: usersId,
		},
	})

	await prisma.ListOfFollowers.delete({
		where: {
			FollowersId: usersId,
			userId: followedId,
		},
	})

	return NextResponse.json({ message: 'Successfully unfollowed an user!' }, { status: 200 })
}
