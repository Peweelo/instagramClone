'use client'

import { faGear, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FollowButton from './FollowButton'
import Link from 'next/link'
import styles from './UsersProfile.module.css'
import { useSession } from 'next-auth/react'

type PropsType = {
	userData: any
}

const UsersProfile = ({ userData }: PropsType) => {
	const { data: session } = useSession()
	let isAlreadyFollowing: boolean = false

	const { username, image, following, followers, email, id } = userData.user!
	userData.followersId.forEach((element: any) => {
		if (element === session?.user.id) {
			isAlreadyFollowing = true
		}
	})

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
							<p className={styles.edit}>Stop Following</p>
						) : (
							<FollowButton classes={'edit'} usersId={session?.user.id!} followedId={id} />
						)}
					</>
				)}
			</div>
			<div className={styles.underline}></div>
			<div className={styles.stats}>
				<div>
					<p className={styles.name}>Posts:</p>
					<p className={styles.stat}>{userData.posts.length}</p>
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
			<div className="flex justify-between min-h-[20vh] flex-wrap gap-1">
				{userData.posts.length == 0 ? (
					<p>User has no post yet.</p>
				) : (
					userData.posts.map((post: any) => {
						return (
							<div className="text-white w-[32%] sm:h-[200px] lg:h-[200px] bg-white" key={post.id}>
								<Link href={`/post/${post.id}`}>
									<img src={post.image} className="h-[100%] w-full" />
								</Link>
							</div>
						)
					})
				)}
			</div>
		</div>
	)
}

export default UsersProfile
