'use client'

import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle, faHeart } from '@fortawesome/free-solid-svg-icons'
import styles from './PostModal.module.css'

type ModalProps = {
	onModalClose: () => void
	isOpen: boolean
	image: string
	username: string
	userImage: string
	likes: number
	postId: string
	description: string
}

function PostModal({ onModalClose, isOpen, image, username, userImage, likes, postId, description }: ModalProps) {
	const [disable, setDisable] = useState(false)
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

	const cancelButtonRef = useRef(null)
	console.log(userImage)
	return (
		<Transition.Root show={true} as={Fragment}>
			<Dialog
				as="div"
				className={`relative ${styles.div}`}
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
					<div className="flex h-full justify-center p-4 text-center">
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
									className={`relative transform h-[95vh] overflow-hidden rounded-lg bg-black text-left shadow-xl transition-all sm:my-8  flex max-w-[1200px]`}>
									<img className="w-[50%] bg-center" src={image} />
									<div className="w-[50%] flex flex-col">
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
										<div className={`${styles.comments}`}></div>
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
											<input className={styles.commentInput} type="text" placeholder="add comment..." />
											<p className={styles.text}>Send</p>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default PostModal
