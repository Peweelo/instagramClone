'use client'

import { faGear, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FollowButton from './FollowButton'
import Link from 'next/link'
import styles from './UsersProfile.module.css'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

type PropsType = {
	userName: string
}

const UsersProfile = ({ userName }: PropsType) => {
	const { data: session } = useSession()
	const [sessionData, setSessionData] = useState<any>({})
	const [isLoading, setLoading] = useState<boolean>(true)
	const [followersList, setFollowersList] = useState<any>([])
	let isAlreadyFollowing: boolean = false
	useEffect(() => {
		fetch('../api/fetchUserData', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userName),
		})
			.then(response => response.json())
			.then(data => {
				setSessionData(data.message.user)
				setFollowersList(data.message.followersId)
				setLoading(false)
			})
	}, [])

	const { username, image, following, followers, email } = sessionData!
	console.log(session);
	followersList.forEach((element: number) => {
		if (element === session?.user.id) {
			isAlreadyFollowing = true
		}
	})
	if (isLoading) return <p className="text-white wrapper ">Loading users data</p>

	return (
		<div className={`${styles.container} wrapper`}>
			<div className={styles.upside}>
				<Link href="/settings" className={styles.settings}>
					<FontAwesomeIcon className={styles.icon} icon={faGear} />
				</Link>
				<p className="text-white">{username}</p>
				<Link href="/settings" className={styles.settings}>
					<FontAwesomeIcon className={styles.icon} icon={faUserGroup} />
				</Link>
			</div>
			<div className={styles.profileinfo}>
				<img className={`h-20 w-20  rounded-full ${styles.img}`} src={image} />
				<p className={`text-white ${styles.username}`}>{username}</p>
				{session?.user.email === email ? (
					<Link href="/profile/edit" className={`text-white ${styles.edit}`}>
						Edit Profile
					</Link>
				) : (
					<>
						{isAlreadyFollowing ? (
							<p className={styles.edit}>u are already following that person</p>
						) : (
							<FollowButton classes={'edit'} usersEmail={session?.user.email} followedEmail={email} />
						)}
					</>
				)}
			</div>
			<div className={styles.underline}></div>
			<div className={styles.stats}>
				<div>
					<p className={styles.name}>Posts:</p>
					<p className={styles.stat}>0</p>
				</div>
				<div>
					<p className={styles.name}>Following:</p>
					<p className={styles.stat}>{following}</p>
				</div>
				<div>
					<p className={styles.name}>Followers:</p>
					<p className={styles.stat}>{followers}</p>
				</div>
			</div>
		</div>
	)
}

export default UsersProfile
