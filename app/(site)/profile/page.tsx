import styles from './page.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { redirect } from 'next/navigation'
async function fetchUserData() {
	const response = await import('../../api/fetchUserData/route')

	return (await response.GET()).json()
}

async function ProfilePage() {
	const userData = await fetchUserData()

	if ((await userData.message) === undefined) {
		return redirect('/login')
	}
	const { username, name, lastname, image, followers, following, posts } = userData.message

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
				<Link href="/profile/edit" className={`text-white ${styles.edit}`}>
					Edit Profile
				</Link>
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
			<Link className="text-white" href="/api/auth/signout">
				Sign Out
			</Link>

			<div className="flex justify-between min-h-[20vh] flex-wrap gap-1">
				{userData.posts.length == 0 ? (
					<p className="text-white">You have no posts yet.</p>
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

export default ProfilePage
