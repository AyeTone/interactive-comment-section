import { createContext, useState } from "react";
import Data from "../data.json";
import { addComment } from "../components/functions/addComment";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [comments, setComments] = useState(Data.comments);
  const [currentUser, setCurrentUser] = useState(Data.currentUser);
  const [displayModal, setDisplayModal] = useState({
    isDisplayed: false,
    id: null,
  });

  const value = {
    comments,
    setComments,
    currentUser,
    setCurrentUser,
    displayModal,
    setDisplayModal,
    addComment,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContext;
