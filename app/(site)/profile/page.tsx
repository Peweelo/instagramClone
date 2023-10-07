import styles from './page.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faUserGroup } from '@fortawesome/free-solid-svg-icons'

async function fetchUserData() {
	const response = await import('../../api/fetchUserData/route')

	return (await response.GET()).json()
}

async function ProfilePage() {
	const userData = await fetchUserData()
	const { email, username, name, lastname, image, followers, following } = userData.message

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

export default ProfilePage
