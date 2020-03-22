import React, { Fragment, useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { Route } from "react-router-dom"
import { getAll } from "../modules/apiManager"
import TopNav from "./nav/TopNav"
import BottomNav from "./nav/BottomNav"
import Profile from "./profile/Profile"
import PostList from "./newsfeed/PostList"

export default props => {
	const { isAuthenticated } = useAuth()
	const [skillagerId, setId] = useState('')
	const [userInfo, setUserInfo] = useState({})
	const [avatar, setAvatar] = useState('http://tachyons.io/img/logo.jpg')
	// TODO: change default to 'newsfeed' when that function is done
	const [currPage, setPage] = useState('my profile') // or my profile/skill/post/profile/search
	const [currPosts, setPosts] = useState([])
	const [currUserSkills, setUserSkills] = useState([])

	const getCurrSkillager = () => {
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

	const getCurrUserSkills = () => {
		getAll("userskills")
			.then(userskills => setUserSkills(userskills))
	}

  const getNewsfeedPosts = () => {
  	console.log('get newsfeed')
  	// loop through all userskills + do a fetch for each of those skills,
  	// then order them by date
  }

  useEffect(getCurrSkillager, [])
  useEffect(getCurrUserSkills, [])
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

		// TODO: newsfeed posts
		if (newPage === 'newsfeed') console.log('newsfeed')
	}

	// const postsArr = posts.map(post => <PostCard>)

	return (
		<Fragment>
			<Route render={props => (<TopNav {...props} />)} />
			<PostList currPosts={currPosts} />
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