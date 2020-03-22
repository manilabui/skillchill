import React, { useState, useEffect } from 'react'
import { getAll } from '../../modules/apiManager'
import PostPage from './PostPage'

export default ({ id, skillager, skill }) => {
	const { name, avatar, created_at } = skill
	const skill_id = skill.id
	const [currPostPages, setPages] = useState([])

	//fetch all post pages related to current post
	const getCurrPostPages = () => {
		getAll(`postpages?post=${id}`)
			.then(pages => setPages(pages))
	}

	useEffect(getCurrPostPages, [])

	// const postPageArr = currPostPages.map(page => {
	// 	return (
	// 		<PostPage key={page.id} skillager={skillager} {...page} />
	// 	)
	// })

	return (
		<article>
				<div className='mb1 dib pa2 pt3 inline-flex items-center'>
				  <img
				      src={avatar} alt="avatar"
				      className="br-100 h2 w2 dib" />
				 	<span className='pl2 f6 fw6 dib'>{name}</span>
				</div>
				<video autoPlay className='w-100'>
				  <source src={props.content} type="video/mp4" />
				</video>
				<h4 className='ph2 f6 fw3'>{props.caption}</h4>
		</article>
	)
}