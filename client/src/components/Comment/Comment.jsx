import React, { useContext, useState } from "react";
import ReplyBtn from "../../images/icon-reply.svg";
import { ReactComponent as Plus } from "../../images/icon-plus.svg";
import { ReactComponent as Minus } from "../../images/icon-minus.svg";
import { ReactComponent as Delete } from "../../images/icon-delete.svg";
import { ReactComponent as Edit } from "../../images/icon-edit.svg";
import DataContext from "../../Context/DataContent";
import InputBox from "../InputBox";
import CommentBody from "./CommentBody";

const Comment = ({ comment, reply }) => {
  const { currentUser, setDisplayModal } = useContext(DataContext);
  const { content, createdAt, score, user, replyingTo, id } = comment || reply;
  const [currentScore, setCurrentScore] = useState({
    current: score,
    hasAdded: false,
    hasSubtracted: false,
  });
  const [displayReply, setDisplayReply] = useState(false);
  const [editing, setEditing] = useState(false);
  const username = user.username;
  const isCurrentUser = currentUser.username === user.username;

  const addToScore = () => {
    const { current, hasAdded } = currentScore;

    if (current !== score && !hasAdded) {
      setCurrentScore({
        hasSubtracted: false,
        current: score,
        hasAdded: false,
      });
    } else if (!hasAdded) {
      setCurrentScore({
        hasSubtracted: false,
        current: score + 1,
        hasAdded: true,
      });
    }
  };

  const subtractScore = () => {
    const { current, hasSubtracted } = currentScore;

    if (current !== score && !hasSubtracted) {
      setCurrentScore({
        hasSubtracted: false,
        current: score,
        hasAdded: false,
      });
    } else if (!hasSubtracted) {
      setCurrentScore({
        hasSubtracted: true,
        current: score - 1,
        hasAdded: false,
      });
    }
  };

  const showPrompt = (commentId) => {
    setDisplayModal({ isDisplayed: true, id: commentId });
  };

  const showReply = () => {
    setDisplayReply(true);
  };

  const displayBtns = !isCurrentUser ? (
    <button onClick={() => showReply()} className="comment__reply--btn">
      <img className="comment__reply--img" src={ReplyBtn} alt="reply button" />{" "}
      Reply
    </button>
  ) : (
    <div className="comment__current-user-btn ">
      <button
        onClick={() => showPrompt(id)}
        className="comment__current-user-btn--delete"
      >
        <Delete />
        Delete
      </button>
      <button
        onClick={() => setEditing(true)}
        className="comment__current-user-btn--edit"
      >
        <Edit />
        Edit
      </button>
    </div>
  );

  return (
    <>
      <article className="comment">
        <div className="comment__content">
          <header className="comment__header">
            <div className="comment__header--row">
              <img
                className="comment__header--avatar"
                src={user.image.webp}
                alt={`${username} avatar`}
              />
              <h1 className="comment__header--user">{username}</h1>
              {isCurrentUser && (
                <p className="comment__header--current-user"> you</p>
              )}
              <p className="comment__header--time">{createdAt}</p>
            </div>

            <div className="tablet">{displayBtns}</div>
          </header>

          <CommentBody
            editing={editing}
            setEditing={setEditing}
            replyingTo={replyingTo}
            content={content}
          />
        </div>

        <div className="comment__buttons">
          <div className="comment__likes">
            <Plus
              onClick={() => addToScore()}
              className={
                currentScore.current > score
                  ? "comment__likes--plus-btn selected"
                  : "comment__likes--plus-btn"
              }
            />
            <p className="comment__likes--score">{currentScore.current}</p>
            <Minus
              onClick={() => subtractScore()}
              className={
                currentScore.current < score
                  ? "comment__likes--minus-btn selected"
                  : "comment__likes--minus-btn"
              }
            />
          </div>
          <div className="mobile">{displayBtns}</div>
        </div>
      </article>

      {displayReply && (
        <InputBox
          id={id}
          replyingTo={user.username}
          displayReply={displayReply}
          setDisplayReply={setDisplayReply}
        />
      )}
    </>
  );
};

export default Comment;
