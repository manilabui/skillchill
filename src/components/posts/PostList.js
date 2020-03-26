import React from "react";
import Post from "./Post";

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

	return <section className="w-100 pv5">{postArr}</section>;
};
