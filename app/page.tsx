'use client'
import Link from 'next/link'
import { Toaster, toast } from 'sonner'

const HomePage = () => {
	return (
		<div>
			{/* <button onClick={() => toast.success('Successfully added a post!')}>Give me a toast</button>
			<Toaster richColors /> */}
			<Link className='text-white' href='/profile/majusia'>profile</Link>
		</div>
	)
}

export default HomePage
