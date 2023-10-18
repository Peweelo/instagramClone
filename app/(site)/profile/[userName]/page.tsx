import UsersProfile from '@/app/components/UsersProfile'

const getUsersData = async (userName: string) => {
	const response = await import('../../../api/fetchUserData/route')

	return (await response.POST(userName)).json()
}

async function usersPage({ params }: any) {
	const data = await getUsersData(params.userName)

	return <UsersProfile userData={data.message} />
}

export default usersPage
