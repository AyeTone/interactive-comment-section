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
  const [edit, setEdit] = useState(false);
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

  return (
    <>
      <article className={reply ? "comment reply" : "comment"}>
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

            <div>
              {!isCurrentUser ? (
                <button
                  onClick={() => showReply()}
                  className="comment__reply--btn tablet"
                >
                  <img
                    className="comment__reply--img"
                    src={ReplyBtn}
                    alt="reply button"
                  />{" "}
                  Reply
                </button>
              ) : (
                <div className="comment__current-user-btn tablet">
                  <button
                    onClick={() => showPrompt(id)}
                    className="comment__current-user-btn--delete"
                  >
                    <Delete />
                    Delete
                  </button>
                  <button
                    onClick={() => setEdit(true)}
                    className="comment__current-user-btn--edit"
                  >
                    <Edit />
                    Edit
                  </button>
                </div>
              )}
            </div>
          </header>

          <p className="text">
            <CommentBody
              edit={edit}
              setEdit={setEdit}
              replyingTo={replyingTo}
              content={content}
            />
          </p>
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
          {!isCurrentUser ? (
            <button
              onClick={() => showReply()}
              className="comment__reply--btn mobile"
            >
              <img className="replyImg" src={ReplyBtn} alt="reply button" />{" "}
              Reply
            </button>
          ) : (
            <div className="comment__current-user-btn mobile">
              <button
                onClick={() => showPrompt(id)}
                className="comment__current-user-btn--delete"
              >
                <Delete />
                Delete
              </button>
              <button
                onClick={() => setEdit(true)}
                className="comment__current-user-btn--edit"
              >
                <Edit />
                Edit
              </button>
            </div>
          )}
        </div>
      </article>

      <div className={replyingTo ? "reply__input" : null}>
        {displayReply && (
          <InputBox
            id={id}
            replyingTo={user.username}
            displayReply={displayReply}
            setDisplayReply={setDisplayReply}
          />
        )}
      </div>
    </>
  );
};

export default Comment;
