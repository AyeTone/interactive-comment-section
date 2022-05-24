import React, { useContext, useState } from "react";
import ReplyBtn from "../../images/icon-reply.svg";
import { ReactComponent as Plus } from "../../images/icon-plus.svg";
import { ReactComponent as Minus } from "../../images/icon-minus.svg";
import Delete from "../../images/icon-delete.svg";
import Edit from "../../images/icon-edit.svg";
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
        <div className="comment__header">
          <img className="avatar" src={user.image.webp} alt="user avatar" />
          <p className="user">{user.username}</p>
          <p className="time">{createdAt}</p>
        </div>
        <p className="comment__content">
          <CommentBody
            edit={edit}
            setEdit={setEdit}
            replyingTo={replyingTo}
            content={content}
          />
        </p>
        <div className="comment__footer">
          <div className="comment__likes">
            <button onClick={addToScore} className="plusBtn">
              <Plus />
            </button>
            <p className="score">{currentScore.current}</p>
            <button onClick={subtractScore} className="minusBtn">
              <Minus />
            </button>
          </div>
          {!isCurrentUser ? (
            <button onClick={() => showReply()} className="comment__reply">
              <img className="replyImg" src={ReplyBtn} alt="reply button" />{" "}
              Reply
            </button>
          ) : (
            <div className="comment__userBtns">
              <button
                onClick={() => showPrompt(id)}
                className="comment__delete"
              >
                <img src={Delete} alt="delete" />
                Delete
              </button>
              <button onClick={() => setEdit(true)} className="comment__edit">
                <img src={Edit} alt="delete" />
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
