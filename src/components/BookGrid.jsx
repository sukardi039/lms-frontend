import { Box, Grid, TextField, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";

/**
 * BookGrid component displays a grid of books with a search functionality.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.booklist - The list of book objects to display. Each book object should contain at least a `title` and `book_id` property.
 * @returns {JSX.Element} The rendered BookGrid component with search and book cards.
 */
const BookGrid = ({ booklist }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setFilteredBooks] = useState(booklist);

  useEffect(() => {
    // console.log(booklist);
    setFilteredBooks(
      booklist.filter((books) =>
        books.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <>
      <Toolbar sx={{ width: "90%" }}>
        <Box sx={{ width: "40%" }}>
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
        <Grid container space={2} sx={{ width: "95%" }}>
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
              <BookCard book={book}></BookCard>
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
