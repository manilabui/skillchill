import React from "react";
import { Link } from "react-router-dom";

export default () => {
	return (
		<nav className="fixed tc w-100 bg-light-yellow pv2">
			<h1 className="dib f4 fl pl3 fw7" onClick=>Skillchill</h1>
			<Link to="/search/skills">
				<h1 className="dib f4 fw3">Search</h1>
			</Link>
		</nav>
	);
};
