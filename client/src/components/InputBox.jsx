import React, { useState, useContext } from "react";
import DataContext from "../Context/DataContent";

const InputBox = ({ displayReply, setDisplayReply, id, replyingTo }) => {
  const { currentUser, addComment, setComments } = useContext(DataContext);
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let isReply = displayReply;
    if (!displayReply) {
      addComment(userInput, currentUser, isReply, id, replyingTo, setComments);
    } else if (displayReply) {
      addComment(userInput, currentUser, isReply, id, replyingTo, setComments);
      setDisplayReply(false);
    }
    setUserInput("");
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="input-box"
    >
      <div className="input-box__body">
        <img
          className="input-box__avatar tablet"
          src={currentUser.image.png}
          alt="Current User"
        />
        <textarea
          className="input-box__body--input"
          value={userInput}
          placeholder="Add a comment..."
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        />
      </div>
      <div className="input-box__footer">
        <img
          className="input-box__avatar mobile"
          src={currentUser.image.png}
          alt="Current User"
        />
        <button className="input-box__submit-btn" type="submit">
          SEND
        </button>
      </div>
    </form>
  );
};

export default InputBox;
