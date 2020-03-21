import React, { Fragment, useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { Route } from "react-router-dom"
import { getAll } from "../modules/apiManager"
import TopNav from "./nav/TopNav"
import BottomNav from "./nav/BottomNav"
import Profile from "./profile/Profile"
import PostCard from "./newsfeed/PostCard"

export default props => {
	const { isAuthenticated } = useAuth()
	const [skillagerId, setId] = useState('')
	const [userInfo, setUserInfo] = useState({})
	const [avatar, setAvatar] = useState('http://tachyons.io/img/logo.jpg')
	const [currPage, setPage] = useState('newsfeed') // or my profile
	const [currPosts, setPosts] = useState([])

	const getSkillager = () => {
		if (isAuthenticated()) {
			getAll("skillagers")
		    .then(skillagers => {
		    	const skillager = skillagers[0]
		    	const { id, user, avatar } = skillager
		
		    	setId(id)
		    	setAvatar(avatar)
		    	setUserInfo(user)
		    })
		}
	}

	// const getNewsfeedPosts = () => {

	// }

  useEffect(getSkillager, [])
  // useEffect(getNewsfeedPosts, [])

  const getCurrSkillagerPosts = () => {
  	getAll(`posts?skillager=${skillagerId}`)
  		.then(posts => setPosts(posts))
  }
	// // fetch all the posts related to the current page
	// const getPosts = (query='') => {
 //      getAll(`posts${query}`)
 //      	.then(posts => {
 //          console.log(posts)
 //        })
 //  }

	const handlePageChange = newPage => {
		setPage(newPage)

		if (newPage === 'my profile') getCurrSkillagerPosts()
	}

	// const postsArr = posts.map(post => <PostCard>)

	return (
		<Fragment>
			<Route render={props => (<TopNav {...props} />)} />
			{currView}
			<Route render={props => (
				<BottomNav {...props} 
					handlePageChange={handlePageChange}
					currPage={currPage} 
					avatar={avatar}
				/>)}
			/>
		</Fragment>
	)
}