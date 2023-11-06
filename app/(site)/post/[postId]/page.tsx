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
	const [comment, setComments] = useState<[]>()
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

	useEffect(() => {
		const fetchComments = async () => {
			const response = await fetch('../../../api/fetchComments', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ postId: params.postId }),
			})
			const res = await response.json()
			setComments(res)
		}

		fetchComments()
	}, [])

	const modalHandler = () => {
		setOpen(prevState => !prevState)
	}
	console.log(data)
	if (!data) return <div className="text-white">Couldnt load the page</div>
	console.log(data.message.id)
	return (
		<PostModal
			onModalClose={modalHandler}
			comments={comment}
			isOpen={open}
			image={data.message.image}
			username={data.message.username}
			userImage={data.message.profilePicutre}
			likes={data.message.likes}
			postId={params.postId}
			description={data.message.description}
			userId={data.message.userId}
		/>
	)
}

export default DetailedPostPage
