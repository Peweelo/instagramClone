'use client'

import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import styles from './CreatePostModal.module.css'
import { UploadButton } from './UploadThingComponent'
import { Toaster, toast } from 'sonner'
type PropsTypes = {
	onModalClose: () => void
	isOpen: boolean
}

const CreatePostModal = ({ onModalClose, isOpen }: PropsTypes) => {
	const cancelButtonRef = useRef(null)
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [imageUrl, setImageUrl] = useState<string>('')
	const [titleErrorMessage, setTitleErrorMessage] = useState('')
	const [titleInputValue, setTitleInputValue] = useState('')
	const titleInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitleInputValue(event.target.value)

		if (event.target.value === '') {
			setTitleErrorMessage('Your title is empty!')
		} else {
			setTitleErrorMessage('')
		}
	}

	const postDetailsHandler = (url: string) => {
		setImageUrl(url)
		setIsModalOpen(true)
	}

	const createPostHandler = async (url: string, title: string) => {
		const response = await fetch('../api/createPost', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ url, title }),
		})

		if (!response.ok) {
			toast.error('something went wrong! Please try again')
			console.log(await response.json())
		}

		toast.success('Successfully posted!')
		console.log(await response.json())
	}

	return (
		<>
			<Transition.Root show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
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

					<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
						<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
								<Dialog.Panel
									className={`relative w-screen transform overflow-hidden rounded-lg bg-black text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg flex flex-col-reverse justify-between ${
										isModalOpen ? 'h-[90vh]' : ''
									}`}>
									<div className={`${styles.container}  px-4 pb-4 pt-5 sm:p-6 sm:pb-4`}>
										<div className={`sm:flex sm:items-start ${isModalOpen ? 'hidden sm:hidden' : ''}`}>
											<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
												<Dialog.Title as="h3" className="text-base font-semibold leading-6 text-white">
													Create your post
												</Dialog.Title>
												<div className="mt-2">
													<p className="text-sm text-gray-500">put image url below</p>
												</div>
												<UploadButton
													endpoint="postImageUploader"
													onClientUploadComplete={(res: any) => {
														postDetailsHandler(res![0].url)
													}}
													onUploadError={(error: Error) => {
														// Do something with the error.
														alert(`ERROR! ${error.message}`)
													}}
												/>
											</div>
										</div>
										<div className={`${styles.inputs} sm:flex sm:flex-row-reverse `}>
											<button
												onClick={() => {
													onModalClose()
													createPostHandler(imageUrl, titleInputValue)
													setTitleErrorMessage('')
													setTitleInputValue('')
													setIsModalOpen(false)
													setImageUrl('')
												}}
												disabled={imageUrl === '' || titleInputValue === '' ? true : false}
												className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
												Create Post
											</button>

											<button
												type="button"
												className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
												onClick={() => {
													onModalClose()
													setTitleErrorMessage('')
													setTitleInputValue('')
													setIsModalOpen(false)
													setImageUrl('')
												}}
												ref={cancelButtonRef}>
												Cancel
											</button>
										</div>
									</div>
									<div className={`h-full bg-black ${isModalOpen ? '' : 'hidden'}`}>
										<img src={imageUrl} className="w-full" />
										<div className="p-3">
											<label htmlFor="title" className="block text-base font-medium leading-6 text-white">
												title
											</label>
											<div className="mt-2">
												<input
													onChange={titleInputHandler}
													value={titleInputValue}
													id="title"
													name="title"
													autoComplete="title"
													required
													className={`block w-full rounded-md border-0 py-1.5 text-white px-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-black ${
														titleErrorMessage !== '' ? 'ring-red-500' : 'border-0'
													} `}
												/>
												{titleErrorMessage !== '' ? (
													<p className="pt-1.5 text-red-500 text-base ">{titleErrorMessage}</p>
												) : (
													<></>
												)}
											</div>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
			<Toaster richColors />
		</>
	)
}

export default CreatePostModal
