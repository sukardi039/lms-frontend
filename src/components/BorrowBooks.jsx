import React, { useContext, useEffect } from "react";
import Books from "./Books";
import { AuthContext } from "../context/AuthContext";

const BorrowBooks = () => {
  const { isAuthenticated, username, setCurrentAction } =
    useContext(AuthContext);
  useEffect(() => {
    setCurrentAction("borrow");
  });
  return <Books />;
};

export default BorrowBooks;
