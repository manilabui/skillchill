import React, { Fragment, useState } from 'react'
import './BottomNav.css'

export default ({ currPage }) => {
	const [showMenu, setMenuDisplay] = useState(false)

	const handleMenuDisplay = () => (showMenu ? setMenuDisplay(false) : setMenuDisplay(true))

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
			<nav className='tc fixed bottom-0 bg-light-pink w-100'>
				<h2 className='pv2 f5 dib pl3 fw3 fl'> Home </h2>
				<h2 className='pv2 f5 dib pl2 fw3 fl'>
					<div
						className="bg-light-blue black br2 pv1 ph2" 
						onClick={handleMenuDisplay}
					> {currPage} </div>
				</h2>
				<h2 className='pv2 f5 dib pl5 fw3'> + </h2>
				<div className='pt3 mb1 dib ph3 fr'>
				  <img
				      src="http://tachyons.io/img/logo.jpg"
				      className="br-100 h2 w2 dib" alt="avatar" />
				</div>
			</nav>
		</Fragment>
	)
}