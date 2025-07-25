import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { twoMoreWeeks } from "../lib/twoMoreWeeks";
import BookCard from "./BookCard";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import axios from "axios";

const RenewThisBook = () => {
  /**
   * Destructures authentication and book-related context values from AuthContext.
   *
   * @property {boolean} isAuthenticated - Indicates if the user is authenticated.
   * @property {string} username - The current user's username.
   * @property {Function} setThisBook - Function to update the current book.
   * @property {Object} thisBook - The currently selected book object.
   * @property {Function} setRefresh - Function to trigger a refresh.
   * @property {boolean} refresh - Indicates if a refresh is needed.
   * @property {any} param - Additional parameter from context (type depends on implementation).
   * @property {Function} setCurrentAction - Function to set the current action.
   */
  const {
    isAuthenticated,
    username,
    setThisBook,
    thisBook,
    setRefresh,
    refresh,
    param,
    setCurrentAction,
  } = useContext(AuthContext);
  const [borrowRecord, setBorrowRecord] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || !username) {
      setCurrentAction("");
      navigate("/");
    }
  });
  useEffect(() => {
    if (thisBook.book_id) {
      axios
        .get(
          "http://localhost:8080/api/borrowedbooks/renewable/" +
            username.user_id +
            "/" +
            thisBook.book_id
        )
        .then((response) => {
          console.log(response);
          setBorrowRecord(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [thisBook, username.user_id]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  // to code for returning books

  const renewThisBook = (bookId) => {
    console.log("renew book ", bookId);
    const bookData = {};
    // bookData.book_id = bookId;
    // bookData.user_id = username.user_id;
    bookData.returnDate = twoMoreWeeks(
      borrowRecord.returnDate,
      param["BORROW_DAYS"]
    );
    console.log("before", borrowRecord.renewed);
    bookData.renewed = borrowRecord.renewed + 1;
    console.log("after", bookData.renewed);
    bookData.borrow_id = borrowRecord.borrow_id;
    // bookData.returnDate = threeWeeksFromNow();
    // bookData.status = 1;
    console.log(bookData);
    axios({
      method: "PUT",
      url:
        "http://localhost:8080/api/borrowedbooks/renew/" +
        borrowRecord.borrow_id,
      data: bookData,
    })
      .then((response) => {
        resetForm();
        if (response.data.penelty > 0) {
          alert(
            "Penelty of $" +
              response.data.penelty +
              " imposed for " +
              response.data.overdue +
              " days late in returning this book."
          );
        }
        alert("Book Renewed Successfully");
        setRefresh(!refresh);
        navigate("/renew");
        // setRefresh(!refresh);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  };

  const notNow = () => {
    navigate("/renew");
  };

  const resetForm = () => {
    setThisBook({});
  };

  if (id == thisBook.book_id) {
    // console.log("great");
    // to get available copies information!!!!!!!!!!
  } else {
    console.log("passed wrong book", id, thisBook);
    return;
  }
  return (
    <>
      <Box
        sx={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {borrowRecord && (
          <Stack spacing={3}>
            <BookCard book={thisBook} />
            <Divider></Divider>
            <Typography sx={{ display: "flex", justifyContent: "center" }}>
              Due date: {borrowRecord.returnDate}
            </Typography>
            <Typography sx={{ display: "flex", justifyContent: "center" }}>
              Would you like to return it?
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Stack direction="row">
                <Button
                  variant="solid"
                  size="lg"
                  onClick={() => {
                    renewThisBook(thisBook.book_id);
                  }}
                >
                  Renew
                </Button>
                <Button
                  variant="solid"
                  size="lg"
                  onClick={() => {
                    notNow();
                  }}
                >
                  Not Now
                </Button>
              </Stack>
            </Box>
          </Stack>
        )}
      </Box>
    </>
  );
};

export default RenewThisBook;
