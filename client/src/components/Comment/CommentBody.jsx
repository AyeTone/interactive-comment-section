import React, { useState } from "react";

const CommentBody = ({ replyingTo, content, editing, setEditing }) => {
  const [currentText, setCurrentText] = useState(`@${replyingTo} ${content}`);
  const [edited, setEdited] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setEditing(false);
    setEdited(true);
  };

  return (
    <div className="comment-body">
      {replyingTo && !editing && !edited && (
        <span className="comment-body__replying-to"> @{replyingTo} </span>
      )}
      {!editing && !edited && content}
      {edited && !editing && currentText}
      {editing && (
        <form className="comment-body__edit" onSubmit={(e) => handleUpdate(e)}>
          <textarea
            type="text"
            className="comment-body__edit--input"
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
          />
          <button className="comment-body__edit--submit" type="submit">
            {" "}
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default CommentBody;
