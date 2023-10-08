
import UsersProfile from '@/app/components/UsersProfile'

function usersPage({ params }: any) {
	return <UsersProfile userName={params.userName} />
}

export default usersPage
