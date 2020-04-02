import React, { Fragment } from "react";
import "./Profile.css";

export default ({ avatar, userInfo }) => {
	const { username, first_name, last_name } = userInfo

	return (
		<header className="tc">
			<img src={avatar} alt="avatar" className="profile br-100 dib" />
			<div className="f6 fw5 pv1">{first_name} {last_name}</div>
			<div className="f7 fw4 o-60">@{username}</div>
		</header>
	);
};
