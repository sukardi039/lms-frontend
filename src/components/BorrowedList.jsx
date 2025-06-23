import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";

/**
 * BorrowedList component displays a list of books currently borrowed by the authenticated user.
 *
 * Fetches the borrowed books from the backend API using the user's ID and displays them in a table,
 * including the book title and due date. Handles loading and error states.
 *
 * Context:
 * - AuthContext: Provides authentication state, user info, and refresh trigger.
 *
 * State:
 * - bookList: Array of borrowed books.
 * - loading: Boolean indicating if data is being loaded.
 * - error: Error message if fetching fails.
 *
 * Effects:
 * - Fetches borrowed books whenever the user ID or refresh value changes.
 *
 * @component
 * @returns {JSX.Element} The rendered list of borrowed books for the current user.
 */
const BorrowedList = () => {
  const { isAuthenticated, username, setThisBook, thisBook, refresh } =
    useContext(AuthContext);
  const [bookList, setBookList] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    let url = "http://localhost:8080/api/books/borrowed/" + username.user_id;
    axios
      .get(url)
      .then((response) => {
        // console.log(response);
        setBookList(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [username.user_id, refresh]);
  return (
    <>
      {bookList && (
        <>
          <Typography
            sx={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "center",
            }}
            variant="h6"
          >
            Books Borrowed: {bookList.length}
          </Typography>
          <TableContainer sx={{ display: bookList.length ? "block" : "none" }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "70%" }}>Title</TableCell>
                  <TableCell>Due Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookList.map((row) => (
                  <TableRow
                    variant="body2"
                    key={row.book_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell>{row.anything.split(" ")[0]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default BorrowedList;
