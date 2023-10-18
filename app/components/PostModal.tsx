import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { UploadButton } from './UploadThingComponent'
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
}

function PostModal({ onModalClose, isOpen, image, username, userImage, likes }: ModalProps) {
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
				<div className="fixed inset-0 z-[-10] w-screen overflow-y-auto h-full">
					<div className="flex h-full justify-center p-4 text-center">
						<div className="w-full h-full flex  justify-center items-center">
							<Dialog.Panel className="relative transform h-[85vh] overflow-hidden rounded-lg bg-black text-left shadow-xl transition-all sm:my-8 w-[65%] flex">
								<img className="h-full w-[55%] " src={image} />
								<div className=" h-full w-[45%] flex flex-col">
									<div className={`${styles.userInfo}`}>
										<div className="flex">
											<img className="h-10 w-10 d  rounded-full" src={userImage} />
											<p className="text-white pl-2">{username}</p>
										</div>
										<FontAwesomeIcon className="text-white" icon={faDotCircle} />
									</div>
									<div className={`${styles.comments}`}></div>
									<div className={`${styles.stats}`}>
										<FontAwesomeIcon className={`${styles.icon}`} icon={faHeart} />
										<p className={`${styles.likes}`}>{`numbers of likes: ${likes}`}</p>
										<input type='text'/>
										<p className='text-white'>Send Comment</p>
									</div>
								</div>
							</Dialog.Panel>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default PostModal
