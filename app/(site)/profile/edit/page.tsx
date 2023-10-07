'use client'

import styles from './page.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import Modal from '../../../components/Modal'
import { useSession } from 'next-auth/react'

const editProfilePage = () => {
	const [sessionData, setSessionData] = useState<any>(null)
	const [open, setOpen] = useState<boolean>(false)
	const { data: session, update } = useSession()
	const userId: string = sessionData?.message.id

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('../../../api/fetchUserData')
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
			const result = await response.json()
			setSessionData(result)
		}

		fetchData().catch(e => {
			console.error('An error occurred while fetching the data: ', e)
		})
	}, [])

	const changingImageHandler = async (url: string) => {
		const response = await fetch('../../../api/changeUserImage', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ userId, imageUrl: url }),
		})
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		update({
			image: url,
		})

		setTimeout(() => {
			location.reload()
		}, 750)
	}

	const modalHandler = () => {
		setOpen(prevState => !prevState)
	}

	return (
		<>
			{sessionData ? (
				<div className="wrapper">
					<div className={styles.upside}>
						<Link href="/profile" className={styles.settings}>
							<FontAwesomeIcon className={styles.icon} icon={faArrowLeft} />
						</Link>
						<p className={`text-white ${styles.edit}`}>Edit Profile</p>
					</div>

					<div className={styles.information}>
						<div className={styles.picture}>
							<img
								className={`${styles.img} h-10 w-10  rounded-full`}
								src={sessionData.message.image}
								alt="profile picture"
							/>
							<p className={`${styles.username} text-white`}>{sessionData.message.username}</p>
							<a
								onClick={() => {
									setOpen(prevState => !prevState)
								}}
								className={`${styles.change} text-white`}>
								change your profile picture
							</a>
						</div>
						<Modal onModalClose={modalHandler} isOpen={open} imageHandler={changingImageHandler} />
					</div>
				</div>
			) : (
				<p>Loading</p>
			)}
		</>
	)
}

export default editProfilePage
