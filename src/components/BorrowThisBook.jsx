import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { timeStamp } from "../lib/timeStamp";
import { threeWeeksFromNow } from "../lib/threeWeeksFromNow";
import BookCard from "./BookCard";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import axios from "axios";

const BorrowThisBook = () => {
  const MAX_BORROW = 3;

  const [error, setError] = useState();

  const { isAuthenticated, username, setThisBook, thisBook } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const borrowThisBook = (bookId) => {
    console.log("borrow book ", bookId);
    const bookData = {};
    bookData.book_id = bookId;
    bookData.user_id = username.user_id;
    bookData.borrowedDate = timeStamp();
    bookData.returnDate = threeWeeksFromNow();
    bookData.status = 1;
    axios({
      method: "POST",
      url: "http://localhost:8080/api/borrowedbooks",
      data: bookData,
    })
      .then((response) => {
        resetForm();
        alert("Book Borrow Successfully");
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
    return;
  }
  return (
    <>
      <Box sx={{ marginTop: "30px" }}>
        <Stack spacing={3}>
          <BookCard book={thisBook} />
          <Divider></Divider>
          <Typography>Good choice! Would you like to borrow it?</Typography>
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
