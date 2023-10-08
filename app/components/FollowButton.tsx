'use client'
import { toast, Toaster } from 'sonner'
import styles from './FollowButton.module.css'
type PropsTypes = {
	usersEmail: string | undefined
	followedEmail: string
	classes: string
}

const FollowButton = ({ usersEmail, followedEmail, classes }: PropsTypes) => {
	const FollowHandler = async () => {
		const response = await fetch('../api/followHandler', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ usersEmail, followedEmail }),
		})

		console.log(await response.json())
		toast.success('succesffully followed a user!')
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
