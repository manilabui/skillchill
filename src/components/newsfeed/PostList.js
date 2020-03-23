import React from 'react'
import Post from './Post'

export default ({ currPosts }) => {
	const postArr = currPosts.map(post => <Post key={post.id} {...post} />)

	return (
		<section className='w-100 pv5'>
			{postArr}
		</section>
	)
}