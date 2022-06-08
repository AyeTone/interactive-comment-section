import { useState } from "react";
import Comments from "./components/Comments";
import DeleteModal from "./components/DeleteModal";
import InputBox from "./components/InputBox";
import { useContext } from "react";
import DataContext from "./Context/DataContent";

function App() {
  const { displayModal } = useContext(DataContext);

  return (
    <div className="App">
      {displayModal.isDisplayed && <DeleteModal />}
      <main className="content">
        <Comments />
        <InputBox />
      </main>
    </div>
  );
}

export default App;
