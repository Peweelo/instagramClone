'use client'

import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle, faHeart } from '@fortawesome/free-solid-svg-icons'
import styles from './PostModal.module.css'
import Link from 'next/link'

type ModalProps = {
	onModalClose: () => void
	isOpen: boolean
	image: string
	username: string
	userImage: string
	likes: number
	postId: string
	description: string
	userId: string
	comments: [] | undefined
}
type CommentType = {
	id: string
	text: string
	createdAt: Date
	author: string
	authorId: string
	postId: string
}
function PostModal({
	onModalClose,
	isOpen,
	image,
	username,
	userImage,
	likes,
	postId,
	description,
	userId,
	comments,
}: ModalProps) {
	let refDiv = useRef(null)
	const [commentInputValue, setCommentInputValue] = useState<string>('')
	const [disable, setDisable] = useState(false)

	const commentInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCommentInputValue(e.target.value)
	}

	const likePostHandler = async () => {
		const response = await fetch('../api/likePost', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ postId: postId }),
		})
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
		const result = await response.json()
		setDisable(false)
	}
	const commentPostHandler = async () => {
		setCommentInputValue('')
		const response = await fetch('../api/createComment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ postId: postId, comment: commentInputValue, author: username, authorId: userId }),
		})
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
		const result = await response.json()
		setDisable(false)
	}
	const cancelButtonRef = useRef(null)

	return (
		<>
			<Transition.Root show={true} as={Fragment}>
				<Dialog
					as="div"
					className="relative"
					initialFocus={cancelButtonRef}
					onClose={() => {
						onModalClose()
					}}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<div className={`${styles.modalbackground} fixed inset-0  bg-opacity-75 transition-opacity`} />
					</Transition.Child>
					<div className="fixed inset-0 z-10 w-screen overflow-y-auto h-full">
						<div className={`flex h-full justify-center p-4 text-center ${styles.div}`}>
							<div className="w-full h-full flex  justify-center items-center">
								<Transition.Child
									as={Fragment}
									enter="ease-out duration-300"
									enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
									enterTo="opacity-100 translate-y-0 sm:scale-100"
									leave="ease-in duration-200"
									leaveFrom="opacity-100 translate-y-0 sm:scale-100"
									leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
									<Dialog.Panel
										className={`relative transform h-[95vh] overflow-hidden rounded-lg bg-black text-left shadow-xl transition-all sm:my-8  flex max-w-[1200px] ${styles.container}`}>
										<img className={`w-[50%] bg-center ${styles.img}`} src={image} />
										<div className={`w-[50%] flex flex-col ${styles.info}`}>
											<div className={`${styles.userInfo}`}>
												<div className="flex">
													<img className="h-10 w-10 d  rounded-full" src={userImage} />
													<div className="pl-2 w-full">
														<p className="text-white">{username}</p>
														<p className={styles.description}>{description}</p>
													</div>
												</div>
												<FontAwesomeIcon className="text-white" icon={faDotCircle} />
											</div>
											<div className={`${styles.comments}`}>
												{comments!.message.map((comment: CommentType) => {
													return (
														<div className={styles.comment}>
															<Link href={`/profile/${comment.author}`} className="text-white">
																{comment.author}
															</Link>
															<p className="text-white">{comment.text}</p>
														</div>
													)
												})}
											</div>
											<div className={styles.buttons}>
												<div className={styles.icons}>
													<button disabled={disable}>
														<FontAwesomeIcon
															className={`${styles.icon}`}
															icon={faHeart}
															onClick={() => {
																setDisable(true)
																likePostHandler()
															}}
														/>
													</button>
													{/* <FontAwesomeIcon className={`${styles.icon}`} icon={faHeart} />
												<FontAwesomeIcon className={`${styles.icon}`} icon={faHeart} /> */}
												</div>
												<p className={`${styles.likes}`}>{`number of likes: ${likes}`}</p>
											</div>
											<div className={`${styles.stats}`}>
												<input
													className={`${styles.commentInput} text-white`}
													type="text"
													value={commentInputValue}
													onChange={commentInputHandler}
													placeholder="add comment..."
												/>
												<button
													className={styles.send}
													onClick={() => {
														setDisable(true)
														commentPostHandler()
													}}>
													Send
												</button>
											</div>
											<button className="opacity-0 absolute bottom-0"></button>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	)
}

export default PostModal
