import React, { useState, useEffects } from "react";

export default ({ post_id }) => {
	const commentArr = currPosts.map(post => {
		return (
			<Post
				key={post.id}
				currPage={currPage}
				handlePageChange={handlePageChange}
				{...post}
			/>
		);
	});

	return <li className="w-100 pv5">{commentArr}</li>;
};
