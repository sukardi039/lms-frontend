import React, { useContext, useEffect } from "react";
import Books from "./Books";
import { AuthContext } from "../context/AuthContext";

/**
 * BorrowBooks component sets the current user action to "borrow" on mount
 * and renders the Books component. It uses authentication context to access
 * user information and action setter.
 *
 * @component
 * @returns {JSX.Element} The rendered Books component.
 */
const BorrowBooks = () => {
  const { isAuthenticated, username, setCurrentAction } =
    useContext(AuthContext);
  useEffect(() => {
    setCurrentAction("borrow");
  });
  return <Books />;
};

export default BorrowBooks;
