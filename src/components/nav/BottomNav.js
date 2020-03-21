import React, { Fragment, useState } from 'react'
import './BottomNav.css'

export default ({ currPage, handlePageChange, avatar }) => {
	const [showMenu, setMenuDisplay] = useState(false)

	const handleMenuDisplay = () => (showMenu ? setMenuDisplay(false) : setMenuDisplay(true))

	// TODO: fetch call to get all the user skills.
	// the user's newsfeed should be part of this list (maybe make the newsfeed a stretch.)

	const menu = () => {
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
			<nav className='fixed bottom-0 w-100 bg-washed-blue'>
				<h2 className='pv2 f5 dib ph3 fw3 fl' onClick={() => handlePageChange('newsfeed')}> Home </h2>
				<h2 className='pv2 f5 dib pl2 fw3 fl'>
					<div
						className="bg-light-blue black br3 pv1 ph2" 
						onClick={handleMenuDisplay}
					> {currPage} </div>
				</h2>
				<h2 className='pv2 f5 dib pl5 fw3'> + </h2>
				<div className='pt3 mb1 dib ph3 fr' onClick={() => handlePageChange('my profile')}>
				  <img
				      src={avatar}
				      className="br-100 h2 w2 dib" alt="avatar" />
				</div>
			</nav>
		</Fragment>
	)
}