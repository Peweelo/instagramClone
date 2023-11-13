import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { redirect } from 'next/navigation'
async function fetchUserData() {
	const response = await import('../../api/fetchUserData/route')

	return (await response.GET()).json()
}

async function ProfilePage() {
	const userData = await fetchUserData()

	if ((await userData.message) === undefined) {
		return redirect('/login')
	}
	const { username, image, followers, following } = userData.message

	const postsArr = userData.posts.sort((a: any, b: any) => {
		const timeA = a.createdAt instanceof Date ? a.createdAt.getTime() : 0
		const timeB = b.createdAt instanceof Date ? b.createdAt.getTime() : 0

		return timeA - timeB
	})
	return (
		<div className={`h-full wrapper`}>
			<div className="flex items-center justify-between h-[50px] borderbottom">
				<Link href="/settings" className='text-white py-[.5em] px-[1em]'>
					<FontAwesomeIcon  icon={faGear} />
				</Link>
				<p className="text-white">{username}</p>
				<Link href="/settings" className='text-white py-[.5em] px-[1em]'>
					<FontAwesomeIcon icon={faUserGroup} />
				</Link>
			</div>
			<div className='w-[80%] grid grid-rows-[50%,50%] grid-cols-[40%,40%] mt-[1.5em] mx-[auto]'>
				<img className='h-20 w-20  rounded-full' src={image} />
				<p className='text-white pt-[.7em]'>{username}</p>
				<Link href="/profile/edit" className='text-white row-start-2 col-start-2'>
					Edit Profile
				</Link>
			</div>
			<div className='borderbottom h-[40px]'></div>
			<div className='borderbottom pb-[.7em] flex w-full items-center justify-evenly mt-[.7em]'>
				<div>
					<p className='text-gray-500 pb-[.5em]'>Posts:</p>
					<p className='text-white text-center'>{userData.posts.length}</p>
				</div>
				<div>
					<p className='text-gray-500 pb-[.5em]'>Following:</p>
					<p className='text-white text-center'>{following}</p>
				</div>
				<div>
					<p className='text-gray-500 pb-[.5em]'>Followers:</p>
					<p className='text-white text-center'>{followers}</p>
				</div>
			</div>
			<Link className="text-white" href="/api/auth/signout">
				Sign Out
			</Link>

			<div className="flex flex-wrap gap-1 justify-start">
				{userData.posts.length == 0 ? (
					<p className="text-white">You have no posts yet.</p>
				) : (
					[...postsArr].reverse().map((post: any) => {
						return (
							<div className="text-white w-[32%] h-[150px] md:h-[200px] bg-white" key={post.id}>
								<Link href={`/post/${post.id}`}>
									<img src={post.image} className="h-[100%] w-full" />
								</Link>
							</div>
						)
					})
				)}
			</div>
		</div>
	)
}

export default ProfilePage
