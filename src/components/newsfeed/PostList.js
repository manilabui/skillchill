import React from 'react'
import { Route } from "react-router-dom"
import TopNav from "../nav/TopNav"
import BottomNav from "../nav/BottomNav"
import PostCard from './PostCard'


export default () => {

	// fetch all the posts related to the current page

	return (
		<section>
				<PostCard />
		</section>
	)
}