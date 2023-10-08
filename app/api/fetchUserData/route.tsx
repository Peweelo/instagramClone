import { NextResponse } from 'next/server'
import prisma from '../../libs/prismadb'
import { authOptions } from '@/app/authOptions'
import { getServerSession } from 'next-auth'
export async function GET() {
	const session = await getServerSession(authOptions)
	const email = session?.user?.email

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	})

	return NextResponse.json({ message: user }, { status: 200 })
}

export async function POST(req: Request) {
	const userName = await req.json()
	let followersId: any = []

	const user = await prisma.user.findUnique({
		where: {
			username: userName,
		},
	})
	const listoffollowers = await prisma.ListOfFollowers.findMany({
		where: {
			userId: user.id,
		},
	})

	Object.values(listoffollowers).map((follow: any) => {
		followersId.push(follow.FollowersId)
	})
	console.log(followersId);

	return NextResponse.json({ message: {user,followersId} }, { status: 200 })
}
