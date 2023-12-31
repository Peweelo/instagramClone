import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { authOptions } from '@/app/authOptions'
import { getServerSession } from 'next-auth'
import prisma from '../../libs/prismadb'
const f = createUploadthing()

const auth = async (req: Request) => {
	const session = await getServerSession(authOptions)

	const user = session?.user

	return user
} // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	imageUploader: f({ image: { maxFileSize: '4MB' } })
		// Set permissions and file types for this FileRoute
		.middleware(async ({ req }) => {
			// This code runs on your server before upload
			const user = await auth(req)

			// If you throw, the user will not be able to upload
			if (!user) throw new Error('Unauthorized')

			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { id: user.id }
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload
			console.log('Upload complete for userId:', metadata.id)

			console.log('file url', file.url)

			const userImage = await prisma.user.update({
				where: {
					id: metadata.id,
				},
				data: {
					image: file.url,
				},
			})

			if (!userImage) {
				throw new Error('something went wrong! Please try again')
			}
		}),
	postImageUploader: f({ image: { maxFileSize: '8MB' } })
		// Set permissions and file types for this FileRoute
		.middleware(async ({ req }) => {
			// This code runs on your server before upload
			const user = await auth(req)

			// If you throw, the user will not be able to upload
			if (!user) throw new Error('Unauthorized')

			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { id: user.id }
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload
			console.log('Upload complete for userId:', metadata.id)

			console.log('file url', file.url)
		}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
