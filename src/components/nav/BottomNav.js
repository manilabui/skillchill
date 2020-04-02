import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as AddCircle } from "../../assets/mdi_add_circle.svg";
import { ReactComponent as HomeIcon } from "../../assets/mdi_home.svg";
import { ReactComponent as DropUp } from "../../assets/mdi_arrow_drop_up.svg";
import "./BottomNav.css";

export default ({ currPage, handlePageChange, avatar, userSkills }) => {
	const [showMenu, setMenuDisplay] = useState(false);

	const handleMenuDisplay = () =>
		showMenu ? setMenuDisplay(false) : setMenuDisplay(true);

	const menu = () => {
		const menuItems = userSkills.map(({ skill }) => {
			const { id, name, avatar } = skill

			return (
				<li key={id} 
					className="pa2 b--orange dib inline-flex w-100"
					onClick={() => handlePageChange("skill", skill)}
				>
					<img src={avatar} alt="avatar" className="br-100 h1 w1 dib" />
					<span className="pl2 f6 fw6 dib">{name}</span>
				</li>
			);
		});

		return (
			<ul className="page-menu f6 fw4 list pl0 ml3 center mw5 ba bg-white b--orange br3 bottom-2 w-40 fixed z-1">
				{menuItems}
			</ul>
		);
	};

	return (
		<Fragment>
			{showMenu ? menu() : null}
			<nav className="fixed bottom-0 w-100 bg-washed-yellow inline-flex items-center">
				<div className='w-80 inline-flex items-center'>
					<HomeIcon
						alt="home icon"
						className="dib ph3"
						onClick={() => handlePageChange("newsfeed")}
					/>
					<div
						className="f6 dib pl2 fw6 br3 pv1 ph2 bg-white ba b--orange inline-flex items-center"
						onClick={handleMenuDisplay}
					>
						<span className="ph1">{currPage}</span>
						<DropUp className="ph1" />
					</div>
				</div>
				<div className='inline-flex items-center'>
					<Link className="dib pt1 mt1" to="/post/new">
						<AddCircle />
					</Link>
					<div
						className="mb1 dib ph3 pt1 mt1"
						onClick={() => handlePageChange("my profile")}
					>
						<img src={avatar} alt="avatar" className="br-100 h2 w2" />
					</div>
				</div>
			</nav>
		</Fragment>
	);
};
