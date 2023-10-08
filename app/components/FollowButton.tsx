'use client'
import { toast, Toaster } from 'sonner'
import styles from './FollowButton.module.css'
import { useRouter } from 'next/navigation'
type PropsTypes = {
	usersId: Number
	followedId: Number
	classes: string
}

const FollowButton = ({ usersId, followedId, classes }: PropsTypes) => {
	const router = useRouter()
	const FollowHandler = async () => {
		if (usersId === undefined) {
			router.push('/login')
		} else {
			const response = await fetch('../api/followHandler', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ usersId, followedId }),
			})

			console.log(await response.json())
			toast.success('succesffully followed a user!')
		}
	}

	return (
		<>
			<a onClick={FollowHandler} className={`${styles[classes]}`}>
				Follow
			</a>
			<Toaster richColors />
		</>
	)
}
export default FollowButton
