'use client'
import useSWR from 'swr'
import styles from './page.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup, faArrowLeft, faHeart } from '@fortawesome/free-solid-svg-icons'
import PostModal from '../../../components/PostModal'
import { useState, useEffect } from 'react'

const DetailedPostPage = ({ params }: any) => {
	const [open, setOpen] = useState<boolean>(false)
	const [data, setData] = useState<any>()
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('../../../api/fetchDetailedPost', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ postId: params.postId }),
			})
			const res = await response.json()
			setData(res)
		}

		fetchData()
	}, [])
	const modalHandler = () => {
		setOpen(prevState => !prevState)
	}
	console.log(data)
	if (!data) return <div className="text-white">Couldnt load the page</div>

	return (
		<>
			<div className={`h-[94vh] wrapper ${styles.container}`}>
				<div className={styles.upside}>
					<Link href="/" className={styles.settings}>
						<FontAwesomeIcon className={styles.icon} icon={faArrowLeft} />
					</Link>
					<p className="text-white">{data.message.username}</p>
					<Link href="/settings" className={styles.settings}>
						<FontAwesomeIcon className={styles.icon} icon={faUserGroup} />
					</Link>
				</div>
				<div className={styles.userinfo}>
					<img className={`h-12 w-11 pt-1 rounded-full ${styles.img}`} src={data.message.profilePicutre} />
					<Link href={`/profile/${data.message.username}`} className={`text-white ${styles.username}`}>
						{data.message.username}
					</Link>
					<p className={`text-white ${styles.title}`}>{data.message.title}</p>
				</div>
				<img src={data.message.image} className={`h-[50%] w-full ${styles.image}`} />
				<div className="stats h-[50%]">
					<div className={`${styles.stats} likes h-[50px] bg-black flex items-center`}>
						<FontAwesomeIcon className={` ${styles.heart} ${styles.icon}`} icon={faHeart} />
						<p className={` text-white ${styles.likes}`}>{data.message.likes}</p>
					</div>
					<div className="comments h-auto"></div>
				</div>
			</div>

			<PostModal
				onModalClose={modalHandler}
				isOpen={open}
				image={data.message.image}
				username={data.message.username}
				userImage={data.message.profilePicutre}
				likes={data.message.likes}
				postId={params.postId}
			/>
		</>
	)
}

export default DetailedPostPage