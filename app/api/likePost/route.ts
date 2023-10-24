import { NextResponse } from 'next/server'
import prisma from '../../libs/prismadb'
import { authOptions } from '@/app/authOptions'
import { getServerSession } from 'next-auth'

export async function POST(req: Request) {
	const { postId } = await req.json()
	console.log(postId)
	return NextResponse.json({ meesage: postId })
}
