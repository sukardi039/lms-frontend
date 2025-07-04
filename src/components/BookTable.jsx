/**
 * BookTable component displays a searchable and editable table of books.
 *
 * @component
 * @param {Object[]} booklist - Array of book objects to display in the table.
 * @param {function} clickAction - Callback function triggered on add, edit, or delete actions. Receives action type and book data as arguments.
 * @param {function} refresh - Function to refresh the book list (not used directly in this component).
 *
 * @example
 * <BookTable
 *   booklist={books}
 *   clickAction={(action, book) => handleAction(action, book)}
 *   refresh={fetchBooks}
 * />
 */
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

const BookTable = ({ booklist, clickAction, refresh }) => {
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
  }, [searchTerm, booklist]);

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
                      clickAction("add", {});
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
                        clickAction("edit", row);
                      }}
                    />
                    <DeleteIcon
                      onClick={() => {
                        clickAction("delete", row);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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

export default BookTable;
