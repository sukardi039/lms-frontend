import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";

const OutstandingList = () => {
  const { isAuthenticated, username, setThisBook, thisBook, refresh } =
    useContext(AuthContext);
  const [bookList, setBookList] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [outstanding, setOutstanding] = useState(0);

  useEffect(() => {
    let url = "http://localhost:8080/api/books/outstanding/" + username.user_id;
    axios
      .get(url)
      .then((response) => {
        // console.log(response);
        setBookList(response.data);
        // response.data.forEach((e) => {
        //   console.log(outstanding, e.anything, parseFloat(e.anything));
        //   setOutstanding(prevOutstanding => prevOutstandings + parseFloat(e.anything));
        // });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [username.user_id, refresh]);

  // accumulate prnrlty
  useEffect(
    () => {
      setOutstanding(0);
      if (bookList) {
        bookList.forEach((e) => {
          setOutstanding(
            (prevOutstanding) => prevOutstanding + parseFloat(e.anything)
          );
        });
      }
    },
    [bookList],
    refresh
  );
  return (
    <>
      {bookList && (
        <>
          <Typography
            sx={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "center",
            }}
            variant="h6"
          >
            Outstanding Fees: ${outstanding}
          </Typography>
          <TableContainer sx={{ display: bookList.length ? "block" : "none" }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "70%" }}>Title</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookList.map((row) => (
                  <TableRow
                    variant="body2"
                    key={row.book_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell sx={{ justifyContent: "right" }}>
                      {row.anything}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default OutstandingList;
