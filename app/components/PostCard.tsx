type UserCardProps = {
	title: string
	userId: string
	image: string
}

const PostCard = ({ title, userId, image }: UserCardProps) => {

	return (
		<div className="wrapper mb-12">
			<div className="flex items-center">
				<div>
					<div className="font-medium text-gray-700">{title}</div>
					<div className="text-gray-400">{userId}</div>
					<img src={image} className='h-[500px] w-[100vw]' />
				</div>
			</div>
		</div>
	)
}

export default PostCard
