export const addComment = (
  userInput,
  currentUser,
  isReply,
  id,
  replyingTo,
  setComments
) => {
  if (userInput) {
    const newComment = {
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
    };

    if (!isReply) {
      //Add New Comment
      setComments((prev) => {
        return [
          ...prev,
          {
            ...newComment,
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
                  ...newComment,
                  replyingTo,
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
                    ...newComment,
                    replyingTo,
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
