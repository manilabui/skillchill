import React, { Fragment, useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { Route } from "react-router-dom"
import { getAll } from "../modules/apiManager"
import TopNav from "./nav/TopNav"
import BottomNav from "./nav/BottomNav"
import Profile from "./profile/Profile"
import PostList from "./posts/PostList"

export default props => {
	const { isAuthenticated } = useAuth()
	const [skillagerId, setId] = useState('')
	const [userInfo, setUserInfo] = useState({})
	const [avatar, setAvatar] = useState('http://tachyons.io/img/logo.jpg')
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

  const getCurrPosts = (filter, id) => {
  	getAll(`posts?${filter}=${id}`)
  		.then(posts => setPosts(posts))
  }

  const getNewsfeedPosts = skillsArr => {
  	let postsArr = []

  	// BUG: not pulling all posts from the skills the user is following 
  	// Should I be doing this in the backend?
		skillsArr.reduce( async (prevPromise, { skill }) => {
		  await prevPromise
		  return getAll(`posts?skill=${skill.id}`)
		}, Promise.resolve())
			.then(posts => setPosts(posts))
  }

	const getCurrUserSkills = () => {
		getAll("userskills")
			.then(skills => {
				setUserSkills(skills)
				getNewsfeedPosts(skills)
			})
	}

  useEffect(getCurrSkillager, [])
  useEffect(getCurrUserSkills, [])

	const handlePageChange = newPage => {
		setPage(newPage)

		if (newPage === 'my profile') getCurrPosts('skillager', skillagerId)
		if (newPage === 'newsfeed') getNewsfeedPosts(currUserSkills)
	}

	return (
		<Fragment>
			<div>
				<Route render={props => (<TopNav {...props} />)} />
			</div>
			<PostList currPosts={currPosts} />
			<div>
			<Route render={props => (
				<BottomNav {...props} 
					handlePageChange={handlePageChange}
					currPage={currPage} 
					avatar={avatar}
					userSkills={currUserSkills}
				/>)}
			/>
			</div>
		</Fragment>
	)
}