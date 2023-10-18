import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { UploadButton } from './UploadThingComponent'

import styles from './Modal.module.css'
type ModalProps = {
	onModalClose: () => void
	imageHandler: (url: string) => void
	isOpen: boolean
}

export default function Modal({ onModalClose, imageHandler, isOpen }: ModalProps) {
	const cancelButtonRef = useRef(null)
	const [error, setError] = useState<boolean>(false)

	return (
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
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
								<div className={`${styles.container} bg-black px-4 pb-4 pt-5 sm:p-6 sm:pb-4`}>
									<div>
										<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
											<Dialog.Title as="h3" className="text-base font-semibold leading-6 text-white">
												Change your profile picture
											</Dialog.Title>
											<div className="mt-2">
												<p className="text-sm text-gray-500">
													Change your profile picture by putting image url data below
												</p>
											</div>
											<div>
												<div className="mt-2"></div>
											</div>
										</div>
									</div>
								</div>
								<div className={`${styles.inputs} bg-black px-4 py-3  sm:px-6`}>
									<UploadButton
										endpoint="imageUploader"
										onClientUploadComplete={res => {
											console.log(res![0].url)
											imageHandler(res![0].url)
										}}
										onUploadError={(error: Error) => {
											// Do something with the error.
											alert(`ERROR! ${error.message}`)
										}}
									/>
									{error === true ? <p className="text-white text-center pt-2.5">image doesn't exist</p> : <></>}
									<button
										type="button"
										className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
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
	)
}
