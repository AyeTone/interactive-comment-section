import { useState } from "react";
import Comments from "./components/Comments";
import DeleteModal from "./components/DeleteModal";
import InputBox from "./components/InputBox";
import DataContext from "./Context/DataContent";
import Data from "./data.json";

function App() {
  const [comments, setComments] = useState(Data.comments);
  const [currentUser, setCurrentUser] = useState(Data.currentUser);
  const [displayModal, setDisplayModal] = useState({
    isDisplayed: false,
    id: null,
  });

  const addComment = (userInput, currentUser, isReply, id, replyingTo) => {
    if (userInput) {
      if (!isReply) {
        //Add New Comment
        setComments((prev) => {
          return [
            ...prev,
            {
              id: new Date(),
              content: userInput,
              createdAt: "Just Now",
              score: 0,
              user: {
                image: {
                  png: currentUser.image.png,
                  webp: currentUser.image.webp,
                },
                username: currentUser.username,
              },
              replies: [],
            },
          ];
        });
      } else {
        //Add New Reply to Comment
        setComments((prev) =>
          prev.map((comment) => {
            const replies = comment.replies;

            if (comment.id === id) {
              return {
                ...comment,
                replies: [
                  ...replies,
                  {
                    id: new Date(),
                    content: userInput,
                    createdAt: "Just Now",
                    score: 0,
                    replyingTo,
                    user: {
                      image: {
                        png: currentUser.image.png,
                        webp: currentUser.image.webp,
                      },
                      username: currentUser.username,
                    },
                  },
                ],
              };
            } else {
              // Add New Reply to Replies of Parent Comment
              const correctReply = replies.map((reply) => {
                if (reply.id === id) {
                  return true;
                } else {
                  return false;
                }
              });

              if (correctReply.includes(true)) {
                return {
                  ...comment,
                  replies: [
                    ...replies,
                    {
                      id: new Date(),
                      content: userInput,
                      createdAt: "Just Now",
                      score: 0,
                      replyingTo,
                      user: {
                        image: {
                          png: currentUser.image.png,
                          webp: currentUser.image.webp,
                        },
                        username: currentUser.username,
                      },
                    },
                  ],
                };
              }
              return comment;
            }
          })
        );
      }
    }
  };

  return (
    <DataContext.Provider
      value={{
        comments,
        setComments,
        currentUser,
        setDisplayModal,
        displayModal,
        addComment,
      }}
    >
      <div className="App">
        {displayModal.isDisplayed && <DeleteModal />}
        <div className="content">
          <Comments />
          <InputBox />
        </div>
      </div>
    </DataContext.Provider>
  );
}

export default App;
