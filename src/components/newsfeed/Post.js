import React, { useState, useEffect } from 'react'
import { useSwipeable, Swipeable } from 'react-swipeable'
import { getAll } from '../../modules/apiManager'

export default ({ id, skillager, skill, post_type }) => {
	const { name, avatar, created_at } = skill
	const skill_id = skill.id
	const [currPostPages, setPages] = useState([])
	const [currPageNum, setPageNum] = useState(0)
	const [currPageContent, setContent] = useState('')
	const [currPageCaption, setCaption] = useState('')

	const getCurrPostPages = () => {
		getAll(`postpages?post=${id}`)
			.then(pages => {
				if (pages.length) {
					const { content, caption } = pages[0]
					setPages(pages)
					setContent(content)
					setCaption(caption)
				}
			})
	}

	useEffect(getCurrPostPages, [])

	// const postPageArr = currPostPages.map(page => {
	// 	return (
	// 		<PostPage key={page.id} skillager={skillager} {...page} />
	// 	)
	// })

	const handlePostPageChange = () => {
		console.log(currPageContent)
	}

	const currPostElem = post_type === 'Video' ? 
		<video autoPlay 
			className='w-100' 
			onClick={handlePostPageChange} 
			src={currPageContent}
			type="video/mp4"
		/> :
		<img 
			src={currPageContent} alt="Post"
			className='w-100'
		/>

	return (
		<article>
				<div className='mb1 dib pa2 pt3 inline-flex items-center'>
				  <img
				      src={avatar} alt="avatar"
				      className="br-100 h1 w1 dib" />
				 	<span className='pl2 f6 fw6 dib'>{name}</span>
				</div>
				<div>
				<video autoPlay 
					className='w-100' 
					onClick={handlePostPageChange} 
					src={currPageContent}
					type="video/mp4"
				/>
				</div>
				<h4 className='ph2 f7 fw3'>{currPageCaption}</h4>
		</article>
	)
}