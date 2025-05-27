import {
  Box,
  Grid,
  InputBase,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";

const BookGrid = ({ booklist }) => {
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
      <Toolbar sx={{ display: "flex" }}>
        <Box size={8}>
          <TextField
            fullwidth="true"
            id="standard-basic"
            label="Search"
            variant="standard"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
      </Toolbar>
      {books.length ? (
        <Grid container space={2}>
          {books.map((book) => (
            <Grid size={4} padding={2} key={book.book_id}>
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
