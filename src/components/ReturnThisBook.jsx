import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { timeStamp } from "../lib/timeStamp";
import { overdueDays } from "../lib/overdueDays";
import BookCard from "./BookCard";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import axios from "axios";

const ReturnThisBook = () => {
  const {
    isAuthenticated,
    username,
    setThisBook,
    thisBook,
    setRefresh,
    refresh,
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
    axios
      .get(
        "http://localhost:8080/api/borrowedbooks/" +
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
  }, [thisBook, username.user_id]);

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
    bookData.overdue = overdueDays(
      borrowRecord.returnDate,
      bookData.actualReturnDate
    );
    // bookData.returnDate = threeWeeksFromNow();
    // bookData.status = 1;
    axios({
      method: "PUT",
      url:
        "http://localhost:8080/api/borrowedbooks/return/" +
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
        alert("Book Return Successfully");
        setRefresh(!refresh);
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
        )}
      </Box>
    </>
  );
};

export default ReturnThisBook;
