import React, { Fragment, useState, useEffect, useRef } from "react";
import { getAll, postItem } from "../../modules/apiManager";
import "./CommentList.css";

export default ({ post_id }) => {
	const [currComments, setComments] = useState([]);
	const commentInput = useRef();

	const getComments = () => {
		getAll(`comments?post=${post_id}`).then(comments => {setComments(comments)});
	};

	useEffect(getComments, []);

	const commentArr = currComments.map((comment, i) => {
		const { content, skillager } = comment;

		return (
			<div key={i}>
				<p>
					<span className="fw6 pr2">{skillager.user.username}</span>
					{content}
				</p>
			</div>
		);
	});

	const handleCommentPost = () => {
		const commentObj = {
			content: commentInput.current.value,
			post_id
		};

		postItem("comments", commentObj)
			.then(getComments())
			.then(commentInput.current.value === null);
	};

	return (
		<Fragment>
			<hr />
			<section className="comment-list w-100 ph2 f7">
				<div className="list">{commentArr}</div>
				<div className="comment-input bottom-2 fixed">
					<input
						required
						autoFocus
						className="input-reset pa1 ba b--light-silver bg-white hover-bg-black hover-white dib w-90"
						type="text"
						ref={commentInput}
						id="comment"
						placeholder="Add a comment"
					/>
					<span
						className="f6 fw5 mt3 dib pl2 orange pr1"
						onClick={handleCommentPost}
					>
						Post
					</span>
				</div>
			</section>
		</Fragment>
	);
};
