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
    <div className="delete-modal">
      <div className="delete-modal__wrapper">
        <div className="delete-modal__content">
          <p className="delete-modal__content--header"> Delete comment</p>
          <p className="delete-modal__content--para">
            {" "}
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone.
          </p>
        </div>
        <div className="delete-modal__btns">
          <button
            onClick={() => cancelDelete()}
            className="delete-modal__btns--no"
          >
            No, Cancel
          </button>
          <button
            onClick={() => deleteComment()}
            className="delete-modal__btns--cancel"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
