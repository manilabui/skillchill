import React from 'react'
import Post from './Post'

export default ({ currPosts, currPage, handlePageChange }) => {
	const postArr = currPosts.map(post => {
		return <Post key={post.id} currPage={currPage} handlePageChange={handlePageChange} {...post} />
	})

	return (
		<section className='w-100 pv5'>
			{postArr}
		</section>
	)
}