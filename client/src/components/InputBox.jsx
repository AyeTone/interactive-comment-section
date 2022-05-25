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
      className="form"
    >
      <div className="form__main">
        <img
          className="avatar desktop"
          src={currentUser.image.png}
          alt="Current User"
        />
        <textarea
          type="text"
          className="input"
          value={userInput}
          placeholder="Add a comment..."
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        />
      </div>
      <div className="form__footer">
        <img
          className="avatar mobile"
          src={currentUser.image.png}
          alt="Current User"
        />
        <button className="submit" type="submit">
          SEND
        </button>
      </div>
    </form>
  );
};

export default InputBox;
