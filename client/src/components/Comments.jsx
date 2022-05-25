import React, { useContext } from "react";
import DataContext from "../Context/DataContent";
import Comment from "./Comment/Comment";

const Comments = () => {
  const { comments } = useContext(DataContext);

  const displayComments = comments.map((comment, id) => {
    return (
      <div key={id}>
        <Comment comment={comment} />
        <div className="replies">
          <div className="replies__offset">
            <div className="line"></div>
          </div>
          <div className="replies__replies">
            {comment.replies.map((reply, id) => {
              return <Comment key={id} reply={reply} />;
            })}
          </div>
        </div>
      </div>
    );
  });

  return <div className="comments">{displayComments}</div>;
};

export default Comments;
