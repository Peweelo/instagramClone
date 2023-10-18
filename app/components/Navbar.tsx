'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import styles from './Navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faMagnifyingGlass, faPlus, faCompass, faUser, faGear } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import CreatePostModal from './CreatePostModal'

const Navbar = () => {
	const { data: session, status } = useSession()
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const modalHandler = () => {
		setIsOpen(prevState => !prevState)
	}

	return (
		<>
			<nav className={styles.nav}>
				<div className={styles.container}>
					<div className={styles.navItems}>
						<div className={styles.navItem}>
							<Link href="/">
								<FontAwesomeIcon className={styles.icon} icon={faHouse} />
								<span className={styles.span}>Main Page</span>
							</Link>
						</div>
						<div className={styles.navItem}>
							<Link href="/search">
								<FontAwesomeIcon className={styles.icon} icon={faMagnifyingGlass} />
								<span className={styles.span}>Search</span>
							</Link>
						</div>
						<div className={styles.navItem}>
							<a onClick={modalHandler}>
								<FontAwesomeIcon className={styles.icon} icon={faPlus} />
								<span className={styles.span}>Create</span>
							</a>
						</div>
						<div className={styles.navItem}>
							<Link href="/explore">
								<FontAwesomeIcon className={styles.icon} icon={faCompass} />
								<span className={styles.span}>Explore</span>
							</Link>
						</div>
						<div className={styles.navItem}>
							<Link href="/profile">
								<img className="h-6 w-6 d  rounded-full" src={session?.user.image} alt="profile picture" />
								<span className={styles.span}>Profile</span>
							</Link>
						</div>
					</div>

					<Link href="/settings" className={styles.navSettings}>
						<FontAwesomeIcon className={styles.icon} icon={faGear} />
						<span className={styles.span}>Settings</span>
					</Link>
				</div>
			</nav>
			<CreatePostModal isOpen={isOpen} onModalClose={modalHandler} />
		</>
	)
}

export default Navbar
