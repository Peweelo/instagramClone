'use client'

import styles from './page.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import Modal from '../../../components/Modal'
import { useSession } from 'next-auth/react'
import { toast, Toaster } from 'sonner'
const editProfilePage = () => {
	const [sessionData, setSessionData] = useState<any>(null)
	const [open, setOpen] = useState<boolean>(false)
	const { data: session, update } = useSession()

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
		await update({
			image: url,
		})

		setTimeout(() => {
			location.reload()
		}, 1000)
		toast.success('successfully changed users picture!')
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

					<div className="w-[85%] mt-[3.5em] mx-auto flex gap-4 flex-col">
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
						<div>
							<p className="changecolor">change your username</p>
							<p className="text-gray-500">current: {sessionData.message.username}</p>
						</div>
						<div>
							<p className="changecolor">change your email</p>
							<p className="text-gray-500">current: {sessionData.message.email}</p>
						</div>
						<div>
							<p className="changecolor">change your password</p>
						</div>
					</div>
				</div>
			) : (
				<p>Loading</p>
			)}
			<Toaster richColors />
		</>
	)
}

export default editProfilePage
