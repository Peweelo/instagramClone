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


	const user = await prisma.user.findUnique({
		where: {
			username: userName,
		},
	})

	return NextResponse.json({ message: user }, { status: 200 })
}
