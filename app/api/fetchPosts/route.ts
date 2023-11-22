import { NextResponse } from 'next/server'
import prisma from '../../libs/prismadb'

export async function GET(req: Request) {
	const url = new URL(req.url)

	const take = url.searchParams.get('take')
	const lastCursor = url.searchParams.get('lastCursor')
	
	let result = await prisma.post.findMany({
		take: take ? parseInt(take as string) : 10,
		...(lastCursor && {
			skip: 1, // Do not include the cursor itself in the query result.
			cursor: {
				id: lastCursor as string,
			},
		}),
		orderBy: {
			createdAt: 'desc',
		},
	})

	if (result.length == 0) {
		return new Response(
			JSON.stringify({
				data: [],
				metaData: {
					lastCursor: null,
					hasNextPage: false,
				},
			}),
			{ status: 200 }
		)
	}

	const lastPostInResults: any = result[result.length - 1]
	const cursor: any = lastPostInResults.id

	const nextPage = await prisma.post.findMany({
		// Same as before, limit the number of events returned by this query.
		take: take ? parseInt(take as string) : 7,
		skip: 1, // Do not include the cursor itself in the query result.
		cursor: {
			id: cursor,
		},
	})

	const data = {
		data: result,
		metaData: {
			lastCursor: cursor,
			hasNextPage: nextPage.length > 0,
		},
	}
	return new Response(JSON.stringify(data), { status: 200 });
}
