'use client'

import styles from './page.module.css'
import { useState, useRef } from 'react'
function RegisterPage() {
	const [loginErrorMessage, setLoginErrorMessage] = useState('')
	const [loginInputValue, setLoginInputValue] = useState('')
	const [passwordInputValue, setPasswordInputValue] = useState('')
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

	const loginInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLoginInputValue(event.target.value)

		if (event.target.value.length <= 3) {
			setLoginErrorMessage('Your login is too short! Atleast 4 characters')
		} else if (event.target.value.length > 20) {
			setLoginErrorMessage('Your login is too long! Maximum of 20 characters')
		} else {
			setLoginErrorMessage('')
		}
	}
	const passwordInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPasswordInputValue(event.target.value)

		if (event.target.value.length <= 5) {
			setPasswordErrorMessage('Your password is too short! Atleast 6 characters')
		} else {
			setPasswordErrorMessage('')
		}
	}
	const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
	}

	return (
		<div className={`wrapper ${styles.container}`}>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Sign up to our page
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" onSubmit={submitHandler}>
						<div>
							<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 px-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<label htmlFor="login" className="block text-sm font-medium leading-6 text-gray-900">
								Login
							</label>
							<div className="mt-2">
								<input
									onChange={loginInputHandler}
									value={loginInputValue}
									id="login"
									name="login"
									type="login"
									autoComplete="login"
									required
									className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
								{loginErrorMessage !== '' ? <p className="pt-1.5 text-red-500 text-sm ">{loginErrorMessage}</p> : <></>}
							</div>
						</div>
						<div>
							<div className="flex items-center justify-between">
								<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
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
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 px-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
								Sign in
							</button>
						</div>
					</form>

					<p className="mt-5 text-center text-sm text-gray-500">
						Not a member?
						<a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 pl-2">
							Register now!
						</a>
					</p>
				</div>
			</div>
		</div>
	)
}

export default RegisterPage
function elseif() {
	throw new Error('Function not implemented.')
}

