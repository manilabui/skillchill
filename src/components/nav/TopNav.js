import React from "react";
import { ReactComponent as SearchIcon } from "../../assets/icon_search.svg";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./TopNav.css";

export default props => {
	const { logout } = useAuth()

	const handleLogoClick = () => {
		logout()
		props.history.push({ pathname: "/" });
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
