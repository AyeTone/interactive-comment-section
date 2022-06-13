import React, { useContext } from "react";
import DataContext from "../Context/DataContent";

const DeleteModal = () => {
  const { setDisplayModal, displayModal, setComments } =
    useContext(DataContext);

  const deleteComment = () => {
    setComments((prev) =>
      prev
        .map((ele) => {
          return {
            ...ele,
            replies: ele.replies.filter((reply) => {
              const notReply = displayModal.id !== reply.id;
              return notReply;
            }),
          };
        })
        .filter((comment) => {
          const notComment = displayModal.id !== comment.id;
          return notComment;
        })
    );

    setDisplayModal({ isDisplayed: false, id: null });
  };

  const cancelDelete = () => {
    setTimeout(() => {
      setDisplayModal(false);
    }, 500);
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__text">
          <p className="header"> Delete comment</p>
          <p className="text">
            {" "}
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone.
          </p>
        </div>
        <div className="modal__btns">
          <button onClick={() => cancelDelete()} className="dont-cancel">
            No, Cancel
          </button>
          <button onClick={() => deleteComment()} className="cancel">
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
