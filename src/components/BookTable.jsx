import {
  Box,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import BookCard from "./BookCard";

const BookTable = ({ booklist, clickAction }) => {
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
      <Toolbar sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, width: 1 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ISBN</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Published</TableCell>
                <TableCell align="right">Copies</TableCell>
                <TableCell align="center">
                  <AddIcon
                    onClick={() => {
                      clickAction("add", 0);
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((row) => (
                <TableRow
                  key={row.book_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.isbn}
                  </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.author}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell align="right">{row.publishedYear}</TableCell>
                  <TableCell align="right">{row.copyInStock}</TableCell>
                  <TableCell align="center">
                    <EditIcon
                      onClick={() => {
                        clickAction("edit", row.book_id);
                      }}
                    />
                    <DeleteIcon
                      onClick={() => {
                        clickAction("delete", row.book_id);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        // <Grid container space={2} sx={{ width: "95%" }}>
        //   {books.map((book) => (
        //     <Grid
        //       xs={12}
        //       sm={12}
        //       md={6}
        //       lg={4}
        //       xl={4}
        //       padding={1}
        //       key={book.book_id}
        //     >
        //       <BookCard book={book}></BookCard>
        //     </Grid>
        //   ))}
        // </Grid>
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

export default BookTable;
