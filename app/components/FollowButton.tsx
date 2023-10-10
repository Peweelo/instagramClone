'use client'

import { toast, Toaster } from 'sonner'
import styles from './FollowButton.module.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
type PropsTypes = {
	usersId: Number
	followedId: Number
	classes: string
}

const FollowButton = ({ usersId, followedId, classes }: PropsTypes) => {
	const router = useRouter()
	const [buttonHandler, setButtonHandler] = useState(false)
	const FollowHandler = async () => {
		if (buttonHandler === true) {
			return
		}
		setButtonHandler(true)
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

			if (!response.ok) {
				toast.error('An error occurred! Please try again')
			}

			console.log(await response.json())
			toast.success('succesffully followed a user!')
			setButtonHandler(false)
		}
	}

	return (
		<>
			<button disabled={buttonHandler} onClick={FollowHandler} className={`${styles[classes]}`}>
				Follow
			</button>
			<Toaster richColors />
		</>
	)
}
export default FollowButton
