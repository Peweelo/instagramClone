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
	const [buttonColldown, setButtonColldown] = useState(true)
	const router = useRouter()
	const FollowHandler = async () => {
		setButtonColldown(false)
		if (buttonColldown === true) {
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
				setButtonColldown(true)
				toast.success('succesffully followed a user!')
			}
		}
	}

	return (
		<>
			{buttonColldown ? (
				<a onClick={FollowHandler} className={`${styles[classes]}`}>
					Follow
				</a>
			) : (
				<a className={styles.disable}>Follow</a>
			)}
			<Toaster richColors />
		</>
	)
}
export default FollowButton
