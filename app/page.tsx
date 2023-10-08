import Link from 'next/link'


const HomePage = () => {
	return (
		<div className='wrapper'>
			{/* <button onClick={() => toast.success('Successfully added a post!')}>Give me a toast</button>
			<Toaster richColors /> */}
			<Link className='text-white' href='/profile/majusia'>profile</Link>
		</div>
	)
}

export default HomePage
