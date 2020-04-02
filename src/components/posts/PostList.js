import React, { Fragment } from "react";
import Post from "./Post";
import Profile from "../profile/Profile";

export default ({
	currPosts,
	currPage,
	handlePageChange,
	getCurrPosts,
	userInfo,
	avatar
}) => {
	const postArr = currPosts.map(post => {
		return (
			<Post
				key={post.id}
				currPage={currPage}
				handlePageChange={handlePageChange}
				getCurrPosts={getCurrPosts}
				userAvatar={avatar}
				userInfo={userInfo}
				{...post}
			/>
		);
	});

	const postSectionStyling =
		currPage === "my profile" ? "w-100 pb5" : "w-100 pv5";

	return (
		<Fragment>
			{currPage === "my profile" ? (
				<Profile avatar={avatar} userInfo={userInfo} />
			) : null}
			<section className={postSectionStyling}>{postArr}</section>
		</Fragment>
	);
};
