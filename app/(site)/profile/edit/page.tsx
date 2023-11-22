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
	const [usernameInputValue, setusernameInputValue] = useState('')
	const [EmailInputValue, setEmailInputValue] = useState('')
	const [loginErrorMessage, setLoginErrorMessage] = useState('')
	const [emailErrorMessage, setEmailErrorMessage] = useState('')
	const [buttonValue, setButtonValue] = useState<boolean>(true)
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

	const newLoginHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setusernameInputValue(event.target.value)

		if (event.target.value.length <= 3) {
			setButtonValue(true)
			setLoginErrorMessage('Your username is too short! Atleast 4 characters')
		} else if (event.target.value.length > 20) {
			setButtonValue(true)
			setLoginErrorMessage('Your username is too long! Maximum of 20 characters')
		} else {
			setButtonValue(false)
			setLoginErrorMessage('')
		}
	}

	const newEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmailInputValue(event.target.value)
		setButtonValue(false)
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

		if (re.test(event.target.value) === false) {
			setButtonValue(false)
			setEmailErrorMessage('your new email in incorrect!')
		} else {
			setEmailErrorMessage('')
		}
	}

	const saveChangesHandler = () => {
		const newUsername = usernameInputValue
		const newEmail = EmailInputValue

		if (newUsername !== sessionData.message.username || newEmail !== sessionData.message.email) {
			const changeUserData = async () => {
				const response = await fetch('../../../api/changeUsersData', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ newUsername, newEmail, id: sessionData.message.id }),
				})
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}
				await update({
					username: newUsername,
					email: newEmail,
				})

				toast.success('successfuly changed users data!')
			}

			changeUserData().catch(e => {
				console.error('An error occurred while fetching the data: ', e)
			})
		}
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

					<div className="w-[85%] mt-[2em] md:mt-0 mx-auto flex gap-4 flex-col">
						<h1 className="text-white mb-1 text-lg">Edit Profile</h1>
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
							<p className="text-white text-base mb-2">username</p>
							<input
								value={usernameInputValue}
								id="username"
								name="username"
								type="username"
								autoComplete="username"
								required
								onChange={newLoginHandler}
								className={`block w-full rounded-md border-0 py-1.5 text-white px-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-black ${
									loginErrorMessage !== '' ? 'ring-red-500' : 'border-0'
								}`}
								placeholder={sessionData.message.username}
							/>
							{loginErrorMessage !== '' ? <p className="pt-1.5 text-red-500 text-sm ">{loginErrorMessage}</p> : <></>}
						</div>
						<div>
							<p className="text-white text-base mb-2">email</p>
							<input
								value={EmailInputValue}
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								onChange={newEmailHandler}
								className={`block w-full rounded-md border-0 py-1.5 text-white px-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-black ${
									emailErrorMessage !== '' ? 'ring-red-500' : 'border-0'
								} `}
								placeholder={sessionData.message.email}
							/>
							{emailErrorMessage !== '' ? <p className="pt-1.5 text-red-500 text-sm ">{emailErrorMessage}</p> : <></>}
						</div>
						{/* <div>
							<p className="changecolor">change your password</p>
						</div> */}
						<button
							onClick={saveChangesHandler}
							disabled={buttonValue}
							className="bg-[#0095f6] text-white max-w-[150px] px-4 py-2 rounded-lg mt-4 disabled:bg-[#013c63] disabled:text-gray-500">
							Save Changes
						</button>
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
