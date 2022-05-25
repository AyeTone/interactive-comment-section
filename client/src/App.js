import { useState } from "react";
import Comments from "./components/Comments";
import DeleteModal from "./components/DeleteModal";
import InputBox from "./components/InputBox";
import DataContext from "./Context/DataContent";
import Data from "./data.json";
import { addComment } from "./components/functions/addComment";

function App() {
  const [comments, setComments] = useState(Data.comments);
  const [currentUser, setCurrentUser] = useState(Data.currentUser);
  const [displayModal, setDisplayModal] = useState({
    isDisplayed: false,
    id: null,
  });

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
        <main className="content">
          <Comments />
          <InputBox />
        </main>
      </div>
    </DataContext.Provider>
  );
}

export default App;
