import React from "react";
import { Link } from "react-router-dom";
import "./TopNav.css";

export default () => {
	const handleLogoClick = () => {
		console.log("click");
		// TODO: display affordance to log out
	};

	return (
		<nav className="fixed tc w-100 bg-dark-green pv2">
			<h1 className="dib f4 fl pl3 fw5 white washed-yellow" onClick={handleLogoClick}>
				skillchill
			</h1>
			<Link className="dib fr" to="/search/skills">
				<button className='search f7 br-pill i pv2 mt2 mb1 mr3 washed-yellow'>
					search for skill
				</button>
			</Link>
		</nav>
	);
};
