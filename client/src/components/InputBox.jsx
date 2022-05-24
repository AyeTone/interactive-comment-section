import React, { useState, useContext } from "react";
import DataContext from "../Context/DataContent";

const InputBox = ({ displayReply, setDisplayReply, id, replyingTo }) => {
  const { currentUser, addComment } = useContext(DataContext);
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let isReply = displayReply;
    if (!displayReply) {
      addComment(userInput, currentUser);
    } else if (displayReply) {
      addComment(userInput, currentUser, isReply, id, replyingTo);
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
      <textarea
        className="form__input"
        value={userInput}
        placeholder="Add a comment..."
        type="text"
        onChange={(e) => {
          setUserInput(e.target.value);
        }}
      />
      <div className="form__footer">
        <img
          className="avatar"
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
