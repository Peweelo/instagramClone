'use client'

import { Toaster, toast } from 'sonner'
import styles from './page.module.css'
import { useEffect, useRef, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function LoginPage() {
	const emailInputValue = useRef<HTMLInputElement>(null)
	const [passwordInputValue, setPasswordInputValue] = useState('')
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

	const passwordInputHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		setPasswordInputValue(event.target.value)

		if (event.target.value.length <= 5) {
			setPasswordErrorMessage('Your password is too short! Atleast 6 characters')
		} else {
			setPasswordErrorMessage('')
		}
	}
	const router = useRouter()
	const { data: session, status } = useSession()

	useEffect(() => {
		if (status === 'authenticated') {
			router.push('/')
		}
	}, [status])
	const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (emailInputValue.current !== null) {
			const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

			if (re.test(emailInputValue.current.value) === false) {
				toast.error('Please provide a correct email!')
				return
			}
			console.log(re.test(emailInputValue.current.value))

			const userData = {
				email: emailInputValue.current.value,
				password: passwordInputValue,
			}

			signIn('credentials', {
				...userData,
				redirect: false,
			}).then(callback => {
				if (callback?.error) {
					toast.error(callback.error)
				}

				if (!callback?.error && callback?.ok) {
					toast.success('succesfully logged into your account')
				}
			})
		}
	}
	return (
		<div className={`wrapper ${styles.container}`}>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
						Log in to our page
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" onSubmit={submitHandler}>
						<div>
							<label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
								Email address
							</label>
							<div className="mt-2">
								<input
									ref={emailInputValue}
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									className={`block w-full rounded-md border-0 py-1.5 text-white px-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-black `}
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
									Password
								</label>
								<div className="text-sm">
									<a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
										Forgot password?
									</a>
								</div>
							</div>
							<div className="mt-2">
								<input
									onChange={passwordInputHandler}
									value={passwordInputValue}
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className={`block w-full rounded-md border-0 py-1.5 text-white px-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-black ${
										passwordErrorMessage !== '' ? 'ring-red-500' : 'border-0'
									} `}
								/>
								{passwordErrorMessage !== '' ? (
									<p className="pt-1.5 text-red-500 text-sm">{passwordErrorMessage}</p>
								) : (
									<></>
								)}
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
								Log in
							</button>
						</div>
					</form>

					<p className="mt-5 text-center text-sm text-gray-500">
						Not a member?
						<Link href="/signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 pl-2">
							Register now!
						</Link>
					</p>
				</div>
			</div>
			<Toaster richColors />
		</div>
	)
}

export default LoginPage
