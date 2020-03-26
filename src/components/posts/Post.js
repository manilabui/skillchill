import React, { useState, useEffect } from "react";
import { ReactComponent as CommentIcon } from "../../assets/mdi_mode_comment.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icon_close.svg";
import { Swipeable } from "react-swipeable";
import { getAll, getItem, deleteItem } from "../../modules/apiManager";
import CommentList from "../comments/CommentList";
import "./Post.css";

export default ({
	id,
	skillager,
	skill,
	post_type,
	currPage,
	handlePageChange,
	getCurrPosts,
	userInfo,
	userAvatar
}) => {
	const { name, avatar } = skill;
	const username = skillager.user.username;
	const [currPostPages, setPages] = useState([]);
	const [currPageNum, setPageNum] = useState(1);
	const [currPageContent, setContent] = useState("");
	const [currPageCaption, setCaption] = useState("");

	const getCurrPostPages = () => {
		getAll(`postpages?post=${id}`).then(pages => {
			if (pages.length) {
				const { content, caption } = pages[0];
				setPages(pages);
				setContent(content);
				setCaption(caption);
			}
		});
	};

	useEffect(getCurrPostPages, []);

	const handleLeftPostSwipe = () => {
		const numOfPages = currPostPages.length;

		if (numOfPages > 1 && currPageNum !== numOfPages) {
			const newPageNum = currPageNum + 1;
			const { content, caption } = currPostPages[currPageNum];

			setPageNum(newPageNum);
			setContent(content);
			setCaption(caption);
		}
	};

	const handleRightPostSwipe = () => {
		const numOfPages = currPostPages.length;

		if (numOfPages > 1 && currPageNum > 1) {
			const newPageNum = currPageNum - 1;
			const { content, caption } = currPostPages[newPageNum - 1];

			setPageNum(newPageNum);
			setContent(content);
			setCaption(caption);
		}
	};

	const handleDeleteClick = () => {
		deleteItem("posts", id)
			.then(() => getCurrPosts("skillager", skillager.id))
	};

	const handleCommentClick = () => {
		getItem("posts", id).then(post => handlePageChange("post", post));
	};

	const currPostElem =
		post_type === "Photo" ? (
			<img alt={name} avatar="Post" className="w-100" src={currPageContent} />
		) : (
			<video
				autoPlay
				preload="true"
				className="w-100"
				src={currPageContent}
				type="video/mp4"
			/>
		);

	return (
		<article>
			<div className="mb1 dib pa2 pt3 inline-flex items-center w-100">
				<div className="dib w-90 inline-flex items-center">
					<img src={avatar} alt="avatar" className="br-100 h1 w1 dib" />
					<span className="pl2 f6 fw6 dib">{name}</span>
				</div>
				{currPage === "my profile" ? (
					<DeleteIcon
						className="pl6 f6 fw6 fr w-10"
						onClick={handleDeleteClick}
					/>
				) : null}
			</div>
			<div className="w-100">
				<Swipeable
					onSwipedLeft={handleLeftPostSwipe}
					onSwipedRight={handleRightPostSwipe}
				>
					{currPostElem}
				</Swipeable>
			</div>
			<div className="ph2 pt2 pb1 f7 fw3 dib">
				{currPage !== "my profile" ? (
					<span className="fw6 pr2">{username}</span>
				) : null}
				{currPageCaption}
			</div>
			<CommentIcon className="pa1 dib fr z-1" onClick={handleCommentClick} />
			{currPage === "post" ? <CommentList post_id={id} /> : null}
		</article>
	);
};
