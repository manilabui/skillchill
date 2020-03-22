import React, { useState, useEffect } from 'react'
import { useSwipeable, Swipeable } from 'react-swipeable'
import { getAll } from '../../modules/apiManager'
import './Post.css'

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
					const { content, caption, page_num } = pages[0]
					setPages(pages)
					setPageNum(page_num)
					setContent(content)
					setCaption(caption)
				}
			})
	}

	useEffect(getCurrPostPages, [])

	const handleLeftPostSwipe = () => {
		const numOfPages = currPostPages.length

		if (numOfPages > 1 && currPageNum !== numOfPages) {
			const newPageNum = currPageNum + 1
			const { content, caption } = currPostPages[currPageNum]

			setPageNum(newPageNum)
			setContent(content)
			setCaption(caption)
		} 
	}

	const handleRightPostSwipe = () => {
		const numOfPages = currPostPages.length

		if (numOfPages > 1 && currPageNum > 1) {
			const newPageNum = currPageNum - 1
			const { content, caption } = currPostPages[newPageNum - 1]

			setPageNum(newPageNum)
			setContent(content)
			setCaption(caption)
		} 
	}

	const currPostElem = post_type === 'Photo' ? 
		<img avatar='Post'
			className='w-100'
			src={currPageContent}
		/> :
		<video autoPlay preload='true'
			className='w-100' 
			// onClick={handlePostPageChange} 
			src={currPageContent}
			type="video/mp4"
		/>

	return (
		<article>
				<div className='mb1 dib pa2 pt3 inline-flex items-center'>
				  <img
				      src={avatar} alt="avatar"
				      className="br-100 h1 w1 dib" />
				 	<span className='pl2 f6 fw6 dib'>{name}</span>
				</div>
				<div className='w-100'>
				<Swipeable 
					onSwipedLeft={handleLeftPostSwipe}
					onSwipedRight={handleRightPostSwipe}>
				  {currPostElem}
				</Swipeable>	
				</div>
				<h4 className='ph2 f7 fw3'>{currPageCaption}</h4>
		</article>
	)
}