import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { timeStamp } from "../lib/timeStamp";
import { twoWeeksFromNow } from "../lib/twoWeeksFromNow";
import BookCard from "./BookCard";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";

const BorrowThisBook = () => {
  const MAX_BORROW = 3;

  const [error, setError] = useState();

  /**
   * Destructures authentication and book-related context values from AuthContext.
   *
   * @property {boolean} isAuthenticated - Indicates if the user is authenticated.
   * @property {string} username - The current user's username.
   * @property {Function} setThisBook - Function to set the current book.
   * @property {Object} thisBook - The currently selected book object.
   * @property {boolean} refresh - Flag to trigger refresh of data.
   * @property {Function} setRefresh - Function to update the refresh flag.
   * @property {any} param - Additional parameter from context (type may vary).
   * @property {Function} setCurrentAction - Function to set the current action in context.
   */
  const {
    isAuthenticated,
    username,
    setThisBook,
    thisBook,
    refresh,
    setRefresh,
    param,
    setCurrentAction,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const { control, handleSubmit, setValue, reset } = useForm();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  // const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || !username) {
      setCurrentAction("");
      navigate("/");
    }
  });

  const borrowThisBook = (bookId) => {
    console.log("borrow book ", bookId);
    const bookData = {};
    bookData.book_id = bookId;
    bookData.user_id = username.user_id;
    bookData.borrowedDate = timeStamp();
    bookData.returnDate = twoWeeksFromNow(param["BORROW_DAYS"]);
    bookData.renewed = 0;
    bookData.status = 1;
    axios({
      method: "POST",
      url: "http://localhost:8080/api/borrowedbooks",
      data: bookData,
    })
      .then((response) => {
        resetForm();
        if (response.data.book_id == bookId) {
          alert("Book Borrow Successfully");
        } else {
          alert(
            "Book not available or you may have violated our conditions for book borrowing!"
          );
        }
        setRefresh(!refresh);
        navigate("/borrow");
        // setRefresh(!refresh);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  };

  const notNow = () => {
    navigate("/borrow");
  };

  const resetForm = () => {
    setThisBook({});
  };

  if (id == thisBook.book_id) {
    // console.log("great");
    // to get available copies information!!!!!!!!!!
  } else {
    console.log("passed wrong book", id, thisBook);
    // return;
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
        <Stack spacing={3}>
          <BookCard book={thisBook} />
          <Divider></Divider>
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            Good choice! Would you like to borrow it?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              component: "form",
            }}
          >
            <Stack direction="row">
              <Button
                variant="solid"
                size="lg"
                onClick={() => {
                  borrowThisBook(thisBook.book_id);
                }}
              >
                Borrow
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
      </Box>
    </>
  );
};

export default BorrowThisBook;
