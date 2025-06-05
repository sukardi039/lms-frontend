import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { timeStamp } from "../lib/timeStamp";
import BookCard from "./BookCard";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import axios from "axios";

const ReturnThisBook = () => {
  const MAX_BORROW = 3;

  const [error, setError] = useState();

  const { isAuthenticated, username, setThisBook, thisBook } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  // to code for returning books

  const returnThisBook = (bookId) => {
    console.log("return book ", bookId);
    const bookData = {};
    // bookData.book_id = bookId;
    // bookData.user_id = username.user_id;
    bookData.actualReturnDate = timeStamp();
    // bookData.returnDate = threeWeeksFromNow();
    // bookData.status = 1;
    axios({
      method: "PUT",
      url:
        "http://localhost:8080/api/borrowedbooks/return/" +
        username.user_id +
        "/" +
        bookId,
      data: bookData,
    })
      .then((response) => {
        resetForm();
        alert("Book Return Successfully");
        navigate("/return");
        // setRefresh(!refresh);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  };

  const notNow = () => {
    navigate("/return");
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
        <Stack spacing={3}>
          <BookCard book={thisBook} />
          <Divider></Divider>
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
                  returnThisBook(thisBook.book_id);
                }}
              >
                Return
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

export default ReturnThisBook;
