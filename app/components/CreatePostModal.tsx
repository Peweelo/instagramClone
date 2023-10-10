import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import styles from './CreatePostModal.module.css'
import Link from 'next/link'
type PropsTypes = {
	onModalClose: () => void
	isOpen: boolean
}

const CreatePostModal = ({ onModalClose, isOpen }: PropsTypes) => {
	const cancelButtonRef = useRef(null)

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
								<Dialog.Panel className="relative w-screen transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
									<div className={`${styles.container} bg-black px-4 pb-4 pt-5 sm:p-6 sm:pb-4`}>
										<div className="sm:flex sm:items-start">
											<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
												<Dialog.Title as="h3" className="text-base font-semibold leading-6 text-white">
													Create your post
												</Dialog.Title>
												<div className="mt-2">
													<p className="text-sm text-gray-500">put image url below</p>
												</div>
												<div>
													<div className="mt-2">
														<input
															id="login"
															name="login"
															type="text"
															className={`block w-full rounded-md border-0 py-1.5  px-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-blac`}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className={`${styles.inputs} bg-black px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6`}>
										<Link
											onClick={() => {
												onModalClose()
											}}
											className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
											href="create">
											Create Post
										</Link>

										<button
											type="button"
											className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
											onClick={() => {
												onModalClose()
											}}
											ref={cancelButtonRef}>
											Cancel
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	)
}

export default CreatePostModal
