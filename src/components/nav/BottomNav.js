import React, { Fragment, useState } from 'react'
import { Link, withRouter } from "react-router-dom"
import './BottomNav.css'

export default ({ currPage, handlePageChange, avatar, userSkills }) => {
	const [showMenu, setMenuDisplay] = useState(false)

	const handleMenuDisplay = () => (showMenu ? setMenuDisplay(false) : setMenuDisplay(true))

	// TODO: fetch call to get all the user skills.
	// the user's newsfeed should be part of this list (maybe make the newsfeed a stretch.)

	const menu = () => {
		const menuItemsArr = userSkills.map((skill, i) => {
			console.log(skill)
			// return listItem
		})

		return (
			<ul className="page-menu list pl0 ml3 center mw5 ba b--light-silver br3 bottom-2 fixed z-1">
			  <li className="ph3 pv2 bb b--light-silver" onClick={handleMenuDisplay}>Mackeral Tabby</li>
			  <li className="ph3 pv2 bb b--light-silver">Burmese</li>
			  <li className="ph3 pv2 bb b--light-silver">Maine Coon</li>
			  <li className="ph3 pv2 bb b--light-silver">Orange Tabby</li>
			  <li className="ph3 pv2">American Bobtail</li>
			</ul>
		)
	}

	return (
		<Fragment>
			{showMenu ? menu() : null}
			<nav className='fixed bottom-0 w-100 bg-washed-yellow red bt b--red'>
				<h2 
					className='pv2 f6 dib ph3 fw3 fl' 
					onClick={() => handlePageChange('newsfeed')}
				> Home </h2>
				<h2 
					className='pv2 f6 dib pl2 fw6 fl br3 pv1 ph2 bg-white ba b--red dim'
					onClick={handleMenuDisplay}
				> {currPage} </h2>	
				<h2 className='pv2 f6 dib pl5 fw3 link'>
					<Link to="/post/new"> + </Link>
        </h2>
				<div className='pt3 mb1 dib ph3 fr' onClick={() => handlePageChange('my profile')}>
				  <img
			      src={avatar} alt="avatar"
			      className="br-100 h2 w2 dib" />
				</div>
			</nav>
		</Fragment>
	)
}