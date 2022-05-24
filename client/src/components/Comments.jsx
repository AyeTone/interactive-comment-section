import React, { useContext } from "react";
import DataContext from "../Context/DataContent";
import Comment from "./Comment/Comment";

const Comments = () => {
  const { comments } = useContext(DataContext);

  const displayComments = comments.map((comment, id) => {
    return (
      <div key={id}>
        <Comment comment={comment} />
        {comment.replies.map((reply, id) => {
          return <Comment key={id} reply={reply} />;
        })}
      </div>
    );
  });

  return <div className="comments">{displayComments}</div>;
};

export default Comments;
