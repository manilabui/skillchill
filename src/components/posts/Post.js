import React, { Fragment, useState, useEffect } from "react";
import Moment from "react-moment";
import moment from "moment/min/moment-with-locales";
import { ReactComponent as DeleteIcon } from "../../assets/icon_close.svg";
import { Swipeable } from "react-swipeable";
import { getAll, getItem, deleteItem } from "../../modules/apiManager";
import CommentList from "../comments/CommentList";
import "./Post.css";

moment.updateLocale("en", {
	relativeTime: {
		future: "in %s",
		past: "%s ago",
		s: "seconds",
		ss: "%ss",
		m: "a minute",
		mm: "%dm",
		h: "an hour",
		hh: "%dh",
		d: "a day",
		dd: "%dd",
		M: "a month",
		MM: "%dM",
		y: "a year",
		yy: "%dY"
	}
});

Moment.globalMoment = moment;

export default ({
	id,
	created_at,
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
	const [currComments, setComments] = useState([]);

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

	const getComments = () => {
		getAll(`comments?post=${id}`).then(comments => {
			setComments(comments);
		});
	};

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
		deleteItem("posts", id).then(() => getCurrPosts("skillager", skillager.id));
	};

	const handleCommentClick = () => {
		getItem("posts", id)
			.then(post => {
				handlePageChange("post", post);
			})
			.then(getComments());
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
			{currPage === "my profile" && (
				<div className="mb1 dib pa2 pt3 inline-flex items-center w-100">
					<div className="dib w-90 inline-flex items-center">
						<img src={avatar} alt="avatar" className="br-100 h1 w1 dib" />
						<span className="pl2 f6 fw6 dib">{name}</span>
					</div>
					<DeleteIcon
						className="pl6 f6 fw6 fr w-10"
						onClick={handleDeleteClick}
					/>
				</div>
			)}

			<div className="w-100">
				<Swipeable
					onSwipedLeft={handleLeftPostSwipe}
					onSwipedRight={handleRightPostSwipe}
				>
					{currPostElem}
				</Swipeable>
			</div>

			<div className="ph2 mb2 pt2 pb1 f7 fw3 dib o-80">
				<div className="inline-flex items-center">
					{currPage !== "my profile" && (
						<Fragment>
							<img src={userAvatar} alt="avatar" className="br-100 h1 w1 dib" />
							<span className="fw6 pl2"> {username} </span>
							<span className="bullet ph1">•</span>
						</Fragment>
					)}
					<span className="fw6"> {name} </span>
					<span className="bullet ph1">•</span>
					<Moment className="fw3 o-70" date={created_at} fromNow ago />
				</div>
				<div className="caption pt1 lh-copy">{currPageCaption}</div>
			</div>

			{currPage !== "post" && (
				<div className="comment-icon ph1 dib fr" onClick={handleCommentClick}>
					<button className="comment-count white">....</button>
				</div>
			)}
			{currPage === "post" && (
				<CommentList
					post_id={id}
					comments={currComments}
					getComments={getComments}
				/>
			)}
		</article>
	);
};
