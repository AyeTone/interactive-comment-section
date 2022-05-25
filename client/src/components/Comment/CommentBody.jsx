import React, { useState } from "react";

const CommentBody = ({ replyingTo, content, edit, setEdit }) => {
  const [currentText, setCurrentText] = useState(`@${replyingTo} ${content}`);
  const [edited, setEdited] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setEdit(false);
    setEdited(true);
  };

  return (
    <>
      {replyingTo && !edit && !edited && (
        <span className="replyingTo"> @{replyingTo} </span>
      )}
      {!edit && !edited && content}
      {edited && !edit && currentText}
      {edit && (
        <form className="edit" onSubmit={(e) => handleUpdate(e)}>
          <textarea
            type="text"
            className="edit__input"
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
          />
          <button className="edit__submit" type="submit">
            {" "}
            Update
          </button>
        </form>
      )}
    </>
  );
};

export default CommentBody;
