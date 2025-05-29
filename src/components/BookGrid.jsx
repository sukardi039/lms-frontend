import { Box, Grid, TextField, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";

const BookGrid = ({ booklist, clickAction }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setFilteredBooks] = useState(booklist);

  useEffect(() => {
    setFilteredBooks(
      booklist.filter((books) =>
        books.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <>
      <Toolbar>
        <Box flex={8}>
          <TextField
            fullwidth="true"
            id="standard-basic"
            label="Search by Title"
            variant="standard"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
      </Toolbar>
      {books.length ? (
        <Grid container space={2}>
          {books.map((book) => (
            <Grid
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={4}
              padding={1}
              key={book.book_id}
            >
              <BookCard book={book} clickAction={clickAction(book)}></BookCard>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>No Book Available</Typography>
        </Box>
      )}
    </>
  );
};

export default BookGrid;
