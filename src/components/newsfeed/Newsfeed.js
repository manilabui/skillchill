import React, { Fragment } from 'react'
import { Route } from "react-router-dom"
import TopNav from "../nav/TopNav"
import BottomNav from "../nav/BottomNav"

export default () => {
	return (
		<Fragment>
			<Route render={props => (<TopNav {...props} />)} />
			Newsfeed
			<Route render={props => (<BottomNav {...props} />)} />
		</Fragment>
	)
}